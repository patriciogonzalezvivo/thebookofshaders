# イントロダクション

この文書はPatricio Gonzalez Vivoの The Book of Shader の日本語訳です。
技術的な内容はできる限り正確に伝えるように心がけますが、その他の部分ではざっくり簡略化したり言葉を補ったり、表現を変えることもあると思います。英語が得意な方はぜひ原文読んでみてください。
フィードバックには[githubのレポジトリ](https://github.com/patriciogonzalezvivo/thebookofshaders)をご利用ください。

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

上の2枚の画像は全く異なる方法で作られたものです。1枚目の画像はゴッホが時間をかけて絵の具を塗り重ねて描いたものです。2枚目はシアン、マゼンタ、イエロー、ブラックの4色の網点の組み合わせでほんの短い時間で生み出されました。2枚目の画像は手順を重ねるのではなく、すべての点が同時に描かれているというのが大きな違いです。

これはデジタルな画像生成を次の次元に押し上げる、フラグメントシェーダーというグーテンベルグの活版印刷にも匹敵する画期的な技術についての本です。

![Gutenberg's press](gutenpress.jpg)

フラグメントシェーダーを使うと画面に表示されるピクセルを非常に高速かつ自由にコントロールすることができます。そのためフラグメントシェーダーはスマートフォンで映像にフィルターをかけるようなことから、驚くようなクオリィティの3Dゲームまで、様々な用途に使われています。


![Journey by That Game Company](journey.jpg)

この後につづく章ではフラグメントシェーダーがどれだけ高速でパワフルな技術かについて、またシェーダーを仕事や個人のプロジェクトの中で使う方法について説明します。

## 想定される読者

この本はプログラム経験と基本的な線形代数や三角関数の知識があり、ひとレベル上の刺激的なグラフィックを目指すクリエイティブコーダー、ゲームディベロッパーなどの開発者に向けて書かれています。もしコーディングについて学びたい場合は[Processing](https://processing.org/)を勉強することから始めて戻ってくることをお勧めします。

この本ではフラグメントシェーダーをプロジェクトに組み込む方法、パフォーマンスやグラフィックのクオリティを改善する方法について学ぶことができます。GLSL (OpenGL Shading Language, OpenGLシェーダー言語)は様々なプラットフォーム上でコンパイルして走らせることができるので、ここで学習したことはOpenGL、OpenGL ESまたはWebGLを使うことのできるどんな環境でも生かすことができます。

たとえば、[Processing](https://processing.org/)のスケッチ、 [openFrameworks](http://openframeworks.cc/)で作ったアプリケーション、 [Cinder](http://libcinder.org/)で作ったインスタレーション、 [Three.js](http://threejs.org/)を用いたウェブサイトやiOS/Androidのゲームなどが対象になります。

## この本で取り上げること

この本では主にGLSLのフラグメントシェーダーについて説明します。シェーダーとは何かの定義から始まり、プログラムを用いて形や模様、質感や動きを作る方法について学びます。シェーダー言語の基礎とともに、畳み込み、ぼかし、カラーフィルター、ルックアップテーブルなどの画像処理技術、コンウェイのライフゲーム、グレイ=スコットの反応拡散系、水の波紋、水彩、ボロノイ図のようなシミュレーションなどより役に立つシナリオに応用する方法についても説明します。本の終わりの方ではレイマーチングに基づく高度なテクニックにも触れます。

どの章にも実際に動かして試すことのできるサンプルがついています。サンプルのコードを書き換えれば結果を即座に見ることもできます。抽象的でわかりにくいコンセプトも、実際に試してみることでより学習が楽になるでしょう。

この本で取り上げないこと

* この本はOpenGLやWebGLの本ではありません。OpenGL、WebGLはGLSLやフラグメントシェーダーよりもより広いトピックです。もしOpenGL、WebGLについてもっと学びたい場合は下記のページや本をお勧めします。
  - [OpenGL Introduction](https://open.gl/introduction)
  - [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (赤本)
  - [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* この本は数学の本ではありません。代数や三角関数が必要なアルゴリズムやテクニックもとりあげますが、数学についての詳しい説明は省略します。数学的な概念について知りたい場合は下記の本を手元に置いておくと良いでしょう。
  - [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games)
  - [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## 必要なもの

必要なものはそんなにありません。Chrome、FirefoxやSafariなどWebGLの使えるモダンブラウザーとインターネットがあれば始められます。ページの最後にある「Next」をクリックして進みましょう。

もし必要な場合は下記もご覧ください（訳注：いまのところ英語のみです。そのうち翻訳するかもしれません）。

- [Make an off-line version of this book](http://thebookofshaders.com/appendix/)

- [Run the examples on a RaspberryPi without a browser](http://thebookofshaders.com/appendix/)

- [Make a PDF of the book to print](http://thebookofshaders.com/appendix/)

- Use the [on-line repository](https://github.com/patriciogonzalezvivo/thebookofshaders) to help resolve issues and share code.
