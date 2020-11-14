![Alice Hubbard, Providence, United States, ca. 1892. Photo: Zindman/Freemont.](froebel.jpg)

## Formes

Enfin ! Tous ce que nous avons appris nous a mené jusqu'à ce moment !
Nous avons vu la plupart des bases, des types et des fonctions,
nous avons répété nos fonctions de formes à une dimension, il est temps de faire marcher tout ça ensemble et vous êtes paré !
Dans ce chapitre, vous apprendrez à dessiner des formes, de façon procédurale et en parallèle sur un GPU.

### Rectangle

Imaginons que nous avons un papier millimétré, comme à l'école, et nos devoirs consistent à dessiner un carré.
La taille de la feuille est 10x10 et le carré doit mesurer 8x8, comment faire ?

![](grid_paper.jpg)

A priori nous allons colorier tout sauf : la première et la dernière rangée et la première et la dernière colonne, c'est bien cela ?

En quoi est-ce lié aux shaders ?
Chaque petit carré du papier millimétré est un thread (un pixel, ou fragment).
chaque petit carré connaît sa position, comme des coordonnées sur un échiquier.
Dans les chapitres précédents, nous avons appris à nous servir des valeurs normalisées, par exemple, nous avons mappé ces positions *x* et *y* vers les canaux *rouge* et *vert*.
Comme nos valeurs étaient normalisées entre 0.0 and 1.0, on pouvait les utiliser comme des couleurs, ou dans les fonctions de formes, ou dans les interpolations.
Mais à présent, comment utiliser ces valeurs *x* et *y* normalisées pour dessiner un carré au centre du canvas ?

Commençons par utiliser un pseudocode se servant d'une condition `if/else` sur toute la taille du canvas.
Le procédé est très proche de la démarche que nous avons eu avec le papier millimétré.

```glsl
if ( (X SUPERIEUR A 1) AND (Y SUPERIEUR A 1) )
    dessine en blanc
else
    dessine en noir
```

Nous avons une meilleure idée du code qu'il va falloir produire, nous allons remplacer les `if` par des [`step()`](../glossary/?search=step)
et au lieu d'utiliser 10x10, nous utiliserons les valeurs *x* et *y* normalisées entre 0.0 et 1.0 :

```glsl
uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // chaque appel à step() renverra soit: 1.0 (blanc), soit 0.0 (noir).
    float gauche = step(0.1,st.x);   // équivalent à: si( X supérieur à 0.1 )
    float bas = step(0.1,st.y); // équivalent à: si( Y supérieur à 0.1 )

    // multiplier gauche par bas revient à faire un AND logique.
    color = vec3( gauche * bas );

    gl_FragColor = vec4(color,1.0);
}
```

La fonction [`step()`](../glossary/?search=step), va dessiner tous les pixels dont la valeur des *x* est inférieure à 0.1 en noir (`vec3(0.0)`) et tous les autres en blanc (`vec3(1.0)`).
Le fait de multiplier `gauche` par `bas` est équivalent à l'opérateur logique `AND` ; si les deux opérantions (`x<.1` et `y<.1`) renvoient 1.0, le résultat sera 1.0, sinon, ce sera 0.0.
Cela nous permet de dessiner 2 lignes noires, une en bas et une à gauche du canvas.

En règle générale et bien que ce ne soit pas interdit, il est déconseillé d'utiliser les `if` dans un shader.
ça peut paraître contre-intuitif mais la raison est simple, si on fait un `if` (ce qu'on appelle un *conditional branching*),
le programme va devoir évaluer les 2 branches de toutes façons et cette évaluation va ralentir (voire anéantir) le bénifice d'utiliser le GPU.
Une stratégie pour parer à ce problème est de structurer le code de manière à éliminer les conditions, donc les branches.
En l'occurrence, se servir du résultat (0 ou 1) de `step()` et le multiplier par une autre variable (la couleur par exemple).
Si le `step()` renvoie 1, la couleur se multipliera par 1 et restera la même, si le `step()` renvoie 0, la couleur se multipliera par 0 donc elle passe au noir.
C'est une technique que voue retrouverez souvent dans les shaders.

![](rect-01.jpg)

Dans l'exemple ci-dessus, nous répétons la même opération sur chaque axe gauche et bas.
Nous pouvons économiser quelques lignes de code en passant les deux valeurs *x* et *y* au [`step()`](../glossary/?search=step) simultanément au lieu de faire deux appels à `step()` séparés, ce qui resemble à ça :

```glsl
vec2 limites = step(vec2(0.1),st);
float pct = limites.x * limites.y;
```

Nous avons à présent deux limites de notre rectangle : gauche et bas. Occupons nous des deux autres : haut et droite, regardez le code suivant :

<div class="codeAndCanvas" data="rect-making.frag"></div>

Décommentez les *lignes 21-22* et notez comment nous inversons les coordonnées de `st` (*1.0 - st*) et réutilisons le même appel à [`step()`](../glossary/?search=step).
Le `vec2 tr` contient à présent les réponses du test pour le coin haut droit. C'est l'équivalent numérique de : "retourner la page et appliquer la même procédure".

![](rect-02.jpg)
Notez qu'aux *lignes 18 et 22*, tous les côtés sont multipliés entre eux, ce qui revient à écrire :

```glsl
vec2 bl = step(vec2(0.1),st);       // bas-gauche
vec2 tr = step(vec2(0.1),1.0-st);   // haut-droit
color = vec3(bl.x * bl.y * tr.x * tr.y);
```

Intéressant n'est ce pas ?
Le principe de cette technique est de se servir de [`step()`](../glossary/?search=step) et des multiplications comme d'opérateurs logiques et de retourner les coordonnées pour traiter les deux côtés de l'image.

Avant d'aller plus loin, essayez les choses suivantes :

* Changer la taille et les proportions du rectangle.

* Utilisez [`smoothstep()`](../glossary/?search=smoothstep) au lieu de [`step()`](../glossary/?search=step). Notez comme les arêtes passent d'un rendu net à flou.

* Réimplémentez les conditions en utilisant [`floor()`](../glossary/?search=floor).

* Conservez votre version préférée et faites-en une version réutilisable, si possible une fonction flexible et efficace (pas de *if* par exemple).

* Créez une fonction qui dessine uniquement l'extérieur du rectangle.

* Comment placer et déplacer plusieurs rectangles sur le canvas ? Si vous trouvez la réponse, tentez de créer une composition à la [Piet Mondrian](http://en.wikipedia.org/wiki/Piet_Mondrian).

![Piet Mondria - Tableau (1921)](mondrian.jpg)

### Cercles

Dessiner des carrés sur du papier millimétré est assez simple mais les cercles demandent un changement d'approche, notamment lorsqu'on doit traiter une masse de *pixels*.
Une solution est de *re-mapper* le système de coordonnées de manière à pouvoir utiliser la fonction [`step()`](../glossary/?search=step) pour dessiner un cercle.

Comment ?
Retournons à notre cours de math et à notre papier millimétré, on utilise un compas, on lui donne le bon rayon, on pose la pointe au centre du cercle et on trace le contour du cercle.

![](compass.jpg)

Traduire cette démarche dans un shader où chaque carré du papier est un pixel revient à *demander* à chaque pixel (ou thread ou fragment), s'il est à l'intérieur ou à l'extérieur du cercle.
Pour ce faire, nous allons donc calculer la distance de chaque fragment au centre de notre cercle.

![](circle.jpg)

Il existe plusieurs façons de calculer une distance. La plus simple est d'utiliser la fonction [`distance()`](../glossary/?search=distance), qui - en interne - calcule la longueur de la différence entre les deux points passés en arguments (dans notre cas, les coordonnées du pixel et la position du centre).
La fonction `length()` est simplement un raccourci pour [l'équation de l'hypoténuse](http://en.wikipedia.org/wiki/Hypotenuse) qui utilise la racine carrée [`sqrt()`](../glossary/?search=sqrt) de la somme des différences en *x* et *y*, au carré.

![](hypotenuse.png)

On peut donc utiliser indifféremment [`distance()`](../glossary/?search=distance), [`length()`](../glossary/?search=length) ou [`sqrt()`](../glossary/?search=sqrt) pour calculer la distance du pixel au centre du canvas.
Le code suivant contient ces trois fonctions et démontre sans surprise que les trois renvoient le même résultat.

* Commentez et décommentez les blocs pour utiliser les différentes manières de calculer la distance.

<div class="codeAndCanvas" data="circle-making.frag"></div>

Dans l'exemple ci-dessus, nous mappons la distance au centre du canvas sur la *valeur* (la luminosité) du pixel de sortie.
Plus on est proche du centre, moins la distance est grande donc plus le pixel est sombre.
Notez que les valeurs ne montent pas énorménent (jusqu'au blanc par exemple) parce que, la plus grande distance entre un pixel et le centre (`vec2(0.5, 0.5)`) dépasse péniblement 0.5.


Prenez un moment pour observer et demandez vous :

* Que peut-on déduire de ça?

* Comment peut-on s'en servir pour dessiner un cercle?

* Modifiez le code suivant pour faire tenir le dégradé complet du cercle à l'intérieur du canvas.

**Note :** Pour être exact, la plus grande distance entre un pixel et le centre est : `sqrt( 2.0 ) * .5` soit environ *0.7071* !

### Champ de distance (Distance field)

Nous pouvons penser l'exemple ci-dessus comme étant une carte d'élévations ou les parties sombres seraient plus élevées.
Le dégradé du cercle ressemble à ce que serait un cone.
Imaginez vous au sommet de ce cone, la distance horizontale vers les bords du cone serait 0.5, elle est constante dans toutes les directions.
En choisissant à quelle hauteur on peut *couper* le cone, on obtiendra un disque plus ou moins grand.

![](distance-field.jpg)

En somme, on utilise une ré-interprétation de l'espace, en se basant sur la distance au centre plutôt que sur les coordonnées des pixels, pour créer des formes.
Cette technique s'appelle un "champ de distances" (Distance Field) et s'applique dans de nombreux contextes allant du dessin de contours à la 3D.

Essayez les choses suivantes:

* Utilisez [`step()`](../glossary/?search=step) pour passer toutes les valeurs supérieures à 0.5 en blanc et toutes les autres en noir.

* Inverser les couleurs d'avant plan et d'arrière plan.

* Utilisez [`smoothstep()`](../glossary/?search=smoothstep) et changez les paramètres pour ajouter un contour flou au cercle.

* Quand vous obtenez un résultat satisfaisant, créez une fonction que vous pourrez réutiliser.

* Ajoutez de la couleur.

* Pouvez-vous animer le cercle pour qu'il grossisse et rapetisse ? Pour qu'il simule un battement de coeur ? Les animations du chapitre précédent vous aideront !

* Comment déplacer ce cercle ? Pouvez vous le déplacer et placer plusieurs cercles sur le même canvas ?

* Que se passe-t'il quand on combine plusieurs champs de distances en utilisant différentes fonctions et opérations ?

```glsl
pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
```

* Faites trois compositions avec ces techniques, si elles bougent, c'est encore mieux !

#### Pour la boîte à outils

La fonction [`sqrt()`](../glossary/?search=sqrt) - comme toutes les fonctions qui en dépendent - est assez gourmande en ressources.
Voici autre une technique permettant de créer un champ de distances basée sur la fonction [`dot()`](../glossary/?search=dot).

<div class="codeAndCanvas" data="circle.frag"></div>

`dot()` renvoie le produit scalaire de deux vecteurs: `dot(a,b) = a.x * b.x + a.y * b.y;`

### Propriétés utiles des champs de Distances

![Zen garden](zen-garden.jpg)

Les champs de distance permettent de dessiner à peu près n'importe quoi.
Evidemment, plus la forme est complexe, plus l'équation sera complexe mais une fois qu'on a la formule d'une forme en particulier, il devient assez simple de la combiner avec d'autres et/ou de lui appliquer des effets comme des bords lissés, ou plusieurs contours.
C'est pourquoi les champs de distances sont utilisés pour le rendu des polices de caractères: [Mapbox GL Labels](https://blog.mapbox.com/drawing-text-with-signed-distance-fields-in-mapbox-gl-b0933af6f817), [Matt DesLauriers](https://twitter.com/mattdesl), [Material Design Fonts](http://mattdesl.svbtle.com/material-design-on-the-gpu) et [comme expliqué au chapitre 7 de "iPhone 3D Programming", O’Reilly](http://chimera.labs.oreilly.com/books/1234000001814/ch07.html#ch07_id36000921).

Prenez le code suivant:

<div class="codeAndCanvas" data="rect-df.frag"></div>

On commence par déplacer le système de coordonnées au centre et à le diviser par deux pour obtenir des valeurs comprises entre -1 et 1.
A la *ligne 24*, nous visualisons le champ de distances grâce à la fonction [`fract()`](../glossary/?search=fract) ce qui nous permet de mieux voir le motif qu'il crée.
Le motif du champ de distances se répète en cercles concentriques, à la manière d'un jardin zen.

Regardons la formule du champ de distances *ligne 19*. Nous calculons la distance entre chaque position et la coordonnée `( .3,.3 )` ( entre `st` et le vecteur `vec2(.3)`) pour chaque quadrant, c'est à ça que sert l'appel à [`abs()`](../glossary/?search=abs).

Si vous décommentez la *ligne 20*, vouz noterez que nous combinons les distances à ces 4 points en utilisant la fonction [`min()`](../glossary/?search=min) contre 0, ce qui produit un nouveau motif.

L'idée est qu'il n'y a qu'un seul point, et non '4', celui en haut à droite mais il est *reflété* dans les 3 autres *quadrants* du fait qu'on a changé la taille de l'espace *ligne 16* !

Essayez à présent de décommenter la *ligne 21*, nous utilisons cette fois la fonction [`max()`](../glossary/?search=max).
Le résultat est un rectangle aux bords arrondis.
Remarquez comme les anneaux du champ de distance deviennent de plus en plus lissse à mesure qu'ils s'éloignent du centre.

Enfin, décommentez les *ligne 27 à 29* une par une pour comprendre les différentes utilisations du champ de distances.

### Formes polaires

![Robert Mangold - Untitled (2008)](mangold.jpg)

Au chapitre des couleurs, nous avons projeté (mappé) des coordonnées cartésiennes sur des coordonnées polaires en calculant un *rayon* et un *angle* entre chaque pixel et le centre grâce à la formule suivante:

```glsl
vec2 pos = vec2(0.5)-st;
float r = length(pos)*2.0;
float a = atan(pos.y,pos.x);
```

Nous avons ré-utilisé une partie de cette formule au début du chapitre pour dessiner un cercle.
Nous calculions la distance en nous servant de [`length()`](../glossary/?search=length).
Maintenant que nous en savons plus sur les champs de distances, nous pouvons dessiner de nouvelles formes grâce aux coordonnées polaires.

La technique est un peu restrictive mais très simple : elle consiste à changer la valeur du *rayon* en fonction de l'*angle* pour obtenir une variété de formes.
Comment moduler cette longueur ? Avec des fonctions de formes bien sûr !

Ci-dessous, vous trouverez les mêmes fonctions dans un espace cartésien et dans un espace polaire (entre les *lignes 21 et 25* du shader).
Décommentez les fonctions une par une dans les deux démos pour comprendre les relations qui existent entre les deux systèmes de coordonnées.

<div class="simpleFunction" data="y = cos(x*3.);
//y = abs(cos(x*3.));
//y = abs(cos(x*2.5))*0.5+0.3;
//y = abs(cos(x*12.)*sin(x*3.))*.8+.1;
//y = smoothstep(-.5,1., cos(x*10.))*0.2+0.5;"></div>

<div class="codeAndCanvas" data="polar.frag"></div>

Essayez de :

* Animer les formes.
* Combiner différentes fonctions de formes pour *creuser des trous* dans les formes pour faire des fleurs, des flocons et des engrenages.
* Utilisez la fonction `plot()` du chapitre sur les fonctions de forme pour ne garder que le contour.

### Combinatoires

Nous venons de voir comment moduler le rayon d'un cercle en fonction d'un angle en utilisant la fonction [`atan()`](../glossary/?search=atan) pour dessiner différentes formes.
Voyons maintenant comment utiliser `atan()` avec un champ de distances de façon à pouvoir utiliser les effets qu'ils permettent.

L'astuce c'est d'utiliser le nombre de côtés d'un polygone régulier pour construire un champ de distances dans un espace polaire.
Pour plus d'informations, vous pouvez vous référer [au code suivant](http://thndl.com/square-shaped-shaders.html) par [Andrew Baldwin](https://twitter.com/baldand).

<div class="codeAndCanvas" data="shapes.frag"></div>

* En reprenant cet exemple, créez une fonction qui reçoit une position et un nombre de côtés et retourne la valeur du champ de distance correspondant.

* Mélangez les champs de distances en utilisant [`min()`](../glossary/?search=min) et [`max()`](../glossary/?search=max).

* Choisissez un logo géométrique et reproduisez le avec des champs de distance.

Félicitations !
Vous avez fait le plus dur !
Faites une pause et laissez décanter ces nouveaux concepts.
Dessiner des formes dans une API de dessin, c'est facile mais ici c'est une autre histoire.
Au pays des shaders, dessiner des formes géométriques est un peu tordu et s'imposer la disciple nécessaire à la compréhension de ce paradigme est épuisant.

À la fin de ce chapitre, vous trouverez un lien vers [PixelSpirit Deck] (https://patriciogonzalezvivo.github.io/PixelSpiritDeck/). Ce jeu de cartes vous aidera à apprendre les nouvelles fonctions SDF, à les composer dans vos conceptions et à les utiliser. sur vos shaders. La plate-forme a une courbe d’apprentissage prégressive, aussi prendre une carte par jour et travailler dessus vous poussera et mettra au défi vos compétences pendant des mois.

Maintenant que vous savez comment dessiner des formes, je suis sûr que ça va vous donner des idées.
Au prochain chapitre, nous apprendrons à déplacer, à appliquer des rotations et à changer d'échelle pour créer des compositions !
