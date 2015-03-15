## How to print this book?

Let’s say you don’t want to navigate or interact with the examples and you just want a good old fashion text book which you can read on the beach or on your commute to the city. In that case you can print this book.
 

#### Installing glslViewer

For printing this book you need first to parse it. For that you will need [```glslViewer```](https://github.com/patriciogonzalezvivo/glslViewer) a console shader tool that will compile and transform the shader examples into images.

In **MacOSX** get sure to have [homebrew](http://brew.sh/) installed and then on your terminal do:

```bash
brew update
brew upgrade
brew install git freeimage 
brew tap homebrew/versions
brew install glfw3
cd ~ 
git clone http://github.com/patriciogonzalezvivo/glslViewer.git
cd glslViewer
make
make install
```

On **RaspberryPi** you need to do:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core libfreeimage
cd ~ 
git clone http://github.com/patriciogonzalezvivo/glslViewer.git
cd glslViewer
make
make install
```

#### Installing Latex Engine and Pandoc

For parsing the Markdown chapters into Latex and then into a PDF file we will use Xetex Latex Engine and Pandoc.

In **MacOSX**:

Download and Install [basictex & MacTeX-Additions](http://www.tug.org/mactex/morepackages.html) and then install [Pandoc](http://johnmacfarlane.net/pandoc/) by:
 
```bash
brew install pandoc
```

On **RaspberryPi**:

```bash
sudo apt-get install texlive-xetex pandoc
```

#### Compile the book into a pdf and print it

Now that you have all you need, it is time to clone [the repository of this book](https://github.com/patriciogonzalezvivo/thebookofshaders) and compile the book.

For that open your terminal once again and type:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd GLSL-Book
make
```

If everything goes well, you will see a ```book.pdf``` file which you can read on your favorite device or print. 

