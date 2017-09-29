# Introduction

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Les images ci-dessus ont été crées de différentes manières.
La première est un tableau de Van Gogh, réalisée en appliquant des couches de peinture successives.
Cela lui a pris des jours, voir des semaines.
La seconde est réalisée en temps réel en combinant 4 matrices de pixels ; une pour le cyan, une pour le magenta, une pour le jaune et une pour le noir.
La différence principale entre ces deux images (hormis le medium), est que la seconde n'est pas sérielle ; elle n'est pas créée par étapes successives mais d'un bloc grâce à un shader.

Ce livre parle d'une technique, les *shaders*, qui permet à l'imagerie numérique de s'affranchir de la plupart des contraintes.
On peut comparer l'avènement des *shaders* à l'avancée qu'a représenté la presse de Guntenberg à son époque.

![la presse de Gutenberg](gutenpress.jpg)

Les shaders donnent un contrôle total sur les pixels de l'écran à une vitesse très élevée.
C'est pourquoi ils sont utilisés dans une grande variété de domaines allant des filtres photo et vidéo, aux téléphones mobiles jusqu'aux jeux vidéos 3D.

![Journey par That Game Company](journey.jpg)

Au fil des chapitres, vous découvrirez combien les shaders sont efficaces et comment vous pourrez vous en servir pour vos projets personnels et/ou professionnels.

## A qui s'adresse ce livre ?

Ce livre est écrit pour les *creative coders*, les développeurs de jeux, les ingénieurs et les curieux ayant un bagage de code, des connaissances basiques en algèbre linéaire et en trigonométrie et désireux d'améliorer la qualité graphique de leurs productions.
Si vous n'avez aucune connaissance en programmation, nous vous recommandons chaudement de commencer par apprendre le language [Processing](https://processing.org/) puis de revenir à ce livre lorsque vous vous sentirez plus à l'aise.

Ce livre vous montrera comment utiliser et intégrer des shaders dans vos projets, comment améliorer leurs performances et leur rendu graphique.
Du fait que les shaders GLSL (OpenGL Shading Language) peuvent être compilés sur diverses plateformes, il vous sera possible de réutiliser ce que vous aurez appris ici dans n'importe quel environnement utilisant OpenGL, OpenGL ES ou WebGL. Autrement dit, vous pourrez réutiliser vos connaissances sur des plateformes comme [Processing](https://processing.org/), [openFrameworks](http://openframeworks.cc/), [Cinder](http://libcinder.org/), [Three.js](http://threejs.org/) ou iOS et Android.

## Que contient ce livre ?

Ce livre se concentre sur l'utilisation des Fragment Shaders.
Nous définirons ce que sont les shaders, puis nous apprendrons à dessiner des formes, des textures et des motifs procéduraux (à base d'instructions mathématiques).
Nous apprendrons les bases du langage de shading avant de les utiliser sur des cas concrets comme le traitement d'image (transformations, convolution, flou, filtres et autres effets), les simulations (le jeu de la vie de Conway, la réaction diffusion de Gray-Scott, les vaguelettes sur un plan d'eau, les cellules de Voronoi, etc.), enfin nous aborderons les techniques avancées basées sur le Ray Marching.

*Chaque chapitre comporte des exemples interactifs, n'hésitez pas à jouer avec!* Lorsque vous changez le code des exemples, le shader est recompilé et - s'il est valide - vous verrez le résultat instantanément. Les concepts paraîssent souvent abstraits et peuvent laisser perplexe, les exemples sont donc là pour vous aider à mieux comprendre ce qui se passe. Nous sommes partisans de l'apprentissage par l'exemple, n'hésitez pas à vous approprier les extraits de codes, quitte à les casser en les modifiants (plusieurs fois s'il le faut).

Ce que ce livre n'est pas :

* ce *n'est pas* livre sur l'openGL ou le webGL. OpenGL/webGL dépasse de loin le GLSL ou les shaders. Si vous voulez en savoir plus, les liens suivants vous aideront : [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (alias "the red book") ou [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* ce *n'est pas* un livre de maths. Même si le livre contient un certain nombre de notions et d'algorithmes nécessitant des connaissances en algèbre et en trigonométrie, nous ne rentrerons pas dans le détail. Pour toute question relative aux maths, vous pouvez choisir un de ces livres et le garder près de vous : [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) ou [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## Bien démarrer

Si vous avez un navigateur récent (comme chrome, firefox ou safari) et une connection internet, il vous suffira de cliquer sur "suivant" en bas de page pour commencer l'aventure.

Cela étant et selon ce que vous voulez faire de ce livre, vous pouvez :

- [créer une copie locale de ce livre pour le consulter hors-ligne](https://thebookofshaders.com/appendix/?lan=fr)

- [lancer les exemples directement sur Raspberry Pi, sans navigateur](https://thebookofshaders.com/appendix/?lan=fr)

- [créer un PDF du livre pour l'imprimer](https://thebookofshaders.com/appendix/?lan=fr)

- consulter le [dépôt GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) du livre pour contribuer ou nous aider à débugger celui-ci !
