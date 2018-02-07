# Design génératif

Il n'est pas surprenant qu'après avoir passé autant de temps à organiser régulièrement les choses, l'auteur soit amené à introduire du chaos.

## Aléatoire

[![Ryoji Ikeda - test pattern (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

L'aléatoire est la plus haute expression de l'entropie.
Comment pouvons nous créer de l'aléatoire dans un environnement apparemment aussi rigide et prévisible ?

Analysons la fonction suivante :

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Nous récupérons la partie fractionnelle ([```fract()```](../glossary/?search=fract)) d'une fonction de sinus [```sin()```](../glossary/?search=sin).
Le sinus oscille entre ```-1.0``` et ```1.0``` et on récupère les chiffres après la virgule ce qui annule le signe (- ou +) et retourne une valeur absolue.
Nous pouvons utiliser ce procédé pour obtenir des valeurs *pseudo-aléatoires* en cassant cette oscillation en petits morceaux.
Comment ?
En multipliant le résultat de [```sin(x)```](../glossary/?search=sin) par un grand chiffre.
Essayez d'ajouter quelques zéros au multiplicateur de ```sin(x)``` dans le code ci-dessus.

En arrivant à ```100000.0``` (l'équation ressemble à : ```y = fract(sin(x)*100000.0)```), il n'est plus possible de distinguer l'oscillation de la sinusoïde.
La granularité de la partie fractionnelle a altéré les valeurs de la sinusoïde au point de la transformer en chaos pseudo-aléatoire.

## Contrôler le chaos

Utiliser l'aléatoire peut être difficile ; soit le résultat sera trop chaotique, soit il ne sera pas assez aléatoire.
Dans le graphe suivant, nous utilisons une fonction ```rand()```, implémentée exactement comme décrit ci-dessus.

En regardant de plus près, on peut voir les pics que forme la sinusoïde à ```-1.5707``` et ```1.5707```.
Je parie que vous savez pourquoi - c'est là que la sinusoïde atteint ses valeurs minimum et maximum.

En regardant la distribution des valeurs en Y, vous noterez également que les valeurs se concentrent autour de .5 plutôt que vers 0 et 1.

<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

Il y a quelques temps, [Pixelero](https://pixelero.wordpress.com) a publié un [article sur les distributions aléatoires](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/).
J'ai ajouté quelques une des fonctions dont il se sert dans l'exemple ci-dessus pour que vous voyiez comment modifier une distribution.
Décommentez les lignes pour voir comment chacune se comporte.

Si vous avez lu l'[article de Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/), il est important de garder à l'esprit que notre fonction ```rand()``` est *déterministe*, aussi appelée *pseudo-aléatoire*.
Ce qui signifie par exemple que ```rand(1.)``` renverra toujours la même valeur alors que [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) se sert de la fonction
```Math.random()``` qui est non-déterministe et renvoie une valeur différente à chaque appel.

## Aléatoire en 2D

Maintenant que nous en savons un peu plus sur l'aléatoire, nous pouvons nous atteler à la deuxième dimension ; un bruit en ```x``` et ```y```.
Nous aurons besoin pour ça de transformer un vecteur à deux dimensions en un chiffre aléatoire.
Il y a plusieurs façons de procéder mais la fonction [```dot()```](../glossary/?search=dot) nous sera particulièrement utile dans ce cas précis.
Elle retourne un chiffre compris entre ```-1.0``` et ```1.0``` en fonction de l'alignement de deux vecteurs normalisés.

Le _dot product_ ou produit scalaire renvoie le cosinus de l'angle formé par deux vecteurs normalisés.
Il permet donc de retrouver l'angle formé par les 2 vecteurs et de déterminer si les 2 vecteurs *pointent* dans la même direction.

<div class="codeAndCanvas" data="2d-random.frag"></div>

Aux lignes 13 à 15, nous utilisons le résultat du ```dot()``` de ```vec2 st``` et d'un autre vecteur( ```vec2(12.9898,78.233)```).

* Essayez de changer les valeurs des lignes 14 et 15. Observez comment le motif aléatoire évolue et essayez d'en tirer des conclusions.

* Branchez cette fonction sur la position de la souris (```u_mouse```) et le temps (```u_time```) pour mieux comprendre comment ça marche.

## Utiliser le chaos

L'aléatoire en 2D ressemble à la neige d'un téléviseur, n'est-ce pas ? C'est un métariau brut, difficile à utiliser tel quel pour construire une image, apprenons à mieux en tirer parti.

Notre première étape consistera à appliquer une grille ; en se servant de la méthode [```floor()```](../glossary/?search=floor), nous allons créer un tableau de cellules.
Regardez bien le code suivant, notamment les lignes 22 et 23.

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

Après avoir multiplié l'échelle par 10 (ligne 21), nous séparons la partie entière de la partie fractionnelle du vecteur de coordonéées (*st*).
C'est une opération dont nous nous sommes servis au dernier chapitre, elle nous permet de subdiviser l'espace et d'obtenir des cellules dont les coordonnées sont normalisées entre ```0.0``` et ```1.0```.
La partie entière (le vecteur ```vec2 floor(st)```) des coordonnées nous donne une valeur commune à chaque cellule, ce qui nous permet de trouver une valeur aléatoire pour chaque cellule plutôt que pour chaque fragment.
Du fait de la nature déterministe de notre fonction ```rand()```, la valeur retournée par la fonction lorsqu'on lui passe plusieurs fois le même vecteur sera la même.
Comme tous les fragments d'une cellule passeront le même argument ```ipos``` à la fonction ```rand()```, tous les fragments d'une cellule obtiendront la même couleur.

Décommentez la ligne 29 pour voir que nous conservons également la partie fractionnelle des coordonnées. Nous pouvons toujours utiliser ces coordonnées pour dessiner quelque chose dans la cellule.

En combinant les deux valeurs - la partie entière et la partie fractionnelle des coordonnées - permet de créer des variations et de faire des mélanges de nos valeurs aléatoires.

Regardez cette implémentation du célèbre générateur de labyrinthes ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10```:

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

Ici, je me sers de la valeur aléatoire d'une cellule pour dessiner une ligne dans une direction ou l'autre en appelant la méthode ```truchetPattern()``` du chapitre précédent (lignes 41 à 47).

Vous pouvez obtenir un motif intéressant en décommentant les lignes 50 à 53, ou l'animer en décommentant les lignes 35 et 36.

## Maîtriser l'aléatoire

[Ryoji Ikeda](http://www.ryojiikeda.com/), un compositeur et artiste japonais maîtrise l'utilisation de l'aléatoire ; difficile de ne pas être touché par son oeuvre.
Dans ses oeuvres audio et vidéo, il utilise l'aléatoire de telle façon que ce n'est pas une série ennuyeuse de variations accidentelles mais plutôt un mirroir de la complexité de notre culture technologique.

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Reagrdez le travail d'[Ikeda](http://www.ryojiikeda.com/) et essayez les exercices suivants :

* Faites des rangées de cellules qui bougent dans des directions opposées, à des vitesses aléatoires. N'affichez que les cellules les plus lumineuses. Faites varier les vitesses dans le temps.

<a href="../edit.html#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* Créez plusieurs lignes, chacune avec une direction et une vitesse différents, branchez la position de la souris comme seuil pour savoir quelles cellules afficher.

<a href="../edit.html#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Créez d'autres effets.

<a href="../edit.html#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

Utiliser l'aléatoire de façon esthétique peut être difficile, en particullier si vous recherchez un rendu *naturel*.
L'aléatoire est beaucoup trop chaotique et dans la *vraie vie*, très peu de choses paraissent aussi aléatoires.
Si vous regardez la pluie ou le cours de la bourse, qui sont tous les deux aléatoires, vous verrez qu'ils n'ont rien en commun avec la méthode que nous avons créé en début de chapitre.
Pourquoi ? Les valeurs aléatoires ne sont pas corrélées entre elles, alors que les phénomènes naturels conservent souvent une trace de leur état précédent.

Au prochain chapitre, nous allons étudier le *bruit*, une manière plus *organique* de créer du chaos dans un shader.
