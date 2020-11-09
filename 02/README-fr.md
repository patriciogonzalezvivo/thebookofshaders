## Hello World

Généralement le "Hello World!" est la première étape dans l'apprentissage d'un nouveau langage. Il s'agit d'un programme court qui renvoie un message enthousiaste et fait miroiter un avenir radieux.

Au pays du GPU, afficher du texte est une tâche extrêmement complexe pour une première étape, à la place nous allons choisir une couleur chatoyante pour déchaîner notre enthousiasme !

<div class="codeAndCanvas" data="hello_world.frag"></div>

Si vous lisez ceci dans un navigateur récent, le bloc précédent est interactif. Cela signifie que vous pouvez cliquer et éditer le code.Les modifications seront mises à jour immédiatement grâce à l'architecture GPU qui compile et remplace les shaders *à la volée*. Vous pouvez essayer de changer les valeurs de la ligne 8.

Si ce programme paraît simple, nous pouvons déjà faire quelques observations intéressantes :

1. Ça ressemble à du C, un shader possède une fonction `main` dont le seul but est d'assigner une couleur.

2. La couleur du pixel est assignée à une variable globale réservée `gl_FragColor`.

3. Ce langage aux allures de C, possède des *variables* (comme `gl_FragColor`), des *fonctions* et des *types*. Dans cet exemple, nous venons de voir le type `vec4` qui représente un vecteur de chiffres à virgule flottante (`float`) à 4 dimensions. Plus tard nous verrons d'autres types comme `vec3` & `vec2` avec les plus communs comme : `float`, `int` & `bool`.

4. Si l'on regarde `vec4` de plus près, on peut déduire que les 4 arguments correspondent aux 4 canaux: `RED`, `GREEN`, `BLUE` & `ALPHA` du pixel. On note également que les valeurs sont *normalisées*, ce qui signifie qu'elles vont de `0.0` à `1.0`. Plus tard, nous verrons comment la normalisation des valeurs facilite la mise en correspondance (*map*) des valeurs avec des variables.

5. Une autre caractéristique du C importante que nous pouvons voir dans cet exemple est la présence de macros de préprocesseur. Les macros font partie de l'étape de pré-compilation, elles permettent de définir (`#define`) des variables globales et de faire des opérations conditionnelles de base (avec `#ifdef` & `#endif`). Toutes les macros commencent par un hashtag (`#`). La pré-compilation se produit - comme son nom l'indique - avant la compilation du shader, elle copie et renseigne tous les `#define` et vérifie les inclusions conditionnelles `#ifdef` (si défini) et `#ifndef` (si non défini). Dans l'exemple ci-dessus, nous n'insérons la ligne 2 que si `GL_ES` est défini, ce qui se produit principalement lorsque le code est compilé sur mobile ou dans un navigateur.

6. Le type `float` est vital dans les shaders, donc le niveau de *précision* des nombres flottants est crucial. Une précision basse permet un rendu plus rapide mais une qualité moindre et inversement, une précision élevée permet un meilleur rendu au prix de performances réduites. On peut spécifier la précision de chaque variable se servant de, ligne 2, `precision mediump float;`, nous assignons la précision *medium* à tous les flottants de l'application. Nous pourrions leur donner une valeur basse (`precision lowp float;`) ou haute (`precision highp float;`).

7. La dernière remarque, probablement la plus importante, est que les spécifications GLSL ne garantissent pas que les variables seront *castées* automatiquement. Qu'est-ce que cela veut dire ? Les fabricants ont des approches différentes pour accélérer leurs cartes graphiques mais ils doivent toutefois se conformer au minimum à un ensemble de spécifications communes. Le casting automatique des variables ne fait pas partie des spécifications. Dans notre exemple, `vec4` attend des `floats` et rien d'autre. Si vous voulez obtenir un code homogène et éviter de passer des heures à débugger un écran blanc, prenez l'habitude de mettre des points (`.`) dans vos floats. Ce genre de code ne marchera pas toujours :

```glsl
void main() {
    gl_FragColor = vec4(1,0,0,1);   // ERROR
}
```
Alors que celui ci à de plus grandes chances de marcher :

```glsl
void main() {
    gl_FragColor = vec4(1., .0, 0., 1.);   // BETTER
}
```
Notez que le point peut être placé avant ou après un *0*.

Maintentant que nous avons passé en revue quelques éléments importants du programme "Hello World!", il est temps de cliquer sur le bloc de code et de mettre en application ce que nous venons d'apprendre.
Vous remarquerez que le programme ne se recompilera pas tant qu'il restera des erreurs. Voici quelques idées intéressantes à tester :

* Essayez de remplacer les *float* par des *int* la carte graphique vous autorisera ou non à le faire.

* Essayez de commenter (`//`) la ligne 8, ce qui n'assignera aucune valeur au pixel.

* Essayez de créer une fonction qui retourne une couleur en dehors de `main()` et essayez de l'utiliser pour assigner la valeur de `gl_FragColor` dans `main()`. Pour vous aider, voici le code d'une fonction qui une couleur rouge :

```glsl
vec4 red() {
    return vec4(1.0,0.0,0.0,1.0);
}
```

* On peut construire un `vec4` de plusieurs façons, essayez de découvrir d'autres manières'. Par exemple:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Bien que cet exemple ne soit pas très excitant, c'est le plus basique qui soit - nous donnons à l'ensemble des pixels de l'image la même couleur. Dans le chapitre suivant, nous verrons comment changer cette couleur en fonction de 2 facteurs : l'espace (l'emplacement du pixel à l'écran) et le temps (le nombre de secondes écoulées depuis le chargement de la page).
