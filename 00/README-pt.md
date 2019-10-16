# Introdução

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

As imagens acima foram feitas de maneiras diferentes. A primeira foi feita pelas mãos de Van Gogh aplicando camada sobre camada de tinta. Ele levou horas para pintá-la. A segunda foi produzida em segundos por uma combinação de quatro matrizes de pixels: uma para ciano, uma para magenta, uma para amarelo e uma para preto. A diferença chave entre ambas é que a segunda imagem foi produzida de uma maneira não-serializada (o que significa que não foi feita passo-a-passo, mas simultaneamente).

Este livro é sobre a revolucionária técnica computacional - *fragment shaders* - que eleva imagens geradas digitalmente a um outro nível. Essa revolução é comparável ao que a prensa de Gutenberg, na época, representou para as gráficas.

![Prensa de Gutenberg](gutenpress.jpg)

Fragment shaders te dá controle total sobre os pixels renderizados na tela com uma rapidez impressionante. Por isso eles são usados em todo o tipo de casos, de filtros de video em celulares à incríveis jogos em 3D.

![Journey por That Game Company](journey.jpg)

Nos próximos capítulos você descobrirá o qual inacreditavelmente rápida e poderosa essa técnica é e como aplicá-la aos seus trabalhos profissionais e pessoais.

## Para quem é esse livro?

Esse livro foi escrito para programadores criativos, desenvolvedores de jogos e engenheiros com experiencia em desenvolvimento, conhecimento básico de álgebra linear e trigonometria, e quem gostaria de elevar a qualidade gráfica de seu trabalho a níveis fascinantes. (Se você gostaria de aprender a programar, recomendo que você comece com [Processing](https://processing.org/) e retorne quando você se sentir mais apto.)

Esse livro te ensinará como usar e integrar shaders nos seus projetos, melhorando sua performance e qualidade gráfica. Porque os shaders GLSL (OpenGL Shading Language) compilam e executam numa variedade de plataformas, você poderá aplicar o que aprender aqui em qualquer meio que utilize OpenGL, OpenGL ES ou WebGL. Em outras palavras, você será capaz de aplicar e usar seu conhecimento com sketches em [Processing](https://processing.org/), aplicações em [openFrameworks](http://openframeworks.cc/), instalações interativas em [Cinder](http://libcinder.org/) e websites ou jogos para iOS/Android em [Three.js](http://threejs.org/).

## O que abrange esse livro?

Esse livro focará no uso de pixel shaders GLSL. Primeiro vamos definir o que são shaders; então aprenderemos a fazer figuras, padrões, texturas e animações procedurais com eles. Você aprenderá os fundamentos da linguagem de shading e a aplicará em cenários mais úteis como: processamento de imagem (operações de imagem, convoluções matriciais, desfocamento, filtros de cor, lookup tables e outros efeitos) e simulações (o jogo da vida de Conway, reação-difusão de Gray-Scott, ondulações de água, efeitos de aquarela, células de Voronoi, etc.). Mais para o final do livro veremos um conjunto de técnicas avançadas baseadas em Ray Marching.

*Haverão exemplos interativos para você experimentar com em cada capítulo.* Quando você mudar o código, você verá as mudanças imediatamente. Os conceitos podem ser abstratos e confusos, por isso os exemplos interativos são essenciais para te ajudar a entender o material. Quanto mais rápido você pôr a mão na massa, mais fácil o aprendizado será.

O que esse livro não abrange:

* Este *não é* um livro sobre openGL ou webGL. OpenGL/webGL são assuntos maiores que GLSL ou fragment shaders. Para aprender mais sobre openGL/webGL eu recomendo checar: [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (também conhecido como o livro vermelho) ou [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* Este *não é* um livro de matemática. Apesar de cobrirmos um número de algorítmos e técnicas que dependem da compreensão de álgebra e trigonometria, não as explicaremos em detalhes. Para dúvidas relacionadas à matemática eu recomendo manter um destes livros por perto: [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) ou [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## O que você precisa para começar?

Nada demais! Se você tem um browser moderno com WebGL (como Chrome, Firefox ou Safari) e conexão à internet, clique em "Next" no fim desta página para começar.

Alternativamente, baseado no que você tem ou precisa nesse livro, você pode:

- [Fazer uma versão offline deste livro](https://thebookofshaders.com/appendix/00/)

- [Executar os emplos em um Raspberry Pi sem um browser](https://thebookofshaders.com/appendix/01/)

- [Fazer um PDF do livro para impressão](https://thebookofshaders.com/appendix/02/)

- Use o [repositório no GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) para nos ajudar a resolver problemas e compartilhar código.
