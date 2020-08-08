![Due East over Shadequarter Mountain - Matthew Rangel (2005) ](rangel.jpg)

## Movimento Browniano Fracionário

O ruído pode ter um significado diferente para diferentes pessoas. Músicos pensarão em sons irritantes, comunicadores como interferência e astrofísicos como radiação em micro-ondas cósmicas. Estes conceitos nos trazem às explicações físicas por trás da aleatoriedade do mundo em nossa volta. Entretanto, vamos começar por algo mais fundamental e simples: ondas e suas propriedades. Uma onda é uma flutuação de alguma propriedade pelo tempo. Ondas de som são flutuações sobre a pressão do ar, ondas eletromagnéticas são flutuações em campos elétricos e magnéticos. Duas importantes características de onda são sua amplitude e sua frequência. A equação para uma simples onda linear (unidimensional) tem este aspecto.

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = amplitude * sin(x * frequency);
"></div>

* Experimente alterar os valores de frequência e amplitude para entender como eles se comportam.
* Usando modelagem de funções, tente alterar a amplitude ao longo do tempo.
* Usando modelagem de funções, tente alterar a frequência ao longo do tempo.

Ao fazer estes últimos exercícios, você conseguiu "modular" uma onda de seno, e você acabou de criar ondas AM (amplitude modulada) e FM (frequência modulada). Parabéns!

Outra interessante propriedade das ondas é a habilidade de se somarem, formalmente chamada de superposição. Comente/descomente e ajuste as linhas a seguir. Preste atenção em como sua aparência em geral se altera conforme nós adicionamos ondas de diferentes amplitudes e frequências juntas.

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = sin(x * frequency);
float t = 0.01*(-u_time*130.0);
y += sin(x*frequency*2.1 + t)*4.5;
y += sin(x*frequency*1.72 + t*1.121)*4.0;
y += sin(x*frequency*2.221 + t*0.437)*5.0;
y += sin(x*frequency*3.1122+ t*4.269)*2.5;
y *= amplitude*0.06;
"></div>


* Experimente alterar a frequência e amplitude das ondas adicionais.
* É possível fazer com que duas ondas se cancelem?
* É possível adicionar ondas de uma forma que elas possam se amplificar?

Em música, cada nota é associada com uma frequência específica. As frequências para estas notas seguem um padrão que chamamos de escala, onde dobrando ou diminuindo pela metade, a frequência corresponde a um salto de uma oitava.

Agora, vamos usar o ruído Perlin em vez de uma onda de seno! Ruído Perlin em sua forma básica se assemelha muito a uma onda de seno. Sua amplitude e frequência variam, mas a amplitude se mantém razoavelmente consistente, e a frequência é restrita a um curto intervalo ao redor da frequência central. Não é uniforme como uma onda de seno, no entanto, e é mais fácil de criar uma aparência de aleatoriedade ao somar diversas versões em diferentes escalas. Também  possível criar uma soma de ondas de seno se parecerem com aleatório, mas é preciso muitas ondas diferentes para esconder a sua natureza periódica e regular.

Ao adicionar diferentes iterações ao ruído (*oitavas*), onde nós sucessivamente incrementamos as frequências em passos regulares (*lacunaridade*) e diminuímos a amplitude (*ganho*) do **ruído**, nós podemos obter uma granularidade no ruídos e ganhando detalhes mais finos. Esta técnica é chamada "Movimento browniano fracionário" (*fBM*), ou simplesmente "ruído fractal", sua forma mais simples pode ser criada com o seguinte código:

<div class="simpleFunction" data="// Properties
const int octaves = 1;
float lacunarity = 2.0;
float gain = 0.5;
//
// Initial values
float amplitude = 0.5;
float frequency = 1.;
//
// Loop of octaves
for (int i = 0; i < octaves; i++) {
&#9;y += amplitude * noise(frequency*x);
&#9;frequency *= lacunarity;
&#9;amplitude *= gain;
}"></div>

* Progressivamente mude o número de oitavas para iterar de 1 para 2, 4, 8 e 10. Veja o que acontece.
* Quando você ter mais do que 4 oitavas, tente mudar o valor de lacunaridade.
* Também, com mais de 4 oitavas, mude o valor gain(ganho) e veja o que acontece.

Veja como cada oitava adicional, a curva se parece mais detalhada. Também veja que a auto-similaridade enquanto mais oitavas são adicionadas. Se você se aproximar da curva, uma parte pequena se parecerá com o todo, e cada seção se parece mais ou menos igual a qualquer outra seção. Esta é uma importante propriedade dos fractais matemáticos, e nós estamos simulando esta propriedade em nosso loop. Nós não estamos criando um *verdadeiro* fractal, porque nós pararíamos nossa simulação depois de algumas iterações, mas, teoricamente falando, nós obteríamos um verdadeiro fractal se nós permitíssemos que o laço continuasse para sempre adicionando um infinito número de ruídos componentes. Em computação gráfica, nós sempre temos um limite do que nós podemos determinar, por exemplo, quando um objeto se torna menor que um píxel, então não há necessidade de criar somas infinitas para criar a aparência de um fractal. As vezes, muitos termos podem ser necessários, mas nunca um número infinito.

O código a seguir é um exemplo de como fBm pode ser implementado em duas dimensões para criar um padrão parecido com um fractal:

<div class='codeAndCanvas' data='2d-fbm.frag'></div>

* Reduza o número de oitavas ao trocar os valores na linha 37
* Modifique a lacunaridade do fBm na linha 47
* Experimente mudar o Ganho(gain) na linha 48.

Esta técnica é regularmente usada na criação de paisagens procedimentais. A auto-similaridade do fBm é perfeita para montanhas, porque o processo de erosão cria montanhas que funcionam de um jeito que produzem esse tipo de auto-similaridade por um largo intervalo de escalas. Se você está interessado nisso, você definitivamente deveria ler [este ótimo artigo por Inigo Quilez sobre ruído avançado](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm).

![Blackout - Dan Holdsworth (2010)](holdsworth.jpg)

Usando mais ou menos a mesma técnica, é possível obter outros efeitos como o que é conhecido como **turbulência**. É essencialmente um fBm, mas construída com valores absolutos de um ruído sinalizado para criar vales afiados na função.

```glsl
for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * abs(snoise(st));
    st *= 2.;
    amplitude *= .5;
}
```

<a href="../edit.php#13/turbulence.frag"><img src="turbulence-long.png"  width="520px" height="200px"></img></a>

Outro membro desta família de algoritmos é o *cume* (ridge), onde os vales afiados são virados de ponta-cabeça para criar cumes afiados.

```glsl
    n = abs(n);     // create creases
    n = offset - n; // invert so creases are at top
    n = n * n;      // sharpen creases
```

<a href="../edit.php#13/ridge.frag"><img src="ridge-long.png"  width="520px" height="200px"></img></a>

Outra variante pode criar variações úteis é multiplicando os componentes do ruído juntos ao invés de somá-los. Também é interessante alterarmos a escala de funções de ruído subsequentes com algo que dependa dos termos anteriores do nosso laço. Quando nós fazemos operações assim, nós estando nos afastando de uma definição estrita de fractal e entrando relativamente em um campo desconhecido de "multifractais". Multifractais não são estritamente matematicamente definidos, mas não significa que que os torna menos úteis em gráficos. De fato, simulações multifractais são muito comuns em comerciais modernos para gerar terrenos. Para ir além, você pode ler o capítulo 16 do livro "Texturing and Modeling: A procedural approach" (Texturizando e Modelando: Uma Abordagem Procedimental) - 3ª edição, por Kenton Musgrave. Infelizmente, este livro está fora de impressão há alguns anos, mas nós ainda podemos encontrá-lo em bibliotecas e em mercados de segunda-mão. (Tem uma versão em PDF da primeira edição disponível para venda online, mas não a compre - É um desperdício de dinheiro. É de 1994, e não contém o tópico de modelagem de terreno da terceira edição).

## Domain Warping (Empenamento de Domínio)

[Inigo Quilez escreveu outro artigo fascinante](http://www.iquilezles.org/www/articles/warp/warp.htm) sobre como é possível usarmos o fBm para distorcer um espaço de um fBm. Surpreendente, não é? É como um sonho dentro de um sonho em A Origem (Inception).

![ f(p) = fbm( p + fbm( p + fbm( p ) ) ) - Inigo Quiles (2002)](quiles.jpg)

Uma exemplo menos extremo desta técnica está nas seguintes linhas de código, onde o empenamento é usado para produzir estas texturas parecidas com nuvem. Veja como a propriedade de auto-similaridade está presente no resultado.

<div class='codeAndCanvas' data='clouds.frag'></div>

Empenar as coordenadas da textura com um ruído pode ser muito útil e divertido, entretanto, diabolicamente difícil de dominar. É uma ferramenta poderosa, mas requer um pouco de experiência pra usá-la bem. Uma ferramenta útil para isso é deslocar as coordenadas com as derivadas (gradiente) do ruído. [Um artigo famoso de Ken Perlin e Fabrice Neyret chamado "flow noise"](http://evasion.imag.fr/Publications/2001/PN01/) é baseado nesta ideia. Algumas implementações modernas do ruído Perlin incluem a variante que calcula tanto a função como seu gradiente analítico. Se o "verdadeiro" gradiente não estiver disponível para nossa função procedimental, você sempre pode calcular as diferenças finitas para se aproximar dele, apesar de ser menos preciso e envolver mais trabalho.
