## Shapes
## 形について

![Alice Hubbard, Providence, United States, ca. 1892. Photo: Zindman/Freemont.](froebel.jpg)

Finally! We have been building skills for this moment! You have learned most of the GLSL foundations, types and functions. You have practiced your shaping equations over and over. Now is the time to put it all together. You are up for this challenge! In this chapter you'll learn how to draw simple shapes in a parallel procedural way.

ついにこの時が来ました。私たちはこの瞬間のために技を磨いてきたのです。あなたはGLSLの基礎の大部分、値の型と関数について学びました。シェイピング関数も繰り返し練習してきました。今こそ学んだ全てを掛け合わせる時です。この挑戦を受けて立ちましょう。この章では並列処理ならではの方法でシンプルな形を描く方法を学びます。

### Rectangle
### 長方形

Imagine we have grid paper like we used in math classes and our homework is to draw a square. The paper size is 10x10 and the square is supposed to be 8x8. What will you do?

数学の授業で使ったような方眼紙があって、そこに正方形を描く宿題が出たと想像してください。紙のサイズは10×10で正方形は8×8にする必要があります。あなたならどうしますか。

![](grid_paper.jpg)

You'd paint everything except the first and last rows and the first and last column, right?

一番上と下の行、左右両端の列を除いてすべてを塗りつぶせばよいですね。

How does this relate to shaders? Each little square of our grid paper is a thread (a pixel). Each little square knows its position, like the coordinates of a chess board. In previous chapters we mapped *x* and *y* to the *red* and *green* color channels, and we learned how to use the narrow two dimensional territory between 0.0 and 1.0. How can we use this to draw a centered square in the middle of our billboard?

これがシェーダーになんの関係があるのでしょう。方眼紙の小さな正方形1つ1つはスレッド（ピクセル）です。それぞれの小さな正方形は自分の位置を、チェス盤上の行と列のように把握しています。以前の章で私たちは x と y を赤と緑の色のチャンネルに割り当てました。また 0.0 から 1.0 の間の狭い二次元の領域を使う方法も学んできました。描画領域の中央に正方形を描くのに、これらの知識をどう活かせばよいでしょうか。

Let's start by sketching pseudocode that uses ```if``` statements over the spatial field. The principles to do this are remarkably similar to how we think of the grid paper scenario.

描画する範囲についての ```if``` 文を使った疑似コードから始めてみましょう。基本的な考え方は方眼紙の宿題ととてもよく似ています。

```glsl
    if ( (X GREATER THAN 1) AND (Y GREATER THAN 1) )
        paint white
    else
        paint black
```

Now that we have a better idea of how this will work, let’s replace the ```if``` statement with [```step()```](../glossary/?search=step), and instead of using 10x10 let’s use normalized values between 0.0 and 1.0:

方針がまとまったところで、 ```if``` 文を [```step()```](../glossary/?search=step) に置き換えて、10×10のマス目の代わりに 0.0 から 1.0 に正規化された値を使ってみましょう。


```glsl
uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Each result will return 1.0 (white) or 0.0 (black).
    float left = step(0.1,st.x);   // Similar to ( X greater than 0.1 )
    float bottom = step(0.1,st.y); // Similar to ( Y greater than 0.1 )

    // The multiplication of left*bottom will be similar to the logical AND.
    color = vec3( left * bottom );

    gl_FragColor = vec4(color,1.0);
}
```

The [```step()```](../glossary/?search=step) function will turn every pixel below 0.1 to black (```vec3(0.0)```) and the rest to white (```vec3(1.0)```) . The multiplication between ```left``` and ```bottom``` works as a logical ```AND``` operation, where both must be 1.0 to return 1.0 . This draws two black lines, one on the bottom and the other on the left side of the canvas.

[```step()```](../glossary/?search=step) 関数は、 x か y が 0.1 より小さくなるピクセルを黒（```vec3(0.0)```）に、他のすべてのピクセルを白（```vec3(1.0)```）に変えてくれます。```left``` と ```bottom``` の掛け算は ```AND``` 演算の役割をして、両方ともの値が 1.0 だった場合にのみ 1.0 を返します。結果として描画領域の下側と左側に2本の黒い線が引かれることになります。

![](rect-01.jpg)

In the previous code we repeat the structure for each axis (left and bottom). We can save some lines of code by passing two values directly to [```step()```](../glossary/?search=step) instead of one. That looks like this:

このコードではそれぞれの軸（左側と下側）に対して同じ構造を繰り返しています。[```step()```](../glossary/?search=step)  に1つずつ値を渡す代わりに、2つの値を一度に渡せば数行分のコードを節約することができます。下記を見てください。

```glsl
    vec2 borders = step(vec2(0.1),st);
    float pct = borders.x * borders.y;
```

So far, we’ve only drawn two borders (bottom-left) of our rectangle. Let's do the other two (top-right). Check out the following code:

ここまでではまだ2本の辺（左側と下側）しか描けていません。もう2本にも手をつけましょう。

<div class="codeAndCanvas" data="rect-making.frag"></div>

Uncomment and see how we invert the ```st``` coordinates and repeat the same [```step()```](../glossary/?search=step) function. That way the ```vec2(0.0,0.0)``` will be in the top right corner. This is the digital equivalent of flipping the page and repeating the previous procedure.

コメントを外すと、```st``` 座標を反転させてから同じ [```step()```](../glossary/?search=step) 関数を繰り返す様子が見られます。こうすると ```vec2(0.0,0.0)``` が右上の角になります。紙をひっくり返して作業を繰り返すのと同じことをデジタルに行っているわけです。

![](rect-02.jpg)

Take note that in *lines 18 and 22* all of the sides are being multiplied together. This is equivalent to writing:

18行目と22行目で全ての辺の値が掛け合わされていることに注目してください。これは下記のように書くこともできます。

```glsl
    vec2 bl = step(vec2(0.1),st);       // bottom-left
    vec2 tr = step(vec2(0.1),1.0-st);   // top-right
    color = vec3(bl.x * bl.y * tr.x * tr.y);
```

Interesting right? This technique is all about using [```step()```](../glossary/?search=step) and multiplication for logical operations and flipping the coordinates.

面白いでしょう。[```step()```](../glossary/?search=step) を使いこなし、掛け算を使って論理演算をして、さらに座標をひっくり返すとこんなことができるのです。

Before going forward, try the following exercises:

さらに先に進む前に下記の課題に挑戦しましょう。

* Change the size and proportions of the rectangle.

* 長方形の大きさと縦横比を変えてみましょう。

* Experiment with the same code but using [```smoothstep()```](../glossary/?search=smoothstep) instead of [```step()```](../glossary/?search=step). Note that by changing values, you can go from blurred edges to elegant smooth borders.

* 同じコードを元に [```step()```](../glossary/?search=step) の代わりに [```smoothstep()```](../glossary/?search=smoothstep) を使ってみましょう。値を調節するとぼやけた境界線からスムーズな枠線まで変化させることができます。

* Do another implementation that uses [```floor()```](../glossary/?search=floor).

* [```floor()```](../glossary/?search=floor) を使ってみましょう。

* Choose the implementation you like the most and make a function of it that you can reuse in the future. Make your function flexible and efficient.

* 課題の中から気に入ったコードを選び、それを関数に変えて再利用できるようにしましょう。効率的でフレキシブルな関数を考えましょう。

* Make another function that just draws the outline of a rectangle.

* 長方形を塗りつぶすのではなく、枠線だけを描く関数を作ってください。

* How do you think you can move and place different rectangles in the same billboard? If you figure out how, show off your skills by making a composition of rectangles and colors that resembles a [Piet Mondrian](http://en.wikipedia.org/wiki/Piet_Mondrian) painting.

* どうすれば1つの描画領域の異なる位置に、複数の長方形を配置することができると思いますか。良い方法を考え出せたら[モンドリアン](http://en.wikipedia.org/wiki/Piet_Mondrian)の絵のようなパターンを作ってみせてください。


![Piet Mondria - Tableau (1921)](mondrian.jpg)

### Circles
### 円

It's easy to draw squares on grid paper and rectangles on cartesian coordinates, but circles require another approach, especially since we need a "per-pixel" algorithm. One solution is to *re-map* the spatial coordinates so that we can use a [```step()```](../glossary/?search=step) function to draw a circle.

方眼紙の上やデカルト座標系で長方形を描くのは簡単です。しかし円を描くには別のアプローチが必要です。しかもシェーダーではそれぞれのピクセルごとに処理するアルゴリズムを用いなければなりません。1つの方法は [```step()```](../glossary/?search=step)  関数を使って円が描けるように、空間座標を置き換えることです。

How? Let's start by going back to math class and the grid paper, where we opened a compass to the radius of a circle, pressed one of the compass points at the center of the circle and then traced the edge of the circle with a simple spin.

どうすればいいのでしょう。数学の教室に戻って、方眼紙の上にコンパスを半径の長さに開いたところから始めましょう。片方の端を円の中心に置いて1回転させて円の淵をなぞります。

![](compass.jpg)

Translating this to a shader where each square on the grid paper is a pixel implies *asking* each pixel (or thread) if it is inside the area of the circle. We do this by computing the distance from the pixel to the center of the circle.

シェーダーでは方眼のマス目の1つ1つがピクセルに対応します。方眼紙とコンパスからシェーダーに置き換えるということは、それぞれのピクセル（スレッド）に対して円の内側にあるかどうかを問い合わせることを意味します。これは円の中心からピクセルまでの距離を計算することで行うことができます。

![](circle.jpg)

There are several ways to calculate that distance. The easiest one uses the [```distance()```](../glossary/?search=distance) function, which internally computes the [```length()```](../glossary/?search=length) of the difference between two points (in our case the pixel coordinate and the center of the canvas). The ```length()``` function is nothing but a shortcut of the [hypotenuse equation](http://en.wikipedia.org/wiki/Hypotenuse) that uses square root ([```sqrt()```](../glossary/?search=sqrt)) internally.

距離を計算するには幾つかの方法があります。最も簡単なのは [```distance()```](../glossary/?search=distance) 関数を使うことです。この関数は内部的に2つの点の差を取りその [```length()```](../glossary/?search=length) を計算します（今回のケースではピクセルの座標と描画領域の中心対象にします）。```length()``` 関数は[ピタゴラスの定理](https://ja.wikipedia.org/wiki/%E6%96%9C%E8%BE%BA)のショートカットで内部的に平方根（[```sqrt()```](../glossary/?search=sqrt)）を使います。


![](hypotenuse.png)

You can use [```distance()```](../glossary/?search=distance), [```length()```](../glossary/?search=length) or [```sqrt()```](../glossary/?search=sqrt) to calculate the distance to the center of the billboard. The following code contains these three functions and the non-surprising fact that each one returns exactly same result.

[```distance()```](../glossary/?search=distance), [```length()```](../glossary/?search=length), [```sqrt()```](../glossary/?search=sqrt) のいずれかを使って中心までの距離を計算することができます。下記のコードにはこれら3つの関数が全て含まれていますが、当然ながら全く同じ結果になります。
* Comment and uncomment lines to try the different ways to get the same result.
* コメントを付け替えて、違う方法を使っても同じ結果が得られることを確かめましょう。

<div class="codeAndCanvas" data="circle-making.frag"></div>

In the previous example we map the distance to the center of the billboard to the color brightness of the pixel. The closer a pixel is to the center, the lower (darker) value it has. Notice that the values don't get too high because from the center ( ```vec2(0.5, 0.5)``` ) the maximum distance barely goes over 0.5. Contemplate this map and think:

このサンプルでは中心からの距離をピクセルの明るさに割り当てました。中心に近いピクセルほど値が低く（暗く）なります。中心（ ```vec2(0.5, 0.5)``` ）からの距離は最大でルート2の半分にしかならないため一番明るいところでも真っ白にはなりません。このサンプルをよく見て考えてみてください。
（訳注：原文では最大の距離は0.5はとなっていますが誤りです。中心から描画領域の角までの距離は ```sqrt(2.0)``` です。）

* What you can infer from it?
* 何か気づいたことはありますか。

* How we can use this to draw a circle?
* これをどう使えば円が描けるでしょう。

* Modify the above code in order to contain the entire circular gradient inside the canvas.
* コードを書き換えて円形のグラデーションの全体が描画領域に収まるようにしてください。

### Distance field
### ディスタンスフィールド

We can also think of the above example as an altitude map, where darker implies taller. The gradient shows us something similar to the pattern made by a cone. Imagine yourself on the top of that cone. The horizontal distance to the edge of the cone is 0.5. This will be constant in all directions. By choosing where to “cut” the cone you will get a bigger or smaller circular surface.

上のサンプルは、暗い色ほど標高が高いことを示した、高低差を表す地図だと考えることもできます。このグラデーションは円錐のようなものを表しています。円錐の頂上に立ったところを想像してください。円錐の縁までの距離は 1.0 です（訳注：原文では0.5となっていますが、明るさが1.0に
なるところを縁と考えると 1.0 です）。これはどの方角でも同じです。どこで円錐を「輪切りに」するかを決めることで、大きさの違う円を得ることができます。


![](distance-field.jpg)

Basically we are using a re-interpretation of the space (based on the distance to the center) to make shapes. This technique is known as a “distance field” and is used in different ways from font outlines to 3D graphics.

要するにここでは空間を中心からの距離に基づいて解釈し直すことによって形を作っています。この手法はディスタンスフィールドと呼ばれ、フォントのアウトラインから3Dグラフィクスまで様々な用途に使われています。
(訳注：distance field の適当な訳語が見当たらなかったのでカタカナで「ディスタンスフィールド」とします。おおざっぱに、点や図形からの距離を空間上にマップしたものだと考えてください。)

Try the following exercises:
下記の課題に挑戦しましょう。

* Use [```step()```](../glossary/?search=step) to turn everything above 0.5 to white and everything below to 0.0.
* [```step()```](../glossary/?search=step) を使って、0.5 以上を全て白に、それ以外を黒にしてください。
* Inverse the colors of the background and foreground.
* 背景と図形の色を反転させてください。
* Using [```smoothstep()```](../glossary/?search=smoothstep), experiment with different values to get nice smooth borders on your circle.
* 円の縁を滑らかにしてみましょう。[```smoothstep()```](../glossary/?search=smoothstep) を使って色々な値を試してください。
* Once you are happy with an implementation, make a function of it that you can reuse in the future.
* うまくできたら後で再利用できるように関数として定義してください。
* Add color to the circle.
* 円に色をつけてください。
* Can you animate your circle to grow and shrink, simulating a beating heart? (You can get some inspiration from the animation in the previous chapter.)
* 心臓の鼓動のように円を伸縮させるアニメーションを作ることはできますか。（前章のアニメーションを参考にしましょう。）
* What about moving this circle? Can you move it and place different circles in a single billboard?
* 円を移動させることはできますか。円を別の場所に動かして、さらにもう1つの円を別の場所に描くことはできますか。

* What happens if you combine distances fields together using different functions and operations?
* 様々な演算や関数を使って、複数のディスタンスフィールドを組み合わせると何が起きるでしょう。

```glsl
pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
```

* Make three compositions using this technique. If they are animated, even better!
* これらのテクニックを使った作品を3つ作ってください。アニメーションにできればさらに素敵です。


#### For your tool box
#### 便利な道具箱

In terms of computational power the [```sqrt()```](../glossary/?search=sqrt) function - and all the functions that depend on it - can be expensive. Here is another way to create a circular distance field by using [```dot()```](../glossary/?search=dot) product.

平方根（[```sqrt()```](../glossary/?search=sqrt)）や、それに依存した関数はどれもコンピュータの処理能力に負荷をかける可能性があります。下記は円形のディスタンスフィールドを作る別の方法で、平方根の代わりに内積（[```dot()```](../glossary/?search=dot) ）を使います。

<div class="codeAndCanvas" data="circle.frag"></div>

### Useful properties of a Distance Field
### ディスタンスフィールドの便利な性質

![Zen garden](zen-garden.jpg)

Distance fields can be used to draw almost everything. Obviously the more complex a shape is, the more complicated its equation will be, but once you have the formula to make distance fields of a particular shape it is very easy to combine and/or apply effects to it, like smooth edges and multiple outlines. Because of this, distance fields are popular in font rendering, like [Mapbox GL Labels](https://www.mapbox.com/blog/text-signed-distance-fields/), [Matt DesLauriers](https://twitter.com/mattdesl) [Material Design Fonts](http://mattdesl.svbtle.com/material-design-on-the-gpu) and [as is describe on Chapter 7 of iPhone 3D Programming, O’Reilly](http://chimera.labs.oreilly.com/books/1234000001814/ch07.html#ch07_id36000921).

ディスタンスフィールドを使うと、ほぼどんなものでも描くことができます。もちろん形が複雑なほどより計算式がもより複雑になりますが、一旦ある形のディスタンスフィールドを作り出すための式を手に入れれば、複数の形を組み合わせたり、縁をぼかしたり何重にも線を引いたり様々なエフェクトをかけたりすることはとても簡単にできます。そのため下記の例に見られるようにディスタンスフィールドはフォントのレンダリングによく使われています。

* [Mapbox GL Labels](https://www.mapbox.com/blog/text-signed-distance-fields/)
* [Matt DesLauriers](https://twitter.com/mattdesl)
* [Material Design Fonts](http://mattdesl.svbtle.com/material-design-on-the-gpu)
* [Chapter 7 of iPhone 3D Programming, O’Reilly](http://chimera.labs.oreilly.com/books/1234000001814/ch07.html#ch07_id36000921)

Take a look at the following code.

下記のコードをみてください

<div class="codeAndCanvas" data="rect-df.frag"></div>

We start by moving the coordinate system to the center and shrinking it in half in order to remap the position values between -1 and 1. Also on *line 24* we are visualizing the distance field values using a [```fract()```](../glossary/?search=fract) function making it easy to see the pattern they create. The distance field pattern repeats over and over like rings in a Zen garden.

まず座標系を中心に動かして半分の大きさに縮小することで値が -1 から 1の間に収まるようにします（訳注：16行目の式の ```2.``` と ```1.``` を書き換えて見ると理解の助けになります）。24行目では [```fract()```](../glossary/?search=fract) 関数を使ってディスタンスフィールドが作り出すパターンが見やすいように視覚化しています。ディスタンスフィールドは禅寺の庭
のような繰り返しの模様を作り出します。

Let’s take a look at the distance field formula on *line 19*. There we are calculating the distance to the position on ```(.3,.3)``` or ```vec3(.3)``` in all four quadrants (that’s what [```abs()```](../glossary/?search=abs) is doing there).

19行目のディスタンスフィールドを作り出す式を見てみましょう。4つの象限すべてで ```vec3(.3)```、つまり ```(.3,.3)``` までの
距離を計算しています（[```abs()```](../glossary/?search=abs) を使って座標を絶対値にしてから距離を求めています）。

If you uncomment *line 20*, you will note that we are combining the distances to these four points using the [```min()```](../glossary/?search=min) to zero. The result produces an interesting new pattern.

20行目のコメントを外すと 0 との [```min()```](../glossary/?search=min) を使って、4つの点への距離を組み合わせた場合を見ることができます。これは新く面白いパターンを作り出します。

Now try uncommenting *line 21*; we are doing the same but using the [```max()```](../glossary/?search=max) function. The result is a rectangle with rounded corners. Note how the rings of the distance field get smoother the further away they get from the center.

さて21行目のコメントを外して見ましょう。[```max()```](../glossary/?search=max) を使っていること以外は同じです。結果は角丸の四角形になります。ディスタンスフィールドの輪は中心から遠ざかるほど半径が大きくなっていることに注目しましょう。

Finish uncommenting *lines 27 to 29* one by one to understand the different uses of a distance field pattern.

27行目から29行目までのコメントを順番に外して、ディスタンスフィールドを使ってパターンを作る様々な方法を学びましょう。


### Polar shapes
### 極座標を使った図形

![Robert Mangold - Untitled (2008)](mangold.jpg)

In the chapter about color we map the cartesian coordinates to polar coordinates by calculating the *radius* and *angles* of each pixel with the following formula:

色についての章ではそれぞれのピクセルについて、下記の式を使って半径と角度を計算することで、デカルト座標を極座標に変換しました。

```glsl
    vec2 pos = vec2(0.5)-st;
    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);
```

We use part of this formula at the beginning of the chapter to draw a circle. We calculated the distance to the center using [```length()```](../glossary/?search=length). Now that we know about distance fields we can learn another way of drawing shapes using polar coordinates.

本章の前半ではこの式の一部を利用して円を描きました。[```length()```](../glossary/?search=length)を使って中心からそれぞれのピクセルまでの距離を計算したのですね。ディスタンスフィールドのことを知った今、我々は極座標を使って図形を描く新たな手法について学ぶことができます。

This technique is a little restrictive but very simple. It consists of changing the radius of a circle depending on the angle to achieve different shapes. How does the modulation work? Yes, using shaping functions!

この手法は少し用途が限られますがとてもシンプルです。様々な異なる図形を描くために、角度に対する半径の大きさをいろいろと変化させます。どうやって変化させるのでしょう。そうです、シェイピング関数を使います。


Below you will find the same functions in the cartesian graph and in a polar coordinates shader example (between *lines 21 and 25*). Uncomment the functions one-by-one, paying attention the relationship between one coordinate system and the other.

下記の2つのサンプルでは、いくつかの同じ関数を、デカルト座標と極座標の両方で試すことができます。一方の座標系ともう片方の座標系との関係に注意しながら、コメントを1つづつ外してください。

<div class="simpleFunction" data="y = cos(x*3.);
//y = abs(cos(x*3.));
//y = abs(cos(x*2.5))*0.5+0.3;
//y = abs(cos(x*12.)*sin(x*3.))*.8+.1;
//y = smoothstep(-.5,1., cos(x*10.))*0.2+0.5;"></div>

<div class="codeAndCanvas" data="polar.frag"></div>

Try to:
下記を試してみましょう。

* Animate these shapes.
* 図形をアニメーションさせてください。

* Combine different shaping functions to *cut holes* in the shape to make flowers, snowflakes and gears.
* 異なるシェイピング関数を組み合わせて図形の中に穴を開けてください。花や雪の結晶、ギヤなどを描いてください。


* Use the ```plot()``` function we were using in the *Shaping Functions Chapter* to draw just the contour.

* シェイピング関数の章で使った ```plot()```関数を利用して輪郭線だけを描いてください。


### Combining powers
### 技を組み合わせる

Now that we've learned how to modulate the radius of a circle according to the angle using the [```atan()```](../glossary/?search=atan) to draw different shapes, we can learn how use ```atan()``` with distance fields and apply all the tricks and effects possible with distance fields.

さて [```atan()```](../glossary/?search=atan)を使って、角度に対する半径の大きさを変化させて図形を描く方法について学びました。次は ```atan()``` をディスタンスフィールドと組み合わせて、すべての技を駆使する方法を学びます。

The trick will use the number of edges of a polygon to construct the distance field using polar coordinates. Check out [the following code](http://thndl.com/square-shaped-shaders.html) from [Andrew Baldwin](https://twitter.com/baldand).

この方法では多角形の辺の数を元に極座標を使ってディスタンスフィールドを構成します。[Andrew Baldwin](https://twitter.com/baldand)による、[下記のコード](http://thndl.com/square-shaped-shaders.html)をご覧ください。


<div class="codeAndCanvas" data="shapes.frag"></div>

* Using this example, make a function that inputs the position and number of corners of a desired shape and returns a distance field value.

* このサンプルを使って、ピクセルの位置と書きたい図形の頂点の数を入力とし、ディスタンスフィールドの値を返す関数を作ってください。

* Mix distance fields together using [```min()```](../glossary/?search=min) and [```max()```](../glossary/?search=max).

* [```min()```](../glossary/?search=min) と [```max()```](../glossary/?search=max)　を使ってディスタンスフィールドを組み合わせてみましょう。

* Choose a geometric logo to replicate using distance fields.

* 幾何学的なロゴをなにか1つ選んでディスタンスフィールドを使って再現してみましょう。

Congratulations! You have made it through the rough part! Take a break and let these concepts settle - drawing simple shapes in Processing is easy but not here. In shader-land drawing shapes is twisted, and it can be exhausting to adapt to this new paradigm of coding.

おめでとうございます。これで大変なところを乗り越えました。一息入れて、学んだことを頭のなかに落ち着けましょう。[Processing](https://processing.org/)を使えばシンプルな形を描くのは簡単なことですが、ここで学んだことは違います。シェーダーの世界では形を描くのにもひねくれたやり方をしなくてはなりませんし、新しいコーディングの考え方に慣れるのは疲れる仕事です。

Now that you know how to draw shapes I'm sure new ideas will pop into your mind. In the following chapter you will learn how to move, rotate and scale shapes. This will allow you to make compositions!
