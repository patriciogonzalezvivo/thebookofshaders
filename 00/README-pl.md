# Wprowadzenie

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Powyższe obrazy zostały stworzone na różny sposób. Pierwszy stworzył Van Gogh, aplikując farbę warstwa po warstwie. Zajęło mu to godziny. Drugi z nich stworzono poprzez połączenie czterech macierzy zawierających piksele koloru niebieskozielonego (cyjan), magenty, żółtego i czarnego. Kluczową różnicę stanowi fakt, że drugi obraz stworzony został natychmiastowo (przez komputer), a nie seryjnie, krok po kroku (przez malarza).

Ta książka jest o rewolucyjnej technice obliczeniowej, tzw. *fragment shaderach* (zwanych też *pixel shaderami*), które wznoszą cyfrowo generowane obrazy na wyższy poziom. Możesz o nich myśleć jak o ekwiwalencie maszyny drukarskiej Gutenberga dla zastosowań graficznych.

![Gutenberg's press](gutenpress.jpg)


Fragment shadery dają ci pełnię kontroli nad błyskawicznym renderowaniem pikseli na ekranie. Właśnie dlatego są one używane w przeróżnych sytuacjach: od filtrów wideo w telefonach do niesamowitych trójwymiarowych gier wideo.

![Journey by That Game Company](journey.jpg)

W następujących rozdziałach odkryjesz jak niewiarygodnie szybkie i potężne są te techniki i jak zastosować je w twojej pracy zawodowej i osobistej.

## Dla kogo jest ta książka?

Ta książka jest napisana dla osób zainteresowanych *creative coding*iem, game developerów i inżynierów, którzy posiadają doświadczenie programistyczne, podstawową wiedzę z algebry liniowej i trygonometrii, i którzy chcą podnieść jakość swoich prac graficznych na wyższy poziom. (Jeżeli chcesz nauczyć się programować, polecam zacząć od [Processing](https://processing.org/) i wrócić, gdy opanujesz go do komfortowego poziomu.) 

Ta książka nauczy cię jak używać shadery w celu polepszenia wydajności i wyglądu twoich projektów. Ponieważ shadery GLSL (OpenGL Shading Language) kompilują i uruchamiają się na różnorodnych platformach, będziesz w stanie zaaplikować tutaj zdobytą wiedzę do jakiegokolwiek środowiska wykorzystującego OpenGL, OpenGL ES lub WebGL. Innymi słowy, będziesz w stanie wykorzystać tę wiedzę przy tworzeniu szkiców z [Processing](https://processing.org/), aplikacji z [openFrameworks](http://openframeworks.cc/), interaktywnych instalacji z [Cinder](http://libcinder.org/) czy stron internetowych z [Three.js](http://threejs.org/) i gier iOS/Android.

## Jaki materiał pokrywa ta książka?

Ta książka skupia się na użyciu fragment shaderów GLSL. Najpierw zdefiniujemy czym shadery są; potem dowiemy się jak, z ich pomocą, tworzyć proceduralne kształty, wzory, tekstury i animacje. Nauczysz się podstaw języka shadingowego i jego przydatnych aplikacji w przetwarzaniu obrazów (operacje na obrazach, sploty macierzowe, rozmycia, filtry koloru, "lookup tables" i inne efekty) czy symulacji ("Gra w życie" Conwaya, model reakcji-dyfuzji Graya-Scotta, plusk wody, efekt akwareli, komórki Voronoi, itp.). Pod koniec książki zobaczymy kilka zaawansowanych technik opartych o Ray Marching.

*W każdym rozdziale znajdziesz interaktywne przykłady do wypróbowania.* Kiedy zmodyfikujesz kod, natychmiastowo zobaczysz zmiany. Zagadnienia mogą być abstrakcyjne i mylące, więc takie interaktywne przykłady stanowią konieczną pomoc w zrozumieniu materiału. Im szybciej złapiesz praktykę, tym prostsza będzie dalsza nauka.

Materiał, którego ta książka nie pokrywa:

* To *nie jest* książka o OpenGL lub WebGL. OpenGL/WebGL jest większym tematem niż GLSL czy fragment shadery. Jeśli chcesz wiedzieć więcej o OpenGL i WebGL, polecam zajrzeć do [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (zwana również "czerwoną książką") lub [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* To *nie jest* książka do nauki matematyki. Choć opisane są w niej algorytmy i techniki, które opierają się zrozumieniu algebry i trygonometrii, to nie będziemy ich szczegółowo tłumaczyć. Z pytaniami dotyczącymi matematyki polecam zajrzeć do następujących książek:
[3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) lub [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## Co potrzeba, żeby zacząć?

Niewiele! Jeśli masz współczesną przeglądarkę, która obsługuje WebGL (jak Chrome, Firefox czy Safari) i połączenie internetowe, to kliknij "Dalej" na dole strony, aby zacząć. 

Alternatywnie, w zależności od tego, co masz albo co potrzebujesz od tej książki, możesz:

- [Stworzyć wersję off-line tej książki](https://thebookofshaders.com/appendix/00/?lan=pl)

- [Uruchomić przykłady na Raspberry Pi bez przeglądarki](https://thebookofshaders.com/appendix/01/?lan=pl)

- [Stworzyć wersję PDF tej książki do wydrukowania](https://thebookofshaders.com/appendix/02/?lan=pl)

- Sprawdź [repozytorium GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) tej książki, by pomóc rozwiązać issues i podzielić się swoim kodem.

