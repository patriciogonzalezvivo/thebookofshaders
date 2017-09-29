## How to print this book?

Let’s say you don’t want to navigate or interact with the examples and you just want a good old fashion text book which you can read on the beach or on your commute to the city. In that case you can print this book.


#### Installing glslViewer

For printing this book you need first to parse it. For that you will need [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer) a console shader tool that will compile and transform the shader examples into images.

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

On **Raspberry Pi** you need to get [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), a Debian-based Linux distribution made for Raspberry Pi and then do:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Installing Python 2.7, Latex Engine and Pandoc

For parsing the Markdown chapters into Latex and then into a PDF file we will use Xetex Latex Engine and Pandoc.

In **MacOSX**:

Download and Install [basictex & MacTeX-Additions](http://www.tug.org/mactex/morepackages.html) and then install [Pandoc](http://johnmacfarlane.net/pandoc/) and Python by:

```bash
brew install pandoc python2.7
```

On **Raspberry Pi** (Raspbian):

```bash
sudo apt-get install texlive-xetex pandoc python2.7
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

If everything goes well, you will see a `book.pdf` file which you can read on your favorite device or print.


## FAQ

#### PDF build fails with IOError on OSX

_By [Florian Bruggisser](https://github.com/cansik)_

I tried to create the pdf but make does always fail with this error:

**Error**

```
Traceback (most recent call last):
  File "src/parseBook.py", line 49, in <module>
    modifiedChapterString = injectShaderBlocks(folder,modifiedChapterString)
  File "src/parseBook.py", line 26, in injectShaderBlocks
    shaderString = open(shaderPath, 'r').read()
IOError: [Errno 2] No such file or directory: './14/texture.frag" data-imgs="hokusai.jpg'
make: *** [all] Error 1
```

**Research**

It looks like the script takes a bit too much from the html. In this case it would be a parsing error, so i checked your regex:

```python
shaderFile = re.sub(r'<div class=\"codeAndCanvas\" data=\"(.*)\"></div>', r'\1', line.rstrip())
```

This regex should filter out the `.frag` in this line:

```html
<div class="codeAndCanvas" data="texture-resolution.frag" data-imgs="nicephore.jpg"></div>
```

**Problem**

Now the problem is:

1. There is an unescaped `/` at the end of the query.
2. The `(.*)` is too greedy. It does not care about other attributes in the html div.

So the result of the first group is:

```
texture-resolution.frag" data-imgs="nicephore.jpg
```

**Fix**

We could try make a stronger regex if we know how the files are named. They just contain `-`, `A-Za-z`, `.` and end with a `frag` so why don't we just try to match them and leave everything else away?

```
data=\"([\w\-\.]+frag)\"
```

Now we can replace the line in the script with a simple regex search and get the filename in the first group value:

```
shaderFile = re.findall('data=\"([\w\-\.]+frag)\"', line)[0]
```

Finally it works!...ehm...the generation of the frag's works. I have a .tex file now, but the pdf generation still does not work. If I find the solution I will open another issue.

**As a help for other Mac users want to build it themselfs**

If you try to `make` the glslViewer on MacOSX and it does not find the `glfw3` library, you have to export the path to it after install (maybe the path is different on your system):

```
export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig/
```

#### PDF build fails with xelatex missing on OSX

_By [Florian Bruggisser](https://github.com/cansik)_

Creating this PDF is really not for beginners. I started with my last post #12 . Now let's try to really build a pdf out of the .text file.


**Install xelatex**

The **parseBook.py** always told me:

```
Successful building of ./book.tex
pandoc: xelatex not found. xelatex is needed for pdf output.
Error in building of ./book.pdf
```

I couldn't find xelatex on brew so I asked google and google said, port it (it's a monster package):

```
sudo port install texlive-xetex
```

**Fix latex imports**

After installing it, let's try the building again:

```
Successful building of ./book.tex
pandoc: Could not find image `matrixes.png', skipping...
pandoc: Could not find image `warmerdam.jpg', skipping...
pandoc: Could not find image `tartan.jpg', skipping...
pandoc: Could not find image `ryoji-ikeda.jpg', skipping...
! LaTeX Error: File `lmodern.sty' not found.

Type X to quit or <RETURN> to proceed,
or enter new name. (Default extension: sty)

Enter file name: 
! Emergency stop.
<read *> 

l.3 \usepackage

pandoc: Error producing PDF from TeX source
Error in building of ./book.pdf
```

Thank you [University of Nebraska-Lincoln](http://mirror.unl.edu/ctan/fonts/lm/tex/latex/lm/lmodern.sty) because they were hosting the `lmodern.sty`. Now building again:

```
! LaTeX Error: File `etoolbox.sty' not found.
```

Fix it with [ctan.org/.../etoolbox](https://www.ctan.org/tex-archive/macros/latex/contrib/etoolbox?lang=en) and run it again...

**Fix Font support**

```
! Font EU1/lmr/m/n/10=[lmroman10-regular]:mapping=tex-text at 10.0pt not loadable: Metric (TFM) file or installed font not found.
```

Ok..come on! -.-

```
sudo port install texlive-fonts-recommended
```

**Fix bad parsing in .tmp files**

Wuhu, the font is now installed...but:

```
pandoc: Could not find image `matrixes.png', skipping...
pandoc: Could not find image `warmerdam.jpg', skipping...
pandoc: Could not find image `tartan.jpg', skipping...
pandoc: Could not find image `ryoji-ikeda.jpg', skipping...
! Unable to load picture or PDF file 'matrixes.png'.
<to be read again> 
                   }
l.2654 .../Matrix}{\includegraphics{matrixes.png}}
```

So maybe we have to care about the skipped files. Looks like there is something wrong..(or it's me not able to read md..) (maybe again a parsing error) (I'll fix this later...):

```markdown
[![Wikipedia entry for Matrix (mathematics) ](matrixes.png)](./08/https://en.wikipedia.org/wiki/Matrix)
```

Change it to in the relevant .tmp file in the chapter folders:

```markdown
[![Wikipedia entry for Matrix (mathematics) ](./08/matrixes.png)](https://en.wikipedia.org/wiki/Matrix)
```

Do this for every file which is skipped at the beginning! Now build it again...

Tadaaaaaaaaa! We've built the book of shaders! It's not perfect, some images overlay the text, but it's finally done.

_By [@MartinRGB](https://github.com/MartinRGB)_

Mac OS X Yosemite 10.12,to solve this,you need:

1. Deal with xelatex:

- Download [BasicTex](http://www.tug.org/mactex/morepackages.html) (only 72mb),then install the `.pkg` file
- in terminal, `tlmgr update --self`
- then `tlmgr install collection-fontsrecommended`

this part you can reference [here](https://pandoc.org/installing.html)

2. Define the path

- In terminal, `open -e ~/.bash_profile`
- add `export PATH=/Library/TeX/texbin:$PATH`, save & quit;
- in terminal, `source ~/.bash_profile`

this part you can reference [here](https://stackoverflow.com/questions/37208051/pandoc-xelatex-not-found-xelatex-is-needed-for-pdf-output)

3. 'Dimension is too large!'

If you `make` now, you will meet 'Dimension is too large' problem,the problem is happened in Folder 12

To solve this:

- Direct into Folder `12`, Choose all the image file, open in Preview app,
- Select all files, `Tools -> Adjust Size` (I set 50% scale)

4. Open terminal, `make` now, wait for a moments, you will find a pdf file in foder.
