## Uniforms

Até agora, vimos como a GPU gerencia um grande número de threads em paralelo, cada uma sendo responsável por atribuir a cor a uma fração da imagem. Apesar de cada thread em paralelo ser cega em relação a outras, precisamos poder enviá-las algumas entradas (inputs) da CPU. Devido à arquitetura das placas de vídeo, essas entradas são iguais (*uniforms*) para todas as threads e necessariamente determinadas como *somente leitura*. Em outras palavras, cada thread recebe os mesmos dados que podem ser lidos mas não mudados.

Essas entradas se chamam `uniform` e podem vir na maioria dos tipos suportados: `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` e `samplerCube`. Uniformes são definidas com o tipo correspondente no começo do código logo após atribuir a precisão padrão de pontos flutuantes,

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load
```

Você pode imaginar as uniforms como pequenas pontes entre a CPU e a GPU. Os nomes vão variar de implementação para implementação, mas nesta série de exemplos, estou sempre passando: `u_time`  (tempo em segundos após o início do shader), `u_resolution` (tamanho da tela onde o shader está sendo desenhado) e `u_mouse` (posição em píxels do mouse dentro da tela). Eu estou seguindo a convenção de colocar `u_` antes do nome da uniform para evidenciar a natureza desta variável, mas você encontrará todos os tipos de nomes para uniformes. Por exemplo, [ShaderToy.com](https://www.shadertoy.com/) usa as mesmas uniforms, mas com os seguintes nomes:

```glsl
uniform vec3 iResolution;   // viewport resolution (in pixels)
uniform vec4 iMouse;        // mouse pixel coords. xy: current, zw: click
uniform float iTime;        // shader playback time (in seconds)
```

Chega de conversa, vamos ver as uniforms em ação. No código a segur, nós usamos `u_time` - o número de segundos desde o ínicio da execução do shader - junto com uma função de seno para animar a transição da quantidade de vermelho da tela.

<div class="codeAndCanvas" data="time.frag"></div>

Como você pode ver, GLSL tem mais surpresas. A GPU tem funções angulares, trigonométricas e exponenciais aceleradas pelo hardware.  Algumas funções são: [`sin()`](../glossary/?search=sin), [`cos()`](../glossary/?search=cos), [`tan()`](../glossary/?search=tan), [`asin()`](../glossary/?search=asin), [`acos()`](../glossary/?search=acos), [`atan()`](../glossary/?search=atan), [`pow()`](../glossary/?search=pow), [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log), [`sqrt()`](../glossary/?search=sqrt), [`abs()`](../glossary/?search=abs), [`sign()`](../glossary/?search=sign), [`floor()`](../glossary/?search=floor), [`ceil()`](../glossary/?search=ceil), [`fract()`](../glossary/?search=fract), [`mod()`](../glossary/?search=mod), [`min()`](../glossary/?search=min), [`max()`](../glossary/?search=max) and [`clamp()`](../glossary/?search=clamp).

 Agora é hora de explorar novamente com o código acima.

 * Desacelere a frequência até que a mudança de cores se torne quase imperceptível.

 * Aumente a velocidade até que seja possível ver somente uma cor sem oscilações.

 * Brinque com os três canais de cores em frequências diferentes para obter padrões e comportamentos interessantes.

 ## gl_FragCoord

Da mesma forma que GLSL nos retorna uma saída padrão, `vec4 gl_FragColor`, ela também nos dá uma entrada padrão, `vec4 gl_FragCoord`, que guarda as coordenadas do *pixel* ou *screen fragment* que a thread ativa está processando. Com `vec4 gl_FragCoord`, sabemos onde a thread está trabalhando dentro da tela. Neste caso, não definimos como `uniform` porque seu valor será diferente para cada thread, portanto, `gl_FragCoord` será determinada como *varying*.

<div class="codeAndCanvas" data="space.frag"></div>

No código acima nós *normalizamos* as coordenadas do fragmento ao dividi-las pela resolução total da tela. Fazendo isso, este valor será entre `0.0` e `1.0`, o que facilita mapear os valores de X e Y nos canais RED (vermelho) e GREEN (verde).

No terra dos shaders, nós não temos muitos recursos para depurar além de atribuir cores fortes às variáveis e deduzir seu comportamento. Você descobrirá que, as vezes, programar em GLSL é muito parecido com colocar navios dentro de garrafas. É, ao mesmo tempo, difícil, bonito e gratificante.

![](08.png)

Agora é hora de tentar e desafiar nosso conhecimento sobre este código.

* Você pode dizer onde a coordenada `(0.0, 0.0)` está em nossa tela?

* E quanto `(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` e `(1.0, 1.0)`?

* Você consegue pensar em alguma forma de como usar a variável `u_mouse` sabendo que os valores são em pixels e NÃO normalizados? Você pode usá-la para mover as cores?

* Você consegue imaginar uma forma interessante de mudar essa paleta de cores usando `u_time` e `u_mouse`?

Depois de fazer esses exercícios, você pode se perguntar onde mais você pode experimentar seus novos poderes de shaders. No próximo capítulo, nós veremos como fazer suas próprias ferramentas de shaders em three.js, Processing e openFrameworks.
