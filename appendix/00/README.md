## How can I navigate this book off-line?

Let’s say you have a long trip and you want to use it to teach yourself some shaders. In that case you can make a local copy of this book on your computer and run a local server.

For that you only need PHP, Python 3 and a git client. On MacOS and Raspberry Pi computers Python is installed by default but you still need to install PHP and a git client. For that:

On **MacOSX** be sure to have [homebrew](http://brew.sh/) installed and then on your terminal do:

```bash
brew update
brew upgrade
brew install git php
```

On **Raspberry Pi** you need to get [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), a Debian-based Linux distribution made for Raspberry Pi and then do:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer php
```

Once you have everything installed you just need to do:

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Then open your browser to [`http://localhost:8000/`](http://localhost:8000/)
