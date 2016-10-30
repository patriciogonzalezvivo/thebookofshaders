# Einleitung

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Die openstehenden Bilder sind auf zwei verschiedenen Wegen entstanden. Das Erste entstand durch Van Gogh's Hand indem Farbschicht über Farbschicht gelegt wurde. Es kostete ihn mehrere Stunden. Das Zweite enstand innerhalb von Sekunden durch die Kombination von vier Pixelmatrizen: eine für Cyan, eine für Magenta, eine für Gelb und eine für Schwarz. Der entscheidende Unterschied ist dass das zweite Bild nicht seriell erzeugt wurde (das bedeutet nicht Schritt für Schritt, sondern alles auf einmal). 

Dieses Buch behandelt eine revolutionäre Berechnungsmethode, *Fragmentshader*, welche digital erzeuge Bilder auf eine neue Ebene hebt. Du kannst sie dir als Gegenstück zu Gutenbergs Druckerpresse für Bilder vorstellen.

![Gutenbergs Druckerpresse](gutenpress.jpg)

Fragmentshader geben dir volle Kontrolle über die auf Bildschirmen dargestellten Pixel mit extremer Geschwindigkeit. Aus diesem Grund werden sie vielfältig angewendet, von Videofilter in Mobiltelefonen bis hin zu unglaublichen 3D Videospielen.

![Journey von That Game Company](journey.jpg)

In den folgenden Kapiteln wirst du entdecken wie unglaublich schnell und mächtig diese Technik ist und wie du sie für deine professionells und private Werke benutzt.

## Für wen ist dieses Buch?

Dieses Buch ist für "creative coders", Spieleentwickler und Ingeneure mit Programmiererfahrung, Grundlagenwissen in linearer Algebra und Trigonometrie, die ihrer Arbeit ein aufregendes Niveau an grafischer Qualität verleihen wollen. (Falls du programmieren lernen willt empfehle ich mit [Processing](https://processing.org/) anzufangen und später hierher zurückzukehren.)

Dieses Buch wird dir beibringen wie man Shader benutzt und in deinen Projekten verwendet um die Performance und Bildqualität zu steigern. [GLSL (OpenGL Shading Language)](https://de.wikipedia.org/wiki/OpenGL_Shading_Language) Shader kompilieren und laufen auf einer Bandbreite an Platformen. Du kannst so dein Wissen in jeder Umgebung einsetzen, die OpenGL, OpenGL ES oder WebGL benutzt. Anders gesagt, dein Wissen ist auf [Processing](https://processing.org/) sketches, [openFrameworks](http://openframeworks.cc/) Anwendungen, interaktive [Cinder](http://libcinder.org/) Installationen, [Three.js](http://threejs.org/) Webseiten oder iOS/Android Spiele anwendbar.

## Was behandelt dieses Buch?

Dieses Buch wird sich auf die Verwendung von GLSL Pixelshadern konzentrieren. Zuerst wird definiert was Shader sind, anschließend werden wir lernen wie man verfahrensorientiert Formen, Muster, Texturen und Animationen mit ihnen erstellt. Du wirst die Grundlagen von Shadersprachen lernen und auf verschieden Szenarien wie Bildverarbeitung (Operationen, Matrixfaltung, Verwischen, Farbfilter, lookup Tabellen und andere Effekte) und Simulationen (Conway's game of life, Gray-Scott's reaction-diffusion, Wasserwellen, Wasserfarbeneffekte, Voronoizellen, etc.) anwenden. Am Ende des Buches werden wir ein paar fortgeschrittenen Techniken auf der Basis von Ray Matching betrachten.

*Es gibt interaktive Beispiele zum experimentieren mit jedem Kapitel.* Wenn du den Quelltext veränderst wirst du sofort Auswirkungen sehen. Die Konzepte können abstrakt und verwirrend sein. Die interaktiven Beispiele sind wesentlich um das Material zu lernen. Je schneller du diese Konzepte umsetzst, desto einfacher wird der Lernprozess.

Was dieses Buch *nicht* behandelt:

* Dies *ist kein* Buch über openGL oder WebGL. OpenGL/WebGL ist ein grüßeres Thema als GLSL oder Fragmentshader. Ich empfehle folgende Quellen um über openGL/WebGL zu lernen:  [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (auch "red book" genannt) oder [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* Dies *ist kein* Mathematikbuch. Auch wenn wir einen Teil and Algorithmen und Techniken basierend auf Algebra und Trigonometry benutzen, werden sie nicht im Detail erklärt. Ich empfehle eines der folgenden Bücher bezüglich der Mathematik: [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) oder [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## Was brauchst du um anzufangen?

Nicht viel! Falls du einen modernen Browser der WebGL unterstützt (z.B. Chrome, Firefox oder Safari) und einen Internetzugang hast, klicke den “Next” Link am Ende der Seite um anzufangen.

Anderenfalls kannst du je nach Bedarf:

- [Eine off-line version dieses Buches](https://thebookofshaders.com/appendix/)

- [Führe die Beispiele auf einem Raspberry Pi ohne einen Browser aus](https://thebookofshaders.com/appendix/)

- [Erstelle ein PDF dieses Buches zum Drucken](https://thebookofshaders.com/appendix/)

- Nutze das [on-line repository](https://github.com/patriciogonzalezvivo/thebookofshaders) um Probleme zu lösen und Quelltext zu teilen.

