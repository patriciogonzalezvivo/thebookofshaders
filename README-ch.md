<canvas id="custom" class="canvas" data-fragment-url="examples/moon.frag" data-textures="examples/images/moon-texture.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*by [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/)*

这是一本关于 Fragment Shaders（片段着色器）的入门指南，它将一步一步地带你领略其中的纷繁与抽象。

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## 关于翻译
这本书是 Patricio 的 the Book of Shaders 的中文翻译。我们希望借此将 Shader 这个有趣有益的工具介绍给更多国人。能力所限，不免有误，如有翻译不当，也请多多指出。

感谢 Patricio 对我们的翻译的信任和支持。

## 目录

* [关于这本书](00/?lan=ch)

* 开始
    * [什么是片段着色器（Fragment Shader）？](01/?lan=ch)
    * [“Hello world!”](02/?lan=ch)
    * [Uniforms值](03/?lan=ch)
    * [运行你的 shader](04/?lan=ch)

* 用算法绘画
    * [造型函数](05/?lan=ch)
    * [颜色](06/?lan=ch)
    * [形状](07/?lan=ch)
    * [矩阵](08/?lan=ch)
    * [图案](09/?lan=ch)

* 生成设计
    * [随机](10/?lan=ch)
    * [噪声](11/?lan=ch)
    * [网格噪声](12/?lan=ch)
    * [分形布朗运动](13/?lan=ch)
    * 分形

* 图像处理:
    * 纹理
    * 图像处理
    * 卷积核
    * 滤镜
    * 其他效果

* 模拟
    * 乒乓
    * Conway生命游戏
    * 水波
    * 水彩
    * 反应扩散

* 3D 图形
    * 灯光
    * 法线贴图
    * 凹凸贴图
    * 光线跟踪（Ray marching）
    * 环境贴图 (spherical and cube)
    * 折射和反射

* [附录:](appendix/?lan=ch) 其他阅读本书的方式
	* [如何离线阅读此书?](appendix/00/?lan=ch)
	* [如何在树莓派上运行示例程序?](appendix/01/?lan=ch)
	* [如何打印这本书](appendix/02/?lan=ch)
	* [我怎样共创这本书](appendix/03/?lan=ch)
    * [给那些从JS语言过来的人的介绍](appendix/04/?lan=ch) by [Nicolas Barradeau](http://www.barradeau.com/)

* [example gallery](examples/?lan=ch)

* [词汇表](glossary/?lan=ch)


## 关于作者

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, 布宜诺斯艾利斯, 阿根廷) 是一个驻地纽约的艺术家、开发者。他致力于探索有机和人造、模拟信号和数字信号、个体和整体之间的空间。他用代码这种富有表达力的语言来创造更美好的事物。

Patricio 研习和实践精神疗法（psychotherapy）和表达性艺术治疗（expressive art therapy）。他毕业于 Parsons 的设计与科技专业，且目前执教于此。目前他作为 Mapzen 的图形开发工程师制作一些开源的 mapping tool。

<div class="header"><a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

## 关于译者

* [tornote](https://github.com/tornoteli) 翻译 00-05 及第 11 章。

* [Artrustee](https://github.com/Artrustee) 翻译 06-10 章。

后续章节作者仍在撰写中，如果感兴趣可以在 github 上查看部分后续章节代码。

## 致谢

感谢我的妻子 [Jen Lowe](http://www.datatelling.com/), 感谢她无条件的支持、帮助以及编辑此书。

感谢 [Scott Murray](http://alignedleft.com/) 给予的启发和建议。

感谢 [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) 和 [Sawako](https://twitter.com/sawakohome) 的 [日文版翻译(日本語訳)](?lan=jp)

感谢 [Tong Li](https://www.facebook.com/tong.lee.9484) 和 [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) 的 [中文版(Chinese)](?lan=ch) 翻译。

感谢 [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) 的 [韩文版 (한국어)](?lan=kr) 翻译。

感谢 Nahuel Coppero (Necsoft) 的 [西班牙语(español)](?lan=es) 翻译。

感谢 [Manoylov Andriy](https://twitter.com/ManoylovAC) 的 [乌克兰语(українська)](?lan=ua) 翻译。

感谢 [Karim Naaji](http://karim.naaji.fr/) 在代码和想法上的支持和贡献。

感谢所有相信这个项目的人[contributed with fixes](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) 以及大家的捐赠.

## 获取新的章节

注册以获得最新章节， 或 在 [Twitter](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone) 上关注：

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>
