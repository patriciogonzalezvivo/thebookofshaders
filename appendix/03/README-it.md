## Come posso collaborare a questo libro?

Grazie per voler collaborare! Ci sono vari modi per poterlo fare:

- Tradurre i contenuti
- Migliorare la [sezione ```glossario/```](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary)
- Modificare i contenuti
- Condividere i vostri esempi di shaders attraverso[l'editor on-line](http://editor.thebookofshaders.com/)

### Tradurre i contenuti

Questo libro è scritto nel [linguaggio Markdown](https://daringfireball.net/projects/markdown/syntax) quindi è molto facile da modificare e lavorare su di esso.

1. Iniziate andando alla [repository di GitHub ```github.com/patriciogonzalezvivo/thebookofshaders```](https://github.com/patriciogonzalezvivo/thebookofshaders). Date un'occhiata ai file e alle cartelle al suo interno. Si noti che il contenuto è presente nei file ```README.md``` e negli altri con lettere maiuscole come:```TITLE.md```, ```SUMMARY.md```, ecc. Si noti inoltre che le traduzioni sono contenute in file che terminano con due lettere che fanno riferimento alla lingua che sono tradotte, es .: ```README-jp.md```, ```README-es.md```, ecc.

2. Biforcare ("Fork") la repository e clonatela ("Clone") sul vostro computer.

3. Duplicate il contenuto dei file da tradurre. Ricordatevi di aggiungere ai file su cui si sta lavorando le due lettere che fanno riferimento alla lingua che si sta traducendo.

4. Traducete linea per linea i contenuti (vedi **Note di traduzione**).

5. Testate le pagine tradotte (vedi **Test**).

6. Inviate ("Push") i vostri commit alla biforcazione ("Fork") della vostra repository su GitHub, per poi fare un [Pull Request](https://help.github.com/articles/about-pull-requests/)

#### Note di traduzione

Non cancellate o modificate gli esempi integrati alla pagina, che assomigliano a questo codice:

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

oppure

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### Testare

Iniziate l'esecuzione di un server locale PHP all'interno della cartella locale:

```bash
php -S localhost:8000
```

Poi, nel tuo browser aprite la pagina ```localhost:8000```, andate al capitolo che state traducendo e aggiungete ```?lan=``` seguito dal codice della lingua in cui state traducendo.

Per esempio se si sta traducendo il capitolo ```03``` in francese, starete lavorando sul file```03/README-fr.md``` e lo si può testare andando alla pagina: ```http://localhost:8000/03/?lan=fr```

### Migliorare la sezione glossario

Questa sezione è in fase di sviluppo. Siamo lieti di ascoltare le vostre idee su come rendere uno strumento intuitivo per tutti. Inviaci un messaggio a [@bookofshaders](https://twitter.com/bookofshaders).

### Modifica il contenuto

Siamo tutti esseri umani. Se vedete qualcosa, ditelo e fate un Pull Request oppure aprite un problema su GitHub. Grazie!

### Condividete i vostri esempi di shaders

Vedrete un sacco di link verso [l'editor on-line](http://editor.thebookofshaders.com/) e verso delle sue istanze integrate alla pagina.
Una volta che si scrive un codice che vi rende orgoglioso, fate clic su "Esporta" (o sull' icona ```⇪```) e quindi copiate l' "URL verso il codice..." ("URL to code..."). Inviatelo a [@bookofshaders](https://twitter.com/bookofshaders) o a [@kyndinfo](https://twitter.com/kyndinfo). Non vediamo l'ora di vederlo e aggiungerlo alla [sezione galleria di esempi](https://thebookofshaders.com/examples/).
