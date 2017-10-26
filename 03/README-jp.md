## ユニフォーム変数

ここまで、GPUが沢山のスレッドを並列に処理する様子を見てきました。それぞれのスレッドは画像の各部分への色の割り当てを受け持っています。シェーダーではスレッド間の情報のやりとりを行うことはできませんが、CPUからそれぞれのスレッドに入力を送ることはできます。グラフィックカードは全てのスレッドにまったく同じ入力を、読み取り専用で送るように設計されています。それぞれのスレッドは同じデータを受け取り、それを書き換えることはできません。（訳注：英語の”uniform”には均一な、一様な、という意味があります）

これらの入力は ```uniform``` 変数と呼ばれGLSLでサポートされているほとんどの型が使えます。サポートされている型には ```float```、```vec2```、```vec3```、```vec4```、```mat2```、```mat3```、```mat4```、```sampler2D```、```samplerCube``` などがあります。
uniform変数はシェーダーの冒頭、浮動小数点精度の設定の後に型指定付きで定義します。

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;	  // Time in seconds since load
```

uniform変数はCPUとGPUの間の小さな架け橋だと考えることができます。変数の名前は実装次第で変わりますが、この本のサンプルでは一貫して```u_time```（シェーダーが開始してから経過した秒数）、```u_resolution```（シェーダーが描画する領域の大きさ）、```u_mouse```（描画領域の中のマウスの位置）を渡すことにします。ここでは変数の種類を示すためにuniform変数の名前は ```u_``` で始めるという慣例に従っていますが、他の場所では異なる名前が使われているのも見かけることでしょう。
例えば[ShaderToy.com](https://www.shadertoy.com/)では同じ意味を持つuniform変数に下記の名前が付けられています。


```glsl
uniform vec3 iResolution;   // viewport resolution (in pixels)
uniform vec4 iMouse;        // mouse pixel coords. xy: current, zw: click
uniform float iTime;        // shader playback time (in seconds)
```

（訳注：uniform変数は開発者が自由に名前を決めることができ、上で挙げられている用途以外にも自由に使うことができます。C、JavascriptなどのCPUで走るプログラムからは、シェーダー側で決めた変数の名前を指定して値を渡すことができます）

説明はこれくらいにしてuniform変数を実際に使ってみましょう。下記のコードでは、```u_time```（シェーダーが実行を始めてからの秒数）をサイン関数と組み合わせて使い、赤い画面の色を変化させています。

<div class="codeAndCanvas" data="time.frag"></div>

GPUの驚くべき機能の1つには、角度や三角関数、指数関数などがハードウェア上で高速に処理されることが挙げられます。サポートされる関数には [```sin()```](../glossary/?search=sin)、 [```cos()```](../glossary/?search=cos)、[```tan()```](../glossary/?search=tan)、 [```asin()```](../glossary/?search=asin)、[```acos()```](../glossary/?search=acos)、 [```atan()```](../glossary/?search=atan)、[```pow()```](../glossary/?search=pow)、 [```exp()```](../glossary/?search=exp)、[```log()```](../glossary/?search=log)、 [```sqrt()```](../glossary/?search=sqrt)、[```abs()```](../glossary/?search=abs)、 [```sign()```](../glossary/?search=sign)、[```floor()```](../glossary/?search=floor)、 [```ceil()```](../glossary/?search=ceil)、[```fract()```](../glossary/?search=fract)、 [```mod()```](../glossary/?search=mod)、[```min()```](../glossary/?search=min)、 [```max()```](../glossary/?search=max)、[```clamp()```](../glossary/?search=clamp) などがあります。

さて、また上のコードで色々と実験をしてみましょう。

* 色が変わる頻度を下げて、変化にほとんど気がつかなくなるまで遅くしてみましょう。

* 変化のスピードを上げて、点滅がなくなりひとつの色に見えるまで速くしてみましょう。

* 3つのチャンネル（rgb）の変化の頻度を別々に変えて、面白いパターンを作ってみましょう。

## gl_FragCoord

デフォルトの出力として ```vec4 gl_FragColor``` を使うことができるのと同様に、GLSLにはデフォルトの入力として画面上の「フラグメント」、つまりピクセルの位置を表す ```vec4 gl_FragCoord``` が用意されています。```vec4 gl_FragCoord``` を使うとスレッドが描画領域内のどこで作業をしているかを知ることができます。この ```gl_FragCoord```はスレッドごとに異なる値を持っているためuniform変数とは呼ばず、代わりにvarying変数と呼びます。

<div class="codeAndCanvas" data="space.frag"></div>

上のサンプルではフラグメントの座標を描画領域全体のサイズで割ることによって正規化しています。こうすると座標値の範囲が ```0.0``` から ```1.0``` の間に収まるため、簡単にx座標とy座標の値をr（赤）とg（緑）のチャンネルに対応させることができます。

シェーダーの世界ではデバッグに使える手段は限られています。判別しやすい色を変数の値に割り当てて確認するのは数少ない方法の一つです。GLSLのコーディングは時としてガラス瓶の中に船の模型を組み立てるのに似ています。どちらも同じくらい難しいですが、結果は美しく達成感があるものです。

![](08.png)

それでは、サンプルが理解できているか確かめてみましょう。

* 座標 ```(0.0,0.0)``` が描画領域のどこを指すかわかりますか？

* ```(1.0,0.0)```、```(0.0,1.0)```、```(0.5,0.5)```、```(1.0,1.0)``` はどうでしょう？

* ```u_mouse``` の使い方はわかりますか？ ```u_mouse``` の値は正規化されていないことに注意してください。この変数を使って色を変化させることはできますか？

* ```u_time``` と ```u_mouse``` の座標を使って色のパターンを自由に変化させてみましょう。

さて、課題を終えたところで、このシェーダーの力を他にどこで使うことができるのか興味が湧いているのではないでしょうか。
次の章ではオリジナルのシェーダーをthree.js、Processing、openFrameworkで使う方法について説明します。
