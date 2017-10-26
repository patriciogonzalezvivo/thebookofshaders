![Due East over Shadequarter Mountain - Matthew Rangel (2005) ](rangel.jpg)

## 分形布朗运动（Fractal Brownian Motion）

噪声对不同的人来说有不同的意义。音乐家把它当成一种令人不安的声响，通信工程师把它当作干扰信号，天体物理学家把它看作宇宙微波背景辐射。这些概念吸引着我们去探索处处可见的随机性的物理原因。但是，让我们从更基础，也更简单的开始：波和波的属性。波就是某些属性随着时间波动变化。声波是气压的波动，电磁波是电场和磁场的波动。波的两个重要特征是振幅（amplitude）和频率（frequency）。一个简单的线性波（一维）的方程如下：

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = amplitude * sin(x * frequency);
"></div>

* 试着改变频率和振幅的值，理解他们如何影响波形。
* 使用造型函数，试着随时间改变振幅。
* 使用造型函数，试着随时间改变频率。

通过做后两个练习，你已经知道怎么“调节”一个正弦波。恭喜你，你刚刚创造了一个 AM（调幅）和 FM（调频）波！

波的另一个有趣的特性是可以相加，这一特性的正式说法叫叠加性。调一调下面几行代码，注意我们加上那些不同振幅和频率的正弦波的时候，总的波形是如何变化的。

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = sin(x * frequency);
float t = 0.01*(-u_time*130.0);
y += sin(x*frequency*2.1 + t)*4.5;
y += sin(x*frequency*1.72 + t*1.121)*4.0;
y += sin(x*frequency*2.221 + t*0.437)*5.0;
y += sin(x*frequency*3.1122+ t*4.269)*2.5;
y *= amplitude*0.06;
"></div>

* 试试改变加上去的波的振幅和频率。
* 有没有可能两个波正好相互抵消？如果是的话，会是什么样子？
* 有没有一种叠加波的方法，让他们互相放大？

从音乐理论上说，每个音符都和一个特定的频率相关联。这些音符和频率的关系遵从一定的模式，也就是我们所说的音阶，一个八度（octave）对应着频率上的加倍或减半。

现在，让我们把正弦波放在一边，想想 Perlin 噪声！Perlin 噪声的基本形式看起来和正弦波有点相似。它的振幅和频率有着某种变化，但振幅保持着合理的连续性，而且频率被限制在一个距离中心频率很小的范围内。尽管它不像正弦波那样规则，并且把几个不同缩放比例的 Perlin 噪声相加更容易制造出随机形态。把一些正弦波相加也是有可能制造随机形态的，但那需要很多不同的波叠加才能把他们的天生的周期性和规则性隐藏起来。

通过在循环（循环次数为 *octaves*，一次循环为一个八度）中叠加噪声，并以一定的倍数（*lacunarity*，间隙度）连续升高频率，同时以一定的比例（*gain*，增益）降低 **噪声** 的振幅，最终的结果会有更好的细节。这项技术叫“分形布朗运动（fractal Brownian Motion）”（*fBM*），或者“分形噪声（fractal noise）”，最简单的实现如下：

<div class="simpleFunction" data="// Properties
const int octaves = 1;
float lacunarity = 2.0;
float gain = 0.5;
//
// Initial values
float amplitude = 0.5;
float frequency = 1.;
//
// Loop of octaves
for (int i = 0; i < octaves; i++) {
&#9;y += amplitude * noise(frequency*x);
&#9;frequency *= lacunarity;
&#9;amplitude *= gain;
}"></div>

* 从 1 到 2，4，8，10 逐渐改变 octaves，看看会发生什么。
* 当 octaves 大于 4 时，尝试改变 lacunarity 的值。
* 当 octaves 大于 4 时，改变 gain 的值，看看会发生什么。

注意，随着我们一个八度接一个八度地往上叠加，曲线看起来有越来越多的细节，同时，自相似性也越来越明显。如果你放大看看，曲线的局部和整体看起来很相似，并且，任选两段不同的部分看起来也多少有些相似。这是一个数学上的分形的重要性质，我们在上面的循环中模拟了这个性质。我们不是要创造一个*真的*分形，因为我们在几次循环之后就不再往上叠加了，但理论上说，如果我们一直继续这个循环，不断地往上叠加噪声，就会得到一个真正的数学意义上的分形。在计算机图形领域，我们能处理的细节总是有极限的，比如物体比一个像素还小的时候，所以没有必要不断地往上叠加来制造分形的形态。有时候我们确实需要叠加很多次，但不必叠加无限次。

下面的示例代码就是 fBm 的二维实现，生成了分形图案：

<div class='codeAndCanvas' data='2d-fbm.frag'></div>

* 在 37 行减小八度（OCTAVES）的数量
* 在 47 行调试 fBm 的间隙度（lacumarity）
* 在 47 行调试 fBm 的增益（gain）

这项技术被广泛地应用于构造程序化风景。fBm 的自相似性能够很完美地模拟山脉，因为山脉形成过程中的腐蚀形成了这种不同尺度上的自相似性。如果你对此感兴趣，你一定要去看看 [Inigo Quiles 这篇关于高级噪声的文章](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm)。

![Blackout - Dan Holdsworth (2010)](holdsworth.jpg)

使用相同的技术，也可以获得其他效果，比如**湍流**（turbulence）效果。它本质上是一个 fBm，但是由一个有符号噪声的绝对值构成，从而在函数中创建了尖锐的山谷。

```glsl
for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * abs(snoise(st));
    st *= 2.;
    amplitude *= .5;
}
```

<a href="../edit.php#13/turbulence.frag"><img src="turbulence-long.png"  width="520px" height="200px"></img></a>

这个算法家族中的另一个成员是**山脊**（ridge），就是把凹下去的山谷翻上来，从而制造山脊：

```glsl
    n = abs(n);     // create creases
    n = offset - n; // invert so creases are at top
    n = n * n;      // sharpen creases
```

<a href="../edit.php#13/ridge.frag"><img src="ridge-long.png"  width="520px" height="200px"></img></a>

这个算法的另外一个变种，把噪声分量乘起来（而不是叠加），可以创造一些很有用的东西。另外一个方法是，根据前一次循环中的噪声来缩放后续的噪声。当我们这样做的时候，我们已经走出严格的分形定义了，走入了一个叫“多重分形”的未知领域。多重分形虽不是按数学方式严格定义，但这并不意味着它的用处会更少些。 实际上，用多重分形模拟生成地形在商业软件中非常常见。要了解更多，你可以去读 Kenton Musgrave 的“Texturing and Modeling: a Procedural Approach”（第三版）的 16 章。很可惜，这本书几年前已经绝版，不过你还可以从图书馆和二手市场找到。（网上有卖这本书第一版的 PDF 版，但是别去买——只是浪费钱，是 1994 年的版本，不包括第三版包含的地形建模的部分。）

### 域翘曲（Domain Warping）

[Inigo Quiles 写了另一篇有趣的文章](http://www.iquilezles.org/www/articles/warp/warp.htm)，关于如何用 fBm 来扭曲 fBm 空间。很有意思，不是吗？这就像《盗梦空间》里的梦中梦。

![ f(p) = fbm( p + fbm( p + fbm( p ) ) ) - Inigo Quiles (2002)](quiles.jpg)

下面的代码展示了这项技术的一个不那么极端的例子，用它生成类似云一样的纹理。注意自相似性如何表现在结果中。

<div class='codeAndCanvas' data='clouds.frag'></div>

用这种方法用噪声扭曲纹理坐标非常有用，非常有趣，也极难掌握。这是个很强大的工具，但要想用好它需要一些经验。一个有用的办法是，用噪声的导数（梯度）替换坐标。[Ken Perlin 和 Fabrice Neyret 的一篇非常著名的“流噪声”](http://evasion.imag.fr/Publications/2001/PN01/)就是以这个想法为基础。一些现代的 Perlin 噪声的实现不但计算噪声，还计算它的解析梯度。如果“真实”梯度对过程化函数来说不便计算，你总是可以计算出数值梯度来逼近它，尽管没那么精确而且要花费更多工夫。
