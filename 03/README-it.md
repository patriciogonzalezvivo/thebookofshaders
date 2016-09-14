## Uniforms

Finora abbiamo visto come la GPU gestisce un gran numero di thread paralleli, ciascuno responsabile nell'assegnazione d'un colore ad una frazione dell'immagine totale. Sebbene ogni thread parallelo è cieco nei confronti degli altri, dobbiamo essere in grado d'inviare alcuni input dalla CPU a tutti i thread. A causa dell'architettura della scheda grafica tali input saranno uguali (*uniform*) per tutti i thread e necessariamente impostati come di *sola lettura*. In altre parole, ogni thread riceve gli stessi dati che possono essere letti ma non possono essere cambiati.

Questi input sono chiamati ```uniform``` e sono disponibili nella maggior parte di tipi supportati: ```float```, ```vec2```, ```vec3```, ```vec4```, ```mat2```, ```mat3```, ```mat4```, ```sampler2D``` e ```samplerCube```. Gli Uniforms sono definiti con i rispettivi tipi, all'inizio del codice, dopo aver definito la precisione della virgola mobile.

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // dimensione del Canvas (larghezza, altezza)
uniform vec2 u_mouse;      // posizione del mouse (x,y) in pixels
uniform float u_time;	  // tempo in secondi da quando lo shader è iniziato 
```

È possibile immaginare gli uniforms come piccoli ponti tra la CPU e la GPU. I nomi variano da applicazione ad applicazione, ma in questa serie di esempi userò: ```u_time``` (tempo in secondi da quando lo shader è iniziato), ```u_resolution``` (la dimensione della finestra in cui lo shader è in corso d'elaborazione) e ```u_mouse``` (la posizione in pixel del mouse all'interno della finestra). Seguirò la convenzione di mettere ```u_``` prima del nome degli uniforms per essere espliciti sulla natura di questa variabile, ma incontrerete varie nomenclature per gli uniforms. Per esempio [ShaderToy.com](https://www.shadertoy.com/) utilizza gli stessi uniforms, ma con i seguenti nomi:

```glsl
uniform vec3 iResolution;   // dimensione del Canvas (in pixels)
uniform vec4 iMouse;        // posizione del mouse in pixels. xy: corrente, zw: click
uniform float iGlobalTime;  // tempo (in secondi) da quando lo shader è iniziato
```

Ma ora basta chiacchiere, vediamo gli uniforms in azione. Nel seguente codice utilizziamo ```u_time``` - il numero di secondi da quando lo shader è iniziato - insieme ad una funzione seno per animare con una transizione la quantità di rosso sullo schermo.

<div class="codeAndCanvas" data="time.frag"></div>

Come potete vedere GLSL ha molte sorprese. La GPU ha funzioni trigonometriche ed esponenziali, che sono accelerate dall'hardware. Alcune di queste funzioni sono: [```sin()```](../glossary/?search=sin), [```cos()```](../glossary/?search=cos), [```tan()```](../glossary/?search=tan), [```asin()```](../glossary/?search=asin), [```acos()```](../glossary/?search=acos), [```atan()```](../glossary/?search=atan), [```pow()```](../glossary/?search=pow), [```exp()```](../glossary/?search=exp), [```log()```](../glossary/?search=log), [```sqrt()```](../glossary/?search=sqrt), [```abs()```](../glossary/?search=abs), [```sign()```](../glossary/?search=sign), [```floor()```](../glossary/?search=floor), [```ceil()```](../glossary/?search=ceil), [```fract()```](../glossary/?search=fract), [```mod()```](../glossary/?search=mod), [```min()```](../glossary/?search=min), [```max()```](../glossary/?search=max) and [```clamp()```](../glossary/?search=clamp).

Ora è il momento di giocare con il codice qui sopra.

* Rallentate la frequenza fino a quando il cambiamento di colore diventa quasi impercettibile.

* Aumentate la frequenza fino a vedere un solo colore, senza sfarfallio.

* Date tre frequenze differenti ai tre canali (RGB) per ottenere motivi e comportamenti interessanti.

## gl_FragCoord

Allo stesso modo GLSL ci dà un output di default, ```vec4 gl_FragColor```, ma anche un input di default, ```vec4 gl_FragCoord```, che contiene le coordinate sullo schermo del *pixel* o del *screen fragment* del thread attivo. Con ```vec4 gl_FragCoord```, sappiamo dove un thread sta lavorando all'interno dello schermo. In questo caso la variabile non è un ```uniform``` perché sarà diversa da thread a thread. Le variabili che cambiano in ogni thread, come ```gl_FragCoord```, sono chiamate *varying*.

<div class="codeAndCanvas" data="space.frag"></div>

Nel codice qui sopra *normalizziamo* le coordinate del fragment dividendole per la risoluzione totale dello schermo. In questo modo i valori andranno tra ```0.0``` e ```1.0```, una tecnica che rende facile mappare i valori X e Y per i canali ROSSO e VERDE.

Nel mondo degli shaders non abbiamo troppe risorse per il debug a parte l'assegnazione di colori intensi alle variabili e cercare di trovargli un senso. Scoprirete che a volte programmando in GLSL è come mettere una nave all'interno di una bottiglia: un processo difficile, bello e gratificante.

![](08.png)

Ora è il momento di mettere in pratica gli insegnamenti che abbiamo imparato.

* Sapreste dire dove è la coordinata ```(0.0,0.0)``` sul nostro schermo?

* E dove sono ```(1.0,0.0)```, ```(0.0,1.0)```, ```(0.5,0.5)``` e ```(1.0,1.0)```?

* Riuscite ad immaginare come usare ```u_mouse``` sapendo che i valori sono espressi in pixel e NON in valori normalizzati? Sapresti usare ```u_mouse``` per muovere i colori?

* Sapreste trovare un modo interessante per cambiare questo pattern grafico utilizzando ```u_time``` e le coordinate ```u_mouse```?

Dopo aver fatto questi esercizi, ci si potrebbe chiedere dove si potrebbero provare i nuovi super poteri che gli shader ci hanno dato. Nel prossimo capitolo vedremo come creare i vostri shader in Three.js, Processing e openFrameworks.