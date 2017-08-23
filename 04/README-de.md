## Ausführung Deiner Shader

Beim Schreiben dieses Buches und im Rahmen meiner künstlerischen Tätigkeit habe ich eine Sammlung von Tools entwickelt, mit deren Hilfe man Shader programmieren, anzeigen, teilen und kuratieren kann. Dieses Tools laufen auf Linux Desktops, Rechnern mit MacOS, dem [Raspberry Pi](https://www.raspberrypi.org/) und auf Internet-Browsern. Sie sorgen dafür, dass Du Deine Shader dort nutzen kannst, ohne etwas an deren Programmcode verändern zu müssen.

**Anzeige**: Alle Live-Beispiele in diesem Buch werden mit [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) angezeigt. Dieses Tool macht es unglaublich einfach, Shader ohne weitere Umstände im Internet-Browser auszuführen.

```html
<canvas class="glslCanvas" data-fragment-url="yourShader.frag" data-textures="yourInputImage.png" width="500" height="500"></canvas>
```

Wie Du oben siehst, benötigt man lediglich ein ```canvas``` HTML-Element mit der Klassenzuweisung ```class="glslCanvas"``` und eine URL als Verweis auf Deine Shader-Datei im Attribut ```data-fragment-url```. Mehr darüber kannst Du [hier](https://github.com/patriciogonzalezvivo/glslCanvas) erfahren.

Vielleicht geht es Dir wie mir, und Du möchtest Deine Shader direkt aus der Kommandozeile starten. In diesem Fall solltest Du Dir einmal den [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) anschauen. Diese Anwendung ermöglicht es Dir, Shader aus ```bash```-Skripten oder aus der Unix-Pipeline heraus zu starten, ganz ähnlich wie dies mit [ImageMagick](http://www.imagemagick.org/script/index.php) möglich ist. Außerdem bietet der [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) eine großartige Möglichkeit, Shader auf Deinem [Raspberry Pi](https://www.raspberrypi.org/) zu kompilieren. Das ist auch der Grund, warum das Projekt [openFrame.io](http://openframe.io/) dieses Tool für die Präsentation von Computerkunst nutzt. Mehr über diese Anwendung kannst Du [hier](https://github.com/patriciogonzalezvivo/glslViewer) erfahren.

```bash
glslViewer deinShader.frag deineEingabeGrafik.png -w 500 -h 500 -s 1 -o deineAusgabeGrafik.png
```

**Entwickeln**: Um die Entwicklung von Shadern im Internet-Browser zu ermöglichen, habe ich einen Online-Editor mit dem Namen [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor) entwickelt. Dieser Editor kommt bei den Live-Beispielen in diesem Buch zum Einsatz. Er bringt eine Reihe praktischer Widgets mit, die Dich beim Experimentieren mit dem Shader-Code unterstützen. Du kannst diesen Editor auch als eigenständige Web-Anwendung über die URL [editor.thebookofshaders.com/](http://editor.thebookofshaders.com/) ausführen lassen. Mehr über diesen Editor erfährst Du [hier](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

Wenn Du lieber offline statt online mit [SublimeText](https://www.sublimetext.com/) arbeitest, kannst Du dieses [Paket für den glslViewer](https://packagecontrol.io/packages/glslViewer) installieren. Mehr darüber erfährst Du [hier](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**Teilen**: Du kannst Deine Shader direkt aus dem Online-Editor ([editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)) heraus mit anderen teilen. Sowohl die eingebettete als auch die eigenständige Variante des Editors verfügen über eine *Export*-Schaltfläche. Sie liefert Dir eine einzigartige URL als Referenz auf Deinen Shader. Diese URL kannst Du dann an andere weitergeben. Außerdem bietet der Editor die Möglichkeit, Deine Shader zur Veröffentlichung direkt an das Projekt [openFrame.io](http://openframe.io/) zu senden.

![](glslEditor-00.gif)

**Kuratieren**: Deinen Shader-Code mit anderen zu teilen ist nur der Anfang. Du kannst Deine Shader auch als Werke der Computerkunst veröffentlichen. Jenseits der Weitergabe an das Projekt [openFrame.io](http://openframe.io/), habe ich ein Tool entwickelt, mit dem man Shader-Programme in eine Galerie innerhalb einer Webseite einbetten kann. Der Name dieses Tools lautet passenderweise [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery). Mehr darüber erfährst Du [hier](https://github.com/patriciogonzalezvivo/glslGallery).

![](glslGallery.gif)

## Ausführen von Shadern in Deiner bevorzugten Umgebung

Falls Du bereits Erfahrung mit der Programmierung in einer Umgebung wie [Processing](https://processing.org/), [three.js](http://threejs.org/) oder [OpenFrameworks](http://openframeworks.cc/) gesammelt hast, möchtest Du Deine Shader vielleicht in dieser Umgebung ausführen lassen. Die folgenden Codebeispiele zeigen Dir, wie man Shader unter Verwendung der gleichen Uniforms, die wir in diesem Buch verwenden, in diesen Umgebungen ausführen kann. (In der [GitHub-Ablage dieses Kapitels](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04) findest Du den gesamten Sourcecode für die Einbindung von Shadern unter den drei genannten Umgebungen.)

### Ausführung unter **three.js**

Der brillante und äußerst bescheidene Ricardo Cabello (aka [MrDoob](https://twitter.com/mrdoob) ) hat zusammen mit [Gleichgesinnten](https://github.com/mrdoob/three.js/graphs/contributors) eines der wahrscheinlich populärsten Frameworks für WebGL mit dem Namen [three.js](http://threejs.org/) entwickelt. Du findest dort viele Beispiele, Tutorials und Bücher, die Dir zeigen, wie Du diese JavaScript-Bibliothek zur Erstellung cooler 3D-Grafiken nutzen kannst.

Hier folgt ein Beispiel für den HTML- und JS-Code, den Du für Deine ersten Experimente mit Shadern unter *three.js* benötigst. Bitte beachte das Script unter dem HTML-Tag ```id="fragmentShader"```. Dort kannst Du Deine Shader aus dem vorliegenden Buch einfügen.

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
            uniforms.u_time.value += 0.05;
            renderer.render( scene, camera );
        }
    </script>
</body>
```

### In **Processing**

Ursprünglich im Jahre 2001 von [Ben Fry](http://benfry.com/) und [Casey Reas](http://reas.com/) entwickelt, verkörpert [Processing](https://processing.org/) eine unglaublich einfache und gleichzeitig leistungsfähige Umgebung für Deinen Einstieg in das Thema „Programmierung“. (Auch ich habe so angefangen.) [Andres Colubri](https://codeanticode.wordpress.com/) hat wichtige Erweiterungen für die Einbeziehung von openGL und Videofunktionen in Processing entwickelt. Sie machen es ganz einfach, in dieser Umgebung mit GLSL-Shadern zu arbeiten. Processing sucht dazu einfach nach einem Shader mit dem Namen ```shader.frag``` in dem Unterverzeichnis ```data``` Deines Zeichenblocks („sketch“). Stelle einfach sicher, dass Du die Beispiele aus dem vorliegenden Buch unter diesem Dateinamen in dem genannten Verzeichnis ablegst.

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

Damit Dein Shader auch unter Versionen von Processing kleiner 2.1 läuft, musst Du lediglich die folgende Programmzeile an den Anfang Deines Shaders stellen: ```#define PROCESSING_COLOR_SHADER```. Das sieht dann so aus:

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

Mehr Informationen über den Einsatz von Shadern in Processing findest Du auch in diesem [Tutorial](https://processing.org/tutorials/pshader/).

### In **openFrameworks**

Jeder hat einen Platz, an dem er oder sie sich besonders wohl fühlt. Bei mir ist das die [openFrameworks Gemeinschaft](http://openframeworks.cc/). Diese C++-Umgebung ermöglicht die bequeme Einbindung von OpenGL und weiteren Open Source C++-Bibliotheken. In vielerlei Hinsicht ähnelt sie der Arbeit mit Processing, nur dass man es hier mit C++ und C++-Compilern zu tun hat. Genau wie Processing sucht *openFrameworks* nach Deinen Shader-Dateien im ```DATA```-Unterverzeichnis. Deshalb vergiss nicht, Deine ```.frag```-Dateien dorthin zu kopieren und den Dateinamen entsprechend anzupassen, wenn Du diese Dateien ausführen willst.

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

Weitere Informationen über die Verwendung von Shadern in *openFrameworks* findest Du in diesem [exzellenten Tutorial](http://openframeworks.cc/ofBook/chapters/shaders.html), das von [Joshua Noble](http://thefactoryfactory.com/) verfasst wurde.
