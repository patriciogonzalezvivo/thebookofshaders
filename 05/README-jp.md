# Algorithmic drawing
# アルゴリズムで絵を描く

## Shaping functions
## シェーピング関数

This chapter could be named "Mr. Miyagi's fence lesson." Previously, we mapped the normalized position of *x* and *y* to the *red* and *green* channels. Essentially we made a function that takes a two dimensional vector (x and y) and returns a four dimensional vector (r, g, b and a). But before we go further transforming data between dimensions we need to start simpler... much simpler. That means understanding how to make one dimensional functions. The more energy and time you spend learning and mastering this, the stronger your shader karate will be.

この章は[「ミヤギさんの壁塗りレッスン」](https://ja.wikipedia.org/wiki/%E3%83%99%E3%82%B9%E3%83%88%E3%83%BB%E3%82%AD%E3%83%83%E3%83%89)とでもすれば良かったかもしれません。三章では正規化したx座標とy座標の値をr（赤）とg（緑）のチャンネルに割り当てました。これはつまり二次元のベクトル（xとy）を受け取って四次元のベクトル（r、g、b、a）を返す関数です。But before we go further transforming data between dimensions we need to start simpler... much simpler.一次、元の関数を理解することから始めます。時間と労力を惜しまずこれをマスターすればその分だけあなたのシェーダー空手は強くなります。

![ベスト・キッド（1984）](mr_miyagi.jpg)

The following code structure is going to be our fence. In it, we visualize the normalized value of the *x* coordinate (```st.x```) in two ways: one with brightness (observe the nice gradient from black to white) and the other by plotting a green line on top (in that case the *x* value is assigned directly to *y*). Don't focus too much on the plot function, we will go through it in more detail in a moment.

下記のコードstructureがミヤギさんの壁です。これから正規化されたX座標の値を2種類の方法で目に見えるようにしてみます。1つめは明るさを使い（黒から白への綺麗なグラデーションを見てください）、2つめでは緑色の線を描画しています（ここではX座標の値をそのままY座標に割り当てています）。plot関数のことは今はあまり気にしないでください。すぐ後で詳しく説明します。

<div class="codeAndCanvas" data="linear.frag"></div>

**Quick Note**: The ```vec3``` type constructor "understands" that you want to assign the three color channels with the same value, while ```vec4``` understands that you want to construct a four dimensional vector with a three dimensional one plus a fourth value (in this case the value that controls the alpha or opacity). See for example lines 20 and 26 above.

上記のサンプルの20行目と26行目を見てください。
```vec3```型のコンストラクタは、値を1つだけ受け取ると3つの色のチャンネルに同じ値を割りてようとしているのだと理解してくれます。また```vec4```は三次元のベクトルともう一つの値（ここではalpha、つまり透明度）で初期化されています。

This code is your fence; it's important to observe and understand it. You will come back over and over to this space between *0.0* and *1.0*. You will master the art of blending and shaping this line.

これがミヤギさんの壁です。よく観察して理解しておきましょう。この*0.0*から*1.0*の空間には何度も立ち戻ってくることになります。そして混色と成形の奥義をマスターするのです。

This one-to-one relationship between  *x* and *y* (or the brightness) is know as *linear interpolation*. From here we can use some mathematical functions to *shape* the line. For example we can raise *x* to the power of 5 to make a *curved* line.

このx座標と明るさ、またはX座標とY座標の1対1の対応は線形補間と呼ばれています。ここからは数学的な関数を使って形を作っていきます。例えばXを5乗すると曲線を作ることができます。

<div class="codeAndCanvas" data="expo.frag"></div>

Interesting, right? On line 19 try different exponents: 20.0, 2.0, 1.0, 0.0, 0.2 and 0.02 for example. Understanding this relationship between the value and the exponent will be very helpful. Using these types of mathematical functions here and there will give you expressive control over your code, a sort of data acupuncture that let you control the flow of values.

面白いでしょう？ 19行目の指数を変えて試してみましょう。例えば値を20.0, 2.0, 1.0, 0.0, 0.2, 0.0にしてみます。この値と指数の関係を理解しておくと役に立ちます。こういった数学的な関数を色々な場所で用いることで、コードを表現豊かに操ることができるようになります。データの流れを制御する針の技といったところです。

[```pow()```](../glossary/?search=pow) is a native function in GLSL and there are many others. Most of them are accelerated at the level of the hardware, which means if they are used in the right way and with discretion they will make your code faster.

GLSLの多くのネイティブ関数が用意されており、[```pow()```](../glossary/?search=pow)はその一つです。ほとんどのネイティブ関数はハードウェアで高速に処理されるので、よく考えて正しく使えばコードをより速くすることができます。

Replace the power function on line 19. Try other ones like: [```exp()```](../glossary/?search=exp), [```log()```](../glossary/?search=log) and [```sqrt()```](../glossary/?search=sqrt). Some of these functions are more interesting when you play with them using PI. You can see on line 5 that I have defined a macro that will replace any call to ```PI``` with the value ```3.14159265359```.

19行目の指数関数を置き換えてみましょう。他の例、例えば[```exp()```](../glossary/?search=exp)、[```log()```](../glossary/?search=log)、[```sqrt()```](../glossary/?search=sqrt)などを試してみましょう。このうちの幾つかはPI（パイ、円周率）を使うとより面白くなります。5行目に```PI```の呼び出しを```3.14159265359```に置き換えるマクロを定義しておきました。

### Step and Smoothstep
### StepとSmoothstep

GLSL also has some unique native interpolation functions that are hardware accelerated.
GLSLは他にもいくつかハードウェアで高速に処理される組み込みの補間関数を持っています。

The [```step()```](../glossary/?search=step) interpolation receives two parameters. The first one is the limit or threshold, while the second one is the value we want to check or pass. Any value under the limit will return ```0.0``` while everything above the limit will return ```1.0```.

[```step()```](../glossary/?search=step)補完は2つのパラメーターを受け取ります。1つめは境界または閾値で、2つめはこの関数によってチェックされる値です。境界より小さい値は全て```0.0```を返し、境界以上の値は```1.0```を返します。

Try changing this threshold value on line 20 of the following code.
下記のコードの20行めの閾値を変えて試してみてください。

<div class="codeAndCanvas" data="step.frag"></div>

The other unique function is known as [```smoothstep()```](../glossary/?search=smoothstep). Given a range of two numbers and a value, this function will interpolate the value between the defined range. The two first parameters are for the beginning and end of the transition, while the third is for the value to interpolate.

もう1つ[```smoothstep()```](../glossary/?search=smoothstep)と呼ばれる関数があります。2つの数値からなる範囲と1つの値を受け取ると、この関数はその範囲の間の値を補完します。最初の2つのパラメータは変化の起こる範囲の始まりと終わりで、3つめのパラメータは補完される値です。

<div class="codeAndCanvas" data="smoothstep.frag"></div>

In the previous example, on line 12, notice that we’ve been using smoothstep to draw the green line on the ```plot()``` function. For each position along the *x* axis this function makes a *bump* at a particular value of *y*. How? By connecting two [```smoothstep()```](../glossary/?search=smoothstep) together. Take a look at the following function, replace it for line 20 above and think of it as a vertical cut. The background does look like a line, right?

上記の例の12行めでは、smoothstepが```plot()```関数の中で緑色の線を描画するために使われています。この関数はx軸に沿った各点で特定のyの値に対して急激に高い値を返します。どうなっているのでしょう。2つの [```smoothstep()```](../glossary/?search=smoothstep)を組み合わせています。下記の関数を見てください。この関数で上の20行目を置き換えて、結果を垂直の断面だと考えてみましょう。背景が線のように見えるでしょう？
（訳注：ここの説明はちょっと分かりにくいですね。plot関数を理解するには12行めの引き算の片側を消して```smoothstep( pct-0.02, pct, st.y)```もしくは```smoothstep( pct, pct+0.02, st.y)```だけにしてみるのも良いと思います。）

```glsl
    float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
```

### Sine and Cosine
### サインとコサイン

When you want to use some math to animate, shape or blend values, there is nothing better than being friends with sine and cosine.

数学を使ってアニメーションや形を作ったり値を組み合わせたりしたいのであれば、サインとコサインに親しんでおくに越したことはありません。

These two basic trigonometric functions work together to construct circles that are as handy as MacGyver’s Swiss army knife. It’s important to know how they behave and in what ways they can be combined. In a nutshell, given an angle (in radians) they will return the correct position of *x* ([cosine](../glossary/?search=cos)) and *y* ([sine](../glossary/?search=sin)) of a point on the edge of a circle with a radius equal to 1. But, the fact that they return normalized values (values between -1 and 1) in such a smooth way makes them an incredible tool.

この２つの基本的な三角関数を一緒に使うと円を作ることができます。[冒険野郎マクガイバー](https://ja.wikipedia.org/wiki/%E5%86%92%E9%99%BA%E9%87%8E%E9%83%8E%E3%83%9E%E3%82%AF%E3%82%AC%E3%82%A4%E3%83%90%E3%83%BC)のスイスアーミーナイフ並みに便利です。この２つの関数がどのように振る舞い、どのように組み合わせることができるのかを知っておくことが大事です。簡単に言うと、これらの関数は（ラジアンを単位として）角度を受け取り、半径を1とする円周上の点のx座標 ([cosine](../glossary/?search=cos)) とy座標([sine](../glossary/?search=sin)) を返します。滑らかに変化する正規化された値（-1から1の間の値）を返す性質のおかげでこれらの関数は驚くほど便利な道具になります。


![](sincos.gif)

While it's difficult to describe all the relationships between trigonometric functions and circles, the above animation does a beautiful job of visually summarizing these relationships.

<div class="simpleFunction" data="y = sin(x);"></div>

Take a careful look at this sine wave. Note how the *y* values flow smoothly between +1 and -1. As we saw in the time example in the previous chapter, you can use this rhythmic behavior of [```sin()```](../glossary/?search=sin) to animate properties. If you are reading this example in a browser you will see that the you can change the code in the formula above to watch how the wave changes. (Note: don't forget the semicolon at the end of the lines.)

Try the following exercises and notice what happens:

* Add time (```u_time```) to *x* before computing the ```sin```. Internalize that **motion** along *x*.

* Multiply *x* by ```PI``` before computing the ```sin```. Note how the two phases **shrink** so each cycle repeats every 2 integers.

* Multiply time (```u_time```) by *x* before computing the ```sin```. See how the **frequency** between phases becomes more and more compressed. Note that u_time may have already become very large, making the graph hard to read.

* Add 1.0 to [```sin(x)```](../glossary/?search=sin). See how all the wave is **displaced** up and now all values are between 0.0 and 2.0.

* Multiply [```sin(x)```](../glossary/?search=sin) by 2.0. See how the **amplitude** doubles in size.

* Compute the absolute value ([```abs()```](../glossary/?search=abs)) of ```sin(x)```. It looks like the trace of a **bouncing** ball.

* Extract just the fraction part ([```fract()```](../glossary/?search=fract)) of the resultant of [```sin(x)```](../glossary/?search=sin).

* Add the higher integer ([```ceil()```](../glossary/?search=ceil)) and the smaller integer ([```floor()```](../glossary/?search=floor)) of the resultant of [```sin(x)```](../glossary/?search=sin) to get a digital wave of 1 and -1 values.

### Some extra useful functions

At the end of the last exercise we introduced some new functions. Now it’s time to experiment with each one by uncommenting the lines below one at a time. Get to know these functions and study how they behave. I know, you are wondering... why? A quick google search on "generative art" will tell you. Keep in mind that these functions are our fence. We are mastering the movement in one dimension, up and down. Soon, it will be time for two, three and four dimensions!

![Anthony Mattox (2009)](anthony-mattox-ribbon.jpg)

<div class="simpleFunction" data="y = mod(x,0.5); // return x modulo of 0.5
//y = fract(x); // return only the fraction part of a number
//y = ceil(x);  // nearest integer that is greater than or equal to x
//y = floor(x); // nearest integer less than or equal to x
//y = sign(x);  // extract the sign of x
//y = abs(x);   // return the absolute value of x
//y = clamp(x,0.0,1.0); // constrain x to lie between 0.0 and 1.0
//y = min(0.0,x);   // return the lesser of x and 0.0
//y = max(0.0,x);   // return the greater of x and 0.0 "></div>

### Advance shaping functions

[Golan Levin](http://www.flong.com/) has great documentation of more complex shaping functions that are extraordinarily helpful. Porting them to GLSL is a really smart move, to start builidng your own resource of snippets of code.

* [Polynomial Shaping Functions: www.flong.com/texts/code/shapers_poly](http://www.flong.com/texts/code/shapers_poly/)

* [Exponential Shaping Functions: www.flong.com/texts/code/shapers_exp](http://www.flong.com/texts/code/shapers_exp/)

* [Circular & Elliptical Shaping Functions: www.flong.com/texts/code/shapers_circ](http://www.flong.com/texts/code/shapers_circ/)

* [Bezier and Other Parametric Shaping Functions: www.flong.com/texts/code/shapers_bez](http://www.flong.com/texts/code/shapers_bez/)

Like chefs that collect spices and exotic ingredients, digital artists and creative coders have a particular love of working on their own shaping functions.

[Iñigo Quiles](http://www.iquilezles.org/) has a great collection of [useful functions](http://www.iquilezles.org/www/articles/functions/functions.htm). After reading [this article](http://www.iquilezles.org/www/articles/functions/functions.htm) take a look at the following translation of these functions to GLSL. Pay attention to the small changes required, like putting the "." (dot) on floating point numbers and using the GLSL name for *C functions*; for example instead of ```powf()``` use ```pow()```:

* [Impulse](../edit.html#05/impulse.frag)
* [Cubic Pulse](../edit.html#05/cubicpulse.frag)
* [Exponential Step](../edit.html#05/expstep.frag)
* [Parabola](../edit.html#05/parabola.frag)
* [Power Curve](../edit.html#05/pcurve.frag)

To keep your motivation up, here is an elegant example (made by [Danguafer](https://www.shadertoy.com/user/Danguafer)) of mastering the shaping-functions karate.

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/XsXXDn?gui=true&t=10&paused=true" allowfullscreen></iframe>

In the *Next >>* chapter we will start using our new moves. First with mixing colors and then drawing shapes.

#### Exercise

Take a look at the following table of equations made by [Kynd](http://www.kynd.info/log/). See how he is combining functions and their properties to control the values between 0.0 and 1.0. Now it's time for you to practice by replicating these functions. Remember the more you practice the better your karate will be.

![Kynd - www.flickr.com/photos/kynd/9546075099/ (2013)](kynd.png)

#### For your toolbox

Here are some tools that will make it easier for you to visualize these types of functions.

* Grapher: if you have a MacOS computer, type ```grapher``` in your spotlight and you'll be able to use this super handy tool.

![OS X Grapher (2004)](grapher.png)

* [GraphToy](http://www.iquilezles.org/apps/graphtoy/): once again [Iñigo Quilez](http://www.iquilezles.org) made a tool to visualize GLSL functions in WebGL.

![Iñigo Quilez - GraphToy (2010)](graphtoy.png)

* [Shadershop](http://tobyschachman.com/Shadershop/): this amazing tool created by [Toby Schachman](http://tobyschachman.com/) will teach you how to construct complex functions in an incredible visual and intuitive way.

![Toby Schachman - Shadershop (2014)](shadershop.png)
