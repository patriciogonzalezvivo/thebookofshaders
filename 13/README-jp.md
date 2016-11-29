![Due East over Shadequarter Mountain - Matthew Rangel (2005) ](rangel.jpg)

## Fractal Brownian Motion

## 非整数ブラウン運動

Noise tends to mean different things to different people. Musicians will think of it in terms of disturbing sounds, communicators as interference and astrophysicists as cosmic microwave background radiation. These concepts bring us back to the physical reasons behind randomness in the world around us. However, let's start with something more fundamental, and more simple: waves and their properties. A wave is a fluctuation over time of some property. Audio waves are fluctuations in air pressure, electromagnetical waves are fluctuations in electrical and magnetic fields. Two important characteristics of a wave are its amplitude and frequency. The equation for a simple linear (one-dimensional) wave looks like this:

ノイズという言葉は人によって違う物事を意味します。ミュージシャンであれば雑音のことを、コミュニケーションを仕事にする人であれば余計な干渉のことを、天体物理学者であれば宇宙マイクロ波背景放射のことを考えるでしょう。これらの概念は、世の中のランダムな現象の背後にある物理的な原因について考えさせてくれます。でも、まずはもっと根本的でシンプルなことから始めましょう。波とその特性についてです。波とは時間の上で起こる、ある特性を持った振動です。音波とは空気圧における振動、電磁波は電界、磁界における振動です。

波の2つ重要な性質に振幅（amplitude）と周波数（frequency）があります。単純な一次元の波を表す式はこのようになります。

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = amplitude * sin(x * frequency);
"></div>

* Try changing the values of the frequency and amplitude to understand how they behave.

* 波の性質について理解を深めるため、振幅と周波数の値を変えてみましょう。

* Using shaping functions, try changing the amplitud over time.

* シェイピング関数を使って振幅を時間とともに変化させてみましょう。

* Using shaping functions, try changing the frequency over time.

* シェイピング関数を使って周波数を時間とともに変化させてみましょう。

By doing the last two exercises you have managed to "modulate" a sine wave, and you just created AM (amplitude modulated) and FM (frequency modulated) waves. Congratulations!

2番目と3番目の演習をすることであなたはサイン波を「モデュレート」させて、AM波（amplitude modulated）とFM波（frequency modulated）を作り出したことになります。

Another interesting property of waves is their ability to add up, which is formally called superposition. Comment/uncomment and tweak the following lines. Pay attention to how the overall appearance changes as we add waves of different amplitudes and frequencies together.

波の興味深い特性の1つに、重ね合わせができるということがあります。下記のコードをコメントアウトしたり数値を変えたりしてみましょう（訳注： ```y +=``` で始まる行で試してください）。

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = sin(x * frequency);
float t = 0.01 * (-u_time*130.0);
y += sin(x*frequency*2.1 + t) * 4.5;
y += sin(x*frequency*1.72 + t * 1.121) * 4.0;
y += sin(x*frequency*2.221 + t * 0.437) * 5.0;
y += sin(x*frequency*3.1122+ t * 4.269) * 2.5;
y *= amplitude* 0.06;
"></div>

* Experiment by changing the frequency and amplitude for the additional waves.

* 重ね合わされている波の振幅や周波数を変えて実験してみましょう。

* Is it possible to make two waves cancel each other out? What will that look like?

* 2つの波を互いに打ち消し合わせることはできますか。どのように見えるでしょう。

* Is it possible to add waves in such a way that they will amplify each other?

* 2つの波を、お互いを強め合うように重ね合わせることはできますか。

In music, each note is associated with a specific frequency. The frequencies for these notes follow a pattern which we call a scale, where a doubling or halving of the frequency corresponds to a jump of one octave.

音楽では、それぞれの音程は特定の周波数に対応しています。これら音程の周波数は音階と呼ばれるパターンに従って並べられ、1オクターブごとに2倍または半分になります。

Now, let's use Perlin noise instead of a sine wave! Perlin noise in its basic form has the same general look and feel as a sine wave. Its amplitude and frequency vary somewhat, but the amplitude remains reasonably consistent, and the frequency is restricted to a fairly narrow range around a center frequency. It's not as regular as a sine wave, though, and it's easier to create an appearance of randomness by summing up several scaled versions of noise. It is possible to make a sum of sine waves appear random as well, but it takes many different waves to hide their periodic, regular nature.

さて、サイン波の代わりにパーリンノイズを使ってみましょう。パーリンノイズの基本的な形状はサイン波（訳注：サイン波を重ね合わせたもの）に似た見た目をしています。振幅と周波数はいくらか変化しますが、振幅は比較的安定しており、周波数の変化はある値を中央値とした狭い範囲に制限されています。一方でパーリンノイズはサイン波ほど規則正しくはありません。幾つかのスケールを変えたノイズを重ね合わせればより不規則な見た目を作り出すのも簡単です。サイン波を重ね合わせたものをランダムに見せることも可能ですが、周期的で規則正しい性質を隠すにはたくさんの異なる波を重ねる必要があります。

By adding different iterations of noise (*octaves*), where we successively increment the frequencies in regular steps (*lacunarity*) and decrease the amplitude (*gain*) of the **noise** we can obtain a finer granularity in the noise and get more fine detail. This technique is called "fractal Brownian Motion" (*fBM*), or simply "fractal noise", and in its simplest form it can be created by the following code:

周波数を一定の割合で増加させる（lacunarity）と同時に振幅を減らしながら（gain）ノイズを（octaveの数だけ）繰り返し重ねることで、より粒度の細かいディテールを持ったノイズを作り出すことができます。このテクニックは「非整数ブラウン運動（fBM）」または単に「フラクタルノイズ」と呼ばれていて、最も単純な形は下記のコードのようになります。

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

* Progressively change the number of octaves to iterate from 1 to 2, 4, 8 and 10. See what happens.

* 1から2、4、8、10と ```octave``` の値を徐々に変化させて何が起きるか観察してみましょう。

* When you have more than 4 octaves, try changing the lacunarity value.

* ```octave``` の値が4より大きい状態で ```lacunarity``` の値を変化させてみましょう。

* Also with >4 octaves, change the gain value and see what happens.

* 同じく ```octave``` の値が4より大きい状態で ```gain``` の値を変化させてみましょう。

Note how with each additional octave, the curve seems to get more detail. Also note the self-similarity while more octaves are added. If you zoom in on the curve, a smaller part looks about the same as the whole thing, and each section looks more or less the same as any other section. This is an important property of mathematical fractals, and we are simulating that property in our loop. We are not creating a *true* fractal, because we stop the summation after a few iterations, but theoretically speaking, we would get a true mathematical fractal if we allowed the loop to continue forever and add an infinite number of noise components. In computer graphics, we always have a limit to how small details we can resolve, for example when objects become smaller than a pixel, so there is no need to make infinite sums to create the appearance of a fractal. A lot of terms may be needed sometimes, but never an infinite number.

```octave``` を増やすと曲線のディテールがより細かくなることに注目してください。また、その際の自己相似性にも注意しましょう。曲線を拡大しても、細かな部分の形が全体の形と同じになっているように見えます。また、拡大した部分は多かれ少なかれ他の部分と似ています。これは数学的なフラクタルの重要な性質で、私たちはこの性質をループの中でシミュレートしているのです。ここではシミュレーションは数回の繰り返しの後で打ち切られているので本当の意味でのフラクタルを作り出しているわけではありません。しかし理論上では、ループを永遠に繰り返して無限にノイズを重ね合わせれば、本当に数学的なフラクタルを得ることができるでしょう。コンピュータグラフィクスでは常に処理できる細かさに限界があります。例えばピクセルより小さなものは見えないので、フラクタルな見た目を作り出すのに無限回の足し算を行う必要はありません。たくさんの繰り返しが必要になることはあるかもしれませんが、無限回になることは決してありません。

The following code is an example of how fBm could be implemented in two dimensions to create a fractal-looking pattern:

下記のコードは2次元のfBMを実装してフラクタル状の模様を作り出した例です。

<div class='codeAndCanvas' data='2d-fbm.frag'></div>

* Reduce the number of octaves by changing the value on line 37

* 37行目の ```octave``` を減らしてみましょう。

* Modify the lacunarity of the fBm on line 47

* 47行目の ```lacunarity``` を変化させてみましょう。

* Explore by changing the gain on line 48

* 48行目の ```gain``` を変えて試してみましょう。

This technique is commonly used to construct procedural landscapes. The self-similarity of the fBm is perfect for mountains, because the erosion processes that create mountains work in a manner that yields this kind of self-similarity across a large range of scales. If you are interested in this, use you should definitly read [this great article by Inigo Quiles about advance noise](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm).

このテクニックはプログラムで地形を作り出すのによく用いられています。fBMの自己相似性は、山を形づくる侵食過程の自己相似性に似ているため、山脈の形を再現するのに最適です。もし興味があればInigo Quilesによる[高度なノイズ](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm)についての素晴らしい記事を読むと良いでしょう。

![Blackout - Dan Holdsworth (2010)](holdsworth.jpg)

Using more or less the same technique, is also possible to obtain other effects like what is known as **turbulence**. It's essentially an fBm, but constructed from the absolute value of a signed noise to create sharp valleys in the function.

同様のテクニックを使って「乱流（turbulence）」と呼ばれる効果を作り出すこともできます。基本的にはfBMなのですが、鋭い谷間を作り出すために符号付きノイズ（signed noise）の絶対値を用いています。

```glsl
for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * abs(snoise(st));
    st *= 2.;
    amplitude *= .5;
}
```

<a href="../edit.php#13/turbulence.frag"><img src="turbulence-long.png"  width="520px" height="200px"></img></a>

Another member of this family of algorithms is the **ridge**, where the sharp valleys are turned upside down to create sharp ridges instead:

同じ仲間のアルゴリズムに「尾根（ridge）」があります。深い谷が上下逆さまにされて鋭い尾根を作り出しています。

```glsl
    n = abs(n);     // create creases
    n = offset - n; // invert so creases are at top
    n = n * n;      // sharpen creases
```

<a href="../edit.php#13/ridge.frag"><img src="ridge-long.png"  width="520px" height="200px"></img></a>

Another variant which can create useful variations is to multiply the noise components together instead of adding them. It's also interesting to scale subsequent noise functions with something that depends on the previous terms in the loop. When we do things like that, we are moving away from the strict definition of a fractal and into the relatively unknown field of "multifractals". Multifractals are not as strictly defined mathematically, but that doesn't make them less useful for graphics. In fact, multifractal simulations are very common in modern commercial software for terrain generation. For further reading, you could read chapter 16 of the book "Texturing and Modeling: a Procedural Approach" (3rd edition), by Kenton Musgrave. Sadly, that book is out of print since a few years back, but you can still find it in libraries and on the second hand market. (There's a PDF version of the 1st edition available for purchase online, but don't buy that - it's a waste of money. It's from 1994, and it doesn't contain any of the terrain modeling stuff from the 3rd edition.)

他の便利な仲間には、ノイズを足し算する代わりに掛け合わせたものがあります。ノイズ関数をそれまでのループの結果に応じてスケールさせても面白いでしょう。こうすると厳密なフラクタルから離れて、より謎めいた「マルチフラクタル」の世界に足を踏み入れることになります。マルチフラクタルはフラクタルほどは数学的に厳密に定義されていませんが、だからと言って役に立たないというわけではありません（訳注：厳密に定義されてないというより、より一般化された概念なのでもっといろんなものを含んじゃうよ、という感じだと思います）。実際にマルチフラクタルシミュレーションは地形生成に用いる現代の商用ソフトで一般的に用いられています。より深く知りたければKenton Musgraveによる「[Texturing and Modeling: a Procedural Approach (3rd edition)](https://www.amazon.co.jp/Texturing-Modeling-Third-Procedural-Approach/dp/1558608486)」を読むと良いでしょう。残念なことにこの本は数年前に絶版になってしまいましたが、図書館や中古で見つけることができるでしょう（第1版のPDF版はオンラインで手に入りますが買わないように。お金の無駄です。1994年に出版されたもので、第3版に載っている地形生成についての部分は含まれていません）。

### Domain Warping

### ドメインワーピング

[Inigo Quiles wrote this other fascinating article](http://www.iquilezles.org/www/articles/warp/warp.htm) about how is possible to use fBm to warp a space of a fBm. Mind blowing, Right? Is like the dream inside the dream of Inception.

Inigo Quilesはこの[興味をそそる記事](http://www.iquilezles.org/www/articles/warp/warp.htm)でfBMを使ってfBMの空間を歪める方法について書いています。ぶっ飛んでますね。インセプションに出てくる夢の中の夢のようです。

![ f(p) = fbm( p + fbm( p + fbm( p ) ) ) - Inigo Quiles (2002)](quiles.jpg)

A less extreme example of this technique is the following code where the wrap is use to produce something this clouds-like texture. Note how the self-similarity property is still present in the result.

下記はこのテクニックのもう少しおとなしいサンプルです。空間の歪みが雲のようなテクスチャを作り出すのに使われています。ここでもまた自己相似性が見られることに注目してください。

<div class='codeAndCanvas' data='clouds.frag'></div>

Warping the texture coordinates with noise in this manner can be very useful, a lot of fun, and fiendishly difficult to master. It's a powerful tool, but it takes quite a bit of experience to use it well. A useful tool for this is to displace the coordinates with the derivative (gradient) of noise. [A famous article by Ken Perlin and Fabrice Neyret called "flow noise"](http://evasion.imag.fr/Publications/2001/PN01/) is based on this idea. Some modern implementations of Perlin noise include a variant that computes both the function and its analytical gradient. If the "true" gradient is not available for a procedural function, you can always compute finite differences to approximate it, although that is less accurate and involves more work.

このようにテクスチャ座標を歪める技はとても便利で、楽しく、しかし非道なほどマスターするのが難しいものです。とても強力なツールですが使いこなすにはかなりの経験が必要です。便利なテクニックとしてノイズの微分（勾配）を用いて座標をずらす方法があります。Ken PerlinとFabrice Neyretによる「[flow noise](http://evasion.imag.fr/Publications/2001/PN01/) 」という記事はこのアイデアに基づくものです。最近のパーリンノイズの実装の幾つかは、その関数の値と解析的な勾配の両方を計算してくれます。もしある関数について本物の勾配が得られない場合でも常に、手間がかかり正確さに劣りますが、差分法を用いて近似することができます。

（訳注：要するにノイズの値そのものではなくその微分を使うという話です。微分が直接計算できない場合は微妙にずらした2点の値を計算して差分をとることで近似することができます。この辺りはもう少し説明が必要ですね。参考になるかわかりませんがこの[サンプル](https://thebookofshaders.com/edit.php?log=161119153749)では ```normal``` 関数の中で少し座標をずらしてノイズの値を計算して比較することで傾きを計算しています。）
