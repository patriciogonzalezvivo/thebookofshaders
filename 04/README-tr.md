## Shader'ınızı çalıştırma

Bu kitabın yapımı ve sanat pratiğimin bir parçası olarak, shader'ları oluşturmak, görüntülemek, paylaşmak ve küratörlüğünü yapmak için bir araç ekosistemi oluşturdum. Bu araçlar Linux, MacOS, Windows ve [Raspberry Pi](https://www.raspberrypi.org/) ile tarayıcılarda, kodunuzu değiştirmenize gerek kalmadan tutarlı bir şekilde çalışır.

## Shader'larınızı tarayıcıda çalıştırma

**Görüntüleme**: Bu kitaptaki tüm canlı örnekler, bağımsız shader çalıştırma sürecini inanılmaz derecede kolaylaştıran [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) kullanılarak görüntülenir.

```html
<canvas class="glslCanvas" data-fragment-url="yourShader.frag" data-textures="yourInputImage.png" width="500" height="500"></canvas>
```

Gördüğünüz gibi, sadece `class="glslCanvas"` özelliğine ve `data-fragment-url`'de shader'ınızın URL'sine sahip bir `canvas` öğesine ihtiyaç duyar. Daha fazla bilgi için [buraya](https://github.com/patriciogonzalezvivo/glslCanvas) bakabilirsiniz.

Eğer benim gibi biriyseniz, muhtemelen shader'ları doğrudan konsoldan çalıştırmak isteyeceksiniz, bu durumda [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer)'a göz atmalısınız. Bu uygulama, shader'ları `bash` scriptlerinize veya unix aktarım hatlarına dahil etmenizi ve [ImageMagick](http://www.imagemagick.org/script/index.php) ile benzer şekilde kullanmanızı sağlar. Ayrıca [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer), shader'ları [Raspberry Pi](https://www.raspberrypi.org/) üzerinde derlemek için harika bir yoldur; bu nedenle [openFrame.io](http://openframe.io/) shader sanat eserlerini görüntülemek için onu kullanır. Bu uygulama hakkında daha fazla bilgi için [buraya](https://github.com/patriciogonzalezvivo/glslViewer) bakabilirsiniz.

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -E screenshot,yourOutputImage.png
```

**Oluşturma**: Shader kodlama deneyimini aydınlatmak için [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor) adında çevrimiçi bir düzenleyici yaptım. Bu düzenleyici kitabın canlı örneklerine gömülüdür ve glsl koduyla çalışmanın soyut deneyimini daha somut hale getirmek için bir dizi kullanışlı widget sunar. Ayrıca bunu [editor.thebookofshaders.com/](http://editor.thebookofshaders.com/) adresinden bağımsız bir web uygulaması olarak da çalıştırabilirsiniz. Daha fazla bilgi için [buraya](https://github.com/patriciogonzalezvivo/glslEditor) bakabilirsiniz.

![](glslEditor-01.gif)

Çevrimdışı çalışmayı tercih ediyorsanız ve [SublimeText](https://www.sublimetext.com/) kullanıyorsanız, bu [glslViewer paketini](https://packagecontrol.io/packages/glslViewer) kurabilirsiniz. Daha fazla bilgi için [buraya](https://github.com/patriciogonzalezvivo/sublime-glslViewer) bakabilirsiniz.

![](glslViewer.gif)

**Paylaşma**: Çevrimiçi düzenleyici ([editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)) shader'larınızı paylaşabilir! Hem gömülü hem de bağımsız sürümde, shader'ınıza özgü bir URL almanızı sağlayan bir dışa aktarma düğmesi bulunur. Ayrıca doğrudan bir [openFrame.io](http://openframe.io/)'ya dışa aktarma yeteneğine de sahiptir.

![](glslEditor-00.gif)

**Küratörlük**: Kodunuzu paylaşmak, shader'ınızı bir sanat eseri olarak paylaşmanın başlangıcıdır! [openFrame.io](http://openframe.io/)'ya dışa aktarma seçeneğinin yanı sıra, shader'larınızı herhangi bir siteye gömülebilecek bir galeriye dönüştürmek için [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery) adlı bir araç yaptım. Daha fazla bilgi için [buraya](https://github.com/patriciogonzalezvivo/glslGallery) bakabilirsiniz.

![](glslGallery.gif)

## Shader'larınızı favori framework'ünüzde çalıştırma

[Processing](https://processing.org/), [Three.js](http://threejs.org/), [OpenFrameworks](http://openframeworks.cc/) veya [SFML](https://www.sfml-dev.org/) gibi bir framework'te programlama deneyiminiz varsa, muhtemelen rahat hissettiğiniz bu platformlarda shader'ları denemekten heyecan duyarsınız. Aşağıda, bu kitap boyunca kullanacağımız aynı uniform'larla bazı popüler framework'lerde shader'ların nasıl kurulacağına dair örnekler bulunmaktadır. (Bu [bölümün GitHub deposunda](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04), bu üç framework için tam kaynak kodunu bulacaksınız.)

### **Three.js**'de

Parlak ve çok alçakgönüllü Ricardo Cabello (namıdiğer [MrDoob](https://twitter.com/mrdoob)), diğer [katkıda bulunanlarla](https://github.com/mrdoob/three.js/graphs/contributors) birlikte muhtemelen WebGL için en ünlü framework'lerden birini geliştiriyor: [Three.js](http://threejs.org/). Harika 3D grafikler yapmak için bu JavaScript kütüphanesini nasıl kullanacağınızı öğreten birçok örnek, öğretici ve kitap bulacaksınız.

Aşağıda, three.js'de shader'larla başlamak için ihtiyacınız olan HTML ve JS örneği yer almaktadır. `id="fragmentShader"` script'ine dikkat edin, bu kitapta bulduğunuz shader'ları buraya kopyalayabilirsiniz.

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

### **Processing**'de

2001 yılında [Ben Fry](http://benfry.com/) ve [Casey Reas](http://reas.com/) tarafından başlatılan [Processing](https://processing.org/), kodlamada ilk adımlarınızı atmak için son derece basit ve güçlü bir ortamdır (en azından benim için öyleydi). [Andres Colubri](https://codeanticode.wordpress.com/), Processing'de OpenGL ve video konusunda önemli güncellemeler yaparak, bu dostane ortamda GLSL shader'larını kullanmayı ve denemeyi her zamankinden daha kolay hale getirdi. Processing, sketch'in `data` klasöründe `"shader.frag"` adlı shader'ı arayacaktır. Burada bulduğunuz örnekleri o klasöre kopyaladığınızdan ve dosya adını değiştirdiğinizden emin olun.

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

Shader'ın 2.1'den önceki sürümlerde çalışması için, shader'ınızın başına şu satırı eklemeniz gerekir: `#define PROCESSING_COLOR_SHADER`. Böylece şöyle görünmelidir:

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

Processing'de shader'lar hakkında daha fazla bilgi için bu [öğreticiye](https://processing.org/tutorials/pshader/) göz atın.

### **openFrameworks**'de

Herkesin rahat hissettiği bir yer vardır, benim için bu hâlâ [openFrameworks topluluğudur](http://openframeworks.cc/). Bu C++ framework'ü OpenGL ve diğer açık kaynak C++ kütüphanelerinin etrafını sarar. Birçok yönden Processing'e çok benzer, ancak C++ derleyicileriyle uğraşmanın bariz karmaşıklıkları vardır. Processing ile aynı şekilde, openFrameworks shader dosyalarınızı data klasöründe arayacaktır, bu yüzden kullanmak istediğiniz `.frag` dosyalarını kopyalayıp yüklerken adını değiştirmeyi unutmayın.

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

GlslViewer ve GlslCanvas spesifikasyonlarında bulunan tüm uniform'ları OpenFrameworks'de daha basit bir şekilde kullanmak istiyorsanız, [ofxShader](https://github.com/patriciogonzalezvivo/ofxshader) eklentisini kullanmanızı öneririm; bu eklenti aynı zamanda birden fazla tampon, malzeme shader'ları, anında yeniden yükleme ve Raspberry Pi'de OpenGL ES için otomatik dönüştürme desteğine de sahip olacaktır. Ve kodunuz şu kadar basit olacaktır:

```cpp
//--------------------------------------------------------------
void ofApp::setup(){
    ofDisableArbTex();
    
    sandbox.allocate(ofGetWidth(), ofGetHeight());
    sandbox.load("grayscott.frag");
}

//--------------------------------------------------------------
void ofApp::draw(){
    sandbox.render();
    sandbox.draw(0, 0);
}
```


openFrameworks'te shader'lar hakkında daha fazla bilgi için [Joshua Noble](http://thefactoryfactory.com/) tarafından hazırlanan bu [mükemmel öğreticiye](http://openframeworks.cc/ofBook/chapters/shaders.html) gidin.
