## Εκτελώντας τον shaders σας

Σαν μέρος της σύνθεσης αυτού του βιβλίου και της εξάσκησής μου στην πράξη, έφτιαξα ένα οικοσύστημα από εργαλεία ώστε που μπορεί κανείς να δημιουργήσει, να εμφανίσει, να μοιραστεί και να επιμεληθεί τους shaders του. Τα εργαλεία αυτά λειτουργούν ομοιόμορφα σε Linux, MacOS, Windows και [Raspberry Pi](https://www.raspberrypi.org/) και browsers (φυλλομετρητές) χωρίς να χρειάζεται να αλλάξετε τον κώδικά σας.

## Εκτελώντας τους shaders σας σε browser

**Εμφάνιση**: όλα τα διαδραστικά παραδείγματα σε αυτό το βιβλίο απεικονίζονται χρησιμοποιώντας [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) το οποίο κάνει τη διαδικασία του να τρέξουμε αυτόνομους shaders εξαιρετικά εύκολη.

```html
<canvas class="glslCanvas" data-fragment-url=“yourShader.frag" data-textures=“yourInputImage.png” width="500" height="500"></canvas>
```

Όπως βλέπετε, χρειάζεται μόνο ένα `canvas` (HTML) element με `class="glslCanvas"` και το url του shader στο `data-fragment-url`. Μάθετε περισσότερα [εδώ](https://github.com/patriciogonzalezvivo/glslCanvas).

Αν είστε σαν εμένα, πιθανόν θα θέλετε να τρέξετε shaders απευθείας από τη γραμμή εντολών, σε αυτή την περίπτωση προτείνω να δείτε το [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer). Αυτή η εφαρμογή σας επιτρέπει να ενσωματώσετε shaders στα scripts (σενάρια εκτέλεσης) σας φλοιού `bash` ή σε pipelines ("σωληνώσεις" εργαλείων) unix και να τα χρησιμοποιήσετε παρόμοια με το [ImageMagick](http://www.imagemagick.org/script/index.php). Επίσης, το [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) είναι ένας πολύ καλός τρόπος να μεταγλωττίζετε shaders στο [Raspberry Pi](https://www.raspberrypi.org/) σας, ο οποίος είναι και ο λόγος που το [openFrame.io](http://openframe.io/) το χρησιμοποιεί για να εμφανίσει έργα τέχνης με shaders. Βρείτε περισσότερα για αυτή την εφαρμογή [εδώ](https://github.com/patriciogonzalezvivo/glslViewer).

```bash
glslViewer yourShader.frag yourInputImage.png —w 500 -h 500 -E screenshot,yourOutputImage.png
```

**Δημιουργία**: προκειμένου να αναδείξω την εμπειρία του να γράφουμε shaders, έφτιαξα ένα online editor (πρόγραμμα επεξεργασίας κειμένου) με όνομα [glslEditor](https://github.com/patriciogonzalezvivo/glslEditor). Αυτός ο editor είναι ενσωματωμένος στα διαδραστικά παραδείγματα του βιβλίου. Μας δίνει ένα σύνολο από χρήσιμα widgets (εργαλεία διεπαφής) ώστε να κάνει πιο "απτή" την αφηρημένη εμπειρία του να δουλεύουμε με κώδικα glsl. Μπορείτε επίσης να τον τρέξετε σαν αυτόνομη εφαρμογή web από εδώ [editor.thebookofshaders.com/](http://editor.thebookofshaders.com/). Μάθετε περισσότερα σχετικά [εδώ](https://github.com/patriciogonzalezvivo/glslEditor).

![](glslEditor-01.gif)

Αν προτιμάτε να δουλεύετε offline με το [SublimeText](https://www.sublimetext.com/) μπορείτε να εγκαταστήσετε αυτό το [πακέτο για τον glslViewer](https://packagecontrol.io/packages/glslViewer). Μάθετε περισσότερα [εδώ](https://github.com/patriciogonzalezvivo/sublime-glslViewer).

![](glslViewer.gif)

**Διανομή**: με τον online editor ([editor.thebookofshaders.com/](http://editor.thebookofshaders.com/)) μπορείτε να μοιραστείτε τους shaders σας! Και η online και ενσωματωμένη και η ανεξάρτητη έκδοση έχουν ένα κουμπί export (εξαγωγή) με το οποίο μπορείτε να πάρετε ένα μοναδικό URL για τον shader σας. Επίσης έχει τη δυνατότητα να κάνει export απευθείας σε ένα [openFrame.io](http://openframe.io/).

![](glslEditor-00.gif)

**Επιμέλεια**: Το να μοιραστείτε τον κώδικά σας είναι το πρώτο βήμα προς το να μοιραστείτε τον shader σας σαν έργο τέχνης! Εκτός από την επιλογή να κάνετε export σε [openFrame.io](http://openframe.io/) έφτιαξα ένα εργαλείο με το οποίο μπορείτε να οργανώσετε τους shaders σας σε μια έκθεση που μπορεί να ενσωματωθεί σε οποιοδήποτε site (ιστοχώρο), το όνομά του είναι [glslGallery](https://github.com/patriciogonzalezvivo/glslGallery). Δείτε περισσότερα [εδώ](https://github.com/patriciogonzalezvivo/glslGallery).

![](glslGallery.gif)

## Εκτελώντας τους shaders στο περιβάλλον της προτίμησής σας

Αν έχετε ήδη εμπειρία προγραμματισμού σε κάποιο περιβάλλον όπως: [Processing](https://processing.org/), [Three.js](http://threejs.org/), [OpenFrameworks](http://openframeworks.cc/) ή [SFML](https://www.sfml-dev.org/), θα ανυπομονείτε πιθανόν να δοκιμάσετε shaders στις πλατφόρμες με τις οποίες αισθάνεστε οικεία. Τα παρακάτω είναι παραδείγματα για το πως να ορίσετε shaders σε κάποια γνωστά περιβάλλοντα με τα ίδια uniforms τα οποία θα χρησιμοποιήσουμε σε όλο το βιβλίο. (Στο [GitHub repository αυτού του κεφαλαίου](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/04), θα βρείτε ολόκληρο τον κώδικα γι' αυτά τα τρία περιβάλλοντα.)

### Σε **Three.js**

Ο ευφυέστατος και πολύ σεμνός Ricardo Cabello (επίσης γνωστός και σαν [MrDoob](https://twitter.com/mrdoob) ) αναπτύσσει ανάμεσα σε άλλους [συνεργάτες](https://github.com/mrdoob/three.js/graphs/contributors) ένα πιθανόν από τα πιο γνωστά περιβάλλοντα για WebGL, που ονομάζεται [Three.js](http://threejs.org/). Θα βρείτε πολλά παραδείγματα, μαθήματα και βιβλία που διδάσκουν πως να χρησιμοποιήσετε αυτή τη βιβλιοθήκη JavaScript για να δημιουργήσετε φοβερά 3D γραφικά.

Ακολουθεί ένα παράδειγμα για τις HTML και JS που που χρειάζεστε για να ξεκινήσετε με shaders σε three.js. Δώστε ιδιαίτερη σημασία στο script `id="fragmentShader"`, εδώ είναι που μπορείτε να αντιγράψετε τους shaders που βρίσκετε σε αυτό το βοβλίο.

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

### Σε **Processing**

Η [Processing](https://processing.org/) η οποία πρωτοξεκίνησε από τους [Ben Fry](http://benfry.com/) και [Casey Reas](http://reas.com/) το 2001, είναι ένα εξαιρετικά απλό και ισχυρό περιβάλλον για να κάνετε τα πρώτα σας βήματα σε κώδικα (σίγουρα ήταν για 'μένα). Ο [Andres Colubri](https://codeanticode.wordpress.com/) έχει κάνει σπουδαίες ενημερώσεις για την OpenGL και το video στην Processing, καθιστώντας το εκολότερο από ποτέ να παίξει κανείς με GLSL shaders στο φιλικό αυτό περιβάλλον. Η Processing ψάχνει για τον shader με όνομα `"shader.frag"` στον φάκελο `data` του sketch ("σκίτσο" - το project της Processing). Αντιγράψτε τα παραδείγματα που βρίσκετε εδώ σε αυτό τον φάκελο, και μετονομάστε το αρχείο.

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

Προκειμένου να δουλέψει ο shader σε εκδόσεις παλιότερες της 2.1, πρέπει να προσθέσετε την παρακάτω γραμμή στην αρχή του shader: `#define PROCESSING_COLOR_SHADER`, έτσι ώστε να δείχνει ως εξής:

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

Για περισσότερες πληροφορίες σχετικά με τους shaders σε Processing, δείτε αυτό το [μάθημα](https://processing.org/tutorials/pshader/).

### Σε **openFrameworks**

Για τον καθένα υπάρχει ένα μέρος όπου νιώθει άνετα, στην περίπτωσή μου, εξακολουθεί να είναι η [κοινότητα openFrameworks](http://openframeworks.cc/). Αυτή η βιβλιοθήκη C++ παρέχει ένα πλαίσιο αφαίρεσης γύρω απο την OpenGL και άλλες βιβλιοθήκες C++ ανοιχτού κώδικα. Κατά πολλές έννοιες είναι παρόμοια με την Processing, αλλά με τις προφανείς επιπλοκές του να δουλεύει κανείς με μεταγλωττιστές C++. Όμοια με την Processing, η openFrameworks αναζητά τα αρχεία shader στο φάκελο data, οπότε μην παραλείψετε να αντιγράψετε τα αρχεία `.frag` που θέλετε να χρησιμοποιήσετε και να αλλάξετε το όνομά τους όταν τα φορτώνετε.

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

Αν θέλετε να χρησιμοποιήσετε το πλήρες σύνολο απο uniforms που υπάρχουν στον ορισμό των GlslViewer και GlslCanvas με απλούστερο τρόπο σε OpenFrameworks, συνιστώ το addon (πρόσθετο) [ofxShader](https://github.com/patriciogonzalezvivo/ofxshader) το οποίο επίσης υποστηρίζει πολλαπλούς buffers (μνήμη εικόνας), shaders υλικών, hotreload (άμεση επανεκτέλεση) και αυτόματη μετατροπή σε OpenGL ES για το Raspberry Pi. Και ο κώδικάς σας θα απαιτεί μόνο το παρακάτω:

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


Για περισσότερες πληροφορίες για τους shaders σε openFrameworks δείτε αυτό το [εξαιρετικό μάθημα](http://openframeworks.cc/ofBook/chapters/shaders.html) από τον [Joshua Noble](http://thefactoryfactory.com/).
