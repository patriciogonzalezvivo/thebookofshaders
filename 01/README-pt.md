# Começando
## O que é um shader?

No capítlo anterior, nós descrevemos shaders como o equivalente da imprensa de Gutenberg para os gráficos. Por quê? E mais importante: o que é um shader?

![From Letter-by-Letter, Right: William Blades (1891). To Page-by-page, Left: Rolt-Wheeler (1920).](print.png)

Se você já tem experiência em desenhar com computadores, já sabe que nesse processo você desenha um círculo, depois um retângulo, uma linha, alguns triângulos, até compor a imagem que você quer. Esse processo é muito similar a escrever uma carta ou livro à mão - é um conjunto de instruções em que se faz uma tarefa depois da outra.

Shaders também são um conjunto de instruções, mas as instruções são executadas todas de uma vez só para cada pixel na tela. Isso quer dizer que o código que você escreve tem que se comportar de modo diferente dependendo da posição do pixel na tela. Como um tipo na imprensa, seu programa vai funcionar como uma função que recebe uma posição e retorna uma cor, e quando é compilado, vai rodar extraordinariamente rápido.

![Chinese movable type](typepress.jpg)

## Por que os shaders são rápidos?

Para responder isso, eu lhe apresento as maravilhas do *processamento paralelo*.

Imagine a CPU do seu computador como uma grande esteira ou tubo industrial, e cada tarefa como algo que passa por ela - como uma linha de produção. Algumas tarefas são maiores que outras, o que significa que requerem mais tempo e energia para se lidar com elas. Dizemos assim que elas requerem mais poder de processamento. Por causa da arquitetura dos computadores, os trabalhos são forçados a serem executados em série; cada tarefa tem que ser terminada uma de cada vez. Computadores modernos geralmente têm grupos de quatro processadores que trabalham como essas linhas de produção, completando tarefas uma após a outra para manter as coisas rodando suavemente. Cada esteira é conhecida como *thread*.

![CPU](00.jpeg)

Videogames e outras aplicações gráficas requerem muito mais poder de processamento que outros programas. Por causa de seu conteúdo gráfico, eles têm que fazer um número gigantesco de operações pixel-a-pixel. Cada pixel na tela precisa ser calculado, e em jogos 3D as geometrias e perspectivas precisam ser calculadas também.

Vamos voltar à nossa metáfora de tubos e tarefas. Cada pixel na tela representa uma pequena tarefa simples. Individualmente, cada tarefa de pixel não é uma grande questão para a CPU, mas (e esse é o problema) as pequenas tarefas têm que ser feitas em cada pixel na tela. Isso significa, em uma tela antiga em 800x600, que 480.000 pixels têm que ser processados por frame, o que significa 14.400.000 cálculos por segundo! Sim! Isso é um problema grande o suficiente para sobrecarregar um microprocessador. Em uma tela moderna retina 2880x1800, rodando a 60 frames por segundom esse cálculo daria até mais 311.040.000 cálculos por segundo. Como os engenheiros gráficos resolveram esse problema?

![](03.jpeg)

É aí que o processamento paralelo se torna uma boa solução. Ao invés de ter uma dupla de microprocessadores grandes e poderosos, ou *tubos*, é mais inteligente ter um monte de pequenos microprocessadores rodando em paralelo ao mesmo tempo. É isso que é uma GPU - Unidade de Processamento Gráfico.

![GPU](04.jpeg)

Imagine os minúsculos processadores como uma mesa de tubos, e os dados de cada pixel como sendo uma bola de ping-pong. 14.400.000 bolas de ping-pong por segundo podem obstruir quase qualquer tubo. Mas uma mesa de 800x600 pequenos tubos recebendo 30 ondas de 480.000 pixels por segundo pode ser manuseado suavemente. Isso funciona do mesmo jeito para resoluções mais altas - quanto mais hardware paralelo você tem, maior o stream que ele pode gerenciar.

Um outro "super poder" da GPU são funções especiais matemáticas aceleradas via hardware, de modo que operações matemáticas complicadas são resolvidas diretamente pelos microchips ao invés de serem por software. Isso significa operações trigonométricas e de matrix extra rápidas - tanto quanto a eletricidade pode ir.

## O que é GLSL?


GLSL significa "openGL Shading Language", que é o padrão específico dos programas shader que você vai ver nos próximos capítulos. Existem outros tipos de shaders, dependendo do hardware and Sistema Operacional. Aqui vamos trabalhar com as especificações openGL reguladas pelo [Khronos Group](https://www.khronos.org/opengl/). Entender a história do OpenGL pode ser de muita ajuda para entender a maioria das convenções estranhas que ele tem, e para isso eu recomendo dar uma olhada em: [openglbook.com/chapter-0-preface-what-is-opengl.html](http://openglbook.com/chapter-0-preface-what-is-opengl.html)

## Por que os shaders são tão dolorosos?

Como o Tio Ben disse, “com grandes poderes vêm grandes responsabilidades,” e computação paralela segue essa regra; o design arquitetural poderoso da GPU vem com suas restrições e dificuldades.

Para rodar em paralelo, cada tubo, ou thread, precisa ser independente dos demais. Digamos que as threads são *cegas* para o que o resto das threads está fazendo. Esta restrição implica em que todo o dado deve fluir na mesma direção. Então, é impossível checar o resultado de outra thread, modificar os dados de entrada, ou passar a saída de uma thread para outra. Permitir comunicação entre threads coloca a integridade dos dados em risco.


Além disso, a GPU mantém o microprocessador (os tubos) constantemente ocupado; assim que ficam livres, já recebem nova informação para processar. É impossível para uma thread saber o que ela estava fazendo no momento anterior. Ela poderia estar desenhando um botão da UI do Sistema Operacional, então renderizar uma parte do céu num jogo, e depois mostrar o texto de um email. Cada thread não é apenas **cega** mas também **sem memória**. Além da abstração requerida para codificar uma função geral que muda o resultado pixel a pixel dependendo de sua posição, as restrições de cegueira e falta de memória tornam os shaders pouco populares entre os programadores principiantes.

Não se preocupe! Nos capítulos seguintes, vamos aprender passo a passo como sair de um nível simples ao avançado nas computações de shaders. Se você está lendo isso com um browser moderno, vai poder brincar com exemplos interativos. Então, não vamos mais demorar com a diversão, e aperte *Próximo >>* para pular para o código!
