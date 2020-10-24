## Hallo Welt

Beim Erlernen einer neuen Programmiersprache beginnt man häufig mit dem berühmten „Hello world!“-Beispiel. Dabei handelt es sich um einen simplen Einzeiler, der die Meldung „Hello world!“ auf den Bildschirm bringt - als Gruß an die Welt und als Ausdruck der Vorfreude auf die kommenden Möglichkeiten.

In der Welt der Shader-Programmierung ist die Textausgabe eine zu komplizierte Angelegenheit, um gleich damit zu beginnen. Stattdessen wollen wir eine leuchtende Farbe als Willkommensgruß auf den Bildschirm zaubern.

<div class="codeAndCanvas" data="hello_world.frag"></div>

Falls Du dieses Buch in einem Internet-Browser liest, ist der obige Programmcode interaktiv. Du kannst in das Listing hineinklicken und jeden Teil des Programmcodes ändern. Deine Änderungen werden sofort innerhalb der Zeichenfläche sichtbar, weil der Shader-Code automatisch kompiliert und ausgeführt wird. Versuche es doch einfach einmal, indem Du die Zahlenwerte in der *Programmzeile 8* änderst.

Obwohl diese wenigen, einfachen Programmzeilen noch nicht nach viel aussehen, können wir daraus bereits einige Erkenntnisse gewinnen:

1. Shader-Programme verfügen über genau eine ```main```-Funktion, die an ihrem Ende einen Farbcode zurückliefert. Das erinnert stark an die Programmiersprache C, nur dass es dort nicht immer um Farbcodes geht.

2. Der berechnete Farbwert wird für die Rückgabe in die reservierte globale Variable ```gl_FragColor``` eingetragen.

3. Die stark von C beeinflusste Programmiersprache für Shader verfügt über eingebaute *Variablen* (so wie ```gl_FragColor```), *Funktionen* und *Datentypen*. Im obigen Beispiel sehen wir bereits den Datentyp ```vec4```, der einen vierdimensionalen Vektor aus Fließkommazahlen repräsentiert. Im weiteren Verlauf des Buches werden wir noch die Typen ```vec3``` und ```vec2``` kennen lernen, ebenso die wichtigen Typen ```float```, ```int``` und ```bool```.

4. Wenn wir uns den ```vec4``` Datentyp im obigen Beispiel genau anschauen, können wir bereits erahnen, dass die vier Zahlenwerte für die Farbkanäle Rot, Grün, Blau und Alpha (ein Maß für die Deckkraft) stehen. Außerdem erkennen wir, dass diese Werte offensichtlich normalisiert sind, sich also zwischen ```0.0``` und ```1.0``` bewegen. Später werden wir noch sehen, dass es uns diese Normalisierung vereinfacht, die Inhalte von Variablen auf Farbwerte *abzubilden*.

5. Eine weiteres aus C bekanntes Element sind die Präprozessor-Makros, die auch in unserem obigen Beispiel auftauchen. Mit ihrer Hilfe lassen sich Konstanten definieren (```#define```) und konditionale Festlegungen treffen (mit ```#ifdef``` und ```#endif```). Alle diese Makrobefehle beginnen mit einer Raute (```#```). Ihre Auswertung erfolgt als erster Schritt noch vor der eigentlichen Kompilierung des Shaders. Das Ergebnis dieser Auswertung bestimmt jeweils, welche Zeilen und Ausdrücke tatsächlich in den Programmcode einfließen, der anschließend kompiliert wird. In unserem obigen Beispiel wird die *Programmzeile 2* beispielsweise nur dann übernommen, wenn das Symbol ```GL_ES``` definiert ist. Dies ist in der Regel nur in Umgebungen auf mobilen Geräten der Fall, d.h. wenn das obige Programm beispielsweise auf einem Smartphone kompiliert wird, ist die Zeile 2 darin vorhanden und wirkt sich entsprechend aus. Beim Kompilieren auf einem Laptop oder PC taucht die Zeile 2 aber gar nicht auf, weil dort auch das Symbol ```GL_ES``` nicht definiert ist.

6. Fließkomma-Datentypen sind ganz entscheidend für die Berechnungen innerhalb von Shadern. Deshalb spielt die *Genauigkeit* dieser Operationen eine wichtige Rolle. Eine geringere Genauigkeit bedeutet weniger Aufwand und geht deshalb mit einer schnelleren Berechnung einher. Der Preis dafür sind allerdings Einbußen bei der Qualität der Berechnungen. Wenn man will, kann man die Genauigkeit jeder einzelnen Fließkommavariablen genau festlegen. Meist unterscheidet man jedoch grundsätzlich, je nach den Möglichkeiten der Plattform, auf der ein Shader zur Ausführung kommen soll. So setzen wir hier in der zweiten Programmzeile die Genauigkeit auf Medium (```precision mediump float;```), wenn der Shader auf einem Mobilgerät kompiliert wird. Darüber hinaus gibt es noch die Genauigkeitsstufen „niedrig“ (```precision lowp float;```) und „hoch“ (```precision highp float;```). Letzteres ist auf vielen Plattformen die Vorgabe, sofern wir nichts Anderes festlegen.

7. Die letzte und für die Praxis vielleicht wichtigste Erkenntnis aus dem obigen Programmcode ist, dass wir Fließkommawerte immer mit einem Punkt („.“) versehen sollten, auch wenn der Nachkommateil leer bleibt (Null ist). Denn sonst macht der Compiler möglicherweise Integer-Werte (Ganzzahlen) daraus, und das kann während der Ausführung des Shaders zu hässlichen Programmfehlern führen. Die Zeichenfläche bleibt dann einfach weiß, weil es nicht weitergeht. Wenn du guten und auf vielen Shader-Plattformen ausführbaren Code entwickeln möchtest, gewöhne Dir die Kennzeichnung als Fließkommazahl durch den Punkt am besten gleich an. Denn der folgende Programmcode wird beispielsweise auf einigen Shader-Plattformen funktionieren, auf anderen hingegen nicht:

```glsl
void main() {
	gl_FragColor = vec4(1,0,0,1);	// potenzielle Fehlerquelle!
}
```

So, wo wir nun die wichtigen Elemente unseres kleinen „Hello world!“-Programms beschrieben haben, ist es an der Zeit, mit Veränderungen am Programmcode zu experimentieren. Du wirst feststellen, dass sich das Programm bei Syntaxfehlern oder unbekannten Befehlen weigert, zu kompilieren, und die Zeichenfläche deshalb weiß bleibt. Es gibt einige interessante Dinge, die Du direkt einmal ausprobieren kannst, beispielsweise:

* Versuche, die Fließkommazahlen durch Ganzzahlen zu ersetzen. Dann wirst Du unmittelbar feststellen, ob Deine aktuelle Umgebung/Grafikkarte damit umgehen kann.

* Versuche, die *Programmzeile 8* auszukommentieren, und schau was passiert, wenn der Code dadurch keinen Farbwert zurückliefert.

* Versuche, eine zusätzliche Funktion in den Programmcode einzufügen, die eine von Dir gewählte Farbe zurückliefert und rufe diese Funktion innerhalb von ```main()``` auf. Dazu ein Tipp: Hier folgt der Programmcode für eine Funktion, die Rot zurückliefert:

```glsl
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```

* Es gibt verschiedene Wege, um einen Wert vom Typ ```vec4``` zu konstruieren. Versuche, weitere Wege zu entdecken. So geht es zum Beispiel auch:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Obwohl dieses „Hello world!“-Programm noch nicht so wahnsinnig aufregend daherkommt, ist es doch das simpelste Beispiel aus der Welt der Shader. Wir beeinflussen damit die Farbe aller Bildpunkte innerhalb unserer Zeichenfläche. In den nun folgenden Kapiteln werden wir die Farbe der einzelnen Bildpunkte aufgrund von zwei unterschiedlichen Arten von Eingabewerten steuern: Ihrer Position (d.h. die Lage des zu bearbeitenden Pixels innerhalb der Zeichenfläche) und der Zeit (d.h. der Zeitspanne, die seit dem Laden einer Seite vergangen ist).
