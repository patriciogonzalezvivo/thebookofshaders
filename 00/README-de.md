# Einleitung

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Die oben abgebildeten Grafiken wurden auf ganz unterschiedliche Weise erstellt. Die linke Abbildung stammt aus den Händen des Malers Van Gogh, der die Farben in stundenlanger Arbeit Schicht für Schicht mit einem Pinsel aufgetragen hat. Die rechte Abbildung wurde dagegen innerhalb von Sekundenbruchteilen mit Hilfe von vier Punktmatrizen erzeugt: eine für Cyan, eine für Magenta, eine für Gelb und eine für Schwarz. Der entscheidende Unterschied: Das zweite Bild wurde nicht seriell erstellt, d.h. Strich für Strich, sondern parallel, alle Punkte zur gleichen Zeit.

Dieses Buch handelt von einer Computertechnik mit Namen *Fragment Shader*, die die digitale Erzeugung von Bildern revolutioniert und zu neuen Höhen geführt hat. Man kann ihre Erfindung ein wenig vergleichen mit dem Schritt von der manuellen Vervielfältigung einzelner Grafiken und Dokumente hin zur massenhaften Replikation durch Gutenbergs Druckerpresse.

![Gutenbergs Druckerpresse](gutenpress.jpg)

Fragment-Shader ermöglichen die vollständige Kontrolle über alle Bildpunkte, die als Grafik auf dem Bildschirm erscheinen. Und das mit ungeheurer Geschwindigkeit. Deshalb wird diese Technik mittlerweile in vielen Bereichen der Computergrafik angewandt, von Videofiltern auf Smartphones bis hin zu den neuesten fotorealistisch wirkenden 3D-Videospielen.

![Grafik aus dem Spiel „Journey“ von That Game Company](journey.jpg)

Die folgenden Kapitel wollen Dir zeigen, wie unglaublich schnell und leistungsfähig diese Technik ist, und wie Du sie im Rahmen von privaten und beruflichen Projekten einsetzen kannst.

## Für wen ist dieses Buch geeignet?

Dieses Buch wendet sich an kreative Programmierer, Spieleentwickler und Ingenieure, die bereits über eine gewisse Programmiererfahrung, sowie grundlegende Kenntnisse aus den Bereichen der linearen Algebra und der Trigonometrie verfügen. (Falls Du erst noch Programmieren lernen möchtest, empfehle ich Dir, mit [Processing](https://processing.org/) zu beginnen und anschließend mit diesem Buch fortzufahren.)

Die folgenden Kapitel werden Dir zeigen, wie Du Shader in Deinen Projekten einsetzen kannst, um die Qualität und die Geschwindigkeit bei der Erzeugung von Grafiken zu verbessern. GLSL-Shader (GLSL steht für „OpenGL Shading Language“) lassen sich auf einer Vielzahl von Hardwareplattformen und Betriebssystemen kompilieren und ausführen. Dadurch kannst Du das erlernte Wissen in jeder Umgebung einsetzen, die OpenGL, OpenGL ES oder WebGL unterstützt.

In anderen Worten, Du kannst Dein Know-how u.a. beim Malen mit [Processing](https://processing.org/), bei Anwendungen für [openFrameworks](http://openframeworks.cc/), interaktiven Installationen mit [Cinder](http://libcinder.org/), Webseiten mit [Three.js](http://threejs.org/) oder bei Spielen für iOS/Android nutzen.

## Welchen Aspekten widmet sich dieses Buch?

Dieses Buch konzentriert sich auf den Einsatz von GLSL-Pixel-Shadern. Zunächst erklären wir, was Shader sind, dann wenden wir uns der algorithmischen Erzeugung von Formen, Mustern, Texturen und Animationen zu. Du lernst die Grundlagen der Programmiersprache für OpenGL-Shader kennen und erfährst, wie man sie für konkrete Zwecke nutzt. Dazu zählt die Bildbearbeitung (Bildmanipulationen, Matrizenoperationen, Farbfilter und weitere Effekte), sowie Simulationen (Conways Game of Life, Reaktion und Diffusion von Chemikalien nach Gray-Scott, Erzeugung von Wasserwellen, die Nachbildung des Malens mit Wasserfarben, Erzeugung von Voronoi-Zellen und mehr). Zum Ende des Buches hin lernst Du fortschrittliche Techniken kennen, bei denen etwa mit Hilfe des sogenannten „Ray Marchings“ beeindruckende 2D-Grafiken aus 3D-Daten generiert werden.

*In jedem Kapitel gibt es interaktive Beispiele, mit denen Du vieles ausprobieren kannst.* Sobald du etwas am Programmcode änderst, erscheinen die daraus resultierenden Veränderungen an der erzeugten Grafik sofort auf dem Bildschirm. Die vorgestellten Konzepte sind teilweise abstrakt und auf den ersten Blick vielleicht ein wenig verwirrend. Aber mit Hilfe der interaktiven Beispiele kannst Du den Lernstoff leicht nachvollziehen. Je mehr Du ausprobierst, desto einfacher wird Dir das Lernen fallen.

Was dieses Buch nicht behandelt:

* Dies *ist kein * Buch über openGL oder webGL. OpenGL/webGL ist ein umfassenderes Thema als GLSL- oder Fragment-Shader. Wenn Du mehr über openGL/webGL lernen möchtest, empfehle ich Dir die folgenden Materialien: [OpenGL Einführung (Englisch)](https://open.gl/introduction), [Die achte Ausgabe des „OpenGL Programming Guide“ (Englisch)](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (auch bekannt als das „Red Book“) oder [„WebGL: Up and Running“ (Englisch)](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* Das vorliegende Werk *ist außerdem kein* Mathematik-Buch. Obwohl wir bei vielen Techniken und Algorithmen auf Algebra und Trigonometrie zurückgreifen, werden die mathematischen Grundlagen nicht an jeder Stelle vollständig in allen Details erklärt. Bei Fragen dazu empfehle ich Dir eines der folgenden Bücher: [Dritte Ausgabe von „Mathematics for 3D Game Programming and Computer Graphics“ (Englisch)](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) oder [Zweite Ausgabe von „Essential Mathematics for Games and Interactive Applications“ (Englisch)](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## Was benötigst Du, um loszulegen?

Nicht viel! Wenn Du auf Deinem Rechner, Smartphone oder Tablet einen modernen Webbrowser hast, der WebGL unterstützt (etwa Chrome, Firefox oder Safari), und eine Internetverbindung besteht, dann drücke einfach auf die Schaltfläche für das nächste Kapitel am Ende dieser Seite.

Alternativ kannst Du auch:

- [Eine Offline-Fassung dieses Buches erstellen](https://thebookofshaders.com/appendix/?lan=de)

- [Die Beispielprogramme aus diesem Buch direkt auf einem RaspberryPi ausführen (ohne Internet-Browser)](https://thebookofshaders.com/appendix/?lan=de)

- [Eine PDF-Datei mit diesem Buch erzeugen, um es auszudrucken](https://thebookofshaders.com/appendix/?lan=de)

- Die [Online-Ablage dieses Buches](https://github.com/patriciogonzalezvivo/thebookofshaders) bei GitHub nutzen, um Fehler zu melden und Programmcode mit anderen Lesern zu teilen.
