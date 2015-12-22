## Patterns
## パターン

Since shader programs are executed by pixel-by-pixel no matter how much you repeat a shape the number of calculations stays constant. This means that fragment shaders are particulary suitable for tile patterns.

シェーダーのプログラムはピクセルごとに処理するので同じ形を何度も繰り替えしたとしても計算の回数は一定に止まります。このことからフラグメントシェーダーはタイルのようなパターンに特に適していると言えます。

[ ![Nina Warmerdam - The IMPRINT Project (2013)](warmerdam.jpg) ](../edit.html#09/dots5.frag)

In this chapter we are going to apply what we've learned so far and repeat it along a canvas. Like in previous chapters, our strategy will be based on multiplying the space coordinates (between 0.0 and 1.0), so that the shapes we draw between the values 0.0 and 1.0 will be repeated to make a grid.

この章ではこれまでに学んだことを生かし、描画領域のなかで繰り返していきます。前章で行ったのと同様に、空間座標に対して掛け算を行い、0.0から1.0の間に掛かれた図形がグリッド状に繰り返されるようにします。

*"The grid provides a framework within which human intuition and invention can operate and that it can subvert. Within the chaos of nature, regular patterns provide a constrast and promise of order. From early patterns on pottery to geometric mosaics in Roman baths, people have long used grids to enhance their lives with decoration."* [*10 PRINT*, Mit Press, (2013)](http://10print.org/)

*「グリッドは人間の直感と創意が働く枠組み、構築と解体のためのフレームワークを提供します。
自然界のカオスの中に、規則的なパターンは対比と秩序の兆しをもたらします。
草創期の陶芸品の模様からローマ時代の浴場の幾何学的なモザイクまで、長い間人々はグリッドを用い生活を豊かに彩ってきました。」*[*10 PRINT*, Mit Press, (2013)](http://10print.org/)
（訳注：そのまま訳すのが難しい文章だったため、本人に意図を確認して言葉を補いました。）

First let's remember the [```fract()```](../glossary/?search=fract) function. It returns the fractional part of a number, making ```fract()``` in essence the modulo of one ([```mod(x,1.0)```](../glossary/?search=mod)). In other words, [```fract()```](../glossary/?search=fract) returns the number after the floating point. Our normalized coordinate system variable (```st```) already goes from 0.0 to 1.0 so it doesn't make sense to do something like:


まず [```fract()```](../glossary/?search=fract) 関数を思い出しましょう。この関数はつまるところ1の剰余 （[```mod(x,1.0)```](../glossary/?search=mod)）と同等で、数値の少数部分を返します。言い換えれば [```fract()```](../glossary/?search=fract) は小数点以下の部分の数を返してくれます。正規化された座標 (```st```）は既に0.0から1.0の間に収まっているので、下記のようなコードは意味を成しません。

```glsl
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
    st = fract(st);
	color = vec3(st,0.0);
	gl_FragColor = vec4(color,1.0);
}
```

But if we scale the normalized coordinate system up - let's say by three - we will get three sequences of linear interpolations between 0-1: the first one between 0-1, the second one for the floating points between 1-2 and the third one for the floating points between 2-3.

しかしここで正規化された座標系を拡大すると ー例えば3倍にしてみましょうー 0から1までの滑らかに変化する値の繰り返しを3つ得ることができます。1つ目は0から1までの値、2つ目は2から3までの値の少数部分、3つめは2から3までの値の少数部分です。

<div class="codeAndCanvas" data="grid-making.frag"></div>

Now it's time to draw something in each subspace, by uncommenting line 27. (Because we are multiplying equally in x and y the aspect ratio of the space doesn't change and shapes will be as expected.)

ここで、27行目のコメントを外して分割されたそれぞれの空間の中に何か描いてみましょう。xとyを等しく拡大しているので空間のアスペクト比は変わらず、期待した通りの形が描かれます。

Try some of the following exercises to get a deeper understanding:

下記の課題を幾つか試して理解を深めましょう。

* Multiply the space by different numbers. Try with floating point values and also with different values for x and y.

* 空間にたいして違う数をかけてみましょう。少数部分を持つ数を試したり、xとyに違う数を掛けてみましょう。

* Make a reusable function of this tiling trick.

* このタイリングのテクニックを再利用可能な関数にしてみましょう。

* Divide the space into 3 rows and 3 columns. Find a way to know in which column and row the thread is and use that to change the shape that is displaying. Try to compose a tic-tac-toe match.

* 空間を3列3行に分割します。スレッドがどの列と行にいるのかを知る方法を考えて、表示する図形を変えてください。Tic-tac-toe（◯×ゲーム）を描いてみましょう。

### Apply matrices inside patterns

### パターンの中で行列を適用する

Since each subdivision or cell is a smaller version of the normalized coordinate system we have already been using, we can apply a matrix transformation to it in order to translate, rotate or scale the space inside.

それぞれの分割された空間は、これまで使ってきたのと同じ正規化された座標系をただ小さくしたものになっているので、行列変換をそれぞれの空間内での平行移動や回転、拡大・縮小に使うことができます。

<div class="codeAndCanvas" data="checks.frag"></div>

* Think of interesting ways of animating this pattern. Consider animating color, shapes and motion. Make three different animations.

* このパターンをアニメーションさせる面白いアイデアを考えてください。色、形、動きについて考えましょう。3種類の異なるアニメーションを作成してください。

* Recreate more complicated patterns by composing different shapes.

* 異なる形を組み合わせてより複雑なパターンを作ってみましょう。


<a href="../edit.html#09/diamondtiles.frag"><canvas id="custom" class="canvas" data-fragment-url="diamondtiles.frag"  width="520px" height="200px"></canvas></a>

* Combine different layers of patterns to compose your own [Scottish Tartan Patterns](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns).

* 異なるパターンのレイヤーを重ねてオリジナルの[タータンチェック](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns)のパターンを作ってください。

[ ![Vector Pattern Scottish Tartan By Kavalenkava](tartan.jpg) ](http://graphicriver.net/item/vector-pattern-scottish-tartan/6590076)

### Offset patterns

### パターンをずらす

So let's say we want to imitate a brick wall. Looking at the wall, you can see a half brick offset on x in every other row. How we can do that?

ブロックの壁を模したパターンを作りたいとします。壁を観察すると、1行おきにブロック半個分だけx座標がずれていることに気づくでしょう。


![](brick.jpg)

As a first step we need to know if the row of our thread is an even or odd number, because we can use that to determine if we need to offset the x in that row.

xをずらす必要があるかを決めるには、まず現在のスレッドが偶数行と奇数行のどちらに当たるのかを知る必要があります。

____we have to fix these next two paragraphs together____

To determine if our thread is in an odd or even row, we are going to use [```mod()```](../glossary/?search=mod) of ```2.0``` and then see if the result is under ```1.0``` or not. Take a look at the following formula and uncomment the two last lines.

スレッドが奇数行か複数行かを求めるには、```2.0``` の剰余（[```mod()```](../glossary/?search=mod) を）拡大した座標系に対して用い値が1.0を下回るかどうかを見ます。下記のコードの最後の2行のコメントを外して見ましょう。
（訳注：このサンプルではxは0.0から1.0ではなく-4から4の範囲にすでに拡大されています。コメントを外すとxの整数部分が奇数になる、つまり ```mod(x, 2.0)``` が1.0以上になる場合にだけyが1.0になります。）


<div class="simpleFunction" data="y = mod(x,2.0);
// y = mod(x,2.0) < 1.0 ? 0. : 1. ;
// y = step(1.0,mod(x,2.0));"></div>

As you can see we can use a [ternary operator](https://en.wikipedia.org/wiki/%3F:) to check if the [```mod()```](../glossary/?search=mod) of ```2.0``` is under ```1.0``` (second line) or similarly we can use a [```step()```](../glossary/?search=step) function which does that the same operation, but faster. Why? Although is hard to know how each graphic card optimizes and compiles the code, it is safe to assume that built-in functions are faster than non-built-in ones. Everytime you can use a built-in function, use it!

ご覧のとおり、``2.0``` の剰余（[```mod()```](../glossary/?search=mod)）が ```1.0```
を下回るかどうかの判定には、[三項演算子](https://ja.wikipedia.org/wiki/%E6%9D%A1%E4%BB%B6%E6%BC%94%E7%AE%97%E5%AD%90)（2行目）を使うか、 [```step()```](../glossary/?search=step) ー 3行目) を使ってより高速に処理を行うことができます。グラフィックスカードがどのように最適化されていてどのようにコードをコンパイルするのかを知るのは難しいことですが、組み込み関数はそうでない関数に比べて高速に処理されると考えて問題ありません。組み込み関数が使える場合には必ず使うようにしましょう。

So now that we have our odd number formula we can apply an offset to the odd rows to give a *brick* effect to our tiles. Line 14 of the following code is where we are using the function to "detect" odd rows and give them a half-unit offset on ```x```. Note that for even rows, the result of our function is ```0.0```, and multiplying ```0.0``` by the offset of ```0.5``` gives an offset of ```0.0```. But on odd rows we multiply the result of our function, ```1.0```, by the offset of ```0.5```, which moves the ```x``` axis of the coordinate system by ```0.5```.

偶奇判定の式ができたので、これでタイルの奇数行ををブロックらしく見せることができます。下記のコードの14行目の関数で、奇数行かどうかを判定して ```x``` をブロック半個分ずらしています。この関数は偶数行に対して ```0.0``` を返します。ブロック半個分の ```0.5``` をかけると結果は ```0.0```です。奇数行に対しては ```1.0``` を返すので ```0.5```　を掛けた結果、座標系をx軸方向に ```0.5``` だけ移動させることになります。

Now try uncommenting line 32 - this stretches the aspect ratio of the coordinate system to mimic the aspect of a "modern brick". By uncommenting line 40 you can see how the coordinate system looks mapped to red and green.

32行目のコメントを外してみましょう。こうすると座標系のアスペクト比が引き伸ばされて現代のブロックの比率になります。40行目のコメントを外すと座標系の様子が赤と緑の色で示されるのを見ることができます。

<div class="codeAndCanvas" data="bricks.frag"></div>

* Try animating this by moving the offset according to time.

* このサンプルを、時間とともにブロックをずらしていくことでアニメーションさせてください。

* Make another animation where even rows move to the left and odd rows move to the right.

* 偶数行が左に、奇数行が右に動くアニメーションを作りましょう。

* Can you repeat this effect but with columns?

* 行方向ではなく列方向に対して同じ効果を適応するできますか。

* Try combining an offset on ```x``` and ```y``` axis to get something like this:

* ```x``` と ```y``` をずらしてこんなパターンを作ってみましょう。

<a href="../edit.html#09/marching_dots.frag"><canvas id="custom" class="canvas" data-fragment-url="marching_dots.frag"  width="520px" height="200px"></canvas></a>

## Truchet Tiles

## トルシェタイル

Now that we've learned how to tell if our cell is in an even or odd row or column, it's possible to reuse a single design element depending on its position. Consider the case of the [Truchet Tiles](http://en.wikipedia.org/wiki/Truchet_tiles) where a single design element can be presented in four different ways:

升目が偶数行と奇数行（または列）どちらに当たるかの判定方法を学んだ今、デザイン要素を場所に応じて再利用することができます。
同じデザイン要素が4種類の方法で使われる、[トルシェタイル](http://en.wikipedia.org/wiki/Truchet_tiles) を例として考えてみましょう。

![](truchet-00.png)

By changing the pattern across tiles, it's possible to contruct an infinite set of complex designs.

タイルごとのパターンを変えることによって、複雑なデザインを無限に組み立てることができます。

![](truchet-01.png)

Pay close attention to the function ```rotateTilePattern()```, which subdivides the space into four cells and assigns an angle of rotation to each one.

```rotateTilePattern()``` に注目してください。この関数は空間を4つの升目に分割しそれぞれに回転の角度を割り当てます。

<div class="codeAndCanvas" data="truchet.frag"></div>

* Comment, uncomment and duplicate lines 69 to 72 to compose new designs.

* 69行目から72行目までのコメントをつけたり外したり、行をコピーしたりして新しいデザインを作りましょう。

* Change the black and white triangle for another element like: half circles, rotated squares or lines.

* 黒と白の三角を他のデザイン要素、例えば半円や回転する正方形、線などに変えてみましょう。

* Code other patterns where the elements are rotated according to their position.

* 要素がその位置に応じて回転するパターンを作成してください。

* Make a pattern that changes other properties according to the position of the elements.

* 要素の場所によって他の属性（訳注：例えば色）を変化させるパターンを作ってください。

* Think of something else that is not necessarily a pattern where you can apply the principles from this section. (Ex: I Ching hexagrams)

* 必ずしも繰り返しのパターンではないもので、この項で学んだ原則を使える例を考えてください（例；八卦の組み合わせの一覧）。


<a href="../edit.html#09/iching-01.frag"><canvas id="custom" class="canvas" data-fragment-url="iching-01.frag"  width="520px" height="200px"></canvas></a>

## Making your own rules

##

Making procedural patterns is a mental exercise in finding minimal reusable elements. This practice is old; we as a species have been using grids and patterns to decorate textiles, floors and borders of objects for a long time: from meanders patterns in ancient Greece, to Chinese lattice design, the pleasure of repetition and variation catches our imagination. Take some time to look at [decorative](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) [patterns](https://www.pinterest.com/patriciogonzv/paterns/) and see how artists and designers have a long history of navigating the fine edge between the predictability of order and the surprise of variation and chaos. From Arabic geometrical patterns, to gorgeous African fabric designs, there is an entire universe of patterns to learn from.

規則によるパターン作りは、再利用可能な最小の要素を見つける頭の体操です。この行為自体は古くからあるもので、私たちの種はグリッドとパターンを織物や床をはじめ様々なものを装飾するために長い間利用してきました。曲がりくねった古代ギリシャの模様から中国の格子模様まで、繰り返しとその変奏をする楽しみはは私たちの想像力を捉えて来ました。ゆっくりと装飾的なパターン（例: [1](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) [2](https://www.pinterest.com/patriciogonzv/paterns/)）を眺めて、芸術家とデザイナー達が予測可能な規則正しさと、驚きにあふれた変化とカオスの間の微妙な線を渡り歩いてきた様子を見てみましょう。アラブの幾何学的なパターンから、アフリカの生地のデザインまで、学ぶべき大きな世界がそこにあります。


![Franz Sales Meyer - A handbook of ornament (1920)](geometricpatters.png)

With this chapter we end the section on Algorithmic Drawing. In the following chapters we will learn how to bring some entropy to our shaders and produce generative designs.

この章で「アルゴリズムで絵を描く」の説は終わりです。続く章ではある種の無秩序さをシェーダーに持ち込んでデザインを生成する方法について学びます。
