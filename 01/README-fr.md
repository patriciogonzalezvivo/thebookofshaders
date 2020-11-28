# Bien démarrer
## Qu'est-ce qu'un fragment shader ?

Au chapitre précédent, nous avons décrit les shaders comme l'équivalent de l'avènement de la presse par Gutenberg pour l'impression. Pourquoi cette comparaison mais surtout : Qu'est-ce qu'un shader ?

![De la copie manuelle, lettre par lettre, à l'édition page par page (gauche: William Blades 1891, droite: Rolt-Wheeler 1920)](print.png)

Si vous avez déjà eu une expérience dans la réalisation de dessins avec un ordinateur, vous savez qu'il faut dessiner un cercle, puis un rectangle, une ligne, quelques triangles jusqu'à pouvoir composer l'image que l'on souhaite.
Ce processus est très similaire à l'écriture d'une lettre ou d'un livre voire à la peinture, c'est un ensemble d'instructions, exécutées en série, l'une après l'autre.

Les shaders sont également des ensembles d'instructions, mais à la différence des API de dessin classiques, *toutes les instructions sont exécutées sur chaque pixel de l'écran*.
Cela signifie que le code va devoir se comporter différemment selon la position du pixel sur l'écran.
Comme la presse d'imprimerie, votre programme est une fonction à laquelle on passe une position et qui nous renvoie une couleur et une fois compilé, ce programme peut s'exécuter extrêmement rapidement.


![Presse chinoise à caractères amovibles](typepress.jpg)

## Pourquoi les shaders sont rapides ?


Pour répondre à cela, je présente les merveilles du *traitement en parallèle*.

Imaginez le CPU de votre ordinateur comme un *tuyau* et chacune des opérations que vous lui demandez d'exécuter comme quelque chose qui passe par ce tuyau - comme dans une usine. Certaines opérations seront sans doute plus importantes que d'autres et demanderont plus de temps et d'énergie pour être traitées. On dit qu'elles nécessitent plus de ressources ou de puissance de calcul. Du fait de l'architecture des ordinateurs, les opérations sont exécutées en série; chaque opération doit être terminée avant que le CPU puisse traiter la suivante. Les ordinateurs récents ont généralement plusieurs processeurs qui jouent le rôle de *tuyaux*, ce qui permet d'exécuter les opérations une après l'autre tout en gardant une certaine fluidité. Ces tuyaux sont ce que l'on appelle des *threads*.

![CPU](00.jpeg)

Les jeux vidéos et autres applications graphiques demandent beaucoup plus de puissance de calcul que les autres programmes.
Par nature, ils demandent de grandes quantités d'opérations au pixel, chaque changement d'image demande de recalculer l'ensemble des pixels de l'écran. Dans les applications 3D, on doit également mettre à jour les modèles, les textures, les transformations etc. ce qui rajoute encore plus de charge au CPU.

Revenons à notre métaphore des tuyaux et des opérations. Chaque pixel à l'écran représente une simple petite opération. En soi, le traitement d'une opération n'est pas un problème pour le CPU, mais (et c'est ici que se trouve le problème) il faut appliquer cette petite opération sur chaque pixel à l'écran ! Par exemple, sur un vieux moniteur ayant une résolution de 800x600, 480 000 pixels ont besoin d'être traités par *frame* ce qui équivaut à 14 600 000 calculs par seconde ! C’est une opération assez importante pour surcharger un microprocesseur. Sur un écran rétina moderne ayant une résolution de 2880x1800 cadencé à 60 *frames* par seconde, cela représente un total de 311 040 000 calculs par seconde. Comment les ingénieurs graphiques résolvent-ils ce problème?

![](03.jpeg)

C'est là qu'intervient le traitement parallèle (parallel processing). Au lieu d'avoir quelques gros et puissants microprocesseurs, ou *tuyaux*, on préfère avoir de nombreux petits microprocesseurs qui tournent en parallèle et simultanément. C'est l'essence même du GPU (Graphics Processing Unit).

![GPU](04.jpeg)

Imaginez ces petits microprocesseurs comme une trame de tuyaux, et les données de chaque pixel comme des balles de ping-pong. 14 400 000 balles de ping-pong par seconde pourraient obstruer presque n'importe quel tuyau. Mais une trame de 800x600 petits tuyaux recevant 30 vagues de 480 000 balles de ping-pong par seconde peuvent traiter la charge facilement. Et ça marche également pour des résolutions plus élevées; plus le matériel est capable de traiter d'informations en parallèle, plus il pourra traiter des flux importants.

Un autre *pouvoir magique* du GPU c'est l'accélération matérielle de certaines fonctions mathématiques. Certaines fonctions souvent complexes seront traitées directement par le matériel au lieu de passer par la couche logicielle. Ce qui signifie que certaines opérations mathématiques un peu complexes comme les transformations de matrices et les opérations trigonométriques seront traitées extrêmement rapidement - à la vitesse de l'électricité.

## Qu'est ce que le GLSL ?

GLSL est l'acronyme de "OpenGL Shading Language" (où GL signifie Graphics Library), c'est une norme servant à écrire les programmes de shaders que nous aborderons dans les chapitres suivants. Il existe d'autres types de shaders, selon les plateformes et le matériel utilisé, nous nous concentrerons sur OpenGL, dont les spécifications sont faites par [Khronos Group](https://www.khronos.org/opengl/). Comprendre l'histoire d'OpenGL peut être utile pour comprendre certaines conventions un peu bizarres, si cela vous intéresse, vous pouvez vous reporter à [openglbook.com/chapter-0-preface-what-is-opengl.html](http://openglbook.com/chapter-0-preface-what-is-opengl.html).

## Pourquoi les gens tremblent en entendant le mot Shader ?

Comme dit *Uncle Ben* dans Spiderman: "with great power comes great responsibility", le traitement parallèle ne déroge pas à cette règle et aussi puissante que soit la programmation GPU, elle apporte un cortège de contraintes et de restrictions.

Pour fonctionner en parallèle, il faut que chaque thread soit indépendant des autres. On dit que le thread est *aveugle* à ce que font les autres threads. Cette restriction implique que toutes les données doivent aller dans le même sens. Il est donc impossible de vérifier le résultat d’un autre thread, de modifier les données d’entrée ou de transmettre le résultat d’un thread à un autre. Autoriser la communication entre threads au moment de l'exécution pourrait compromettre l'intégrité des données en cours de traitement.

Il faut également savoir que le GPU s'assure que tous ses microprocesseurs (les tuyaux) sont actifs en permanence; dès qu'un thread a fini son traitement, le GPU lui ré-assigne une opération à traiter. Le thread ne garde aucune trace de ce qu'il faisait la fois précédente. s'il était en train de dessiner un le pixel d'un bouton sur une interface graphique, sa tâche suivante pourra être de rendre un bout du ciel dans un jeu, puis de rendre un bout de texte sur un mail. Donc un thread est non seulement **aveugle** mais aussi **amnésique**. En plus du niveau d'abstraction requis pour coder une fonction générique qui saura rendre une image entière uniquement à partir de la variation d'une position, les deux contraintes des threads, cécité et amnésie, rendent la programmation de shaders assez impopulaire auprès des programmeurs débutants.

Mais n'ayez crainte ! Au cours des chapitres suivants, nous aborderons les problèmes étape par étape et passerons d'un simple shader à des shaders plus avancés. Si vous lisez ceci dans un navigateur récent, vous apprécierez de pouvoir manipuler les exemples interactifs et beaucoup de ce qui vient d'être dit deviendra plus clair. Sans plus attendre, jetons nous dans le vif du sujet.

Appuyez sur *Next >>* pour plonger dans le code !
