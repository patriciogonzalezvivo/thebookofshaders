## Rodando seu shader

Como parte da construção deste livro e minha prática artística, eu criei um ecossistema de ferramentas para criar, visualizar, compartilhar e curar shaders. Estas ferramentas funcionam de forma consistente nas plataformas Linux, Desktop, MacOS, [Raspberry Pi](https://www.raspberrypi.org/) e navegadores sem a necessidade de alterar o código.

**Visualize**: Todos os exemplos deste livro são exibidos usando [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) que facilita o processo de rodar o shader independentemente.

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```
Como você pode ver, só é preciso um elemento `canvas` com a classe `class="glslCanvas"` e a url do seu shader em `data-fragment-url`. Saiba mais [aqui](https://github.com/patriciogonzalezvivo/glslCanvas).

Se você é como eu, você provavelmente quer rodar shaders diretamente do console, neste caso, você deve dar uma olhada no [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer). Esta aplicação permite que voc6e incorpore shaders em seus scripts `bash` ou nas pipelines de unix e os-use de uma forma similar a [ImageMagick](http://www.imagemagick.org/script/index.php). [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) também é uma ótima forma de compilar seus shaders para [Raspberry Pi](https://www.raspberrypi.org/), razão na qual [openFrame.io](http://openframe.io/) o usa para exibir suas artes. Veja mais sobre a aplicação [aqui](https://github.com/patriciogonzalezvivo/glslViewer).

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -s 1 -o yourOutputImage.png
```

**Crie**: Para iluminar a experiência de programar shaders, eu fiz um editor online chamado [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor). Este editor é embedado nos exemplos ao vivo do livro, ele trás uma série de widgets úteis tornando mais tangóvei a experiência abstrata de trabalhar com códigos em glsl. Você pode também rodá-los numa aplicação web independente em [editor.thebookofshaders.com/](http://editor.thebookofshaders.com/). Aprenda mais sobre isso [aqui
](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

Se você prefere trabalhar offline usando [SublimeText](https://www.sublimetext.com/), você pode instalar este [pacote do glslViewer](https://packagecontrol.io/packages/glslViewer). Veja mais sobre [aqui](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**Compartilhe**: o editor online ([editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)) pode compartilhar seus shaders! Ambos, a versão incorporada e a independente, têm um botão de export onde você receberá uma URL única para seu shader. Também existe a opção de exportar diretamente para um [openFrame.io](http://openframe.io/).

![](glslEditor-00.gif)

**Cure**: Compartilhar seu código é só o começo para compartilhar seu shader como arte! Ao lado da opção para o [openFrame.io](http://openframe.io/), eu fiz uma ferramenta para curar shaders em uma galeria que pode ser incoporada em qualquer site, seu nome é [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery). Veja mais [aqui](https://github.com/patriciogonzalezvivo/glslGallery).

## Rodando seus shaders no seu framework favorito

No caso de você já ter experiência em um framework como: [Processing](https://processing.org/), [Three.js](http://threejs.org/) ou [OpenFrameworks](http://openframeworks.cc/), você está provavelmente empolgado para testar shaders com plataformas que você se sente confortável. A seguir, vemos exemplos de como configurar shaders em algumas frameworks populares com as mesmas uniforms que vamos estar usando durante este livro. (No [repositório do Github deste para este capítulo](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04), você encontrará o código fonte completo para estas três frameworks.)

### Em ***Three.js***

O brilhante e muito humilde Ricardo Cabello (também conhecido como [MrDoob](https://twitter.com/mrdoob) ) tem desenvolvido junto com outros [contribuidores](https://github.com/mrdoob/three.js/graphs/contributors) provavelmente uma das mais famosas frameworks de WebGL, chamada [Three.js](http://threejs.org/). Você encontrará muitos exemplos, tutoriais e livros que te ensinarão como usar esta biblioteca em Javascript para criar bons gráficos 3D.

Abaixo, temos um exemplo de HTML e JS que você precisa para começar usando shaders em three.js. Preste atenção no script `id="fragmentShader"`, lá é onde você pode copiar os shaders que você encontrar neste livro.

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

### Em **Processing**

Criado por [Ben Fry](http://benfry.com/) e [Casey Reas](http://reas.com/) em 2001, [Processing](https://processing.org/) é um ambiente extremamente simples e poderoso para dar seus primeiros passos em programação (ao menos, foi para mim). [Andres Colubri](https://codeanticode.wordpress.com/)fez as atualizações mais importantes ao openGL e vídeo em Processing, facilitando o uso de GLSL shaders neste ambiente amigável. Processing buscará pelo shader `"shader.frag"` na pasta `data` do seu sketch. Tenha certeza de ter copiar os shaders que você encontrar aqui para a pasta e renomear os arquivos.

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

Para que o shader funcione nas versões anteriores a 2.1, você precisa adicionar as seguintes linhas de código no começo do seu shader: `#define PROCESSING_COLOR_SHADER`. Algo parecido com isso:

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

Para mais informação sobre shaders em Processing, dê uma olhada neste [tutorial](https://processing.org/tutorials/pshader/).

### Em **openFrameworks**

Todos tem um lugar no qual se sentem confortáveis, no meu caso, ainda é na [comunidade de openFrameworks](http://openframeworks.cc/). Esta framework C++ engloba OpenGL e outras bibliotecas C++ open source. É muito parecida com Processing, mas com as complicações óbvias de lidar com compiladores C++. Do mesmo jeito que Processing, openFrameworks procura pelos seus arquivos de shader na pasta data, então não se esqueça de copiar os arquivos `.frag` que você quer usar e os renomear quando carregá-los.

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

Para mais informação sobre shaders em openFrameworks, vá para este [excelente tutorial](http://openframeworks.cc/ofBook/chapters/shaders.html) feito por [Joshua Noble](http://thefactoryfactory.com/).
