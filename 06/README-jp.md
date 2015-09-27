## 色について

![Paul Klee - Color Chart (1931)](klee.jpg)

We haven't much of a chance to talk about GLSL vector types. Before going further it's important to learn more about these variables and the subject of colors is a great way to find out more about them.

GLSLのベクトル型について、説明する機会がまだあまりありませんでした。さらに先に進む前に、この種の変数についてより深く学んでおくことが大事です。色について考えることでベクトル型についてさらに深く知ることができます。

If you are familiar with object oriented programming paradigms you've probably noticed that we have been accessing the data inside the vectors like any regular C-like ```struct```.

オブジェクト指向のプログラミングに慣れている方であれば、ここまでベクトル型の変数の中のデータに、C言語 ```struct``` やその仲間と同様の方法でアクセスしてきたことに気づいたでしょう。

```glsl
vec3 red = vec3(1.0,0.0,0.0);
red.x = 1.0;
red.y = 0.0;
red.z = 0.0;
```

Defining color using an *x*, *y* and *z* notation can be confusing and misleading, right? That's why there are other ways to access this same information, but with different names. The values of ```.x```, ```.y``` and ```.z``` can also be called ```.r```, ```.g``` and ```.b```, and ```.s```, ```.t``` and ```.p```. (```.s```, ```.t``` and ```.p``` are usually used for spatial coordinates of a texture, which we'll see in a later chapter.) You can also access the data in a vector by using the index position, ```[0]```, ```[1]``` and ```[2]```.

色をx, y, zで表して定義するのは分かりにくいし誤解を招きそうですね。そのため、ベクトル型の変数では同じ情報に違う名前を使ってアクセスできるようになっています。```.x```, ```.y```, ```.z``` の代わりに ```.r```, ```.g```, ```.b```, もしくは ```.s```, ```.t```, ```.p``` を使うことができるのです（```.s```, ```.t```, ```.p``` は通常、テクスチャ空間の座標を示すのに使われます。これについては後の章で学びます)。ベクトル型のデータにはまた、 ```[0]```, ```[1]```, ```[2]``` といったインデックスを使ってアクセスすることもできます。

The following lines show all the ways to access the same data:

下記のコードでは同じデータにアクセスするための全て方法を示しています。

```glsl
vec4 vector;
vector[0] = vector.r = vector.x = vector.s;
vector[1] = vector.g = vector.y = vector.t;
vector[2] = vector.b = vector.z = vector.p;
vector[3] = vector.a = vector.w = vector.q;
```

These different ways of pointing to the variables inside a vector are just nomenclatures designed to help you write clear code. This flexibility embedded in shading language is a door for you to start thinking interchangably about color and space coordinates.

ベクトルの中の値を呼び表すためのこれらの方法は、分かりやすいコードを書くために用意された仕組みです。シェーダー言語に備わったこの柔軟性は、色と空間座標を交換可能なものとして考える足がかりになります。

Another great feature of vector types in GLSL is that the properties can be combined in any order you want, which makes it easy to cast and mix values. This ability is call *swizzle*.

もう1つ、GLSLのベクトル型の素晴らしい機能として、これらの値の名前を好きな順番で組み合わせて使えることが挙げられます。このおかげで簡単に値を入れ替えたり、異なる型への変換をすることができます。この機能は swizzle と呼ばれています。


```glsl
vec3 yellow, magenta, green;

// Making Yellow
yellow.rg = vec2(1.0);  // Assigning 1. to red and green channels
yellow[2] = 0.0;        // Assigning 0. to blue channel

// Making Magenta
magenta = yellow.rbg;   // Assign the channels with green and blue swapped

// Making Green
green.rgb = yellow.bgb; // Assign the blue channel of Yellow (0) to red and blue channels
```

#### For your toolbox
#### 便利な道具

You might not be used to picking colors with numbers - it can be very counterintuitive. Lucky for you, there are a lot of smart programs that make this job easy. Find one that fits your needs and then train it to deliver colors in ```vec3``` or ```vec4``` format. For example, here are the templates I use on [Spectrum](http://www.eigenlogik.com/spectrum/mac):

数値を使って色を指定するのに慣れていないかもしれません。なかなか直感的ではありませんからね。ありがたいことに、手助けになる良くできたプログラムが数多くあります。あなたの使い道にあったものを見つけて ```vec3``` や ```vec4``` の形式で色を取り出せるように設定しておきましょう。例えば、下記は私が[Spectrum](http://www.eigenlogik.com/spectrum/mac)で使っているテンプレートです。

```
	vec3({{rn}},{{gn}},{{bn}})
	vec4({{rn}},{{gn}},{{bn}},1.0)
```

### Mixing color
### 色の調合

Now that you know how colors are defined, it's time to integrate this with our previous knowledge. In GLSL there is a very useful function, [```mix()```](../glossary/?search=mix), that lets you mix two values in percentages. Can you guess what the percentage range is? Yes, values between 0.0 and 1.0! Which is perfect for you, after those long hours practicing your karate moves with the fence - it is time to use them!

色がどのように定義されるか分かったところで、これまでに学んだ知識と組み合わせてみましょう。GLSLにはとても便利な [```mix()```](../glossary/?search=mix) 関数があり、2つの値をパーセンテージを指定して混ぜ合わせることができます。
パーセンテージの範囲はわかりますか？ そう、0.0 から 1.0 ですね。長い時間をかけてミヤギさんの壁でカラテの修行を積んだあなたにはピッタリです。さあ学んだ技を披露しましょう。


![](mix-f.jpg)

Check the following code at line 18 and see how we are using the absolute values of a sin wave over time to mix ```colorA``` and ```colorB```.

下記のコードの18行目で、サイン波の値の絶対値が ```colorA``` と ```colorB``` を混ぜ合わせるためにどのように使われているかを見てください。

<div class="codeAndCanvas" data="mix.frag"></div>

Show off your skills by:

さあ、あなたの技を披露する番です。

* Make an expressive transition between colors. Think of a particular emotion. What color seems most representative of it? How does it appear? How does it fade away? Think of another emotion and the matching color for it. Change the beginning and ending color of the above code to match those emotions. Then animate the transition using shaping functions. Robert Penner developed a series of popular shaping functions for computer animation known as [easing functions](http://easings.net/), you can use [this example](../edit.html#06/easing.frag) as research and inspiration but the best result will come from making your own transitions.

* 色を表情豊かに変化させてください。なにか特定の感情を考えてみましょう。一番ふさわしいのは何色ですか? どのように現れてどのように消えていくのでしょう? もう1つ別の感情について考えて、ふさわしい色を選んでください。上記のサンプルの始まりと終わりの色をこの2つの感情の色に変えてください。次にシェイピング関数を使って色を滑らかに変化させましょう。

Robert Pennerは[イージング関数](http://easings.net/)と呼ばれる、コンピューターアニメーションでよく使われる一連の関数を開発しました。[このサンプル](../edit.html#06/easing.frag)を使って研究したりインスピレーションを得ることもできますが、一番良いのはあなた自身で関数を作ってみることでしょう。

### Playing with gradients
### グラデーションを楽しむ

The [```mix()```](../glossary/?search=mix) function has more to offer. Instead of a single ```float```, we can pass a variable type that matches the two first arguments, in our case a ```vec3```. By doing that we gain control over the mixing percentages of each individual color channel, ```r```, ```g``` and ```b```.

[```mix()```](../glossary/?search=mix) には幅広い使い道があります。3つ目の引数として単に ```float``` で割合を指定する代わりに、最初の2つの引数に対応する型の値を渡すことができます。上記のサンプルでは ```vec3``` を使いました。こうすることで ```r```, ```g```,  ```b``` のそれぞれのチャンネルを個別のパーセンテージで混ぜ合わせることができます。


![](mix-vec.jpg)

Take a look at the following example. Like the examples in the previous chapter, we are hooking the transition to the normalized *x* coordinate and visualizing it with a line. Right now all the channels go along the same line.

下記のサンプルを見てください。前章のサンプルと同じように色の変化を正規化されたxの値に対応させ、またxの変化を線で示しています。今のところ全ての色のチャンネルは同じ線に対応しています。

Now, uncomment line number 25 and watch what happens. Then try uncommenting lines 26 and 27. Remember that the lines visualize the amount of ```colorA``` and ```colorB``` to mix per channel.

25行目のコメントを外してどうなるか見てみましょう。26行目と27行目のコメントも外してみてください。

<div class="codeAndCanvas" data="gradient.frag"></div>

You probably recognize the three shaping functions we are using on lines 25 to 27. Play with them! It's time for you to explore and show off your skills from the previous chapter and make interesting gradients. Try the following exercises:

おそらく、25〜27行目の間で3つの異なるシェイピング関数が使われていることに気づいたことでしょう。これらの関数を書き換えて遊んでみましょう。色々と実験をして面白いグラデーションを作り、前章で学んだ技を披露するチャンスです。下記を試してみましょう。


![William Turner - The Fighting Temeraire (1838)](turner.jpg)

* Compose a gradient that resembles a William Turner sunset

* ウィリアム・ターナーの夕日のようなグラデーションを作り出してみましょう。

* Animate a transition between a sunrise and sunset using ```u_time```.

* ```u_time``` を使って日の出から日の入りまでの変化のアニメーションを作ってみましょう。

* Can you make a rainbow using what we have learned so far?

* 今までに学んだことを使って虹を作り出すことはできますか?

* Use the ```step()``` function to create a colorful flag.

* ```step()``` 関数を使ってカラフルな旗を作ってください。

### HSB

### HSB

We can't talk about color without speaking about color space. As you probably know there are different ways to organize color besides by red, green and blue channels.

色空間を抜きにして色のことを語ることはできません。おそらくご存知の通り、赤、緑、青のチャンネルで表す以外にも色を体系化するための方法があります。

[HSB](http://en.wikipedia.org/wiki/HSL_and_HSV) stands for Hue, Saturation and Brightness (or Value) and is a more intuitive and useful organization of colors. Take a moment to read the ```rgb2hsv()``` and ```hsv2rgb()``` functions in the following code.

[HSB](http://en.wikipedia.org/wiki/HSL_and_HSV)は色相（Hue）、彩度（Saturation）、明度（Brightness または Value）の頭文字を取ったもので、より直感的で便利な色の体系です。```rgb2hsv()``` と ```hsv2rgb()``` の2つの関数をよく読んでみてください。

By mapping the position on the x axis to the Hue and the position on the y axis to the Brightness, we obtain a nice spectrum of visible colors. This spatial distribution of color can be very handy; it's more intuitive to pick a color with HSB than with RGB.

x軸を色相、y軸を明度に割り当てると色のスペクトルを作ることができます。この空間的な色の配置は非常に便利で、HSBを使うと、RGBよりも直感的に色を選ぶことができます。

<div class="codeAndCanvas" data="hsb.frag"></div>

### HSB in polar coordinates
### HSBと極座標

HSB was originally designed to be represented in polar coordinates (based on the angle and radius) instead of cartesian coordinates (based on x and y). To map our HSB function to polar coordinates we need to obtain the angle and distance from the center of the billboard to the pixel coordinate. For that we will use the [```length()```](../glossary/?search=length) function and [```atan(y,x)```](../glossary/?search=atan) (which is the GLSL version of the commonly used ```atan2(y,x)```).  

HSBはもともとデカルト座標（xとy）ではなく、極座標（中心からの角度と距離）で色を示す仕組みです。HSB関数を極座標に対応させるには、ピクセル座標を元に、描画領域の中心からの角度と距離を求めなくてはなりません。そのためには [```length()```](../glossary/?search=length) 関数と [```atan(y,x)```](../glossary/?search=atan) 関数を使います。  ```atan(y,x)``` は一般的な言語で使われている ```atan2(y,x)``` のGLSL版です。

When using vector and trigonometric functions, ```vec2```, ```vec3``` and ```vec4``` are treated as vectors even when they represent colors. We will start treating colors and vectors similarly, in fact you will come to find this conceptual flexibility very empowering.

ベクトルや三角関数を扱う際には ```vec2```, ```vec3``` や ```vec4``` をそれらが色を表している場合でもベクトルと見なします。私たちは色とベクトルを同等に扱います。そして、このフレキシブルな考え方が様々なことを実現する支えになることを目の当たりにすることになるでしょう。


**Note:** If you were wondering, there are more geometric functions besides
 [```length```](../glossary/?search=length), like [```distance()```](../glossary/?search=distance), [```dot()```](../glossary/?search=dot), [```cross```](../glossary/?search=cross), [```normalize()```](../glossary/?search=normalize), [```faceforward()```](../glossary/?search=fraceforward), [```reflect()```](../glossary/?search=reflect) and [```refract()```](../glossary/?search=refract).


もし興味があれば、 [```length```](../glossary/?search=length) の他にも沢山の幾何学関数があります。

- [```distance()```](../glossary/?search=distance)
- [```dot()```](../glossary/?search=dot)
- [```cross```](../glossary/?search=cross)
- [```normalize()```](../glossary/?search=normalize)
- [```faceforward()```](../glossary/?search=fraceforward)
- [```reflect()```](../glossary/?search=reflect)
- [```refract()```](../glossary/?search=refract)

Also GLSL has special vector relational functions such as: [```lessThan()```](../glossary/?search=lessThan), [```lessThanEqual()```](../glossary/?search=lessThanEqual), [```greaterThan()```](../glossary/?search=greaterThan), [```greaterThanEqual()```](../glossary/?search=greaterThanEqual), [```equal()```](../glossary/?search=equal) and [```notEqual()```](../glossary/?search=notEqual).


また、GLSLにはベクトル型の値を比較するための特別な関数があります。

- [```lessThan()```](../glossary/?search=lessThan)
- [```lessThanEqual()```](../glossary/?search=lessThanEqual)
- [```greaterThan()```](../glossary/?search=greaterThan)
- [```greaterThanEqual()```](../glossary/?search=greaterThanEqual)
- [```equal()```](../glossary/?search=equal)
- [```notEqual()```](../glossary/?search=notEqual).


Once we obtain the angle and length we need to “normalize” their values to the range between 0.0 to 1.0. On line 27, [```atan(y,x)```](../glossary/?search=atan) will return an angle in radians between -PI and PI (-3.14 to 3.14), so we need to divide this number by ```TWO_PI``` (defined at the top of the code) to get values between -0.5 to 0.5, which by simple addition we change to the desired range of 0.0 to 1.0. The radius will return a maximum of 0.5 (because we are calculating the distance from the center of the viewport) so we need to double this range (by multiplying by two) to get a maximum of 1.0.

角度と距離を求めたら、それを正規化して 0.0 から 1.0 の間に収める必要があります。下のサンプルの27行目の [```atan(y,x)```](../glossary/?search=atan) は角度を -π から π（-3.14...から3.14...）の間の値で返すので、これをコードの冒頭で定義されている ```TWO_PI``` で割って -0.5 から 0.5 の値にします。そして単純に 0.5 を足せば望み通りの0.0から1.0の値が手に入ります。描画領域の中心から距離を測っているので、半径は最大で 0.5 になります。最大値を 1.0 にするためにはこの幅を倍にする（2を掛ける）必要があります。

As you can see, our game here is all about transforming and mapping ranges to the 0.0 to 1.0 that we like.

このように、値の範囲を変換して 0.0 から 1.0 の扱いやすい値にすることが大事です。

（訳注：この半径についての説明は正確ではありません。例えば描画領域の中心から角までの距離を2倍にするとルート2になるので1.0を超えてしまいます。必ず値が0.0から1.0に収まるようにするにはどうすればいいか、また ```hsb2rgb``` 関数に想定外の大きな値や小さな値を渡すとどうなるか考えてみましょう。）


<div class="codeAndCanvas" data="hsb-colorwheel.frag"></div>

Try the following exercises:

下記の課題に挑戦してみましょう。

* Modify the polar example to get a spinning color wheel, just like the waiting mouse icon.

* 上の極座標のサンプルをMacOSのレインボーカーソルのような、回転する色の輪に変えてください。

* Use a shaping function together with the conversion function from HSB to RGB to expand a particular hue value and shrink the rest.

* シェイピング関数とHSBをRGBへ変換する関数を組み合わせて、特定の色相を広げてその他の色相が狭くなるようにしてください。

![William Home Lizars - Red, blue and yellow spectra, with the solar spectrum (1834)](spectrums.jpg)

* If you look closely at the color wheel used on color pickers (see the image below), they use a different spectrum according to RYB color space. For example, the opposite color of red should be green, but in our example it is cyan. Can you find a way to fix that in order to look exactly like the following image? [Hint: this is a great moment to use shaping functions.]

* 下の画像を見てください。カラーピッカーで使われている色の輪をよく見ると、サンプルコードとは違う[RYB色空間](https://en.wikipedia.org/wiki/RYB_color_model)に基づく色のスペクトルが使われていることに気づくでしょう（訳注：もちろんこれはアプリケーション次第です。必ずこうなっているとは限りません）。例えば赤の反対は緑のはずですが、サンプルコードではシアンになっています。これを修正して下の画像とまったく同じく見えるようにする方法を考えられるでしょうか（ヒント：シェイピング関数を使うチャンスです）。

![](colorwheel.png)

#### Note about functions and arguments
#### 関数と引数についての注釈

Before jumping to the next chapter let’s stop and rewind. Go back and take look at the functions in previous examples. You will notice ```in``` before the type of the arguments. This is a [*qualifier*](http://www.shaderific.com/glsl-qualifiers/#inputqualifier) and in this case it specifies that the variable is read only. In future examples we will see that it is also possible to define arguments as ```out``` or ```inout```. This last one, ```inout```, is conceptually similar to passing an argument by reference which will give us the possibility to modify a passed variable.

次の章に進む前にちょっと立ち止まって振り返ってみましょう。引数の型の前にある ```in``` に気づいたでしょう。これは[修飾子（qualifier）](http://www.shaderific.com/glsl-qualifiers/#inputqualifier) と呼ばれるもので、この場合は引数が読み取り専用であることを示しています。

```glsl
int newFunction(in vec4 aVec4,   // read-only
                out vec3 aVec3,    // write-only
                inout int aInt);   // read-write
```

You may not believe it but now we have all the elements to make cool drawings. In the next chapter we will learn how to combine all our tricks to make geometric forms by *blending* the space. Yep... *blending* the space.

今はまだ信じられないかもしれませんが、もう私たちはクールな絵を描くために必要な全てを手に入れました。次の章では全ての技を組み合わせて幾何学的な図形を描く方法を学びます。
