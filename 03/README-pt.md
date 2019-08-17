## Uniformes

Até agora, nós vimos como a GPU gerencia um grande número de threads, cada uma responsável por associar a cor a uma fração da imagem. Embora cada thread paralela seja cega às outras, precisamos conseguir enviar entradas da CPU para todas as threads. Por causa da arquitetura das placas gráficas, essas entradas vão ser iguais (*uniform*) para todas as threads e necessariamente setadas como *read only*. Em outras palavrasm cada thread recebe os mesmos dados que pode ler, mas não pode mudar.

Essas entradas são chamadas de `uniform` em vêm na maioria dos tipos suportados: `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` e  `samplerCube`. Uniformes são definidos com o tipo correspondente no topo do shader, logo depois de associar a precisão default.

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Tamanho do Canvas (width,height)
uniform vec2 u_mouse;       // posição do mouse em pixels da tela
uniform float u_time;       // Tempo em segundos desde carregado
```

Você pode imaginar nos uniforms como sendo pequenas pontes entre a CPU e a GPU. Os nomes vão variar de uma implementação para outra, mas nessa série de exemplos eu sempre vou passar `u_time` (tempo em seguntos desde que shader começou), `u_resolution` (tamanho do 'letreiro' onde o shader está sendo desenhado) e `u_mouse` (posição do mouse dentro do letreiro, em  pixels). Vou seguir convenção de colocar `u_` antes do nome do uniform para ser explícito sobre a natureza dessa variável, mas você vai encontrar todos os tipos de nomes para os uniformes. Por exemplo [ShaderToy.com](https://www.shadertoy.com/) usa os mesmos uniformes, mas com os seguintes nomes:

```glsl
uniform vec3 iResolution;   // resolução da viewport (em pixels)
uniform vec4 iMouse;        // coordenadas dos pixels do mouse . xy: atual, zw: clique
uniform float iTime;        // tempo de execução do shader (em segundos)
```

Chega de papo, vamos ver os uniforms em ação. No código a seguir, usamos `u_time` - o número de segundos desde que o shader começou a executar - junto com uma função seno para animar a transição da quantidade de vermelho no letreiro.

<div class="codeAndCanvas" data="time.frag"></div>

Como você pode ver, GLSL tem mais surpresas. A GPU tem funções de ângulo, trigonométricas e exponenciais, aceleradas por hardware. Algumas dessas funções são: [`sin()`](../glossary/?search=sin), [`cos()`](../glossary/?search=cos), [`tan()`](../glossary/?search=tan), [`asin()`](../glossary/?search=asin), [`acos()`](../glossary/?search=acos), [`atan()`](../glossary/?search=atan), [`pow()`](../glossary/?search=pow), [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log), [`sqrt()`](../glossary/?search=sqrt), [`abs()`](../glossary/?search=abs), [`sign()`](../glossary/?search=sign), [`floor()`](../glossary/?search=floor), [`ceil()`](../glossary/?search=ceil), [`fract()`](../glossary/?search=fract), [`mod()`](../glossary/?search=mod), [`min()`](../glossary/?search=min), [`max()`](../glossary/?search=max) and [`clamp()`](../glossary/?search=clamp).

Agora é a hora de brincar de novo com o código acima.

* Diminua a frequência até que a mudança de cor seja quase imperceptível.

* Acelere até você ver cada cor sem efeito de flicker.

* Brinque com os três canais (RGB) em frequências diferentes para conseguir padrões e comportamentos interessantes.

## gl_FragCoord

Da mesma forma que a GLSL nos dá um output default, `vec4 gl_FragColor`, ela também nos dá um input default, `vec4 gl_FragCoord`, que contém aos coordenadas na tela do *pixel* ou *fragmento da tela* que a thread ativa está trabalhando. Com `vec4 gl_FragCoord`, sabemos onde uma thread está trabalhando dentro do letreiro. Neste caso, não chamamos de `uniform` porque ela será diferente de uma thread para a outra, então a `gl_FragCoord` é chamada de *variante*.

<div class="codeAndCanvas" data="space.frag"></div>

No código acima, nós *normalizamos* a coordenada do fragmento dividindo-a pela resolução total do letreiro. Fazendo isso, os valores ficarão entre  `0.0` e `1.0`, o que torna mais fácil mapear os valores X e Y para os canais RED e GREEN.

Na "shaderlândia", não temos muitos recursos para depurar, além de associar cores fortes a variáveis e tentar fazer um sentido com elas. Você vai descobrir que, às vezes, codificar em GLSL é muito parecido com colocar navios dentro de garrafas. É igualmente difícil, bonito e gratificante.

![](08.png)

Agora é a hora de tentar e desafiar nosso entendimento desse código.

* Você pode dizer onde fica a coordenada `(0.0, 0.0)` em nosso canvas?

* E as coordenadas  `(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` e `(1.0, 1.0)`?

* Você consegue imaginar como usar `u_mouse` sabendo que os valores são em pixels e NÃO valores normalizados? Você pode usar isso para mover as cores ao redor?

* Você pode imaginar uma forma interessante de mudar esse padrão de cores usando as coordenadas `u_time` e `u_mouse`?

Depois de fazer esses exercícios, você poderia pensar em que mais poderia tentar seus novos poderes de shader. No capítulo seguinte, vamos ver como fazer sua própria ferramenta de shader em three.js, Processing, e openFrameworks.
