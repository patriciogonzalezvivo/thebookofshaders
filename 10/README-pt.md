# Designs Generativos

Não é uma surpresa que, depois de tanta repetição e ordem, o autor seja forçado a trazer algum caos. 

## Aleatoriedade

[![Ryoji Ikeda - test pattern (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

Aleatoriedade é uma expressão máxima da entropia. Como podemos gerar aleatoriedade dentro de um ambiente de código tão rídigo e, aparentemente, previsível? 

Vamos começar, analisando a seguinte função:

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Acima, estamos extraindo o conteúdo fracionário de uma onda senoide. Os valores de [```sin()```](../glossary/?search=sin) que flutuam entre ```-1.0``` e ```1.0``` foram cortados depois do ponto flutuante, retornando todos valores positivos entre ```0.0``` e ```1.0```. Podemos usar esse efeito para obter algums valores pseudo-aleatórios, quebrando essa onda de seno em pedaços menores. Como? Multiplicando o resultante de [```sin(x)```](../glossary/?search=sin) por números maiores. Vá em frente e clique na função acima e comece a adicionar alguns zeros.

Quando você chegar lá pelo ```100000.0``` ( e a equação parecer com isso: ```y = fract(sin(x)*100000.0)``` ) você não vai mais ser capaz de distinguir a onda do seno. A granularidade da parte fracionária corrompeu o fluxo da onda em um caos pseudo-aleatório.

## Controlando o caos

Usar o random pode ser difícil; é ao mesmo tempo caótico demais, e às vezes pouco aleatório. Dê uma olhada no gráfico a seguir. Para fazê-lo, estamos usando a função ```rand()``` que é implementada exatamente como descrevemos acima.

Olhando mais de perto, você pode ver a crista da onda do [```sin()```](../glossary/?search=sin) em ```-1.5707``` e ```1.5707```. Eu aposto que agora você entende porque - é onde acontecem o máximo e o mínimo da onda de seno.

Se olhar bem de perto na distribuição aleatória, você vai notar que existe uma concentração em torno do meio, comparado com as bordas.

<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

Há um certo tempo, o [Pixelero](https://pixelero.wordpress.com) publicou um  [artigo interessante sobre distribuição aleatória](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/). Eu adicionei alguma das funções que ele usa no gráfico anterior, para você brincar com elas, e ver como a distribuição pode ser alterada. Descomente as funções e veja o que acontece.

Se você ser o [artigo do Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/), é importante ter em mente que nossa função ```rand()``` é um random determinístico, também conhecido como pseudo-random. Isso quer dizer que, por exemplo, ```rand(1.)``` vai sempre retornar o mesmo valor. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) faz referência à função ```Math.random()``` do ActionScriptm que é não-determinística; toda chamada vai retornar um valor diferente.

## 2D Random

Agora que temos um entendimento melhor da aleatoriedade, é hora de aplicar isso em duas dimensões, tanto para o eixo ```x``` quanto o ```y```. Para isso, precisamos de uma maneira de transformar um vetor bi-dimensional em um valor de ponto flutuante, de uma dimensão. Existem formas diferentes de se fazer isso, mas a função [```dot()```](../glossary/?search=dot) é bem útil nesse caso. Ela retorna um valor float entre ```0.0``` e ```1.0``` dependendo do alinhamento dos vetores.

<div class="codeAndCanvas" data="2d-random.frag"></div>

Veja as linhas 13 a 15 e note como estamos comparando o ```vec2 st``` com outro vetor bi-dimensional ( ```vec2(12.9898,78.233)```).

* Tente mudar os valores  nas linhas  14 e 15. Veja como o padrão do random muda e pense no que podemos aprender com isso.

* Junte essa função random à interação com o mouse (```u_mouse```) e tempo (```u_time```) para entender melhor como ela funciona.

## Usando o chaos

A random em duas dimensões parece bastante com o ruído da TV, não é? É um material difícil para usar para compor imagens. Vamos aprender como fazer uso disso.

Nosso primeiro passo é aplicar um grid; usando a função [```floor()```](../glossary/?search=floor) vamos gerar uma tabela inteira de células. Dê uma olhada nesse código a seguir, em especial as linhas 22 e 23.

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

Depois de escalar o espaço por 10 (na linha 21), nós separamos os inteiros das coordernadas da parte fracionária. Estamos familiares com essa última operação porque já vínhamos usando para subdividir um espaço em células menores, que vão de ```0.0``` a ```1.0```. Obtendo a parte inteira da coordenada, isolamos um valor comum para uma região de pixels, que vai parecer com uma célula simples. Então, podemos usar esse inteiro comum para obter um valor aleatório para essa área. Como nossa random é determinística, o valor aleatório retornado vai ser constante para todos os pixels naquela célula.

Descomente a linha 29 e veja que nós preservamos a parte de ponto flutuante da coordenada, de modo que podemos ainda usar o sistema de coordenadas para desenhar coisas dentro de cada célula.

Combinar esses dois valores - a parte inteira e a fracionária da coordenada - vai te permitir misturar variação e ordem.

Dê uma olhada nessa versão portada para GLSL do famoso gerador de labirintos ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10```.

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

Aqui, estou usando os valores aleatórios de células para desenhar uma linha em uma direção ou outra, usando a função ```truchetPattern()``` do capítulo anterior (linhas 41 a 47).

Você pode conseguir outro padrão interessante ao descomentar o bloco de linhas entre 50 e 53, ou animar o padrão ao descomentar as linhas 35 e 36.

## Seja Master no Random

[Ryoji Ikeda](http://www.ryojiikeda.com/), um japonês que é compositor eletrônico e artista visual, fez uso de mestre do random; é difícil não ser tocado e hipnotizado por seu trabalho. Seu uso da aleatoriedade em mídia visua e áudio é trabalhada de forma que não é vira um caos irritante, mas um espelho da complexidade de nossa cultura tecnológica.

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Veja o trabalho do [Ikeda](http://www.ryojiikeda.com/) e tente os seguintes exercícios:

* Faça linhas de células se movendo (em direções opostas) com valores aleatórios. Exiba apenas as células com valores mais claros. Faça a velocidade das células mudar ao longo do tempo.

<a href="../edit.php#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* De modo similar, faça várias linhas, mas cada uma com velocidade e direção diferentes. Ligue a posição do mouse ao threshold de cada célula a exibir.

<a href="../edit.php#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Crie outros efeitos interessantes.

<a href="../edit.php#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

Usar uma estética aleatória pode ser problemática, especialmente se você quer fazer simulações que pareçam naturais. A random é simplesmente caótica demais, e bem poucas coisas parecem com ```random()``` na vida real. Se você olhar um padrão de chuva, ou gráfico de ações, que são bem aleatórios, eles não são nada como o padrão aleatório que fizemos no começo desse capítulo. A razão? Bem, valores aleatórios não têm correlação entre eles de qualquer modo, mas a maioria dos padrões naturais têm alguma memória do estado anterior.

No próximo capítulo vamos aprender sobre ruído, a forma suave e de *aparência natural* de criar caos computacional.