## 如何打印这本书？

假设你不想浏览示例或与示例进行交互，而只想要一本绝佳的、老派的、可以在海滩上或通勤到城市的路上阅读的纸质书。在这种情况下，你可以把这本书打印出来。


#### 安装glslViewer

要打印这本书，你首先需要对其进行转换。为此，你会需要 [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer)——一个控制台着色器工具，它将编译着色器示例并将其转换为图像。

在 **MacOSX** 上请确保你已经安装了 [homebrew](http://brew.sh/) 然后在你的终端上输入如下指令：

```bash
brew install glslviewer
```

在 **树莓派** 上请确保你已经安装了 [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), 一个为树莓派开发的基于Debian的Linux发行版本，然后执行如下指令：

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### 安装Python 3，Latex Engine和Pandoc

为了将 Markdown 章节解析为 Latex，然后转换为PDF文件，我们将使用 Xetex Latex Engine 和 Pandoc。

在 **MacOSX** 上：

下载并安装 MacTeX ：

```bash
brew cask install mactex-no-gui
```

然后安装 [Pandoc](http://johnmacfarlane.net/pandoc/) 和 Python 3:

```bash
brew install pandoc python
```

在 **树莓派** （Raspbian）上:

```bash
sudo apt-get install texlive-xetex pandoc python2.7
```

#### 将书编译成pdf并打印

现在您已经拥有了所需的一切，是时候克隆 [本书的库](https://github.com/patriciogonzalezvivo/thebookofshaders) 并编译本书了。

为此，请再次打开你的终端并输入：

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean pdf
```

如果一切顺利，你将看到一个 `book.pdf` 文件，你可以在自己喜欢的设备上阅读或打印该文件。

#### 将书编译成 epub 以供电子阅读器使用

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean epub
```

生成的 `book.epub` 可以直接使用，也可以使用转换器（例如 Calibre）转换为 `.mobi` 文件以供 Kindle 阅读。
