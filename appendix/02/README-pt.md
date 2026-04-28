## Como imprimir este livro?

Digamos que você não queira navegar ou interagir com os exemplos e apenas queira um bom e velho livro didático que possa ler na praia ou no seu trajeto para a cidade. Nesse caso, você pode imprimir este livro.


#### Instalando glslViewer

Para imprimir este livro, você precisa primeiro fazer o parsing dele. Para isso você precisará de [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer), uma ferramenta de shader para console que irá compilar e transformar os exemplos de shader em imagens.

Em **MacOSX**, certifique-se de ter o [homebrew](http://brew.sh/) instalado e então em seu terminal faça:

```bash
brew install glslviewer
```

No **Raspberry Pi** você precisa obter [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), uma distribuição Linux baseada em Debian feita para Raspberry Pi e depois faça:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Instalando Python 3, Latex Engine e Pandoc

Para fazer parsing dos capítulos Markdown em Latex e depois em um arquivo PDF, usaremos o Xetex Latex Engine e Pandoc.

Em **MacOSX**:

Baixe e instale MacTeX por:

```bash
brew install --cask mactex-no-gui
```

e depois instale [Pandoc](http://johnmacfarlane.net/pandoc/) e Python 3 por:

```bash
brew install pandoc python
```

No **Raspberry Pi** (Raspbian):

```bash
sudo apt-get install texlive-xetex pandoc python2.7
```

#### Compile o livro em um pdf e imprima

Agora que você tem tudo que precisa, é hora de clonar [o repositório deste livro](https://github.com/patriciogonzalezvivo/thebookofshaders) e compilar o livro.

Para isso abra seu terminal novamente e digite:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean pdf
```

Se tudo correr bem, você verá um arquivo `book.pdf` que você pode ler em seu dispositivo favorito ou imprimir.

#### Compile o livro em um epub para usar com um leitor de e-book

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean epub
```

O arquivo `book.epub` gerado pode ser usado diretamente, ou convertido para um arquivo `.mobi` para uso com Kindle usando um conversor, por exemplo Calibre.
