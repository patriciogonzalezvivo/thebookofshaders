## Come posso eseguire gli esempi su un Raspberry Pi?

Alcuni anni fa, non era del tutto ovvio che tutti disponessero di un computer con una GPU. Ora, nonostante la maggior parte dei computer abbia una carta grafica, non tutti i corsi o classi possono permettersene uno.

Grazie al [progetto Raspberry Pi](http://www.raspberrypi.org/) una nuova generazione di computer piccoli ed economici (circa 35euro ciascuno) ha cominciato a diffondersi nelle aule scolastiche. Ancora più importante ai fini di questo libro, il [Raspberry Pi](http://www.raspberrypi.org/) viene fornito con una scheda GPU Bradcom decente a cui si può accedere direttamente dalla console. Ho creato uno [strumento flessibile per programmare GLSL live chiamato **glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer) capace di far funzionare tutti gli esempi di questo libro. Questo programma è anche capace di aggiornare automaticamente le modifiche che l'utente fa quando le salva. Cosa significa? è possibile modificare lo shader e ogni volta che lo si salva, lo shader sarà ricompilato e visualizzato per voi.

Facendo una copia locale del repository di questo libro (vedi paragrafo precedente) e con [```glslViewer``` installato](https://github.com/patriciogonzalezvivo/glslViewer), gli utenti possono eseguire gli esempi con ```glslviewer```. Inoltre usando il flag ```-l``` si può visualiizare l'esempio in un angolo dello schermo mentre lo si modifica con un qualsiasi editor di testo (come ```nano```, ```pico```, ```vi```, ```vim``` or ```emacs```). Questo funziona anche quando l'utente è collegato tramite ssh/sftp.

Per installare e configurare tutto ciò sul Raspberry Pi, dopo l'installazione del sistema operativo e il login, digitate i seguenti comandi:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
