## Come posso consultare questo libro offline?

Diciamo che si dispone di un lungo viaggio e si desidera usarlo per imparare da soli alcuni shaders. In questo caso è possibile effettuare una copia locale di questo libro sul computer ed eseguire un server locale.

Per questo è necessario solo Python 3 e un client git. Sui computer MacOS e Raspberry Pi, Python è installato di default, ma è comunque necessario installare un client git. Per fare ciò:

Su **MacOSX** siate sicuri di avere installato [homebrew](http://brew.sh/) e quindi sul terminale fate:

```bash
brew update
brew upgrade
brew install git
```

Su **Raspberry Pi** è necessario fare:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

Una volta che avete installato tutto, non vi resta che fare:

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Quindi aprite il browser e inserite [```http://localhost:8000/```](http://localhost:8000/)
