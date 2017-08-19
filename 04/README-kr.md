## Running your shader

이 시점에서, 슬슬 익숙하던 플랫폼에 쉐이딩 기술을 써보고 싶을 것이다. 아래는 사람들이 가장 많이 쓰는 플랫폼들에서 쉐이더를, 또 전 챕터에서 본 uniform 형식을 그대로 쓸수 있는 부분이다. (In the [GitHub repository for this chapter](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04), 이 세개의 플랫폼에 대한 소스코드는 여기서 확인할수 있다.)

**Note 1**: 만약 아래의 프레임워크 외에 것에서 구동하고 싶다면, [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer)를 다운받아서 컴파일할수 있다. 터미널에서 구동되므로, MacOS와 RasberryPi등에서도 구동되며, 이책의 예제들은 모두 최적화 되어 있다.

**Note 2**: 만약 WebGL에서 쉐이더를 구동하고, 다른 프레임워크를 따로 쓰고 싶지 않다면, [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas)를 이용해서 할수 있다. 이 웹 툴은 이 책에 최적화 되어 있고, 실제로 저자가 프로젝트마다 사용하는 툴이기도 하다.

### **Three.js** 에서

Ricardo Cabello (aka [MrDoob](https://twitter.com/mrdoob) ) 가 다른 참여자[참여자](https://github.com/mrdoob/three.js/graphs/contributors)들과 개발한 WebGL을 이용한 프레임 워크인 [Three.js](http://threejs.org/). 많은 예제와, 튜토리얼, 책들이 존재하고, 이를 이용해 여러 3D graphics데모를 만들어 볼수 있다.

아래는 HTML과 JS를 이용해 three.js를 구동하는 예제이다. ```id="fragmentShader"```부분을 보면, 쉐이더가 어디에서 적용되는지 볼수 있다.

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

### **Processing**에서

[Ben Fry](http://benfry.com/) 와 [Casey Reas](http://reas.com/) 에 의해 2001년에 시작되었고, [Processing](https://processing.org/) 는 간단하고 강력한 환경을 제공하고, 초보자들에게 사랑받는 툴이다. (적어도 저자는 그렇게 생각한다고 한다) [Andres Colubri](https://codeanticode.wordpress.com/) 는 프로세싱에서, openGL부분과 비디오 프로세싱부분에 중요한 업데이트를 했고, 이것으로 인해 GLSL 쉐이더를 구동시키기가 한결 편해졌다. 프로세싱은 ```"shader.frag"```라는 파일을 ```data```폴더에서 찾는다. 책에서 예제를 구동할거라면, 이 폴더에 파일을 rename하여 저장하고 사용하면 된다.

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

쉐이더가 2.1 전버젼부터 작동되려면, ```#define PROCESSING_COLOR_SHADER``` 를 쉐이더 제일 위편에 넣어야 작동될것이다. 아래와 같이:
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

더 자세한 사항은 여기서 살펴보기 바란다. [tutorial](https://processing.org/tutorials/pshader/)

### **openFrameworks** 에서

각자 가장 편한 구동 프레임워크가 있을것인데, 저자의 경우는 [openFrameworks community](http://openframeworks.cc/)이다. C++로 이루어진 OpenGL와 유용한 C++라이브러리들을 wrap한 프레임 워크이고, Processing과 제법 흡사하다. Processing과 마찬가지로, openFrameworks도 data폴더에서 shader파일을 서치한다. ```.frag``` 확장자명을 적는것 또한 까먹지 말자.  

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

더 자세한 정보는 [Joshua Noble](http://thefactoryfactory.com/)가 만든 [강좌](http://openframeworks.cc/ofBook/chapters/shaders.html)를 보기 바란다.
