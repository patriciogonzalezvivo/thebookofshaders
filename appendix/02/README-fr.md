## Comment imprimer ce livre ?

Disons que vous ne voulez pas naviguer ou interagir avec les exemples et que vous voulez juste un bon livre papier à l'ancienne, que vous pourrez lire sur la plage ou sur votre trajet vers la ville. Dans ce cas, vous pouvez imprimer ce livre.

#### Installation de glslViewer

Pour imprimer ce livre, il faut d'abord l'analyser. Pour cela, vous aurez besoin de [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer) un outil en ligne de commande qui compile et transforme les exemples de shaders en images.

Sous **MacOSX**, assurez-vous d'avoir installé [homebrew](http://brew.sh/) et ensuite dans votre terminal :

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

Sur **Raspberry Pi**, vous devez installer [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), une distribution Linux basée sur Debian conçu pour Raspberry Pi puis de lancer :

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Installation de Python 3, Latex et Pandoc

Pour analyser les chapitres Markdown dans Latex, puis dans un fichier PDF, nous utiliserons Xetex Latex Engine et Pandoc.

Sous **MacOSX**:

Téléchargez et installez [basictex & MacTeX-Additions](http://www.tug.org/mactex/morepackages.html), puis installez [Pandoc](http://johnmacfarlane.net/pandoc/) et Python avec :

```bash
brew install pandoc python2.7
```

Sur **Raspberry Pi** (Raspbian):

```bash
sudo apt-get install texlive-xetex pandoc python2.7
```

#### Compilez le livre dans un document pdf et imprimez-le

Maintenant que vous avez tout ce dont vous avez besoin, il est temps de cloner [le dépôt git de ce livre](https://github.com/patriciogonzalezvivo/thebookofshaders) et de compiler le livre.

Pour cela, ouvrez votre terminal une fois de plus et tapez :

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make
```

Si tout se passe bien, vous verrez un fichier `book.pdf` que vous pouvez lire sur votre appareil préféré ou imprimer.
