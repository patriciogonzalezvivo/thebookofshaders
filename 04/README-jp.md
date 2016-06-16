## シェーダーを使う

そろそろ自分の得意なプラットフォームを使ってシェーダーを試してみたいところでしょう。以下ではこの本で使用するのと同じuniform変数を使えるよう、いくつかの一般的なフレームワークでシェーダーを設定する方法をお見せします。（[この章のGitHubレポジトリー](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04)には、この章で取り上げる3つのフレームワークに対応したソースコードが置いてあります）


もしこれらのフレームワークを使わずにブラウザー以外でシェーダーを試したい場合は、[glslViewer](https://github.com/patriciogonzalezvivo/glslViewer)をダウンロードしてコンパイルしてください。
このプログラムは本書のサンプルのために特別に設計されたもので、MacOSまたはRasberryPIの上でターミナルから直接実行することできます。

### **Three.js**を使う

謙虚で才気あふれる[Ricardo Cabello（MrDoob）](https://twitter.com/mrdoob)と[その他のメンバー](https://github.com/mrdoob/three.js/graphs/contributors)によって開発された[Three.js](http://threejs.org/)は、おそらく最もよく知られたWebGLのフレームワークのひとつです。このJavascriptのライブラリを使って3Dグラフィックを作る方法を学べる、サンプルやチュートリアル、本も沢山あります。

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
        var camera, scene, renderer;
        var uniforms;

        init();
        animate();

        function init() {
            container = document.getElementById( 'container' );

            camera = new THREE.Camera();
            camera.position.z = 1;

            scene = new THREE.Scene();

            var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

            uniforms = {
                u_time: { type: "f", value: 1.0 },
                u_resolution: { type: "v2", value: new THREE.Vector2() }
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
            uniforms.u_time.value += 0.05;
            renderer.render( scene, camera );
        }
    </script>
</body>
```

### **Processing**を使う

[Ben Fry](http://benfry.com/)と[Casey Reas](http://reas.com/)が2001年に開発を始めた[Processing](https://processing.org/) はコーディングを始めるのに最適な、驚くほどシンプルでパワフルな開発環境です（少なくとも私にとってはそうでした）。[Andres Colubri](https://codeanticode.wordpress.com/)はopenGLとビデオに関する重要なアップデートを行いました。これによってProcessingでのシェーダーの使用が今まで以上に簡単になりました。Processingのスケッチは ```data``` フォルダーからシェーダーを検索します。このフォルダーにサンプルコードをコピーして ```shader.frag``` と名前を付けてください。

```processing
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
