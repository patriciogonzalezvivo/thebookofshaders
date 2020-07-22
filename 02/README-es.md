## Hola mundo

Usualmente el "Hola mundo" es el primer ejemplo con el que se aprende un lenguaje de programación. Se trata de una simple linea de código que imprime un entusiasta mensaje de bienvenida.

En el mundo de las GPU renderizar texto es una tarea complicada para ser el primer paso, por lo tanto nosotros vamos a imprimir un brillante color de bienvenida para mostrar nuestro entusiasmo.

<div class="codeAndCanvas" data="hello_world.frag"></div>

Si estás leyendo este libro en un navegador, el código anterior es interactivo, eso significa que puedes hacer clic y cambiar cualquier línea de código para explorar cómo funciona. Los cambios se reflejaran automáticamente gracias a que la arquitectura de la GPU se encarga de compilar y reemplazar los shaders al instante. Intenta modificar el contenido de la línea 6.

Aunque estas simples líneas de código no parezcan mucho, podemos inferir mucha información importante de ellas:

1. Los shaders tienen una función ```main``` principal que devuelven un color al final. Esto es muy similar a C.

2. El color final del pixel es guardado en la variable global reservada ```gl_FragColor```.

3. Este lenguaje similar a C tiene *variables* reservadas (como ```gl_FragColor```), *funciones* y *tipos de variables*. En este caso vemos que existe ```vec4``` que es un tipo de variable de 4 dimensiones de punto flotante. Más adelante veremos otros tipos de variables como ```vec3``` y ```vec2``` junto con las populares: ```float```, ```int``` y ```bool```.

4. Si miramos detenidamente el ```vec4``` podemos inferir que los cuatro argumentos pasados son el canal RED (rojo), el canal GREEN (verde), el canal BLUE (azul) y el canal ALPHA (transparencia). Además podemos ver que los valores se encuentran *normalizados*, eso significa que van desde ```0.0``` a ```1.0```. Más adelante aprenderemos que normalizar valores vuelve mucho más fácil nuestro trabajo con las variables.

5. Otra *función de C* que vemos en el ejemplo son los macros al preprocesador. Los macros son parte del proceso de precompilado. Con ellos es posible definir variables globales (con ```#define```) y hacer operaciones condicionales básicas ( con ```#ifdef``` y ```#endif```). Todos los comandos macro comienzan con un numeral (```#```). La pre-compilación sucede en el momento previo a la compilación y chequea todos los  ```#defines```, y los condicionales ```#ifdef``` (está definido) y ```#ifndef``` (no está definido). En nuestro ejemplo, el "Hola mundo", solamente insertamos la segunda línea de código si ```GL_ES``` está definida, que la mayoría de las veces se encuentra definida cuando el código es compilado en mobile o en navegadores.

6. Los valores flotantes son vitales en los shaders, ya que el nivel de  *precisión* es crucial. A menor precisión mayor velocidad de render, pero peor calidad. Podemos ser meticulosos y especificar la precisión de cada variable que use punto flotante. En la primera línea (```precision mediump float;```) estamos ajustando todos los valores flotantes a una precisión media. Pero podríamos configurarlos en low (```precision lowp float;```) o high (```precision highp float;```).

7. El último detalle, y quizá el más importante, es que las especificaciones de GLSL no garantizan que las variables sean automáticamente convertidas. ¿Qué significa eso? Los manufacturadores de GPU tienen diferentes estrategias para acelerar los gráficos pero están forzados a entregar especificaciones mínimas, por lo que la conversión automática de variables no es algo importante. Si queremos que nuestro código sea consistente y no pasar horas depurando pantallas blancas, tenemos que acostumbrarnos a usar el punto ( ```.``` ) en los flotantes. Este código no siempre funcionará:

```glsl
void main() {
	gl_FragColor = vec4(1,0,0,1);	// ERROR
}
```

Ahora que ya describimos los elementos más importantes de nuestro "Hola mundo", es hora de hacer clic en el código y poner en práctica nuestros conocimientos aprendidos. Notarás que cuando hay errores, el programa no compilará, y mostrará una pantalla blanca. Aqui hay algunas cosas interesantes que puedes probar, por ejemplo:

* Intenta modificar los flotantes y poner enteros, es posible que tu placa de video no tolere esto.

* Prueba comentar la línea 6 y no asignar ningún valor a la función.

* Intenta crear una función separada que devuelva un color específico y usalo dentro del ```main()```. Una pista, aqui está el código que usaríamos para devolver el color rojo:

```glsl
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```

* Hay muchas formas de construir un ```vec4```, intenta descubrir nuevas formas de hacerlo. La siguiente es un ejemplo:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Mas alla de que el ejemplo no sea muy emocionante, es el ejemplo más básico que podemos crear - estamos cambiando todos los pixeles de la pantalla al mismo tiempo y asignándole a todos el mismo color. En el siguiente capítulo veremos cómo cambiar los colores de los pixeles utilizando dos tipos de entradas: espacio (la posición del pixel en la pantalla) y tiempo (el número de segundos desde que la página fue cargada).
