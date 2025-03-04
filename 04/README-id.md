## Menjalankan Shader

Sebagai bagian dari konstruksi buku ini dan latihan seniku, aku membuat ekosistem alat untuk membuat, menampilkan, berbagi, dan mengkurasi shader. Alat ini bekerja secara konsisten di Linux, MacOS, Windows dan [Raspberry Pi](https://www.raspberrypi.org/) dan browser tanpa harus mengubah kodenya.

## Menjalankan Shader pada Browser

**Tampilan**: seluruh contoh langsung dalam buku ini ditampilkan menggunakan [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) yang membuat proses menjalankan shader mandiri sangat mudah.

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```
Seperti yang dapat anda lihat, hanya membutuhkan elemen `kanvas` dengan `class="glslCanvas"` dan url shader anda dalam `data-fragment-url`. Pelajari lebih lanjut tentang itu [di sini](https://github.com/patriciogonzalezvivo/glslCanvas).

Jika anda seperti saya, anda mungkin akan menjalankan shader langsung dari kosol, dalam kasus tersebut anda harus melihat [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer). Aplikasi ini memperbolehkan anda untuk menggabungkan shader ke skrip `bash` atau pipeline unix dan menggunakannya sama mirip [ImageMagick](http://www.imagemagick.org/script/index.php). [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) juga merupakan cara yang bagus untuk menkompilasi shader pada [Raspberry Pi](https://www.raspberrypi.org/), yang mana merupakan alasan [openFrame.io](http://openframe.io/) menggunakan itu untuk menampilkan artwork shader. Pelajari lebih lanjut tentang aplikasi ini [di sini](https://github.com/patriciogonzalezvivo/glslViewer)

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -E screenshot,yourOutputImage.png
```

**Membuat**: untuk menerangi pengalaman pengkodean shader, saya membuat editor online bernama  [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor). Editor ini disematkan pada contoh langsung buku, ini membawa serangkaian widget praktis untuk membuat pengalaman abstrak bekerja dengan kode glsl lebih nyata. Anda juga dapat menjalankannya sebagai aplikasi web mandiri dari [editor.thebookofshaders.com/](http://editor.thebookofshaders.com/). Pelajari lebih lanjut tentang itu [di sini](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

Jika anda memilih untuk mengerjakannya offline menggunakan [SublimeText](https://www.sublimetext.com/) anda dapat memasang [paket untuk glslViewer](https://packagecontrol.io/packages/glslViewer). Pelajari lebih lanjut  [di sini](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**Bagikan**: online editor ([editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)) dapat membagikan shader anda! Baik versi yang disematkan maupun yang berdiri sendiri memiliki tombol ekspor tempat Anda bisa mendapatkan URL unik untuk shader Anda. Juga memiliki kemampuan untuk mengekspor langsung ke [openFrame.io](http://openframe.io/).

![](glslEditor-00.gif)

**Kurasi**: Berbagi kode Anda adalah awal dari Anda membagikan shader sebagai karya seni! Selain opsi untuk mengekspor ke [openFrame.io](http://openframe.io/), saya membuat alat untuk mengkurasi shader Anda ke galeri yang dapat disematkan di situs mana pun, namanya [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery). Pelajari lebih lanjut [di sini](https://github.com/patriciogonzalezvivo/glslGallery).

![](glslGallery.gif)

## Menjalankan Shader pada Framework Favoritmu

Dalam kasus kamu mempunyai pengalaman dalam pemrograman pada framework seperti: [Processing](https://processing.org/), [Three.js](http://threejs.org/), [OpenFrameworks](http://openframeworks.cc/) or [SFML](https://www.sfml-dev.org/), anda mungkin tertarik untuk mencoba shader pada platform yang nyaman bagi anda. Contoh berikut adalah cara untuk menyetel shader pada beberapa framework terkenal denggan uniform yang sama yag akan kita gunakan di seluruh buku ini, (Dalan [Repositori Bithub Bab ini](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04), anda akan menemukan kode sumber lengkap untuk 3 framework ini).

### Dan **Three.js**

Ricardo Cabello yang brilian dan sangat rendah hati (alias [MrDoob](https://twitter.com/mrdoob)) telah berkembang bersama dengan [kontributor lainnya](https://github.com/mrdoob/three.js/graphs/contibutors) mungkin salah satu kerangka kerja paling terkenal untuk WebGL, yang disebut [Three.js](http://threejs.org/). Anda akan menemukan banyak contoh, tutorial dan buku yang mengajarkan Anda bagaimana menggunakan perpustakaan JavaScript ini untuk membuat grafik 3D yang keren.

Di bawah ini adalah contoh HTML dan JS yang Anda butuhkan untuk memulai shader di three.js. Perhatikan skrip `id="fragmentShader`, di sinilah Anda dapat menyalin shader yang Anda temukan di buku ini.

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

### Dalam **Processing**

Dimulai oleh [Ben Fry](http://benfry.com/) dan [Casey Reas](http://reas.com/) pada 2001, [Processing](https://processing.org/) adalah lingkungan yang sangat sederhana dan kuat untuk mengambil langkah pertama Anda dalam kode (setidaknya untuk saya). [Andres Colubri](https://codeanticode.wordpress.com/) telah membuat pembaruan penting pada openGL dan video dalam Processing, membuatnya lebih mudah dari sebelumnya untuk menggunakan dan bermain dengan GLSL shader dalam lingkungan yang ramah ini. Pemrosesan akan mencari shader bernama `"shader.frag"` di folder `data` sketsa. Pastikan untuk menyalin contoh yang Anda temukan di sini ke dalam folder itu dan ganti nama file. 

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

Agar shader bekerja pada versi sebelum 2.1, Anda perlu menambahkan baris berikut di awal shader Anda: `#define PROCESSING_COLOR_SHADER`. Sehingga terlihat seperti ini:

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

Untuk informasi lebih lanjut mengenai shader dalam Processing lihatlah [tutorial ini](https://processing.org/tutorials/pshader/).

### Dalam **openFrameworks**

Setiap orang memiliki tempat yang mereka rasa nyaman, dalam kasus saya, itu masih [komunitas openFrameworks](http://openframeworks.cc/). Framework C++ ini membungkus OpenGL dan library C++ open source lainnya. Dalam banyak hal, ini sangat mirip dengan Pemrosesan, tetapi dengan komplikasi yang jelas saat berurusan dengan kompiler C++. Dengan cara yang sama seperti Processing, openFrameworks akan mencari file shader Anda di folder data, jadi jangan lupa untuk menyalin file `.frag` yang ingin Anda gunakan dan ubah namanya saat Anda memuatnya.

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

Jika Anda ingin menggunakan set lengkap seragam yang berisi spesifikasi GlslViewer dan GlslCanvas dengan cara yang lebih sederhana di OpenFrameworks, saya sarankan menggunakan addon [ofxShader](https://github.com/patriciogonzalezvivo/ofxshader) yang juga akan memiliki dukungan untuk beberapa buffer, material shader, hotreload, dan konversi otomatis untuk OpenGL ES di Raspberry Pi. Dan kode Anda akan sesederhana melakukannya

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

Untuk informasi lebih lanjut mengenai shader dalam openFrameworks lihatlah [tutorial bagus ini](https://processing.org/tutorials/pshader/).


