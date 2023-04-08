![Due East over Shadequarter Mountain - Matthew Rangel (2005) ](rangel.jpg)

## Fractal Brownian Motion (pol. "fraktalne ruchy Browna")

Szum zwykle oznacza różne rzeczy dla różnych ludzi. Muzycy będą myśleć o nim w kategoriach przeszkadzających dźwięków, komunikatorzy jako o zakłóceniach, a astrofizycy jako o kosmicznym mikrofalowym promieniowaniu tła. Te koncepcje sprowadzają nas z powrotem do fizycznych przyczyn losowości w otaczającym nas świecie. Zacznijmy jednak od czegoś bardziej podstawowego i prostszego: od fal i ich właściwości. Fala jest fluktuacją w czasie jakiejś właściwości. Fale dźwiękowe to fluktuacje ciśnienia powietrza, fale elektromagnetyczne to fluktuacje pola elektrycznego i magnetycznego. Dwie ważne cechy fali to jej amplituda i częstotliwość. Równanie dla prostej liniowej (jednowymiarowej) fali wygląda tak:

<!-- Noise tends to mean different things to different people. Musicians will think of it in terms of disturbing sounds, communicators as interference and astrophysicists as cosmic microwave background radiation. These concepts bring us back to the physical reasons behind randomness in the world around us. However, let's start with something more fundamental, and more simple: waves and their properties. A wave is a fluctuation over time of some property. Audio waves are fluctuations in air pressure, electromagnetical waves are fluctuations in electrical and magnetic fields. Two important characteristics of a wave are its amplitude and frequency. The equation for a simple linear (one-dimensional) wave looks like this: -->

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = amplitude * sin(x * frequency);
"></div>

* Spróbuj zmienić wartości częstotliwości i amplitudy, aby zrozumieć, jak się zachowują.
* Używając shaping functions, spróbuj zmienić amplitudę w czasie.
* Używając shaping functions, spróbuj zmienić częstotliwość w czasie.

<!-- * Try changing the values of the frequency and amplitude to understand how they behave.
* Using shaping functions, try changing the amplitude over time.
* Using shaping functions, try changing the frequency over time. -->

Wykonując dwa ostatnie ćwiczenia udało Ci się "zmodulować" sinusoidę i właśnie stworzyłeś fale AM (modulowane amplitudą, ang. "amplitude modulated") i FM (modulowane częstotliwością, ang. "frequency modulated"). Gratulacje!!!

Inną ciekawą właściwością fal jest ich zdolność do sumowania się, co formalnie nazywa się superpozycją. Skomentuj/odkomentuj i zmodyfikuj poniższe linijki. Zwróć uwagę, jak zmienia się ogólny wygląd wykresu, gdy dodajemy do siebie fale o różnych amplitudach i częstotliwościach.

<!-- By doing the last two exercises you have managed to "modulate" a sine wave, and you just created AM (amplitude modulated) and FM (frequency modulated) waves. Congratulations!

Another interesting property of waves is their ability to add up, which is formally called superposition. Comment/uncomment and tweak the following lines. Pay attention to how the overall appearance changes as we add waves of different amplitudes and frequencies together. -->

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = sin(x * frequency);
float t = 0.01*(-u_time*130.0);
y += sin(x*frequency*2.1 + t)*4.5;
y += sin(x*frequency*1.72 + t*1.121)*4.0;
y += sin(x*frequency*2.221 + t*0.437)*5.0;
y += sin(x*frequency*3.1122+ t*4.269)*2.5;
y *= amplitude*0.06;
"></div>

* Eksperymentuj, zmieniając częstotliwość i amplitudę dla dodatkowych fal.
* Czy jest możliwe, aby dwie fale wzajemnie się zniosły? Jak to będzie wyglądało?
* Czy można dodać fale w taki sposób, że będą się one wzajemnie wzmacniać?

W muzyce każda nuta jest związana z określoną częstotliwością. Układ częstotliwości tych nut nazywamy skalą, gdzie podwojenie lub zmniejszenie częstotliwości o połowę odpowiada skokowi o jedną oktawę.

<!-- * Experiment by changing the frequency and amplitude for the additional waves.
* Is it possible to make two waves cancel each other out? What will that look like?
* Is it possible to add waves in such a way that they will amplify each other?

In music, each note is associated with a specific frequency. The frequencies for these notes follow a pattern which we call a scale, where a doubling or halving of the frequency corresponds to a jump of one octave. -->

Teraz użyjmy szumu Perlina zamiast sinusoidy! Szum Perlina w swojej podstawowej formie wygląda podobnie do sinusoidy. Jego amplituda i częstotliwość różnią się nieco, ale amplituda pozostaje w miarę stała, a częstotliwość jest ograniczona do dość wąskiego zakresu wokół częstotliwości środkowej. Szum nie jest jednak tak regularny jak sinusoida, tym bardziej, gdy zsumujemy jego kilka przeskalowanych wersji. Można sprawić, że suma fal sinusoidalnych również będzie wyglądać na przypadkową, ale potrzeba wielu różnych fal, aby ukryć ich okresową, regularną naturę.

Poprzez dodanie różnych iteracji szumu (*octaves*, pol. "oktawy"), gdzie kolejno zwiększamy częstotliwości w regularnych krokach (*lacunarity*, pol. "lakunarność") i zmniejszamy amplitudę (*gain*, pol. "wzmocnienie"), otrzymamy szum bardziej granularny, zawierający więcej detali. Technikę tę nazwywamy "fractal Brownian Motion" (*fBM*) lub, po prostu "fractal noise" (pol. "szum fraktalny"). W swojej najprostszej postaci, możemy go stworzyć w następujący sposób: 

<!-- By adding different iterations of noise (*octaves*), where we successively increment the frequencies in regular steps (*lacunarity*) and decrease the amplitude (*gain*,) of the **noise** we can obtain a finer granularity in the noise and get more fine detail. This technique is called "fractal Brownian Motion" (*fBM*), or simply "fractal noise", and in its simplest form it can be created by the following code: -->

<div class="simpleFunction" data="// Properties
const int octaves = 1;
float lacunarity = 2.0;
float gain = 0.5;
//
// Początkowe wartości
float amplitude = 0.5;
float frequency = 1.;
//
// Pętla po oktawach
for (int i = 0; i < octaves; i++) {
&#9;y += amplitude * noise(frequency*x);
&#9;frequency *= lacunarity;
&#9;amplitude *= gain;
}"></div>

* Stopniowo zmieniaj liczbę oktaw z 1 do 2, 4, 8 i 10. Zobacz, co się stanie.
* Gdy masz więcej niż 4 oktawy, spróbuj zmienić wartość `lacunarity`.
* Również przy >4 oktawach zmień wartość `gain` i zobacz, co się stanie.

<!-- * Progressively change the number of octaves to iterate from 1 to 2, 4, 8 and 10. See what happens.
* When you have more than 4 octaves, try changing the lacunarity value.
* Also with >4 octaves, change the gain value and see what happens. -->

Zauważ, że z każdą dodatkową oktawą krzywa wydaje się być bardziej szczegółowa. Zauważ też, że w miarę dodawania kolejnych oktaw występuje efekt samopodobieństwa - jeśli powiększysz krzywą, powiększona część wygląda mniej więcej tak samo jak całość, a każda powiększona część wygląda mniej więcej tak samo jak każda inna. Jest to ważna właściwość fraktali matematycznych, a my symulujemy tę właściwość w naszej pętli. Nie tworzymy *prawdziwego* fraktala, ponieważ zatrzymujemy sumowanie po kilku iteracjach, ale teoretycznie rzecz biorąc, uzyskalibyśmy prawdziwy fraktal matematyczny, gdybyśmy pozwolili pętli trwać w nieskończoność i dodawali nieskończoną liczbę składowych szumu. W grafice komputerowej zawsze mamy limit najmniejszych szczegółów, które możemy wyrenderować, gdyż obiekty stają się mniejsze niż piksel, więc nie ma potrzeby wykonywania nieskończonych sum, aby stworzyć wygląd fraktala. Czasami może być potrzebna duża ilość iteracji, ale nigdy nieskończona liczba.

<!-- Note how with each additional octave, the curve seems to get more detail. Also note the self-similarity while more octaves are added. If you zoom in on the curve, a smaller part looks about the same as the whole thing, and each section looks more or less the same as any other section. This is an important property of mathematical fractals, and we are simulating that property in our loop. We are not creating a *true* fractal, because we stop the summation after a few iterations, but theoretically speaking, we would get a true mathematical fractal if we allowed the loop to continue forever and add an infinite number of noise components. In computer graphics, we always have a limit to the smallest details we can resolve, for example when objects become smaller than a pixel, so there is no need to make infinite sums to create the appearance of a fractal. A lot of terms may be needed sometimes, but never an infinite number. -->

Poniższy kod jest przykładem tego, jak fBm może być zaimplementowany w dwóch wymiarach, aby stworzyć wzór wyglądający jak fraktal:

<!-- The following code is an example of how fBm could be implemented in two dimensions to create a fractal-looking pattern: -->

<div class='codeAndCanvas' data='2d-fbm.frag'></div>

* Zmniejsz liczbę oktaw poprzez zmianę wartości w linii 37
* Zmodyfikuj `lacunarity` fBm w linii 47
* Eksploruj zmianę `gain` na linii 48

<!-- * Reduce the number of octaves by changing the value on line 37
* Modify the lacunarity of the fBm on line 47
* Explore by changing the gain on line 48 -->

Ta technika jest powszechnie używana do konstruowania proceduralnych krajobrazów. Samopodobieństwo fBm jest idealne dla gór, ponieważ procesy erozji, które tworzą góry, działają w sposób, który daje ten rodzaj samopodobieństwa w dużym zakresie skal. Jeśli jesteś zainteresowany tym zastosowaniem, powinieneś koniecznie przeczytać [ten świetny artykuł Inigo Quilesa o zaawansowanym szumie](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm).

<!-- This technique is commonly used to construct procedural landscapes. The self-similarity of the fBm is perfect for mountains, because the erosion processes that create mountains work in a manner that yields this kind of self-similarity across a large range of scales. If you are interested in this use, you should definitely read [this great article by Inigo Quiles about advanced noise](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm). -->

![Blackout - Dan Holdsworth (2010)](holdsworth.jpg)

Używając mniej więcej tej samej techniki, możliwe jest również uzyskanie innych efektów, takich jak **turbulencja**. Jest to w zasadzie fBm, ale skonstruowane z wartości bezwzględnej szumu (wariantu zwracającego również ujemne wartości), aby stworzyć ostre doliny w funkcji.

<!-- Using more or less the same technique, it's also possible to obtain other effects like what is known as **turbulence**. It's essentially an fBm, but constructed from the absolute value of a signed noise to create sharp valleys in the function. -->

```glsl
for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * abs(snoise(st));
    st *= 2.;
    amplitude *= .5;
}
```

<a href="../edit.php#13/turbulence.frag"><img src="turbulence-long.png"  width="520px" height="200px"></img></a>

Innym członkiem tej rodziny algorytmów jest **ridge** (pol. "grzbiet"), w którym ostre doliny są odwrócone do góry nogami, tworząc zamiast nich ostre grzbiety:

<!-- Another member of this family of algorithms is the **ridge**, where the sharp valleys are turned upside down to create sharp ridges instead: -->

```glsl
    n = abs(n);     // Stwórz doliny
    n = offset - n; // Odwróć doliny, aby powstały grzbiety
    n = n * n;      // Zaostrz grzbiety
```

<a href="../edit.php#13/ridge.frag"><img src="ridge-long.png"  width="520px" height="200px"></img></a>

Innym użytecznym wariantem jest mnożenie składowych szumu zamiast ich dodawania. Interesujące jest również skalowanie kolejnych funkcji szumu za pomocą czegoś, co zależy od poprzednich terminów w pętli. Kiedy robimy takie rzeczy, odchodzimy od ścisłej definicji fraktala i wchodzimy w stosunkowo nieznaną dziedzinę "multifraktali". Multifraktale nie są tak ściśle zdefiniowane matematycznie, ale to nie czyni ich mniej użytecznymi dla grafiki. W rzeczywistości symulacje multifraktalne są bardzo powszechne we współczesnym komercyjnym oprogramowaniu do generowania terenu. Aby przeczytać więcej, możesz przeczytać rozdział 16 książki "Texturing and Modeling: a Procedural Approach" (3. edycja), autorstwa Kentona Musgrave. Niestety, książka ta jest już od kilku lat niedostępna w druku, ale wciąż można ją znaleźć w bibliotekach i na rynku wtórnym. (Istnieje wersja PDF pierwszego wydania dostępna do kupienia online, ale nie kupuj jej - to strata pieniędzy. Jest z 1994 roku i nie zawiera żadnych rzeczy związanych z modelowaniem terenu z 3. edycji).

<!-- Another variant which can create useful variations is to multiply the noise components together instead of adding them. It's also interesting to scale subsequent noise functions with something that depends on the previous terms in the loop. When we do things like that, we are moving away from the strict definition of a fractal and into the relatively unknown field of "multifractals". Multifractals are not as strictly defined mathematically, but that doesn't make them less useful for graphics. In fact, multifractal simulations are very common in modern commercial software for terrain generation. For further reading, you could read chapter 16 of the book "Texturing and Modeling: a Procedural Approach" (3rd edition), by Kenton Musgrave. Sadly, that book is out of print since a few years back, but you can still find it in libraries and on the second hand market. (There's a PDF version of the 1st edition available for purchase online, but don't buy that - it's a waste of money. It's from 1994, and it doesn't contain any of the terrain modeling stuff from the 3rd edition.) -->

### Warping (pol. "zakrzywianie")

[Inigo Quiles napisał też inny fascynujący artykuł](http://www.iquilezles.org/www/articles/warp/warp.htm) o tym jak można użyć fBm do zakrzywienia przestrzeni fBm. Zdumiewające, prawda? To jak sen wewnątrz snu o Incepcji.

<!-- [Inigo Quiles wrote this other fascinating article](http://www.iquilezles.org/www/articles/warp/warp.htm) about how it's possible to use fBm to warp a space of a fBm. Mind blowing, Right? It's like the dream inside the dream of Inception. -->

![ f(p) = fbm( p + fbm( p + fbm( p ) ) ) - Inigo Quiles (2002)](quiles.jpg)

Mniej ekstremalnym przykładem tej techniki jest następujący kod, w którym zakrzywienie jest używane do wytworzenia tekstury przypominającej chmury. Zauważ, że właściwość samopodobieństwa jest nadal obecna.

<!-- A less extreme example of this technique is the following code where the wrap is used to produce this clouds-like texture. Note how the self-similarity property is still present in the result. -->

<div class='codeAndCanvas' data='clouds.frag'></div>

Zakrzywianie współrzędnych tekstury za pomocą szumu może być bardzo użyteczne, daje dużo frajdy, ale jest diabelnie trudne do opanowania. Jest to potężne narzędzie, ale potrzeba sporo doświadczenia, aby dobrze je wykorzystać. Przydatnym wariantem jest też przemieszczanie współrzędnych za pomocą pochodnej (gradientu) szumu. [Na tym pomyśle opiera się słynny artykuł Kena Perlina i Fabrice'a Neyreta o nazwie "flow noise"](http://evasion.imag.fr/Publications/2001/PN01/). Niektóre nowoczesne implementacje szumu Perlina zawierają wariant, który oblicza zarówno funkcję, jak i jej gradient. Jeśli gradient nie istnieje, zawsze możesz obliczyć skończone różnice (różnica między sąsiadującymi pikselami), aby go przybliżyć, chociaż jest to mniej dokładne i wymaga więcej pracy.

<!-- Warping the texture coordinates with noise in this manner can be very useful, a lot of fun, and fiendishly difficult to master. It's a powerful tool, but it takes quite a bit of experience to use it well. A useful tool for this is to displace the coordinates with the derivative (gradient) of the noise. [A famous article by Ken Perlin and Fabrice Neyret called "flow noise"](http://evasion.imag.fr/Publications/2001/PN01/) is based on this idea. Some modern implementations of Perlin noise include a variant that computes both the function and its analytical gradient. If the "true" gradient is not available for a procedural function, you can always compute finite differences to approximate it, although this is less accurate and involves more work. -->
