## Executando seu shader

Como parte da construção deste livro e da minha arte, eu montei um ecossistema inteiro de ferramentas para criar, exibir, divulgar e curar shaders. Estas ferramentas funcionam consistentemente entre desktop com Linux, MacOS, [Raspberry Pi](https://www.raspberrypi.org/) e navegadores sem a necessidade de mudar seu código.

**Exibir**: todos os exemplos neste livro são exibidos usando [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas), que faz o processo de executar um shader autônomo incrivelmente fácil.

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```

Como você pode ver, são necessários apenas um elemento `canvas` com `class="glslCanvas"` e a url do seu shader no atributo `data-fragment-url`. Aprenda mais [aqui](https://github.com/patriciogonzalezvivo/glslCanvas).

Se você é como eu, você provavelmente quer executar shaders diretamente pelo terminal, neste caso você pode checar [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer). Essa aplicação tem permite incorporar shaders em seus comandos de `bash` ou pipelines de unix e usá-los de maneira similar ao [ImageMagick](http://www.imagemagick.org/script/index.php). [GlslViewer](https://github.com/patriciogonzalezvivo/glslViewer) também é uma ótima maneira de compilar shaders no seu [Raspberry Pi](https://www.raspberrypi.org/), por isso isso é usado pelo [openFrame.io](http://openframe.io/) para exibir obras de arte em shader. Aprenda mais sobre esta aplicação [aqui](https://github.com/patriciogonzalezvivo/glslViewer).

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -s 1 -o yourOutputImage.png
```

**Criar**: para iluminar a experiência de programar shaders eu criei um editor online chamado [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor). Este editor é embutido nos exemplos deste livro, e ele traz uma série de widgets convenientes para fazer a abstrata experiência de trabalhar com glsl mais tangível. Você também pode executá-lo como uma aplicação  da web independente em [editor.thebookofshaders.com/](http://editor.thebookofshaders.com/). Aprenda mais [aqui](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

Se você preferir trabalhar offline usando [SublimeText](https://www.sublimetext.com/) você ainda pode instalar este [pacote para glslViewer](https://packagecontrol.io/packages/glslViewer). Aprenda mais [aqui](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**Compartilhe**: o editor online ([editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)) pode compartilhar seus! Ambas as versões, tanto embutida ou autônoma, tem um botão de exportar onde você cria uma URL única para seu shader. Você pode também exportar diretamente para o [openFrame.io](http://openframe.io/).

![](glslEditor-00.gif)

**Curar**: Compartilhar seu código é o primeiro passo para divulgar seu shader como obra de arte! Além da opção de exportar para o [openFrame.io](http://openframe.io/), eu fiz uma ferramenta para curar seus shaders em uma galeria que pode ser embutida em qualquer site. Esta ferramenta se chama [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery). Aprenda mais [aqui](https://github.com/patriciogonzalezvivo/glslGallery).

![](glslGallery.gif)

## Executando seus shaders na sua framework favorita

Caso você já tenha experiência programando em uma framework como: [Processing](https://processing.org/), [Three.js](http://threejs.org/) ou [OpenFrameworks](http://openframeworks.cc/), você provavelmente está animado para testar shaders na sua plataforma favorita. Abaixo estão os exemplos de como definir shaders em algumas das plataformas populares com os mesmos uniforms que estaremos usando neste livro. (No [repositórido do GitHub para este capítulo](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04), você encontra o código fonte completo para estas três frameworks)

### Em **Three.js**

O brilhante e muito humilde Ricardo Cabello (também conhecido como [MrDoob](https://twitter.com/mrdoob) ) tem desenvolvido com a ajuda de outros [colaboradores](https://github.com/mrdoob/three.js/graphs/contributors) o que é provavelmente uma das frameworks para WebGL mais famosas, chamada [Three.js](http://threejs.org/). Você pode encontrar muitos exemplos, tutoriais e livros que ensinam como usar essa ferramenta de Javascript para criar gráficos em 3D.

Abaixo está um exemplo do HTML e JS que você precisa para começar a desenvolver shaders em three.js. Perceba o script `id="fragmentShader"`. Nele você pode copiar os shaders que você encontrar neste livro.

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

Criado por [Ben Fry](http://benfry.com/) e [Casey Reas](http://reas.com/) em 2001, [Processing](https://processing.org/) é um ambiente extraordinariamente simples e poderoso em que você pode tomar os primeiros passos em programação (pelo menos este foi o meu caso). [Andres Colubri](https://codeanticode.wordpress.com/) tem feito atualizações importantes no openGL e video em Processing, tornando-o ainda mais fácil para ser usado na criação de shaders em GLSL. Processing procurará pelo shader nomeado `"shader.frag"` no diretório `data` do sketch. Lembre-se de renomear o arquivo quando for copiar os exemplos deste livro.

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

Para que o shader funcione em versões anteriores à 2.1, você precisa adicionar a linha seguinte no início do seu shader: `#define PROCESSING_COLOR_SHADER`. Então o resultado é:

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

Para mais informações sobre shaders em Processing, dê uma olhada neste [tutorial](https://processing.org/tutorials/pshader/).

### Em **openFrameworks**

Todo mundo têm um espaço onde se sente comfortável, no meu caso esse espaço ainda é a comunidade de [openFrameworks](http://openframeworks.cc/). Essa framework em C++ encapsula OpenGL e outras ferramentas de open source em C++. De diversas maneiras ela é similar ao Processing, porém com as complicações óbvias ao lidar com compiladores de C++. Assim como Processing, openFrameworks procurará pelos seus arquivos de shader no diretório `data`, então não se esqueça de copiar  os arquivos `.frag` que você queira usar e os renomeie quando quiser usá-los.

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

Para mais informações sobre shaders em openFrameworks, visite este [tutorial excelente](http://openframeworks.cc/ofBook/chapters/shaders.html) feito pelo [Joshua Noble](http://thefactoryfactory.com/).x
