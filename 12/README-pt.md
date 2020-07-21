![](dragonfly.jpg)

## Cellular Noise (Ruído Celular)

Em 1996, dezesseis anos após o Noise original de Perlin e cinco anos antes de seu Noise Simplex, [Steven Worley escreveu um artigo chamado “A Cellular Texture Basis Function” (Uma Função de Base de Textura Celular)](http://www.rhythmiccanvas.com/research/papers/worley.pdf). Neste, ele descreve uma técnica procedimental de texturizar amplamente usada pela comunidade gráfica.

Para entender os princípios por trás disto, nós precisamos começar a pensar em termos de **iterações**. Provavelmente, você sabe o que isso significa: sim, começar a usar laços de repetição ```for```. Há apenas uma questão com laços de repetição ```for``` em GLSL: o número de vezes que estamos verificando deve ser uma constante (```const```). Logo, sem laços dinâmicos - o número de iterações deve ser fixo.

Vamos dar uma olhada em um exemplo.

### Pontos para um campo de distância

Ruídos celulares são baseados em campos de distância, a distância para o ponto mais próximo de um conjunto de pontos. Vamos dizer que nós queremos criar um campo de distância de 4 pontos. O que nós devemos fazer? Bem, **para cada píxel, nós queremos calcular a distância para o ponto mais próximo**. Que significa que nós precisamos iterar por todos os pontos, computar suas distâncias para o píxel atual e armazenar o valor para o mais próximo.

```glsl
    float min_dist = 100.; // A variable to store the closest distance to a point

    min_dist = min(min_dist, distance(st, point_a));
    min_dist = min(min_dist, distance(st, point_b));
    min_dist = min(min_dist, distance(st, point_c));
    min_dist = min(min_dist, distance(st, point_d));
```

![](cell-00.png)

Isso não é muito elegante, mas resolve. Agora, vamos reimplementá-lo usando um array e um laço ```for```.

```glsl
    float m_dist = 100.;  // minimum distance
    for (int i = 0; i < TOTAL_POINTS; i++) {
        float dist = distance(st, points[i]);
        m_dist = min(m_dist, dist);
    }
```

Veja como nós usamos o laço ```for``` para iterar pelo array de pontos e encontrar a menor distância usando uma função [```min()```](../glossary/?search=min). Aqui está uma breve implementação funcional desta ideia:

<div class="codeAndCanvas" data="cellnoise-00.frag"></div>

No código acima, um ou mais pontos estão atribuídos à posição do mouse. Interaja com ele para pegar uma ideia mais intuitiva de como o código se comporta. Então, responda:

- Como você pode animar o resto dos pontos?
- Depois de ler [o capítulo sobre formas](../07/), imagine formas interessantes de usar este campo de distância!
-E se você quiser adicionar mais pontos ao campo de distância? E se nós quisermos dinamicamente adicionar/subtrair pontos?

### Tiles e Iteração

Você provavelmente percebeu que laços ```for``` e *arrays* não se dão bem com GLSL. Como mencionamos antes, laços não aceitam limites dinâmicos em sua condição de saída. Além disso, iterar por muitas instâncias, reduz a performance do shader significativamente. O que significa que nós não podemos usar essa abordagem diretamente para grandes quantidades de pontos. Nós precisamos encontrar outra estratégia, uma que tira vantagem sobre o arquitetura de processamento paralelo da GPU.

![](cell-01.png)

Uma forma de abordar este problema é dividindo o espaço em tiles. Cada píxel não precisa checar a distância de cada ponto, certo? Considerando o fato de cada píxel rodar em sua própria thread, nós podemos subdividir o espaço em células, cada uma com um único ponto para observar. Também, para evitar artefatos nas arestas entre as células, nós precisamos verificar as distâncias para os pontos das células vizinhas. Esta é a genial ideia do [artigo de Steven Worley](http://www.rhythmiccanvas.com/research/papers/worley.pdf). No final, cada píxel precisa verificar apenas nove posições: o ponto da própria célula e os pontos das 8 células ao seu redor. Nós já subdividimos o espaço em células no capítulo sobre [padrões], (../09/), [aleatório](../10/) e [noise](../11/), então você provavelmente já está familiarizado com essa técnica.

```glsl
    // Scale
    st *= 3.;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
```

Então, qual é o plano? Nós usaremos as coordenadas do tile (armazenadas na coordenada inteira ```i_st```) para construirmos uma posição aleatória de um ponto.  A função ```random2f``` que nós usaremos recebe um ```vec2``` e nos retorna um ```vec2``` com uma posição aleatória. Então, para cada tile, nós teremos um ponto respectivo em uma posição aleatória dentro do tile.

```glsl
    vec2 point = random2(i_st);
```

Cada píxel dentro do tile (armazenado em coordenadas float, ```f_st```) verificará sua distância para um ponto aleatório.

```glsl
    vec2 diff = point - f_st;
    float dist = length(diff);
```

O resultado se parecerá com a seguinte imagem:

<a href="../edit.php#12/cellnoise-01.frag"><img src="cellnoise.png"  width="520px" height="200px"></img></a>

Ainda precisamos verificar a distância dos pontos nos tiles ao redor, não apenas o atual. Para isso, nós precisamos **iterar** por seus tiles vizinhos. Não todos os tiles, apenas os que estão imediatamente ao redor do atual. Que compreende do tile ```-1``` (esquerda) a ```1``` (direita) no eixo ```x``` e ```-1```(inferior) e ```1``` (superior) no eixo ```y```. Podemos iterar em uma região 3x3 de 9 tiles através de um laço ```for``` duplo como esse:

```glsl
for (int y= -1; y <= 1; y++) {
    for (int x= -1; x <= 1; x++) {
        // Neighbor place in the grid
        vec2 neighbor = vec2(float(x),float(y));
        ...
    }
}
```

![](cell-02.png)

Agora, nós podemos estimar a distância dos pontos para cada um dos vizinhos em nosso laço ```for``` duplo, ao adicionar o deslocamento do tile vizinho às coordenadas do tile atual.

```glsl
        ...
        // Random position from current + neighbor place in the grid
        vec2 point = random2(i_st + neighbor);
        ...
```

O resto é calcular a distância daquele ponto e armazenar a menor em uma variável chamada ```m_dist``` (para distância mínima).

```glsl
        ...
        vec2 diff = neighbor + point - f_st;

        // Distance to the point
        float dist = length(diff);

        // Keep the closer distance
        m_dist = min(m_dist, dist);
        ...
```

O código acima foi inspirado por [este artigo de Inigo Quilez](http://www.iquilezles.org/www/articles/smoothvoronoi/smoothvoronoi.htm)  onde ele diz:

*"... Pode valer a pena perceber que existe um truque excelente no código acima. A maioria das implementações por aí sofrem com problemas de precisão, porque eles geram seus pontos aleatórios no espaço "domínio"  (como espaço "mundo" ou espaço "objeto"), que podem ser longe da origem. Pode-se resolver este problema ao aumentar a precisão dos dados, ou sendo um pouco esperto. Minha implementação não gera os pontos em um espaço "domínio", mas em espaço "célula": uma vez que as partes inteira e fracionária do ponto desejado são extraídas e a célula em que estamos trabalhando, identificada, todos nós nos importamos com o que acontece ao redor desta célula, assim nós podemos nos livrar de todas as partes inteiras de uma vez, nós economizando bits de precisão. De fato, em uma implementação de voronoi usual, as partes inteiras das coordenadas do ponto simplesmente se cancelam quando o aleatório pelos pontos da respectiva célula são subtraídos do ponto em questão. Em minha implementação acima, nós nem ao menos deixamos esse cancelamento acontecer, pois estamos movendo todos os cálculos para o espaço "célula". Estudo truque também permite que lidemos com os casos nos quais queremos usar voronoi para desenhar um planeta inteiro - poderíamos simplesmente substituir a entra para ser precisão double, realizar os cálculos de floor() e fract(), e então mudarmos para ponto-flutuante para os próximos cálculos sem pagarmos o custo de trocar toda implementação para precisão double. Naturalmente, alguns truques se aplicam ao ruído Perlin (ainda que eu não tenha visto isto documentado ou implementado)."*

Recapitulando: nós subdividimos o espaço em tiles; cada píxel calculará a distância do ponto do seu próprio tile e dos 8 ao seu redor; armazenará a menor distância. O resultado será um campo de distância que se parece com o exemplo a seguir:

<div class="codeAndCanvas" data="cellnoise-02.frag"></div>

Vá além ao:

- Transformar a escala no espaço para diferentes valores.
- Você consegue pensar em outras formas de animar os pontos?
- E se quisermos calcular um ponto extra com a posição do mouse?
- Quais são as outras formas de construir este campo de distância, você consegue pensar em uma além de ```m_dist = min(m_dist, dist);```?
- Que padrões interessantes você pode criar com este campo de distância?

O algoritmo pode também ser interpretado pela perspectiva do ponto e não dos píxeis. Neste caso, ele pode ser descrito como: cada ponto cresce até que ele encontre a área de crescimento de outro ponto. Isso reflete algumas leis de crescimento na natureza. Formas de vida são moldadas por essa tensão entre a força interior de crescer e se expandir e as limitações das forças externas. O clássico algoritmo que simula este comportamento foi nomeado em homenagem a [Georgy Voronoi](https://en.wikipedia.org/wiki/Georgy_Voronoy).

![](monokot_root.jpg)

### O Algoritmo de Vonoroi

Construindo diagramas a partir de ruído celular é menos complicado do que parece. Nós apenas precisamos *manter* algumas informações extras sobre o ponto que é o mais próximo de cada píxel. Para isso, nós vamos usar um ```vec2``` chamado ```m_point```. Ao armazenar a direção do vetor até o centro do ponto mais próximo, ao invés de apenas a distância, nós "manteremos" um "único" identificador para aquele ponto.

```glsl
    ...
    if( dist < m_dist ) {
        m_dist = dist;
        m_point = point;
    }
    ...
```

Veja que no código a seguir que não estamos mais usando ```min``` para calcular a distância do ponto mais próximo, mas um ```if```. Por quê? Porque nós queremos fazer algo toda a vez que um ponto mais próximo aparecer, armazenar sua posição (linhas 32 a 37).

<div class="codeAndCanvas" data="vorono-00.frag"></div>

Veja como a cor do movimento celular (vinculada à posição do mouse) muda sua cor de acordo com a sua posição. Isso acontece porque a cor é atribuída usando o valor (posição) do ponto mais próximo.

Como nós fizemos antes, agora é hora de ir além, mudar para a abordagem do artigo de Steven Worley](http://www.rhythmiccanvas.com/research/papers/worley.pdf). Tente implementá-lo sozinho. Você pode usar a ajuda dos seguintes exemplos clicando neles. Veja que a abordagem original de Steven Worley usa um número variável de pontos para cada tile, mais de um em sua maioria. Em sua implementação em C, isso é usado para acelerar o laço ao fazer uma saída antecipada. Laços em GLSL não permitem um número variavel de iterações, então você provavelmente vai querer manter um ponto por tile.

<a href="../edit.php#12/vorono-01.frag"><canvas id="custom" class="canvas" data-fragment-url="vorono-01.frag"  width="520px" height="200px"></canvas></a>

Depois que você pensar neste algoritmo, pense em seus vários usos interessantes e criativos.

![Extended Voronoi - Leo Solaas (2011)](solas.png)

![Cloud Cities - Tomás Saraceno (2011)](saraceno.jpg)

![Accretion Disc Series - Clint Fulkerson](accretion.jpg)

![Vonoroi Puzzle - Reza Ali (2015)](reza.png)

### Melhorando Voronoi

Em 2011, [Stefan Gustavson otimizou o algoritmo de Steven Worley para GPU](http://webstaff.itn.liu.se/~stegu/GLSL-cellular/GLSL-cellular-notes.pdf) ao iterar por uma matriz de 2x2 ao invés de 3x3. Isso reduz a quantidade de trabalho significativamente, mas pode criar artefatos em forma de descontinuidades nas arestas entre os tiles. Dê uma olhada no seguinte exemplo.

<div class="glslGallery" data="12/2d-cnoise-2x2,12/2d-cnoise-2x2x2,12/2d-cnoise,12/3d-cnoise" data-properties="clickRun:editor,openFrameIcon:false"></div>

Mais tarde em 2012 [Inigo Quilez escreveu um artigo sobre como criar bordas mais precisas em Voronoi](http://www.iquilezles.org/www/articles/voronoilines/voronoilines.htm).

<a href="../edit.php#12/2d-voronoi.frag"><img src="2d-voronoi.gif"  width="520px" height="200px"></img></a>

Os experimentos de Inigo com Voronoi não pararam aí. Em 2014, ele escreveu um excelente artigo sobre o que ele chama [voro-noise](http://www.iquilezles.org/www/articles/voronoise/voronoise.htm), uma função que permite uma mesclagem gradual entre o ruído comum e voronoi. Em suas palavras:

*"Apesar de sua similaridade, o fato é que a forma que a grade é usada em ambos padrões é diferente. O ruído interpola valores aleatórios (como ruído de valor) ou gradiente (como em ruído de gradiente), enquanto Voronoi calcula a distância de um respectivo ponto. Agora, a interpolação bilinear e a verificação da menor distância são duas operações diferentes, ou.... elas são? Poderiam elas serem combinadas em uma métrica mais geral? Se sim, então tanto Ruído como Voronoi podem ser vistos como casos particulares de um gerador de padrão baseado em grade mais geral?"*

<a href="../edit.php#12/2d-voronoise.frag"><canvas id="custom" class="canvas" data-fragment-url="2d-voronoise.frag"  width="520px" height="200px"></canvas></a>

Agora, é hora de você dar uma olhada nas coisas, se inspire pela natureza e encontre a sua própria forma de usar esta técnica!

![Deyrolle glass film - 1831](DeyrolleFilm.png)

<div class="glslGallery" data="12/metaballs,12/stippling,12/cell,12/tissue,12/cracks,160504143842" data-properties="clickRun:editor,openFrameIcon:false"></div>
