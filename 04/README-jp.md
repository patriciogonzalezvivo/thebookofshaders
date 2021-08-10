## シェーダーを使う

この本を書くに当たり自分自身の練習も兼ねて、シェーダーを書いて表示したり、シェアしたり、まとめたりする為のツールを作成しました。このツールはLinux Desktop、 MacOs、[RaspberryPi](https://www.raspberrypi.org/)やブラウザ上で同じように動作します。あなたのコードを書き換える必要はありません。

**表示する**: この本のすべてのサンプルは[glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas)を使って表示されています。glslCanvasを使うとシェーダーを単体で、とても簡単に走らせることができます。

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```

ご覧の通り、必要なのは  ```class="glslCanvas"``` を指定した ```canvas``` 要素に ```data-fragment-url```でシェーダーのURLを指定することだけです。詳しくは[こちら](https://github.com/patriciogonzalezvivo/glslCanvas)をご覧ください。

もしあなたが私のような人だったら、コンソールから直接シェーダーを走らせたいと思うでしょう。その場合は[glslViewer](https://github.com/patriciogonzalezvivo/glslViewer)を試してみてください。このアプリケーションを利用すると[ImageMagic](http://www.imagemagick.org/script/index.php)を使うのと同じような方法で、シェーダーをbashスクリプトやUNIXパイプラインで使うことができます。[glslViewer](https://github.com/patriciogonzalezvivo/glslViewer)は[RaspberryPi](https://www.raspberrypi.org/)でシェーダーをコンパイルするのにとても便利なので、[openFrame.io](http://openframe.io/)でもglslViewerをシェーダーによる作品の表示に使っています。詳しくは[こちら](https://github.com/patriciogonzalezvivo/glslViewer)をご覧ください。

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -s 1 -o yourOutputImage.png
```

**作成する**: シェーダーのコーディングを簡単にするため、[glslEditor](https://github.com/patriciogonzalezvivo/glslEditor)というオンラインのエディターを用意しました。このエディターはこの本のサンプルにも埋め込まれています。glslEditorには幾つもの便利なウィジェットが備わっていて、直接触って具体的に結果を見ることで、抽象的なglslのコーディングをより理解しやすくしてくれます。[editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)から単体で使うこともできます。詳しくは[こちら](https://github.com/patriciogonzalezvivo/glslEditor)をご覧ください。

![](glslEditor-01.gif)

もしオフラインで[SublimeText](https://www.sublimetext.com/)を使って作業したい場合はこの[glslViewerのパッケージ](https://packagecontrol.io/packages/glslViewer)をインストールすることもできます。詳しくは[こちら](https://github.com/patriciogonzalezvivo/sublime-glslViewer)をご覧ください。

![](glslViewer.gif)

**シェアする**: オンラインのglslEditorを使うとあなたのシェーダーをシェアすることもできます。ページに埋め込まれたものもスタンドアローン版にもexportボタンがあり、あなたのシェーダーのURLを取得することができます。また、[openFrame.io](http://openframe.io/)に直接シェアすることもできます。

![](glslEditor-00.gif)

**まとめる**: コードをシェアしてあなたのシェーダーを作品として共有しましょう。[openFrame.io](http://openframe.io/)に書き出す以外にも、あなたのシェーダーをまとめてウェブサイトに埋め込むことのできるツールを用意しました。このツールは[glslGallery](https://github.com/patriciogonzalezvivo/glslGallery)と呼ばれています。詳しくは[こちら](https://github.com/patriciogonzalezvivo/glslGallery)をご覧ください.


![](glslGallery.gif)


## 好みのフレームワークでシェーダーを実行する

もし[Processing](https://processing.org/)、[Three.js](http://threejs.org/)、[OpenFrameworks](http://openframeworks.cc/) 、[SFML](https://www.sfml-dev.org/)などのフレームワークを使ったブログラミングの経験があるならば、慣れ親しんだ環境でシェーダーを試してみたいと思うでしょう。下記では人気のあるこれらのフレームワークで、この本で紹介するシェーダーを実行できるように設定する方法をお見せします（この本の[GitHubのリポジトリ](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04)にはこれら3つのフレームワークのためのソースコードが丸ごと置いてあります）。

### **Three.js**を使う

謙虚で才気あふれる[Ricardo Cabello（MrDoob）](https://twitter.com/mrdoob)と[その他のメンバー](https://github.com/mrdoob/three.js/graphs/contributors)によって開発された[Three.js](http://threejs.org/)は、おそらく最も良く知られたWebGLのフレームワークのひとつです。このJavascriptのライブラリを使って3Dグラフィックを作る方法を学べる、サンプルやチュートリアル、本も沢山あります。

下記はシェーダーをThree.jsで使うために必要なHTMLとJavascriptのサンプルです。```id="fragmentShader"```と書かれたスクリプトに注目してください。ここに、この本に登場するシェーダーをコピーして実行することができます。

```html
<body>
    <div id="container"></div>
    <script src="js/three.min.js"></script>
    <script id="vertexShader" type="x-shader/x-vertex">
        void main() {
            gl_Position = vec4( position, 1.0 );
        }
    </script>
    <script id="fragmentShader" type="x-shader/x-fragment">
        uniform vec2 u_resolution;
        uniform float u_time;

        void main() {
            vec2 st = gl_FragCoord.xy/u_resolution.xy;
            gl_FragColor=vec4(st.x,st.y,0.0,1.0);
        }
    </script>
    <script>
        var container;
        var camera, scene, renderer, clock;
        var uniforms;

        init();
        animate();

        function init() {
            container = document.getElementById( 'container' );

            camera = new THREE.Camera();
            camera.position.z = 1;

            scene = new THREE.Scene();
            clock = new THREE.Clock();

            var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

            uniforms = {
                u_time: { type: "f", value: 1.0 },
                u_resolution: { type: "v2", value: new THREE.Vector2() },
                u_mouse: { type: "v2", value: new THREE.Vector2() }
            };

            var material = new THREE.ShaderMaterial( {
                uniforms: uniforms,
                vertexShader: document.getElementById( 'vertexShader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentShader' ).textContent
            } );

            var mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );

            container.appendChild( renderer.domElement );

            onWindowResize();
            window.addEventListener( 'resize', onWindowResize, false );

            document.onmousemove = function(e){
              uniforms.u_mouse.value.x = e.pageX
              uniforms.u_mouse.value.y = e.pageY
            }
        }

        function onWindowResize( event ) {
            renderer.setSize( window.innerWidth, window.innerHeight );
            uniforms.u_resolution.value.x = renderer.domElement.width;
            uniforms.u_resolution.value.y = renderer.domElement.height;
        }

        function animate() {
            requestAnimationFrame( animate );
            render();
        }

        function render() {
            uniforms.u_time.value += clock.getDelta();
            renderer.render( scene, camera );
        }
    </script>
</body>
```

### **Processing**を使う

[Ben Fry](http://benfry.com/)と[Casey Reas](http://reas.com/)が2001年に開発を始めた[Processing](https://processing.org/) はコーディングを始めるのに最適な、驚くほどシンプルでパワフルな開発環境です（少なくとも私にとってはそうでした）。[Andres Colubri](https://codeanticode.wordpress.com/)はopenGLとビデオに関する重要なアップデートを行いました。これによってProcessingでのシェーダーの使用が今まで以上に簡単になりました。Processingのスケッチは ```data``` フォルダーからシェーダーを検索します。このフォルダーにサンプルコードをコピーして ```shader.frag``` と名前を付けてください。

```cpp
PShader shader;

void setup() {
  size(640, 360, P2D);
  noStroke();

  shader = loadShader("shader.frag");
}

void draw() {
  shader.set("u_resolution", float(width), float(height));
  shader.set("u_mouse", float(mouseX), float(mouseY));
  shader.set("u_time", millis() / 1000.0);
  shader(shader);
  rect(0,0,width,height);
}
```

シェーダーを2.1以前のバージョンで使うには、最初に ```#define PROCESSING_COLOR_SHADER``` を追加する必要があります。つまり以下の様なプログラムになります。

```glsl
#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    gl_FragColor = vec4(st.x,st.y,0.0,1.0);
}
```

Processingでシェーダーを使う方法についてより詳しく知りたい場合は、[このチュートリアル](https://processing.org/tutorials/pshader/)を参照してください。

### **openFrameworks**を使う

誰にでも落ち着ける場所があるものです。私にとっては今でも[openFrameworks](http://openframeworks.cc/)のコミュニティがそうです。このC++のフレームワークは、openGLやその他のC++のライブラリを内包して使いやすくしてくれます。様々な意味でProcessingに似ていますが、C++のコンパイラを扱う分だけ明らかに複雑です。openFrameworksはProcessingと同様に ```data``` フォルダー以下のシェーダーのファイルを検索します。サンプルを ```shader.frag``` にコピーして読み込むようにしてください。

```cpp
void ofApp::draw(){
    ofShader shader;
    shader.load("","shader.frag");

    shader.begin();
    shader.setUniform1f("u_time", ofGetElapsedTimef());
    shader.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    ofRect(0,0,ofGetWidth(), ofGetHeight());
    shader.end();
}
```

openFrameworksでシェーダーを使う方法についてより詳しく知りたい場合は[Joshua Noble](http://openframeworks.cc/ofBook/chapters/shaders.html)の[素晴らしいチュートリアル](http://openframeworks.cc/tutorials/graphics/shaders.html) を参照してください。
