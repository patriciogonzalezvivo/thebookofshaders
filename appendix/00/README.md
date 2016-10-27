## How can I navigate this book off-line?

Let’s say you have a long trip and you want to use it to teach yourself some shaders. In that case you can make a local copy of this book on your computer and run a local server.

For that you only need Python 2.6 and a git client. On MacOS and Raspberry Pi computers Python is installed by default but you still need to install a git client. For that:

In **MacOSX** be sure to have [homebrew](http://brew.sh/) installed and then on your terminal do:

```bash
brew update
brew upgrade
brew install git 
```

On **Raspberry Pi** you need to do:

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