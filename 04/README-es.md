## Ejecutando tu shader

En este punto seguro estás entusiasmado con poder probar shaders en las plataformas en las que te sientes cómodo. En los siguientes ejemplos veremos como agregarlos en algunos frameworks populares con las mismas uniforms con las que estamos trabajando en este libro. (En el [repositorio de GitHub de este capítulo](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04) encontrarás el código completo de estos ejemplos.)

**Nota 1**: En caso de que no quieras utilizar los shaders en los siguientes frameworks pero quieras hacerlo fuera del navegador, puedes descargar y compilar [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer). Este programa corre en MacOS y en Raspberry Pi, permite ejecutar directamente los ejemplos desde la terminal.

**Nota 2**: Si no quieres usar WebGl con tus shaders y no te interesan los frameworks siguientes, puedes usar [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas). Esta herramienta fue diseñada para este libro, pero se volvió tan útil que he terminado usándola en muchos proyectos.

### En **Three.js**

El brillante y humilde Ricardo Cabello (también conocido como [MrDoob](https://twitter.com/mrdoob)) ha estado desarrollando junto con otros [contribuidores](https://github.com/mrdoob/three.js/graphs/contributors) probablemente el framework más conocido de WebGL, llamado [Three.js](http://threejs.org/). Encontrarás muchos ejemplos, libros y tutoriales para aprender a hacer cosas geniales en 3D con JavaScript.

Aqui abajo hay un ejemplo del HTML y JS necesario para poder empezar a utilizar shaders con three.js. Presta atención al script```id="fragmentShader"```, aquí es donde puedes copiar los ejemplos de este libro.

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

### En **Processing**

Iniciado por [Ben Fry](http://benfry.com/) y [Casey Reas](http://reas.com/) en 2001, [Processing](https://processing.org/) es un extraordinario y poderoso entorno en el que se puede aprender los primeros pasos con el código (al menos así fue para mí). [Andrés Colubri](https://codeanticode.wordpress.com/) ha hecho importantes cambios a la parte de OpenGL y video, logrando que sea más fácil y amigable utilizar shaders GLSL. Processing buscará el archivo  ```"shader.frag"``` en la carpeta ```data``` del sketch. En ese archivo debes poner los ejemplos que encuentres en este libro.

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

Para hacer funcionar el shader en versiones previas a la 2.1, necesitas agregar la siguiente línea al comienzo de tu shader: ```#define PROCESSING_COLOR_SHADER```. Así es como quedaría:
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

Para más información sobre shaders en processing puedes chequear este [tutorial](https://processing.org/tutorials/pshader/).

### En **openFrameworks**

Todos tienen un lugar en el que se sienten más cómodos, en mi caso, todavía sigue siendo [openFrameworks](http://openframeworks.cc/). Este framework en C++ engloba openGL y otras librerías open source. En muchos puntos es muy parecido a Processing, pero con las complicaciones obvias de trabajar con los compiladores de C++. De la misma forma que Processing, openFrameworks buscará tus shaders en archivos de la carpeta data, no te olvides de copiar los archivos ```.frag``` que quieres usar y cambiar el nombre cuando los cargas.

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

Para más información sobre shaders en openFrameworks ve a este [excelente tutorial](http://openframeworks.cc/ofBook/chapters/shaders.html) creado por [Joshua Noble](http://thefactoryfactory.com/).
