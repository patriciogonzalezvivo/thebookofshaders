## Uniformy

Do tej pory widzieliśmy jak GPU zarządza wieloma równoległymi wątkami, z których każdy odpowiada za kolor części renderowanego obrazu. Choć wątki nie komunikują się między sobą, to jednak muszą jakoś otrzymywać input z CPU. Ze względu na architekturę karty graficznej taki input musi być jednakowy (ang. "*uniform*") dla wszystkich wątków i, z konieczności, tylko do odczytu (ang. "read-only"). Innymi słowy, każdy wątek otrzymuje takie same dane, które może odczytać, ale nie nadpisać, zmienić.

<!-- So far we have seen how the GPU manages large numbers of parallel threads, each one responsible for assigning the color to a fraction of the total image. Although each parallel thread is blind to the others, we need to be able to send some inputs from the CPU to all the threads. Because of the architecture of the graphics card those inputs are going to be equal (*uniform*) to all the threads and necessarily set as *read only*. In other words, each thread receives the same data which it can read but cannot change. -->

Inputy te nazywamy `uniform`ami i mogę być większości wspieranych typów: `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` i `samplerCube`. Uniformy definiowane są zwykle na górze shaderu zaraz po przypisaniu domyślnej precyzji float'ów.

<!-- These inputs are called `uniform` and come in most of the supported types: `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` and `samplerCube`. Uniforms are defined with the corresponding type at the top of the shader right after assigning the default floating point precision. -->

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // wielkość/rozdzielczość kanwy (szerokość, wysokość)
uniform vec2 u_mouse;       // pozycja myszy na kanwie (wyrażona w pikselach)
uniform float u_time;       // czas w sekundach od załadowania shadera
```

Wyobraź sobie te uniformy jak małe mosty między CPU i GPU. Ich nazwy bywają różne, ale w tej książce używam: `u_time`, `u_resolution` i `u_mouse` (przeczytaj komentarze w kodzie, aby wiedzieć, co robią). Podążam za konwencją dodawnaia `u_` przed nazwą uniformów, aby było wiadomo, że nie są to zwykłe zmienne, ale ostatecznie jest to kwestia gustu. Przykładowo, [ShaderToy.com](https://www.shadertoy.com/) używa takich samych uniformów, ale z następującym nazewnictwem: 

<!-- You can picture the uniforms like little bridges between the CPU and the GPU. The names will vary from implementation to implementation but in this series of examples I’m always passing: `u_time` (time in seconds since the shader started), `u_resolution` (billboard size where the shader is being drawn) and `u_mouse` (mouse position inside the billboard in pixels). I’m following the convention of putting `u_` before the uniform name to be explicit about the nature of this variable but you will find all kinds of names for uniforms. For example [ShaderToy.com](https://www.shadertoy.com/) uses the same uniforms but with the following names: -->

```glsl
uniform vec3 iResolution;   
uniform vec4 iMouse;        
uniform float iTime;        
```
(zwróć uwagę, że `iResolution` jest typu `vec3`, a `iMouse` typu `vec4`; uniformy te zawierają po prostu dodatkowe informacje, np.: stosunek szerokości do wysokości pikseli na ekranie, czy któryś z przycisków myszy został kliknięty albo czy jest przytrzymywany)

Koniec gadania, czas zobaczyć uniformy w akcji. W pożniszym kodzie używamy `u_time` (liczby sekund od uruchomienia shadera) razem z funkcją sinus, aby stworzyć animację przejścia od koloru czerwonego do czarnego.  

<!-- Enough talking, let's see the uniforms in action. In the following code we use `u_time` - the number of seconds since the shader started running - together with a sine function to animate the transition of the amount of red in the billboard. -->

<div class="codeAndCanvas" data="time.frag"></div>

Jak widać GLSL skrywa wiele niespodzianek, na przykład  w postaci specjalnych, zaimplementowanych w hardware'rze, funkcji trygonometryczne czy wykładniczych. Tutaj podaję część z nich: [`sin()`](../glossary/?search=sin), [`cos()`](../glossary/?search=cos), [`tan()`](../glossary/?search=tan), [`asin()`](../glossary/?search=asin), [`acos()`](../glossary/?search=acos), [`atan()`](../glossary/?search=atan), [`pow()`](../glossary/?search=pow), [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log), [`sqrt()`](../glossary/?search=sqrt), [`abs()`](../glossary/?search=abs), [`sign()`](../glossary/?search=sign), [`floor()`](../glossary/?search=floor), [`ceil()`](../glossary/?search=ceil), [`fract()`](../glossary/?search=fract), [`mod()`](../glossary/?search=mod), [`min()`](../glossary/?search=min), [`max()`](../glossary/?search=max) i [`clamp()`](../glossary/?search=clamp).
<!-- 
As you can see GLSL has more surprises. The GPU has hardware accelerated angle, trigonometric and exponential functions. Some of those functions are: [`sin()`](../glossary/?search=sin), [`cos()`](../glossary/?search=cos), [`tan()`](../glossary/?search=tan), [`asin()`](../glossary/?search=asin), [`acos()`](../glossary/?search=acos), [`atan()`](../glossary/?search=atan), [`pow()`](../glossary/?search=pow), [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log), [`sqrt()`](../glossary/?search=sqrt), [`abs()`](../glossary/?search=abs), [`sign()`](../glossary/?search=sign), [`floor()`](../glossary/?search=floor), [`ceil()`](../glossary/?search=ceil), [`fract()`](../glossary/?search=fract), [`mod()`](../glossary/?search=mod), [`min()`](../glossary/?search=min), [`max()`](../glossary/?search=max) and [`clamp()`](../glossary/?search=clamp). -->

Pobawmy się powyższym kodem:

* Zmniejsz częstotliwość tak bardzo, aby zmiany koloru stały się nie zauważalne.

* Zwiększ częstotliwość do takiego stopnia, aby ujrzeć stały kolor bez migotania.

* Wstaw funkcje sinus o różnych częstotliowściach do pozostałych kanałów (zielonego i niebieskiego), aby uzyskać ciekawe efekty.

<!-- Now it is time again to play with the above code.

* Slow down the frequency until the color change becomes almost imperceptible.

* Speed it up until you see a single color without flickering.

* Play with the three channels (RGB) in different frequencies to get interesting patterns and behaviors. -->

## gl_FragCoord

GLSL daje nam nie tylko domyślny output `vec4 gl_FragColor`, ale również domyślny input w postaci `vec4 gl_FragCoord`, który przechowuje współrzędne *piksela* (inaczej: *fragmentu*), nad którym aktualnie pracuje wątek - dzięki `vec4 gl_FragCoord` wiemy, gdzie wątek pracuje wewnątrz kanwy. Nie nazywamy go `uniform`em, ponieważ jego wartość *różni się* między wątkami. Zamiast tego `gl_FragCoord` nazywamy *varying* (z ang. "zmieniający się", "różniący się"). 

<!-- In the same way GLSL gives us a default output, `vec4 gl_FragColor`, it also gives us a default input, `vec4 gl_FragCoord`, which holds the screen coordinates of the *pixel* or *screen fragment* that the active thread is working on. With `vec4 gl_FragCoord`, we know where a thread is working inside the billboard. In this case we don't call it `uniform` because it will be different from thread to thread, instead `gl_FragCoord` is called a *varying*. -->

<div class="codeAndCanvas" data="space.frag"></div>

W powyższy kodzie, *normalizujemy* współrzędne fragmentu poprzez podzielenie go przez rozdzielczość kanwy. W ten sposó otrzymujemy wartości z przedziału od `0.0` do `1.0`, co ułatwia zmapowanie współrzędnych x i y do, odpowiednio, czerwonego i zielonego kanału.

<!-- In the above code we *normalize* the coordinate of the fragment by dividing it by the total resolution of the billboard. By doing this the values will go between `0.0` and `1.0`, which makes it easy to map the X and Y values to the RED and GREEN channel. -->

W świecie shaderów nie mamy zbyt dużo sposóbów debuggowania poza przypisywaniem jaskrawych kolorów do zmiennych i wyciągania wniosków o działaniu shadera, na podstawie tego, co widzimy. Odkryjesz, że programowania GLSL jest często jak wkładanie miniaturowych statków do butelki - jest to trudne, ale tez piękne i satysfakcjonujące.

<!-- In shader-land we don’t have too many resources for debugging besides assigning strong colors to variables and trying to make sense of them. You will discover that sometimes coding in GLSL is very similar to putting ships inside bottles. Is equally hard, beautiful and gratifying. -->

![](08.png)

Czas przetestować nasze rozumienie kodu:

* Czy jesteś w stanie powiedzieć, gdzie na naszej kanwie znajduje się fragment o znormalizowanych współrzędnych `(0.0, 0.0)`?

* Co z framgentami o znormalizowanych współrzędnych `(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` i `(1.0, 1.0)`? 

* Czy jesteś w stanie użyć uniforma `u_mouse` wiedząc, że wartości są nieznormalizowane? Spróbuj użyć go do manipulacji kolorem za pomocą ruchów myszki.

* Czy jesteś sobie w stanie wyobrazić ciekawy sposób zmieniania koloru, łącząc współrzędne `u_mouse` z `u_time`?

Po wykonaniu tych ćwiczeń, zapewne zastanawiasz się, gdzie jeszcze można użyć twoich nowych shaderowych mocy. W następnym rozdziale zobaczymy jak stworzyć swój własny shader w three.js, Processing i openFrameworks.

<!-- Now it is time to try and challenge our understanding of this code.

* Can you tell where the coordinate `(0.0, 0.0)` is in our canvas?

* What about `(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` and `(1.0, 1.0)`?

* Can you figure out how to use `u_mouse` knowing that the values are in pixels and NOT normalized values? Can you use it to move colors around?

* Can you imagine an interesting way of changing this color pattern using `u_time` and `u_mouse` coordinates?

After doing these exercises you might wonder where else you can try your new shader-powers. In the following chapter we will see how to make your own shader tools in three.js, Processing, and openFrameworks. -->
