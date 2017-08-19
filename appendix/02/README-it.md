## Come posso stampare questo libro?

Diciamo che non si vuole navigare o interagire con gli esempi e si desidera solo un buon vecchio libro di testo che si può leggere sulla spiaggia o sul vostro tragitto verso la città. In questo caso è possibile stampare questo libro.

#### Installare glslViewer

Per la stampa di questo libro è necessario in primo luogo trasformarlo. Per questo è necessario [```glslViewer```](https://github.com/patriciogonzalezvivo/glslViewer) uno strumento console per gli shader che compilerà e trasformare gli esempi in immagini.

Su **MacOSX** siate sicuri di avere installato [homebrew](http://brew.sh/) e quindi sul terminale digitate:

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

Su **Raspberry Pi** è necessario fare:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Installare Latex Engine e Pandoc

Per trasformare i capitoli Markdown in Latex e poi in un file PDF useremo Xetex Latex Engine e Pandoc.

Su  **MacOSX**:

Scarica e Installa [basictex & MacTeX-Additions](http://www.tug.org/mactex/morepackages.html) e poi installa [Pandoc](http://johnmacfarlane.net/pandoc/) facendo:

```bash
brew install pandoc
```

Su **Raspberry Pi**:

```bash
sudo apt-get install texlive-xetex pandoc
```

#### Trasforma il libro in un pdf e stampalo

Ora che avete tutto ciò che serve, è il momento di clonare la [repository di questo libro](https://github.com/patriciogonzalezvivo/thebookofshaders) e compilare il libro.

A tale scopo aprite il terminale e digitate:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make
```
Se tutto va bene, si vedrà un file ```book.pdf``` che potete leggere sul vostro dispositivo preferito o stampare.
