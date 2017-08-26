## Hello World

Généralement le "Hello World" est la première étape dans l'apprentissage d'un nouveau langage.
C'est un programme court qui renvoie un message enthousiaste et fait miroiter un avenir radieux.

Au pays du GPU, rendre du texte est une tâche extrêmement complexe (et un champ de recherche très actif) donc au lieu d'un message texte, nous allons choisir une couleur chatoyante pour déchaîner notre enthousiasme !

<div class="codeAndCanvas" data="hello_world.frag"></div>

Si vous lisez ceci dans un navigateur récent, le bloc précédent est interactif.
Cela signifie que vous pouvez cliquer et éditer le code. Les changements seront pris en compte immédiatement, recompilés et si le shader est valide, il sera remplacé *à la volée*.
Vous pouvez essayer de changer les chiffres de la ligne 6.

Si ce programme paraît simple, nous pouvons déjà faire quelques observations intéressantes :

1. ça ressemble à du C, un shader possède une fonction `main` dont le seul but est d'assigner une couleur.

2. la couleur du pixel est assignée à une variable globale (réservée) `gl_FragColor`.

3. ce langage aux allures de C, possède des *variables* (comme `gl_FragColor`), des *fonctions* et des *types*.
Dans l'exemple, nous venons de voir le type `vec4` qui représente un vecteur de chiffres (des `floats`) à 4 dimensions. Plus tard nous verrons d'autres types comme : `vec3` & `vec2` et d'autres plus fréquents comme : `float`, `int` & `bool`.

4. si l'on regarde `vec4` de plus près, on peut déduire que les 4 arguments correspondent aux 4 canaux: `RED`, `GREEN`, `BLUE` & `ALPHA` du pixel.
On note également que les valeurs sont *normalisées*, ce qui signifie qu'elles vont de `0.0` à `1.0`.
Plus tard nous verrons pourquoi c'est intéressant de manipuler des valeurs normalisées et comment *mapper* des valeurs entre elles.

5. une autre remarque importante est la présence de *macros de pré-traitement*
les macros font partie de l'étape de précompilation, elles permettent de définir (`#define`) des variables globales et de faire des opérations conditionnelles de base (avec `#ifdef` & `#endif`).
Toutes les macros commencent par un dièse (`#`).
La précompilation se produit - comme son nom l'indique - avant la compilation du shader, elle copie et renseigne tous les `#define` et vérifie si les `#ifdef` sont définis et si les `#ifndef` ne sont pas définis.
Dans l'exemple ci-dessus, ligne 1, nous vérifions uniquement si `GL_ES` est défini, ce qui se produit principalement lorsque le code est compilé sur mobile ou dans un navigateur.

6. le type `float` est vital dans les shaders, donc le niveau de *précision* des flotants est crucial.
Une précision basse permet un rendu plus rapide mais une qualité moindre et inversement, une précision élevée permet un meilleur rendu au prix de performances réduites.
On peut spécifier la précision de chaque variable se servant de, ligne 2, `precision mediump float;`, nous assignons la précision *medium* à tous les flotants de l'application.
Nous pourrions leur donner une valeur *low* (`precision lowp float;`) ou *high* (`precision highp float;`).

7. la dernière remarque, probablement la plus importante, est que les spécifications GLSL ne garantissent pas que les variables seront *castées* automatiquement.
Qu'est-ce que cela veut dire ? Si les fabricants ont des approches différentes pour accélérer leurs cartes graphiques, ils doivent toutefois se conformer à un ensemble de spécifications communes pour être utilisable par le plus grand nombre.
Le casting automatique des variables ne fait pas partie des spécifications.
Dans notre exemple, `vec4` attend des `floats` et rien d'autre. Si vous voulez obtenir un code homogène et éviter de passer des heures à débugger un écran blanc, prenez l'habitude de mettre des points (`.`) dans vos floats.
Ce genre de code ne marchera pas toujours :

```glsl
void main() {
    gl_FragColor = vec4(1,0,0,1);	// ERROR
}
```
Alors que celui ci à de plus grandes chances de marcher :

```glsl
void main() {
    gl_FragColor = vec4( 1., .0, 0., 1. );	// BETTER
}
```
Notez que le point peut être placé avant ou après un *0*.

Maintentant que nous avons passé en revue quelques éléments importants du programme "hello world!", il est temps de cliquer sur le bloc de code et de mettre en application ce que nous venons d'apprendre.
Vous remarquerez que le programme ne se recompilera pas tant qu'il restera des erreurs. Voici quelques idées intéressantes à tester :

* essayez de remplacer les *float* par des *int* la carte graphique vous autorisera ou non à le faire.

* essayez de commenter (`//`) la ligne 6, ce qui n'assignera aucune valeur au pixel.

* essayez de créer une fonction qui retourne une couleur en dehors de `main()` et essayez de l'utiliser pour assigner la valeur de `gl_FragColor` dans `main()`.
Pour vous aider, voici le code d'une fonction qui retourne une `vec4` de couleur rouge :

```glsl
vec4 red() {
    return vec4(1.0,0.0,0.0,1.0);
}
```

* on peut construire un `vec4` de plusieurs façons, essayez de découvrir d'autres manières'. par exemple:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Bien que cet exemple ne soit pas très excitant, c'est le plus basique qui soit ; nous donnons à l'ensemble des pixels de l'image la même couleur.
Dans le chapitre suivant, nous verrons comment changer cette couleur en fonction de 2 facteurs : l'espace (l'emplacement du pixel à l'écran) et le temps (le nombre de secondes écoulées depuis le chargement de la page).
