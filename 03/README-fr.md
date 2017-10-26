## Uniforms

Jusqu'à présent, nous avons vu comment le GPU gère un ensemble de threads parallèles dont le but est d'assigner la couleur d'une partie de l'image finale.
Bien que chaque thread soit *aveugle*, nous devons être capables de passer certaines valeurs depuis le CPU vers le GPU et les threads en question.
Du fait de l'architecture des cartes graphiques, ces valeurs vont devoir être également (ou *uniform*-ément) distribuées sur tous les threads et - comme décrit au chapitre 1 - utilisées en *lecture seule*.
Autrement dit, _tous les threads reçoivent les mêmes données, chacun peut les lire mais pas les modifier_.

Ces données s'appellent des `uniform` et peuvent prendre les types suivants : `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` et `samplerCube`.
Les uniforms se définissent généralement en haut du shader, juste après avoir défini la précision des floats (et autres macros de prétraitement).

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // taille du Canvas (x:largeur en pixels, y:hauteur en pixels)
uniform vec2 u_mouse;       // position de la souris (x,y) sur le canvas en pixels
uniform float u_time;       // temps écoulé depuis le lancement du shader
```

On peut se représenter les uniforms comme de petits ponts à sens unique allant du CPU (notre programme principal) au GPU (là où sera exécuté le shader).
Les noms peuvent varier selon les implémentations et les plateformes mais dans les exemples suivants, nous utiliserons toujours : `u_time` (le temps écoulé depuis le lancement du shader),
`u_resolution` (la taille du canvas sur lequel le shader est exécuté) et `u_mouse` (la position de la souris à l'intérieur du canvas).
Le fait de préfixer les noms des uniforms par `u_` est une convention de nommage assez répandue, ça permet de reconnaître facilement le type de cette variable mais ce n'est pas une obligation.

Par exemple [ShaderToy.com](https://www.shadertoy.com/) utilise les mêmes uniforms avec les noms suivants :

```glsl
uniform vec3 iResolution;   // taille du canvas (en pixels)
uniform vec4 iMouse;        // position de la souris. xy: courant, zw: au click
uniform float iTime;        // temps écoulé depuis le lancement du shader (en secondes)
```

Notez qu'ils utilisent un `i` au lieu de notre `u_`.

Assez parlé, voyons ce que les uniforms peuvent faire.
Dans l'exemple suivant, nous utilisons l'uniform la valeurs absolue (`abs(valeur)`) d'une fonction de sinus (`sin(valeur)`) qui prend `u_time` - le temps écoulé Depuis le lancement du shader - comme argument pour animer la quantité de rouge que nous dessinons sur le canvas.

La fonction de sinus attend un angle comme argument, en utilisant le temps (valeur qui ne cesse de croître), on obtient une valeur qui va osciller infiniment entre `-1.` et `1.`.
La valeur *absolue* d'une fonction de sinus sera quant à elle toujours comprise entre `0.` et `1.` donc notre valeur de rouge oscillera entre `0.` et `1.`.

<div class="codeAndCanvas" data="time.frag"></div>

On peut constater que ça va vite (par rapport au même traitement sur le CPU), cela vient de l'*accélération matérielle*.
En effet, au chapitre 1 nous avons vu que les GPU implémentent parfois l'accélération *matérielle* de certaines opérations, certaines fonctions trigonométriques telles que :
[`sin()`](../glossary/?search=sin), [`cos()`](../glossary/?search=cos), [`tan()`](../glossary/?search=tan), [`asin()`](../glossary/?search=asin), [`acos()`](../glossary/?search=acos), [`atan()`](../glossary/?search=atan), [`pow()`](../glossary/?search=pow), [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log), [`sqrt()`](../glossary/?search=sqrt), [`abs()`](../glossary/?search=abs), [`sign()`](../glossary/?search=sign), [`floor()`](../glossary/?search=floor), [`ceil()`](../glossary/?search=ceil), [`fract()`](../glossary/?search=fract), [`mod()`](../glossary/?search=mod), [`min()`](../glossary/?search=min), [`max()`](../glossary/?search=max) er [`clamp()`](../glossary/?search=clamp),
sont donc exécutées _matériellement_ et peuvent aller très (très) vite.

Essayons de jouer avec le code ci dessus.

* Ralentissez la fréquence jusqu'à ce que le changement de couleur deviennent imperceptible.

* Accélérez la fréquence jusqu'à voir une couleur unique sans clignotement.

* Donnez des fréquences différentes aux trois canaux (RGB) pour obtenir des motifs et des comportements intéressants.

## gl_FragCoord

De la même manière que la fonction main() du shader expose la variable de sortie : `vec4 gl_FragColor`, elle nous donne accès à une variable d'entrée `vec4 gl_FragCoord`
qui contient les coordonnées à l'écran du *pixel*.
Ce *pixel* s'appelle en fait un *screen fragment*, qui donne son nom au *fragment shader*.
Le *screen fragment* ou plus simplement *fragment* est le _pixel en train d'être traité par le thread_.

La variable `vec4 gl_FragCoord`, nous donne donc accès à l'emplacement _physique_ (à l'écran) du pixel sur lequel le thread est en train de travailler.
Cette variable n'est pas une *uniform* puisqu'elle ne conserve pas la même valeur d'un thread à l'autre, chaque pixel ayant par définition des coordonnées uniques.

La variable `gl_FragCoord` s'appelle *varying* puisqu'elle va *varier* d'un thread sur l'autre, c'est la seconde _famille_ de variables qu'on peut utiliser dans un shader.
Cette variable est déclarée *implicitement* dans les _vertex-shader_ et passée systématiquement à notre *fragment-shader*, autrement dit, elle est toujours là mais inutile de la chercher dans le code ci dessous.

Deuxième chose importante, `gl_FragColor`, `gl_FragCoord` et tous les noms de fonctions (`sin()`, `abs()`, etc...) sont des noms réservés ; on ne peut pas s'en servir pour créer nos variables.

<div class="codeAndCanvas" data="space.frag"></div>

Dans le code ci-dessus, nous *normalisons* les coordonnées du *fragment* en les divisant par la taille du canvas.
En *normalisant* les coordonnées, elles vont se retrouver comprises entre `0.0` et `1.0` ce qui permet de *mapper* facilement les valeurs X et Y du *fragment* vers les canaux rouges et verts (R et G) de la couleur de sortie (`gl_FragColor`).

Au pays des shaders, nous avons peu de moyen de débugger une application à part assigner des valeurs criardes aux fragments et essayer de comprendre ce qui se passe.
Vous découvrirez que parfois, coder un shader c'est comme de fabriquer un tout petit bateau dans une bouteille, c'est dur, c'est beau et c'est gratifiant.

![](08.png)

Voyons ce que nous avez appris et compris du code.

* Pouvez dire où se trouvent les coordonnées XY `(0.0, 0.0)` sur notre canvas ?

* A votre avis où se trouvent les coordonnées`(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` et `(1.0, 1.0)` ?

* Pouvez vous déduire comment utiliser l'uniform `u_mouse` sachant que ses valeurs sont passées au shader en _pixels_ et ne sont pas normalisées ?

* Pouvez vous utiliser `u_mouse` pour changer les couleurs ?

* Pouvez vous inventer une manière intéressante de combiner `u_time` et `u_mouse` pour créer un motif ?

Après ces petits exercices, vous vous demandez sans doute où exercer vos nouveaux talents.
Au chapitre suivant, nous verrons comment fabriquer nos propres outils dans Three.js, Processing et OpenFrameworks.
