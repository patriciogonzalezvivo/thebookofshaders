## Wzory kafelkowe

Ponieważ shadery wykonywane są piksel po pikselu, więc niezależnie od tego, jak często powtarzasz (duplikujesz) dany kształt, liczba obliczeń pozostaje stała. Oznacza to, że fragment shadery nadają się szczególnie do wzorów kafelkowych.

[ ![Nina Warmerdam - The IMPRINT Project (2013)](warmerdam.jpg) ](../edit.php#09/dots5.frag)

W tym rozdziale zamierzamy zastosować to, czego nauczyliśmy się do tej pory, ale powtarzając to wzdłuż kanwy. Podobnie jak w poprzednich rozdziałach, nasza strategia będzie opierała się na mnożeniu współrzędnych przestrzeni (z przedziału 0.0 a 1.0), dzięki czemu kształty, które narysujemy pomiędzy wartościami 0.0 a 1.0, będą się powtarzać, tworząc siatkę.

*Siatka zapewnia ramy, w których może działać ludzka intuicja i inwencja, i które może obalić. W chaosie natury wzory zapewniają kontrast i obietnicę porządku. Od wczesnych wzorów na ceramice do geometrycznych mozaik w rzymskich łaźniach, ludzie od dawna używali siatek, by wzbogacić swoje życie o dekoracje. "* [*10 PRINT*, Mit Press, (2013)](http://10print.org/)

Najpierw przypomnijmy sobie funkcję [``fract()``](../glossary/?search=fract). Zwraca ona część ułamkową liczby, dzięki czemu ``fract()`` to w istocie funkcja modulo jeden ([``mod(x,1.0)``](../glossary/?search=mod)). Innymi słowy, [``fract()``](../glossary/?search=fract) zwraca liczbę po przecinku. Nasza zmienna znormalizowanego układu współrzędnych (``st``) już znajduje sie w zakresie od 0.0 do 1.0, więc nie ma sensu robić czegoś takiego jak:

<!-- ## Patterns

Since shader programs are executed by pixel-by-pixel no matter how much you repeat a shape the number of calculations stays constant. This means that fragment shaders are particulary suitable for tile patterns.

[ ![Nina Warmerdam - The IMPRINT Project (2013)](warmerdam.jpg) ](../edit.php#09/dots5.frag)

In this chapter we are going to apply what we've learned so far and repeat it along a canvas. Like in previous chapters, our strategy will be based on multiplying the space coordinates (between 0.0 and 1.0), so that the shapes we draw between the values 0.0 and 1.0 will be repeated to make a grid.

*"The grid provides a framework within which human intuition and invention can operate and that it can subvert. Within the chaos of nature patterns provide a constrast and promise of order. From early patterns on pottery to geometric mosaics in Roman baths, people have long used grids to enhance their lives with decoration."* [*10 PRINT*, Mit Press, (2013)](http://10print.org/)

First let's remember the [```fract()```](../glossary/?search=fract) function. It returns the fractional part of a number, making ```fract()``` in essence the modulo of one ([```mod(x,1.0)```](../glossary/?search=mod)). In other words, [```fract()```](../glossary/?search=fract) returns the number after the floating point. Our normalized coordinate system variable (```st```) already goes from 0.0 to 1.0 so it doesn't make sense to do something like: -->

```glsl
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
    st = fract(st);
	color = vec3(st,0.0);
	gl_FragColor = vec4(color,1.0);
}
```

Ale jeśli przeskalujemy znormalizowany układ współrzędnych w górę - powiedzmy o trzy - otrzymamy trzy sekwencje interpolacji liniowych między 0-1: pierwszą między 0-1, drugą dla punktów między 1-2 i trzecią dla punktów między 2-3.

<!-- But if we scale the normalized coordinate system up - let's say by three - we will get three sequences of linear interpolations between 0-1: the first one between 0-1, the second one for the floating points between 1-2 and the third one for the floating points between 2-3. -->

<div class="codeAndCanvas" data="grid-making.frag"></div>

Teraz nadszedł czas, aby narysować coś w każdej podprzestrzeni, odkomentowując linię 27. (Ponieważ mnożymy x i y po równo, współczynnik proporcji przestrzeni nie zmienia się i kształty będą zgodne z oczekiwaniami).

Spróbuj wykonać niektóre z poniższych ćwiczeń, aby uzyskać głębsze zrozumienie:

<!-- Now it's time to draw something in each subspace, by uncommenting line 27. (Because we are multiplying equally in x and y the aspect ratio of the space doesn't change and shapes will be as expected.)

Try some of the following exercises to get a deeper understanding: -->

* Pomnóż przestrzeń przez różne liczby. Spróbuj z wartościami zmiennoprzecinkowymi, a także z różnymi wartościami dla x i y.

* Zrób funkcję z tej kafelkowej sztuczki, abyś mógł ją ponownie wykorzystać.

* Podziel przestrzeń na 3 wiersze i 3 kolumny. Znajdź sposób identyfikowania, w której kolumnie i rzędzie znajduje się wątek (piksel). Użyj tego, aby zmienić kształt, który jest wyświetlany. Spróbuj stworzyć mecz Kółko i krzyżyk

<!-- * Multiply the space by different numbers. Try with floating point values and also with different values for x and y.

* Make a reusable function of this tiling trick.

* Divide the space into 3 rows and 3 columns. Find a way to know in which column and row the thread is and use that to change the shape that is displaying. Try to compose a tic-tac-toe match. -->

### Macierze wewnątrz kafelków

Ponieważ każdy kafelek jest pomniejszą wersją znormalizowanego układu współrzędnych, którego już używaliśmy, więc możemy zastosować do niego przekształcenie macierzowe w celu translacji, obrotu lub skalowania przestrzeni wewnątrz.

<!-- ### Apply matrices inside patterns

Since each subdivision or cell is a smaller version of the normalized coordinate system we have already been using, we can apply a matrix transformation to it in order to translate, rotate or scale the space inside. -->

<div class="codeAndCanvas" data="checks.frag"></div>

* Pomyśl o ciekawych sposobach animacji tego wzoru. Rozważ animowanie koloru, kształtu i ruchu. Wykonaj trzy różne animacje.

* Odtwórz bardziej skomplikowane wzory poprzez skomponowanie różnych kształtów.

<!-- * Think of interesting ways of animating this pattern. Consider animating color, shapes and motion. Make three different animations.

* Recreate more complicated patterns by composing different shapes. -->


[![](diamondtiles-long.png)](../edit.php#09/diamondtiles.frag)

* Połącz różne warstwy wzorów, aby skomponować własny [szkocki tartan](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns).

<!-- * Combine different layers of patterns to compose your own [Scottish Tartan Patterns](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns). -->

[ ![Vector Pattern Scottish Tartan By Kavalenkava](tartan.jpg) ](http://graphicriver.net/item/vector-pattern-scottish-tartan/6590076)

### Przesunięcia kafelków

Powiedzmy, że chcemy odtworzyć mur z cegły. Patrząc na ścianę, można zauważyć przesunięcie pół cegły na osi x w co drugim rzędzie. Jak możemy to zrobić?

![](brick.jpg)

Jako pierwszy krok musimy wiedzieć, czy rząd naszego wątku (piksela) jest liczbą parzystą czy nieparzystą, co pomoże określić, czy musimy przesunąć x w tym rzędzie. W tym celu użyjemy [``mod()``](../glossary/?search=mod) z ``2.0``, a następnie zobaczymy, czy wynik jest mniejszy niż ``1.0`` czy nie. Spójrz na poniższy kod i odkomentuj dwie ostatnie linie.

<!-- ### Offset patterns

So let's say we want to imitate a brick wall. Looking at the wall, you can see a half brick offset on x in every other row. How we can do that?

![](brick.jpg)

As a first step we need to know if the row of our thread is an even or odd number, because we can use that to determine if we need to offset the x in that row.

____we have to fix these next two paragraphs together____

To determine if our thread is in an odd or even row, we are going to use [```mod()```](../glossary/?search=mod) of ```2.0``` and then see if the result is under ```1.0``` or not. Take a look at the following formula and uncomment the two last lines. -->

<div class="simpleFunction" data="y = mod(x,2.0);
// y = mod(x,2.0) < 1.0 ? 0. : 1. ;
// y = step(1.0,mod(x,2.0));"></div>

Jak widać możemy użyć [operatora warunkowego](https://en.wikipedia.org/wiki/%3F:) do sprawdzenia czy [``mod()``](../glossary/?search=mod) z ``2.0`` jest mniejszy od ``1.0`` (druga linia) lub podobnie możemy użyć funkcji [``step()``](../glossary/?search=step), która wykonuje tę samą operację, ale szybciej. Dlaczego? Chociaż trudno jest wiedzieć jak każda karta graficzna optymalizuje i kompiluje kod, to można bezpiecznie założyć, że funkcje wbudowane są szybsze od tych niewbudowanych. Zawsze, gdy możesz użyć wbudowanej funkcji, użyj jej!

Korzystając z powyższej metody wykrywania liczb nieparzystych, możemy przesunąć nieparzyste rzędy, aby upodobnić naszą kawnę do ceglanej ściany. W linii 14 poniższego kodu identyfikujemy parzystość rzędów i nadajemy im przesunięcie na ``x``. Zauważ, że dla parzystych rzędów, wynikiem obliczeń w `step()` jest ``0.0``, co, mnożąc przez ``0.5``, daje przesunięcie ``0.0``. Natomiast w nieparzystych rzędach mnożymy ``1.0`` przez ``0.5``, co powoduje przesunięcie osi ``x`` układu współrzędnych o ``0.5``.

<!-- As you can see we can use a [ternary operator](https://en.wikipedia.org/wiki/%3F:) to check if the [```mod()```](../glossary/?search=mod) of ```2.0``` is under ```1.0``` (second line) or similarly we can use a [```step()```](../glossary/?search=step) function which does the same operation, but faster. Why? Although is hard to know how each graphic card optimizes and compiles the code, it is safe to assume that built-in functions are faster than non-built-in ones. Everytime you can use a built-in function, use it!

So now that we have our odd number formula we can apply an offset to the odd rows to give a *brick* effect to our tiles. Line 14 of the following code is where we are using the function to "detect" odd rows and give them a half-unit offset on ```x```. Note that for even rows, the result of our function is ```0.0```, and multiplying ```0.0``` by the offset of ```0.5``` gives an offset of ```0.0```. But on odd rows we multiply the result of our function, ```1.0```, by the offset of ```0.5```, which moves the ```x``` axis of the coordinate system by ```0.5```. -->

Teraz spróbuj odkomentować linię 32 - rozciąga ona proporcje układu współrzędnych, aby odtworzyć wymiary "nowoczesnej cegły". Odkomentowując linię 40 możesz zobaczyć jak wygląda układ współrzędnych zmapowany na kolor czerwony i zielony.

<!-- Now try uncommenting line 32 - this stretches the aspect ratio of the coordinate system to mimic the aspect of a "modern brick". By uncommenting line 40 you can see how the coordinate system looks mapped to red and green. -->

<div class="codeAndCanvas" data="bricks.frag"></div>

* Zanimuj ten przykład, zwiększając przesunięcie w zależności od czasu.

* Zrób kolejną animację, w której parzyste wiersze przesuwają się w lewo, a nieparzyste w prawo.

* Czy możesz powtórzyć ten efekt, ale z kolumnami?

* Spróbuj połączyć przesunięcie na osi ``x`` i ``y``, aby uzyskać coś takiego:

<!-- * Try animating this by moving the offset according to time.

* Make another animation where even rows move to the left and odd rows move to the right.

* Can you repeat this effect but with columns?

* Try combining an offset on ```x``` and ```y``` axis to get something like this: -->

<a href="../edit.php#09/marching_dots.frag"><canvas id="custom" class="canvas" data-fragment-url="marching_dots.frag"  width="520px" height="200px"></canvas></a>

## Kafelki Truchet'a 

Teraz, gdy dowiedzieliśmy się, jak określić, czy nasza komórka znajduje się w parzystym czy nieparzystym wierszu lub kolumnie, możliwe jest ponowne wykorzystanie pojedynczego elementu projektu w zależności od jego pozycji. Rozważmy przypadek [kafelków Truchet'a](http://en.wikipedia.org/wiki/Truchet_tiles), gdzie pojedynczy kafelek może być przedstawiony na cztery różne sposoby:

<!-- ## Truchet Tiles

Now that we've learned how to tell if our cell is in an even or odd row or column, it's possible to reuse a single design element depending on its position. Consider the case of the [Truchet Tiles](http://en.wikipedia.org/wiki/Truchet_tiles) where a single design element can be presented in four different ways: -->

![](truchet-00.png)

Zmieniając wzór na kafelkach, można zbudować nieskończony zestaw skomplikowanych wzorów.

<!-- By changing the pattern across tiles, it's possible to construct an infinite set of complex designs. -->

![](truchet-01.png)

Zwróć uwagę na funkcję ``rotateTilePattern()``, która dzieli przestrzeń na cztery komórki i każdej z nich przypisuje kąt obrotu.

<!-- Pay close attention to the function ```rotateTilePattern()```, which subdivides the space into four cells and assigns an angle of rotation to each one. -->

<div class="codeAndCanvas" data="truchet.frag"></div>

* Zakomentowywuj, odkomentowywuj i powielaj linie od 69 do 72, aby komponować nowe wzory.

* Zmień czarno-biały trójkąt na inny element, taki jak: półkola, obrócone kwadraty lub linie.

* Zakoduj inne wzory, w których elementy są obracane w zależności od ich położenia.

* Zrób wzór, który zmienia inne właściwości w zależności od położenia elementów.

* Pomyśl o czymś innym, co niekoniecznie jest wzorem, gdzie możesz zastosować zasady z tego działu. (Na przykład: heksagramy I Ching)

<!-- * Comment, uncomment and duplicate lines 69 to 72 to compose new designs.

* Change the black and white triangle for another element like: half circles, rotated squares or lines.

* Code other patterns where the elements are rotated according to their position.

* Make a pattern that changes other properties according to the position of the elements.

* Think of something else that is not necessarily a pattern where you can apply the principles from this section. (Ex: I Ching hexagrams) -->

<a href="../edit.php#09/iching-01.frag"><canvas id="custom" class="canvas" data-fragment-url="iching-01.frag"  width="520px" height="200px"></canvas></a>

## Tworzenie własnych reguł

Tworzenie wzorców proceduralnych to ćwiczenie umysłowe polegające na znajdowaniu minimalnych elementów wielokrotnego użytku. Praktyka ta jest stara; my jako gatunek od dawna używamy siatek i wzorów do dekorowania tkanin, podłóg i obramowań obiektów: od meandrowych wzorów w starożytnej Grecji, po chińskie wzory kratowe, przyjemność z powtórzeń i wariacji przykuwa naszą uwagę i pobudza wyobraźnię. Poświęć trochę czasu, aby spojrzeć na [dekoracyjne](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) [wzory](https://www.pinterest.com/patriciogonzv/paterns/) i zobacz długą historię tego, jak artyści i projektanci poruszają się po cienkiej krawędzi między przewidywalnością porządku a niespodzianką zmienności i chaosu. Od arabskich wzorów geometrycznych do wspaniałych afrykańskich wzorów tkanin, istnieje cały wszechświat wzorów, z których można się uczyć.

<!-- ## Making your own rules

Making procedural patterns is a mental exercise in finding minimal reusable elements. This practice is old; we as a species have been using grids and patterns to decorate textiles, floors and borders of objects for a long time: from meanders patterns in ancient Greece, to Chinese lattice design, the pleasure of repetition and variation catches our imagination. Take some time to look at [decorative](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) [patterns](https://www.pinterest.com/patriciogonzv/paterns/) and see how artists and designers have a long history of navigating the fine edge between the predictability of order and the surprise of variation and chaos. From Arabic geometrical patterns, to gorgeous African fabric designs, there is an entire universe of patterns to learn from. -->

![Franz Sales Meyer - A handbook of ornament (1920)](geometricpatters.png)

Tym rozdziałem kończymy część poświęconą Rysowaniu Algorytmicznemu. W kolejnych rozdziałach dowiemy się, jak wprowadzić trochę entropii do naszych shaderów, tworząc generatywny design.

<!-- With this chapter we end the section on Algorithmic Drawing. In the following chapters we will learn how to bring some entropy to our shaders and produce generative designs. -->
