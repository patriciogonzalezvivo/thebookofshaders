## Jak wydrukować tę książkę?

Powiedzmy, że nie chcesz nawigować ani wchodzić w interakcje z przykładami i chcesz po prostu mieć starą dobrą książkę tekstową, którą możesz czytać na plaży lub podczas dojazdu do miasta. W takim przypadku możesz wydrukować tę książkę.


#### Instalacja programu glslViewer

Aby wydrukować tę książkę, musisz najpierw ją przetworzyć. W tym celu będziesz potrzebował [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer) - konsolowego narzędzia do shaderów, które skompiluje i przekształci przykłady shaderów w obrazy.

<!-- ## How to print this book?

Let’s say you don’t want to navigate or interact with the examples and you just want a good old fashion text book which you can read on the beach or on your commute to the city. In that case you can print this book.


#### Installing glslViewer

For printing this book you need first to parse it. For that you will need [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer) a console shader tool that will compile and transform the shader examples into images. -->

W **MacOSX** upewnij się, że masz zainstalowany [homebrew](http://brew.sh/), a następnie w terminalu wykonaj:

<!-- In **MacOSX** get sure to have [homebrew](http://brew.sh/) installed and then on your terminal do: -->

```bash
brew install glslviewer
```

Na **Raspberry Pi** należy pobrać [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), dystrybucję Linuksa opartą na Debianie, stworzoną dla Raspberry Pi, a następnie wykonać:

<!-- On **Raspberry Pi** you need to get [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), a Debian-based Linux distribution made for Raspberry Pi and then do: -->

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Instalacja Pythona 3, silnika Latex i Pandoc

Do parsowania Markdowna do Latexa, a następnie do pliku PDF użyjemy Xetex Latex Engine i Pandoc.

W **MacOSX**:

Pobierz i zainstalluj MacTeX:

<!-- #### Installing Python 3, Latex Engine and Pandoc

For parsing the Markdown chapters into Latex and then into a PDF file we will use Xetex Latex Engine and Pandoc.

In **MacOSX**:

Download and Install MacTeX by: -->

```bash
brew cask install mactex-no-gui
```

a następnie zainstalowuj [Pandoc](http://johnmacfarlane.net/pandoc/) i Python 3 przez:

<!-- and then install [Pandoc](http://johnmacfarlane.net/pandoc/) and Python 3 by: -->

```bash
brew install pandoc python
```

Na **Raspberry Pi** (Raspbian):

```bash
sudo apt-get install texlive-xetex pandoc python2.7
```

#### Skompiluj książkę do pdf i wydrukuj ją

Teraz, gdy masz już wszystko, czego potrzebujesz, nadszedł czas na sklonowanie [repozytorium tej książki](https://github.com/patriciogonzalezvivo/thebookofshaders) i skompilowanie książki.

W tym celu otwórz jeszcze raz swój terminal i wpisz:

<!-- #### Compile the book into a pdf and print it

Now that you have all you need, it is time to clone [the repository of this book](https://github.com/patriciogonzalezvivo/thebookofshaders) and compile the book.

For that open your terminal once again and type: -->

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean pdf
```

Jeśli wszystko pójdzie dobrze, zobaczysz plik `book.pdf`, który możesz przeczytać na swoim ulubionym urządzeniu lub wydrukować.

#### Skompiluj książkę do postaci epub, aby użyć jej w e-czytniku.

<!-- If everything goes well, you will see a `book.pdf` file which you can read on your favorite device or print.

#### Compile the book into an epub for use with an e-reader -->

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean epub
```

Wygenerowany `book.epub` może być użyty bezpośrednio, lub przekonwertowany, za pomomocą, na przykład, Calibre, na plik `.mobi` do użytku z Kindle.

<!-- The generated `book.epub` can be used directly, or converted to a `.mobi` file for use with Kindle by using a converter, for example Calibre. -->
