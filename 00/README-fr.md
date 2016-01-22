# Introduction

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Les images au-dessus ont été faites de différentes manières. La première a été peinte à la main par Van Gogh, couche après couche. Cela lui a pris des heures. La deuxième a été produite en quelques secondes par la combinaison de quatre matrices de pixels: une pour le cyan, une pour le magenta, une pour le jaune et une pour le noir. La principale différence est que la seconde image n'a pas été produite de manière sérielle (c'est-à-dire non étape par étape, mais tout en même temps).

Ce livre traite de la technique informatique révolutionnaire, les *fragment shaders*, qui élargissent les possibilités de la génération d'images numériques. Vous pouvez le voir comme l'équivalent de la naissance de l'imprimerie par Gutenberg, mais pour la fabrication d'image.

![Gutenberg's press](gutenpress.jpg)

Les fragment shaders vous donnent un contrôle total sur les pixels générés à l'écran et ceci à une très grande vitesse. C'est pourquoi ils sont utilisés dans toutes sortes de cas, depuis les filtres vidéos sur téléphone aux époustouflants jeux vidéos en 3D.

![Journey by That Game Company](journey.jpg)

Dans les chapitres suivants, vous allez découvrir à quel point cette technique est incroyablement rapide et puissante et comment l'appliquer à votre travail personnel et professionnel.

## A qui s'adresse ce livre?

Ce livre est écrit pour les codeurs créatifs, les développeurs de jeux et ingénieurs qui ont une expérience de la programmation, des connaissances de base en algèbre linéaire et en trigonométrie, et qui veulent pousser leur travail afin d'atteindre un niveau de qualité graphique encore plus palpitant. (Si vous voulez apprendre à programmer, je vous recommande vivement de commencer avec [Processing](https://processing.org/) et de revenir plus tard lorsque vous vous sentirez à l'aise avec la programmation.)

Ce livre va vous apprendre comment utiliser et intégrer les shaders dans vos projets, en améliorant leur performance et leur qualité graphique. Parce que les shaders GLSL (OpenGL Shading Language) compilent et s'exécutent sur un grand nombre de plateformes, vous serez à même de déployer vos connaissances sur des sketches [Processing](https://processing.org/), des applications [openFrameworks](http://openframeworks.cc/), des installations interactives [Cinder](http://libcinder.org/), des sites avec [Three.js](http://threejs.org/) ou des jeux sous iOS/Android.

## De quoi traite ce livre?

Ce livre se concentrera sur l'utilisation des pixel shaders GLSL. Dans un premier temps, nous définirons ce que sont les shaders; puis nous apprendrons comment, grâce à eux, faire des formes procédurales, des motifs, des textures et des animations. Vous apprendrez les bases du langage des shaders et l'appliquerez à des scénarios plus utiles comme: le traitement d'images (les opérations sur les images, les matrices de convolution, les flous, les filtres de couleur, les tables de correspondances et autres effets) et les simulations (le jeu de la vie imaginé par John H. Conway, le système à réaction-diffusion de Gray-Scott, les ondulations à la surface de l'eau, les effets aquarelle, les diagrammes de Voronoï, etc). A la fin de ce livre, nous verrons un ensemble de techniques avancées basées sur le Ray Marching.

*Dans chaque chapitre, des exemples interactifs vous permettront de vous amuser avec les concepts traités. *Lorsque vous modifierez le code, le résultat de ces changements sera visible instantanément. Certains concepts peuvent être abstaits et déroutants, dans ce cas les exemples interactifs sont les bienvenus pour vous aider à comprendre les informations. Le plus vite vous mettrez ces concepts en mouvement, le plus simple sera votre apprentissage.

Ce dont ne traite pas ce livre:

* Ce *n'est pas* un livre sur openGL ou webGL. OpenGL/webGL est un sujet plus vaste que GLSL ou les fragment shaders. Pour en apprendre plus sur OpenGL/webGL, je vous recommande de jeter un oeil sur: [OpenGL Introduction](https://open.gl/introduction), [la 8ème édition du OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (aka le livre rouge) ou [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* Ce *n'est pas* un livre de maths. Bien que nous couvrirons certains algorithmes et certaines techniques reposant sur la compréhension de l'algèbre et la trigonométrie, nous ne les expliquerons pas en détail. Pour ce qui concerne les mathématiques, je recommande de garder près de vous un des ouvrages suivant: [La 3ème édition de Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) ou [La 2ème édition de Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## De quoi avez-vous besoin pour commencer?

Pas grand-chose! Si vous avez un navigateur moderne qui supporte WebGL (comme Chrome, Firefox ou Safari) et une connexion internet, cliquez sur le bouton du chapitre suivant en bas de page pour commencer.

Sinon, au vu de ce que vous avez ou de ce que vous avez besoin pour ce livre, vous pouvez:

- [Faire une version hors-ligne de ce livre](http://thebookofshaders.com/appendix/)

- [Exécuter les exemples sur un RaspberryPi sans navigateur](http://thebookofshaders.com/appendix/)

- [Faire un PDF de ce livre pour impression](http://thebookofshaders.com/appendix/)

- Utiliser le [répertoire github](https://github.com/patriciogonzalezvivo/thebookofshaders) afin d'aider à résoudre des problèmes et de partager du code.

