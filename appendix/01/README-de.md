## Wie kann ich die Beispiele auf einem RaspberryPi ausführen?

Vor wenigen Jahren konnte man noch nicht davon ausgehen, dass jedermann über einen Computer mit einer GPU verfügt. Heutzutage gilt das nicht mehr. Doch im Bereich von Schulen, Universitäten und anderen Weiterbildungseichrichtungen ist dies immer noch eine hohe Anforderung.

Durch das [Raspberry Projekt](http://www.raspberrypi.org/) hat mittlerweile eine neue Generation kleiner und billiger Computer (das Stück ab ca. 40 Euro) ihren Weg in viele Klassenzimmer gefunden. Vor allem verfügt der [RaspberryPi](http://www.raspberrypi.org/) über einen ansehnlichen Grafikchip mit GPU, der direkt aus der Kommandozeile angesprochen werden kann.

Ich habe ein flexibles Werkzeug für die Programmierung von GLSL-Shadern entwickelt, den [**glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer). Damit können alle Beispiele aus diesem Buch ausgeführt werden. Sobald man Veränderungen am aktuellen Shader-Programmcode abspeichert, kompiliert das Programm den Shader erneut und bringt ihn zur Ausführung. Auf dem Bildschirm erscheint daraufhin die aktualisierte Anzeige des Shaders.

Indem Du eine lokale Kopie dieses Buches und seiner Beispielprogramme auf Deinem Rechner anlegst (mehr dazu im vorhergehenden Kapitel) und den [```glslViewer```] (https://github.com/patriciogonzalezvivo/glslViewer) installierst, kannst Du die Beispielprogramme mit dem ```glslviewer``` ausführen. Wenn Du beim Start dieses Programms den Kommandozeilenschalter ```-l``` angibst, erscheint die erzeugte Grafik in einer Ecke des Bildschirms, während Du gleichzeitig den Shader-Programmcode mit einem beliebigen Text-Editor (etwa ```nano```, ```pico```, ```vi```, ```vim``` oder ```emacs```) bearbeitest. Das funktioniert auch, wenn Du mit dem Terminal des RaspberryPi über ssh/sftp verbunden bist.

Um die angesprochenen Tools auf einem RaspberryPi zu installieren, rufe nach dem Start des Betriebssystems und dem Einloggen folgende Befehle über die Kommandozeile auf:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
