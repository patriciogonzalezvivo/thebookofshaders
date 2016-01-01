# Generative designs
# ジェネラティブデザイン

It is not a surprise that after so much repetition and order the author is forced to bring some chaos.

繰り返しと秩序を十分に堪能したので、今度は多少の混沌を持ち込んでみましょう。

## Random
## ランダム

[![Ryoji Ikeda - test pattern (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

Randomness is a maximal expression of entropy. How can we generate randomness inside the seemingly predictable and rigid code environment?

ランダムはエントロピーが最大になった状態です。一見規則正く厳格なコードの世界で、どのようにしてランダムな要素を生成することができるのでしょうか。

Let's start by analyzing the following function:

下記の関数を検討することから始めましょう。

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Above we are extracting the fractional content of a sine wave. The [```sin()```](../glossary/?search=sin) values that fluctuate between ```-1.0``` and ```1.0``` have been chopped behind the floating point, returning all positive values between ```0.0``` and ```1.0```. We can use this effect to get some pseudo-random values by "breaking" this sine wave into smaller pieces. How? By multiplying the resultant of [```sin(x)```](../glossary/?search=sin) by larger numbers. Go ahead and click on the function above and start adding some zeros.

ここではサイン波から小数点部分を取り出しています。```-1.0``` から ```1.0``` の間を往復する [```sin()```](../glossary/?search=sin) の値から、小数点の後ろだけを切り取ると```0.0``` から ```1.0```の間の正の値だけが残ります。これを利用し、さらにサイン波を細かな部分に分割することで擬似的にランダムな値を得ることができます。

どうすればよいのでしょう。[```sin(x)```](../glossary/?search=sin) の結果の値に大きな数を掛けてみます。上の関数をクリックして 0 を幾つか書き加えてみましょう。

By the time you get to ```100000.0``` ( and the equation looks like this: ```y = fract(sin(x)*100000.0)``` ) you aren't able to distinguish the sine wave any more. The granularity of the fractional part has corrupted the flow of the sine wave into pseudo-random chaos.

```100000.0```　に至る頃には（式は ```y = fract(sin(x)*100000.0)``` のようになります）もうサインカーブには見えなくなっているでしょう。小数点部分のサイクルは非常に短くなり、サイン波の流れるような曲線は潰されてランダムにしか見えないカオス状態を作り出しています。


## Controlling chaos
## カオスを制御する

Using random can be hard; it is both too chaotic and sometimes not random enough. Take a look at the following graph. To make it, we are using a ```rand()``` function which is implemented exactly like we describe above.

乱数を使いこなすのは難しいこともあります。無秩序すぎることも、十分にランダムでないこともあります。下記のグラフを見てください。このグラフは、上での述べた通りの方法で実装した ```rand()``` 関数を使って作られています。

Taking a closer look, you can see the [```sin()```](../glossary/?search=sin) wave crest at ```-1.5707``` and  . I bet you now understand why - it's where the maximum and minimum of the sine wave happens.

よく見ると ```-1.5707``` と ```-1.5707``` のあたりに小さな裂け目のようなものがあるのが分かるでしょう。これは[```sin()```](../glossary/?search=sin) の描く波が最大と最小になる場所です。

If look closely at the random distribution, you will note that the there is some concentration around the middle compared to the edges.

乱数の分布に注目すると、端にくらべて中央に値が集中しているのが分かるでしょう。


<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

A while ago [Pixelero](https://pixelero.wordpress.com) published an [interesting article about random distribution](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/). I've added some of the functions he uses in the previous graph for you to play with and see how the distribution can be changed. Uncomment the functions and see what happens.

以前に[Pixelero](https://pixelero.wordpress.com)は[ランダムな値の分布についての興味深い記事](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/)を公開しました。この記事から、上記のグラフに幾つかの関数を加えておきました。どのように値の分布が変化するか試してみてください。関数のコメントを外して何が起こるか見てみましょう。

If you read [Pixelero's article](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/), it is important to keep in mind that our ```rand()``` function is a deterministic random, also known as pseudo-random. Which means for example ```rand(1.)``` is always going to return the same value. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) makes reference to the ActionScript function ```Math.random()``` which is non-deterministic; every call will return a different value.

[Pixeleroの記事](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/)を読むときには、ここで私たちが作った ```rand()``` 関数は擬似ランダムとも呼ばれる、決定的な（結果の値が一意に定まる）乱数だということを覚えておくことが重要です。例えば ```rand(1.)``` は常に同じ値を返します。[Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/)が引き合いにしているのはActionScriptの ```Math.random()``` で、これは非決定的な、つまり毎回異なる値を返す関数です。


## 2D Random
## 2Dランダム

Now that we have a better understanding of randomness, it's time to apply it in two dimensions, to both the ```x``` and ```y``` axis. For that we need a way to transform a two dimensional vector into a one dimensional floating point value. There are different ways to do this, but the [```dot()```](../glossary/?search=dot) function is particulary helpful in this case. It returns a single float value between ```0.0``` and ```1.0``` depending on the alignment of two vectors.

ランダムの性質についての理解が深まったところで、次に二次元、つまり ```x``` 軸と ```y``` 軸の両方に、適用してみましょう。そのためには、二次元ベクトルを、一次元の浮動小数点の値に変換することが必要です。いろいろなやり方がありますが、[```dot()```](../glossary/?search=dot) 関数は特に便利です。 [```dot()```](../glossary/?search=dot) 関数は2つのベクトルの組に対して、```0.0``` から ```1.0``` の間の浮動小数点の値を返してくれます。

（訳注：値が ```0.0``` から ```1.0``` の間に収まるには2つのベクトルが正規化されている必要があります。下記のサンプルではベクトルは正規化されていないので ```dot``` の戻り値は 1.0 を大きく超えます。）

<div class="codeAndCanvas" data="2d-random.frag"></div>

Take a look at lines 13 to 15 and notice how we are comparing the ```vec2 st``` with another two dimensional vector ( ```vec2(12.9898,78.233)```).

13行目から15行目を見てみてみましょう。```vec2 st``` ともう1つの二次元ベクトルである ( ```vec2(12.9898,78.233)```) の使われかたに注目してください。

* Try changing the values on lines 14 and 15. See how the random pattern changes and think about what we can learn from this.

* 14行目と15行目の値を変えてみましょう。ランダム・パターンがどのように変化したか観察し、そこから何が学べるか考えてみましょう。


* Hook this random function to the mouse interaction (```u_mouse```) and time (```u_time```) to understand better how it works.

* このランダム関数の仕組みをより理解するために、マウスのインタラクション (```u_mouse```) と時間 (```u_time```) に反応させてみましょう。

## Using the chaos
## カオスを使いこなす

Random in two dimensions looks a lot like TV noise, right? It's a hard raw material to use to compose images. Let's learn how to make use of it.

二次元のランダムは、まるでテレビのノイズのようですね。この未加工な素材からイメージを作り出すのはことは簡単ではありません。ここでは、素材の料理方法を学んでいきましょう。

Our first step is to apply a grid to it; using the [```floor()```](../glossary/?search=floor) function we will generate an integer table of cells. Take a look at the following code, especially lines 22 and 23.

まずは最初のステップとして、グリッドを適用してみましょう。 [```floor()```](../glossary/?search=floor) 関数を使って、 整数の表を作り出します。下記のコードの、特に21行目と22行目を見てみてください。

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

After scaling the space by 10 (on line 21), we separate the integers of the coordinates from the fractional part. We are familiar with this last operation because we have been using it to subdivide a space into smaller cells that go from ```0.0``` to ```1.0```. By obtaining the integer of the coordinate we isolate a common value for a region of pixels, which will look like a single cell. Then we can use that common integer to obtain a random value for that area. Because our random function is deterministic, the random value returned will be constant for all the pixels in that cell.

空間座標を 10 倍に拡大した後に後に（21行目）、座標の整数部分を小数点部分から切り離します。続く23行目の処理は、前章で空間を```0.0``` から ```1.0``` の座標値を持つ小さな部分に分けるときに使ったお馴染みの方法です。
座標から整数を取り出すことによって、それぞれのセル（描画領域を 10×10 に分割したマス目）に含まれるピクセルに共通の値を取り出します。
そして、そのセルについてランダムな値を得るために、この共通な整数を使います。ここで使っているランダム関数は決定性のものなので、戻り値はそのセルの全てのピクセルに対し同じのものになります。

Uncomment line 29 to see that we preserve the floating part of the coordinate, so we can still use that as a coordinate system to draw things inside each cell.

座標の小数点部分も保持されていることを、29行目のコメントを外して確認しましょう。こうして、それぞれのセルの内部でもさらに座標系を用いて描画することができます。

Combining these two values - the integer part and the fractional part of the coordinate - will allow you to mix variation and order.

これら2つの値、つまり座標の整数部分と端数部分を組み合わせることで、変化と秩序を混ぜ合わせることができます。

Take a look at this GLSL port of the famouse ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10``` maze generator.

有名な [```10 PRINT CHR$(205.5+RND(1)); : GOTO 10```](https://www.google.com/search?q=10+PRINT+CHR%24(205.5%2BRND(1))%3B+%3A+GOTO+10) 迷路ジェネレーターのGLSL版を見てみましょう。

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

Here I'm using the random values of the cells to draw a line in one direction or the other using the ```truchetPattern()``` function from the previous chapter (lines 41 to 47).

ここでは、前章の```truchetPattern()``` 関数と、セルのランダム関数を合わせて用い、あっちに行ったりこっちに行ったりする線を描いています。(41行目から47行目)。

You can get another interesting pattern by uncommenting the block of lines between 50 to 53, or animate the pattern by uncommenting lines 35 and 36.
50行目から53行目までのコメントを外すと、もう1つの興味深いパターンを見ることができます。また、35行目と36行目のコメントを外すことで、パターンに動きを与えることができます。

## Master Random
## ランダムを極める

[池田亮司](http://www.ryojiikeda.com/), Japanese electronic composer and visual artist, has mastered the use of random; it is hard not to be touched and mesmerized by his work. His use of randomness in audio and visual mediums is forged in such a way that it is not annoying chaos but a mirror of the complexity of our technological culture.

日本の電子音楽家でありビジュアルアーティストである[Ryoji Ikeda](http://www.ryojiikeda.com/)は、ランダムの扱い方に熟達しています。彼の作品は感動的で魅力的なものです。彼が音とビジュアルの領域でランダムな要素を使う様は、いらだたされるような無秩序を生み出すのではなく、現代テクノロジー文化の複雑さを鏡のように映し出すかのように構築されています。

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Take a look at [Ikeda](http://www.ryojiikeda.com/)'s work and try the following exercises:

[池田亮司](http://www.ryojiikeda.com/)の作品をよく観察しながら、下記の課題に挑戦しましょう。

* Make rows of moving cells (in opposite directions) with random values. Only display the cells with brighter values. Make the velocity of the rows fluctuate over time.

* ランダムな値を用いて、（反対の方向に）動くセルの列をつくってみましょう。より明るい値のセルのみを表示させてみましょう。列の速さを、時間とともに変化させてみましょう。

<a href="../edit.html#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* Similarly make several rows but each one with a different speed and direction. Hook the position of the mouse to the threshold of which cells to show.

* 同様に、違う方向に違うスピードで動くいくつかの列をつくってみましょう。どのセルを表示させるかの閾値として、マウスの位置情報を適用してみましょう。

<a href="../edit.html#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Create other interesting effects.

* 他にも面白いエフェクトを作ってみましょう。

<a href="../edit.html#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

Using random aesthetically can be problematic, especially if you want to make natural-looking simulations. Random is simply too chaotic and very few things look ```random()``` in real life. If you look at a rain pattern or a stock chart, which are both quite random, they are nothing like the random pattern we made at the begining of this chapter. The reason? Well, random values have no correlation between them what so ever, but most natural patterns have some memory of the previous state.

美しい表現のためにランダムを用いても、上手くいかないことがあります。自然に見えるシミュレーションをつくりたいと思っているときは特にそうです。ランダムは単純に無秩序すぎて、現実世界には ```random()``` に見えるものはほんの少ししかありません。雨の様子や株価のチャートはどちらもとても不規則なものですが、私たちがこの章の始めに生成したランダムとはまったく似つかないものです。なぜでしょう。ランダムの値はそれぞれの値の間にまったく相関性をもっていないのに対し、多くの自然界のパターンには過去の状態の記憶が含まれているからです。

In the next chapter we will learn about noise, the smooth and *natural looking* way of creating computational chaos.

次の章ではノイズ、つまり、計算によって生み出されるスムーズで自然に見えるカオスについて学びます。
