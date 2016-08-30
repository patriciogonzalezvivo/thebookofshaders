## Eseguite il vostro shader

Nell'ambito della realizzazione di questo libro e della mia pratica artistica ho creato un ecosistema di strumenti per creare, visualizzare, condividere e curare gli shaders. Questo strumento funziona in modo coerente su Linux Desktop, MacOS, [RaspberryPi](https://www.raspberrypi.org/) e browser, senza la necessità di dover cambiare il vostro codice.

**Visualizzare**: tutti gli esempi di questo libro vengono visualizzati utilizzando [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) che rende il processo di esecuzione dello shader standalone incredibilmente facile.

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```

Come potete vedere, è solo necessario l'elemento ```canvas``` con l'attributo ```class="glslCanvas"``` e l'indirizzo verso il vostro shader nel ```data-fragment-url```. Scoprite di più a proposito [cliccando qui](https://github.com/patriciogonzalezvivo/glslCanvas).

Se siete come me, probabilmente vorrete eseguire gli shader direttamente dalla console. In questo caso date un'occhiata a [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer). Questa applicazione consente d'incorporare gli shader nel vostro script ```bash``` o pipelines UNIX e d?utilizzarli in modo simile a [ImageMagick](http://www.imagemagick.org/script/index.php). Anche [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) è un ottimo modo per compilare gli shader sul [Raspberry Pi](https://www.raspberrypi.org/), motivo per il quale [openFrame.io](http://openframe.io/) lo usa per visualizzare le opere d'arte di tipo shader. Potete trovare ulteriori informazioni su questa applicazione [cliccando qui](https://github.com/patriciogonzalezvivo/glslViewer).

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -s 1 -o yourOutputImage.png
```

**Creare**: per migliorare la programmazione degli shader, ho realizzato un editor online chiamato [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor). Questo editor è integrato agli esempi del libro e mette a disposizione una serie di comodi widget per rendere più tangibile il codice astratto GLSL. È anche possibile eseguirlo come un'applicazione standalone web da [editor.thebookofshaders.com/](http://editor.thebookofshaders.com/). Scoprite di più a proposito [cliccando qui](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

Se si preferisce lavorare offline utilizzando [SublimeText](https://www.sublimetext.com/) è possibile installare questo [pacchetto per glslViewer](https://packagecontrol.io/packages/glslViewer). Scoprite di più [cliccando qui](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**Condividere**: l'editor online ([editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)) può condividere i tuoi shader! Sia la versione standalone che quella integrata hanno un pulsante per esportare con il quale è possibile ottenere un URL unico verso il vostro shader. Avete anche la possibilità d'esportare direttamente verso un [openFrame.io](http://openframe.io/).

![](glslEditor-00.gif)

**Curare**: Condividere il vostro codice è la prima tappa per intendere il vostro shader come un'opera d'arte! Accanto alla possibilità di esportare verso [openFrame.io](http://openframe.io/) ho fatto uno strumento per curare i vostri shader in una galleria che può essere integrata su qualsiasi sito, il suo nome è [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery). Per saperne di più [cliccando qui](https://github.com/patriciogonzalezvivo/glslGallery).

![](glslGallery.gif)

## Eseguire i vostri shader nel vostro framework preferito

Nel caso in cui si dispone già di esperienze di programmazione in framework quali: [Processing](https://processing.org/), [Three.js](http://threejs.org/) o [OpenFrameworks](http://openframeworks.cc/), probabilmente sarete ansiosi di provare gli shader sulle piattaforme su cui vi trovate bene. I seguenti sono esempi di come impostare gli shader in alcuni dei framework più popolari con le stesse uniforms che andremo ad utilizzare in questo libro. (Nella [repository GitHub per questo capitolo](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04), troverete il codice sorgente completo per questi tre framework.)

### In **Three.js**

Il brillante e molto umile Ricardo Cabello (aka [MrDoob](https://twitter.com/mrdoob)) ha sviluppato insieme ad altri [collaboratori](https://github.com/mrdoob/three.js/graphs/contributors), probabilmente uno dei più famosi framework per WebGL, chiamato [Three.js](http://threejs.org/). Troverete un sacco di esempi, tutorial e libri che vi insegneranno come utilizzare questa libreria JavaScript per fare grafica 3D.

Di seguito è riportato un esempio di codice HTML e JS per iniziare con gli shader in three.js. Prestate attenzione allo script ```id="fragmentShader"```, qui è dove è possibile copiare gli shader che si trovano in questo libro.

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

Iniziato da [Ben Fry](http://benfry.com/) e [Casey Reas](http://reas.com/) nel 2001, [Processing](https://processing.org/) è un framework straordinariamente semplice e potente in cui muovere i primi passi nel codice (o almeno lo è stato per me). [Andres Colubri](https://codeanticode.wordpress.com/) ha fatto importanti aggiornamenti a openGL e la gestione video in Processing, rendendo più facile che mai usare e giocare con i GLSL shader. Processing cercherà lo shader chiamato ```"shader.frag"``` nella cartella ```data``` dello sketch. Assicuratevi di copiare gli esempi che trovate qui in quella cartella e rinominate il file.

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

Affinché lo shader lavori su versioni precedenti alla 2.1, è necessario aggiungere la seguente riga all'inizio del vostro Shader: ```#define PROCESSING_COLOR_SHADER```. In questo modo dovrebbe assomigliare a:

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

Per ulteriori informazioni sugli shader in Processing controllate questo [tutorial](https://processing.org/tutorials/pshader/).

### In **openFrameworks**

Ognuno ha un luogo in cui sentirsi a proprio agio e, nel mio caso, è ancora la [comunità di openFrameworks](http://openframeworks.cc/). Questo framework C++ integra OpenGL e altre librerie C++ open source. Per molti aspetti è molto simile a Processing, ma con le ovvie complicazioni dovute ai compilatori C++. Allo stesso modo di Processing, openFrameworks cercherà i tuoi file shader nella cartella dati, quindi non dimenticate di copiare i file ```.frag``` che si desiderano utilizzare e modificate il nome quando li si carica.
 
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

Per ulteriori informazioni sugli shader in openFrameworks consultate questo [ottimo tutorial](http://openframeworks.cc/ofBook/chapters/shaders.html) fatto da [Joshua Noble](http://thefactoryfactory.com/).