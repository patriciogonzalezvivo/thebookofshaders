## Uniforms

Hasta ahora hemos vimos como la GPU maneja grandes números de threads en paralelo, cada uno responsable de asignar un color a una fracción de la pantalla. A pesar de que cada thread no conoce a los otros, necesitamos poder enviarle valores de entrada desde la CPU a todos los threads. Debido a la arquitectura de la GPU todos esos valores van a ser iguales (*uniform*) para todos los threads y de sólo lectura. En otras palabras, cada thread recibe las misma información y puede leerla pero no modificarla.

Estas entradas se llaman ```uniform``` y vienen en diferentes tipos: ```float```, ```vec2```, ```vec3```, ```vec4```, ```mat2```, ```mat3```, ```mat4```, ```sampler2D``` y ```samplerCube```. Los uniforms son definidos con sus correspondientes tipos, al principio del código, luego de definir la precisión del punto flotante.

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;	  // Time in seconds since load
```

Podemos imaginar que los uniforms son como pequeños puentes entra la CPU y la GPU. Los nombres varían dependiendo de cada implementación, en esta serie de ejemplos estoy usando ```u_time``` (tiempo en segundos desde que shaders comenzó a correr), ```u_resolution``` (el tamaño de la ventana donde se esta dibujando el shader) y ```u_mouse``` (la posición del mouse dentro de la ventana en pixeles). Estoy siguiendo la convención de utilizar ```u_``` antes del nombre del uniform, para ser explícito respecto a la naturaleza de la variable, pero encontrarás diferentes nombre de uniforms. Por ejemplo [ShaderToy.com](https://www.shadertoy.com/) utiliza las mismas uniforms pero con los siguientes nombres:

```glsl
uniform vec3 iResolution;   // viewport resolution (in pixels)
uniform vec4 iMouse;        // mouse pixel coords. xy: current, zw: click
uniform float iTime;        // shader playback time (in seconds)
```

Ya hemos hablado mucho, vamos a ver los uniforms en acción. En el código siguiente usamos ```u_time``` - el número de segundos desde que el shader comenzó a ejecutarse - junto con una función del seno para animar en transición la cantidad de rojo en la pantalla.

<div class="codeAndCanvas" data="time.frag"></div>

Como puedes ver, GLSL tiene mas sorpresas. La GPU tiene funciones de ángulo, de trigonometría y exponenciales, que son aceleradas por hardware: [```sin()```](../glossary/?search=sin), [```cos()```](../glossary/?search=cos), [```tan()```](../glossary/?search=tan), [```asin()```](../glossary/?search=asin), [```acos()```](../glossary/?search=acos), [```atan()```](../glossary/?search=atan), [```pow()```](../glossary/?search=pow), [```exp()```](../glossary/?search=exp), [```log()```](../glossary/?search=log), [```sqrt()```](../glossary/?search=sqrt), [```abs()```](../glossary/?search=abs), [```sign()```](../glossary/?search=sign), [```floor()```](../glossary/?search=floor), [```ceil()```](../glossary/?search=ceil), [```fract()```](../glossary/?search=fract), [```mod()```](../glossary/?search=mod), [```min()```](../glossary/?search=min), [```max()```](../glossary/?search=max) y [```clamp()```](../glossary/?search=clamp).

Es hora de jugar con el código de arriba:

* Reduce la frecuencia del cambio hasta que sea prácticamente imperceptible.

* Acelera la frecuencia hasta que dejes de ver el parpadeo.

* Juega con los canales de colores (RGB) en diferentes frecuencias, para obtener patrones y comportamientos interesantes.

## gl_FragCoord

De la misma forma que GLSL nos da por default la variable reservada ```vec4 gl_FragColor```, también nos da ```vec4 gl_FragCoord``` que guarda la coordenada del *pixel* o *screen fragment* del thread actual. Con ```vec4 gl_FragCoord``` podemos saber el lugar en la pantalla en el que el thread esta actualmente trabajando. En este caso esta variable no es un ```uniform``` porque  será diferente en cada uno de los threads, las variables que cambian en cada thread ,como ```gl_FragCoord```, son *varying*.

<div class="codeAndCanvas" data="space.frag"></div>

En el código de arriba *normalizamos* la coordenada del fragment, dividiéndolo por la resolución total de la ventana. Una vez que hicimos este proceso, la posición va de 0.0 a 1.0, lo que vuelve mucho más fácil de usar estos valores en los canales RED (rojo) y GREEN (verde).

En el mundo de los shaders no tenemos muchas herramientas para hacer debug mas allá de asignar colores e intentar encontrarles el sentido. Muchas veces verás que programar en GLSL es como poner barcos dentro de botellas, cuanto más complicado, mas hermoso y gratificante es.

![](08.png)

Es hora de poner en práctica los conocimientos aprendidos.

* ¿Podrías decir dónde está nuestro ```(0.0,0.0)``` en la pantalla?

* ¿Y dónde está ```(1.0,0.0)```, ```(0.0,1.0)```, ```(0.5,0.5)``` y ```(1.0,1.0)```?

* ¿Puedes imaginar cómo usar ```u_mouse``` sabiendo que los valores estan en pixeles no están normalizados? ¿Podrías usarlo para mover los colores?

* ¿Te imaginas alguna forma interesante de combinar ```u_time``` y ```u_mouse``` para generar patrones ?

Luego de hacer estos ejercicios seguramente te preguntarás que mas puedes hacer con los superpoderes que los shaders te dan. En el próximo capítulo veremos como crear tus propios shaders en three.js, Processing y openFrameworks.
