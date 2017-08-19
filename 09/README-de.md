## Muster

Weil Shader-Programme Bildpunkt für Bildpunkt ausgeführt werden, spielt es keine große Rolle, wie oft man ein bestimmtes Muster innerhalb der Zeichenfläche wiederholt – die Anzahl der Berechnungen bleibt gleich. Aus diesem Grund eignen sich Fragment-Shader ganz hervorragend für die Erzeugung sich wiederholender Kachelmuster.

[ ![Nina Warmerdam – Das IMPRINT Projekt (2013)](warmerdam.jpg) ](../edit.php#09/dots5.frag)

In diesem Kapitel werden wir anwenden, was wir bislang gelernt haben, und es über den gesamten Raum unserer Zeichenfläche wiederholen. Wie schon in den vorhergehenden Kapiteln wird unsere Strategie darin bestehen, die Koordinaten zu vervielfältigen. Dadurch werden sich Formen, die wir innerhalb des Koordinatenraumes zwischen ```0.0``` und ```1.0``` zeichnen, vervielfältigen lassen, so dass ein kontinuierliches Muster entlang eines Rasters entsteht.

*"Das Gitternetz eröffnet einen Rahmen, innerhalb dessen sich die menschliche Intuition und Schöpfungskraft entfalten kann. Inmitten des Chaos der Natur stellen Muster einen Kontrastpunkt dar, indem sie eine vorhersehbare, sich wiederholende Ordnung realisieren. Schon seit frühen Mustern auf Keramikflächen in antiken Bädern haben die Menschen Gitternetze genutzt, um ihr Leben durch repetitive Dekorationen zu verschönen.“* [*10 PRINT*, Mit Press, (2013)](http://10print.org/)

Lasst uns zunächst noch einmal die [```fract()```](../glossary/?search=fract)-Funktion ins Gedächtnis rufen. Sie liefert den Nachkommateil einer Zahl zurück, wodurch ```fract()``` effektiv den Modulo (Rest) einer Division durch 1 ergibt ([```mod(x,1.0)```](../glossary/?search=mod)). Unsere normalisierte Variable für das Koordinatensystem (```st```) bewegt sich ohnehin zwischen ```0.0``` und ```1.0```. Deshalb macht es wenig Sinn, Berechnungen wie die folgende anzustellen:

```glsl
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
    st = fract(st);
	color = vec3(st,0.0);
	gl_FragColor = vec4(color,1.0);
}
```

Wenn wir aber das Koordinatensystem hochskalieren – sagen wir einmal um den Faktor drei – erhalten wir drei interpolierende Sequenzen: die Erste mit Fließkommawerten von ```0``` bis ```1```, die Zweite mit Werten von ```1``` bis ```2``` und die Dritte mit Werten zwischen ```2``` und ```3```.

<div class="codeAndCanvas" data="grid-making.frag"></div>

Jetzt ist es an der Zeit, in jedem dieser Drei mal Drei „Unterräume“ zu zeichnen, indem Du die Kommentarzeichen in *Programmzeile 27* entfernst. (Weil wir die *x*- und *y*-Ordinate gleichermaßen skalieren, bleibt das Seitenverhältnis erhalten.)

Probiere einige der folgenden Übungen aus, um Dein Verständnis zu vertiefen:

* Multipliziere die Koordinaten (den Raum) mit anderen Faktoren. Probiere auch einmal nicht ganzzahlige Werte, sowie unterschiedliche Faktoren für *x* und *y* aus.

* Verwandle diesen „Muster-Trick“ in eine wiederverwendbare Funktion.

* Teile den Raum in drei Spalten und drei Zeilen auf. Finde einen Weg, wie Dein Programmcode erkennen kann, an welcher Zeile und Spalte er gerade arbeitet und nutze dies, um die gezeichneten Formen zu variieren. Versuche, ein Tick-Tack-Toe-Spielfeld nachzuempfinden.

### Anwendung von Matrizen innerhalb von Mustern

Weil jeder „Unterraum“ und jede Gitterzelle eine verkleinerte Fassung des normalisierten Koordinatensystems darstellt, mit dem wir bereits gearbeitet haben, können wir auch Matrizenoperationen darauf anwenden. So lässt sich der Koordinatenraum innerhalb einer Gitterzelle verschieben, rotieren und auch skalieren.

<div class="codeAndCanvas" data="checks.frag"></div>

* Überlege Dir interessante Wege, um dieses Muster zu animieren. Denke z.B. an die Animation von Farbe, Form oder Bewegung. Erstelle drei unterschiedliche Animationen.

* Erzeuge komplexere Muster durch das Zusammenfügen unterschiedlicher Formen.

[![](diamondtiles-long.png)](../edit.php#09/diamondtiles.frag)

* Vereine unterschiedliche Schichten von Mustern, um Dein eigenes Karomuster entstehen zu lassen, wie es [für schottische Tartans typisch ist](http://de.wikipedia.org/wiki/Tartan_(Muster)).

[ ![Vektormuster eines schottischen Tartans von Kavalenkava](tartan.jpg) ](http://graphicriver.net/item/vector-pattern-scottish-tartan/6590076)

### Versetzte Muster

Sagen wir einmal, wir wollen ein Mauerwerk zeichnen. Beim Blick auf eine solche Wand fällt sofort auf, dass die Steine in jeder Reihe jeweils um eine halbe Steinlänge versetzt sind. Stellt sich natürlich die Frage, wie wir so etwas per Programmcode umsetzen können?

![](brick.jpg)

Im ersten Schritt müssen wir zunächst einmal wissen, ob die Zeile, an der unser Thread gerade arbeitet, gerade oder ungerade ist. Denn darüber können wir den Versatz der Muster entlang der *x-Achse* bestimmen. Dafür können wir [```mod()```](../glossary/?search=mod) mit ```2.0``` verwenden und schauen, ob das Ergebnis weniger als ```1.0``` beträgt oder nicht. Wirf einen Blick auf die folgende Formel und entferne nacheinander die Kommentarzeichen in den letzten beiden Zeilen.

<div class="simpleFunction" data="y = mod(x,2.0);
// y = mod(x,2.0) < 1.0 ? 0. : 1. ;
// y = step(1.0,mod(x,2.0));"></div>

Wie Du siehst, können wir den [ternären Operator](http://de.wikipedia.org/wiki/Bedingte_Anweisung_und_Verzweigung#Auswahloperator) nutzen, um zu prüfen, ob das Ergebnis von [```mod()```](../glossary/?search=mod) mit ```2.0``` unter dem Wert von ```1.0``` liegt. Oder wir können die [```step()```](../glossary/?search=step)-Funktion nutzen, um das gleiche Ergebnis zu erzielen. Und ```step()``` ist in der konkreten Ausführung sogar noch etwas schneller. Doch wie kommt das? Obwohl es schwer vorhersehbar ist, wie eine bestimmte Grafikkarte Shader-Code kompiliert und optimiert, können wir davon ausgehen, dass eingebaute Funktionen schneller ausgeführt werden, also solche, die erst in mehrere Einzelschritte aufgelöst werden müssen. Wann immer Du eine eingebaute Funktion für Deine Zwecke nutzen kannst, tue dies deshalb auch!

Nun haben wir also unsere „Ungerade-Funktion“ beisammen, sodass wir den ungeraden Reihen unseres Mauerwerks einen Versatz geben können. In der *Programmzeile 14* des folgenden Listings befindet sich der entsprechende Programmcode. Beachte, dass das Ergebnis unserer Berechnung für gerade Reihen ```0.0``` lautet und die Multiplikation mit dem Versatz von ```0.5``` dann eben auch ```0.0``` ergibt. Bei ungeraden Reihen multiplizieren wir den Versatz von ```0.5``` hingegen mit ```1.0```, so dass daraus eine entsprechende Verschiebung der *x-Achse* des Koordinatensystems folgt.

Entferne jetzt die Kommentarzeichen in der *Programmzeile 32*, wodurch das Seitenverhältnis unseres Koordinatensystems gestreckt wird und wir die Anmutung eines modernen Mauerwerks erhalten. Wenn Du die Kommentarzeichen in *Programmzeile 40* entfernst, erkennst Du die Anordnung und Wiederholung des Koordinatensystems anhand der Farben Rot und Grün.

<div class="codeAndCanvas" data="bricks.frag"></div>

* Versuche diese Grafik zu animieren, indem Du den Versatz auf Basis der Zeit veränderst.

* Baue eine weitere Animation, bei der sich die geraden Reihen nach links und die ungeraden Reihen nach rechts bewegen.

* Gelingt es Dir, diesen Effekt auch in Bezug auf die Spalten zu wiederholen?

* Versuche einen Versatz entlang der *x-Achse* mit einem entlang der *y-Achse* zu kombinieren, um so etwas wie die folgende Animation zu erhalten:

<a href="../edit.php#09/marching_dots.frag"><canvas id="custom" class="canvas" data-fragment-url="marching_dots.frag"  width="520px" height="200px"></canvas></a>

## Truchet-Kacheln

Wir haben nun gelernt, wie man feststellt, ob sich die zu zeichnende Gitterzelle in einer geraden oder ungeraden Zeile bzw. Spalte befindet, Auf Basis dieser Information können wir ein einzelnes Designelement in Abhängigkeit seiner Position wiederverwenden. Wirf einen Blick auf die sogenannten [Truchet-Kacheln](http://en.wikipedia.org/wiki/Truchet_tiles), bei denen eine einzelne Form in vier unterschiedlichen Anordnungen dargestellt wird:

![](truchet-00.png)

Indem wir die Anordnung des Musters von Kachel zu Kachel variieren, können wir eine unendliche Menge von Designs erzeugen.

![](truchet-01.png)

Schaue Die die Funktion ```rotateTilePattern()``` genau an. Sie unterteilt den Raum jeweils in vier Zellen und dreht jede davon in eine unterschiedliche Richtung.

<div class="codeAndCanvas" data="truchet.frag"></div>

* Kommentiere die *Programmzeilen 69 bis 72*, entferne die Kommentare wieder und vervielfältige diese Zeilen, um neue Designs entstehen zu lassen.

* Ersetze das Schwarzweiß-Dreieck durch andere Formen, beispielsweise Halbkreise, gedrehte Quadrate oder Linien.

* Kodiere andere Muster, bei denen die Elemente in Abhängigkeit ihrer Position unterschiedlich gedreht werden.

* Entwickle ein Muster, das weitere Merkmale in Abhängigkeit der Elementposition verändert.

* Denke an andere Darstellungen, die nicht notwendigerweise Muster verkörpern müssen, aber die Konzepte aus diesem Abschnitt aufgreifen, beispielsweise an das [chinesische I-Ging](http://de.wikipedia.org/wiki/I_Ging).

<a href="../edit.php#09/iching-01.frag"><canvas id="custom" class="canvas" data-fragment-url="iching-01.frag"  width="520px" height="200px"></canvas></a>

## Erschaffe Deine eigenen Regeln

Prozedurale, sich wiederholende Muster zu kreieren, ist eine interessante Übung für den Geist. Es geht darum, den minimalen Satz an Elementen zu finden, die sich wiederholen müssen, um ein größeres komplexes Ganzes zu erschaffen. Diese Vorgehensweise ist sehr alt. Die Menschheit benutzt Muster und Gitternetze schon seit tausenden von Jahren, um Wände und Böden, Textilien und andere Objekte zu verzieren. Angefangen von mäandernden Mustern im alten Griechenland bis hin zu chinesischen Gitterfenstern, ist es immer wieder das Spiel aus Wiederholung bei gleichzeitiger Variation, die unsere Fantasie anregt. Nimm Dir ein wenig Zeit, um diese Art von [Dekorationen](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) und [Mustern](https://www.pinterest.com/patriciogonzv/paterns/) zu studieren. Von geometrischen Mustern aus Arabien bis hin zu prachtvollen Stoffmustern aus dem afrikanischem Kulturkreis eröffnet sich Dir ein ganzes Universum an Mustern, von denen Du lernen kannst.

![Franz Sales Meyer – Handbuch der Ornamentik (1920)](geometricpatters.png)

Mit diesem Kapitel enden die Abschnitte zum algorithmischen Zeichnen. In den folgenden Kapiteln werden wir sehen, wie man ein wenig mehr Zufall in unsere Shader bringt, um die Natur nachzuempfinden.
