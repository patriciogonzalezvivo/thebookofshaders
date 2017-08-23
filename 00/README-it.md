# Introduzione

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Le immagini qui sopra sono state realizzate in modi diversi. La prima è stata dipinta a mano da Van Gogh, aggiungendo strati di pittura uno dopo l'altro. Gli ci vollero ore. La seconda è stata prodotta in qualche secondo dalla combinazione di quattro matrici di pixel: una per il ciano, una per il magenta, una per il giallo e una per il nero. La differenza principale è che la seconda immagine è prodotta in modo non seriale (cioè non passo-passo, ma tutta allo stesso tempo).

Questo libro tratta della tecnica di calcolo rivoluzionario, i *fragment shaders*, che sta portando a un livello successivo le immagini generate digitalmente. Lo si può pensare come l'equivalente della stampa di Gutenberg per la grafica.


![Stampa di Gutenberg](gutenpress.jpg)

I fragment shaders danno un controllo totale sui pixel, che sono resi sullo schermo a una super velocità. Questo è il motivo per cui sono utilizzati in molteplici applicazioni, dai filtri video sui cellulari ad incredibili videogiochi 3D.

![Journey di That Game Company](journey.jpg)

Nei capitoli seguenti scopriremo quanto veloce e potente sia questa tecnica e come poterla applicare al vostro lavoro professionale e personale.

## Per chi è questo libro?

Questo libro è scritto per programmatori creativi, sviluppatori di giochi e ingegneri che hanno esperienza di programmazione, una conoscenza di base di algebra lineare e di trigonometria, e che vogliono portare il loro lavoro ad un livello  di qualità grafica ancora più emozionante. (Se si vuole imparare a programmare, vi raccomando di iniziare con [Processing](https://processing.org/) e tornare più tardi, quando avrete maggiore dimestichezza.)

Questo libro vi insegnerà come utilizzare e integrare shader nei vostri progetti, migliorando le loro prestazioni e la qualità grafica. Poiché gli GLSL (OpenGL Shading Language) shaders compilano e si eseguono su una grande varietà di piattaforme, si potrà applicare ciò che si impara qui a qualsiasi framework che utilizza OpenGL, OpenGL ES o WebGL. In altre parole, si sarà in grado di applicare e utilizzare la propria conoscenza negli sketches di [Processing](https://processing.org/), nelle applicazioni di [openFrameworks](http://openframeworks.cc/), nelle installazioni interattive di [Cinder](http://libcinder.org/), nei siti web con [Three.js](http://threejs.org/) o nei giochi iOS / Android.


## Di che cosa tratta questo libro?

Questo libro si concentrerà su l'uso dei pixel shaders GLSL. Per prima cosa definiremo cosa sono gli shaders; poi impareremo come fare, grazie a loro, forme procedurali, motivi, texture e animazioni. Imparerete le basi del linguaggio shading ed ad applicarlo a scenari più utili, quali: l'elaborazione di immagini (operazioni di immagine, convoluzioni di matrici, sfocature, filtri colorati, tabelle di associazione e altri effetti) e simulazioni (il gioco della vita di Conway, la reazione-diffusione di Gray-Scott, le increspature d'acqua, gli effetti acquerello, le celle di Voronoi, etc.). Verso la fine del libro vedremo un insieme di tecniche avanzate basate sul Ray Marching.

*In ogni capitolo, ci sono degli esempi interattivi per imparare divertendosi. * Quando si modifica il codice, vedrete immediatamente sullo schermo i cambiamenti. I concetti possono essere astratti e confusi, perciò gli esempi interattivi sono essenziali per aiutarvi a capire gli argomenti trattati. Più velocemente i concetti si mettono in pratica e più facilmente si imparerà.

Di cosa non tratta questo libro:

* Questo * non è * un libro su OpenGL o WebGL. OpenGL / WebGL è un soggetto più vasto di GLSL o dei fragment shaders. Per ulteriori informazioni su OpenGL / WebGL vi consiglio di dare un'occhiata a: [OpenGL Introduzione](https://open.gl/introduction), [l'ottava edizione della guida sulla programmazione OpenGL](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (noto anche come il libro rosso) o [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl).

* Questo * non è* un libro di matematica. Anche se ci occuperemo di una serie di algoritmi e di tecniche che si basano su una comprensione dell'algebra e della trigonometria, non spiegheremo tutto in dettaglio. Per domande riguardanti la matematica vi consiglio di tenere vicino uno dei seguenti libri: [La terza edizione di Matematica per la programmazione di giochi 3D e la computer Grafica](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) o [La seconda edizione di Matematica Essenziale per Giochi e Applicazioni Interattive](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## Cosa ti serve per iniziare?

Non tanto! Se si dispone di un browser moderno che può far girare WebGL (come Chrome, Firefox o Safari) e una connessione Internet, fai clic sul bottone "Next" alla fine di questa pagina per iniziare.

In alternativa, in base a ciò di cui avete bisogno, è possibile:

- [Creare versione offline di questo libro](https://thebookofshaders.com/appendix/)

- [Eseguire gli esempi su un Raspberry Pi senza navigatore](https://thebookofshaders.com/appendix/)

- [Fare un PDF del libro da stampare](https://thebookofshaders.com/appendix/)

- Utilizzare la [repository on-line](https://github.com/patriciogonzalezvivo/thebookofshaders) per aiutare a risolvere i problemi e per condividere il codice.
