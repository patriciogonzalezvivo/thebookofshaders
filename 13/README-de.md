![Due East over Shadequarter Mountain - Matthew Rangel (2005) ](rangel.jpg)

## Gebrochene Brownsche Bewegung

Rauschen kann für Menschen ganz unterschiedliche Dinge bedeuten, je nachdem, wen man danach fragt. Musiker denken bei diesem Stichwort an schlechte Klangqualität, Funkspezialisten an unerwünschte Überlagerungen und Astrophysiker an die kosmische Hintergrundstrahlung im Mikrowellenbereich. Diese Vorstellungen führen uns zurück zu den physikalischen Grundlagen des Zufälligen in unserer Welt.

Doch lass uns erst einmal mit etwas ganz Einfachem und Fundamentalem beginnen: Mit den Eigenschaften von Wellen. Eine Welle steht für die Schwankung einer bestimmten Eigenschaft im Verlauf der Zeit. Audiowellen sind Schwankungen des Luftdrucks, elektromagnetische Wellen sind Schwankungen elektrischer und magnetischer Felder. Zwei spezifische Merkmale von Wellen sind ihre Amplitude (die Intensität ihres Ausschlags) und ihre Frequenz (die Häufigkeit, mit der sich die Welle in einer bestimmten Zeit wiederholt). Die Formel für eine einfache lineare Welle (in einer Dimension) sieht so aus:

<div class="simpleFunction" data="
float amplitude = 1.;
float frequenz = 1.;
y = amplitude * sin(x * frequenz);
"></div>

* Verändere in der obigen Formel doch einfach mal die Werte für die Variablen ```amplitude``` und ```frequenz``` und beobachte, was dann geschieht.
* Versuche eine formgebende Funktion in die Formel einzubringen, so dass sich die Amplitude im Verlauf der Zeit ändert.
* Versuche das Gleiche, aber diesmal für eine Änderung der Frequenz im Laufe der Zeit.

Mit den letzten beiden Übungen modulierst Du die Sinuswelle. So erhältst Du einmal eine amplitudenmodulierte Welle (AM) und einmal eine frequenzmodulierte Welle (FM).

Ein weiteres interessantes Merkmal von Wellen kann man beobachten, wenn man mehrere Wellen addiert. Dabei entsteht ein Phänomen, das als „Überlagerung“ bekannt ist. Kommentiere in dem folgenden Beispiel einzelne Zeilen aus bzw. wieder ein und verändere die verschiedenen Faktoren für die Frequenz und die Amplitude. Verschaffe Dir einen Eindruck davon, wie sich das Gesamtbild auf diese Weise ändert.

<div class="simpleFunction" data="
float amplitude = 1.;
float frequenz = 1.;
y = sin(x * frequenz);
float t = 0.01*(-u_time*130.0);
y += sin(x*frequenz*2.1 + t)*4.5;
y += sin(x*frequenz*1.72 + t*1.121)*4.0;
y += sin(x*frequenz*2.221 + t*0.437)*5.0;
y += sin(x*frequenz*3.1122+ t*4.269)*2.5;
y *= amplitude*0.06;
"></div>

* Experimentiere mit Veränderungen der Amplitude und der Frequenz bei den hinzuaddierten Wellen.
* Gelingt es Dir, zwei Wellen zu erschaffen, die sich gegenseitig aufheben? Wie würde das aussehen?
* Ist es möglich, Wellen auf eine bestimmte Art und Weise zu addieren, so dass sie sich gegenseitig verstärken?

In der Musik steht jede Note für eine bestimmte Frequenz. Reiht man die Frequenzen der Noten einer Tonleiter aneinander, so ergibt sich ein charakteristisches Muster. Die Halbierung bzw. Verdoppelung der Frequenz entspricht dabei jeweils dem Sprung um eine Oktave nach unten bzw. oben.

Okay, lass uns die Sinuswelle nun durch Perlins Rauschfunktion ersetzen. Diese hat in ihrer einfachsten Form ein ähnliches Erscheinungsbild wie die Sinuswelle. Zwar sind die Frequenz und die Amplitude von Perlins Rauschfunktion nicht konstant, aber die Amplitude bleibt zumindest weitgehend gleich und die Frequenz schwankt nur in einem schmalen Bereich rund um die Basisfrequenz. Perlins Rauschfunktion ist dadurch nicht so gleichförmig wie eine Sinuswelle. So wird es einfacher, den Eindruck von Zufälligkeit zu erzielen, indem man mehrere dieser Funktionen erst skaliert und dann addiert. Zwar ist dies grundsätzlich auch mit Sinuswellen möglich. Doch benötigt man dann eine größere Anzahl einzelner Wellen, um den eigentlich so regelmäßigen und periodischen Charakter der zugrundeliegenden Sinuswelle zu verbergen.

Indem wir das Ergebnis mehrerer Rauschfunktionen (*oktaven*) addieren, wobei wir schrittweise die Frequenz durch Multiplikation um einen gleichbleibenden Faktor (*porositaet*) steigern und die Amplitude dieser Zuwächse verringern (*zuwachs* < 1.0), verleihen wir unserem Rauschen eine feinere Granularität mit mehr Details. Diese Technik ist als „Gebrochene Brownsche Bewegung“ (engl.: „fractal Brownian motion“), kurz *fBm*, oder auch einfach als „frakturiertes Rauschen“ (engl.: „fractal noise“) bekannt. In ihrer simpelsten Form kann man sie mit Hilfe des folgenden Codes erzeugen:

<div class="simpleFunction" data="// Properties
const int oktaven = 1;
float porositaet = 2.0;
float zuwachs = 0.5;
//
// Startwerte
float amplitude = 0.5;
float frequenz = 1.;
//
// die Oktaven durchlaufen
for (int i = 0; i < oktaven; i++) {
&#9;y += amplitude * noise(frequenz*x);
&#9;frequenz *= porositaet;
&#9;amplitude *= zuwachs;
}"></div>

* Erhöhe die Anzahl der Oktaven schrittweise von 1 auf 2, 4, 8 und 10 und beobachte, was dann geschieht.
* Sobald Du mehr als 4 Oktaven durchläufst, ändere den Wert für die Porosität.
* Ändere dann (bei *oktaven > 4*) auch den Wert für den Zuwachs, um die Auswirkungen zu beobachten.

Fällt Dir auf, dass der Funktionsgraph mit jeder zusätzlichen Oktave an Details gewinnt? Außerdem wächst die Selbstähnlichkeit: Der Kurvenverlauf in den einzelnen kleinen Abschnitten ähnelt immer mehr dem Verlauf im Großen. Dies ist ein wichtiges Merkmal mathematischer „Fraktale“ und wir simulieren dies hier durch die Oktaven-Schleife. Zwar erzeugen wir kein echtes Fraktal, weil wir die Aufsummierung nach einigen Schleifendurchläufen stoppen. Wenn wir die Schleife aber unendlich fortsetzen und immer weitere Rausch-Komponenten hinzufügen würden, erhielten wir tatsächlich ein vollständiges Fraktal.

Im Bereich der Computergrafik existieren immer Beschränkungen in der Hinsicht, wie fein wir einzelne Details auflösen können. Werden die Objekte beispielsweise kleiner als ein Pixel, macht es gar keinen Sinn mehr, weiterzurechnen. Manchmal bedarf es einer großen Anzahl an Schleifendurchläufen für hochauflösende Details, aber eine endlose Anzahl an Schleifendurchläufen und Details sind grundsätzlich nicht sinnvoll.

Der folgende Programmcode liefert ein Beispiel dafür, wie man eine fBm in zwei Dimensionen implementieren kann, um ein Muster ähnlich einem Fraktal zu erzeugen:

<div class='codeAndCanvas' data='2d-fbm.frag'></div>

* Reduziere die Anzahl der Oktaven, indem Du den Wert der Konstanten in *Zeile 37* änderst.
* Ändere die Porosität der fBm in *Zeile 47*.
* Untersuche die Auswirkungen, wenn Du die Verstärkung in *Zeile 48* veränderst.

Diese Technik wird in der Computergrafik häufig angewandt, um auf prozedurale Weise künstliche Landschaften zu erzeugen. Die Selbstähnlichkeit als Merkmal einer fBm ist perfekt für die Erzeugung von Bergen, Bergketten und ihren Tälern geeignet. Schließlich erzeugt die Erosion, die diese Strukturen in der Natur hervorbringt, ebenfalls eine Selbstähnlichkeit in mehreren unterschiedlichen Größenordnungen – im Großen wie im Kleinen. Falls Dich das Thema interessiert, empfehle ich Dir diesen [hervorragenden Beitrag von Inigo Quiles über hochentwickeltes Rauschen](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm).

![Blackout - Dan Holdsworth (2010)](holdsworth.jpg)

Mit mehr oder weniger derselben Technik lassen sich auch andere Effekte nachahmen, beispielsweise **Turbulenzen**. Dies geschieht mit einer fBm, wobei allerdings der Absolutwert einer vorzeichenbehafteten Rauschfunktion genutzt wird, um starke Täler zu erzeugen.

```glsl
for (int i = 0; i < OKTAVEN; i++) {
    value += amplitude * abs(snoise(st));
    st *= 2.;
    amplitude *= .5;
}
```

<a href="../edit.php#13/turbulence.frag"><img src="turbulence-long.png"  width="520px" height="200px"></img></a>

Ein weiteres Mitglied aus dieser Familie von Funktionen ist der **Bergrücken**, bei dem die tiefen Täler nach oben gekehrt werden, um scharfe Bergrücken bzw. Bergkämme zu erzeugen:

```glsl
    n = abs(n);     // erzeuge eine Falte
    n = offset - n; // hole den Faltenboden nach oben
    n = n * n;      // intensiviere die Ausbuchtung
```

<a href="../edit.php#13/ridge.frag"><img src="ridge-long.png"  width="520px" height="200px"></img></a>

Eine andere Variante dieses Verfahrens mit interessanten Ergebnissen besteht in der Multiplikation der einzelnen Rauschelemente anstelle der Addition. Man kann außerdem die Skalierung nicht gleichförmig mit jeder Detailebene (jedem Schleifendurchlauf) fortsetzen, sondern von den Ergebnissen vorheriger Schleifendurchläufe abhängig machen. Damit verlässt man allerdings die Welt klassischer Fraktale und dringt in das noch wenig erforschte Feld der „Multifraktale“ vor. Diese sind mathematisch nicht streng definiert, aber das macht sie für die Computergrafik nicht weniger nützlich. Tatsächlich werden Multifraktale bereits vielfältig in Software für die künstliche Erzeugung von Landschaftsstrukturen eingesetzt.

Falls Dich dieses Thema interessiert, kannst Du darüber z.B. in Kapitel 16 des Buches „Texturing and Modeling: a Procedural Approach“ (dritte Auflage) von Kenton Musgrave, mehr erfahren. Leider ist das Buch seit einigen Jahren vergriffen, aber man findet es noch in Bibliotheken und auf dem Gebrauchtmarkt. (Eine PDF-Version der ersten Auflage wird im Internet verkauft, aber die stammt von 1994 und enthält leider noch nicht die hier empfohlenen Kapitel.)

### Raumkrümmung

[Inigo Quiles hat einen weiteren faszinierenden Artikel](http://www.iquilezles.org/www/articles/warp/warp.htm) darüber verfasst, wie man ein fBm einsetzen kann, um einen Raum aus fBm zu verzerren. Abgefahren, nicht wahr? Das ist wie ein Traum über einen Traum, in dem es richtig rundgeht.

![ f(p) = fbm( p + fbm( p + fbm( p ) ) ) - Inigo Quiles (2002)](quiles.jpg)

Ein etwas weniger extremes Beispiel für diese Technik liefert der folgende Programmcode, wo mit Hilfe der Verzerrung wolkenartige Strukturen erzeugt werden. Auch hier spielt das Merkmal der Selbstähnlichkeit wiederum eine wichtige Rolle.

<div class='codeAndCanvas' data='clouds.frag'></div>

Die Texturkoordinaten mit Hilfe einer Rauschfunktion auf diese Weise zu verzerren, kann sehr nützlich sein und tolle Resultate liefern, es ist aber auch nicht ganz einfach zu beherrschen. Als hilfreiches Werkzeug erweist sich dabei der Ersatz der Koordinaten durch eine Ableitung (den Gradienten) der Rauschfunktion. [Ein berühmter Artikel von Ken Perlin und Fabrice Neyret mit dem Titel „flow noise“](http://evasion.imag.fr/Publications/2001/PN01/) erläutert diesen Ansatz.

Einige moderne Implementationen von Perlins Noise-Algorithmus berechnen sowohl den Funktionswert als auch den Verlauf. Wenn der konkrete Verlauf im Rahmen der prozeduralen Berechnung nicht verfügbar ist, kann man immer noch eine begrenzte Anzahl von Differenzen berechnen, um sich dem Verlauf anzunähern, auch wenn dies mehr Arbeit bedeutet und keine ganz exakten Ergebnisse liefert.
