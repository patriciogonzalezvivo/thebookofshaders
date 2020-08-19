# Comenzando
## Qué es un fragment shader?

En el capítulo anterior comparamos a los shaders con la invención de la imprenta de Gutenberg. ¿Por qué? Y más importante: ¿Qué es un shader?

![From Letter-by-Letter, Right: William Blades (1891). To Page-by-page, Left: Rolt-Wheeler (1920).](print.png)

Si ya tienes experiencia dibujando con computadoras, sabrás que en ese proceso dibujas un círculo, luego un rectángulo, una línea, algunos triángulos, hasta que por fin compones la imagen que querías. Ese proceso es muy similar a escribir una carta o un libro a mano, es un conjunto de instrucciones, una tarea después de la otra.

Los shaders son también un conjunto de instrucciones, pero estas son ejecutadas todas al mismo tiempo por cada pixel de la pantalla. Eso significa que el código que escribes tiene que comportarse de manera diferente dependiendo de su posición en la pantalla. Como una prensa tipográfica, tu programa trabajará como una función que recibe posición y devuelve color, y que al ser compilada se ejecutará a una velocidad extraordinaria.

![Prensa tipográfica china](typepress.jpg)

## Por qué son rápidos los shaders?

Para responder esto hay que hablar de las maravillas del *parallel processing*.

Imagina que tu CPU es un gran tubo industrial y que cada tarea pasa por ahí como si fuese una linea de producción. Algunas tareas son más grandes que otras, esto quiere decir que algunas consumen más tiempo y energía que el resto. Solemos decir que estas tareas requieren más tiempo de proceso. Debido a la arquitectura de las computadoras estas tareas son forzadas a correr en serie; cada trabajo debe ser terminado, uno después del otro. Las computadoras modernas usualmente cuentan con un grupo de procesadores que trabajan como estos tubos, completando tareas, una después de la otra. Cada uno de estos tubos es también conocido como *thread*.

![CPU](00.jpeg)

Los videojuegos y otras aplicaciones gráficas requieren mucho más tiempo de proceso que otros programas. Debido a su contenido gráfico es necesario hacer muchas operaciones numéricas por pixel. Cada pixel de la pantalla necesita ser computado, y en el caso de los videojuegos en 3D también hay que calcular las geometrías y las perspectivas.

Volvamos a pensar en la metáfora de los tubos y las tareas. Cada pixel de la pantalla representa una pequeña tarea a realizar. Individualmente cada tarea no es un gran problema para el CPU, pero (y aquí está el problema) ¡Esta pequeña tarea deberá ser ejecutada por cada pixel! Eso significa que en una antigua pantalla de 800x600 pixeles ¡Tendremos que procesar 480000 pixeles por frame, es decir 14400000 cálculos por segundo! ¡Sí! Ese es un problema lo suficientemente grande como para sobrecargar al microprocesador. En una pantalla retina display moderna de 2880x1800 pixeles, corriendo a 60 frames por segundo, los cálculos aumentarían a 311040000 por segundo. ¿Cómo hicieron los ingenieros gráficos para solucionar este problema?

![](03.jpeg)

Aquí es donde procesar en paralelo se vuelve una buena solución. En vez de tener un par de procesadores grandes y poderosos, o *tubos*, es mucho más inteligente tener muchos pequeños procesadores funcionando en paralelo al mismo tiempo. Eso es la GPU (Graphic Processor Unit).

![GPU](04.jpeg)

Imagina que los pequeños procesadores conforman una mesa de tuberías, y que la información de cada pixel es una pelota de ping pong. 14400000 pelotas de ping pong en un segundo pueden obstruir a cualquier tubería, pero si en cambio es una mesa de 800x600 tuberías y recibe 30 olas de 480000 pixeles por segundo, se puede manejar de una manera fluída sin problemas. Esto funciona de la misma manera con resoluciones más grandes, cuanto más hardware en paralelo tengas, es mayor el flujo de pixeles que se puede manejar.

Otro "superpoder" de la GPU es que algunas funciones matemáticas especiales son aceleradas vía hardware, la matemática más compleja es solucionada directamente en el microchip en vez resolverlo en el software. Eso signfica que tendremos una velocidad extra en cálculos trigonométricos u operaciones de matrices que irán tan rápido como la electricidad.

## ¿Qué es GLSL?

GLSL es la sigla de openGL Shading Language, que es el standard específico de shaders que veremos en los próximos capítulos. Hay otros tipos de shaders que varían dependiendo del hardware y del sistema operativo. Aquí trabajaremos con las especificaciones reguladas por el [Khronos Group](https://www.khronos.org/opengl/). Entender la historia de OpenGL puede ser útil para comprender la mayoría de las convenciones raras, te recomiendo echarle un vistazo a: [openglbook.com/chapter-0-preface-what-is-opengl.html](http://openglbook.com/chapter-0-preface-what-is-opengl.html)

## ¿Por qué los shaders tienen mala reputación?

Como dijo el tio Ben "un gran poder conlleva una gran responsabilidad", y la computación paralela sigue esta regla; el poderoso diseño de arquitectura de la GPU viene con sus propias limitaciones y restricciones.

Para que cada tubo, o thread, pueda correr en paralelo es necesario que cada uno sea independiente del otro. Es decir que los threads son *ciegos* y no saben lo que los demás threads están haciendo. Esta restricción implica que toda la información debe fluir en la misma dirección, por lo tanto es imposible conocer el resultado de otro thread. Permitir la comunicación entre threads pondría en riesgo la integridad de los datos.

Además la GPU deja constantemente ocupados a los micro-procesadores (los tubos); tan pronto como terminan una tarea reciben nueva información para procesar. Es imposible para cada thread saber lo que estaba haciendo en el momento previo. Se podría dibujar un botón de una UI de un sistema operativo, luego renderizar una porción del cielo de un videojuego, y a continuación mostrar el texto de un mail. Cada thread no solamente es **ciego** sino que **tampoco tiene memoria**. Más allá de la abstracción necesaria para poder crear una función que cambie de resultado pixel a pixel, dependiendo de su posición, la incapacidad de ver a los demás threads y la falta de memoria, hacen que los shaders no sean muy populares entre los programadores principiantes.

¡No te preocupues! En los próximos capítulos aprenderemos paso a paso, desde los shaders más sencillos a los casos más avanzados. Si estás leyendo esto desde un navegador moderno, vas a poder jugar con los ejemplos interactivos. No esperes más y presiona *Siguiente >>* para ir al próximo capítulo.
