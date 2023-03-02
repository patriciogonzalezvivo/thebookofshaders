## Jak uruchomić przykłady na Raspberry Pi?

Jeszcze kilka lat temu założenie, że każdy ma komputer z procesorem graficznym było dalekie od prawdy. Teraz większość komputerów ma GPU, ale to wciąż wysoka poprzeczka.

Dzięki [Fundacji Raspberry Pi](http://www.raspberrypi.org/) nowy typ małych i tanich komputerów nowej generacji (około 35 dolarów za sztukę) trafił do sal lekcyjnych. Co ważniejsze dla celów tej książki, [Raspberry Pi](http://www.raspberrypi.org/) jest wyposażone w przyzwoity procesor graficzny Broadcom, do którego można uzyskać dostęp bezpośrednio z konsoli. Stworzyłem [elastyczne narzędzie do kodowania GLSL na żywo o nazwie **glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer), które uruchamia wszystkie przykłady zawarte w tej książce. Program ten automatycznie się odswieża, gdy użytkownik zapisze zmiany w swoim kodzie. Co to oznacza? Możesz edytować shader i za każdym razem, gdy go zapiszesz, shader zostanie ponownie skompilowany i wyrenderowany za Ciebie.

<!-- ## How to run the examples on a Raspberry Pi?

A few years ago, assuming that everybody has a computer with a graphical processing unit was a long shot. Now, most computers have a GPU, but it's still a high bar for a requirement in a workshop or class, for example.

Thanks to the [Raspberry Pi Foundation](http://www.raspberrypi.org/) a new type of small and cheap generation of computers (around $35 each) has found its way into classrooms. More importantly for the purposes of this book, the [Raspberry Pi](http://www.raspberrypi.org/) comes with a decent Broadcom GPU that can be accessed directly from the console. I made a [flexible GLSL live coding tool call **glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer) that runs all the examples in this book. This program also has the ability to update automatically when the user saves a change to their code. What does this mean? You can edit the shader and every time you save it, the shader will be re-compile and render for you. -->

Robiąc lokalną kopię repozytorium tej książki (zobacz poprzedni rozdział) i mając [zainstalowany `glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer), użytkownicy mogą uruchamiać przykłady za pomocą `glslviewer`. Dodając flagę `-l` mogą oni renderować przykład w rogu ekranu, podczas gdy modyfikują go za pomocą dowolnego edytora tekstu (jak `nano`, `pico`, `vi`, `vim` lub `emacs`). Działa to również przy połączeniu przez ssh/sftp.

Aby zainstalować i skonfigurować to wszystko na Raspberry Pi, po zainstalowaniu [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) (dystrybucja Linuksa oparta na Debianie, stworzona dla Raspberry Pi) i zalogowaniu się, wpisz następujące polecenia:

<!-- By making a local copy of the repository of this book (see the above section) and having [`glslViewer` installed](https://github.com/patriciogonzalezvivo/glslViewer), users can run the examples with `glslviewer`. Also by using the `-l` flag they can render the example in a corner of the screen while they modify it with any text editor (like `nano`, `pico`, `vi`, `vim` or `emacs`). This also works if the user is connected through ssh/sftp.

To install and set this all up on the Raspberry Pi after installing [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), a Debian-based Linux distribution made for Raspberry Pi, and logging in, type the following commands: -->

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
