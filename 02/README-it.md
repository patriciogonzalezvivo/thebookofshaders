## Ciao Mondo

Di solito l'esempio "Ciao Mondo!" è il primo passo per imparare un nuovo linguaggio. Si tratta di un semplice programma di una riga che visualizza un messaggio entusiastico di benvenuto.

Nel mondo GPU rendere un testo è un esercizio troppo complicato per un primo passo, perciò sceglieremo un colore brillante di benvenuto per mostrare il nostro entusiasmo!

<div class="codeAndCanvas" data="hello_world.frag"></div>

Se stai leggendo questo libro in un navigatore, noterai che il precedente blocco di codice è interattivo. Ciò significa che è possibile fare click e modificare qualsiasi parte del codice per capire come funziona. Le modifiche verranno aggiornate immediatamente grazie all'architettura GPU che compila e sostituisce gli shaders *al volo*. Prova per esempio a cambiare i valori della linea 6.

Anche se queste semplici righe di codice non sembrano essere molto importanti, possiamo trarre molte informazioni:

1. Gli Shaders hanno una unica funzione ```main``` che alla fine restituisce un colore. Questa caratteristica è molto simile al linguaggio C.

2. Il colore finale dei pixel viene assegnato a una variabile globale riservata ```gl_FragColor```.

3. Questo linguaggio è simile al C e ha *variabili* built-in (come ```gl_FragColor```), *funzioni* e *tipi*. In questo esempio abbiamo introdotto ```vec4``` che è un vettore a virgola mobile(float) di quattro dimensioni. Più avanti incontreremo altri tipi come ```vec3``` e ```vec2``` insieme ai più popolari: ```float```, ```int``` e ```bool```.

4. Se analizziamo il tipo  ```vec4``` possiamo dedurre che i quattro argomenti corrispondono ai canali ROSSO, VERDE, BLU e ALFA. Inoltre possiamo notare che questi valori sono *normalizzati*, il che significa che vanno da ```0.0``` a ```1.0```. In seguito, impareremo che normalizzare i valori rendere più facile *mapparli* fra le variabili.

5. Un'altra importante *caratteristica del C* che si può vedere in questo esempio è la presenza di macro del preprocessore. Le macro sono parte di una fase di pre-compilazione. Con loro è possibile ```#define``` variabili globali e fare alcune funzioni condizionali di base (con ```#ifdef``` e ```#endif```). Tutti i comandi macro iniziano con un hashtag (```#```). La pre-compilazione avviene appena prima di compilare lo shader e copia tutte le chiamate a ```#defines``` e verifica ```#ifdef``` (è definito) e ```#ifndef``` (non è definito) nel caso di chiamate condizionali . Nel nostro esempio precedente "Ciao mondo!", abbiamo inserito solo la linea 2 per verificare se ```GL_ES``` è definito, chiamata che avviene soprattutto quando il codice viene compilato su dispositivi mobili e browser.

6. I tipi float sono vitali negli shader, dove il livello di *precisione* è fondamentale. Precisione inferiore significa resa più veloce, ma a scapito della qualità. Si può essere pignoli e specificare la precisione di ogni variabile che utilizza la virgola mobile. Nella prima riga (```precision mediump float;```) stiamo definendo tutti i float a media precisione. Ma possiamo impostare la loro precisione a un livello basso (```precision lowp float;```) o alto (```precision highp float;```).

7. L'ultimo, e forse più importante, dettaglio è che le specifiche GLSL non garantiscono che le variabili siano convertite automaticamente. Cosa significa? I produttori delle carte grafiche hanno differenti approcci per accelerare i processi delle carte grafiche, ma sono costretti a garantire delle specifiche minime. La conversione automatica non è una di queste. Nel nostro esempio "Ciao mondo", ```vec4``` ha precisione in virgola mobile e per questo ci si aspetta dei ```floats```. Se si vuole realizzare un codice omogeneo e non passare ore a fare il debug di schermi bianchi, abituatevi a mettere il punto ( ```.``` ) all'interno dei vostri float. Questo tipo di codice non funziona sempre:

```glsl
void main() {
	gl_FragColor = vec4(1,0,0,1);	// ERRORE
}
```

Ora che abbiamo descritto gli elementi più rilevanti del nostro programma "ciao mondo!", è il momento di cliccare sul blocco di codice e iniziare a mettere alla prova tutto quello che abbiamo imparato. Noterete che in caso di errore, il programma non sarà in grado di compilare e mostrerà uno schermo bianco. Ci sono alcune cose interessanti da provare, per esempio:

* Provate a sostituire i float con degli integer, la vostra scheda grafica potrebbe o non accettare questo comportamento.

* Commentate la linea 6 e non assegnate alcun valore ai pixel della funzione.

* Provate a fare una funzione separata che restituisce un colore specifico e utilizzarla all'interno del ```main()```. Piccolo suggerimento, ecco il codice per una funzione che restituisce un colore rosso:

```glsl
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```

* Ci sono diversi modi per costruire dei tipi ```vec4```, prova a scoprire gli altri modi. Per esempio:


```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Anche se questo esempio non è molto eccitante, è il più elementare possibile - stiamo cambiando tutti i pixel all'interno del canvas con il medesimo colore. Nel prossimo capitolo vedremo come cambiare i colori dei pixel utilizzando due tipi di input: spazio (cioè la posizione dei pixel sullo schermo) e il tempo (cioè il numero di secondi da quando la pagina è stata caricata).
