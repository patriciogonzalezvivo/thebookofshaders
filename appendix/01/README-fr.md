## Comment exécuter les exemples sur un Raspberry Pi ?

Il y a quelques années, supposer que tout le monde dispose d'un ordinateur doté d'une unité de traitement graphique était ambitieux. Maintenant, la plupart des ordinateurs possèdent un GPU, mais c'est toujours une exigence compliqué dans un atelier ou une classe, par exemple.

Grâce à la [Fondation Raspberry Pi](http://www.raspberrypi.org/), une nouvelle génération d'ordinateurs peu coûteux (environ 30€ l'unité) a trouvé son chemin dans les salles de classe. Plus important encore pour le propos de ce livre, le Raspberry Pi est livré avec un bon GPU Broadcom qui peut être utilisé directement depuis la console. J'ai créé un [outil flexible de développement en temps réel pour GLSL appelé **glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer)  qui exécute tous les exemples de ce livre. Ce programme a également la capacité de s'actualiser automatiquement lorsque l'utilisateur enregistre une modification de son code. Qu'est-ce que cela veut dire ? Vous pouvez modifier le shader et chaque fois que vous l'enregistrez, le shader sera re-compilé et rendu pour vous.

En effectuant une copie locale du dépôt git de ce livre (voir la section ci-dessous) et avec [`glslViewer` installé](https://github.com/patriciogonzalezvivo/glslViewer), les utilisateurs peuvent exécuter les exemples avec `glslviewer`. De plus, en utilisant l'option `-l`, ils peuvent lancer les exemples dans un coin de l'écran pendant qu'ils les modifient avec n'importe quel éditeur de texte (comme `nano`, `pico`, `vi`, `vim` ou `emacs`). Cela fonctionne également si l'utilisateur est connecté via ssh/sftp.

Pour installer et configurer tout cela sur Raspberry Pi, après l'installation de [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), une distribution Linux basée sur Debian conçue pour Raspberry Pi, connectez-vous et tapez les commandes suivantes :

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
