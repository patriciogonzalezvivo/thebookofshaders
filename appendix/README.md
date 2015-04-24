# Appendix: Other ways to use this book

This book is designed to be navigated with a modern web browser that supports WebGL technology (Firefox, Chrome, Safari, between others). But you may encounter the situation that you don't have a computer with no GPU card or not internet. If that's the case the following sections can help you.  

## How can I navigate this book off-line?

Let’s say you have a long trip and you want to use it to teach yourself some shaders. In that case you can make a local copy of this book on your computer and run a local server.

For that you only need Python 2.6 and a git client. On MacOS and RaspberryPi computers Python is installed by default but you still need to install a git client. For that:

In **MacOSX** be sure to have [homebrew](http://brew.sh/) installed and then on your terminal do:

```bash
brew update
brew upgrade
brew install git 
```

On **RaspberryPi** you need to do:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core
```

Once you have everything installed you just need to do:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
python -m SimpleHTTPServer
```

Then open your browser to [```http://localhost:8000/```](http://localhost:8000/)

## How to run the examples on a RaspberryPi?

A few years ago, taking for granted that everybody have a computer with a GPU was a long shot. Now, most computers have a graphic unit, but is a high bar for a requirement in for example a course or class. 

Thanks to the [RaspberryPi project](http://www.raspberrypi.org/) a new type of small and cheap generation of computers (arround $35 each) has found its way into  classrooms. More importantly for the purposes of this book, the [RaspberryPi](http://www.raspberrypi.org/) comes with a decent Bradcom GPU card that can be accessed directly from the console. I made a [flexible GLSL live coding tool call **glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer) that runs all the examples on this book. This program also is hable to update automatically the changes the user makes when they save it. What that means? you can edit the shader and every time you save it, the shader will be re-compile and rendered for you.

By making a local copy of the repository of this book (see the above section) and having [```glslViewer``` installed](https://github.com/patriciogonzalezvivo/glslViewer), users can run the examples with ```glslviewer```. Also by using the ```-l``` flag they can render the example on a corner of the screen while they modify it with any text editor (like ```nano```, ```pico```, ```vi```, ```vim``` or ```emacs```). This also works if the user is connected through ssh/sftp.

To install and set this all up on the RaspberryPi after installing the OS and logging in, type the following commands:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core 
sudo apt-get install libfreeimage-dev
cd ~ 
git clone http://github.com/patriciogonzalezvivo/glslViewer.git
cd glslViewer
make
make install
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```

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
cd thebookofshaders
make
```

If everything goes well, you will see a ```book.pdf``` file which you can read on your favorite device or print. 

