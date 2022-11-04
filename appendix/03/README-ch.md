## 我怎样共创这本书？
感谢您愿意合作！ 您有很多方法可以参与其中：

- 翻译内容
- 改进 [```词汇表``` 部分](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary)
- 编辑内容
- 通过 [在线编辑器](http://editor.thebookofshaders.com/) 分享您的着色器示例到____

### 翻译内容

这本书是用 [Markdown 语言](https://daringfireball.net/projects/markdown/syntax) 编写的，因此很容易编辑和修改。

1. 首先请到 [位于 ```github.com/patriciogonzalezvivo/thebookofshaders``` github库](https://github.com/patriciogonzalezvivo/thebookofshaders)。 你会注意到内容在 ```README.md``` 和其他以大写字母命名的文件中，例如：```TITLE.md```、```SUMMARY.md``` 等。还要注意文件名称末尾的两个字母表示着它们所使用的语言，例如：```README-jp.md```、```README-es.md``` 等。

2. Fork这个库并将其克隆到您的计算机中。

3. 复制你要翻译的文件内容。 别忘了在你正在翻译的文件名末尾加上两个表示着它们所使用的语言的字母。

4. 逐行翻译内容（见**翻译须知**）。

5. 测试它 （见 **测试**）。

6. 推送到你自己的 github fork 然后发起一个 [Pull Request](https://help.github.com/articles/using-pull-requests/)

#### 翻译须知

不要擦除或修改嵌入的示例内容，示例如下：

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

or

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### 测试

开始在本地存储库文件夹中运行本地 PHP 服务器：

```bash
php -S localhost:8000
```

然后在您的浏览器中搜索 ```localhost:8000``` 转到您正在翻译的章节并添加 ```?lan=``` 后跟您用来标记您要翻译的语言的两个字母。

例如，如果你正在将章节 ```03``` 翻译成法语，你一直在使用文件 ```03/README-fr.md```，你可以通过以下方式对其进行测试： ``` http://localhost:8000/03/?lan=fr```

### 改进词汇表部分

本章节正在开发中。 我们很高兴听取您关于如何使其成为所有人的好工具的想法。 给我们发送消息到 [@bookofshaders](https://twitter.com/bookofshaders)。

### 编辑内容

我们都是人类。 如果您看到某些不对劲的地方，说出来并提出一个Pull Request或提交一个issue。 多谢！

### 分享你的着色器示例

您会看到很多指向 [在线编辑器](http://editor.thebookofshaders.com/) 的链接以及它的嵌入实例。
一旦您编写了让您感到自豪的代码，请单击“导出”（或 ```⇪``` 图标），然后复制“URL to code...”。 将其发送到 [@bookofshaders](https://twitter.com/bookofshaders) 或 [@kyndinfo](https://twitter.com/kyndinfo)。 我们期待看到它并将其添加到 [示例库部分](https://thebookofshaders.com/examples/)。
