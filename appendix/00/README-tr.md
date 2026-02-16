## Bu kitapta çevrimdışı nasıl gezinirim?

Diyelim ki uzun bir yolculuğunuz var ve bunu kendinize shader öğretmek için kullanmak istiyorsunuz. Bu durumda bu kitabın yerel bir kopyasını bilgisayarınıza yapabilir ve yerel bir sunucu çalıştırabilirsiniz.

Bunun için yalnızca PHP, Python 3 ve bir git istemcisine ihtiyacınız var. MacOS ve Raspberry Pi bilgisayarlarında Python varsayılan olarak yüklüdür ancak yine de PHP ve git istemcisi yüklemeniz gerekir. Bunun için:

**MacOSX**'te [homebrew](http://brew.sh/) yüklü olduğundan emin olun ve ardından terminalinizde şunları yapın:

```bash
brew update
brew upgrade
brew install git php
```

**Raspberry Pi**'da, Raspberry Pi için yapılmış Debian tabanlı bir Linux dağıtımı olan [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)'ı edinmeniz ve ardından şunları yapmanız gerekir:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer php
```

Her şey yüklendikten sonra yapmanız gereken tek şey:

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Ardından tarayıcınızı [`http://localhost:8000/`](http://localhost:8000/) adresine açın
