## Rodando o seu shader

Como parte da construção deste livro, e minha prática de arte, eu fiz um ecossistema de ferramentas para criar, exibir e realizar curadoria de shaders. Essas ferramentas trabalham consistentemente em Linux, MacOS, [Raspberry Pi](https://www.raspberrypi.org/) e browsers sem a necessidade de mudar seu código.

**Exibir**: todos os exemplos ao vivo deste livro são exibidos usando o [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) que faz o processo de executar um shader standalone incrivelmente fácil.

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```

Como você pode ver, só precisa de um elemento `canvas` com `class="glslCanvas"` e a url para seu shader no `data-fragment-url`. Aprenda mais sobre isso [aqui](https://github.com/patriciogonzalezvivo/glslCanvas).

Se você é como eu, provavelmente vai querer rodar shaders diretamente da console, e nesse caso você deveria dar uma olhada no [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer). Esta aplicação lhe permite incorporar shaders em seus scripts `bash` ou pipelines do unix e usá-los de modo similiar ao [ImageMagick](http://www.imagemagick.org/script/index.php). Também, o [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) é uma boa forma de compilar shaders no seu [Raspberry Pi](https://www.raspberrypi.org/), razão pela qual o [openFrame.io](http://openframe.io/) o utiliza para exibir artes em shader. Aprenda mais sobre essa aplicação [aqui](https://github.com/patriciogonzalezvivo/glslViewer).

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -s 1 -o yourOutputImage.png
```

**Criar**: de modo a trazer mais luz para a experiência de codificação de shaders, eu fiz um editor online chamado [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor). Este editor está embutido nos exemplos ao vivo do livro, e traz uma série de widgets bem convenientes para tornar mais tangível a experiência abstrata de trabalhar com código GLSL. Você também pode executá-lo como uma aplicação web standalone no endereço [editor.thebookofshaders.com/](http://editor.thebookofshaders.com/). Saiba mais sobre isso [aqui](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

Se você prefere trabalhar offline usando o [SublimeText](https://www.sublimetext.com/) você pode instalar esse [pacote para glslViewer](https://packagecontrol.io/packages/glslViewer). Saiba mais sobre isso [aqui](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**Compartilhar**: o editor online ([editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)) pode compartilhar seus shaders! Tanto a versão embedded quanto standalone têm um botão para exportar, onde você pode obter uma URL única para o seu shader. Eles têm também a capacidade de exportar diretamente para um [openFrame.io](http://openframe.io/).

![](glslEditor-00.gif)

**Curadoria**: Compartilhar o seu código é o começo para você compartilhar seus shaders como artwork! Além da opção de exportar para [openFrame.io](http://openframe.io/) eu fiz uma ferramenta para lhe permitir criar uam curadoria de seus shaders numa galeria que pode ser embutida em qualquer site, e seu nome é [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery). Saiba mais [aqui](https://github.com/patriciogonzalezvivo/glslGallery).

![](glslGallery.gif)

## Rodando seus shaders em seu framework favorito

Para o caso de você já ter experiência em programar em um framework como [Processing](https://processing.org/), [Three.js](http://threejs.org/), [OpenFrameworks](http://openframeworks.cc/) ou [SFML](https://www.sfml-dev.org/), você provavelmente está animado para tentar os shaders nessas plataformas que você se sente confortável. Os exemplos a seguir são formas de como configurar os shaders em alguns frameworks populares com os mesmos uniforms que vamos usar ao longo desse livro. (No [Repositório GitHub para esse capítulo](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04), você encontra o código completo para esses três frameworks.)

### Em **Three.js**

O brillhante e humilde Ricardo Cabello (aka [MrDoob](https://twitter.com/mrdoob) ) tem desenvolvido com outros [contribuidores](https://github.com/mrdoob/three.js/graphs/contributors) o que é provavelmente um dos mais famosos frameworks para WebGL, chamado de [Three.js](http://threejs.org/). Você vai encontrar muitos exemplos, tutoriais e livros que ensinam a usar essa biblioteca em JavaScript para fazer gráficos 3D muito legais.

Abaixo, um exemplo do HTML e JS que você precisa para começar com shaders em three.js. Preste atenção ao script `id="fragmentShader"`, é aqui que você pode copiar os shaders que encontrar neste livro.

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

### Em **Processing**

Iniciado por [Ben Fry](http://benfry.com/) e [Casey Reas](http://reas.com/) em 2001, o [Processing](https://processing.org/) é um ambiente extraordinariamente simples e poderoso para você dar seus primeiros passos no código (pelo menos, pra mim, foi). [Andres Colubri](https://codeanticode.wordpress.com/) tem feito atualizações importantes no openGL e video em Processing, facilitando ainda mais que nunca o uso e diversão com shaders GLSL nesse ambiente amigável. O Processing vai procurar pelo shader chamado `"shader.frag"` na pasta `data`. Tenha certeza de copiar os exemplos que encontrar aqui para essa pasta, e renomear o arquivo.

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

De modo a fazer o shader funcionar em versões anteriores à 2.1, você precisa de adicionar a seguinte linha no começo de seu shader: `#define PROCESSING_COLOR_SHADER`. De modo que se pareça com isso:

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

Para mais informações sobre os shaders no Processing veja esse [tutorial](https://processing.org/tutorials/pshader/).

### No **openFrameworks**

Todo mundo tem um lugar onde se sente confortável, e no meu caso, ainda é a [comunidade openFrameworks](http://openframeworks.cc/). Esse framework C++ envolve o OpenGL e outras bibliotecas opensource C++. De muitas formas, é bem parecida com o Processing, mas com as complicações óbvias de se lidar com compiladores C++. Da mesma forma que o Processing, openFrameworks vai procurar o seu shader no diretório data, então não se esqueça de copiar os arquivos `.frag` que quiser usar, e mudar o nome quando for carregar.

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

Para mais informações sobre shaders em openFrameworks, vá nesse [excelente tutorial](http://openframeworks.cc/ofBook/chapters/shaders.html) feito por [Joshua Noble](http://thefactoryfactory.com/).
