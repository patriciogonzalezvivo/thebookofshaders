# イントロダクション

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

上の2枚の画像は全く異なる方法で作られたものです。1枚目の画像はゴッホが時間をかけて絵の具を塗り重ねて描いたものです。2枚目はシアン、マゼンタ、イエロー、ブラックの4色の網点の組み合わせでほんの短い時間で生み出されました。2枚目の画像は手順を重ねるのではなく、すべての点が同時に描かれているという大きな違いがあります。

この本はフラグメントシェーダーという、デジタル映像を次の次元へと誘う革命的な計算処理技術についての本です。フラグメントシェーダーは印刷にとってのグーテンベルグの活版技術に匹敵すると考えることもできます。

![Gutenberg's press](gutenpress.jpg)

フラグメントシェーダーを使うと画面に表示されるピクセルをとても高速に、かつ自由にコントロールすることができます。そのためこの技術はスマートフォンで映像にフィルターをかけることから、驚くようなクオリティの3Dゲームまで、様々な用途に使われています。


![Journey by That Game Company](journey.jpg)

この後につづく章ではフラグメントシェーダーがどれだけ高速でパワフルな技術かについて、またシェーダーを仕事や個人的なプロジェクトで使う方法について説明します。

## 想定される読者

この本はプログラムの経験と基本的な線形代数や三角関数の知識があり、ワンランク上のグラフィックを目指すクリエイティブコーダー、ゲームデベロッパーなどの開発者に向けて書かれています。もしコーディングについて学びたい場合は[Processing](https://processing.org/)をまず勉強して戻ってくることをお勧めします。

この本ではフラグメントシェーダーをプロジェクトに組み込む方法、パフォーマンスやグラフィックのクオリティを改善する方法を学ぶことができます。GLSL (OpenGL Shading Language, OpenGLシェーダー言語)は様々なプラットフォーム上でコンパイルして走らせることができるので、ここで学習したことはOpenGL、OpenGL ESまたはWebGLが使えるのできるどんな環境でも生かすことができます。

たとえば、[Processing](https://processing.org/)のスケッチ、 [openFrameworks](http://openframeworks.cc/)で作ったアプリケーション、 [Cinder](http://libcinder.org/)で作ったインスタレーション、 [Three.js](http://threejs.org/)を用いたウェブサイトやiOS/Androidのゲームなどが対象です。

## この本で取り上げること

この本では主にGLSLのフラグメントシェーダーについて説明します。シェーダーとは何かの定義から始まり、プログラムを用いて形や模様、質感や動きを作る方法を学びます。シェーダー言語の基礎とともに、畳み込み、ぼかし、カラーフィルター、ルックアップテーブルなどの画像処理技術、コンウェイのライフゲーム、グレイ=スコットの反応拡散系、水の波紋、水彩、ボロノイ図のようなシミュレーションなど、より実践的に活用する方法についても学習します。さらにレイマーチングに基づく高度なテクニックにも触れます。

どの章にも実際に動かせるサンプルがついています。サンプルのコードを書き換えれば結果をその場で見ることもできます。難解なコンセプトも、実際に試してみることでよりスムーズに理解できるでしょう。

この本で取り上げないこと

* この本はOpenGLやWebGLの本ではありません。OpenGL、WebGLはGLSLやフラグメントシェーダーを含むより広範なトピックです。もしOpenGL、WebGLについてもっと学びたい場合は下記のWebページや本をお勧めします。
  - [OpenGL Introduction](https://open.gl/introduction)
  - [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (赤本)
  - [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* この本は数学の本ではありません。代数や三角関数が必要なアルゴリズムやテクニックもとりあげますが、数学についての詳しい説明は省略します。数学的な概念について知りたい場合は下記の本を手元に置いておくと良いでしょう。
  - [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games)
  - [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## 必要なもの

Chrome、FirefoxやSafariなどWebGLの使える今時のブラウザーとインターネットさえあれば始められます。ページの最後にある「Next」をクリックして先に進みましょう。

もし必要な場合は下記もご覧ください。（訳注：いまのところ英語のみです。そのうち翻訳します）

- [Make an off-line version of this book](https://thebookofshaders.com/appendix/)

- [Run the examples on a Raspberry Pi without a browser](https://thebookofshaders.com/appendix/)

- [Make a PDF of the book to print](https://thebookofshaders.com/appendix/)

- Use the [on-line repository](https://github.com/patriciogonzalezvivo/thebookofshaders) to help resolve issues and share code.
