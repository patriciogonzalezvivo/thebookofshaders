# Generative Designs

Nachdem wir in den vorangegangenen Kapiteln so viel über Wiederholungen und wohlgeformte Ordnungen gelernt haben, ist es nur konsequent, nun eine kleine Exkursion in das Reich des Chaotischen zu unternehmen.

## Zufall

[![Ryoji Ikeda – Testmuster (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

Zufälligkeit ist der konsequenteste Ausdruck von Entropie. Doch wie können wir Zufälle innerhalb einer so vorhersehbaren Umgebung wie die der Programmiersprache GLSL erzeugen?

Lass uns damit beginnen, die folgende Funktion zu analysieren:

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Oben sehen wir das Ergebnis, wenn man nur den Nachkommateil der Werte einer *Standardsinuskurve* betrachtet. Die Funktionswerte von [```sin()```](../glossary/?search=sin) oszillieren zwischen ```-1.0``` und ```1.0```. Hier wurde der Vorkommateil abgeschnitten, so dass wir es nur noch mit positiven Werten zwischen ```0.0``` und ```0.99999999...``` zu tun haben. Wir können diesen Effekt nutzen, um „pseudo-zufällige“ Zahlen zu generieren, indem wir die Sinuswelle in kleine Teilstücke „aufbrechen“. Wie das geht? Indem wir das Resultat von  [```sin(x)```](../glossary/?search=sin) mit großen Zahlen multiplizieren. Füge dem Faktor ```1.0``` in der obigen Formel einfach ein paar Nullen vor dem Komma hinzu – eine nach der anderen – und beobachte die Auswirkungen auf den Funktionsgraphen.

Spätestens, wenn Du bei ```100000.0``` angekommen bist (und die Formel so aussieht ```y = fract(sin(x)*100000.0)``` ), wirst Du die zugrundeliegende Sinuswelle nicht mehr erkennen können. Die Granularität des Nachkommaergebnisses hat den stetigen Fluss der Sinuswelle in ein pseudo-zufälliges Chaos verwandelt.

## Wir steuern das

Zufälligkeit für die Shader-Programmierung nutzbar zu machen, kann ganz schön kompliziert sein. Manchmal ist der Zufall zu chaotisch, dann wieder nicht zufällig genug. Schau Dir den folgenden Funktionsgraphen an.  Wir haben ihn mit Hilfe der ```rand()```-Funktion konstruiert, die nach eben jenem Prinzip aufgebaut ist, das wir eben beschrieben haben.

Bei einem genauen Blick erkennst Du, dass die [```sin()```](../glossary/?search=sin)-Funktion ihren Scheitel bei ```-1.5707``` und ```1.5707``` hat. Ich wette, Du ahnst bereits warum – weil dort das Maximum und Minimum einer Sinuswelle liegt, nämlich bei *PI /2.0*.

Außerdem wirst Du im Hinblick auf die Zufallsverteilung feststellen, dass es eine gewisse Häufung im mittleren Bereich im Vergleich zu den äußeren Bereichen gibt.

<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

Vor einiger Zeit hat der Autor mit dem Pseudonym [Pixelero](https://pixelero.wordpress.com) einen interessanten [Artikel über Zufallsverteilungen](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) veröffentlicht. Ich habe einige der Funktionen, die er dort anspricht, in dem obigen Graphen aufgeführt. Du kannst die Kommentare in den einzelnen Zeilen entfernen, um Dir diese Funktionen und ihre Zufallsverteilung anzuschauen.

Wenn Du den bereits zitierten Artikel von [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) liest, darfst Du nicht vergessen, das unsere ```rand()```-Funktionen deterministische Zufallswerte erzeugt, die als „pseudo-zufällig“ bezeichnet werden. Damit ist unter anderem gemeint, das beispielsweise ```rand(1.)``` immer den gleichen Wert zurückliefern wird. Pixelero geht in seinem Artikel auch auf die Funktion ```Math.random()```unter *ActionScript* ein, die beispielsweise nicht-deterministisch ist. Jeder Aufruf mit einem gegebenen Wert als Funktionsargument liefert bei ihr andere Werte zurück.

## 2D-Zufall

Mit diesem vertieften Verständnis von Zufall im Gepäck ist es an der Zeit, den Zufall in zwei Dimensionen wirken zu lassen – entlang der *x-Achse* und der *y-Achse*. Dafür müssen wir einen zweidimensionalen Vektor in einen eindimensionalen Fließkommawert verwandeln. Man kann dies auf verschiedenen Wegen erreichen, aber die Nutzung der [```dot()```](../glossary/?search=dot)-Funktion ist in diesem Fall besonders hilfreich. Sie liefert einen Fließkommawert zwischen ```0.0``` und ```1.0``` zurück, je nachdem wie die beiden Vektoren, deren Skalarprodukt sie bildet, zueinander stehen.

<div class="codeAndCanvas" data="2d-random.frag"></div>

Bitte schaue Dir die *Programmzeilen 13 bis 15* an und beobachte, wie wir den ```vec2 st``` mit einem anderen (konstanten) Vektor (```vec2(12.9898,78.233)```) verknüpfen.

* Verändere die konstanten Werte in den *Programmzeilen 14 und 15*. Beobachte, wie sich das Zufallsmuster dadurch ändert und überlege, was wir daraus lernen können.

* Verknüpfe die Zufallsfunktion mit der Mausposition (```u_mouse```) und der Zeit (```u_time```), damit der Zufall noch weniger vorhersehbar wird.

## Das Chaos nutzen

Zufallswerte in zwei Dimensionen erinnern stark an das Rauschen im analogen TV, wenn das Antennensignal fehlt, nicht wahr? Als Ausgangsmaterial für die Erzeugung von Grafiken scheint es nur wenig geeignet. Aber lass uns einmal schauen, ob wir nicht doch etwas Sinnvolles damit anfangen können.

Unser erster Schritt besteht darin, ein Gitternetz zu unterlegen. Mit Hilfe der [```floor()```](../glossary/?search=floor)-Funktion werden wir eine Integer-Tabelle der Zellen erzeugen. Schau Dir den folgenden Programmcode an, insbesondere die *Programmzeilen 22 und 23*.

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

Nachdem wir den Koordinatenraum in ein Gitternetz mit 10 x 10 Feldern unterteilt haben (in *Programmzeile 21*), separieren wir den Vorkommateil der jeweiligen Koordinate von ihrem Nachkommateil. Wir kennen das bereits aus der Unterteilung des Koordinatenraums in kleinere Zellen, die sich jeweils von ```0.0``` bis ```1.0``` erstrecken. Indem wir den ganzzahligen Teil der Koordinate isolieren, erhalten wir einen gemeinsamen Wert für alle Pixel innerhalb eines Feldes des Gitternetzes. Diesen Wert nutzen wir dann, um einen Zufallswert für diese Region zu generieren. Weil unsere Zufallsfunktion deterministisch ist, wird der Zufallswert für alle Bildpunkte innerhalb dieser Zelle gleich sein.

Entferne die Kommentierung von *Programmzeile 29*, um zu beobachten, wie wir den Nachkommateil der Koordinate behalten. Dadurch können wir diesen Wert weiterhin nutzen, um innerhalb der Zellen zu zeichnen.

Indem wir diese beiden Werte kombinieren – den Vorkomma- und den Nachkommateil der Koordinate – können wir Ordnung und Chaos zusammenbringen.

Schau Dir einmal die GLSL-Portierung des berühmten Labyrinth-Generators in BASIC an, der dort nur aus einer einzigen Programmierzeile besteht: ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10```

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

Hier nutze ich die Zufallswerte der Zellen, um innerhalb der Zellen eine Linie mal in die eine, mal in die andere Richtung zu zeichnen. Ich setze dafür die ```truchetPattern()```-Funktion aus dem vorangehenden Kapitel ein (es geht um die *Programmzeilen 41 bis 47*).

Du erhältst ein sehenswertes animiertes Muster, wenn Du die Kommentarzeichen aus den *Programmzeilen 35 und 36* entfernst.

## Meister des Zufalls

[Ryoji Ikeda](http://www.ryojiikeda.com/), ein japanischer Komponist elektronischer Musik und Grafikkünstler, ist ein Meister des Zufälligen. Es fällt schwer, von seinen Arbeiten nicht berührt zu werden. Der Einsatz des Zufalls in seinen Werken ist so gestaltet, dass nicht verwirrendes Chaos, sondern ein Abbild der Komplexität unserer technischen Kultur entsteht.

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Schau Dir die Arbeiten von [Ikeda](http://www.ryojiikeda.com/) an und versuche Dich an den folgenden Aufgaben:

* Erzeuge Zeilen sich gegenläufig bewegender Zellen mit Farben aus Zufallswerten. Stelle nur die Zellen mit helleren Werten dar. Lasse sich die Geschwindigkeit der Bewegung im Laufe der Zeit verändern.

<a href="../edit.php#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* Erzeuge auf ganz ähnliche Weise mehrere Zeilen, von denen sich jede mit unterschiedlicher Geschwindigkeit und Richtung seitwärts bewegt. Verknüpfe die Mausposition mit dem Schwellenwert für die Anzeige der Zellen aufgrund ihrer Helligkeit.

<a href="../edit.php#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Erzeuge weitere interessante Effekte, bei denen der Zufall eine Rolle spielt.

<a href="../edit.php#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

Zufallswerte auf ästhetische Art und Weise einzusetzen, kann schwierig sein, besonders wenn man Simulationen erstellen möchten, die die Natur nachahmen. Zufall ist einfach zu chaotisch und nur sehr wenige Dinge ums uns herum entstehen wirklich komplett zufällig. Wenn Du Dir beispielsweise das Muster von Regentropfen oder den Verlauf eines Aktienkurses anschaust – zwei Vorgänge, die Beide sicherlich eine Menge mit Zufall zu tun haben – wirst Du eben doch kein Chaos, sondern komplexe Strukturen und Abhängigkeiten erkennen. Schließlich sind hier jenseits des Zufälligen immer auch systemabhängige Korrelationen und ein Bezug auf vorherige Systemzustände am Werk.

Das nächste Kapitel beschäftigt sich deshalb mit Rauschen, dem sanften und der Natur nachempfunden Weg, um Dinge dynamisch und innerhalb des Chaotischen auch ein wenig strukturiert wirken zu lassen.
