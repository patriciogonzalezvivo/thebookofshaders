<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*di [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) e [Jen Lowe](http://jenlowe.net/)*

Questa è una guida passo passo attraverso l'universo astratto e complesso dei Fragment Shaders.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Contenuto

* [A proposito di questo libro](00/?lan=it)

* Introduzione
    * [Che cosa è uno shader?](01/?lan=it)
    * ["Ciao mondo!"](02/?lan=it)
    * [Uniforms](03/?lan=it)
	* [Eseguite il vostro shader](04/?lan=it)

* Disegno algoritmico
    * [Le funzioni di forma](05/?lan=it)
    * [Colori](06/?lan=it)
    * [Figure](07/?lan=it)
    * [Matrici](08/?lan=it)
    * [Motivi](09/?lan=it)

* Progettazione generativa
    * [Random](10/?lan=it)
    * [Rumore](11/?lan=it)
    * Rumore cellulare
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
    * Increspature
    * Acquerello
    * Reazione-diffusione

* Grafica 3D
    * Luci
    * Normal-maps
    * Bump-maps
    * Ray marching
    * Environmental-maps (sferiche e cubiche)
    * Riflesso e rifrazione

* [Appendice:](appendix/) Altri modi per utilizzare questo libro
	* [Come posso consultare questo libro offline?](appendix/00/?lan=it)
	* [Come posso eseguire gli esempi su un Raspberry Pi?](appendix/01/?lan=it)
	* [Come posso stampare questo libro?](appendix/02/?lan=it)
    * [Come posso collaborare a questo libro?](appendix/03/?lan=it)
    * [Un'introduzione per chi proviene da JS](appendix/04/) di [Nicolas Barradeau](http://www.barradeau.com/)

* [Galleria d'esempi](examples/)

* [Glossario](glossary/)

## A proposito dell'autore

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Buenos Aires, Argentina) è un artista e sviluppatore con sede a New York. Esplora lo spazio interstiziale fra organico e sintetico, analogico e digitale, individuale e collettivo. Nel suo lavoro usa il codice come un linguaggio espressivo con l'intenzione di creare un migliore vivere insieme.

Patricio studiò e praticò la psicoterapia e l'arteterapia. Ha conseguito un MFA in Design e Tecnologia alla Parsons The New School dove ora insegna. Attualmente lavora come Ingegnere Grafico alla Mapzen realizzando strumenti cartografici openSource.

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">WebSite</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/) è una scienziata indipendente e comunicatrice di dati alla Datatelling dove riunisce persone + numeri + parole. Insegna alla SVA's Design per il programma di Social Innovation, ha co-fondato la School for Poetic Computation, ha insegnato Matematica per Artisti al NYU ITP, ha fatto della ricerca al Spatial Information Design Lab presso la Columbia University, e ha contribuito con idee alla White House Office of Science and Technology Policy. Ha parlato al SXSW e Eyeo. Il suo lavoro è stato trattato dal The New York Times and Fast Company. La sua ricerca, i suoi scritti e la sue dissertazioni esplorano le promesse e le implicazioni dei dati e della tecnologia nella società. Ha una laurea triennale in Matematica Applicata e una laurea specialistica in Scienze Informatiche. Spesso combattiva, è sempre dalla parte dell'amore.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">WebSite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Ringraziamenti

Grazie a [Scott Murray](http://alignedleft.com/) per l'ispirazione e i consigli.

Grazie a [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), a [Nicolas Barradeau](https://twitter.com/nicoptere), a [Karim Naaji](http://karim.naaji.fr/) per aver contribuito con il loro sostegno, con delle buone idee e con del codice.

Grazie a [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) e a [Sawako](https://twitter.com/sawakohome) per la [traduzione giapponese (日本語訳)](?lan=jp)

Grazie a [Tong Li](https://www.facebook.com/tong.lee.9484) e a [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) per la [traduzione cinese (中文版)](?lan=ch)

Grazie a [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) per la [traduzione (한국어)](?lan=kr) coreana

Grazie a Nahuel Coppero (Necsoft) per la [traduzione (español)](?lan=es) spagnola

Grazie a [Nicolas Barradeau](https://twitter.com/nicoptere) e a [Karim Naaji](http://karim.naaji.fr/) per la [traduzione (français)](?lan=fr) francese

Grazie a [Andrea Rovescalli](https://www.earove.info) per la [traduzione](?lan=it) italiana

Grazie a [Manoylov Andriy](https://twitter.com/ManoylovAC) per la [traduzione ucraina (українська)](?lan=ua)

Grazie a tutti coloro i quali hanno creduto in questo progetto e [contribuito con correzioni](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) o donazioni.

## Come ottenere i nuovi capitoli?

Iscriviti alla newsletter o seguici su [Twitter](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone) 

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>
