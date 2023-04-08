# Design generatywny

Nie jest zaskoczeniem, że po tylu zagadnieniach ładu i porządku autor zmuszony jest wprowadzić trochę chaosu.

## Losowość

[![Ryoji Ikeda - test pattern (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

Losowość jest maksymalnym wyrazem entropii. Jak możemy wygenerować losowość wewnątrz pozornie przewidywalnego i sztywnego środowiska kodu?

Zacznijmy od analizy następującej funkcji:

<!-- Randomness is a maximal expression of entropy. How can we generate randomness inside the seemingly predictable and rigid code environment?

Let's start by analyzing the following function: -->

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Powyżej wyodrębniamy zawartość ułamkową sinusoidy. Wartości [``sin()``](../glossary/?search=sin), które oscylują pomiędzy ``-1.0`` a ``1.0`` zostały posiekane, i sprowadzone do zakresu pomiędzy ``0.0`` a ``1.0``. Możemy wykorzystać ten efekt do uzyskania pseudolosowych wartości. W jaki sposób? Mnożąc wypadkową [``sin(x)``](../glossary/?search=sin) przez większe liczby. Śmiało, zmodyfikuj powyższą funkcję, dodając zera do `1.0`.

Do czasu, gdy dojdziesz do ``100000.0`` (i równanie będzie wyglądało tak: ``y = fract(sin(x)*100000.0)`` ) nie jesteś już w stanie dostrzec sinusoidę. Ziarnistość części ułamkowej zepsuła falę sinusoidy w pseudolosowy chaos.

<!-- Above we are extracting the fractional content of a sine wave. The [```sin()```](../glossary/?search=sin) values that fluctuate between ```-1.0``` and ```1.0``` have been chopped behind the floating point, returning all positive values between ```0.0``` and ```1.0```. We can use this effect to get some pseudo-random values by "breaking" this sine wave into smaller pieces. How? By multiplying the resultant of [```sin(x)```](../glossary/?search=sin) by larger numbers. Go ahead and click on the function above and start adding some zeros.

By the time you get to ```100000.0``` ( and the equation looks like this: ```y = fract(sin(x)*100000.0)``` ) you aren't able to distinguish the sine wave any more. The granularity of the fractional part has corrupted the flow of the sine wave into pseudo-random chaos. -->

## Kontrolowanie chaosu

Używanie losowości może być trudne - czasami jest ona zbyt chaotyczna, a czasami niewystarczająco losowa. Przyjrzyj się poniższemu wykresowi. Aby go stworzyć, używamy funkcji ``rand()``, która jest zaimplementowana dokładnie tak, jak opisaliśmy powyżej.

Przyglądając się bliżej, możesz dostrzec osobiliwości przy ``-1.5707`` i ``1.5707``. Założę się, że teraz rozumiesz dlaczego - to właśnie tam występuje maksimum i minimum fali sinusoidalnej.

Jeśli przyjrzysz się bliżej rozkładowi losowemu, zauważysz, że istnieje pewne skupienie wokół środka w porównaniu do brzegów.

<!-- ## Controlling chaos

Using random can be hard; it is both too chaotic and sometimes not random enough. Take a look at the following graph. To make it, we are using a ```rand()``` function which is implemented exactly like we describe above.

Taking a closer look, you can see the [```sin()```](../glossary/?search=sin) wave crest at ```-1.5707``` and ```1.5707```. I bet you now understand why - it's where the maximum and minimum of the sine wave happens.

If look closely at the random distribution, you will note that the there is some concentration around the middle compared to the edges. -->

<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

Jakiś czas temu [Pixelero](https://pixelero.wordpress.com) opublikował [ciekawy artykuł o rozkładzie losowym](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/). Dodałem kilka zakomentowanych funkcji, których używa, abyś mógł zobaczyć, jak można ten rozkład zmienić. Odkomentuj te funkcje i zobacz, co się stanie.

Czytając [artykuł Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/), ważne jest, aby pamiętać, że nasza funkcja ``rand()`` jest deterministyczna, pseudolosowa. Co oznacza, że na przykład ``rand(1.)`` zawsze zwróci tę samą wartość. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) odwołuje się do funkcji ActionScript ``Math.random()``, która jest niedeterministyczna - każde jej wywołanie zwróci inną wartość.

<!-- A while ago [Pixelero](https://pixelero.wordpress.com) published an [interesting article about random distribution](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/). I've added some of the functions he uses in the previous graph for you to play with and see how the distribution can be changed. Uncomment the functions and see what happens.

If you read [Pixelero's article](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/), it is important to keep in mind that our ```rand()``` function is a deterministic random, also known as pseudo-random. Which means for example ```rand(1.)``` is always going to return the same value. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) makes reference to the ActionScript function ```Math.random()``` which is non-deterministic; every call will return a different value. -->

## Losowość 2D

Teraz, gdy mamy już lepsze zrozumienie losowości, czas zastosować ją w dwóch wymiarach, zarówno na osi ``x`` jak i ``y``. W tym celu potrzebujemy sposobu na przekształcenie dwuwymiarowego wektora w jednowymiarową wartość zmiennoprzecinkową. Można to zrobić na różne sposoby, ale szczególnie pomocna w tym przypadku jest funkcja [``dot()``](../glossary/?search=dot). Zwraca ona pojedynczą wartość zmiennoprzecinkową pomiędzy ``0.0`` a ``1.0`` w zależności od wzajemnej orientacji dwóch wektorów.

<!-- Now that we have a better understanding of randomness, it's time to apply it in two dimensions, to both the ```x``` and ```y``` axis. For that we need a way to transform a two dimensional vector into a one dimensional floating point value. There are different ways to do this, but the [```dot()```](../glossary/?search=dot) function is particulary helpful in this case. It returns a single float value between ```0.0``` and ```1.0``` depending on the alignment of two vectors. -->

<div class="codeAndCanvas" data="2d-random.frag"></div>

Przyjrzyj się liniom od 13 do 15 i zauważ, jak porównujemy ``vec2 st`` z innym dwuwymiarowym wektorem ( ``vec2(12,9898,78,233)``).

* Spróbuj zmienić wartości w liniach 14 i 15. Zobacz, jak zmienia się wyświetlany losowy wzór i zastanów się, czego możemy się z tego nauczyć.

* Uzależnij tę funkcję losową od myszy (``u_mouse``) i czasu (``u_time``), aby lepiej zrozumieć, jak działa.

<!-- Take a look at lines 13 to 15 and notice how we are comparing the ```vec2 st``` with another two dimensional vector ( ```vec2(12.9898,78.233)```).

* Try changing the values on lines 14 and 15. See how the random pattern changes and think about what we can learn from this.

* Hook this random function to the mouse interaction (```u_mouse```) and time (```u_time```) to understand better how it works. -->

## Wykorzystanie chaosu

Losowość w dwóch wymiarach wygląda bardzo podobnie do szumu telewizyjnego, prawda? To trudne do wykorzystania narzędzie do komponowania obrazów. Nauczmy się, jak zrobić z niego użytek.

Naszym pierwszym krokiem jest stworzenie tablicy kafelków; używając funkcji [``floor()``](../glossary/?search=floor) wygenerujemy tablicę, w której każdemu kafelkowi przyporządkowany jest unikalny wektor liczb całkowitych. Przyjrzyj się poniższemu kodowi, szczególnie liniom 22 i 23.

<!-- ## Using the chaos

Random in two dimensions looks a lot like TV noise, right? It's a hard raw material to use to compose images. Let's learn how to make use of it.

Our first step is to apply a grid to it; using the [```floor()```](../glossary/?search=floor) function we will generate an integer table of cells. Take a look at the following code, especially lines 22 and 23. -->

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

Po przeskalowaniu przestrzeni przez 10 (w linii 21) oddzielamy część całkowitą współrzędnych od części ułamkowej. Operacja uzyskiwania części ułamkowej jest nam dobrze znana, ponieważ używaliśmy jej do dzielenia przestrzeni na mniejsze kafelki o wartościach od ``0.0`` do ``1.0``. Uzyskując część całkowitą współrzędnej wyodrębniamy wspólną wartość dla całego kafelka. Następnie możemy użyć tej wspólnej liczby całkowitej, aby uzyskać losową wartość dla tego kafelka. Ponieważ nasza funkcja losowa jest deterministyczna, zwrócona wartość losowa będzie stała dla wszystkich pikseli w tym kafelku.

Odkomentuj linię 29, aby zobaczyć, że zachowujemy część ułamkową współrzędnej, więc możemy nadal używać jej jako układu współrzędnych do rysowania rzeczy wewnątrz każdego kafelka.

<!-- After scaling the space by 10 (on line 21), we separate the integers of the coordinates from the fractional part. We are familiar with this last operation because we have been using it to subdivide a space into smaller cells that go from ```0.0``` to ```1.0```. By obtaining the integer of the coordinate we isolate a common value for a region of pixels, which will look like a single cell. Then we can use that common integer to obtain a random value for that area. Because our random function is deterministic, the random value returned will be constant for all the pixels in that cell.

Uncomment line 29 to see that we preserve the floating part of the coordinate, so we can still use that as a coordinate system to draw things inside each cell. -->

Połączenie tych dwóch wartości - części całkowitej i części ułamkowej współrzędnej - pozwoli ci wymieszać zmienność i porządek.

Spójrz na poniższy GLSL'owy port słynnego generatora labiryntów ``10 PRINT CHR$(205,5+RND(1)); : GOTO 10``.

<!-- Combining these two values - the integer part and the fractional part of the coordinate - will allow you to mix variation and order.

Take a look at this GLSL port of the famous ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10``` maze generator. -->

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

Tutaj wykorzystuję losowe wartości kafelków do rysowania linii w jednym lub drugim kierunku, używając funkcji ``truchetPattern()`` z poprzedniego rozdziału (linie 41 do 47).

Możesz uzyskać inny ciekawy wzór, odkomentowując blok linii między 50 a 53, natomiast odkomentowując linie 35 i 36 dodasz animację.

<!-- Here I'm using the random values of the cells to draw a line in one direction or the other using the ```truchetPattern()``` function from the previous chapter (lines 41 to 47).

You can get another interesting pattern by uncommenting the block of lines between 50 to 53, or animate the pattern by uncommenting lines 35 and 36. -->

## Ujarzmij losowość

[Ryoji Ikeda](http://www.ryojiikeda.com/), japoński kompozytor elektroniczny i artysta wizualny, ujarzmił losowość - trudno nie być poruszonym i zahipnotyzowanym przez jego prace. Jego użycie losowości w mediach audio-wizualnych to nie irytujący chaos, ale lustro złożoności naszej technologicznej kultury.

<!-- [Ryoji Ikeda](http://www.ryojiikeda.com/), Japanese electronic composer and visual artist, has mastered the use of random; it is hard not to be touched and mesmerized by his work. His use of randomness in audio and visual mediums is forged in such a way that it is not annoying chaos but a mirror of the complexity of our technological culture. -->

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Zapoznaj się z pracami [Ikedy](http://www.ryojiikeda.com/) i spróbuj wykonać następujące ćwiczenia:

* Utwórz rzędy ruchomych komórek (w przeciwnych kierunkach) o losowych wartościach. Wyświetlaj tylko komórki z jaśniejszymi wartościami. Spraw, aby prędkość rzędów zmieniała się w czasie.

<!-- Take a look at [Ikeda](http://www.ryojiikeda.com/)'s work and try the following exercises:

* Make rows of moving cells (in opposite directions) with random values. Only display the cells with brighter values. Make the velocity of the rows fluctuate over time. -->

<a href="../edit.php#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* Podobnie jak poprzednio, stwórz kilka rzędów kafelków, ale każdy z nich z inną prędkością i kierunkiem. Uzależnij próg wyświetlania kafelków od położenia myszy.

<!-- * Similarly make several rows but each one with a different speed and direction. Hook the position of the mouse to the threshold of which cells to show. -->

<a href="../edit.php#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Stwórz inne ciekawe efekty.

<!-- * Create other interesting effects. -->

<a href="../edit.php#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

Używanie losowości w estetyczny sposób może być problematyczne, zwłaszcza jeśli chcesz zrobić naturalnie wyglądające symulacje. Losowość jest po prostu zbyt chaotyczna i bardzo niewiele rzeczy wygląda ``random()`` w prawdziwym życiu. Jeśli spojrzysz na wzór deszczu lub wykres giełdowy, które są dość losowe, nie przypominają one w niczym losowego wzoru, który stworzyliśmy na początku tego rozdziału. Powód? Cóż, wartości losowe nie mają żadnej korelacji między sobą, podczas gdy większość naturalnych wzorów ma jakąś pamięć o poprzednim stanie.

W następnym rozdziale poznamy szum (ang. "noise"), płynny i *naturalnie wyglądający* sposób tworzenia chaosu obliczeniowego.

<!-- Using random aesthetically can be problematic, especially if you want to make natural-looking simulations. Random is simply too chaotic and very few things look ```random()``` in real life. If you look at a rain pattern or a stock chart, which are both quite random, they are nothing like the random pattern we made at the begining of this chapter. The reason? Well, random values have no correlation between them what so ever, but most natural patterns have some memory of the previous state.

In the next chapter we will learn about noise, the smooth and *natural looking* way of creating computational chaos. -->
