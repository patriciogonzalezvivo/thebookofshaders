## Exécuter vos shaders

Pour les besoins de ce livre comme pour ma pratique artistique, j'ai créé un écosystème d'outils permettant de créer, d'afficher, de partager et d'organiser mes shaders.
Ces outils fonctionnent de la même manière sur Linux Desktop, MacOS, [Raspberry Pi](https://www.raspberrypi.org/) et dans les navigateurs sans avoir besoin d'altérer le code.

**Affichage** : tous les exemples de ce livre sont affichés dans la page grâce à [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) qui facilite grandement la fabrication et l'affichage de shaders autonomes.

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```

Comme vous pouvez le voir, il suffit de créer un élément `canvas` auquel on applique la classe `class="glslCanvas"` et de lui passer l'url du fragment shader dans `data-fragment-url`.
Pour en savoir plus, [vous pouvez lire ceci](https://github.com/patriciogonzalezvivo/glslCanvas).

Si vous êtes comme moi, vous aurez sans doute envie de lancer vos shaders en lignes de commandes, dans ce cas vous devriez jeter un oeil à [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer).
Cette application permet d'incorporer un shader dans un script `bash` ou un pipeline Unix et de l'utiliser comme [ImageMagick](http://www.imagemagick.org/script/index.php).

[glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) est aussi un bon moyen de compiler vos shaders sur un [Raspberry Pi](https://www.raspberrypi.org/) et c'est la raison pour laquelle [openFrame.io](http://openframe.io/) l'utilise pour afficher les oeuvres.
Pour en savoir plus, [cliquez ici](https://github.com/patriciogonzalezvivo/glslViewer).

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -s 1 -o yourOutputImage.png
```

**Création** : pour améliorer l'expérience de programmation des shaders, j'ai créé un éditeur disponible ici : [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor).
L'éditeur est embarqué dans les exemples de ce livre, il met à disposition une série de petits widgets qui rendent l'édition du code GLSL plus tangible et moins abstraite.
Vous pouvez également le lancer dans une fenêtre de navigateur à cette adresse [editor.thebookofshaders.com](http://editor.thebookofshaders.com/).
Pour en savoir plus, [cliquez ici](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

Si vous préférez travailler avec [SublimeText](https://www.sublimetext.com/) vous pouvez installer le [package pour glslViewer](https://packagecontrol.io/packages/glslViewer).
Pour en savoir plus, [cliquez ici](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**Partager** : l'éditeur en ligne ([editor.thebookofshaders.com](http://editor.thebookofshaders.com/)) vous permet de partager vos shaders !
La version autonome comme la version en ligne de l'éditeur permettent de sauver votre shader en ligne et d'obtenir une url unique.
Il est également possible d'exporter le shader pour qu'il fonctionne sur [openFrame.io](http://openframe.io/).

![](glslEditor-00.gif)

**Organiser** : pouvoir partager ses shaders est une bonne chose, en plus de l'export vers [openFrame.io](http://openframe.io/),
j'ai fait un outil permettant d'organiser vos shaders dans une galerie et d'intégrer cette galerie dans n'importe quel site.
Il s'appelle [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery), pour en savoir plus, [cliquez ici](https://github.com/patriciogonzalezvivo/glslGallery).

![](glslGallery.gif)

## Lancer vos shaders depuis votre plateforme favorite

Si vous avez déjà programmé à l'aide de frameworks/APIs comme : [Processing](https://processing.org/), [Three.js](http://threejs.org/) ou [OpenFrameworks](http://openframeworks.cc/),
vous êtes sans doute impatients de tester vos shaders dans ces environnements.
Les exemples suivants montrent comment intégrer les shaders sur ces plateformes en conservant les conventions de nommage que nous utiliserons dans ce livre.
Vous retrouverez le code source complet sur le [dépôt GitHub de ce chapitre](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04).

### Dans **Three.js**

L'humble et brilliant Ricardo Cabello (alias [MrDoob](https://twitter.com/mrdoob)) a développé avec d'autres [contributeurs](https://github.com/mrdoob/three.js/graphs/contributors), l'un des frameworks WebGL les plus utilisés : [Three.js](http://threejs.org/).
Il existe de nombreuses ressources pour apprendre à se servir de ce framework JavaScript.

L'exemple ci-dessous, vous donne le code nécessaire pour utiliser un shader dans Three.js.
Notez bien la balise de script appelée `id="fragmentShader"`, c'est là qu'il faudra coller le code que vous trouverez dans ce livre.

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

### Dans **Processing**

Initié par [Ben Fry](http://benfry.com/) et [Casey Reas](http://reas.com/) en 2001, [Processing](https://processing.org/) est un framework Java
 extraordinairement simple et très puissant qui vous aidera à faire vos premiers pas dans le code créatif (ça a été mon cas).
[Andres Colubri](https://codeanticode.wordpress.com/) a contribué des mises à jour importantes concernant OpenGL et la gestion vidéo dans Processing.
Ces ajouts simplifient énormément l'intégration des shaders GLSL dans l'environnement de développement.
Processing va chercher le shader appelé `"shader.frag"` dans le dossier `data` du sketch.
Assurez vous de copier les exemples du livre dans ce dossier et de les renommer correctement.

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

Pour que le shader fonctionne dans les versions antérieures à Processing 2.1, il faut ajouter la ligne suivante : `#define PROCESSING_COLOR_SHADER` au début du shader.
Il devrait ressembler à cela :

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

Pour en savoir plus sur les shaders dans Processing, vous pouvez vous reporter à ce [tutoriel](https://processing.org/tutorials/pshader/).

### Dans **openFrameworks**

Chacun a sa zone de confort, pour moi, cela reste [la communité openFrameworks](http://openframeworks.cc/).
Ce framework C++ intègre OpenGL et d'autres librairies C++ open source.
Il est très proche de Processing à ceci près que c'est un langage compilé et qu'il vaut donc mieux être habitué aux compilateurs C++.
Comme Processing, openFrameworks va chercher le fichier du shader dans le dossier `data`, donc n'oubliez pas de créer un fichier `.frag`, d'y coller le contenu du shader et de spécifier le nom de ce fichier dans votre programme OF.

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

Pour plus d'informations sur les shader OpenFrameworks, vous pouvez vous reporter à cet [excellent tutoriel](http://openframeworks.cc/ofBook/chapters/shaders.html) écrit par [Joshua Noble](http://thefactoryfactory.com/).
