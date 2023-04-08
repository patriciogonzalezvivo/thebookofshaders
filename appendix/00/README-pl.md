## Jak mogę korzystać z tej książki offline?

Powiedzmy, że masz przed sobą długą podróż i chcesz ją wykorzystać do nauczenia się kilku shaderów. W takim przypadku możesz zrobić lokalną kopię tej książki na swoim komputerze i uruchomić lokalny serwer.

Do tego potrzebujesz tylko PHP, Pythona 3 i Git'a. Na komputerach z systemem macOS i Raspberry Pi Python jest zainstalowany domyślnie, ale musisz jeszcze zainstalować PHP i klienta Git. W tym celu:

<!-- ## How can I navigate this book off-line?

Let’s say you have a long trip and you want to use it to teach yourself some shaders. In that case you can make a local copy of this book on your computer and run a local server.

For that you only need PHP, Python 3 and a git client. On MacOS and Raspberry Pi computers Python is installed by default but you still need to install PHP and a git client. For that: -->

Na **MacOSX** musisz mieć zainstalowane [homebrew](http://brew.sh/) by następnie w terminalu uruchomić:

```bash
brew update
brew upgrade
brew install git php
```

Na **Raspberry Pi** potrzebujesz [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), opartej na Debianie dystrybucji Linuxa, by następnie uruchomić:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer php
```

Gdy masz już wszystko zainstalowane wystarczy uruchomić:

<!-- Once you have everything installed you just need to do: -->

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Następnie otwórz swoją przeglądarkę na [`http://localhost:8000/`](http://localhost:8000/)
