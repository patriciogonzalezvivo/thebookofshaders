## Comment puis-je consulter ce livre hors-ligne ?

Disons que vous vous préparez à partir pour un long voyage et que vous souhaitez le mettre à profit pour apprendre quelques shaders. Dans ce cas, pourquoi pas créer une copie locale de ce livre sur votre ordinateur et lancer un serveur local.

Pour cela, vous n'avez besoin que de PHP, Python 3 et d'un client git. Sur les ordinateurs MacOS et Raspberry Pi, Python est installé par défaut, mais vous il vous reste à installer PHP et un client git. Pour cela :

Sous **MacOSX**, assurez-vous d'avoir [homebrew](http://brew.sh/) installé et ensuite dans votre terminal :

```bash
brew update
brew upgrade
brew install git php
```

Sur votre **Raspberry Pi**, vous devez installer [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), une distribution Linux basée sur Debian conçu pour Raspberry Pi, puis lancer :

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer php
```

Une fois que vous avez tout installé, il vous suffit d'exécuter les commandes :

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Enfin, ouvrez dans votre navigateur l'URL [`http://localhost:8000/`](http://localhost:8000/), et voilà !
