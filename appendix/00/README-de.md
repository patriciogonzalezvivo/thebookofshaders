## Wie kann ich dieses Buch offline lesen?

Nehmen wir einmal an, Du gehst auf eine längere Reise und möchtest Dich unterwegs in die Shader-Programmierung einarbeiten. In diesem Fall könntest Du eine Kopie dieses Buches auf Deinen Rechner laden und diese über einen lokalen Server anzeigen lassen.

Alles, was Du dafür benötigst, ist Python 3 und ein Client-Programm für GIT. Auf Computern mit MacOS und auf dem RaspberryPi ist Python standardmäßig bereits vorinstalliert. Dort musst Du lediglich den GIT-Client zusätzlich installieren.

Unter **MacOSX** benötigst Du dafür [homebrew](http://brew.sh/). Sobald das Paket installiert ist, kannst Du in einem Terminal-Fenster folgendes eingeben:

```bash
brew update
brew upgrade
brew install git
```

Auf einem **RaspberryPi** gibst Du folgendes ein:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

Hast Du alles beisammen, musst Du lediglich folgende Befehle aufrufen, um das *Book of Shaders* per GIT auf Deinen Rechner zu laden und den Server zur Anzeige des Inhalts zu starten:

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Nutze dann den vorinstallierten Internet-Browser auf Deinem Rechner zur Anzeige des Buches durch Eingabe folgender URL [```http://localhost:8000/```](http://localhost:8000/)
