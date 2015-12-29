# Generative designs
# ジェネラティブデザイン

It is not a surprise that after so much repetition and order the author is forced to bring some chaos.

*いいまわし検討* so much な繰り返しと秩序の後では[筆者|作者]がいくらかの混沌を持ち込まざるを得なくなるとしても驚くには値しません。
*いいまわし２* 繰り返しと秩序を何回もやってみた後に、[筆者|作者]がある程度のカオスを持ち込まざるをえなくなることは、驚きではありません。

## Random
## ランダム

[![Ryoji Ikeda - test pattern (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)
（訳注：池田亮司を「ランダム」でくくることに抵抗があるという意見を各方面からいただきましたが、翻訳なのでそのままにしておきます。）

Randomness is a maximal expression of entropy. How can we generate randomness inside the seemingly predictable and rigid code environment?
ランダムはエントロピーが最大になった状態を表します。一見規則正く厳格なコードの世界、どのようにしてランダムな要素を生成することができるのでしょうか。

Let's start by analyzing the following function:
下記の関数を検討することから始めましょう。

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Above we are extracting the fractional content of a sine wave. The [```sin()```](../glossary/?search=sin) values that fluctuate between ```-1.0``` and ```1.0``` have been chopped behind the floating point, returning all positive values between ```0.0``` and ```1.0```. We can use this effect to get some pseudo-random values by "breaking" this sine wave into smaller pieces. How? By multiplying the resultant of [```sin(x)```](../glossary/?search=sin) by larger numbers. Go ahead and click on the function above and start adding some zeros.

ここではサイン波から小数点部分を取り出しています。```-1.0``` から ```1.0``` の間を往復する [```sin()```](../glossary/?search=sin) の値から、```0.0``` から ```1.0``` の間の正の値だけが残るように小数点の後ろだけを切り取っています。サイン波を細かな部分に分割することで擬似的にランダムな値を得るために、これを応用することができます。どういうことでしょう。[```sin(x)```](../glossary/?search=sin) の結果の値に大きな数を掛けます。上の関数をクリックして 0 を幾つか書き加えてみましょう。

By the time you get to ```100000.0``` ( and the equation looks like this: ```y = fract(sin(x)*100000.0)``` ) you aren't able to distinguish the sine wave any more. The granularity of the fractional part has corrupted the flow of the sine wave into pseudo-random chaos.

```100000.0```　に至る頃には（式は ```y = fract(sin(x)*100000.0)``` のようになります）もうサインカーブには見えなくなっているでしょう。小数点部分は非常に細かくなり、サイン波の流れるカーブは潰されて混沌とした擬似的なランダム状態を作り出しています。



## Controlling chaos
## カオスを制御する

Using random can be hard; it is both too chaotic and sometimes not random enough. Take a look at the following graph. To make it, we are using a ```rand()``` function which is implemented exactly like we describe above.

乱数を使いこなすのは易しいことではありません。無秩序すぎることも、十分にランダムでないこともあります。下記のグラフを見てください。このグラフは、上での述べた通りの方法で実装した ```rand()``` 関数を使って作られています。

Taking a closer look, you can see the [```sin()```](../glossary/?search=sin) wave crest at ```-1.5707``` and  . I bet you now understand why - it's where the maximum and minimum of the sine wave happens.

よく見ると [```sin()```](../glossary/?search=sin) の描く波が ```-1.5707``` と ```-1.5707``` で頂点を迎えています。お分かりですね。これは波が最大値と最小値になる場所です。*talking about "crests" doesn't make much sense here. Better mention the tiny gaps around +PI/2 and -PI/2 and explain why this happens, i.e. these are where the crest of the sine curve are?*

If look closely at the random distribution, you will note that the there is some concentration around the middle compared to the edges.

乱数の分布に注目すると、端にくらべて中央に値が集中しているのが分かるでしょう。


<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

A while ago [Pixelero](https://pixelero.wordpress.com) published an [interesting article about random distribution](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/). I've added some of the functions he uses in the previous graph for you to play with and see how the distribution can be changed. Uncomment the functions and see what happens.

以前に[Pixelero](https://pixelero.wordpress.com)は[ランダムな分布についての興味深い記事](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/)を公開しました。上記のグラフにこの記事から幾つかの関数を加えておいたので、どのように値の分布が変化するか試してみてください。関数のコメントを外して何が起こるか見てみましょう。

If you read [Pixelero's article](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/), it is important to keep in mind that our ```rand()``` function is a deterministic random, also known as pseudo-random. Which means for example ```rand(1.)``` is always going to return the same value. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) makes reference to the ActionScript function ```Math.random()``` which is non-deterministic; every call will return a different value.

[Pixeleroの記事](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/)を読むときには、ここで作った ```rand()``` 関数は擬似ランダムとも呼ばれる、決定的（結果の値が一意に定まる）乱数だということを覚えておくことが重要です。これはつまり、例えば ```rand(1.)``` は常に同じ値を返すということです。[Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/)が引き合いに出しているのはActionScriptの ```Math.random()``` で、これは非決定的な、つまり毎回異なる値を返す関数です。


## 2D Random
## 2D ランダム

Now that we have a better understanding of randomness, it's time to apply it in two dimensions, to both the ```x``` and ```y``` axis. For that we need a way to transform a two dimensional vector into a one dimensional floating point value. There are different ways to do this, but the [```dot()```](../glossary/?search=dot) function is particulary helpful in this case. It returns a single float value between ```0.0``` and ```1.0``` depending on the alignment of two vectors.

ランダムな要素についてよく理解できたと思います。それでは次に、２次元、つまり ```x``` 軸と ```y``` 軸の両方に、応用してみましょう。そのためには、２次元ベクトルを、１次元の浮動小数点の値に変換することが必要です。いろいろなやり方がありますが、[```dot()```](../glossary/?search=dot) 関数は特に役に立ちます。 ２つのベクトルの配置に従って、 ```0.0``` と ```1.0``` の間の浮動小数点の値を戻してくれます。

<div class="codeAndCanvas" data="2d-random.frag"></div>

Take a look at lines 13 to 15 and notice how we are comparing the ```vec2 st``` with another two dimensional vector ( ```vec2(12.9898,78.233)```).

13行目から15行目を見てみてみましょう。```vec2 st``` ともう１つの二次元ベクトルである ( ```vec2(12.9898,78.233)```) をどのように比べることができるか注目してください。

* Try changing the values on lines 14 and 15. See how the random pattern changes and think about what we can learn from this.

* 14行目と15行目の値を変えてみましょう。ランダム・パターンがどのように変化したか観察し、そこから何が学べるか考えてみましょう。

* Hook this random function to the mouse interaction (```u_mouse```) and time (```u_time```) to understand better how it works.

* このランダム関数を、マウスのインタラクション (```u_mouse```) と時間 (```u_time```) に適応させてみることは、どのように動くかについてのよりよい理解につながります。

## Using the chaos
## カオスを使う

Random in two dimensions looks a lot like TV noise, right? It's a hard raw material to use to compose images. Let's learn how to make use of it.

２次元のランダムは、テレビのノイズのようですよね。未加工な材料からイメージをつくりだしていくことは簡単ではありません。これから、それをどのように使うのか学んでいきましょう。

Our first step is to apply a grid to it; using the [```floor()```](../glossary/?search=floor) function we will generate an integer table of cells. Take a look at the following code, especially lines 22 and 23.

まずは最初のステップとして、グリッドを適用してみましょう。 [```floor()```](../glossary/?search=floor) 関数を使って、 セルの整数テーブルを生成します。下記のコードの、特に22行目と23行目を見てみてください。

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

After scaling the space by 10 (on line 21), we separate the integers of the coordinates from the fractional part. We are familiar with this last operation because we have been using it to subdivide a space into smaller cells that go from ```0.0``` to ```1.0```. By obtaining the integer of the coordinate we isolate a common value for a region of pixels, which will look like a single cell. Then we can use that common integer to obtain a random value for that area. Because our random function is deterministic, the random value returned will be constant for all the pixels in that cell.

*いいまわし検討* 空間を10ごとに区切った後に(21行目)、座標の整数部分を小数点部分から切り離します。この最後の演算はなじみ深いものです。なぜなら、```0.0``` から ```1.0``` に進む小さなセルに空間を細分するときに、それを使ったからです。座標から整数を取り出すことで、単体のセルに見えるピクセル達の範囲のために共通値を分離します。そして、そのエリアのためのランダムな値を得るために、共通な整数を使うことができます。ここで使っているランダム関数は決定性のものなので、返ってくるランダムな値は、そのセルの全てのピクセルに対し一定のものになります。

Uncomment line 29 to see that we preserve the floating part of the coordinate, so we can still use that as a coordinate system to draw things inside each cell.

*いいまわし検討* 29行目のコメントを外すと、座標軸の小数点部分を保持できます。このようにすることで、座標システムをそれぞれのセルの内部に描写することに使いつづけることができます。

Combining these two values - the integer part and the fractional part of the coordinate - will allow you to mix variation and order.

これら２つの値、つまり座標の整数部分と端数部分を結合することで、変化と秩序を混ぜあわすことができます。

Take a look at this GLSL port of the famouse ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10``` maze generator.

有名な ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10``` の迷路ジェネレーターのGLSLポートを見てみましょう。

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

Here I'm using the random values of the cells to draw a line in one direction or the other using the ```truchetPattern()``` function from the previous chapter (lines 41 to 47).

ここでは、以前の章に出て来た```truchetPattern()``` 関数とともに、セルのランダム関数を用いて、あっちに行ったりこっちに行ったりするラインを描いています。(41行目から47行目)。

You can get another interesting pattern by uncommenting the block of lines between 50 to 53, or animate the pattern by uncommenting lines 35 and 36.
50行目から53行目までのコメントを外すと、他の興味深いパターンを見ることができます。また、35行目と36行目を外すことで、パターンに動きを与えることができます。

## Master Random
## ランダムを熟達する

[Ryoji Ikeda](http://www.ryojiikeda.com/), Japanese electronic composer and visual artist, has mastered the use of random; it is hard not to be touched and mesmerized by his work. His use of randomness in audio and visual mediums is forged in such a way that it is not annoying chaos but a mirror of the complexity of our technological culture.

*若干意訳* 日本の電子音楽家でありビジュアルアーティストである[Ryoji Ikeda](http://www.ryojiikeda.com/)は、ランダムの扱い方に熟達しています。彼の作品は大変魅力的です。彼は、音とビジュアル領域でランダムな要素を用いて、いらだたされるような無秩序を生み出すのではなく、現代テクノロジー文化の複雑さを鏡野ように映し出し、世界のアート表現の先端を切りひらいています。

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Take a look at [Ikeda](http://www.ryojiikeda.com/)'s work and try the following exercises:

[Ryoji Ikeda](http://www.ryojiikeda.com/)さんの作品をよく観察しながら、下記のエクササイズをやってみましょう。

* Make rows of moving cells (in opposite directions) with random values. Only display the cells with brighter values. Make the velocity of the rows fluctuate over time.

* ランダムな値を用いて、（反対の方向に）動くセルの列をつくってみましょう。より明るい値のセルのみを表示させてみましょう。列の速さを、時間とともに変化させてみましょう。

<a href="../edit.html#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* Similarly make several rows but each one with a different speed and direction. Hook the position of the mouse to the threshold of which cells to show.

* 同様に、いくつかの列をつくってみましょう。ただし、今度は、違うスピードと方向にしてみます。どのセルを表示させるかの閾値として、マウスの位置情報を適用してみましょう。

<a href="../edit.html#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Create other interesting effects.

* 何か他の興味深いエフェクトをつくりだしてみましょう。

<a href="../edit.html#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

Using random aesthetically can be problematic, especially if you want to make natural-looking simulations. Random is simply too chaotic and very few things look ```random()``` in real life. If you look at a rain pattern or a stock chart, which are both quite random, they are nothing like the random pattern we made at the begining of this chapter. The reason? Well, random values have no correlation between them what so ever, but most natural patterns have some memory of the previous state.

審美的にランダムを用いることには、疑問の余地がないとは言えません。特に、自然に見えるシミュレーションをつくりたいと思っているときはなおさらです。（コンピューターで生成する）ランダムは無秩序すぎるものであり、現実世界においてはごく少数のものだけが ```random()``` に見えるのです。雨の模様や株価のチャートはどちらもとてもランダムなものだと言えますが、私たちがこの章の始めに生成したランダムとはまったく似つかないものです。その理由は、（コンピューターで生成する）ランダムの値はまったく相関性をもっていないことに対し、多くの自然界で見られるパターンには過去の状態のメモリーが含まれているからです。

In the next chapter we will learn about noise, the smooth and *natural looking* way of creating computational chaos.

次の章では、ノイズ - つまり、コンピューターから生み出されるスムーズで *自然に見える* カオス - について学びます。
