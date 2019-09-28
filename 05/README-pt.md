# Desenho algorítmico
## Funções de formas

Este capítulo poderia ser chamado de "lição da cerca do sr. Miyagi". Anteriormente, nós mapeamos a posição normalizada de *x* e *y* para os canais *red* e *green*. Essencialmente, fizemos uma função que recebe um vetor de duas dimensões (x e y) e retorna um de quatro dimensões (r, g, b e a). Mas, antes de seguirmos em frente e transformar dados entre as dimensões, precisamos começar de modo mais simples... muito mais simples. Isso significa entender como fazer uma função dimensional. Quanto mais energia e tempo você gastar aprendendo isso, mais forte vai seu karate-shader será.

![The Karate Kid (1984)](mr_miyagi.jpg)

A estrutura de código a seguir vai ser a sua cerca. Nele, visualizamos o valor normalizado da coordenada *x* (`st.x`) de duas formas: uma com brilho (observe o gradiente legal, do preto até o branco) e a outra, plotando uma linha verde no topo (nesse caso, o valor *x* é associado diretamente para o valor *y*). Não foque muito na função de plotagem, nós vamos entrar nela com mais detalhes em breve.

<div class="codeAndCanvas" data="linear.frag"></div>

**Nota Rápida**: O construtor do tipo `vec3` "entende" que você quer definir os três canais de cores com o mesmo valor, enquanto o `vec4` entende que você quer construir um vetor de quatro dimensões, com um vetor de três mais um quarto valor (neste caso o valor que controla o valor de alpha ou opacidade). Veja por exemplo as linhas 20 e 26 acima.

Este código é sua cerca; é importante observá-lo e entendê-lo. Você vai voltar várias vezes a esse espaço entre *0.0* e *1.0*. Você vai se especializar na arte de misturar e dar forma a essa linha.

Esta relação de um para um entre *x* e *y* (ou o brilho) é conhecida como *interpolação linear*. Daqui podemos usar algumas funções matemáticas para dar *forma* à linha. Por exemplo, podemos aumentar *x* à potência de 5 para criar uma linha *curva*.

<div class="codeAndCanvas" data="expo.frag"></div>

Interessante, certo? Na linha 22, tente expoentes diferentes: 20.0, 2.0, 1.0, 0.0, 0.2 e 0.02 por exemplo. Entender essa relação entre o valor e o expoente vai ser muito útil. Usando esses tipos de funções matemáticas aqui e ali vai dar a você um controle expressivo sobre seu código, um tipo de acupuntura de dados que permite controlar o fluxo de valores.

[`pow()`](../glossary/?search=pow) é uma função nativa em GLSL e existem muitas outras. A maioria delas são aceleradas a nível de hardware, o que significa que se elas forem usadas do modo certo, e com discrição, elas vão tornar seu código mais rápido.

Troque a função de potência na linha 22. Tente outras, como: [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log) e [`sqrt()`](../glossary/?search=sqrt). Algumas dessas funções são mais interessantes quando você brinca com elas usando PI. Você pode ver, na linha 8, que eu defini uma macro que vai substituir toda chamada a `PI` com o valor `3.14159265359`.

### Step e Smoothstep

GLSL também tem algumas funções únicas nativas de interpolação, aceleradas por hardware.

A interpolação  [`step()`](../glossary/?search=step) recebe dois parâmetros. O primeiro é o limite ou threshold, enquanto o segundo é o valor que nós queremos checar ou passar. Qualquer valor abaixo do limite vai retonar `0.0` e tudo acima do limite retornará `1.0`.

Tente mudar esse valor de limite na linha 20 do código acima.

<div class="codeAndCanvas" data="step.frag"></div>

A outrao função é conhecida como [`smoothstep()`](../glossary/?search=smoothstep). Dado um range de dois números e um valor, esta função vai interpolar o valor entre o range definido. Os dois primeiros parâmetros são o começo e o fim da transição, e o terceiro é o valor a interpolar.

<div class="codeAndCanvas" data="smoothstep.frag"></div>

No exemplo anterior, na linha 12, note que usamos o smoothstep para desenhar a linha verde na função `plot()`. Para cada posição ao longo do eixo *x* essa função faz um *bump* em determinado valor de *y*. Como? Conectando dois [`smoothstep()`](../glossary/?search=smoothstep). Dê uma olhada na seguinte função, substitua pela linha 20 acima e pense nela como um corte vertical. O fundo parece uma linha, certo?

```glsl
float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
```

### Seno e Cosseno

Quando você quer usar matemática para animar, dar forma ou misturar valores, não há nada melhor que ser amigo do seno e cosseno.

Essas duas funções trigonométricas básicas trabalham juntas para construir círculos que são tão úteis quanto o canivete suíço do MacGyver. É importante saber como elas se comportam e de que maneiras podem ser combinadas. Em resumo, dado um ângulo (em radianos) elas vão retornar o posição correta de *x* ([cosine](../glossary/?search=cos)) e *y* ([sine](../glossary/?search=sin)) de um ponto na borda do círculo com raio igual a 1. Mas, o fato de que elas retornam valores normalizados (entre -1 e 1) de forma tão suave, faz com que sejam uma ferramenta incrível.

![](sincos.gif)

Ainda que seja difícil descrever todas as relações entre as funções trigonométricas e os círculos, a animação acima faz um belo trabalho de sumarizar essas relações visualmente.

<div class="simpleFunction" data="y = sin(x);"></div>

Dê uma olhada com atenção nessa onda do seno. Note como os valores *y* fluem suavemente entre +1 e -1. Como vimos no exemplo do tempo no capítulo anterior, você pode usar esse comportamento rítmico do [`sin()`](../glossary/?search=sin) para animar propriedades. Se você está lendo esse exemplo no browser, vai ver que pode mudar o código na fórmula acima para observar como a onda muda. OBS.: não se esqueça do ponto e vírgula no fim das linhas.

Tente os exercícios seguintes veja o que acontece: 

* Adicione o tempo (`u_time`) ao *x* antes de calcular o `seno`. Internalize o **movimento** ao longo de *x*.

* Multiplique *x* por `PI` antes de calcular o `seno`. Note como as duas fases **encolhem** de modo que cada ciclo se repete a cada 2 inteiros.

* Multiplique o tempo (`u_time`) por *x* antes de calcular o `seno`. Veja como a frequência **frequency** entre as fases se torna mais e mais comprimida. Note que u_time pode já ter se tornado muito grande, fazendo o gráfico difícil de ler.

* Adicione 1.0 ao [`sin(x)`](../glossary/?search=sin). Veja como a onda inteira fica **deslocada** pra cima, e como todos os valores ficam entre 0.0 e 2.0.

* Multiplique [`sin(x)`](../glossary/?search=sin) por 2.0. Note como a **amplitude** dobra de tamanho.

* Compute o valor absoluto ([`abs()`](../glossary/?search=abs)) de `sin(x)`. Parece com o rastro de uma bola **saltitante**.

* Extraia apenas a parte fracionária ([`fract()`](../glossary/?search=fract)) do resultado de [`sin(x)`](../glossary/?search=sin).

* Adicione o maior inteiro ([`ceil()`](../glossary/?search=ceil)) e o menor ([`floor()`](../glossary/?search=floor)) do resultado de [`sin(x)`](../glossary/?search=sin) para obter uma onda digital de valores 1 e -1.

### Algumas funções extras úteis

No fim do último exercício, nós introduzimos algumas novas funções. Agora é hora de experimentas com cada uma, descomentando as linhas abaixo, uma de cada vez. Conheça essas funções e estude como elas se comportam. Eu sei, você está se perguntando... por queê? Uma pesquisa rápida no google sobre "arte generativa" ("generative art") vai te dizer. Tenha em mente que essas funções são nossa cerca. Estamos nos especializando no movimento em uma dimensão, para cima e para baixo. Logo será a hora para duas, três e quatro dimensões!

![Anthony Mattox (2009)](anthony-mattox-ribbon.jpg)

<div class="simpleFunction" data="y = mod(x,0.5); // retorna x módulo de 0.5
//y = fract(x); // retorna somente a parte fracionária de um número
//y = ceil(x);  // o inteiro mais próximo que seja maior ou igual de  x
//y = floor(x); // o inteiro mais próximo que seja menor ou igual de x
//y = sign(x);  // extrai o sinal de x
//y = abs(x);   // retorna o valor absoluto de  x
//y = clamp(x,0.0,1.0); // restringe x para ficar entre 0.0 e 1.0
//y = min(0.0,x);   // retorna o menor, x ou 0.0
//y = max(0.0,x);   // retorna o maior, x ou 0.0 "></div>

### Funções de forma avançadas

[Golan Levin](http://www.flong.com/) tem uma grande documentação sobre funções de forma mais complexas que são extraordinariamente úteis. Portá-las para o GLSL é um movimento bem esperto, para começar a construir seus próprios recursos de pedaços de código.

* Funções de Forma - Polinomiais: [www.flong.com/texts/code/shapers_poly](http://www.flong.com/texts/code/shapers_poly/)

* Funções de Forma - Exponenciais: [www.flong.com/texts/code/shapers_exp](http://www.flong.com/texts/code/shapers_exp/)

* Funções de Forma - Circulares e Elípticas: [www.flong.com/texts/code/shapers_circ](http://www.flong.com/texts/code/shapers_circ/)

* Funções de Forma - Bezier e outras formas paramétricas: [www.flong.com/texts/code/shapers_bez](http://www.flong.com/texts/code/shapers_bez/)

<div class="glslGallery" data="160414041542,160414041933,160414041756" data-properties="clickRun:editor,hoverPreview:false"></div>

Como os chefs que colecionam temperos e ingredientes exóticos, os artistas digitais e programadores criativos têm um amor particular em trabalhar em suas próprias funções de forma.

[Iñigo Quiles](http://www.iquilezles.org/) tem uma grande coleção de [funções úteis](http://www.iquilezles.org/www/articles/functions/functions.htm). Depois de ler [este artigo](http://www.iquilezles.org/www/articles/functions/functions.htm) veja a seguinte tradução dessas funções para o GLSL. Preste atenção nas pequenas alterações necessárias, como colocar o "." (ponto) nos números de ponto flutuante e usar os nomes GLSL para as *funções C*; por exemplo, ao invés de usar `powf()`, use `pow()`:   

<div class="glslGallery" data="05/impulse,05/cubicpulse,05/expo,05/expstep,05/parabola,05/pcurve" data-properties="clickRun:editor,hoverPreview:false"></div>

Para manter sua motivação em alta, aqui está um exemplo elegante (feito pelo [Danguafer](https://www.shadertoy.com/user/Danguafer)) para aumentar suas habilidades no karate das funções de formas.

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/XsXXDn?gui=true&t=10&paused=true" allowfullscreen></iframe>

No *Próximo >>* capítulovamos começar a usar nossos novos movimentos. Primeiro, misturando cores, e então desenhando formas.

#### Exercício

Dê uma olhada na tabela a seguir, com equações, feita por [Kynd](http://www.kynd.info/log/). Veja como ele está combinando funções e suas propriedades para controlar os valores entre 0.0 e 1.0. Agora é hora de você praticar, replicando essas funções. Lembre-se de que quanto mais você praticar, melhor vai ser o seu karatê.

![Kynd - www.flickr.com/photos/kynd/9546075099/ (2013)](kynd.png)

#### Para sua caixa de ferramentas

Aqui estão algumas ferramentas que vão fazer mais fácil você a visualizar esses tipos de funções.

* Grapher: se você tem um computador com MacOS, digite `grapher` no spotlight e você vai poder usar essa ferramentas super útil.

![OS X Grapher (2004)](grapher.png)

* [GraphToy](http://www.iquilezles.org/apps/graphtoy/): de novo [Iñigo Quilez](http://www.iquilezles.org) fez uma ferramenta para visualizar funções GLSL em WebGL.

![Iñigo Quilez - GraphToy (2010)](graphtoy.png)

* [Shadershop](http://tobyschachman.com/Shadershop/): essa ferramenta fantástica criada por [Toby Schachman](http://tobyschachman.com/) vai te ensinar como construir funções complexas, de uma maneira incrível, intuitiva e visual.

![Toby Schachman - Shadershop (2014)](shadershop.png)
