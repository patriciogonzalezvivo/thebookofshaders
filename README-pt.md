<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*por [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) e [Jen Lowe](http://jenlowe.net/)*

Este é um guia passo-a-passo pelo universo abstrato e complexo de Fragment Shaders.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Conteúdo

* [Sobre este livro](00/?lan=pt)

* Início
    * [O que é um shader?](01/?lan=pt)
    * [“Olá mundo!”](02/?lan=pt)
    * [Uniforms](03/?lan=pt)
	* [Executando seu shader](04/?lan=pt)

* Desenho algorítmico
    * [Funções de forma](05/?lan=pt)
    * [Cores](06/?lan=pt)
    * [Formas](07/?lan=pt)
    * [Matrizes](08/?lan=pt)
    * [Padrões](09/?lan=pt)

* Design generativo
    * [Aleatório](10/?lan=pt)
    * [Noise](11/)
    * [Cellular noise](12/)
    * [Movimento browniano fracionário](13/)
    * Fractais

* Processamento de imagem
    * Texturas
    * Operações de imagem
    * Convoluções do kernel
    * Filtros
    * Outros efeitos

* Simulação
    * Pingpong
    * Conway
    * Ondulações
    * Aquarela
    * Reação-Difusão

* Gráficos em 3D
    * Luzes
    * Normal-maps
    * Bump-maps
    * Ray marching
    * Environmental-maps (esférico e cúbico)
    * Reflexão e refração

* [Apêndice:](appendix/) Outras formas de usar este livro
	* [Como eu posso ler este livro offline?](appendix/00/)
	* [Como eu posso rodar os exemplos em um Raspberry Pi?](appendix/01/)
	* [Como imprimir este livro?](appendix/02/)
	* [Como eu posso colaborar?](appendix/03/)
	* [Uma introdução para quem é familiarizado com JS](appendix/04/) por [Nicolas Barradeau](http://www.barradeau.com/)

* [Galeria de exemplos](examples/)

* [Glossário](glossary/)

## Sobre os autores

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Buenos Aires, Argentina) é um artista e desenvolvedor residente em New York. Ele explora os espaços intersticiais entre o orgânico e sintético, analógico e digital, individual e coletivo. Em seu trabalho utiliza código como linguagem expressiva com a intenção de desenvolver uma melhor conexão entre as pessoas.

Patricio estudou e praticou psicoterapia e terapia de arte expressiva. Ele possui MFA em Design & Technologia pela Parsons The New School, onde hoje leciona. Atualmente trabalha como Engenheiro Gráfico na Mapzen, criando ferramentas open source de mapeamento.

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">WebSite</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/) é uma cientista de dados independente e comunicadora de dados na Datatelling, onde une pessoas + números + palavras. Ela leciona no SVA's Design for Social Innovation program, co-fundou a School for Poetic Computation, ensinou Math for Artists na NYU ITP, pesquisou no Spatial Information Design Lab na Columbia University, e contribuiu com ideias na White House Office of Science and Technology Policy. Ela discursou no SXSW e Eyeo. Seu trabalho foi coberto pelo The New York Times e Fast Company. Sua pesquisa, escritos, e palestras exploram as promessas e implicações dos dados e da technologia na sociedade. Ela é bacharel em Matemática Aplicada e mestre em Ciência da Informação. Frequentemente oposicionista, ela está sempre do lado do amor.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">WebSite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Acknowledgements

Obrigado [Scott Murray](http://alignedleft.com/) pela inspiração e conselhos.

Obrigado [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere), [Karim Naaji](http://karim.naaji.fr/) por contribuir com apoio, boas ideias e código.

Obrigado [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) e [Sawako](https://twitter.com/sawakohome) pela [tradução em Japonês (日本語訳)](?lan=jp)

Obrigado [Tong Li](https://www.facebook.com/tong.lee.9484) e [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) pela [tradução em Chinês (中文版)](?lan=ch)

Obrigado [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) pela [tradução em Koreano (한국어)](?lan=kr)

Obrigado Nahuel Coppero (Necsoft) pela [tradução em Espanhol (español)](?lan=es)

Obrigado [Nicolas Barradeau](https://twitter.com/nicoptere) e [Karim Naaji](http://karim.naaji.fr/) pela [tradução em Francês (français)](?lan=fr)

Obrigado [Andrea Rovescalli](https://www.earove.info) pela [tradução em Italiano (italiano)](?lan=it)

Obrigado [Michael Tischer](http://www.mitinet.de) pela [tradução em Alemão (deutsch)](?lan=de)

Obrigado [Sergey Karchevsky](https://www.facebook.com/sergey.karchevsky.3) pela [tradução em Russo (russian)](?lan=ru)

Obrigado [Manoylov Andriy](https://twitter.com/ManoylovAC) pela [tradução em Ucraniano (українська)](?lan=ua)

Obrigado [Andy Stanton](https://andy.stanton.is/) por corrigir e melhorar [a pipeline para exportar pdf/epub](https://thebookofshaders.com/appendix/02/)

Obrigado a todos que acreditaram neste projeto e [contribuíram com correções](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) ou doações.

## Receba novos capítulos

Assine a newsletter ou nos siga no [Twitter](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone) 

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>
