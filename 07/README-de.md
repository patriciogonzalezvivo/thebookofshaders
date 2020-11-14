![Alice Hubbard, Providence, USA, ca. 1892. Foto: Zindman/Freemont.](froebel.jpg)

## Formen

Endlich! Auf diesen Moment haben wir in den vorangegangenen Kapiteln hingearbeitet! Du hast die wichtigsten Grundlagen von GLSL, seine Datentypen und Funktionen kennengelernt. Und du hast mit formgebenden Funktionen gearbeitet. Jetzt ist es an der Zeit, all dieses Wissen zusammenzuführen. Bist Du bereit? In diesem Kapitel wirst Du lernen, wie man grundlegende geometrische Formen auf parallele, prozedurale Weise erstellt.

### Rechtecke

Stell dir vor, Du hast ein Millimeterpapier vor Dir, wie man es zuweilen im Mathematikunterricht nutzt. Und Deine Aufgabe ist es, darauf ein ausgefülltes Quadrat zu zeichnen. Die Größe des Papieres beträgt *10 x 10* und das Quadrat soll *8 x 8* sein. Wie gehst Du vor?

![](grid_paper.jpg)

Vielleicht würdest Du einfach die gesamte Fläche ausfüllen und dabei nur die erste und die letzte Zeile auslassen, ebenso wie die erste und die letzte Spalte. So käme das gewünschte Quadrat sehr einfach zustande.

Wie hängt das nun mit Shadern zusammen? Jedes kleine Quadrat auf unserem Millimeterpapier können wir uns als ein Pixel, d.h. einen parallel ausgeführten *Thread*, vorstellen. Und jedes dieser Quadrate (*jeder Thread*) kennt seine Koordinate, wie bei einem Schachbrett. In den vorangegangenen Kapiteln haben wir die *x-* und die *y-Ordinate* jeweils auf den *roten* und *grünen* Farbkanal des Punktes abgebildet. Wir haben gelernt, wie wir den schmalen zweidimensionalen Bereich zwischen ```0.0``` und ```1.0``` bearbeiten. Wie können wir dieses Wissen nun anwenden, um in der Mitte unserer Zeichenfläche ein zentriertes weißes Quadrat zu malen?

Lass uns mit etwas Pseudocode beginnen, der mit ```if```-Befehlen auf die Lage des zu bearbeitenden Pixels innerhalb der Zeichenfläche eingeht. Das Vorgehen ähnelt dabei in bemerkenswerte Weise dem oben skizzierten beim Malen auf Millimeterpapier.

```glsl
    if ( (X GROESSER ALS 1) UND (Y GROESSER ALS 1) )
        male weiss
    else
        male schwarz
```

Jetzt, wo wir eine Idee haben, wie die Lösung aussehen könnte, lass uns den ```if```-Befehl durch einen Aufruf der [```step()```](../glossary/?search=step)-Funktion ersetzen, und anstelle der Maße *10 x 10* normalisierte Werte zwischen ```0.0``` und ```1.0``` bearbeiten:

```glsl
uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // diese Berechnungen liefern jeweils 1.0 (weiss) oder 0.0 (schwarz).
    float left = step(0.1,st.x);   // entspricht X groesser als 0.1
    float bottom = step(0.1,st.y); // entspricht Y groesser als 0.1

    // die Multiplikation von left*bottom entspricht der logischen Verknüpfung durch UND
    color = vec3( left * bottom );

    gl_FragColor = vec4(color,1.0);
}
```

Die [```step()```](../glossary/?search=step)-Funktion setzt jedes Pixel unterhalb von ```0.1``` auf Schwarz (```vec3(0.0)```) und alle anderen auf Weiß (```vec3(1.0)```). Die Multiplikation von ```left``` und ```bottom``` arbeitet wie eine logische *UND-Verknüpfung*, weil nur dann nicht ```0.0```, sondern ```1.0``` herauskommt, wenn beide Variablen auf ```1.0``` stehen. So entstehen zwei schwarze Linien, eine am linken und eine am unteren Rand der Zeichenfläche. Der Rest wird weiß.

![](rect-01.jpg)

Im obigen Programmcode wiederholen wir die gleiche Vorgehensweise für beide Ränder (links und unten). Wir können das noch etwas kompakter formulieren, indem wir in einem Aufruf zwei Testwerte in Form eines zweidimensionalen Vektors an [```step()```](../glossary/?search=step) übergeben. Das sieht dann so aus:

```glsl
    vec2 borders = step(vec2(0.1),st);
    float pct = borders.x * borders.y;
```

Bis jetzt haben wir nur zwei Kanten unseres Rechtecks bearbeitet. Jetzt kommen auch die beiden anderen Kanten – die rechte und die obere – an die Reihe. Schau Dir den folgenden Programmcode an:

<div class="codeAndCanvas" data="rect-making.frag"></div>

Entferne die Kommentarzeichen aus den *Zeilen 21-22* und beobachte, wie wir die Koordinaten auf den linken und unteren Rand abbilden (```1-st```), damit wir sie wieder mit der [```step()```](../glossary/?search=step) Funktion und dem Wert von ```0.1``` vergleichen können. Aus der oberen rechten Ecke (```vec2(1.0,1.0)```) wird so für unsere Berechnungen quasi die untere linke Ecke ```vec2(0.0,0.0)```. Das ist so, als würden wir die Zeichenfläche einfach um 180 Grad drehen und den Test dann wie zuvor wiederholen.

![](rect-02.jpg)

Beachte außerdem, dass in den *Zeilen 18 und 22* die Ergebnisse von ```step()``` in Bezug auf alle vier Seiten miteinander multipliziert werden. Dies entspricht wiederum eine logischen *UND*-Verknüpfung, denn wir erhalten nur dann *Weiß* (```1.0```), wenn keines der Ergebnisse *Schwarz* (```0.0```) ist. Wir könnten auch schreiben:

```glsl
    vec2 bl = step(vec2(0.1),st);       // linke und untere Kante
    vec2 tr = step(vec2(0.1),1.0-st);   // rechte und obere Kante
    color = vec3(bl.x * bl.y * tr.x * tr.y);  //UND-Verknuepfung
```

Interessant, nicht wahr? Wir nutzen für diese Technik also [```step()```](../glossary/?search=step) zum Vergleichen, eine Subtraktion für die Drehung der Koordinaten und die Multiplikation als logische *UND*-Verknüpfung.

Bevor wir weitermachen, probiere bitte die folgenden Übungen aus:

* Ändere die Größe und die Proportionen des Rechtecks.

* Experimentiere mit dem Ersetzen von [```step()```](../glossary/?search=step) durch [```smoothstep()```](../glossary/?search=smoothstep). Versuche, dadurch von harten Kanten zu weichen Kanten mit eleganten Übergängen zu gelangen.

* Baue den Code so um, dass er [```floor()```](../glossary/?search=floor) verwendet.

* Nimm die Implementierung, die Dir am besten gefällt, und baue daraus eine Funktion, die Du in Zukunft zum Zeichnen von Rechtecken und Quadraten verwenden kannst. Gestalte diese Funktion möglichst effizient.

* Entwickle eine andere Funktion, die kein ausgefülltes Rechteck zeichnet, sondern nur die Umrisse, d.h. die vier Kanten.

* Überlege Dir, wie Du die Rechtecke verschieben und mehrere davon auf der Zeichenfläche platzieren kannst. Falls Dir das gelingt, unterstreiche Deine Fähigkeiten, indem Du eine Komposition in der Art von [Piet Mondrian](http://de.wikipedia.org/wiki/Piet_Mondrian) erstellst.

![Piet Mondrian - Tableau (1921)](mondrian.jpg)

### Kreise

Es ist nicht schwer, Quadrate auf Millimeterpapier zu zeichnen und Rechtecke mit Hilfe kartesischer Koordinaten zu konstruieren. Kreise verlangen jedoch einen anderen Ansatz, zumal wie hier einen Pixel-orientierten Algorithmus benötigen. Eine Lösung besteht darin, die Koordinaten zu transformieren, damit wir beim Zeichnen die [```step()```](../glossary/?search=step)-Funktion nutzen können.

Doch wie soll das funktionieren? Lasse uns noch einmal zum Mathematikunterricht und dem Millimeterpapier zurückkehren. In der Schule haben die meisten von uns vermutlich gelernt, wie man mit dem Zirkel einen Kreis malt: Über das Drehrad stellt man zunächst den gewünschten Radius ein, platziert den Zirkel im Mittelpunkt des zu zeichnenden Kreises und schwingt das Zeichengerät anschließend mit einer eleganten Drehung über das Papier.

![](compass.jpg)

Will man diese Vorgehensweise auf ein Shader-Programm übertragen, bei dem jedes kleine Feld auf dem Millimeterpapier einem Pixel entspricht, muss man jedes Pixel (bzw. Thread) *fragen*, ob es zum Kreis gehört. Das machen wir, indem wir die Entfernung des Pixels zum Mittelpunkt des gewünschten Kreises berechnen.

![](circle.jpg)

Tatsächlich gibt es in GLSL mehrere Wege, diese Entfernung zu bestimmen. Die einfachste Möglichkeit greift auf die [```distance()```](../glossary/?search=distance)-Funktion zurück, die intern den Abstand (die Länge) [```length()```](../glossary/?search=length) zwischen zwei Punkten berechnet. In unserem Fall werden diese beiden Punkte durch die aktuelle Pixel-Koordinate sowie die Mitte der Zeichenfläche verkörpert, die hier den Kreismittelpunkt bilden soll. Die ```length()```-Funktion ist nichts anderes als eine Umsetzung der [Hypothenuse-Formel](http://de.wikipedia.org/wiki/Rechtwinkliges_Dreieck), die intern die Quadratwurzel ([```sqrt()```](../glossary/?search=sqrt)) berechnet.

![](hypotenuse.png)

Man kann wahlweise die [```distance()```](../glossary/?search=distance)-Funktion, die [```length()```](../glossary/?search=length)-Funktion oder die [```sqrt()```](../glossary/?search=sqrt)-Funktion nutzen, um die Entfernung zur Mitte der Zeichenfläche zu berechnen. Der folgende Programmcode enthält alle drei Möglichkeiten und liefert erwartungsgemäß jeweils das gleiche Ergebnis zurück.

* Kommentiere die einzelnen Zeilen aus bzw. ein, um Dir die verschiedenen Wege anzuschauen.

<div class="codeAndCanvas" data="circle-making.frag"></div>

In dem obigen Beispiel bilden wir die Entfernung zum Mittelpunkt der Zeichenfläche auf die Helligkeit der Pixel ab. Je näher sich ein Pixel beim Mittelpunkt befindet, desto geringer (dunkler) ist sein Farbwert. Beachte bitte, dass die Pixel auch zum Rand hin nicht allzu hell werden, weil die Entfernung vom Mittelpunkt ( ```vec2(0.5, 0.5)``` ) zu den Rändern maximal ```0.5``` beträgt. Denke ein wenig über die Abbildung nach und überlege Dir:

* Was kannst Du daraus ableiten?

* Wie kannst Du all dies nutzen, um einen Kreis zu malen?

* Verändere des obige Beispiel, damit der Farbverlauf ausschließlich innerhalb der Grenzen des Kreises stattfindet.

### Distanzfelder

Man kann sich das obige Beispiel auch als eine Art Höhenprofil vorstellen, bei dem dunklere Stellen für größere Höhen stehen. Der Farbverlauf repräsentiert dann so etwas wie einen Kegel. Stell Dir vor, Du stehst auf der Spitze des Kegels. Die horizontale Entfernung zum Kegelrand beträgt in alle Richtungen jeweils ```0.5```. Indem Du den Kegel an einer gewählten Stelle abschneidest, erhältst Du je nachdem eine größere oder eine kleinere Kreisfläche.

![](distance-field.jpg)

Im Prinzip nutzen wir also eine Neuinterpretation des Raumes (ausgehend vom Abstand zur Mitte), um eine bestimmte Form zu kreieren. Diese Technik ist als „Distanzfeld“ bekannt und wird bei der Erstellung von 3D-Grafiken auf vielfältige Weise genutzt.

Versuche Dich doch einmal an folgenden Übungen:

* Nutze die [```step()```](../glossary/?search=step)-Funktion, um alle Punkte größer als ```0.5``` weiß zu malen und alles darunter schwarz.

* Invertiere die Farben von Vordergrund und Hintergrund.

* Setze [```smoothstep()```](../glossary/?search=smoothstep) ein und experimentiere mit verschiedenen Grenzwerten, um angenehm sanfte Übergänge am Rand Deines Kreises zu erzeugen.

* Sobald Dir die Implementierung gefällt, baue daraus eine Funktion, die Du in zukünftigen Projekten einsetzen kannst.

* Fülle den Kreis mit einer Farbe.

* Kannst Du den Kreis animieren, so dass sein Umfang rhythmisch ansteigt und abschwillt, so wie bei einem schlagenden Herz? (Du kannst Dich dabei von der Animation aus dem letzten Kapitel anleiten lassen.)

* Wie sieht es mit der Bewegung des Kreises aus? Gelingt es Dir, den Kreis zu verschieben und mehrere Kreise innerhalb der Zeichenfläche erscheinen zu lassen?

* Was passiert, wenn Du mehrere Distanzfelder durch unterschiedliche Funktionen und Operationen kombinierst?

```glsl
pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
```

* Entwickle drei Kompositionen auf Basis dieser Technik. Wenn Du sie animieren kannst, umso besser!

####Für Deine Werkzeugsammlung

Im Hinblick auf die erforderliche Rechenleistung kann die [```sqrt()```](../glossary/?search=sqrt)-Funktion – und alle Funktionen, die darauf basieren – sehr kostspielig sein. Deshalb hier nun ein anderer Weg, wie man kreisförmige Distanzfelder mit Hilfe der [```dot()```](../glossary/?search=dot)-Funktion über das Skalarprodukt erzeugen kann.

<div class="codeAndCanvas" data="circle.frag"></div>

### Nützliche Eigenschaften von Distanzfeldern

![Zen garden](zen-garden.jpg)

Distanzfelder lassen sich nutzen, um beinahe jede Art von Form zu zeichnen. Je komplexer die gewünschte Form, desto komplexer fällt in der Regel auch die dafür benötigte Distanzformel aus. Doch sobald Du die benötigte Distanzformel beisammenhast, wird es sehr einfach, gewünschte Effekte darauf anzuwenden, beispielweise weiche Kanten oder mehrfache Umrisse. Aus diesem Grund sind Distanzfelder u.a. bei der Schriftenerzeugung sehr populär, nachzulesen etwa bei [Mapbox GL Labels](https://blog.mapbox.com/drawing-text-with-signed-distance-fields-in-mapbox-gl-b0933af6f817), bei [Matt DesLauriers](https://twitter.com/mattdesl) und bei [Material Design Fonts](http://mattdesl.svbtle.com/material-design-on-the-gpu).

Schau Dir den folgenden Programmcode an.

<div class="codeAndCanvas" data="rect-df.frag"></div>

Wir beginnen, indem wir den Wertebereich unserer *x*- und *y*-Ordinate auf die Spanne zwischen ```-1``` und ```1``` skalieren und damit gleichzeitig die Basis des Koordinatensystems *(0/0)* in die Mitte der Zeichenfläche verschieben. In der *Zeile 24* visualisieren wir die Werte unseres Distanzfeldes, indem wir sie mit zehn multiplizieren und die [```fract()```](../glossary/?search=fract)-Funktion auf das Ergebnis anwenden. *fract()* liefert immer nur den Nachkommateil des Ergebnisses, also eine Zahl zwischen ```0.0``` und ```0.99999...```, so dass bei den wiederholten Aufrufe für die verschiedenen Pixel ein Farbverlauf von Schwarz nach Weiß entsteht. Durch die Multiplikation mit zehn wiederholt sich dieser Verlauf genau zehn Mal. So entsteht ein repetitives Kreismuster, wie bei einem Zen-Garten.

Lass uns einen Blick auf die Formel zur Berechnung des Distanzfeldes in der *Programmzeile 19* werfen. Dort berechnen wir den Abstand zur Position ```(.3,.3)```. Damit dies in allen vier Quadranten gleichermaßen geschieht, wird der zu bearbeitende Punkt jeweils auf den ersten Quadranten abgebildet. Dafür sorgt hier die [```abs()```](../glossary/?search=abs)-Funktion.

Wenn Du die Kommentarzeichen in *Programmzeile 20* entfernst, kannst Du beobachten, wie wir die Entfernung bei allen Punkten um ```0.3``` reduzieren. Anschließend setzen wir den Abstand mit Hilfe der [```min()```](../glossary/?search=min)-Funktion für alle Punkte, deren Abstand dann noch größer als ```0.0``` ist (also vorher größer als ```0.3``` war), auf ```0.0```. Das erzeugt ein neues interessantes Muster.

Sobald Du anschließend die Kommentarzeichen aus der *Programmzeile 21* entfernst, geschieht etwas ähnliches, nur quasi umgekehrt und mit Hilfe der Funktion [```max()```](../glossary/?search=max). Wieder wird der Abstand um ```0.3``` verringert, anschließend aber für alle Punkte auf ```0.0``` gesetzt, deren Abstand nun kleiner als ```0.0``` ist (vorher also zwischen ```0.0``` und ```0.3``` lag). Wir erhalten auf diese Weise mehrere geschachtelte Quadrate mit abgerundeten Ecken.

Entferne nun nach und nach die Kommentarzeichen aus den *Programmzeilen 27 bis 29*, um deren Auswirkung auf das Zeichnen mit dem Distanzfeld zu verstehen.

### Polarformen

![Robert Mangold – Ohne Titel (2008)](mangold.jpg)

Im Kapitel über die Verwendung von Farben haben wir kartesische Koordinaten auf Polarkoordinaten abgebildet. Wir berechneten dazu den *Radius* und den *Winkel* jeder Koordinate mit Hilfe der folgenden Formel:

```glsl
    vec2 pos = vec2(0.5)-st;
    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);
```

Einige dieser Formeln haben wir auch am Anfang dieses Kapitels genutzt, als es darum ging, Kreise zu zeichnen. Wir berechneten die Entfernung zum Kreismittelpunkt mit Hilfe der [```length()```](../glossary/?search=length)-Funktion. Jetzt, wo wir Distanzfelder kennengelernt haben, öffnet sich uns ein weiterer Weg zum Zeichnen komplexer Formen mithilfe von Polarkoordinaten.

Diese Technik unterliegt gewissen Beschränkungen, ist dafür aber sehr simpel und leistungsfähig. Sie beruht darauf, den Radius eines Kreises in Abhängigkeit des jeweiligen Winkels zu verändern, um unterschiedliche Formen zu erschaffen. Wie genau läuft diese Modulierung ab? Nun, Du hast es vielleicht schon erraten: Mit formgebenden Funktionen.

Unten findest Du verschiedene Funktionen jeweils zwei Mal: einmal als Verlaufskurve in einem kartesischen Koordinatensystem und dann als Shader-Programmcode in einem polaren Koordinatensystem. Dort stehen die verschiedenen formgebenden Funktionen in den *Programmzeilen 21 bis 25*. Entferne nun Schritt für Schritt die Kommentarzeilen und vergleiche den jeweiligen Funktionsgraphen im kartesischen Koordinatensystem mit seinem Äquivalent beim Zeichnen innerhalb eines Polarkoordinatensystem mit GLSL.

<div class="simpleFunction" data="y = cos(x*3.);
//y = abs(cos(x*3.));
//y = abs(cos(x*2.5))*0.5+0.3;
//y = abs(cos(x*12.)*sin(x*3.))*.8+.1;
//y = smoothstep(-.5,1., cos(x*10.))*0.2+0.5;"></div>

<div class="codeAndCanvas" data="polar.frag"></div>

Versuche doch einmal:

* Diese Formen zu animieren.

* Verschiedene formgebende Funktionen zu kombinieren, um Löcher in die Formen zu „stanzen“ und dadurch Blumen, Schneeflocken oder Zahnräder entstehen zu lassen.

* Nutze die ```plot()```-Funktion aus dem Kapitel über formgebende Funktionen, um nur die Kontur der jeweiligen Form zeichnen zu lassen.

### Und nun alles zusammen

Wir haben gelernt, den Radius einer Kreisform mit Hilfe der [```atan()```](../glossary/?search=atan)-Funktion in Abhängigkeit des Winkels für das Zeichnen unterschiedlicher Formen zu nutzen. Nun können wir ```atan()``` auch mit Distanzfeldern einsetzen, um ganz unterschiedliche Effekte zu erzielen.

Unser Trick nutzt die gegebene Anzahl der Seiten eines Polygons, um das benötigte Distanzfeld mit Hilfe von Polarkoordinaten zu erzeugen. Schau Dir dazu auch den [folgenden Programmcode](http://thndl.com/square-shaped-shaders.html) von [Andrew Baldwin](https://twitter.com/baldand) an.

<div class="codeAndCanvas" data="shapes.frag"></div>

* Nutze das obige Programmbeispiel, um eine Funktion zu programmieren, die als Eingabe die Anzahl und Position der Ecken einer gewünschten Form erhält und als Ergebnis den Wert für das Distanzfeld liefert.

* Mische verschiedene Distanzfelder miteinander, indem Du die Funktionen [```min()```](../glossary/?search=min) und [```max()```](../glossary/?search=max) nutzt.

* Wähle ein geometrisches Logo, das Du mit Hilfe von Distanzfeldern replizierst.

Herzlichen Glückwunsch! Du hast Dich durch schwieriges Fahrwasser gekämpft. Nimm eine kleine Pause, damit sich das Erlernte setzen kann. Das Zeichnen komplexer Formen im Land der Shader ist wahrlich nicht ganz trivial, das kann durchaus ein wenig erschöpfen.

Unten am Ende dieses Kapitels finden Sie einen Link zu [PixelSpirit Deck] (https://patriciogonzalezvivo.github.io/PixelSpiritDeck/). Mit diesem Kartenspiel können Sie neue SDF-Funktionen erlernen, in Ihre Designs einfügen und verwenden auf deine Shader. Das Deck hat eine prägresive Lernkurve. Wenn Sie also eine Karte pro Tag nehmen und daran arbeiten, können Sie Ihre Fähigkeiten monatelang verbessern und herausfordern.

Da Du nun weißt, wie man unterschiedliche Formen zeichnet, kommen Dir bestimmt viele interessante Ideen in den Sinn. In den folgenden Kapiteln lernen wir, wie man Formen verschieben, skalieren und rotieren kann. Das wird Dir ermöglichen, komplexe Kompositionen zu erstellen.
