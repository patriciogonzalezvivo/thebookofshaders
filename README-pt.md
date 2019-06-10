<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*by [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) and [Jen Lowe](http://jenlowe.net/)*

Este é um guia passo a passo através do universo complexo e abstrato dos Fragment Shaders.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Contents

* [Sobre este livro](00/)

* Começando
    * [O que é um shader?](01/)
    * [“Hello world!”](02/)
    * [Uniformes](03/)
	* [Executando seu shader](04/)

* Desenho algorítmico 
    * [Funções de forma](05/)
    * [Cores](06/)
    * [Formas](07/)
    * [Matrizes](08/)
    * [Padrões](09/)

* Designs generativos
    * [Aletório](10/)
    * [Ruído](11/)
    * [Ruído celular](12/)
    * [Movimento browniano fractal](13/)
    * Fractais

* Processamento de imagem
    * Texturas
    * Operações com imagens
    * Convoluções núcleo (kernel
    * Filtros
    * Outros efeitos

* Simulação
    * Pingpong
    * Conway
    * Ripples
    * Cor de água
    * Difusão de reação

* Gráficos 3D 
    * Luzes
    * Normal-maps
    * Bump-maps
    * Ray marching
    * Environmental-maps (esféricas e cúbicas)
    * Reflexão e refração

* [Apêndice:](appendix/) Outras formas de usar este livro
	* [Como posso navegar esse livro offline?](appendix/00/)
	* [Como rodar os exemplo em um Raspberry Pi?](appendix/01/)
	* [Como imprimir esse livro?](appendix/02/)
    * [Como posso colaborar?](appendix/03/)
    * [Uma introdução para quem vem do JS](appendix/04/) por [Nicolas Barradeau](http://www.barradeau.com/)

* [Galeria de Exemplos](examples/)

* [Glossário](glossary/)

## Sobre os Autores

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Buenos Aires, Argentina) é um artista e desenvolvedor, atualmente morando em New York. Ele explora os espaços entre o orgânico e sintético, analógico e digital, individual e coletivo. Em seu trabalho, ele usa código como linguagem de expressão com a intenção de desenvolver uma melhor união.

Patricio estudou e praticou psicoterapia e terapia em arte expressiva. Tem um MFA em Design & Tecnologia pela Parsons The New School, onde ele agora leciona. Atualmente ele trabalha como Engenheiro Gráfico na Mapzen criando ferramentas openSource de mapeamento.

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">WebSite</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/) é uma cientista de dados independente e comunicadora de dados na Datatelling onde ela junta pessoas + números + palavras. Ela dá aulas no programa Design for Social Innovation da SVA, co-fundou a School for Poetic Computation, ensinou Matemática para Artistas na NYU ITP, pesquisouno  Spatial Information Design Lab da Columbia University, e contribuiu com ideias na White House Office of Science and Technology Policy. Já falou na SXSW e  Eyeo. Seu trabalho já foi coberto pelo The New York Times e a Fast Company. Sua pesquisa, escrita, e discurso exploram as promessas e implicações dos dados e a tecnologia na sociedade. Ela tem um B.S. em Matemática Aplicadae e Master's em Ciência da Informação. Geralmente em oposição a isso tudo, ela sempre está do lado do amor.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">WebSite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Agradecimentos

Obrigado a [Scott Murray](http://alignedleft.com/) pela inspiração e conselhos.

Obrigado a [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere), [Karim Naaji](http://karim.naaji.fr/) por contribuir com apoio, boas ideia e código.

Obrigado a [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) e [Sawako](https://twitter.com/sawakohome) pela [tradução japonesa (日本語訳)](?lan=jp)

Obrigado a [Tong Li](https://www.facebook.com/tong.lee.9484) e [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) pela [tradução chinesa (中文版)](?lan=ch)

Obrigado a [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) pela tradução [coreana (한국어)](?lan=kr)

Obrigado a [Nahuel Coppero (Necsoft)](http://hinecsoft.com/) pela tradução [espanhola](?lan=es)

Obrigado a [Nicolas Barradeau](https://twitter.com/nicoptere) e [Karim Naaji](http://karim.naaji.fr/) pela tradução [francesa](?lan=fr)

Obrigado a [Andrea Rovescalli](https://www.earove.info) pela tradução [italiana](?lan=it)

Obrigado a [Michael Tischer](http://www.mitinet.de) pela tradução [alemã](?lan=de)

Obrigado a [Sergey Karchevsky](https://www.facebook.com/sergey.karchevsky.3) pela tradução [russa](?lan=ru)

Obrigado a todos que acreditaram nesse projeto e [contribuiram com acertos](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) ou doações.

## Get new chapters

Assine as newsletters ou [siga no Twitter](https://twitter.com/bookofshaders)

 <form style="border:1px solid #ccc;padding:3px;text-align:center;" action="https://tinyletter.com/thebookofshaders" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/thebookofshaders', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"><a href="https://tinyletter.com/thebookofshaders"><p><label for="tlemail">Entre com seu email</label></p></a><p><input type="text" style="width:140px" name="email" id="tlemail" /></p><input type="hidden" value="1" name="embed"/><input type="submit" value="Subscribe" /><p><a href="https://tinyletter.com" target="_blank"></a></p></form>
