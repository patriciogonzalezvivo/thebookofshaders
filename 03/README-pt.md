## Uniforms

Até agora, vimos como a GPU lida um grande número de threads em paralelo, cada uma sendo responsável por atribuir a cor a uma porção da imagem. Apesar de cada thread paralela não saber da existência das outras, precisamos ser capazes de enviá-las algumas entradas (inputs) da CPU. Devido à arquitetura das placas de vídeo, essas entradas serão iguais (*uniform*) para todas as threads e necessariamente determinadas como *somente leitura*. Em outras palavras, cada thread recebe os mesmos dados, os quais se podem ler mas não podem se alterar.

Essas entradas são chamamadas de `uniform`  e podem ser de tipos diferentes, como: `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` e `samplerCube`. Uniformes são definidas com o tipo correspondente no começo do código, logo após atribuir a precisão padrão de pontos flutuantes,

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load
```

Imagine os uniforms como pequenas pontes entre a CPU e a GPU. Os nomes variam dependendo da implementação, mas nessa série de exemplos estarei sempre usando: `u_time` (tempo em segundos desde que o shader foi iniciado), `u_resolution` (tamanho da tela onde o shader está sendo desenhado) and `u_mouse` (posição em pixels do mouse dentro da tela). Estarei seguindo a convenção ao colocar `u_` antes do nome da uniform para  evidenciar a natureza desta variável mas você encontrará outros tipos de nomenclatura para uniforms. Por exemplo [ShaderToy.com](https://www.shadertoy.com/) utiliza os mesmos uniforms mas com os seguintes nomes:

```glsl
uniform vec3 iResolution;   // viewport resolution (in pixels)
uniform vec4 iMouse;        // mouse pixel coords. xy: current, zw: click
uniform float iTime;        // shader playback time (in seconds)
```

Chega de conversa, vamos ver os uniforms em ação. No código abaixo, usamos `u_time` - o número de segundos desde que o shader começou a ser executado - junto com uma função de seno para animar a transição da quantidade de vermelho na tela.

<div class="codeAndCanvas" data="time.frag"></div>

Como você pode ver, GLSL tem mais surpresas. A GPU tem funções angulares, trigonométricas e exponenciais aceleradas pelo hardware. Algumas dessas funções são: [`sin()`](../glossary/?search=sin), [`cos()`](../glossary/?search=cos), [`tan()`](../glossary/?search=tan), [`asin()`](../glossary/?search=asin), [`acos()`](../glossary/?search=acos), [`atan()`](../glossary/?search=atan), [`pow()`](../glossary/?search=pow), [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log), [`sqrt()`](../glossary/?search=sqrt), [`abs()`](../glossary/?search=abs), [`sign()`](../glossary/?search=sign), [`floor()`](../glossary/?search=floor), [`ceil()`](../glossary/?search=ceil), [`fract()`](../glossary/?search=fract), [`mod()`](../glossary/?search=mod), [`min()`](../glossary/?search=min), [`max()`](../glossary/?search=max) e [`clamp()`](../glossary/?search=clamp).

Agora é novamente a hora de experimentar com o código acima.

* Diminua a frequência até a mudança de cor se tornar quase imperceptível.

* Aumente a velocidade até que seja possível ver somente uma cor sem oscilações.

* Experimente alterar os valores dos três canais de cores (RGB) em diferentes frequências a fim de obter padrões e comportamentos interessantes.

## gl_FragCoord

Da mesma maneira que GLSL nos dá um output padrão, `vec4 gl_FragColor`, ele também nos dá um input padrão, `vec4 gl_FragCoord`, que possui as coordenadas de um *pixel* ou *screen fragment* com que a thread ativa está processando. Com `vec4 gl_FragCoord` podemos saber onde a thread está trabalhando dentro da tela. Neste caso, não chamaremos isso de `uniform` porque seu valor será diferente para cada thread, logo `gl_FragCoord` é chamada de *varying*.

<div class="codeAndCanvas" data="space.frag"></div>

No código acima nós *normalizamos* as coordenadas do fragmento ao dividi-las pela resolução total da tela. Fazendo isso, os valores serão entre `0.0` e `1.0`, o que facilita mapear os valores de X e Y para os canais RED e GREEN.

No mundo dos shaders, não temos muitos recursos para depurar bugs além de atribuir uma cor marcante às variáveis e tentar entender o que está acontecendo com as mesmas. Você descobrirá que, às vezes, programar em GLSL é bem similar a construir navios dentro de garrafas. É igualmente difícil, bonito e gratificante.

![](08.png)

Agora é a hora de tentar e desafiar a nossa compreensão desse código.

* Você pode dizer onde a coordenada `(0.0, 0.0)` está em nossa tela?

* E quanto `(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` e `(1.0, 1.0)`?

* Você pode adivinhar como se usa o uniform `u_mouse`, sabendo que os valores são em pixel e NÃO em valores normalizados? Você pode usá-lo para mover as cores ao longo da tela?

* Você consegue imaginar uma maneira interessante para mudar esse padrão de cor usando `u_time` e as coordenadas de `u_mouse`?

Após completar estes exercícios, você talvez se pergunte onde mais você pode aplicar seu novo superpoder de shader. No próximo capítulo veremos como fazer as nossas próprias ferramentas de shader em three.js, Processing, e openFrameworks.
