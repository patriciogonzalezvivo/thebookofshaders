![Paul Klee - Color Chart (1931)](klee.jpg)

## Cores

Não tivemos muita chance de conversar sobre os tipos de vetores GLSL. Antes de avançar, é importante aprender mais sobre essas variáveis e o assunto das cores é uma boa forma de descobrir mais sobre eles.

Se você é familiar com os paradigmas da programação orientada a objetos, provavelmente notou que estamos acessando os dados dentro dos vetores como qualquer `struct` regular do C.


```glsl
vec3 red = vec3(1.0,0.0,0.0);
red.x = 1.0;
red.y = 0.0;
red.z = 0.0;
```

Definir uma cor usando uma notação *x*, *y* e *z* pode ser confuso e levar a erros, certo? É por isso que existem outras formar de acessar essa mesma informação, mas com nomes diferentes. Os valores de `.x`, `.y` e `.z` podem ser chamados de `.r`, `.g` e `.b`, e `.s`, `.t` and `.p`. (`.s`, `.t` e `.p` geralmente são usados para coordenadas espaciais de uma textura, o que vamos ver em um capítulo mais pra frente). Você também pode acessar os dados num vetor usando um índice de posições, `[0]`, `[1]` e `[2]`.

As seguintes linhas mostram todos os modos de acessar o mesmo dado:

```glsl
vec4 vector;
vector[0] = vector.r = vector.x = vector.s;
vector[1] = vector.g = vector.y = vector.t;
vector[2] = vector.b = vector.z = vector.p;
vector[3] = vector.a = vector.w = vector.q;
```

Essas maneiras diferentes de apontar para as variáveis dentro de um vetor são apenas nomenclaturas projetadas para te ajudar a escrever um código mais claro. Essa flexibilidade, embutida na linguagem, é uma porta para você começar a pensar em cores e coordenadas espaciais como intercambiáveis.

Uma outra grande característica de tipos de vetores em GLSL é que as propriedades podem ser combinadas em qualquer forma que quiser, o que torna mais fácil realizar cast e misturar valores. Essa habilidade é chamada de *swizzle*.

```glsl
vec3 yellow, magenta, green;

// Fazendo o Amarelo
yellow.rg = vec2(1.0);  // Definindo 1. para os canais red e green 
yellow[2] = 0.0;        // Definindo 0. para o blue 

// Fazendo o Magenta
magenta = yellow.rbg;   // Definindo os canais com green e blue trocados

// Fazendo o Verde
green.rgb = yellow.bgb; // Definindo o canal blue do  Yellow (0) para os canais red e blue 
```

#### Para sua caixa de ferramentas

Você pode não ser acostumado a escolher cores com números - pode ser muito contra-intuitivo. Para sua sorte, há muitos programas que tornam esse um trabalho fácil. Encontre um que se encaixe às suas necessidades e então treine-o para entregar cores no formato `vec3` ou `vec4`. Por exemplo, aqui estão os templates que uso no [Spectrum](http://www.eigenlogik.com/spectrum/mac):

```
vec3({{rn}},{{gn}},{{bn}})
vec4({{rn}},{{gn}},{{bn}},1.0)
```

### Misturando cores

Agora que você já sabe como as cores são definidas, é hora de integrar isso com o que já sabemos. Em GLSL, existe uma função muito útil, [`mix()`](../glossary/?search=mix), que te permite mixar dois valores em porcentagens. Adivinha qual é o range de valores para a porcentagem? Sim, valores entre 0.0 e 1.0! Isso é perfeito para você, depois daquelas horas todas praticando seus movimentos de karatê com a cerca - é hora de usá-los!

![](mix-f.jpg)

Verifique o seguinte código na linha 18, veja como estamos usando os valores absolutos de uma onda senóide ao longo do tempo para mixar `colorA` e `colorB`.

<div class="codeAndCanvas" data="mix.frag"></div>

Demonstre suas habilidades, fazendo isso:

* Faça uma transição expressiva entre as cores. Pense numa emoção particulas. Que cor parace mais representar isso? Como ela aparece? Como ela desaparece? Pense em outra emoção e cores que combinam. Mude a cor do início e do fim do código acima, para combinar com essas emoçoes. Então, anime a transição usando funções de forma. Robert Penner desenvolveu uma série de funções de forma populares para animação em computadores, conhecida como [facilitando funções](http://easings.net/), você pode usar [este exemplo](../edit.php#06/easing.frag) como pesquisa e inspiração mas o melhor resultado virá com você fazendo suas próprias transições.

### Brincando com gradientes

A função [`mix()`](../glossary/?search=mix) tem mais a oferecer. Ao invés de um único simples `float`, podemos passar um tipo de variável que combine com os dois primeiros argumentos, em nosso caso um `vec3`. Fazendo isso, ganhamos controle sobre as porcentagens de mistura de cada canal individualmente, `r`, `g` e `b`.

![](mix-vec.jpg)

Dê uma olhada no exemplo a seguir. Como nos exemplos do capítulo anterior, estamos ligando a transição Às coordenada *x* normalizada e visualizando-a com uma linha. Nesse momento, todos os canais vão na mesma linha.

Agora, descomente a linha 25 e veja o que acontece. Então, tente descomentar as linhas 26 e 27. Lembre que as linhas visualizam a quantidade de `colorA` e `colorB` para misturar por canal.

<div class="codeAndCanvas" data="gradient.frag"></div>

Você deve ter reconheido as três funções de forma que estamos usando nas linhas 25 a 27. Brinque com elas! É hora de você explorar e exibir suas habilidades do capítulo anterior e fazer uns gradientes interessantes. Tente os seguintes exercícios:

![William Turner - The Fighting Temeraire (1838)](turner.jpg)

* Compor um gradiente que se pareça com o pôr do sol do William Turner 

* Animar uma transição entre um nascer e um pôr do sol, usando `u_time`.

* Você consegue fazer um arco-íris com o que aprendemos até agora?

* Use a função `step()` para criar uma bandeira colorida.

### HSB

Não podemos falar de cores sem falar no espaço de cores. Como você deve saber, existem modos diferentes de organizar as cores, além dos canais de vermelho, verde e azul.

[HSB](http://en.wikipedia.org/wiki/HSL_and_HSV) significa Matix(Hue), Saturação e Brilho (ou Valor) e é uma organização mais intuitiva e útil para as cores. Tire um momento para ler as funções `rgb2hsv()` e  `hsv2rgb()` no código a seguir.

Mapeando a posição no eixo x para Matiz, e a posiçãono eixo y para o Brilho, obtemos um bom espectro de cores visíveis. Esta distribuição espacial da cor pode ser bem interessante de se ter à mão; é mais intuitivo pegar uma cor com HSB do que com RGB.

<div class="codeAndCanvas" data="hsb.frag"></div>

### HSB em coordenadas polares

O HSB foi projetado originalmente para ser representados em coordenadas polares (baseadas em ângulo e raio) em vez de coordenadas cartesianas (baseadas em x e y). Para mapear nossa função HSB para coordenadas polares, precisamos obter o ângulo e distância do centro da tela até a coordenada do pixel. Para isso, usamos as funções [`length()`](../glossary/?search=length) e [`atan(y,x)`](../glossary/?search=atan) (que é a versão GLSL da função comumente usada `atan2(y,x)`).  

Quando você usa funções de vetores e trigonométricas, `vec2`, `vec3` e `vec4` são tratados como vetores mesmo quando eles representam cores. Vamos começar a tratar cores e vetores de modo similar, e de fato você vai descobrir que essa flexibilidade conceitual traz muito poder.


**Nota:** Se você está se perguntando, existem mais funções geométricas além de [`length`](../glossary/?search=length) como: [`distance()`](../glossary/?search=distance), [`dot()`](../glossary/?search=dot), [`cross`](../glossary/?search=cross), [`normalize()`](../glossary/?search=normalize), [`faceforward()`](../glossary/?search=faceforward), [`reflect()`](../glossary/?search=reflect) e [`refract()`](../glossary/?search=refract). GLSL também tem funções relacionais especiais para vetores, como: [`lessThan()`](../glossary/?search=lessThan), [`lessThanEqual()`](../glossary/?search=lessThanEqual), [`greaterThan()`](../glossary/?search=greaterThan), [`greaterThanEqual()`](../glossary/?search=greaterThanEqual), [`equal()`](../glossary/?search=equal) e [`notEqual()`](../glossary/?search=notEqual).

Uma vez que obtivemos o ângulo e tamanho, temos que "normalizar" os valores para o range entre 0.0 e 1.0. Na linha 27, [`atan(y,x)`](../glossary/?search=atan) vai retornar um ângulo em radianos, entre -PI e PI (-3.14 to 3.14), então temos que dividir esse número por `TWO_PI` (definido no início do código) para chegar a valores entre -0.5 e 0.5, que, por simples adição, mudamos para o range desejado de 0.0 a 1.0. O raio vai retornar um valor máximo de 0.5 (porque estamos calculando a distância do cento da tela), então precisamos dobrar esse range (multiplicando por dois) para ter o máximo de 1.0.

Como pode ver, nosso jogo aqui é transformar e mapear ranges para o range de 0.0 a 1.0 que nós gostamos.

<div class="codeAndCanvas" data="hsb-colorwheel.frag"></div>

Tente os seguintes exercícios:

* Modifique o exemplo polar para conseguir uma roda de cores girando, parecido com o ícone de espera do mouse.

* Use uma função de forma junto com a de conversão de HSB para RGB para expandir um valor de matiz particular e encolher o resto.

![William Home Lizars - Red, blue and yellow spectra, with the solar spectrum (1834)](spectrums.jpg)

* Se você olhar bem de perto na roda de cores usada nos selecionadores (ver a imagem acima), eles usam um espectro diferente de acordo com o espaço de cores RYB. por exemplo, a cor oposta ao vermelho deveria ser o verde, mas no nosso exemplo é o ciano. Você consegue achar um jeito de consertar isso, de modo a ficar parecendo exatamente igual à imagem seguinte? [Dica: esse é um bom momento para usar funções de forma.]

![](colorwheel.png)

* Leia o [livro Interaction of Color do Josef Albers'](http://www.goodreads.com/book/show/111113.Interaction_of_Color) e use os seguintes exemplos de shaders como prática.

<div class="glslGallery" data="160505191155,160505193939,160505200330,160509131554,160509131509,160509131420,160509131240" data-properties="clickRun:editor,openFrameIcon:false,showAuthor:false"></div>

#### Nota sobre funções e argumentos

Antes de pular para o próximo capítulo, vamos parar e recapitular. Volte e dê uma olhada nas funções nos exemplos anteriores. Você vai notar o `in` antes do tipo dos argumentos. Isso é um [*qualificador*](http://www.shaderific.com/glsl-qualifiers/#inputqualifier) e nesse caso, ele especifica que a variável é somente de leitura. Em exemplos futuros, vamos ver que é possível definir argumentos como `out` ou `inout`. Esse último, `inout`, é conceitualmente similar a passar um argumento por referência, que vai nos dar a possibilidade de modificar uma variável passada.

```glsl
int newFunction(in vec4 aVec4,      // read-only
                out vec3 aVec3,     // write-only
                inout int aInt);    // read-write
```
Você pode não acreditar, mas agora temos todos os elementos para fazer desenhos legais. No próximo capítulo, vamos aprender como combinar todos os nossos truques para fazer formar geométricas fazendo um *blend* (misturando) o espaço. Sim... *blend* no espaço.

