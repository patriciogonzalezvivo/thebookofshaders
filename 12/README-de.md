![](dragonfly.jpg)

## Zelluläres Rauschen

Im Jahre 1996, 16 Jahre nach Veröffentlichung von Perlins ursprünglichem Noise-Algorithmus und fünf Jahre vor der Erfindung des Simplex Noise-Algorithmus, schrieb Steven Worley einen Artikel mit dem Titel [„Eine Basisfunktion für zelluläre Texturen“](http://www.rhythmiccanvas.com/research/papers/worley.pdf). Darin beschreibt er eine Technik zur prozeduralen Texturierung von Flächen, die heute im Bereich der Computergrafik nicht mehr wegzudenken ist.

Um das Prinzip hinter diesem Verfahren zu verstehen, müssen wir die Abläufe aus dem Blickwinkel von **Iterationen** betrachten. Als Programmierer kannst Du Dir vielleicht denken, was das bedeutet: Ja, genau, es geht um Schleifen und um den Einsatz des ```for```-Befehls.  Allerdings gibt es da einen wichtigen Aspekt in GLSL: Die Anzahl der Schleifendurchläufe muss durch eine Konstante (```const```) vorgegeben sein. Sie ist also nicht dynamisch, sondern steht grundsätzlich von vornherein fest.

Lass uns dazu am besten ein Beispiel anschauen.

### Punkte für ein Distanzfeld

Zelluläres Rauschen basiert auf Distanzfeldern, konkret auf der Berechnung der Entfernung zum nächstgelegenen Bezugspunkt aus einer gegebenen Menge von Punkten. Lass uns annehmen, wir wollten ein Distanzfeld aus vier Punkten erzeugen. Was benötigen wir dafür? Nun, **für jeden zu berechnenden Bildpunkt auf unserer Zeichenfläche wollen wir die Entfernung zum nächstgelegenen der vier Bezugspunkte berechnen **. Das bedeutet, dass wir alle vier Bezugspunkte durchlaufen, ihre Entfernung zum aktuell bearbeiteten Pixel berechnen und uns die kleinste dieser Entfernungen merken müssen.

```glsl
    float min_dist = 100.; // speichert die kleineste Entf. zu einem der 4 Bezugspunkte

    min_dist = min(min_dist, distance(st, point_a));
    min_dist = min(min_dist, distance(st, point_b));
    min_dist = min(min_dist, distance(st, point_c));
    min_dist = min(min_dist, distance(st, point_d));
```

![](cell-00.png)

Diese Lösung ist natürlich nicht besonders elegant, aber sie erfüllt ihren Zweck. Lass uns das Ganze nun mit Hilfe eines Arrays und einer ```for```-Schleife realisieren.

```glsl
    float m_dist = 100.;  // speichert die minimale Entfernung
    for (int i = 0; i < TOTAL_POINTS; i++) {
        float dist = distance(st, points[i]);
        m_dist = min(m_dist, dist);
    }
```

Beachte, wie wir hier die ```for```-Schleife einsetzen, um ein Array mit Bezugspunkten zu durchlaufen, und die bislang kleinste Entfernung mit Hilfe der [```min()```](../glossary/?search=min)-Funktion festhalten. Hier folgt eine vollständige Umsetzung dieses Ansatzes in GLSL.

<div class="codeAndCanvas" data="cellnoise-00.frag"></div>

In dem obigen Shader wird einer der Bezugspunkte des Distanzfelds auf die Mausposition über der Zeichenfläche gesetzt. Fahre mit der Maus über die Fläche und spiele ein wenig damit herum. So bekommst Du am besten eine Vorstellung davon, wie der Code funktioniert. Probiere anschließend folgendes aus:

- Gelingt es Dir, die Position der anderen Bezugspunkte zu animieren?
- Nachdem Du [das Kapitel über Formen](../07/?lan=de) ja vermutlich bereits gelesen hast, stelle Dir einen interessanten Weg vor, was man mit dem vorliegenden Distanzfeld anstellen könnte.
- Was muss man tun, um das Distanzfeld um weitere Bezugspunkte zu erweitern? Wie können wir dynamisch einzelne Bezugspunkte hinzufügen oder entfernen?

### Kachelung und Wiederholung

Vielleicht ist Dir schon klargeworden, dass ```for``` Schleifen und *Arrays* nicht die besten Freunde von GLSL sind. Wie schon gesagt: Schleifen in GLSL akzeptieren keine variablen Limite für die Anzahl der Durchläufe. Außerdem verlangsamen vielfache Schleifendurchläufe die Ausführung Deiner Shader spürbar, da Schleifen nicht vorzeitig beendet werden können. Das hat zur Folge, dass dieser Ansatz für Distanzfelder mit einer Vielzahl von Bezugspunkten untauglich ist. Wir müssen einen anderen Weg wählen, einen, der einen Vorteil aus der Parallelverarbeitung der GPU zieht.

![](cell-01.png)

Ein Ansatz, um sich dieser Herausforderung zu stellen, ist die Unterteilung der Zeichenfläche in einzelne Kacheln bzw. Zellen. Nicht jeder Pixel muss die Entfernung zu allen Punkten des Distanzfeldes überprüfen. Manche sind auf jeden Fall zu weit entfernt, um ein Minima zu liefern. Dies gilt beispielsweise für alle Zellen, die nicht direkt an die aktuelle Zelle angrenzen.

Weil die Farbe für jeden Pixel in einem eigenen Thread berechnet wird, können wir die Zeichenfläche in einzelne Zellen unterteilen - jede mit einem Bezugspunkt.

Um Anomalien an den Schnittflächen zwischen den Zellen zu vermeiden, müssen wir jeweils die Entfernung zum Bezugspunkt der benachbarten Zellen überprüfen. Das ist im Wesentlichen die brillante Idee hinter dem [Ansatz von Steven Worley](http://www.rhythmiccanvas.com/research/papers/worley.pdf).

Letztendlich muss jeder Pixel nur die Entfernung zu neun Bezugspunkten berechnen: Dem seiner eigenen Zelle und jene der acht umliegenden Zellen. Alle anderen Zellen sind zu weit entfernt.

Wir haben bereits in den Kapiteln über [Muster](../09/?lan=de), [Generative Designs](../10/?lan=de) und [Rauschen](../11/?lan=de) gesehen, wie man die Zeichenfläche in einzelne Zellen unterteilt, von daher bist Du mit diesem Prinzip wahrscheinlich schon vertraut.

```glsl
    // den Raum aufblaehen ...
    st *= 3.;

    // ... und in Zellen unterteilen
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
```

Also, wie lautet der Plan? Wir werden die Koordinate der Kachel/Zelle (die in dem Integer-Vektor ```i_st``` gespeichert ist) nutzen, um einen zufälligen Punkt zu erzeugen. Wir setzen dafür die ```random2f```-Funktion ein, die einen ```vec2``` als Parameter erhält und einen ```vec2``` mit einer Zufallsposition zurückliefert. So erhalten wir für jede Zelle einen Bezugspunkt mit einer zufälligen Position innerhalb der Zelle.

```glsl
    vec2 point = random2(i_st);
```

Der jeweils zu zeichnende Bildpunkt innerhalb der Zelle (gespeichert in dem Fließkommavektor ```f_st```) wird seine Entfernung zu diesem zufällig gewählten Bezugspunkt berechnen.

```glsl
    vec2 diff = point - f_st;
    float dist = length(diff);
```

Das Ergebnis sieht dann wie folgt aus:

<a href="../edit.php#12/cellnoise-01.frag"><img src="cellnoise.png"  width="520px" height="200px"></img></a>

Aber wir wollen ja zusätzlich noch die Entfernung zu den Bezugspunkten in den umliegenden Zellen einbeziehen. Dafür müssen wir diese Zellen **durchlaufen**. Aber nicht alle, sondern nur die unmittelbar angrenzenden. Das heißt die Zellen mit den Abständen von ```-1``` (links) bis ```1``` (rechts) entlang der ```x```-Achse, sowie die Zellen mit den Abständen von ```-1``` (unten) bis ```1``` (oben) entlang der ```y```-Achse. Dieser Bereich von 3x3 Zellen lässt sich leicht mit Hilfe einer doppelten ```for```-Schleife abarbeiten, so wie im Folgenden gezeigt:

```glsl
for (int y= -1; y <= 1; y++) {
    for (int x= -1; x <= 1; x++) {
        // benachbarte Zelle innerhalb des Rasters
        vec2 neighbor = vec2(float(x),float(y));
        ...
    }
}
```

![](cell-02.png)

Nun können wir die Bezugspunkte aus jeder der benachbarten Zellen in unserer doppelten ```for```-Schleife berechnen, indem wir den Versatz aus der Variablen ```neighbour``` zu den Koordinaten der aktuellen Zelle addieren.

```glsl
        ...
        // Zufallsposition von der aktuellen + der benachbarten Zelle im Raster
        vec2 point = random2(i_st + neighbor);
        ...
```

Dann bleibt nur noch, die Entfernung vom aktuell zu zeichnenden Punkt zu dem jeweiligen Bezugspunkt zu berechnen und die geringste Entfernung in der Variablen ```m_dist``` (für „minimale Distanz“) zu speichern.

```glsl
        ...
        vec2 diff = neighbor + point - f_st;

        // Entfernung zu diesem Punkt
        float dist = length(diff);

        // die kleinste Entfernung speichern
        m_dist = min(m_dist, dist);
        ...
```

Der obige Programmcode wurde durch einen [Artikel von Inigo Quilez](http://www.iquilezles.org/www/articles/smoothvoronoi/smoothvoronoi.htm) inspiriert. Dort schreibt er:

„... es ist vielleicht interessant darauf hinzuweisen, dass in dem obigen Code ein netter Trick steckt. Die meisten Implementationen dieses Algorithmus leiden unter einer schlechten Präzision der Berechnungen, weil sie die zufälligen Bezugspunkte auf den gesamten Koordinatenraum beziehen, so dass die Koordinaten sehr weit vom Ursprung entfernt sind. Man kann dagegen ansteuern, indem man Variablentypen mit besonders hoher Genauigkeit verwendet, was sich jedoch negativ auf die Geschwindigkeit der Berechnungen auswirkt. Oder man macht es etwas cleverer, indem man die Koordinaten nicht auf den gesamten Koordinatenraum bezieht, sondern auf die Ebene der einzelnen Zellen: Sobald der ganzzahlige Teil und der Nachkommateil des zu zeichnenden Punktes berechnet sind und dadurch die Zelle feststeht, in der sich der Punkt befindet, beschäftigen wir uns nur noch damit, was um diese Zelle herum geschieht. Dadurch müssen wir uns nicht mehr um den ganzzahligen Teil der Koordinaten kümmern, wodurch man viele Bits bei den weiteren Berechnungen einspart. Tatsächlich steuern bei herkömmlichen Voronoi-Implementierungen die ganzzahligen Anteile der Punktkoordinaten ebenfalls dem Wert 0 entgegen, sobald die zufälligen Bezugspunkte der Zellen vom aktuell zu zeichnenden Punkt abgezogen werden. In der obigen Implementation lassen wir es gar nicht erst so weit kommen, weil wir alle Koordinatenberechnungen auf den Raum der Zellen beziehen. Mit diesem Trick kann man sogar einen ganzen Planeten mit derartig geformten Voronoi-Zellen überziehen, indem man die Punktkoordinaten einfach in doppelter Fließkommagenauigkeit darstellt, die Berechnungen von ```floor()``` und ```fract()``` durchführt, und dann mit einfacher Fließkommagenauigkeit fortfährt. So erspart man sich den (Zeit-) Aufwand, die gesamte Berechnung mit doppelter Fließkommagenauigkeit auszuführen. Natürlich kann man diesen Trick auch auf Perlins Noise-Algorithmus anwenden (allerdings habe ich noch nie ein solche Implementation gesehen). “

Um es noch einmal zusammenzufassen: Wir unterteilen den Raum in einzelne Zellen. Für jeden zu zeichnenden Punkt berechnen wir die kleinste Entfernung zum Bezugspunkt seiner Zelle bzw. zu den Bezugspunkten der acht umliegenden Zellen. Als Ergebnis erhalten wir ein Distanzfeld, so wie in dem folgenden Beispiel:

<div class="codeAndCanvas" data="cellnoise-02.frag"></div>

Experimentiere damit, indem Du:

- den Raum in mehr Zellen aufteilst.
- Dir andere Möglichkeiten ausdenkst, um die Bezugspunkte zu animieren.
- einen der Bezugspunkte durch die aktuelle Mausposition ersetzt.
- über andere Wege nachdenkst, um das Distanzfeld zu berechnen, abseits von ```m_dist = min(m_dist, dist);```.
- untersuchst, welche anderen interessanten Muster sich über dieses Distanzfeld erzeugen lassen.

Man kann diesen Algorithmus nicht nur aus der Perspektive der jeweils zu zeichnenden Pixel betrachten, sondern auch aus Sicht der Bezugspunkte. In diesem Fall lässt sich der Algorithmus so beschreiben: Jeder Bezugspunkt wächst aus seiner Mitte heraus, bis er an die Grenzen eines anderen wachsenden Bezugspunktes stößt. Das spiegelt das Wachstum biologischer Zellen in der Natur wieder. Lebendige Organismen werden von dieser Spannung zwischen dem inneren Antrieb zum Wachstum und äußeren Begrenzungen geformt. Der klassische Algorithmus, der dieses Verhalten nachahmt, ist nach [Georgi Feodosjewitsch Woronoi, engl „Georgy Voronoi“](https://de.wikipedia.org/wiki/Voronoi-Diagramm) benannt.

![](monokot_root.jpg)

### Der Voronoi-Algorithmus

Die Erzeugung von Voronoi-Diagrammen auf Basis von zellulärem Rauschen ist weniger kompliziert, als es vielleicht erscheint. Wir müssen nur zusätzliche Informationen über den Bezugspunkt *festhalten*, der dem zu zeichnenden Punkt am nächsten liegt. Dafür verwenden wir eine Variable vom Typ ```vec2``` mit dem Namen ```m_point```. Darin speichern wir den Vektor zum nächstgelegenen Bezugspunkt und nicht einfach nur dessen Entfernung. So behalten wir ein eindeutiges Identifikationsmerkmal für diesen Punkt.

```glsl
    ...
    if( dist < m_dist ) {
        m_dist = dist;
        m_point = point;
    }
    ...
```

Bitte beachte, dass wir in dem folgenden Programmcode die geringste Entfernung nicht mehr mit Hilfe der ```min```-Funktion berechnen, sondern einen herkömmlichen ```if```-Befehl einsetzen. Warum wir das tun? Weil wir diesmal etwas mehr unternehmen wollen, sobald ein neuer näherliegender Punkt auftaucht, nämlich seine Position speichern (*Programmzeilen 32 bis 37*).

<div class="codeAndCanvas" data="vorono-00.frag"></div>

Du wirst sehen, dass die Farbe der beweglichen Zelle (die dem Mauszeiger folgt) auf Basis ihrer Position wechselt. Die Ursache dafür ist, dass hier die Farbe aufgrund des Wertes (der Position) des nächstgelegenen Bezugspunktes zugewiesen wird.

Genau wie zuvor ist es nun an der Zeit, das Ganze zu erweitern, indem wir zu dem Algorithmus aus dem [Papier von Steven Worley](http://www.rhythmiccanvas.com/research/papers/worley.pdf) übergehen. Versuche doch einmal selbst, diesen Algorithmus zu implementieren. Du kannst dabei auf das folgende Beispiel zurückgreifen, indem Du darauf klickst.

Bitte beachte, dass der ursprüngliche Ansatz von Steven Worley eine variable Anzahl von Bezugspunkten für jede Zelle vorsieht. In seiner Implementation des Algorithmus in C nutzt er dies für einen zeitigen Abbruch der Schleife. Schleifen in GLSL erlauben jedoch keinen vorzeitigen Ausstieg oder eine variable Anzahl von Schleifendurchläufen, deshalb wirst Du vielleicht besser bei einem Bezugspunkt pro Zelle bleiben.

<a href="../edit.php#12/vorono-01.frag"><canvas id="custom" class="canvas" data-fragment-url="vorono-01.frag"  width="520px" height="200px"></canvas></a>

Sobald Du die Funktionsweise dieses Algorithmus verstanden hast, kannst Du über interessante und kreative Einsatzmöglichkeiten nachdenken.

![Extended Voronoi - Leo Solaas (2011)](solas.png)

![Cloud Cities - Tomás Saraceno (2011)](saraceno.jpg)

![Accretion Disc Series - Clint Fulkerson](accretion.jpg)

![Vonoroi Puzzle - Reza Ali (2015)](reza.png)

### Verbesserung des Voronoi-Algorithmus

Im Jahre 2011 hat [Stefan Gustavson eine Optimierung von Steven Worleys Algorithmus für GPUs](http://webstaff.itn.liu.se/~stegu/GLSL-cellular/GLSL-cellular-notes.pdf) vorgeschlagen, bei der nur noch eine 2x2 Matrix benachbarter Zellen untersucht wird, an Stelle der bisherigen 3x3 Matrix. Das reduziert den Rechenaufwand für jeden Punkt deutlich, kann aber zur Artefakten durch unsaubere Übergänge an den Grenzen der Zellen führen. Schau Dir die folgenden Beispiele an.


<div class="glslGallery" data="12/2d-cnoise-2x2,12/2d-cnoise-2x2x2,12/2d-cnoise,12/3d-cnoise" data-properties="clickRun:editor,openFrameIcon:false"></div>

Im Jahre 2012 präsentierte [Inigo Quilez einen interessanten Artikel über die Erzeugung präziser Voronoi-Abgrenzungen](http://www.iquilezles.org/www/articles/voronoilines/voronoilines.htm).

<a href="../edit.php#12/2d-voronoi.frag"><img src="2d-voronoi.gif"  width="520px" height="200px"></img></a>

Inigos Experimente zu diesem Thema hörten damit nicht auf. Im Jahr 2014 verfasste er einen schönen Beitrag über das, was er als [Voro-Noise, dt. „Voro-Rauschen“](http://www.iquilezles.org/www/articles/voronoise/voronoise.htm) bezeichnet - eine Funktion, die einen graduellen Übergang zwischen normalem Rauschen und Voronoi-Rauschen ermöglicht. Er schrieb:

„Abgesehen von ihrer Ähnlichkeit ist es entscheidend, dass das Raster aus Zellen in beiden Mustern unterschiedlich verwendet wird. Interpoliertes Rauschen mit Zufallswerten (wie bei Value-Noise) oder mit Gradienten (wie bei Gradient-Noise) unterscheidet sich von Voronoi, wo es auf die Entfernung zum nächstgelegenen Bezugspunkt ankommt. Schließlich sind die bilineare Interpolation und die Minima-Berechnung zwei ganz unterschiedliche Operationen, nicht wahr? Doch vielleicht kann man sie in einem größeren Rahmen vereinigen? Sollte das möglich sein, könnte man sowohl Rauschmuster als auch Voronoi-Muster als Spezialfälle eines allgemeineren rasterbasierten Mustergenerators betrachten.“

<a href="../edit.php#12/2d-voronoise.frag"><canvas id="custom" class="canvas" data-fragment-url="2d-voronoise.frag"  width="520px" height="200px"></canvas></a>

Nun ist die Zeit gekommen, dass Du Dir die Dinge genau anschaust, Dich von der Natur inspirieren lässt und Deine eigene Nutzungsmöglichkeiten dieser Techniken entdeckst!

![Deyrolle glass film - 1831](DeyrolleFilm.png)

<div class="glslGallery" data="12/metaballs,12/stippling,12/cell,12/tissue,12/cracks,160504143842" data-properties="clickRun:editor,openFrameIcon:false"></div>
