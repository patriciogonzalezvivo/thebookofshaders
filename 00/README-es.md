# Introducción

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Las imágenes que aparecen arriba fueron creadas de diferentes formas. La primera fue hecha por la mano de Van Gogh, aplicando capa por capa la pintura. Le tomó horas pintarla. La segunda fue producida en segundos mezclando cuatro matrices de pixeles: una para el cyan, otra para el magenta, otra para el amarillo y otra para el negro. La diferencia clave entre ambas es que la segunda imagen fue hecha de una manera no serializada  (es decir que el proceso no fue paso a paso, sino de manera simultánea).

Este libro trata sobre una técnica computacional revolucionaria, que lleva a las imágenes generadas digitalmente a un nuevo nivel, los *fragment shaders*. Esta revolución es comparable a lo que fue en su momento la imprenta de Gutemberg para la gráfica.

![Imprenta de Gutenberg](gutenpress.jpg)

Los fragment shaders te dan un control total sobre los pixeles renderizados en la pantalla, a una super velocidad. Este es el motivo por el que se usa en todo tipo de casos, desde filtros de video, hasta increíbles videojuegos en 3D.

![Journey por That Game Company](journey.jpg)

En los próximos capítulos descubrirás cuán increíblemente rápida y poderosa es esta técnica, y cómo incorporarla a tu trabajo personal o profesional.

## ¿Para quién es este libro?

Este libro está escrito para creative coders, desarrolladores de videojuegos e ingenieros que tengan alguna experiencia con la programación, un conocimiento básico de álgebra lineal y trigonometría, y que quieran llevar su trabajo a un nuevo y emocionante nivel gráfico. (Si te interesa aprender a programar, te recomiendo comenzar con [Processing](https://processing.org/) y volver cuando te sientas cómodo).

Este libro te enseñará a integrar shaders en tus proyectos, mejorando la performance y la calidad gráfica. Como los shaders GLSL (OpenGL Shading Language) se pueden compilar y correr en diferentes plataformas, podrás aplicar lo que aprendas aquí en cualquier entorno que use OpenGL, OpenGL ES o WebGL. En otras palabras podrás utilizarlo en sketches de [Processing](https://processing.org/), aplicaciones de [openFrameworks](http://openframeworks.cc/), instalaciones interactivas con [Cinder](http://libcinder.org/), incluso en web o en juegos iOS/Android con [Three.js](http://threejs.org/).


## ¿Qué temas se tratan en este libro?

Este libro se enfoca en el uso de los pixel shaders GLSL. Primero definiremos qué son los shaders; luego aprenderemos a crear formas procedurales, patrones, texturas y animaciones con ellos. Aprenderás los fundamentos básicos del lenguaje y cómo aplicarlos en escenarios más útiles cómo: el procesamiento de imágenes (operaciones de imagen, convoluciones de matrices, desenfocado, filtros de color, lookup tables y otros efectos) y simulaciones (El juego de la vida de Conway, la reacción-difusión de Gray-Scott, ondas de agua, efecto de acuarela, celdas de Voronoi, etc). Hacia el final del libro veremos un conjunto de técnicas avanzadas basadas en ray marching.

*Habrá ejemplos interactivos en cada uno de los capítulos para que puedas jugar con ellos.* Cuando modifiques el código, podrás ver al instante los cambios reflejados en la pantalla. Los conceptos expuestos pueden ser abstractos y confusos, por lo que los ejemplos interactivos son esenciales para comprender el material. Cuanto más rápido pongamos manos a la obra en el código, mejor lo entenderemos.

Que cosas no vas a encontrar en este libro:

* Este *no es* un libro sobre OpenGL o webGL. OpenGL/webGL son temas mucho más grandes que GLSL o el uso fragment shaders. Si estás interesado en aprender openGL/webGL te recomiendo mirar:  [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (también conocido como el libro rojo) o [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* Este *no es* un libro de matemáticas. A pesar de que cubriremos un número de algoritmos y técnicas que están íntimimante relacionados con el álgebra y la trigonometría, no las explicaremos en profundidad. Si tienes alguna duda con respecto a la matemática empleada en este libro te recomiendo tener cerca alguno de estos libros: [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) o [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## ¿Qué necesito para comenzar?

¡No mucho! Si tienes algún navegador que cuente con WebGL (como por ejemplo Chrome, Firefox o Safari) y una conexión a internet, solo necesitas hacer clic en "Siguiente" para poder comenzar.

Alternativamente, dependiendo cuales sean tus necesidades puedes:

- [Crear una versión offline del libro](https://thebookofshaders.com/appendix/)

- [Correr los ejemplos en una Raspberry Pi sin un navegador](https://thebookofshaders.com/appendix/)

- [Crear un PDF del libro para imprimir.](https://thebookofshaders.com/appendix/)

- Usar el [repositorio on-line](https://github.com/patriciogonzalezvivo/thebookofshaders) y ayudarnos a resolver problemas y compartir código.
