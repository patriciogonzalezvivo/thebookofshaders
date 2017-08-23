## Motivi

Siccome i programmi shader sono eseguiti pixel per pixel non importa quante volte voi ripetiate una forma, infatti il numero dei calcoli rimane costante. Questo significa che i fragment shader sono particolarmente adatti per creare dei motivi ripetitivi.

[ ![Nina Warmerdam - The IMPRINT Project (2013)](warmerdam.jpg) ](../edit.php#09/dots5.frag)

In questo capitolo applicheremo ciò che abbiamo imparato fin ad ora e lo ripeteremo all'interno del canvas. Così come nel capitolo precedente, la nostra strategia sarà basata sulla moltiplicazione delle coordinate spaziali (tra 0.0 e 0.1), in modo che le forme che disegniamo tra i valori 0.0 e 1.0 saranno ripetute per creare una griglia.

*"The grid provides a framework within which human intuition and invention can operate and that it can subvert. Within the chaos of nature patterns provide a constrast and promise of order. From early patterns on pottery to geometric mosaics in Roman baths, people have long used grids to enhance their lives with decoration."* [*10 PRINT*, Mit Press, (2013)](http://10print.org/)

Prima ricordiamo la funzione [```fract()```](../glossary/?search=fract). Questa restituisce la parte frazionale di un numero, facendo in sostanza ```fract()``` il modulo di uno ([```mod(x,1.0)```](../glossary/?search=mod)). In altre parole, [```fract()```](../glossary/?search=fract) restituisce il numero dopo la virgola mobile. Il nostro sistema variabile di coordinate (```st```) va già da 0.0 a 1.0, quindi non ha senso fare una cosa simile a:

```glsl
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
    st = fract(st);
	color = vec3(st,0.0);
	gl_FragColor = vec4(color,1.0);
}
```

Ma se ingrandiamo il sistema di coordinate, diciamo di tre volte, otterremo tre sequenze di interpolazioni lineari tra 0-1: la prima tra 0-1, la seconda per le virgole mobili tra 1-2 e la terza per le virgole mobili tra 2-3.

<div class="codeAndCanvas" data="grid-making.frag"></div>

È arrivato il momento di disegnare qualcosa in ciascuno sottospazio, togliendo il commento  alla riga 27 (Siccome stiamo moltiplicando sia in x sia in y, il rapporto di forma dello spazio non cambia e le forme saranno come previste).

Provate alcuni dei seguenti esercizi per capire meglio:

* Moltiplicate lo spazio per numeri diversi. Provate con valori con la virgola mobile e anche con valori diversi per x e y.

* Create una funzione riutilizzabile con questo trucco di piastrellatura.

* Suddividete lo spazio in 3 righe e 3 colonne. Trovate un modo di sapere in quale colonna e quale riga si trova il thread e usatelo per cambiare la forma che è mostrata. Provate a creare una griglia per il tris.

### Applicare le matrici all'interno dei motivi

Siccome ciascuna suddivisione, o cella, è una versione più piccola del sistema normalizzato di coordinate che abbiamo già usato, possiamo applicarle una trasformazione matrice per traslare, ruotare o ridimensionare lo spazio interno.

<div class="codeAndCanvas" data="checks.frag"></div>

* Pensate a modi interessanti di animare questo motivo. Considerate le animazioni di colore, forma e movimento. Fate tre animazioni diverse.

* Riproducete dei motivi più complicati componendo forme diverse.

[![](diamondtiles-long.png)](../edit.php#09/diamondtiles.frag)

* Combinate diversi livelli di motivi per comporre il vostro personale motivo di [Tartan Scozzese](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns).

[ ![Vector Pattern Scottish Tartan di Kavalenkava](tartan.jpg) ](http://graphicriver.net/item/vector-pattern-scottish-tartan/6590076)

### Compensare i motivi

Immaginiamo di voler imitare un muro di mattoni. Guardando il muro, potete vedere un offset a mezzo mattone sull'asse x a file alternate. Come possiamo farlo?

![](brick.jpg)

Come primo passo dobbiamo sapere se la riga del nostro thread è un numero pari o dispari, perché possiamo usare ciò per determinare se abbiamo bisogno di compensare con un offset le x in quella fila.

____dobbiamo unire i prossimi due paragrafi____

Per determinare se il nostro thread è in una fila pari o dispari, useremo [```mod()```](../glossary/?search=mod) di ```2.0``` e poi vedremo se il risultato è inferiore a ```1.0``` o no. Osservate la formula seguente e togliete il commento alle ultime due righe.

<div class="simpleFunction" data="y = mod(x,2.0);
// y = mod(x,2.0) < 1.0 ? 0. : 1. ;
// y = step(1.0,mod(x,2.0));"></div>

Come potete vedere, usiamo un [operatore ternario](https://it.wikipedia.org/wiki/%3F:) per controllare se il [```mod()```](../glossary/?search=mod) di ```2.0``` sia al di sotto di ```1.0``` (seconda riga) o potremmo anche usare una funzione [```step()```](../glossary/?search=step) che fa la stessa operazione ma più velocemente. Perché? Nonostante sia difficile sapere come ciascuna carta grafica ottimizza e compila il codice, è sicuro assumere che questa funzione built-in sia più veloce di una non built-in. Ogni volta che potete usare una funzione built-in, fatelo!

Ora che abbiamo la formula per il numero dispari, possiamo applicare un offset alle file dispari per dare l'effetto *muro di mattoni* alla nostra piastrellatura. La riga 14 del codice seguente è dove stiamo usando la funzione per "rilevare" le file dispari e dare loro un offset di mezza unità sulle ```x```. Notate che per le file pari, il risultato della nostra funzione è ```0.0```, e moltiplicando ```0.0``` per l'offset di ```0.5```, otteniamo una compensazione di ```0.0```; sulle file dispari moltiplichiamo il risultato della nostra funzione, ```1.0```, per l'offset di ```0.5```, che sposta di ```0.5``` l'asse delle ```x``` del sistema.

Ora provate a togliere il commento alla riga 32 - questo allunga il rapporto di forma del sistema di coordinate per simulare l'aspetto di un "mattone moderno". Togliendo il commento alla riga 40 potete vedere come il sistema di coordinate appaia mappato con il rosso e il verde.

<div class="codeAndCanvas" data="bricks.frag"></div>

* Provate ad animare questo motivo spostando l'offset in base al tempo.

* Fate un'altra animazione dove le file pari si spostano a sinistra e le file dispari si spostano a destra.

* Riuscite a ripetere quest'effetto con le colonne?

* Provate a combinare un offset sugli assi delle ```x``` e delle ```y``` per ottenere qualcosa di simile a questo:

<a href="../edit.php#09/marching_dots.frag"><canvas id="custom" class="canvas" data-fragment-url="marching_dots.frag"  width="520px" height="200px"></canvas></a>

## Tessere di Truchet

Ora che abbiamo imparato come dire se la nostra cella è in una fila o colonna pari o dispari. È possibile riutilizzare un singolo motivo in relazione alla sua posizione. Considerate il caso delle tessere di [Truchet Tiles](http://en.wikipedia.org/wiki/Truchet_tiles), dove un singolo motivo può essere rappresentato in quattro modi diversi:

![](truchet-00.png)

Cambiando il motivo lungo le tessere, è possibile costruire una serie infinita di motivi complessi.

![](truchet-01.png)

Osservate più da vicino la funzione ```rotateTilePattern()```, che suddivide lo spazio in quattro celle e assegna un angolo di rotazione a ciascuna di esse.

<div class="codeAndCanvas" data="truchet.frag"></div>

* Commentate, togliete il commento e duplicate le righe da 69 a 72 per comporre nuovi motivi.

* Cambiate il triangolo bianco e nero con un altro elemento, ad esempio: semicerchi, quadrati o linee ruotati.

* Codificate altri motivi dove gli elementi siano ruotati a seconda della loro posizione.

* Create un motivo che cambi altre proprietà a seconda della posizione degli elementi.

* Immaginate qualcos'altro, che non sia necessariamente un motivo, dove potete applicare i principi visti in questa sezione (es. esagrammi di I Ching).

<a href="../edit.php#09/iching-01.frag"><canvas id="custom" class="canvas" data-fragment-url="iching-01.frag"  width="520px" height="200px"></canvas></a>

## Create il vostro insieme di tessere

Creare motivi procedurali è un esercizio mentale nel trovare il più piccole elemento riutilizzabile. Questa è una pratica antica; nel corso della storia abbiamo usato schemi e motivi per decorare tessuti, i fondi e i bordi di oggetti: dai motivi nell'antica Grecia al motivo reticolare cinese, il piacere della ripetizione e della variazione affascina la nostra immaginazione. Prendete del tempo per guardare i [motivi](https://www.pinterest.com/patriciogonzv/paterns/) [decorativi](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) e osservate come artisti e designers nel corso della loro lunga tradizione abbiano saputo navigare tra predicibilità dell'ordine e la sorpresa della variazione e del caos. Dai motivi geometrici arabi, ai bellissimi motivi delle stoffe africane, esiste un intero universo di motivi dal quale imparare.

![Franz Sales Meyer - A handbook of ornament (1920)](geometricpatters.png)

Con questo capitolo terminiamo la sezione sul disegno algoritmico. Nei prossimi capitoli impareremo a portare dell'entropia nei nostri shader e a produrre motivi generativi.
