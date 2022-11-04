## 如何在树莓派上运行示例程序？

几年前，假设每个人都有一台有图形处理单元的计算机是一个大胆的想法。 现在，大多数计算机都有 GPU，但对于工作坊或课堂的要求来说，这仍然是个很高的标准。

多亏了 [树莓派基金会](http://www.raspberrypi.org/)， 一种新型的小型廉价计算机（每台约35美元）已被引入课堂。更重要的是，就本书的需求而言，[树莓派](http://www.raspberrypi.org/)配备了一个不错的可以直接从控制台访问的Broadcom GPU。我做了一个 [叫作**glslViewer**的灵活的GLSL实时编程工具](https://github.com/patriciogonzalezvivo/glslViewer)，它可以运行这本书里全部的示例。当用户保存对其代码的更改时，该编程工具还具有自动更新的能力。这是啥意思？ 就是说，你可以编辑着色器，每次保存时，着色器都会重新编译并渲染。

通过制作本书的本地副本（详情见上一章节） 并 [安装好`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer)，用户可以使用`glslviewer`运行示例。此外，通过使用  `-l` 标志，它们可以在你用任何文本编辑器（例如 `nano`， `pico`， `vi`， `vim` 或 `emacs`)来修改代码的时候在屏幕角落渲染示例。如果用户通过ssh或sftp协议连接，这也有效。

在树莓派上装完 [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)——一个为树莓派开发的基于Debian的Linux发行版本——之后，要在树莓派上装好搞好这一切，只需要登陆系统，输入如下指令：

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
