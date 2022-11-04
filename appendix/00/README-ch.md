## 如何离线阅读此书？

假如你在计划一次长途旅行，并且你打算通过此书在旅途中自学一些着色器相关的知识。在这种情况下，你在你的电脑上可以搞一份本地版的这本书，并运行一个本地服务器。

要这么搞的话你只需要PHP，Python 3以及一个git客户端。在MacOS和树莓派设备上，Python已经预装好了，但是你仍然需要自行安装PHP和一个git客户端。具体操作如下：

在 **MacOSX** 上请确保你已经安装了 [homebrew](http://brew.sh/) 然后在你的终端上输入如下指令：

```bash
brew update
brew upgrade
brew install git php
```

在 **树莓派** 上请确保你已经安装了 [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), 一个为树莓派开发的基于Debian的Linux发行版本，然后执行如下指令：

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer php
```

一旦你把一切装好之后你只需要这么做：

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

然后打开你的浏览器，打开 [`http://localhost:8000/`](http://localhost:8000/)
