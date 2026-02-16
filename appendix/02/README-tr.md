## Bu kitabı nasıl yazdırabilirim?

Diyelim ki örneklerle gezinmek veya etkileşim kurmak istemiyorsunuz ve sadece sahilde veya şehre yolculuğunuzda okuyabileceğiniz güzel eski moda bir ders kitabı istiyorsunuz. Bu durumda bu kitabı yazdırabilirsiniz.


#### glslViewer kurulumu

Bu kitabı yazdırmak için önce onu ayrıştırmanız gerekir. Bunun için shader örneklerini derleyip görüntülere dönüştürecek bir konsol shader aracı olan [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer)'a ihtiyacınız olacak.

**MacOSX**'te [homebrew](http://brew.sh/) yüklü olduğundan emin olun ve ardından terminalinizde şunları yapın:

```bash
brew install glslviewer
```

**Raspberry Pi**'da, Raspberry Pi için yapılmış Debian tabanlı bir Linux dağıtımı olan [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)'ı edinip ardından şunları yapmanız gerekir:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Python 3, Latex Motoru ve Pandoc kurulumu

Markdown bölümlerini Latex'e ve ardından PDF dosyasına ayrıştırmak için Xetex Latex Motorunu ve Pandoc'u kullanacağız.

**MacOSX**'te:

MacTeX'i indirip kurun:

```bash
brew install --cask mactex-no-gui
```

ardından [Pandoc](http://johnmacfarlane.net/pandoc/) ve Python 3'ü kurun:

```bash
brew install pandoc python
```

**Raspberry Pi** (Raspbian)'da:

```bash
sudo apt-get install texlive-xetex pandoc python2.7
```

#### Kitabı pdf'e derleyin ve yazdırın

İhtiyacınız olan her şeye sahip olduğunuza göre, [bu kitabın deposunu](https://github.com/patriciogonzalezvivo/thebookofshaders) klonlamanın ve kitabı derlemenin zamanı geldi.

Bunun için terminalinizi tekrar açın ve yazın:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean pdf
```

Her şey yolunda giderse, favori cihazınızda okuyabileceğiniz veya yazdırabileceğiniz bir `book.pdf` dosyası göreceksiniz.

#### Kitabı e-okuyucu için epub formatında derleyin

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean epub
```

Oluşturulan `book.epub` doğrudan kullanılabilir veya bir dönüştürücü kullanılarak Kindle ile kullanım için `.mobi` dosyasına dönüştürülebilir, örneğin Calibre.
