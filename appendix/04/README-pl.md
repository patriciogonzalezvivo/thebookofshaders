## Wprowadzenie dla osób przychodzących z JS
przez [Nicolas Barradeau](http://www.barradeau.com/)


Jeśli jesteś programistą JavaScript, prawdopodobnie nieco zaskoczy Cię treść tej książki.
Rzeczywiście, istnieje wiele różnic pomiędzy manipulowaniem wysokopoziomowym kodem JS a zagłębianiem się w świat shaderów.
Jednak w przeciwieństwie do niskopoziomowego języka asemblerowego, GLSL jest czytelny dla człowieka i jestem pewien, że po zrozumieniu jego specyfiki szybko zaczniesz go używać.

Zakładam, że masz podstawową (choć może płytką) wiedzę o JavaScript, ale także o Canvas API.
Jeśli nie, nie martw się – większość tej sekcji będzie dla Ciebie zrozumiała.

Nie będę zagłębiać się zbytnio w szczegóły, a niektóre kwestie mogą być _półprawdziwe_; nie oczekuj "wyczerpującego przewodnika", ale raczej

### WIELKI UŚCISK

JavaScript świetnie nadaje się do szybkiego prototypowania; wrzucasz garść losowych, nieotypowanych zmiennych i metod, możesz dynamicznie dodawać i usuwać członków klas, odświeżać stronę i sprawdzać, czy wszystko działa,
wprowadzać zmiany, odświeżać stronę, powtarzać – życie jest proste.
Możesz się więc zastanawiać, jaka jest różnica między JavaScriptem a GLSL.
W końcu oba działają w przeglądarce, oba służą do rysowania różnych efektownych rzeczy na ekranie i pod tym względem JS jest łatwiejszy w użyciu.

Główna różnica polega jednak na tym, że JavaScript jest językiem **interpretowanym**, podczas gdy GLSL jest językiem **kompilowanym**.
**Kompilowany** program jest wykonywany natywnie przez system operacyjny, jest niskopoziomowy i zazwyczaj szybki.
**Interpretowany** program wymaga [wirtualnej maszyny](https://en.wikipedia.org/wiki/Virtual_machine) (VM) do wykonania, jest wysokopoziomowy i zazwyczaj wolniejszy.


Gdy przeglądarka (czyli _JavaScriptowa **VM**_) **wykonuje** lub **interpretuje** fragment kodu JS, nie wie, jaka zmienna czym jest i jaka funkcja co robi (z wyjątkiem oczywistych przypadków, takich jak **TypedArrays**).
Dlatego nie może nic zoptymalizować _z góry_, więc potrzebuje trochę czasu, aby przeczytać Twój kod, **wywnioskować** (dedukować na podstawie użycia) typy Twoich zmiennych i metod,
a kiedy to możliwe, przekształci _część_ Twojego kodu w kod asemblerowy, który wykona się znacznie szybciej.

To powolny, mozolny i niesamowicie skomplikowany proces – jeśli interesują Cię szczegóły, polecam przyjrzeć się działaniu [silnika V8 w Chrome](https://developers.google.com/v8/).
Najgorsze jest to, że każda przeglądarka optymalizuje JS na swój sposób, a cały proces jest _ukryty_ przed użytkownikiem; jesteś bezsilny.

**Kompilowany** program nie jest interpretowany; system operacyjny go uruchamia, a jeśli program jest poprawny, zostaje wykonany.
To duża zmiana; jeśli zapomnisz o średniku na końcu linii, Twój kod jest niepoprawny i nie skompiluje się: Twój kod w ogóle nie przekształci się w program.

To surowe, ale tak właśnie działa **shader**: _skompilowany program wykonywany na GPU_.
Nie bój się! **Kompilator**, czyli część programu, która dba o to, aby Twój kod był poprawny, stanie się Twoim najlepszym przyjacielem.
Przykłady z tej książki oraz [edytor towarzyszący](http://editor.thebookofshaders.com/) są bardzo przyjazne użytkownikowi.
Powiedzą Ci, gdzie i dlaczego Twój program nie skompilował się, a następnie będziesz musiał wprowadzić poprawki – i za każdym razem, gdy shader będzie gotowy do kompilacji, zostanie on natychmiast wyświetlony.
To świetny sposób na naukę, ponieważ jest bardzo wizualny i tak naprawdę niczego nie możesz zepsuć.

Ostatnia uwaga: **shader** składa się z dwóch programów, **vertex shader** i **fragment shader**.
W skrócie, **vertex shader**, pierwszy program, otrzymuje geometrię jako dane wejściowe i przekształca ją w serię **pikseli** (lub *fragmentów*), które następnie przekazuje do
**fragment shader**, drugiego programu, który decyduje, jaki kolor nadać pikselom.
Ta książka koncentruje się głównie na tym drugim – we wszystkich przykładach geometria to prosty czworobok pokrywający cały ekran.

Więc! Gotowy?

No to ruszamy!

### Silne typowanie
![pierwszy wynik wyszukiwania dla 'strong type' w Google Images, 20.05.2016](vector.jpg)

Dla osób przychodzących z JS lub innego języka bez typów, **typowanie** zmiennych jest obcym konceptem, co sprawia, że **typowanie** stanowi najtrudniejszy krok w kierunku nauki GLSL.
**Typowanie**, jak sama nazwa wskazuje, oznacza, że musisz przypisać **typ** każdej zmiennej (oraz funkcjom, oczywiście).
To zasadniczo oznacza, że słowo **`var`** przestaje istnieć.
Polityka myślenia GLSL wymazała je z powszechnego języka i nie jesteś w stanie go używać, ponieważ... po prostu nie istnieje.

Zamiast używać magicznego słowa **`var`**, będziesz musiał _jawnie określić typ każdej używanej zmiennej_, dzięki czemu kompilator będzie widział tylko obiekty i prymitywy, które wie, jak efektywnie obsługiwać.
Minusem braku możliwości użycia słowa **`var`** i konieczności _jawnego określania wszystkiego_ jest to, że musisz znać typ wszystkich zmiennych i dobrze je rozumieć.
Spokojnie – jest ich niewiele, a do tego są dość proste (GLSL nie jest frameworkiem Java).

Może to brzmieć strasznie, ale ogólnie nie różni się to bardzo od tego, co robisz w JavaScript; jeśli zmienna jest typu `boolean`, oczekujesz, że będzie przechowywać `true` lub `false` i nic więcej.
Jeśli zmienna jest zadeklarowana jako `var uid = XXX;`, prawdopodobnie przechowasz w niej wartość całkowitą, a `var y = YYY;` _może_ odnosić się do wartości zmiennoprzecinkowej.
Co więcej, dzięki **silnemu typowaniu** nie będziesz tracił czasu na zastanawianie się, czy `X == Y` (albo czy `typeof X == typeof Y`? ... albo `typeof X !== null && Y...`... w każdym razie) – po prostu będziesz tego wiedział, a jeśli nie, kompilator Cię o tym poinformuje.

Oto **typy skalarne** (**skalar** określa ilość), których możesz używać w GLSL: `bool` (Boolean), `int` (liczba całkowita), `float` (liczba zmiennoprzecinkowa).
Istnieją też inne typy, ale nie ma co się przejmować – poniższy fragment pokazuje, jak deklarować **zmienne (`vars`)** (tak, użyłem zakazanego słowa) w GLSL:
```glsl
// wartość typu Boolean:
JS: var b = true;               GLSL: bool b = true;

// wartość typu Integer
JS: var i = 1;                  GLSL: int i = 1;

// wartość typu Float (liczba)
JS: var f = 3.14159;            GLSL: float f = 3.14159;
```
Nie jest to trudne, prawda? Jak wspomniałem, ułatwia to kodowanie, ponieważ nie tracisz czasu na sprawdzanie typu danej zmiennej.
W razie wątpliwości pamiętaj, że robisz to po to, aby Twój program działał o wiele szybciej niż w JS.

#### void
Istnieje typ `void`, który w przybliżeniu odpowiada `null`; jest on używany jako typ zwracany przez funkcję, która nic nie zwraca.
Nie możesz przypisać go do zmiennej.

#### boolean
Jak wiesz, wartości logiczne (Boolean) są najczęściej używane w testach warunkowych, np. `if( myBoolean == true ){}else{}`.
Choć rozgałęzianie warunkowe jest możliwe na CPU, [równoległa natura](http://thebookofshaders/01/) GLSL czyni to mniej sensownym.
Używanie instrukcji warunkowych jest często wręcz zniechęcane – książka przedstawia kilka alternatywnych technik rozwiązania tego problemu.

#### rzutowanie typów
Jak powiedział [Boromir](https://pl.wikipedia.org/wiki/Boromir): "Nie łączy się po prostu otypowanych prymitywów". W przeciwieństwie do JavaScript, GLSL nie pozwala na wykonywanie operacji pomiędzy zmiennymi o różnych typach.

This for instance:
```glsl
int     i = 2;
float   f = 3.14159;

// próba pomnożenia liczby całkowitej przez wartość zmiennoprzecinkową:
float   r = i * f;
```
nie zadziała, ponieważ próbujesz połączyć **_kota_** z **_żyrafą_**.
Rozwiązaniem jest użycie rzutowania typów; to _sprawi, że kompilator uwierzy_, że *`i`* jest typu `float`, nie zmieniając faktycznie typu *`i`*.
```glsl
// rzutowanie typu zmiennej całkowitej 'i' na float:
float   r = float( i ) * f;
```

Co jest ściśle równoważne przebraniu **_kota_** w **_żyrafi_ strój** i zadziała zgodnie z oczekiwaniami (`r` będzie wynikiem `i` x `f`).

Można **rzutować** dowolny z wymienionych typów na inny; zauważ, że rzutowanie `float` na `int` działa jak `Math.floor()`, ponieważ usuwa część dziesiętną.
Rzutowanie `float` lub `int` na `bool` zwróci `true`, jeśli wartość zmiennej nie wynosi zero.

#### konstruktor
**Typy** zmiennych są również swoimi własnymi **konstruktorami klas**; w rzeczywistości zmienna typu `float` może być traktowana jako _`instancja`_ klasy _`Float`_.

Następujące deklaracje są równie poprawne:

```glsl
int     i = 1;
int     i = int( 1 );
int     i = int( 1.9995 );
int     i = int( true );
```
Może się to nie wydawać znaczące dla typów `skalarnych`, ale nie różni się to zbytnio od **rzutowania** – nabierze sensu, gdy przejdziemy do sekcji dotyczącej *przeciążania*.

Ok, więc te trzy to `typy prymitywne`, rzeczy, bez których nie możesz żyć – ale oczywiście GLSL ma do zaoferowania więcej.

### Wektory
![pierwszy wynik wyszukiwania dla 'vector villain' w Google Images, 05.20.2016](vector.jpg)

W JavaScript, podobnie jak w GLSL, potrzebujesz bardziej zaawansowanych sposobów obsługi danych, dlatego przydają się **wektory**.
Przypuszczam, że już napisałeś klasę `Point` w JavaScript, która przechowuje razem wartość `x` i `y`, kod wyglądałby mniej więcej tak:
```glsl
// definicja 'klasy':
var Point = function( x, y ){
    this.x = x || 0;
    this.y = y || 0;
}

// i instancjonowałoby się ją tak:
var p = new Point( 100,100 );
```

Jak właśnie widzieliśmy, to jest TAK niepoprawne na TYLU poziomach! Po pierwsze, użycie słowa kluczowego **`var`**, potem okropne **`this`**, a następnie znowu **nieotypowane** wartości `x` i `y`...
Nie, to nie zadziała w świecie shaderów.

Zamiast tego GLSL udostępnia wbudowane struktury danych, które służą do przechowywania danych razem, mianowicie:

 * `bvec2`: 2-wymiarowy wektor Boolean, `bvec3`: 3-wymiarowy wektor Boolean, `bvec4`: 4-wymiarowy wektor Boolean
 * `ivec2`: 2-wymiarowy wektor Integer, `ivec3`: 3-wymiarowy wektor Integer, `ivec4`: 4-wymiarowy wektor Integer
 * `vec2`: 2-wymiarowy wektor Float, `vec3`: 3-wymiarowy wektor Float, `vec4`: 4-wymiarowy wektor Float

Natychmiast zauważyłeś, że dla każdego typu prymitywnego istnieje odpowiedni **wektor**, spryciarzu.
Z tego, co właśnie widzieliśmy, można wywnioskować, że `bvec2` przechowa dwie wartości typu `bool`, a `vec4` cztery wartości typu `float`.

Inną rzeczą wprowadzoną przez wektory jest liczba **wymiarów**; nie oznacza to, że do renderowania grafiki 2D używasz 2-wymiarowego wektora, a do 3D – 3-wymiarowego.
Co by wtedy reprezentował 4-wymiarowy wektor? (właściwie nazywa się tesseraktem lub hiperkostką)

Nie, **wymiary** oznaczają liczbę oraz typ **składowych** lub **zmiennych** przechowywanych w **wektorze**:
```glsl
// stwórzmy 2-wymiarowy wektor Boolean
bvec2 b2 = bvec2 ( true, false );

// stwórzmy 3-wymiarowy wektor Integer
ivec3 i3 = ivec3( 0,0,1 );

// stwórzmy 4-wymiarowy wektor Float
vec4 v4 = vec4( 0.0, 1.0, 2.0, 1. );
```
`b2` przechowuje dwie różne wartości logiczne, `i3` przechowuje trzy różne wartości całkowite, a `v4` cztery różne wartości zmiennoprzecinkowe.

Ale jak odczytać te wartości?
w przypadku `skalarów` odpowiedź jest oczywista – przy `float f = 1.2`; zmienna `f` przechowuje wartość `1.2`.
W przypadku **wektorów** jest to nieco inne i całkiem piękne.

#### akcesory
Istnieją różne sposoby dostępu do wartości
```glsl
// stwórzmy 4-wymiarowy wektor Float
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );
```
Aby odczytać te 4 wartości, możesz zrobić następująco:
```glsl
float x = v4.x;     // x = 0.0
float y = v4.y;     // y = 1.0
float z = v4.z;     // z = 2.0
float w = v4.w;     // w = 3.0
```
bułka z masłem; ale poniższe sposoby są równie poprawne w dostępie do Twoich danych:
```glsl
float x =   v4.x    =   v4.r    =   v4.s    =   v4[0];     // x = 0.0
float y =   v4.y    =   v4.g    =   v4.t    =   v4[1];     // y = 1.0
float z =   v4.z    =   v4.b    =   v4.p    =   v4[2];     // z = 2.0
float w =   v4.w    =   v4.a    =   v4.q    =   v4[3];     // w = 3.0
```

I spryciarzu, już zauważyłeś trzy rzeczy:
   * `X`, `Y`, `Z` i `W` są używane w programach 3D do reprezentacji wektorów 3D
   * `R`, `G`, `B` i `A` służą do kodowania kolorów oraz kanału alfa
   * `[0]`, `[1]`, `[2]` i `[3]` oznaczają, że mamy dostęp do wartości w sposób losowy (tablica indeksowana)

W zależności od tego, czy manipulujesz współrzędnymi 2D czy 3D, kolorem z lub bez kanału alfa, czy też po prostu różnymi zmiennymi, możesz wybrać najbardziej odpowiedni typ i rozmiar **wektora**.
Zazwyczaj współrzędne 2D i wektory (w sensie geometrycznym) przechowywane są jako `vec2`, `vec3` lub `vec4`, kolory jako `vec3` lub `vec4` (jeśli potrzebujesz kanału alfa), ale nie ma ograniczeń co do sposobu użycia wektorów.
Na przykład, jeśli chcesz przechować tylko jedną wartość logiczną w `bvec4`, jest to możliwe, ale to marnotrawstwo pamięci.

**uwaga**: w shaderze wartości kolorów (`R`, `G`, `B` i `A`) są normalizowane, mieszczą się w przedziale od 0 do 1, a nie od 0 do 0xFF, dlatego lepiej użyć Float `vec4` niż Integer `ivec4` do ich przechowywania.

Już nieźle, ale to nie wszystko!

#### swizzle

Można zwrócić więcej niż jedną wartość jednocześnie; powiedzmy, że potrzebujesz tylko składowych `X` i `Y` z `vec4`, w JavaScript musiałbyś napisać coś takiego:
```glsl
var needles = [0, 1]; // pozycja 'x' i 'y' w naszej strukturze danych
var a = [ 0,1,2,3 ]; // nasza struktura danych 'vec4'
var b = a.filter( function( val, i, array ) {
return needles.indexOf( array.indexOf( val ) ) != -1;
});
// b = [ 0, 1 ]

// albo bardziej bezpośrednio:
var needles = [0, 1];
var a = [ 0,1,2,3 ]; // our 'vec4' data structure
var b = [ a[ needles[ 0 ] ], a[ needles[ 1 ] ] ]; // b = [ 0, 1 ]
```
Brzydko. W GLSL możesz je uzyskać w ten sposób:
```glsl
// stwrórz 4-wymiarowy wektor Float
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );

// i odczytaj tylko 'x' i 'y'
vec2 xy =   v4.xy; //   xy = vec2( 0.0, 1.0 );
```
Co tu się stało?! Gdy **skonkatenujesz akcesory**, GLSL elegancko zwraca podzbiór wartości, o które prosiłeś, w najbardziej odpowiednim formacie **wektora**.
Rzeczywiście, wektor to struktura danych o **losowym dostępie**, podobna do tablicy w JavaScript.
Tak więc, nie tylko możesz pobrać podzbiór swoich danych, ale także określić **kolejność**, w jakiej mają być zwrócone – może to odwrócić kolejność składowych wektora:
```glsl
// stwórz 4-wymiarowy wektor: R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

// i odczytaj go w kolejności: A,B,G,R
vec4 backwards = color.abgr; // backwards = vec4( 1.0, 0.0, 0.8, 0.2 );
```
I oczywiście, możesz zapytać o tę samą składową wielokrotnie:
```glsl
// stwórz 4-wymiarowy wektor: R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

// i odczytaj GAG (Green, Alpha, Green) vec3 z kanałów G i A
vec3 GAG = color.gag; // GAG = vec4( 0.8, 1.0, 0.8 );
```

Jest to niezwykle przydatne, aby łączyć części wektorów, wyodrębniać tylko kanały rgb z koloru RGBA itp.


#### przeciążaj wszystko!

W sekcji o typach wspomniałem o **konstruktorze** i tu mamy kolejną świetną cechę GLSL – **przeciążanie**.
Dla tych, którzy nie wiedzą, **przeciążanie** operatora lub funkcji oznacza mniej więcej: _"zmianę zachowania danego operatora lub funkcji w zależności od operandów/argumentów"_.
Przeciążanie nie jest dozwolone w JavaScript, więc na początku może to wydawać się dziwne, ale jestem pewien, że gdy się do tego przyzwyczaisz, zastanowisz się, dlaczego nie zostało to zaimplementowane w JS (krótka odpowiedź, *typowanie*).

Najprostszy przykład przeciążania operatorów wygląda następująco:

```glsl
vec2 a = vec2( 1.0, 1.0 );
vec2 b = vec2( 1.0, 1.0 );
// przeciążone dodawanie
vec2 c = a + b;     // c = vec2( 2.0, 2.0 );
```
CO? Czyli można dodawać rzeczy, które nie są liczbami?!

Tak, dokładnie. Oczywiście dotyczy to wszystkich operatorów (`+`, `-`, `*` oraz `/`), ale to dopiero początek.
Rozważ poniższy fragment:
```glsl
vec2 a = vec2( 0.0, 0.0 );
vec2 b = vec2( 1.0, 1.0 );
// przeciążony konstruktor
vec4 c = vec4( a , b );         // c = vec4( 0.0, 0.0, 1.0, 1.0 );
```
Zbudowaliśmy `vec4` z dwóch `vec2`, przy czym nowy `vec4` użył `a.x` i `a.y` jako składowych `X` i `Y` wektora `c`.
Następnie wziął `b.x` i `b.y` i użył ich jako składowych `Z` i `W`.

Tak właśnie działa przeciążony konstruktor vec4, który akceptuje różne argumenty.
Oznacza to, że wiele wersji tej samej funkcji o różnych sygnaturach może współistnieć w jednym programie, na przykład następujące deklaracje są wszystkie poprawne:
```glsl
vec4 a = vec4(1.0, 1.0, 1.0, 1.0);
vec4 a = vec4(1.0);// x, y, z, w wszystkie są równe 1.0
vec4 a = vec4( v2, float, v4 );// vec4( v2.x, v2.y, float, v4.x );
vec4 a = vec4( v3, float );// vec4( v3.x, v3.y, v3.z, float );
etc.
```
Jedyne, na co musisz zwrócić uwagę, to dostarczenie wystarczającej liczby argumentów, aby wypełnić Twój **wektor**.

Ostatnia rzecz, możesz przeciążać wbudowane funkcje w swoim programie, aby przyjmowały argumenty, dla których nie zostały zaprojektowane (choć nie powinno się to zdarzać zbyt często).

#### inne typy
Wektory są fajne, to sedno Twojego shadera.
Istnieją inne prymitywy, takie jak macierze (Matrices) i próbki tekstur (Texture samplers), które zostaną omówione później w książce.

Możemy także używać tablic (Arrays). Oczywiście muszą być typowane, a przy tym występują pewne pułapki:
 * mają ustalony rozmiar
 * nie możesz używać metod push(), pop(), splice() itp., a właściwość ```length``` nie istnieje
 * nie możesz od razu zainicjalizować ich wartościami
 * musisz przypisywać wartości pojedynczo

to nie zadziała:
```glsl
int values[3] = [0,0,0];
```
ale to zadziała:
```glsl
int values[3];
values[0] = 0;
values[1] = 0;
values[2] = 0;
```
To jest w porządku, gdy znasz swoje dane lub masz małe tablice wartości.
Jeśli chcesz bardziej ekspresyjnego sposobu deklaracji zmiennej,
możesz użyć również typu ```struct```. Są one jak _obiekty_ bez metod;
pozwalają przechowywać i uzyskiwać dostęp do wielu zmiennych w jednym obiekcie.
```glsl
struct ColorStruct {
    vec3 color0;
    vec3 color1;
    vec3 color2;
}
```
następnie możesz ustawiać i odczytywać wartości _kolorów_ w następujący sposób:
```glsl
// zainicjuj struct z jakimiś wartościami
ColorStruct sandy = ColorStruct( 	vec3(0.92,0.83,0.60),
                                    vec3(1.,0.94,0.69),
                                    vec3(0.95,0.86,0.69) );

// odczytaj wartość ze struct
sandy.color0 // vec3(0.92,0.83,0.60)
```
To lukier składniowy, ale może pomóc w pisaniu bardziej przejrzystego kodu, przynajmniej takiego, do którego jesteś przyzwyczajony.

#### instrukcje i warunki

Struktury danych są przydatne, ale może będziesz musiał iterować lub wykonywać testy warunkowe w pewnym momencie.
Na szczęście składnia jest bardzo zbliżona do tej w JavaScript.
Warunek wygląda tak:
```glsl
if( warunek ){
    // prawda
}else{
    // fałsz
}
```
Pętla for zazwyczaj wygląda tak:
```glsl
const int count = 10;
for( int i = 0; i <= count; i++){
    // zrób coś
}
```
lub z iteratorem typu float:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    // zrób coś
}
```
Zauważ, że `count` musi być zdefiniowane jako stała.
Oznacza to, że poprzedzasz typ kwalifikatorem `const`, o czym opowiem za chwilę.

Mamy również instrukcje ```break``` i ```continue```:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    if( i < 5. )continue;
    if( i >= 8. )break;
}
```
Miej na uwadze, że na niektórych urządzeniach instrukcja ```break``` może nie działać zgodnie z oczekiwaniami i pętla nie przerwie iteracji wcześniej.

Ogólnie rzecz biorąc, powinieneś utrzymywać liczbę iteracji na możliwie najniższym poziomie i unikać pętli oraz instrukcji warunkowych tak często, jak to możliwe.


#### kwalifikatory

Oprócz typów zmiennych, GLSL używa **kwalifikatorów**.
Krótko mówiąc, kwalifikatory pomagają kompilatorowi zrozumieć, jaka jest rola danej zmiennej.
Na przykład, niektóre dane mogą być dostarczane tylko przez CPU do GPU, nazywamy je **atrybutami** i **uniformami**.
**Atrybuty** są zarezerwowane dla vertex shaderów, a **uniformy** mogą być używane zarówno w vertex, jak i fragment shaderach.
Jest też kwalifikator ```varying```, służący do przekazywania zmiennych między vertex a fragment shaderem.

Nie będę zagłębiać się tutaj w szczegóły, ponieważ skupiamy się głównie na **fragment shaderze**, ale później w książce zobaczysz coś takiego:
```glsl
uniform vec2 u_resolution;
```
Widzisz, co zrobiliśmy? Dodaliśmy kwalifikator ```uniform``` przed typem zmiennej.
Oznacza to, że rozdzielczość kanwy, nad którą pracujemy, jest przekazywana do shadera z CPU.
Szerokość kanwy zapisana jest w komponencie x, a wysokość w komponencie y 2-wymiarowego wektora.

Gdy kompilator napotka zmienną poprzedzoną tym kwalifikatorem, upewni się, że nie możesz zmieniać tych wartości w czasie wykonywania programu.

To samo dotyczy naszej zmiennej ```count```, która była limitem w pętli ```for```:
```glsl
const float count = 10.;
for( ... )
```
Kiedy używamy kwalifikatora ```const```, kompilator upewni się, że wartość zmiennej zostanie ustawiona tylko raz, w przeciwnym razie nie jest to stała.

Istnieją trzy dodatkowe kwalifikatory używane w sygnaturach funkcji: in, out oraz inout.
W JavaScript, gdy przekazujesz prymitywne argumenty do funkcji, ich wartość jest tylko do odczytu, a jeśli zmienisz ich wartość wewnątrz funkcji,
zmiany nie mają wpływu na zmienną poza funkcją.
```glsl
function banana( a ){
    a += 1;
}
var value = 0;
banana( value );
console.log( value );// > 0 ; zmiany nie są brane pod uwagę poza funkcją
```

With arguments qualifiers, you can specify the behaviour of the arguments:
  * ```in``` will be read-only ( default )
  * ```out```  write-only: you can't read the value of this argument but you can set it
  * ```inout```  read-write: you can both get and set the value of this variable

Przepisanie funkcji banana do GLSL wyglądałoby tak:
```glsl
void banana( inout float a ){
    a += 1.;
}
float A = 0.;
banana( A ); // teraz A = 1.;
```
To bardzo różni się od JS i jest również potężne, ale nie musisz jawnie określać kwalifikatorów w sygnaturze (domyślnie są one tylko do odczytu).

#### przestrzeń i współrzędne

Ostatnia uwaga: w DOM oraz w 2D Canvas jesteśmy przyzwyczajeni, że oś Y wskazuje w dół.
Ma to sens w kontekście DOM, ponieważ odpowiada sposobowi, w jaki rozwija się strona internetowa – pasek nawigacyjny na górze, zawartość rozciągająca się ku dołowi.
W kanwie WebGL oś Y jest odwrócona: Y wskazuje w górę.

Oznacza to, że punkt początkowy, czyli (0,0), znajduje się w lewym dolnym rogu kontekstu WebGL, a nie w lewym górnym, jak ma to miejsce w 2D Canvas.
Współrzędne tekstur podlegają tej zasadzie, co na początku może być nieintuicyjne.

## I to wszystko!
Oczywiście moglibyśmy zagłębić się w różne koncepcje, ale jak wspomniano wcześniej, chodziło o to, aby dać WIELKI UŚCISK nowoprzybyłym.
To sporo materiału do przyswojenia, ale z cierpliwością i praktyką stanie się to coraz bardziej naturalne.

Mam nadzieję, że część z tego okaże się przydatna. A teraz, co powiesz na rozpoczęcie swojej podróży przez tę książkę?
