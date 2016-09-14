# Progettazione generativa

Non è una sorpresa che dopo aver passato tanto tempo a organizzare e a definire precisamente le cose, l'autore voglia introdurre un po' di caos.

## Random

[![Ryoji Ikeda - test pattern (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

La casualità è la massima espressione d'entropia. Come possiamo generare casualità all'interno di un ambiente apparentemente prevedibile e rigido?

Iniziamo analizzando la seguente funzione:

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Qui sopra abbiamo estratto il contenuto frazionario di una sinusoide. I valori di [```sin()```](../glossary/?search=sin) che oscillano tra ```-1.0``` e ```1.0``` sono stati tagliati dopo la virgola mobile, restituendo tutti i valori positivi tra ```0.0``` e ```1.0```. Possiamo usare questo effetto per ottenere alcuni valori pseudo-casuali per "rompere" questa onda sinusoidale in pezzi più piccoli. Come? Moltiplicando la risultante di  [```sin(x)```](../glossary/?search=sin) con numeri più grandi. Provate ad aggiungere alcuni zeri alla funzione qui sopra.

Arrivando a ```100000.0``` ( l'equazione si presenta così: ```y = fract(sin(x)*100000.0)``` ) non si è più in grado di distinguere l'onda sinusoidale. La granularità della parte frazionaria ha corrotto il flusso della sinusoide al punto di trasformarla in caos pseudo-casuale.

## Controllare il caos

L'utilizzo della casualità può essere difficile; è sia troppo caotica e a volte non abbastanza casuale. Date un'occhiata al grafico seguente. Per farlo, stiamo utilizzando una funzione ```rand()``` che viene implementata esattamente come si è descritto in precedenza.

Dando uno sguardo più da vicino, si può vedere i picchi dell'onda di [```sin()```](../glossary/?search=sin) sono fra ```-1.5707``` e ```1.5707```. Scommetto che ora sapete il perché: è dove la sinusoide raggiunge i suoi valori massimi e minimi.

Se guardate la distribuzione del funzione random, si nota che vi è una certa concentrazione intorno a 0.5 rispetto che a 0.0 e 1.0.

<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

Qualche tempo fa [Pixelero](https://pixelero.wordpress.com) ha pubblicato un [interessante articolo sulla distribuzione random](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/). Ho aggiunto per voi alcune delle funzioni che ha usato nel grafico precedente per vedere come la distribuzione può essere modificata. Decommentate le funzioni e guardate cosa succede.

Se andate a leggere [l'articolo di Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/), è importante tenere a mente che la nostra funzione ```rand()```  è deterministica casuale, in altre parole pseudo-casuale. Il che significa, per esempio, che ```rand(1.)``` restituisce sempre lo stesso valore. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) fa riferimento alla funzione ActionScript ```Math.random()``` che è non-deterministica; cioè ogni chiamata restituirà un valore diverso.

## 2D Random

Ora che abbiamo una migliore comprensione della casualità, è il momento d'applicarla alle dimensioni ```x``` e ```y```. Per fare ciò abbiamo bisogno di trasformare un vettore di due dimensioni in un float unidimensionale. Ci sono diversi modi per farlo, ma la funzione [```dot()```](../glossary/?search=dot) è particolarmente utile in questo caso. Questa funzione restituisce un singolo valore decimale compreso tra ```0.0``` e ```1.0``` a seconda dell'allineamento dei due vettori.

<div class="codeAndCanvas" data="2d-random.frag"></div>

Date un'occhiata al codice a partire della linea 13 fino alla 15 e noterete come stiamo confrontando il ```vec2 st``` con un altro vettore a due dimensioni (```vec2(12.9898,78.233)```).

* Provate a cambiare i valori delle linee 14 e 15. Vedrete come i pattern random cambiano e provate a trarne una conclusione.

* Collegate questa funzione random alla posizione del mouse (```u_mouse```) e al tempo (```u_time```) per capire meglio il suo funzionamento.

## Usare il caos

Il random in due dimensioni assomiglia molto al rumore TV, giusto? Si tratta di un materiale grezzo difficile da usare se si vuole comporre delle immagini. Impariamo come usarlo.

Il primo passo è quello di applicargli una griglia; usando la funzione [```floor()```](../glossary/?search=floor) saremo in grado di generare una tabella di celle composta da integer. Date un'occhiata al seguente codice, in particolare alle linee 22 e 23.

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

Dopo il ridimensionamento dello spazio per 10 (alla linea 21), separiamo dalla parte frazionaria i numeri interi delle coordinate. Abbiamo una certa familiarità con questa ultima operazione, perché l'abbiamo utilizzata per suddividere lo spazio in celle più piccole che vanno da ```0.0``` a ```1.0```. Il valore intero della coordinata è un valore comune per una regione di pixel, che sarà simile a una singola cella. Quindi possiamo usare che il valore intero in comune per ottenere un valore random per quella zona. Poiché la nostra funzione random è deterministica, il valore restituito sarà costante per tutti i pixel in quella cella.

Rimuovete il commento alla linea 29 per mantenere la parte float della coordinata, in modo da poterla usare come un sistema di coordinate per disegnare delle cose all'interno di ogni cellula.

Se combinate questi due valori - la parte intera e la parte frazionaria della coordinata - sarete in grado di mixare variabilità e ordine.

Date un'occhiata all'implementazione del famoso generatore di labirinti ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10``` .

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

Qui sto usando i valori random delle celle per disegnare una linea in una direzione o nell'altra utilizzando la funzione ```truchetPattern()``` del capitolo precedente (linee da 41 a 47).

È possibile ottenere un altro pattern interessante decommentando il blocco di righe tra la linea 50 a 53, o animare il pattern decommentando le linee 35 e 36.

## Padroneggiare il Random

[Ryoji Ikeda](http://www.ryojiikeda.com/), compositore elettronico e artista visivo giapponese, è diventato un maestro nell'uso del random; è difficile non essere colpiti ed ipnotizzati dal suo lavoro. Nelle sue opere d'arte audio e visive è riuscito ad utilizzare la casualità in modo tale da non ottenere un fastidioso caos, ma uno specchio della complessità della nostra cultura tecnologica.

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Date un'occhiata al lavoro di [Ikeda](http://www.ryojiikeda.com/) e provate i seguenti esercizi:

* Create delle righe di celle in movimento (in direzioni opposte) con valori random. Mostrate solo le celle con valori più luminosi. Provate a rendere costante nel tempo la velocità delle righe.

<a href="../edit.php#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* Fate la stessa cosa con varie righe ma ogni volta con velocità e direzione diverse. Collegate la posizione del mouse alla soglia per decidere quale celle visualizzare.

<a href="../edit.php#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Creare altri effetti interessanti.

<a href="../edit.php#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

L'utilizzo del random può essere problematico dal punto di vista estetico, soprattutto se si vuole creare simulazioni che sembrano naturali. Il random è semplicemente troppo caotico e poche cose nella vita di tutti i giorni sembrano ```random()```. Se si considera un pattern generato dalla pioggia o un grafico azionario, che sono entrambi abbastanza casuali, questi non assomigliano per niente al pattern random che abbiamo fatto all'inizio di questo capitolo. La ragione? Beh, i valori random non hanno alcuna correlazione tra di loro e la maggior parte dei motivi naturali conserva una certa memoria dello stato precedente.

Nel prossimo capitolo impareremo di più a proposito del rumore, una maniera semplice e dall'*aspetto naturale* di creare il caos computazionale. 
