## Как напечатать книгу?

Допустим, вам не нужна навигация по тексту или взаимодействие с примерами, и вы хотите просто почитать книгу на пляже или по пути в город. В таком случае вы можете напечатать книгу.


#### Установка glslViewer

Чтобы напечатать книгу, её нужно сначала распарсить. Для этого потребуется [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer) - консольный инструмент, который скомпилирует примеры шейдеров и преобразует их в изображения.

На **MacOSX** убедитесь, что у вас есть [homebrew](http://brew.sh/), и выполните в терминале следующее:

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

На **Raspberry Pi** установите [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) - дистрибутив Linux  для Raspberry Pi, основанный на Debian, и выполните:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Установка Python 3, Latex Engine и Pandoc

Для разбора Markdown-разметки параграфов в Latex и затем в PDF, воспользуемся Xetex и Pandoc.

На **MacOSX**:

Скачайте и установите [basictex & MacTeX-Additions](http://www.tug.org/mactex/morepackages.html), затем установите [Pandoc](http://johnmacfarlane.net/pandoc/) и Python с помощью команды:

```bash
brew install pandoc python2.7
```

На **Raspberry Pi** (Raspbian):

```bash
sudo apt-get install texlive-xetex pandoc python2.7
```

#### Компиляция книги в pdf и печать

Когда всё необходимое установлено, склонируйте [репозиторий книги](https://github.com/patriciogonzalezvivo/thebookofshaders) и скомпилируйте её:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make
```

Если всё прошло хорошо, вы увидите файл `book.pdf`, который можно прочитать на любом устройстве или распечатать.
