## Wie kann ich dieses Buch ausdrucken?

Nehmen wir einmal an, Du willst gar nicht mit den Beispielprogrammen in diesem Buch interagieren, sondern den Text wie ein gutes altes Buch im Urlaub oder auf dem täglichen Weg zur Arbeit lesen. In diesem Fall kannst Du Dir den Text einfach ausdrucken.


#### Installation des glslViewer

Um den Text auszudrucken, müssen die verschiedenen Bestandteile des Buches zunächst aufbereitet werden. Dafür benötigst Du den [```glslViewer```](https://github.com/patriciogonzalezvivo/glslViewer), ein Werkzeug für die Kommandozeile, mit dem Du aus den verschiedenen Beispielprogrammen die daraus resultierenden Bilder generieren kannst.

Unter **MacOSX** benötigst Du zunächst [homebrew](http://brew.sh/). Nach dessen Installation kannst Du in einem Terminalfenster folgendes eingeben:

```bash
brew update
brew upgrade
brew tap homebrew/versions
brew install glfw3
cd ~
git clone http://github.com/patriciogonzalezvivo/glslViewer.git
cd glslViewer
make
make install
```

Auf einem **RaspberryPi** gibst Du folgende Befehle ein:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Installation von Latex und Pandoc

Für den Ausdruck müssen die einzelnen Kapitel zunächst aus dem vorliegenden Textformat (*Markdown*) zunächst nach Latex und anschließend nach PDF konvertiert werden.

Unter **MacOSX**:

Lade und installiere zunächst [basictex inkl. der  MacTeX-Erweiterungen](http://www.tug.org/mactex/morepackages.html) und installiere anschließend [Pandoc](http://johnmacfarlane.net/pandoc/), indem Du folgende Kommandos eingibst:

```bash
brew install pandoc
```

Auf einem **RaspberryPi** gibst Du bitte folgende Kommandos ein:

```bash
sudo apt-get install texlive-xetex pandoc
```

#### Das Buch nach PDF umwandeln und ausdrucken

Jetzt, wo Du alle Werkzeuge beisammenhast, ist es an der Zeit, eine Kopie des Buches aus der [Ablage im Internet](https://github.com/patriciogonzalezvivo/thebookofshaders) herunterzuladen und daraus eine PDF-Datei zu erstellen.

Öffne dafür erneut ein Terminalfenster und gib die folgenden Befehle ein:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make
```

Wenn alles funktioniert hat, findest Du anschließend die Datei ```book.pdf``` vor, die Du auf Deinem bevorzugten Gerät lesen oder ausdrucken kannst.
