<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*von [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) und [Jen Lowe](http://jenlowe.net/)*

Dies ist eine behutsame Schritt-für-Schritt-Einführung in die komplexe und vielfach abstrakte Welt der Fragment Shader.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Inhalt

* [Über dieses Buch](00/?lan=de)

* Jetzt geht’s los
    * [Was ist ein Shader?](01/?lan=de)
    * [“Hallo Welt!”](02/?lan=de)
    * [Uniforms](03/?lan=de)
    * [Ausführung Deiner Shader](04/?lan=de)

* Algorithmisches Zeichnen
    * [Formgebende Funktionen](05/?lan=de)
    * [Farben](06/?lan=de)
    * [Formen](07/?lan=de)
    * [Matrizen](08/?lan=de)
    * [Muster](09/?lan=de)

* Generative Designs
    * [Zufall](10/?lan=de)
    * [Rauschen](11/?lan=de)
    * [Zelluläres Rauschen](12/?lan=de)
    * [Gebrochene Brownsche Bewegung](13/?lan=de)
    * Fraktale

* Bildverarbeitung
    * Texturen
    * Bildbearbeitungsfunktionen
    * Kernel Verwindungen
    * Filter
    * Weitere Effekte

* Simulationen
    * Pingpong
    * Conway
    * Wellen
    * Wasserfarben
    * Reaktionsausbreitung

* 3D Grafiken
    * Licht
    * Normal Mapping
    * Bump-Mapping
    * Ray Marching
    * Environmental-Maps (sphärisch und kubisch)
    * Reflektionen und Ablenkungen

* [Anhang:](appendix/?lan=de) Weitere Wege zur Nutzung dieses Buches
	* [Wie kann ich dieses Buch offline lesen?](appendix/00/?lan=de)
	* [Wie lasse ich die Beispielprogramme auf einem Raspberry Pi ablaufen?](appendix/01/?lan=de)
	* [Wie drucke ich dieses Buch aus?](appendix/02/?lan=de)
    * [Wie kann ich zu diesem Buch beitragen?](appendix/03/?lan=de)
    * [Eine Einführung für alle, die von JavaScript kommen](appendix/04/?lan=de) von [Nicolas Barradeau](http://www.barradeau.com/) (Englisch)

* [Beispielgalerien](examples/)

* [Glossar](glossary/) (Englisch)

## Über die Autoren

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Buenos Aires, Argentinien) ist ein Künstler und Entwickler, der in New York lebt. Er erforscht die Räume zwischen organisch und synthetisch, analog und digital, einzeln und zusammen. In seinen Arbeiten nutzt er Programmcode als Ausdrucksform, um das Zusammenwirken von Menschen zu verbessern.

Patricio hat Psychologie studiert, außerdem kunstorientiertes Handeln (die sogenannte Expressive Arts Therapy). Er hat einen MFA-Abschluss in Design und Technologie von der Parsons New School For Design, wo er auch unterrichtet. Zur Zeit arbeitet Patricio als Grafikingenieur bei der Firma Mapzen und entwickelt dort Open-Source-Werkzeuge für die Computer-Kartographie.
<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">Webseite</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/) ist eine unabhängige Datenwissenschaftlerin und Datenkommunikatorin bei der Firma Datatelling, wo sie Menschen, Zahlen und Sprache zusammenführt. Sie unterrichtet an der SVA das Fach Design for Social Innovation, hat die Schule für „Poetic Computation“ mitbegründet, Mathematik für Künstler an der New Yorker ITP-Universität unterrichtet, Forschungen am „Spatial Information Design Lab“ der Columbia Universität durchgeführt und Beiträge für das „White House Office of Science and Technology“ geliefert, das den US-Präsidenten in Fragen des technischen Fortschritts berät. Als Sprecherin ist Jen auf Konferenzen wie der SXSW und der Eyeo aufgetreten. Von ihren Arbeiten hat unter anderem die New York Times, sowie das Magazin FastCompany berichtet. Ihre Forschungsarbeiten, Publikationen und Vorträge kreisen um die Versprechungen und Folgen von Daten und Technologien für die gesellschaftliche Entwicklung. Sie hat einen Bachelor in angewandter Mathematik und einen Master in Informatik. Obwohl man angesichts dieser Biographie vielleicht etwas anderes vermuten könnte, schlägt sich Jen immer auf die Seite der Liebe.
<div class="header"> <a href="http://jenlowe.net/" target="_blank">Webseite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Danksagungen

Dank an [Scott Murray](http://alignedleft.com/) für die Inspirationen und Ratschläge.

Dank an [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere) und [Karim Naaji](http://karim.naaji.fr/) für ihre Unterstützung, Anregungen und Programmcode.

Dank an [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) und [Sawako](https://twitter.com/sawakohome) für die [japanische Übersetzung des Textes (日本語訳)](?lan=jp)

Dank an [Tong Li](https://www.facebook.com/tong.lee.9484) und [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) für die [chinesische Übersetzung des Textes (中文版)](?lan=ch)

Dank an [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) für die [koreanische Übersetzung des Textes (한국어)](?lan=kr)

Dank an Nahuel Coppero (Necsoft) für die
[spanische Übersetzung des Textes (español)](?lan=es)

Dank an [Nicolas Barradeau](https://twitter.com/nicoptere) und [Karim Naaji](http://karim.naaji.fr/) für die [französische Übersetzung des Textes (français)](?lan=fr)

Dank an [Andrea Rovescalli](https://www.earove.info) für die  [italienische Übersetzung des Textes (italiano)](?lan=it)

Dank an [Michael Tischer](http://www.mitinet.de) für die [deutsche Übersetzung des Textes](?lan=de)

Dank an [Manoylov Andriy](https://twitter.com/ManoylovAC) für die [ukrainische Übersetzung des Textes (українська)](?lan=ua)

Und natürlich Danke an alle, die an dieses Projekt geglaubt, dafür gespendet oder durch Hinweise und Korrekturen [daran mitgewirkt haben](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors).

## Hol Dir die neuen Kapitel

Melde Dich für den Newsletter an oder folge uns auf [Twitter](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone)

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>
