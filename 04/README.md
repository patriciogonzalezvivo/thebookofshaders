## Running your shader

At this point you're probably excited to try shaders on platforms you feel comfortable with. The following are examples of how to set shaders in some popular frameworks with the same uniforms that we are going to use throughout this book. (In the [GitHub repository for this chapter](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04), you'll find the full source code for these three frameworks.)

**Note**: In case you don't want to try shaders on the following frameworks, but you want to work outside a browser, you can download and compile [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer). This MacOS and RaspberryPi program runs directly from terminal and is especially designed to execute the examples in this book.

### In **Three.js**
 
The brilliant and very humble Ricardo Cabello (aka [MrDoob](https://twitter.com/mrdoob) ) has been developing along with other [contributors](https://github.com/mrdoob/three.js/graphs/contributors) probably one of the most famous frameworks for WebGL, called [Three.js](http://threejs.org/). You will find a lot of examples, tutorials and books that teach you how to use this JavaScript library to make cool 3D graphics. 

Below is an example of the HTML and JS you need to get started with shaders in three.js. Pay attention to the ```id="fragmentShader"``` script, here is where you can copy the shaders you find in this book.

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
        if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

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

### In **Processing**

Started by [Ben Fry](http://benfry.com/) and [Casey Reas](http://reas.com/) in 2001, [Processing](https://processing.org/) is an extraordinarily simple and powerful environment in which to take your first steps in code (it was for me at least). [Andres Colubri](https://codeanticode.wordpress.com/) has made important updates to the openGL and video in Processing, making it easier than ever to use and play with GLSL shaders in this friendly environment. Processing will search for the shader named ```"shader.frag"``` in the ```data``` folder of the sketch. Be sure to copy the examples you find here into that folder and rename the file.

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

In order for the shader to work on versions previous to 2.1, you need to add the following line at the beginning of your shader: ```#define PROCESSING_COLOR_SHADER```. So that it looks like this:
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

For more information about shaders in Processing check out this [tutorial](https://processing.org/tutorials/pshader/).

### In **openFrameworks**

Everybody has a place where they feel comfortable, in my case, that’s still the [openFrameworks community](http://openframeworks.cc/). This C++ framework wraps around OpenGL and other open source C++ libraries. In many ways it's very similar to Processing, but with the obvious complications of dealing with C++ compilers. In the same way as Processing, openFrameworks will search for your shader files in the data folder, so don’t forget to copy the ```.frag``` files you want to use and change the name when you load them.
 
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

For more information about shaders in openFrameworks go to this [excellent tutorial](http://openframeworks.cc/tutorials/graphics/shaders.html) made by [Joshua Noble](http://thefactoryfactory.com/).
