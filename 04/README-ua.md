## Запуск шейдера

У процесі створення цієї книги та моєї художньої практики, я сформував екосистему інструментів для створення шейдерів, їх відображення, спільного використання та керування. Ці інструменти працюють однаково в Linux, MacOS, Windows, [Raspberry Pi](https://www.raspberrypi.org/) та браузерах без необхідності змінювати код.

## Запуск шейдерів у браузері

**Відображення**: усі інтерактивні приклади в цій книзі відображаються за допомогою [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas), що робить процес запуску автономного шейдера неймовірно простим.

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```

Як бачите, для цього потрібен лише елемент `canvas` із відповідним класом `class="glslCanvas"` та URL-адресою вашого шейдера, заданої в атрибуті `data-fragment-url`. Дізнатися більше про це можна [тут](https://github.com/patriciogonzalezvivo/glslCanvas).

Якщо ви схожі на мене, ви, ймовірно, захочете запускати шейдери безпосередньо з консолі. У такому випадку вам допоможе [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer). Ця програма дозволяє вам включати шейдери у ваші `bash`-скрипти або unix-конвеєри та використовувати їх подібно до [ImageMagick](http://www.imagemagick.org/script/index.php). Також [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) є чудовим способом компіляції шейдерів на [Raspberry Pi](https://www.raspberrypi.org/), через що [openFrame.io](http://openframe.io/) використовує його для демонстрації шейдерних робіт. Дізнайтеся більше про цю програму за цим [посиланням](https://github.com/patriciogonzalezvivo/glslViewer).

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -E screenshot,yourOutputImage.png
```

**Створення**: щоб покращити досвід кодування шейдерів, я створив онлайн-редактор під назвою [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor). Цей редактор використовується в інтерактивних прикладах книги та пропонує низку зручних віджетів, що робить взаємодію з абстрактним кодом glsl більш відчутним. Ви також можете запустити його як окрему вебпрограму: [editor.thebookofshaders.com](http://editor.thebookofshaders.com/). Дізнатися більше про редактор можна [тут](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

Якщо ви бажаєте працювати з редактором офлайн за допомогою [SublimeText](https://www.sublimetext.com/), то можете встановити цей [пакет для glslViewer](https://packagecontrol.io/packages/glslViewer). Дізнайтеся більше [тут](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**Експортування**: онлайн-редактор ([editor.thebookofshaders.com](http://editor.thebookofshaders.com/)) може поділитися вашими шейдерами! Як вбудована, так і окрема версія мають кнопку для експорту, за допомогою якої ви можете отримати унікальну URL-адресу свого шейдера. Також є можливість експортувати шейдер безпосередньо в [openFrame.io](http://openframe.io/).

![](glslEditor-00.gif)

**Керування**: експорт коду — початок для того, щоб ви ділилися своїм шейдером у якості художнього витвору! Окрім опції експорту в [openFrame.io](http://openframe.io/), я створив інструмент для керування вашими шейдерами у галереї, яку можна вбудувати у будь-який сайт — [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery). Детальніше [тут](https://github.com/patriciogonzalezvivo/glslGallery).

![](glslGallery.gif)

## Запуск ваших шейдерів у вашому улюбленому фреймворку

Якщо у вас уже є досвід програмування в таких фреймворках, як [Processing](https://processing.org/), [Three.js](http://threejs.org/), [OpenFrameworks](http://openframeworks.cc/) або [SFML](https://www.sfml-dev.org/), ви, мабуть, із задоволенням спробуєте шейдери у них. Нижче наведено приклади того, як налаштувати шейдери в деяких популярних фреймворках з вказаними у книзі uniform-змінними. У [GitHub-репозиторії для цього розділу](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04) ви знайдете повний вихідний код для цих трьох фреймворків.

### **Three.js**

Блискучий і дуже скромний Ricardo Cabello (він же [MrDoob](https://twitter.com/mrdoob)) з групою інших [однодумців](https://github.com/mrdoob/three.js/graphs/contributors) розробили один із найвідоміших фреймворків для WebGL під назвою [Three.js](http://threejs.org/). Там ви знайдете безліч прикладів, посібників і книг, які навчать вас, як використовувати цю JS-бібліотеку для створення класної 3D-графіки.

Нижче наведено приклад із HTML та JS, які необхідні для початку роботи з шейдерами у three.js. Зверніть увагу на скрипт з `id="fragmentShader"` куди ви можете скопіювати шейдери, знайдені в цій книзі.

```html
<body>
    <div id="container"></div>
    <script src="js/three.min.js"></script>
    <script id="vertexShader" type="x-shader/x-vertex">
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    </script>
    <script id="fragmentShader" type="x-shader/x-fragment">
        uniform vec2 u_resolution;
        uniform float u_time;

        void main() {
            vec2 st = gl_FragCoord.xy / u_resolution.xy;
            gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
        }
    </script>
    <script>
        let container;
        let camera, scene, renderer, clock;
        let uniforms;

        init();
        animate();

        function init() {
            container = document.getElementById('container');

            camera = new THREE.Camera();
            camera.position.z = 1;

            scene = new THREE.Scene();
            clock = new THREE.Clock();

            const geometry = new THREE.PlaneBufferGeometry(2, 2);

            uniforms = {
                u_time: { type: "f", value: 1.0 },
                u_resolution: { type: "v2", value: new THREE.Vector2() },
                u_mouse: { type: "v2", value: new THREE.Vector2() }
            };

            const material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent
            });

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);

            container.appendChild(renderer.domElement);

            onWindowResize();
            window.addEventListener('resize', onWindowResize, false);

            document.onmousemove = function(e) {
              uniforms.u_mouse.value.x = e.pageX
              uniforms.u_mouse.value.y = e.pageY
            }
        }

        function onWindowResize(event) {
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.u_resolution.value.x = renderer.domElement.width;
            uniforms.u_resolution.value.y = renderer.domElement.height;
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            uniforms.u_time.value += clock.getDelta();
            renderer.render(scene, camera);
        }
    </script>
</body>
```

### **Processing**

[Processing](https://processing.org/) започатковано у 2001 році у співпраці між [Ben Fry](http://benfry.com/) та [Casey Reas](http://reas.com/). Фреймворк є надзвичайно простим та потужним середовищем, у якому можна робити свої перші кроки в програмуванні (принаймні так було у мене). [Andres Colubri](https://codeanticode.wordpress.com/) вніс важливі оновлення в Processing для підтримки openGL і відео, що полегшило використання шейдерів GLSL у цьому дружньому середовищі, ніж будь-коли. Processing шукатиме шейдер із назвою `"shader.frag"` у теці `data` вашого скетчу. Тож вам достатньо скопіювати приклади цієї книги у файл із відповідною назвою.

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

Щоб шейдер працював у попередніх версіях, нижчих за 2.1, вам потрібно додати рядок `#define PROCESSING_COLOR_SHADER` на початку вашого шейдера. Це виглядатиме так:

```glsl
#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.st / u_resolution;
    gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
}
```

Щоб дізнатися більше про шейдери у Processing, перегляньте цей [посібник](https://processing.org/tutorials/pshader/).

### **openFrameworks**

У кожного є місце, де йому комфортно, у моєму випадку таким місцем залишається [спільнота openFrameworks](http://openframeworks.cc/). Цей C++ фреймворк є обгорткою навколо OpenGL та інших бібліотек на C++ з відкритим кодом. Багато в чому він дуже схожий на Processing, але зі своїми особливостями роботи з використанням компіляторів C++. Так само як і Processing, openFrameworks шукатиме ваші файли шейдерів у теці `data`. Тому не забудьте скопіювати код прикладів, які хочете використати, у файли з розширенням `.frag` і покласти їх у згадану теку:

```cpp
void ofApp::draw() {
    ofShader shader;
    shader.load("", "shader.frag");

    shader.begin();
    shader.setUniform1f("u_time", ofGetElapsedTimef());
    shader.setUniform2f("u_resolution", ofGetWidth(), ofGetHeight());
    ofRect(0, 0, ofGetWidth(), ofGetHeight());
    shader.end();
}
```

Якщо ви хочете використовувати в OpenFrameworks повний набір уніформ, що містяться в специфікаціях GlslViewer і GlslCanvas, простішим способом, я рекомендую використовувати доповнення [ofxShader](https://github.com/patriciogonzalezvivo/ofxshader). Воно також має підтримку кількох буферів, шейдерних матеріалів, гаряче перезавантаження та автоматизацію для OpenGL ES у Raspberry Pi. Ваш код буде таким же простим, як нижче:

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


Щоб дізнатися більше про шейдери в openFrameworks, перегляньте цей [чудовий посібник](http://openframeworks.cc/ofBook/chapters/shaders.html), створений [Joshua Noble](http://thefactoryfactory.com/).
