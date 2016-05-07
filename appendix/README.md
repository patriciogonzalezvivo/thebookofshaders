# Appendix

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
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git pull
php -S localhost:8000
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
sudo apt-get install git-core
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

## How can I collaborate with this book?

Thanks for be willing to collaborate! There are plenty of ways you can:

- Translating content
- Improving the [```glossary/``` section](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary)
- Editing content
- Sharing your shaders examples trough [the on-line editor](http://editor.thebookofshaders.com/) to 

### Translating content

This book is wrote in [Markdown language](https://daringfireball.net/projects/markdown/syntax) so it's very easy to edit and work on it. 

1. Start by going to [github's repository at ```github.com/patriciogonzalezvivo/thebookofshaders```](https://github.com/patriciogonzalezvivo/thebookofshaders). Take a look the files and folders inside it. You will note that the content is on the ```README.md``` and others files with capital letters like: ```TITLE.md```, ```SUMMARY.md```, etc. Also note that translations are hosted on files ending in two letters referencing the language they are on, ex.: ```README-jp.md```, ```README-es.md```, etc.

2. Fork the repository and clone it in your computer.

3. Duplicate the content of the files want to translate. Remember to add to the two letters that makes reference to the language you are translating to the files you will work on. 

4. Translate the content line by line (see **Translation notes**).

5. Test it (see **Testing**).

6. Push to your own github fork to then make a [Pull Request](https://help.github.com/articles/using-pull-requests/)

#### Translating notes

Do not erase or modify things the embebed examples, that looks like this:

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

or

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### Testing

Start running a local PHP server inside the local repository folder:

```bash
php -S localhost:8000
```

Then in your browser search for ```localhost:8000``` go to the chapter you are translating and add ```?lan=``` followed by the to letters your use to mark the language you are translating to. 

For examples if you are translate the chapter ```03``` to french you had been working the file ```03/README-fr.md``` and you can test it by going to: ```http://localhost:8000/03/?lan=fr```

### Improving the glossary section

This section is under development. We are happy to listen to your ideas on how to make it a friendly tools for all. Send us a message to [@bookofshaders](https://twitter.com/bookofshaders).

### Editing content

We are all humans. If you see something say something and make a Pull Request or open an issue. Thanks!

### Sharing your shaders examples

You will see a lot of links to [the on-line editor](http://editor.thebookofshaders.com/) and embebed instances of it.  
Once you code something that makes you proud, click the "Export" (or the ```⇪``` icon) and then copy the "URL to code...". Send it to [@bookofshaders](https://twitter.com/bookofshaders) or [@kyndinfo](https://twitter.com/kyndinfo). We are looking forward to see it and add it to [the example gallery section](https://thebookofshaders.com/examples/).

