## اجرا کردن شیدر

به عنوان بخشی از ساخت این کتاب در این قسمت، اکوسیستمی از ابزار ها برای ایجاد و نمایش و یا اشتراک گذاری شیدر ها ایجاد کردم. این ابزار ها به راحتی روی لینوکوس، مک و ویندوز و حتی [رزبری پای](https://www.raspberrypi.org/) و همچنین مرورگر ها، بدون نیاز به تعویض کد اجرا می‌شوند.

## اجرا کردن شیدر روی مرورگر

**نمایش**: تمام مثال های این کتاب توسط [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) به نمایش در می‌آید، که روند اجرای شیدر های مستقل را بسیار آسان می‌کند.

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```

همانطور که می‌بینید فقط به یک المان `canvas` با تعریف `class="glslCanvas"` و url شیدر شما در `data-fragment-url`. نیاز است. برای آشنایی بیشتر [اینجا](https://github.com/patriciogonzalezvivo/glslCanvas).

اگر مثل من هستنید و دوست دارید مستیقا شیدر هارا را روی کنسول اجرا کنید, در اینضورت باید یک نگاهی به [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) بیاندازید. این برنامه این امکان را به شما می‌دهد که شیدر ها را در روی bash یا unix pipelines به روش مشابه [ImageMagick](http://www.imagemagick.org/script/index.php) استفاده کنید. همچنین [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) یک روش خوب برای کامپایل شیدر روی  [Raspberry Pi](https://www.raspberrypi.org/) است, به همین علت [openFrame.io](http://openframe.io/) از آن برای نمایش شیدر ها استفاده می‌کند. درمورد این نرم افزار بیشتر بدانید در  [اینجا](https://github.com/patriciogonzalezvivo/glslViewer).

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -E screenshot,yourOutputImage.png
```

**ساخت**: برای تجربه برنامه نویسی شیدر ها، من یک ویرایشگر آنلاین  [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor) ساختم. این ویرایشگر در مثال های این کتاب هم تعبیه شده است,  این مجموعه ابزارک های مفیدی را هم فراهم می‌کند تا تجربه کار با کد glsl را ملموس تر کند. همچنین آن را بعنوان یک برنامه وب مستقل هم می‌توانید در [editor.thebookofshaders.com/](http://editor.thebookofshaders.com/) استفاده کنید. اطلاعات بیشتر در [اینجا](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

اگر تمایل به آفلاین کار کردن دارید، از [SublimeText](https://www.sublimetext.com/) استفاده کنید، میتوانید رو [package for glslViewer](https://packagecontrol.io/packages/glslViewer) نصب کنید. برای اطلاعات بیشتر [اینجا](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**اشتراک گذاری**: ادیتور آنلاین ([editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)) می‌تواند شیدر های شما را به اشتراک بگذارد! هر دو نسخه دارای دکمه اکسپورت هستند که می‌تواند یک آدرس منحصر به فرد برای شیدر شما ایجاد کند. همچنین توانایی اکسپورت مستقیم به [openFrame.io](http://openframe.io/) هم وجود دارد.

![](glslEditor-00.gif)

**ذخیره و نگه داری**:اشتراک گذاری کدتان قدم اول برای اشتراک گذاری آن ها به عنوان اثر هنریست. علاوه بر گزینه خروجی گرفتن برای [openFrame.io](http://openframe.io/) من یک ابزار برای اشتراک گذاری آثار شما در سایت هم در نظر گرفتم, با نام [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery). بیشتر بدانید [اینجا](https://github.com/patriciogonzalezvivo/glslGallery).

![](glslGallery.gif)

## اجرا کردن شیدر هایتان در فریمورک ها دلخواهتان
اگر تجربه کار با فریمورک هایی مثل: [Processing](https://processing.org/), [Three.js](http://threejs.org/),[OpenFrameworks](http://openframeworks.cc/) یا [SFML](https://www.sfml-dev.org/) دارید, برای استفاده از آن ها برای شیدر نویسی هم هیجان زده خواهید شد. در ادامه نمونه هایی از چگونگی تنطیم فریمورک ها برای اجرای شیدر ها با همان چارچوب گفته شده در ان کتاب می‌پردازم. (در [GitHub repository for this chapter](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04) ,سورس کد کامل برای استفاده از این سه فریمورک را می‌یابید.)

### در **Three.js**

ریکاردو کابلوی نابغه و فروتن (aka [MrDoob](https://twitter.com/mrdoob) ) همراه برخی دیگر، توسعه [contributors](https://github.com/mrdoob/three.js/graphs/contributors) را برعهده داشتند، که یکی از معروف ترین فریمورک های WebGl, یعنی [Three.js](http://threejs.org/) است. مثال ها، آموزش ها و کتاب های زیادی را در مورد این کتاب خانه جاوا اسکریپت برای ساخت گرافیک سه بعدی می‌توانید پیدا کنید.

در زیر مثالی از html و JS آورده شه است که برای شروع کار با شیدره  در three.js نیاز است. به این عبارت `id="fragmentShader"` دقت کنید, اینجا جاییست که شیدر های این کتاب را در آنجا می‌توانی کپی کنید.

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

### در **Processing**

[Processing](https://processing.org/) ساخته شده توسط [Ben Fry](http://benfry.com/) و [Casey Reas](http://reas.com/) ,  یک محیط فوق العاده ساده و قدرتمند است که می‌توانید در آن اولین قدم های کد زنی خود را بردارید. (حداقل برای من اینگونه بود). [Andres Colubri](https://codeanticode.wordpress.com/) بروزرسانی های مهمی به OpenGl  و پردازش ویدئو آن اضافه کرده است, که استفاده از شیدر های GLSL را در این محیط دوستانه بسیار آسان می‌کند. این برنامه به دنبال فایل `"shader.frag"` در پوشه `data` داخل `sketch` می‌گردد. مطمئن شوید که نمونه هایی که از اینجا در آن پوشه کپی می‌کنید، تغییر نام دهید.

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

برای اینکه شیدر ها در نسخه های قبل از 2.1 کار کند, باید خط مقابل را به اول شیدر خود اضافه کنید: `#define PROCESSING_COLOR_SHADER`. این شکلی خواهد شد:

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

برای اطلاعات بیشتر در مورد استفاده از شیدر ها در processing این آموزش را نگاه کنید [اینجا](https://processing.org/tutorials/pshader/).

### در **openFrameworks**

هرکسی در جای خاصی احساس راحتی می‌کند, در مورد من, هنوز هم [openFrameworks community](http://openframeworks.cc/) است. این فریمورک cpp در چارچوب OpenGl و برخی کتابخانه های دیگر cpp هست. بسیار شبیه processing هم هست, اما با عوارض واضحی همچون سر و کله زدن با کامپایلر cpp. با همان روش processing ، openFrameWorks فایل های شیدر شما را در پوشه Data جستجو می‌کند،پس جایگازی و تغییر نام فایل های frag  را فراموش نکنید.
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

اگر میخواهید از مجموعه کامل یونیفرم ها شامل GlslViewer , GlslCanvas  به روش ساده تری در OpenFrameworks استفاده کنید،  استفاده از[ofxShader](https://github.com/patriciogonzalezvivo/ofxshader) را پیشنهاد میدهم که، که افزونه ایست که توانایی استفاده از چندین بافر، متریال و شیدر و هات ریلود و همچنین تبدیل اتوماتیک برای OpenGl در رزبری پای را امکان می‌سازد. و کد شما به همین سادگی انجام می‌شود.

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


برای اطلاعات بیشتر در مورد استفاده از شیدر ها در openFrameworks سری به  [excellent tutorial](http://openframeworks.cc/ofBook/chapters/shaders.html) ساخته شده توسط [Joshua Noble](http://thefactoryfactory.com/) بزنید.
