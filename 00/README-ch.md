# 关于这本书
## 引言

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

上面两幅图是由不同的方式制成的。第一张是梵高一层一层徒手画出来的，需要花费些时间。第二张则是用 4 个像素矩阵分秒钟生成的：一个青色，一个品红，一个黄色，和一个黑色矩阵。关键的区别在于第二张图是用非序列方式实现的（即不是一步一步实现，而是多个同时进行）。

这本书是关于这个革命性的计算机技术，片段着色器（fragment shaders），它将数字生成的图像提到了新的层次。你可以把它看做当年的古腾堡印刷术。

![Gutenberg's press](gutenpress.jpg)

Fragment shaders（片段着色器）可以让你控制像素在屏幕上的快速渲染。这就是它在各种场合被广泛使用的原因，从手机的视频滤镜到酷炫的的3D视频游戏。

![Journey by That Game Company](journey.jpg)

在接下来的章节你会发现这项技术是多么难以置信地快速和强大，还有如何将它应用到专业的和个人的作品中。


## 这本书是为谁而写的？

这本书是写给有代码经验和线性代数、三角学的基本知识的创意编程者、游戏开发者和工程师的，还有那些想要提升他们的作品的图像质量到一个令人激动的新层次的人。（如果你想要学习编程，我强烈推荐你先学习[Processing](https://processing.org/)，等你玩起来processing，再回来看这个）。

这本书会教你如何使用 shaders（着色器）并把它整合进你的项目里，以提升作品的表现力和图形质量。因为GLSL（OpenGL的绘制语言）的shaders 在很多平台都可以编译和运行，你将可以把在这里学的运用到任何使用OpenGL, OpenGL ES 和 WebGL 的环境中。也就是说，你将可以把学到的知识应用到[Processing](https://processing.org/)，[openFrameworks](http://openframeworks.cc/)，[Cinder](http://libcinder.org/)，[Three.js](http://threejs.org/)和iOS/Android游戏中。


## 这本书包含哪些内容？

这本书专门关于 GLSL pixel shaders。首先我们会给出shaders的定义；然后我们会学习如何制作程序里的形状，图案，材质，和与之相关的动画。你将会学到基础的着色语言并把它们应用到有用的情景中，比如：图像处理（图像运算，矩阵卷积，模糊，颜色滤镜，查找表及其他效果）和模拟（Conway 的生命游戏，Gray-Scott 反应扩散，水波，水彩效果，Voronoi 细胞等等）。到书的最后我们将看到一系列基于光线跟踪（Ray Marching）的进阶技术。

**每章都会有可以玩的交互的例子。**当你改动代码的时候，你会立刻看到这些变化。一些概念可能会晦涩难懂，而这些可交互的例子会对你学习这些材料非常有益。你越快把这些代码付诸实践，你学习的过程就会越容易。

这本书里不包括的内容有：

* 这**不是**一本 openGL 或 webGL 的书。OpenGL/webGL 是一个比GLSL 或 fragment shaders 更大的主题。如果你想要学习 openGL/webGL 推荐看： [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (也被叫做红宝书) 或 [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)
。

* 这**不是**一本数学书。虽然我们会涉及到很多关于线代和三角学的算法和技术，但我们不会详细解释它。关于数学的问题我推荐手边备一本：[3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) 或 [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers)。

## 开始学习需要什么准备？

没什么。如果你有可以运行 WebGL 的浏览器（像Chrome，Firefox或Safari）和网络，点击页面底端的“下一章”按钮就可以开始了。

此外，基于你有的条件或需求你可以：

* [制作一个离线版的本书](https://thebookofshaders.com/appendix/00/?lan=ch)

* [用不带浏览器的树莓派来运行书中示例](https://thebookofshaders.com/appendix/01/?lan=ch)

* [做一个PDF版的书用于打印](https://thebookofshaders.com/appendix/02/?lan=ch)

* 用[github仓库](https://github.com/patriciogonzalezvivo/thebookofshaders)来帮助解决问题和分享代码
