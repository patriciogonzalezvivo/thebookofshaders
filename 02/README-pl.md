## Witaj świecie!

Zazwyczaj przykład "Hello world!" stanowi pierwszy krok przy nauce nowego języka. Jest to prosty jednolinijkowy program, który zwraca pełną entuzjazmu wiadomość powitalną i tym samym zapowiada nadchodzące przygody. 

<!-- Usually the "Hello world!" example is the first step to learning a new language. It's a simple one-line program that outputs an enthusiastic welcoming message and declares opportunities ahead. -->

W świecie GPU renderowanie tekstu jest jednak zbyt skomplikowanym zadaniem dla żółtodzioba. Zamiast tego wybierzemy jasny, serdeczny kolor by wykrzyczeć naszą ekscytację! 

<!-- In GPU-land rendering text is an overcomplicated task for a first step, instead we'll choose a bright welcoming color to shout our enthusiasm! -->

<div class="codeAndCanvas" data="hello_world.frag"></div>

Jeżeli czytasz tę książkę w przeglądarce, powyższy blok kodu jest interaktywny. Oznacza to, że możesz edytować dowolną linijkę kodu w celach eksploracyjnych. Shader kompiluje się na bieżąco, więc zmiany widoczne będą natychmiast. Spróbuj pozmieniać wartości w linijce 8. 

<!-- If you are reading this book in a browser the previous block of code is interactive. That means you can click and change any part of the code you want to explore. Changes will be updated immediately thanks to the GPU architecture that compiles and replaces shaders *on the fly*. Give it a try by changing the values on line 8. -->

Choć kod jest prosty, to możemy wyciągnąć z niego ważne wnioski:

1.  Podobnie jak w C, GLSL ma jedną funkcje `main`. Pod koniec zwraca ona kolor.

2. Finalny kolor piksela przypisywany jest do zarezerowanej zmiennej globalnej `gl_FragColor`.

3. Ten C-podobny język ma wbudowane *zmienne* (jak `gl_FragColor`), *funkcje* i *typy*. W aktualnym przykładzie występuje jedynie typ `vec4`, oznaczający czterowymiarowy wektor zmiennoprzecinkowy (ang. "float vector"). Później zobaczymy również takie typy jak `vec3`, `vec2` oraz znajome `float`, `int` i `bool`.

4. Patrząc na typ `vec4`, możemy wywnioskować, że jego cztery argumenty odnoszą się do kanałów CZERWONEGO, ZIELONEGO, NIEBIESKIEGO i ALPHA. Widać też, że jego wartości są *znormalizowane*, więc znajdują się w zakresie od `0.0` do `1.0`. Później zobaczymy, jak normalizowanie wartości pomaga w *mapowaniu* wartości między zakresami.

5. Kolejną ważną C-podobną własnością w tym przykładzie jest obecność makr preprocessora. Dzięki nim można definiować zmienne globalne za pomocą `#define` oraz operacje warunkowe za pomocą `#ifdef` ("if defined"), `#ifndef` ("if not defined") i `#endif`. Wszystkie makra zaczynają się od płotka `#` i ewaluowane są podczas procesu prekompilacji poprzedzającego kompilację. W naszym powyższym przykładzie linijka 2 kompilowana jest tylko wtedy, gdy zmienna `GL_ES` jest zdefiniowana (co występuje na urządzeniach mobilnych i w przeglądarkach). 

<!-- Although these simple lines of code don't look like a lot, we can infer substantial knowledge from them:

1. Shader Language has a single `main` function that returns a color at the end. This is similar to C.

2. The final pixel color is assigned to the reserved global variable `gl_FragColor`.

3. This C-flavored language has built in *variables* (like `gl_FragColor`), *functions* and *types*. In this case we've just been introduced to `vec4` that stands for a four dimensional vector of floating point precision. Later we will see more types like `vec3` and `vec2` together with the popular: `float`, `int` and `bool`.

4. If we look closely to the `vec4` type we can infer that the four arguments respond to the RED, GREEN, BLUE and ALPHA channels. Also we can see that these values are *normalized*, which means they go from `0.0` to `1.0`. Later, we will learn how normalizing values makes it easier to *map* values between variables.

5. Another important *C feature* we can see in this example is the presence of preprocessor macros. Macros are part of a pre-compilation step. With them it is possible to `#define` global variables and do some basic conditional operation (with `#ifdef` and `#endif`). All the macro commands begin with a hashtag (`#`). Pre-compilation happens right before compiling and copies all the calls to `#defines` and check `#ifdef` (is defined) and `#ifndef` (is not defined) conditionals. In our "hello world!" example above, we only insert the line 2 if `GL_ES` is defined, which mostly happens when the code is compiled on mobile devices and browsers. -->

6. Typy zmiennoprzecinkowe są kluczowe w shaderach, więc ich  poziom precyzji (ang. *precision*) ma ogromne znaczenie. Niższa precyzja oznacza szybsze renderowanie, ale kosztem jakości. Możesz być wybredny i określać precyzję każdej zmiennej zmiennoprzecinkowej z osobna. W linijce 2 (`precision mediump float;`) ustawiamy średnią precyzję zmiennych zmiennoprzecinkowych ("mediump", bo "medium precision"). Możemy też ustawić ją jako niską (`precision lowp float;`) lub wysoką (`precision highp float;`).

7. Ostatni i chyba najważniejszy szczegół specyfikacji GLSL: nie ma gwarancji, że zmienne będą automatycznie castowane (np. z `int` do `float` przy dzieleniu liczby 5 przez 2). Producenci GPU mogą stosować przeróżne optymalizacje w kartach graficznych, ale muszą przy tym przestrzegać pewnych wytycznych. Automatyczne castowanie nie jest jednym z nich. W naszym przykładzie `vec4` ma precyzję zmiennoprzecinkową i dlatego jego argumenty wymagają `float`ów. Przyzwyczaj się do stawiania kropek (`.`) we `float`ach (`1.` lub `1.0`, a nie `1`), jeżeli nie chcesz spędzić godzin przy debugowaniu. Poniższy kod nie zawsze będzie, zatem, działał:

```glsl
void main() {
    gl_FragColor = vec4(1,0,0,1);	// ERROR
}
```

Czas na ćwiczenia! Pamiętaj, że w wypadku błędu kompilacji pokaże się informacje o błędzie i linijce w której wystąpił, a kanwa zmieni kolor na biały.

* Spróbuj zamienić `float`y na `int`y. Jeśli kod się nie kompiluje, to widocznie twoja karta graficzna tego nie toleruje

* Zakomentuj linię 8

* Stwórz osobną funkcję, która zwraca dowolny kolor i użyj jej w `main()`. Wskazówka: poniższy kod zwraca kolor czerwony:

```glsl
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```

* Jest wiele sposobów tworzenia typu `vec4` - spróbuj je znaleźć. Jeden z nich wygląda tak:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Choć przykład ten nie jest zbyt ekscytujący, stanowi ważną podstawę. W następnych rozdziałach zobaczymy, jak zmienić kolor piksela z pomocą inputu przestrzennego (położenie piksela na ekranie) i temporalnego (okres czasu od momentu załadowania się strony).
