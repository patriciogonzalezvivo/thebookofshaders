## Patterns 图案

因为着色器按一个个像素执行，那么无论你重复一个图形多少次，计算的数量仍然是个常数。

[ ![Nina Warmerdam - The IMPRINT Project (2013)](warmerdam.jpg) ](../edit.php#09/dots5.frag)

本章中我们将综合我们目前所学的并应用在画布上。和前几章一样，我们的策略依然基于乘以空间坐标（0到1之间），这样我们的画的在0到1之间的图形就会重复地形成网格。

*"网格提供一种基于人的直觉发明事物的框架，并且可以颠覆。自然的混沌肌理提供一种对比和秩序的迹象。从早期罗马浴场里的陶瓷图案到几何镶嵌，人们那时候就习惯用网格来点缀他们的生活。"*[*10 PRINT*, Mit Press, (2013)](http://10print.org/)

首先让我们记住 [```fract()```](../glossary/?search=fract) 函数。它返回一个数的分数部分，本质上是除1的余数（[```mod(x,1.0)```](../glossary/?search=mod)）。换句话说， [```fract()```](../glossary/?search=fract) 返回小数点后的数。 我们单位化的坐标系变量 (```st```) 已经是 0.0 到 1.0 之间的了。所以像下面这么做并没有必要：

```glsl
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
    st = fract(st);
	color = vec3(st,0.0);
	gl_FragColor = vec4(color,1.0);
}
```

但如果我们放大单位化坐标系 — 比如说3倍 — 我们会得到三组 0 到 1 的线性插值的数列：第一组在 0-1 之间，第二组浮点数在 1-2 之间以及第三组在 2-3 之间的浮点数。

<div class="codeAndCanvas" data="grid-making.frag"></div>

现在是时候在子空间（网格单元的空间）里画点什么了。取消27行的注释。（因为我们等比例放大了x和y坐标，所以不会改变坐标的比例，图形会和预期的一样。）

试试下面的练习来深入理解：

* 把空间乘以不同的数。试试用浮点数，还有分别给x和y不同的系数。

* 把这个平铺技巧做成一个可以反复使用的函数。

* 把画布分成 3 行 3 列。 指出如何定义行和列的线程的，并用这种方式改变显示着的图形。试着做一个井字棋。

### 在图案内部应用矩阵

鉴于每个细分或者说单元都是我们正在使用的单位化坐标系的小单元，我们可以对每个内部空间施以矩阵变换来平移，旋转和缩放。

<div class="codeAndCanvas" data="checks.frag"></div>

* 想想怎么让这些图案有趣的动起来。考虑颜色，形状，运动的变换。做三种动画。

* 通过组合不同的形状重新创造更复杂的图案。

<a href="../edit.php#09/diamondtiles.frag"><canvas id="custom" class="canvas" data-fragment-url="diamondtiles.frag"  width="520px" height="200px"></canvas></a>

* 结合多层图案来制作你自己的 [Scottish Tartan Patterns](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns).

[ ![Vector Pattern Scottish Tartan By Kavalenkava](tartan.jpg) ](http://graphicriver.net/item/vector-pattern-scottish-tartan/6590076)

### 偏移图案

So let's say we want to imitate a brick wall. Looking at the wall, you can see a half brick offset on x in every other row. How we can do that?

假如我们想要模仿砖墙。看，下面的墙，你是不是看到一半的砖在x方向上偏移了一半砖的长度，没隔一行偏移一次。我们如何实现？

![](brick.jpg)

第一步我们需要知道某行的线程是奇数还是偶数，以为我们可以通过奇偶来决定是否要在x方向上偏移那一行。

____我们需要两段来解决这个问题____

要判断我们的线程是一个奇数行或者偶数行，我们要用 ```2.0``` 的 [```mod()```](../glossary/?search=mod) 。 然后根据结果是否大于 ```1.0``` 来判断。看一下下面的函数，取消最后两行的注释。

<div class="simpleFunction" data="y = mod(x,2.0);
// y = mod(x,2.0) < 1.0 ? 0. : 1. ;
// y = step(1.0,mod(x,2.0));"></div>

正如你所见，我们可以用一个 [三元算符号](https://en.wikipedia.org/wiki/%3F:) （第二行）来检查 ```2.0``` 的[```mod()```](../glossary/?search=mod)（余数）小于 ```1.0``` 或者类似地，我们用 [```step()```](../glossary/?search=step)  函数做相同的操作，但（其实）更快。为什么呢？ 因为虽然要知道每个显卡如何优化和编译代码并不容易，但是可以安全地假设内置函数总比非内置的函数快。任何时候你都以调用内置函数，干嘛不用呢！

现在我们有这些找出奇数的方程，这样我们就可以给奇数行一个偏移量，然后就可以把 *砖块* 做出拼砖的效果。下面代码的第14行便是我们用来“侦测”奇数行，并予之半个单位在x上的偏移的。注意到对偶数行，函数的返回值是 ```0.0```， ```0.0``` 乘以 ```0.5``` 得到一个 ```0.0``` 的偏移。 但是奇数行我们用函数的返回值， ```1.0```， 乘以偏移量 ```0.5```，这样便向坐标系的 ```x``` 轴偏移了 ```0.5```。  

现在试着取消32行的注释 — 拉伸长宽比来模仿“现代砖块”的长宽比。通过取消第40行的的代码，你可以注意到坐标系统是如何看起来映射到红绿色的。

<div class="codeAndCanvas" data="bricks.frag"></div>

* 试着根据时间变化对偏移量做动画。

* 另做一个动画，让偶数行向左移，奇数行向右移动。

* 能不能根据列重复这样的效果？

* 试着结合 ```x``` 和 ```y``` 轴的偏移来得到下面这样的效果：

<a href="../edit.php#09/marching_dots.frag"><canvas id="custom" class="canvas" data-fragment-url="marching_dots.frag"  width="520px" height="200px"></canvas></a>

## Truchet 瓷砖

目前我们学了如何区分奇数行/列或偶数行/列，（类似的），（我们也）可能再用（这个技巧）根据位置来设计元素。 考虑到 [Truchet Tiles](http://en.wikipedia.org/wiki/Truchet_tiles) 的例子，即一个单一设计元素可以以四种不同的方式呈现：

![](truchet-00.png)

通过改变对角瓷砖的图案，便可能组成无限种复杂设计的可能。

![](truchet-01.png)

仔细观察 ```rotateTilePattern()``` 函数, 它把坐标空间细分成四个单元并赋予每一个旋转值。

<div class="codeAndCanvas" data="truchet.frag"></div>

* 注释，取消注释，以及复制第69到72行来创作新的设计。

* 把黑白三角变成其他元素，例如：半圆，旋转的方形或直线。

* 编写根据元素自身位置旋转的图形代码。

* 创作一个根据其位置改变其他属性的图案。

* 想想其他能用这章原理的案例，不一定是图案. (例: 易经卦)

<a href="../edit.php#09/iching-01.frag"><canvas id="custom" class="canvas" data-fragment-url="iching-01.frag"  width="520px" height="200px"></canvas></a>

## 制定自己的规则

制作程序图案是种寻找最小可重复元素的古老练习（灵修）。我们作为长时间使用网格和图案来装饰织物、地面和物品的镶边物种：从古希腊的弯曲图案，到中国的窗栅设计，重复和变化的愉悦吸引我们的想象。花些时间浏览 [decorative](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) [patterns](https://www.pinterest.com/patriciogonzv/paterns/) 并看看在漫长的历史里，艺术家和设计师是如何寻找在秩序的预测性和（由）混沌和衍变（产生）的惊奇之间的边界的。从阿拉伯几何图案，到斑斓的非洲编制艺术，这里有一整个图案的宇宙要学习。

![Franz Sales Meyer - A handbook of ornament (1920)](geometricpatters.png)

这章我们就结束算法绘图部分了。在接下来的章节，我们会学习如何把熵（其实就是混乱和随机的意思）加入到我们的着色器中来产生生成设计。
