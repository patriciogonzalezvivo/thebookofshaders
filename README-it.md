<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*di [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/)*

Questa è una guida passo passo attraverso l'universo astratto e complesso dei Fragment Shaders.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Contenuto

* [A proposito di questo libro](00/?lan=it)

* Introduzione
    * [Che cosa è uno shader?](01/?lan=it)
    * ["Hello world!"](02/?lan=it)
    * [Uniforms](03/?lan=it)
	* [Esegui il tuo shader](04/?lan=it)

* Disegno algoritmico
    * [Le funzioni di forma](05/?lan=it)
    * [Colori](06/?lan=it)
    * [Figure](07/?lan=it)
    * [Matrici](08/?lan=it)
    * [Motivi](09/?lan=it)

* Progettazione generativa
    * [Random](10/?lan=it)
    * [Rumore](11/?lan=it)
    * Moto browniano frazionario
    * Frattali

* Trattamento delle immagini:
    * Textures
    * Operazioni d'immagine
    * Convoluzioni di Kernel
    * Filtri
    * Altri effetti

* Simulazione
    * Pingpong
    * Conway
    * Ripples
    * Water color
    * Reaction diffusion

* Grafica 3D
    * Luci
    * Normal-maps
    * Bump-maps
    * Ray marching
    * Environmental-maps (sferiche e cubiche)
    * Riflesso e rifrazione

* [Appendice:](appendix/) Altri modi per utilizzare questo libro
	* [Come posso consultare questo libro offline?](appendix/)
	* [Come posso far andare gli esempi su un RaspberryPi?](appendix/)
	* [Come posso stampare questo libro?](appendix/)
    * [Come posso collaborare?](appendix/)

* [Galleria d'esempi](examples/)

* [Glossario](glossary/)

## A proposito dell'autore

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Buenos Aires, Argentina) è un artista e sviluppatore con sede a New York. Esplora lo spazio interstiziale fra organico e sintetico, analogico e digitale, individuale e collettivo. Nel suo lavoro usa il codice come un linguaggio espressivo con l'intenzione di creare un migliore vivere insieme.

Patricio studiò e praticò la psicoterapia e l'arteterapia. Ha conseguito un MFA in Design e Tecnologia alla Parsons The New School. dove ora insegna. Attualmente lavora come Ingegnere Grafico alla Mapzen realizzando strumenti cartografici openSource. 

<div class="header"><a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

## Ringraziamenti

Grazie a mia moglie [Jen Lowe](http://www.datatelling.com/), per il suo incondizionato supporto, aiuto e tempo nel rivedere questo libro.

Grazie [Scott Murray](http://alignedleft.com/) per l'ispirazione e i consigli.

Grazie [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) e [Sawako](https://twitter.com/sawakohome) per la [traduzione giapponese (日本語訳)](?lan=jp)

Grazie [Tong Li](https://www.facebook.com/tong.lee.9484) e [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) per la [traduzione cinese (中文版)](?lan=ch)

Grazie [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) per la [traduzione coreana (한국어)](?lan=kr)

Grazie [Nahuel Coppero (Necsoft)](http://hinecsoft.com/) per la [traduzione spagnola (español)](?lan=es)

Grazie [Karim Naaji](http://karim.naaji.fr/) che a contribuito con il suo supporto, le sue buone idee e il suo codice.

Grazie a tutti coloro i quali hanno  creduto in questo progetto e [contribuito con correzioni](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) o donazioni.

## Come ottenere i nuovi capitoli?

Iscriviti alla newsletter o [seguici su Twitter](https://twitter.com/bookofshaders)

 <form style="border:1px solid #ccc;padding:3px;text-align:center;" action="https://tinyletter.com/thebookofshaders" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/thebookofshaders', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"><a href="https://tinyletter.com/thebookofshaders"><p><label for="tlemail">Inserisci il tuo indirizzo di posta elettronica</label></p></a><p><input type="text" style="width:140px" name="email" id="tlemail" /></p><input type="hidden" value="1" name="embed"/><input type="submit" value="Iscriviti" /><p><a href="https://tinyletter.com" target="_blank"></a></p></form>
