## Uma introdução para quem vem do JS
por [Nicolas Barradeau](http://www.barradeau.com/)


Se você é um desenvolvedor JavaScript, provavelmente ficará um pouco confuso ao ler este livro.
De fato, existem muitas diferenças entre manipular JavaScript de alto nível e trabalhar com shaders.
No entanto, ao contrário da linguagem assembly subjacente, GLSL é legível e tenho certeza de que, uma vez que você reconheça suas especificidades, logo estará criando shaders.

Pressuponho que você tenha conhecimento prévio (ainda que superficial) de JavaScript, é claro, mas também da Canvas API.
Se não tiver, não se preocupe, você ainda conseguirá aproveitar a maior parte desta seção.

Além disso, não vou entrar em muitos detalhes e algumas coisas podem ser _meio verdadeiras_, não espere um "guia definitivo" mas sim

### UM GRANDE ABRAÇO

JavaScript é ótimo para prototipagem rápida; você joga um monte de variáveis e métodos aleatórios e sem tipo, pode adicionar e remover dinamicamente membros da classe, atualizar a página e ver se funciona,
fazer ajustes conforme necessário, atualizar a página novamente, repetir, a vida é fácil.
Então você pode se perguntar qual é a diferença entre JavaScript e GLSL.
Afinal, ambos executam no navegador, ambos são usados para desenhar um monte de coisas interessantes na tela e, nesse sentido, JS é mais fácil de usar.

Bem, a principal diferença é que Javascript é uma linguagem **interpretada** enquanto GLSL é uma linguagem **compilada**.
Um programa **compilado** é executado nativamente no SO, é de baixo nível e geralmente rápido.
Um programa **interpretado** requer uma [Máquina Virtual](https://en.wikipedia.org/wiki/Virtual_machine) (VM) para ser executado, é de alto nível e geralmente lento.


Quando um navegador (a _**VM** JavaScript_) **executa** ou **interpreta** um trecho de JS, ele não tem ideia de qual variável é o quê e qual função faz o quê (com a notável exceção de **TypedArrays**).
Portanto, não consegue otimizar nada de _antemão_, então leva algum tempo para ler seu código, **deduzir** (tirar conclusões do uso) os tipos de suas variáveis e métodos
e, quando possível, converterá _parte_ do seu código em código assembly que executará muito mais rápido.

É um processo lento, trabalhoso e absurdamente complexo, se você estiver interessado nos detalhes, recomendo assistir a como [o motor V8 do Chrome funciona](https://developers.google.com/v8/).
O pior é que cada navegador otimiza JS de sua maneira e o processo fica _oculto_ de você; você é impotente.

Um programa **compilado** não é interpretado; o SO o executa, se o programa for válido, será executado.
Isso é uma mudança grande; se você esquecer um ponto e vírgula no final da linha, seu código é inválido, não será compilado: seu código não se tornará um programa.

Isso é frio mas é exatamente isso que um **shader** é: _um programa compilado executado na GPU_.
Não tenha medo! Um **compilador**, o programa que garante que seu código é válido, se tornará seu melhor amigo.
Os exemplos deste livro e o [editor complementar](http://editor.thebookofshaders.com/) são muito amigáveis ao usuário.
Eles dirão onde e por que seu programa falhou ao compilar, então você terá que consertar as coisas e sempre que o shader estiver pronto para compilar, será exibido instantaneamente.
É uma ótima forma de aprender pois é muito visual e você realmente não consegue quebrar nada.

Última observação, um **shader** é composto de 2 programas, o **vertex shader** e o **fragment shader**.
Em resumo, o **vertex shader**, o primeiro programa, recebe uma *geometria* como entrada e a transforma em uma série de **pixels** (ou *fragmentos*) e depois os passa para o
**fragment shader**, o segundo programa, que decidirá qual cor pintar nos pixels.
Este livro é principalmente focado no último, em todos os exemplos, a geometria é um simples quadrilátero que cobre toda a tela.

ENTÃO! está pronto?

Vamos lá!

### Tipos fortes
![primeiro resultado de busca por 'strong type' no Google Imagens, em 2016/05/20](strong_type.jpg)

Quando você vem do JS ou de qualquer linguagem sem tipos, **tipagem** de suas variáveis é um conceito alienígena, tornando **tipagem** o passo mais difícil para o GLSL.
**Tipagem**, como o nome sugere, significa que você dará um **tipo** às suas variáveis (e funções, é claro).
Basicamente, isso significa que a palavra **`var`** não existe mais.
A polícia de pensamento GLSL a apagou da linguagem comum e você não consegue usá-la porque, bem... ela não existe.

Em vez de usar a palavra mágica **`var`**, você terá que _especificar explicitamente o tipo de cada variável_ que usa, então o compilador verá apenas objetos e primitivos que sabe como lidar eficientemente.
A desvantagem quando você não consegue usar a palavra-chave **`var`** e deve _especificar tudo_, é que você terá que conhecer o tipo de todas as variáveis e conhecê-los bem.
Fique tranquilo, existem poucos e são bastante simples (GLSL não é um framework Java).

Pode parecer assustador mas, tudo bem, não é muito diferente do que você faz ao codificar em JavaScript; se uma variável é um `boolean`, você espera que ela armazene `true` ou `false` e nada mais.
Se uma variável é chamada `var uid = XXX;`, há chances de você armazenar um valor inteiro lá e um `var y = YYY;` _pode_ ser uma referência a um valor de ponto flutuante.
Melhor ainda, com **tipos fortes**, você não perderá tempo se perguntando se `X == Y` (ou era `typeof X == typeof Y`? .. ou `typeof X !== null && Y...` ... enfim); você apenas *saberá* e se não souber, o compilador saberá.

Aqui estão os **tipos escalares** (um **escalar** descreve uma quantidade) que você pode usar em GLSL: `bool` (Booleano), `int` (Inteiro), `float` (número de ponto flutuante).
Existem outros tipos mas vamos com calma, o trecho a seguir mostra como declarar **`variáveis`** (sim, falei a palavra proibida) em GLSL:
```glsl
// um valor Booleano:
JS: var b = true;               GLSL: bool b = true;

// um valor Inteiro
JS: var i = 1;                  GLSL: int i = 1;

// um valor Float (um Número)
JS: var f = 3.14159;            GLSL: float f = 3.14159;
```
Não é tão difícil, não é? como mencionado acima, até torna as coisas mais fáceis quando se trata de programação, pois você não perde tempo verificando o tipo de uma variável.
Em caso de dúvida, lembre-se de que você está fazendo isso para que seu programa execute muito mais rápido do que em JS.

#### void
Existe um tipo `void` que corresponde aproximadamente a `null`, é usado como o tipo de retorno de um método que não retorna nada.
você não consegue atribuir a uma variável.

#### boolean
Como você sabe, Booleanos são principalmente usados em testes condicionais; `if( myBoolean == true ){}else{}`.
Se a ramificação condicional é uma opção válida na CPU, [a natureza paralela](http://thebookofshaders/01/) do GLSL torna isso menos verdadeiro.
O uso de condicionais é até desencorajado na maioria das vezes, o livro explica algumas técnicas alternativas para resolver isso.

#### type casting
Como [Boromir](https://en.wikipedia.org/wiki/Boromir) colocou, "Não se simplesmente combinam primitivos Tipados". Ao contrário do JavaScript, GLSL não permite que você execute operações entre variáveis de tipos diferentes.

Por exemplo:
```glsl
int     i = 2;
float   f = 3.14159;

// tentando multiplicar um inteiro por um valor float
float   r = i * f;
```
não funcionará bem porque você está tentando cruzar um **_gato_** e uma **_girafa_**.
A solução é usar **type casting**; isso _fará o compilador acreditar_ que *`i`* é do tipo `float` sem realmente mudar o tipo de *`i`*.
```glsl
// convertendo o tipo da variável inteira 'i' para float
float   r = float( i ) * f;
```

O que é estritamente equivalente a vestir um **_gato_** com uma **roupa de _girafa_** e funcionará como esperado (r armazenará o resultado de `i` x `f`).

É possível **fazer cast** de qualquer um dos tipos acima para qualquer outro tipo, note que fazer cast de um `float` para `int` se comportará como um `Math.floor()` pois removerá os valores após o ponto decimal.
Fazer cast de um `float` ou um `int` para `bool` retornará `true` se a variável não for igual a zero.

#### constructor
Os **tipos** de variáveis também são seus próprios **construtores de classe**; de fato, uma variável `float` pode ser pensada como uma _`instância`_ de uma classe _`Float`_.

Estas declarações são igualmente válidas:

```glsl
int     i = 1;
int     i = int( 1 );
int     i = int( 1.9995 );
int     i = int( true );
```
Isso pode não parecer muito para tipos `escalares`, não é muito diferente de **casting**, mas fará sentido quando abordarmos a seção *overload*.

Ok, então estes três são os `tipos primitivos`, coisas que você não consegue viver sem, mas é claro, GLSL tem mais a oferecer.

### Vetores
![primeiro resultado de busca por 'vector villain' no Google Imagens, em 2016/05/20](vector.jpg)

Em Javascript, assim como em GLSL, você precisará de maneiras mais sofisticadas de lidar com dados, é aí que os **`vetores`** são úteis.
Suponho que você já tenha codificado uma classe `Point` em JavaScript para manter junto um valor `x` e `y`, o código para isso seria algo como:
```glsl
// definição de 'class':
var Point = function( x, y ){
    this.x = x || 0;
    this.y = y || 0;
}

// e você o instanciaria assim:
var p = new Point( 100,100 );
```

Como vimos agora, isso é MUITO errado em MUITOS níveis! Aquela palavra-chave **`var`** por um lado, depois aquele **`this`** horrível, depois novamente valores **sem tipo** `x` e `y`...
Não, isso não vai funcionar no mundo dos shaders.

Em vez disso, GLSL expõe estruturas de dados integradas para manter dados juntos, a saber:

 * `bvec2`: um vetor Booleano 2D, `bvec3`: um vetor Booleano 3D, `bvec4`: um vetor Booleano 4D
 * `ivec2`: um vetor Inteiro 2D, `ivec3`: um vetor Inteiro 3D, `ivec4`: um vetor Inteiro 4D
 * `vec2`: um vetor Float 2D, `vec3`: um vetor Float 3D, `vec4`: um vetor Float 4D

Você imediatamente notou que existe um tipo de **vetor** para cada tipo primitivo, bom trabalho.
Do que vimos, você pode deduzir que um `bvec2` conterá dois valores do tipo `bool` e um `vec4` conterá quatro valores `float`.

Outra coisa introduzida pelos vetores é um número de **dimensões**, isso não significa que um vetor 2D é usado quando você renderiza gráficos 2D e um vetor 3D quando faz 3D.
O que um vetor 4D representaria então? (bem, na verdade é chamado de tesserato ou hipercubo)

Não, as **dimensões** representam o número e o tipo de **componentes** ou **variáveis** armazenados no **vetor**:
```glsl
// vamos criar um vetor Booleano 2D
bvec2 b2 = bvec2 ( true, false );

// vamos criar um vetor Inteiro 3D
ivec3 i3 = ivec3( 0,0,1 );

// vamos criar um vetor Float 4D
vec4 v4 = vec4( 0.0, 1.0, 2.0, 1. );
```
`b2` armazena dois valores booleanos diferentes, `i3` armazena 3 valores inteiros diferentes e `v4` armazena 4 valores float diferentes.

mas como recuperar esses valores?
no caso de `escalares`, a resposta é óbvia; com `float f = 1.2;`, a variável `f` contém o valor `1.2`.
Com **vetores** é um pouco diferente e bem bonito.

#### accessors
Existem diferentes maneiras de acessar os valores
```glsl
// vamos criar um vetor Float 4D
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );
```
para recuperar os 4 valores, você pode fazer o seguinte:
```glsl
float x = v4.x;     // x = 0.0
float y = v4.y;     // y = 1.0
float z = v4.z;     // z = 2.0
float w = v4.w;     // w = 3.0
```
simples e fácil; mas as seguintes são formas igualmente válidas de acessar seus dados:
```glsl
float x =   v4.x    =   v4.r    =   v4.s    =   v4[0];     // x = 0.0
float y =   v4.y    =   v4.g    =   v4.t    =   v4[1];     // y = 1.0
float z =   v4.z    =   v4.b    =   v4.p    =   v4[2];     // z = 2.0
float w =   v4.w    =   v4.a    =   v4.q    =   v4[3];     // w = 3.0
```

E você, coelho inteligente, já notou três coisas:
   * `X`, `Y`, `Z` & `W` são usados em programas 3D para representar vetores 3D
   * `R`, `G`, `B` & `A` são usados para codificar cores e alfa
   * `[0]`, `[1]`, `[2]` & `[3]` significam que temos um array de acesso aleatório

Então, dependendo de você estar manipulando coordenadas 2D ou 3D, uma cor com ou sem valor alfa ou simplesmente algumas variáveis aleatórias, você pode escolher o tipo e tamanho de **vetor** mais adequado.
Tipicamente coordenadas e vetores 2D (no sentido geométrico) são armazenados como um `vec2`, `vec3` ou `vec4`, cores como `vec3` ou `vec4` se você precisar de opacidade, mas não há restrição em como usar os vetores.
Por exemplo, se você quiser armazenar apenas um valor booleano em um `bvec4`, é possível, é apenas um desperdício de memória.

**nota**: em um shader, valores de cor (`R`, `G`, `B` & `A`) são normalizados, variam de 0 a 1 e não de 0 a 0xFF, então você preferiria usar um `vec4` Float do que um `ivec4` Inteiro para armazená-los.

Legal já, mas há mais!

#### swizzle

É possível retornar mais de um valor de uma vez; digamos que você precisa apenas dos valores `X` e `Y` de um `vec4`, em JavaScript, você teria que escrever algo como:
```glsl
var needles = [0, 1]; // localização de 'x' & 'y' em nossa estrutura de dados
var a = [ 0,1,2,3 ]; // nossa estrutura de dados 'vec4'
var b = a.filter( function( val, i, array ) {
return needles.indexOf( array.indexOf( val ) ) != -1;
});
// b = [ 0, 1 ]

// ou mais literalmente:
var needles = [0, 1];
var a = [ 0,1,2,3 ]; // nossa estrutura de dados 'vec4'
var b = [ a[ needles[ 0 ] ], a[ needles[ 1 ] ] ]; // b = [ 0, 1 ]
```
Feio. Em GLSL você pode recuperá-los assim:
```glsl
// criar um vetor Float 4D
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );

// e recuperar apenas os componentes X & Y
vec2 xy =   v4.xy; //   xy = vec2( 0.0, 1.0 );
```
O que acabou de acontecer?! quando você **concatena accessors**, GLSL graciosamente retorna um subconjunto dos valores que você pediu, no formato **vetor** mais adequado.
De fato, o vetor é uma estrutura de dados de **acesso aleatório**, como um array em JavaScript se preferir.
Assim, não apenas você consegue recuperar um subconjunto de seus dados, mas também pode especificar a **ordem** em que precisa deles, isso invertará os valores dos componentes de um vetor:
```glsl
// criar um vetor Float 4D: R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

// e recuperar os componentes de cor na ordem A,B,G,R
vec4 backwards = color.abgr; // backwards = vec4( 1.0, 0.0, 0.8, 0.2 );
```
E é claro, você pode pedir o mesmo componente várias vezes:
```glsl
// criar um vetor Float 4D: R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

// e recuperar um GAG vec3 baseado nos canais G & A da cor
vec3 GAG = color.gag; // GAG = vec4( 0.8, 1.0, 0.8 );
```

Isso é extremamente útil para combinar partes de vetores, extrair apenas os canais rgb de uma cor RGBA, etc.


#### sobrecarregue tudo!

Na seção de tipos, mencionei algo sobre o **construtor** e isso é novamente uma ótima característica do GLSL; **sobrecarga**.
Para quem não sabe, **sobrecarregar** um operador ou função significa aproximadamente: _'mudar o comportamento desse operador ou função dependendo dos operandos/argumentos'_.
Sobrecarga não é permitida em JavaScript, então isso pode ser estranho no início, mas tenho certeza de que uma vez que você se acostumar, se perguntará por que não é implementado em JS (resposta curta, *tipagem*).

O exemplo mais básico de sobrecarga de operador é o seguinte:

```glsl
vec2 a = vec2( 1.0, 1.0 );
vec2 b = vec2( 1.0, 1.0 );
// adição sobrecarregada
vec2 c = a + b;     // c = vec2( 2.0, 2.0 );
```
O QUÊ? Então você consegue somar coisas que não são números?!

Sim, precisamente. É claro que isso se aplica a todos os operadores (`+`, `-`, `*` & `/`) mas isso é apenas o começo.
Considere o seguinte trecho:
```glsl
vec2 a = vec2( 0.0, 0.0 );
vec2 b = vec2( 1.0, 1.0 );
// construtor sobrecarregado
vec4 c = vec4( a , b );         // c = vec4( 0.0, 0.0, 1.0, 1.0 );
```
Construímos um `vec4` a partir de dois `vec2`, ao fazer isso, o novo `vec4` usou `a.x` e `a.y` como os componentes `X`, `Y` de `c`.
Depois pegou `b.x` e `b.y` e usou-os como os componentes `Z` e `W` de `c`.

Isso é o que acontece quando uma **função** é sobrecarregada para aceitar argumentos diferentes, neste caso, o **construtor** `vec4`.
Significa que muitas **versões** do mesmo método com uma assinatura diferente podem coexistir no mesmo programa, por exemplo as seguintes declarações são todas válidas:
```glsl
vec4 a = vec4(1.0, 1.0, 1.0, 1.0);
vec4 a = vec4(1.0);// x, y, z, w todos iguais a 1.0
vec4 a = vec4( v2, float, v4 );// vec4( v2.x, v2.y, float, v4.x );
vec4 a = vec4( v3, float );// vec4( v3.x, v3.y, v3.z, float );
etc.
```
A única coisa que você deve garantir é fornecer argumentos suficientes para alimentar seu **vetor**.

Última coisa, você pode sobrecarregar as funções integradas em seu programa para que possam aceitar argumentos para os quais não foram projetadas (isso não deveria acontecer com frequência).

#### mais tipos
Vetores são divertidos, são a carne do seu shader.
Existem outros primitivos como Matrizes e amostras de Texturas que serão cobertas posteriormente no livro.

Também podemos usar Arrays. É claro que devem ser tipados e existem *pegadinhas*:
 * eles têm um tamanho fixo
 * você não consegue push(), pop(), splice() etc. e não existe propriedade ```length```
 * você não consegue inicializá-los imediatamente com valores
 * você tem que definir os valores individualmente

isso não funcionará:
```glsl
int values[3] = [0,0,0];
```
mas isso funcionará:
```glsl
int values[3];
values[0] = 0;
values[1] = 0;
values[2] = 0;
```
Isso fica bem quando você conhece seus dados ou tem arrays pequenos de valores.
Se você quiser uma maneira mais expressiva de declarar uma variável,
também existe um tipo ```struct```. Estes são como _objetos_ sem métodos;
eles permitem armazenar e acessar múltiplas variáveis dentro do mesmo objeto
```glsl
struct ColorStruct {
    vec3 color0;
    vec3 color1;
    vec3 color2;
}
```
então você pode definir e recuperar os valores de _cores_ fazendo:
```glsl
// inicializar a struct com alguns valores
ColorStruct sandy = ColorStruct( 	vec3(0.92,0.83,0.60),
                                    vec3(1.,0.94,0.69),
                                    vec3(0.95,0.86,0.69) );

// acessar um valor da struct
sandy.color0 // vec3(0.92,0.83,0.60)
```
Isso é açúcar sintático, mas pode ajudá-lo a escrever código mais limpo, pelo menos código mais familiar.

#### statements & conditions

Estruturas de dados são legais como tal, mas podemos _precisar_ iterar ou realizar testes condicionais em algum momento.
Felizmente para nós, a sintaxe é muito próxima à do JavaScript.
Uma condição é como:
```glsl
if( condition ){
    // verdadeiro
}else{
    // falso
}
```
Um loop for geralmente é:
```glsl
const int count = 10;
for( int i = 0; i <= count; i++){
    // fazer algo
}
```
ou com um iterador float:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    // fazer algo
}
```
Note que ```count``` terá que ser definido como uma ```constante```.
Isso significa prefixar o tipo com um **qualificador** ```const```, cobriremos isso em um momento.

também temos as instruções ```break``` e ```continue```:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    if( i < 5. )continue;
    if( i >= 8. )break;
}
```
Note que em alguns hardwares, ```break``` não funciona como esperado e o loop não sai antecipadamente.

Em geral, você quer manter a contagem de iterações o mais baixa possível e evitar loops e condicionais o máximo que puder.


#### qualifiers

Além dos tipos de variáveis, GLSL usa **qualificadores**.
Para resumir, qualificadores ajudam o compilador a saber qual é qual variável.
Por exemplo, alguns dados só podem ser fornecidos pela CPU para a GPU, chamados **atributos** e **uniformes**.
Os **atributos** são reservados para vertex shaders, os **uniformes** podem ser usados em ambos vertex e fragment shaders.
Também há um qualificador ```varying``` usado para passar variáveis entre o vertex shader e o fragment shader.

Não vou entrar em muitos detalhes aqui pois estamos principalmente focados no **fragment shader**, mas mais tarde no livro, você verá algo como:
```glsl
uniform vec2 u_resolution;
```
Viu o que fizemos? Colocamos um qualificador ```uniform``` antes do tipo da variável
Isso significa que a resolução da canvas em que estamos trabalhando é passada para o shader pela CPU.
A largura da canvas é armazenada no componente x e a altura no componente y do vetor 2D.

Quando o compilador vê uma variável precedida por este qualificador, garantirá que você não consegue *definir* esses valores em tempo de execução.

O mesmo se aplica à nossa variável ```count``` que era o limite do nosso loop ```for```:
```glsl
const float count = 10.;
for( ... )
```
Quando usamos um qualificador ```const```, o compilador garante que definimos o valor da variável apenas uma vez, caso contrário, não é uma constante.

Existem 3 qualificadores extras que são usados nas assinaturas de funções: ```in```, ```out``` e ```inout```.
Em JavaScript, quando você passa argumentos escalares para uma função, seu valor é somente leitura e se você mudar seus valores dentro da função,
as alterações não são aplicadas à variável fora da função.
```glsl
function banana( a ){
    a += 1;
}
var value = 0;
banana( value );
console.log( value );// > 0 ; as alterações não são levadas em conta fora da função
```

Com qualificadores de argumentos, você pode especificar o comportamento dos argumentos:
  * ```in``` será somente leitura (padrão)
  * ```out```  somente escrita: você não consegue ler o valor deste argumento, mas consegue defini-lo
  * ```inout```  leitura-escrita: você consegue obter e definir o valor dessa variável

Reescrevendo o método banana em GLSL ficaria assim
```glsl
void banana( inout float a ){
    a += 1.;
}
float A = 0.;
banana( A ); // agora A = 1.;
```
Isso é muito diferente de JS e bem poderoso também, mas você não precisa especificar qualificadores de assinatura (o padrão é somente leitura).

#### espaço & coordenadas

Observação final, no DOM e Canvas 2D, estamos acostumados a ter o eixo Y apontando para 'baixo'.
Isso faz sentido no contexto de um DOM pois segue a maneira como uma página da web se desenrola; a navbar no topo, conteúdo expandindo para o fundo.
Em uma canvas WebGL, o eixo Y é invertido: Y aponta para 'cima'.

Isso significa que a origem, o ponto (0,0), está localizado no canto inferior esquerdo de um contexto WebGL, não no canto superior esquerdo como em uma Canvas 2D.
As coordenadas de texturas seguem essa regra que pode ser contra-intuitiva no início.

## E terminamos!
É claro que poderíamos ter aprofundado em vários conceitos, mas como mencionado anteriormente, isso se destina a dar um GRANDE ABRAÇO aos recém-chegados.
É bastante para assimilar, mas com paciência e prática, isso se tornará cada vez mais natural.

Espero que você tenha achado isso útil, e que tal começar sua jornada pelo livro?
