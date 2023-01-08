# Początki
## Czym jest fragment shader?

W poprzednim rozdziale nazwaliśmy shadery ekwiwalentem prasy drukarskiej Gutenberga dla grafiki. Dlaczego? A co ważniejsze: czym jest shader?

![Od "litera po literze" do "strona po stronie", po prawej: William Blades (1891), po lewej: Rolt-Wheeler (1920).](print.png)

Jeżeli masz doświadczenie w rysowaniu z użyciem komputera, to wiesz, że proces ten polega na rysowaniu kółek, prostokątów, linii oraz trójkątów do momentu skomponowania pożądanego obrazu. Proces ten jest bardzo podobny do pisania listów lub książek odręcznie - jest to zbiór instrukcji wykonujących zadanie po zadaniu.

If you already have experience making drawings with computers, you know that in that process you draw a circle, then a rectangle, a line, some triangles until you compose the image you want. That process is very similar to writing a letter or a book by hand - it is a set of instructions that do one task after another.

Shader jest również zbiorem instrukcji, ale wykonywanych równocześnie dla każdego piksela na ekranie. Oznacza to, że kod, który piszesz musi działać inaczej w zależności od pozycji piksela na ekranie. Podobnie jak maszyna drukarska, twój program będzie działał jak funkcja matematyczna otrzymująca pozycję piksela i zwracająca jego kolor. Po skompilowaniu twój program będzie działał błyskawicznie.

Shaders are also a set of instructions, but the instructions are executed all at once for every single pixel on the screen. That means the code you write has to behave differently depending on the position of the pixel on the screen. Like a type press, your program will work as a function that receives a position and returns a color, and when it's compiled it will run extraordinarily fast.

![Chińska ruchoma czcionka](typepress.jpg)

## Dlaczego shadery są szybkie?

Aby odpowiedzieć na pytanie, omówmy cud *przetwarzania równoległego* (ang. *parallel processing*)

To answer this, I present the wonders of *parallel processing*.

Wyobraź sobie procesor twojego komputera jako pipeline, przez który przechodzą różnorakie zadania (jak na linii produkcyjnej w fabryce). Niektóre zadania są większe od innych, co oznacza, że wymagają więcej czasu i energii. Mówimy wtedy, że wymagają więcej *mocy obliczeniowej* (ang. *processing power*). Ze względu na architekturę współczesnych komputerów, zadania te wykonują się seryjnie (jeden po drugim) - każde zadanie musi poczekać, dopóki poprzednie zadanie nie zostanie ukończone. Jednakże, współczesne komputery posiadają zwykle więcej niż jedną jednostkę przetwarzają (np. 2, 4 lub 8 rdzeni procesora), które funkcjonują jak pomniejsze pipeline'y. Każda taki pomniejsze pipeline nazywany jest również *wątkiem* (ang. *thread*).

Imagine the CPU of your computer as a big industrial pipe, and every task as something that passes through it - like a factory line. Some tasks are bigger than others, which means they require more time and energy to deal with. We say they require more processing power. Because of the architecture of computers the jobs are forced to run in a series; each job has to be finished one at a time. Modern computers usually have groups of four processors that work like these pipes, completing tasks one after another to keep things running smoothly. Each pipe is also known as a *thread*.

![CPU](00.jpeg)

Gry video i inne aplikacje graficzne wymagają zdecydowanie więcej mocy obliczeniowej niż większość programów, gdyż muszą wykonywać ogromne ilości operacji piksel po pikselu. Nie dość, że każdy pojedynczy piksel musi być obliczony, to w wypadku gier 3D dochodzą do tego obliczania geometryczne i obliczenie perspektywy.

Video games and other graphic applications require a lot more processing power than other programs. Because of their graphic content they have to do huge numbers of pixel-by-pixel operations. Every single pixel on the screen needs to be computed, and in 3D games geometries and perspectives need to be calculated as well.

Wróćmy do naszej metafory pipeline'u. Każdy piksel na ekranie reprezentuje proste zadanie. Indywidualnie zadania te nie stanowią problemu dla CPU, jednak sytuacja zmienia się, gdy takie zadanie musi być wykonane dla każdego piksela na ekranie. Oznacza to, że na starym monitorze 800x600 na jedną klatkę przypada 480.000 obliczeń, a na jedną sekundę - 14.400.000. Właśnie tak! Skala problemu może przeciążyć mikroprocesor. Na współczesnym monitorze 2560x1440 przy 60 FPS osiągamy 221.356.800 obliczeń na sekundę. Jak inżynierowie graficzni rozwiązują ten problem?

Let's go back to our metaphor of the pipes and tasks. Each pixel on the screen represents a simple small task. Individually each pixel task isn't an issue for the CPU, but (and here is the problem) the tiny task has to be done to each pixel on the screen! That means in an old 800x600 screen, 480,000 pixels have to processed per frame which means 14,400,000 calculations per second! Yes! That’s a problem big enough to overload a microprocessor. In a modern 2880x1800 retina display running at 60 frames per second that calculation adds up to 311,040,000 calculations per second. How do graphics engineers solve this problem?

![](03.jpeg)

Z pomocą przychodzi przetwarzanie równoległe. Zamiast kilku dużych, potężnych mikroprocesorów (lub *rur*) lepiej mieć wiele małych mikroprocesorów działających równolegle. Tak właśnie działa procesor graficzna (GPU) w karcie graficznej.

This is when parallel processing becomes a good solution. Instead of having a couple of big and powerful microprocessors, or *pipes*, it is smarter to have lots of tiny microprocessors running in parallel at the same time. That’s what a Graphic Processor Unit (GPU) is.

![GPU](04.jpeg)

Wyobraź sobie mały mikroprocesor jako tabele rur, a dane jako piłeczkę ping pongową. 14.400.000 piłeczek ping pongowych na sekundę może zablokować prawie każdą rurę. Ale tabela 800x600 malutkich rur przyjmująca co sekundę 30 fal po 480.000 pikseli poradzi sobie z nimi bez problemu. Tak samo działa to na wyższych rozdzielczościach - im więcej równolegle pracującego hardware'u, tym większy potok, z którym sobie poradzi.

Picture the tiny microprocessors as a table of pipes, and the data of each pixel as a ping pong ball. 14,400,000 ping pong balls a second can obstruct almost any pipe. But a table of 800x600 tiny pipes receiving 30 waves of 480,000 pixels a second can be handled smoothly. This works the same at higher resolutions - the more parallel hardware you have, the bigger the stream it can manage.

Inną "super umiejętnością" GPU jest fakt, że złożone funkcje matematyczne wykonywane są bezpośrednio na poziomie hardware'u przez mikroczipy, a nie przez software. Skutkiem tego są super szybkie operacje trygonometryczne i macierzowe.

Another “super power” of the GPU is special math functions accelerated via hardware, so complicated math operations are resolved directly by the microchips instead of by software. That means extra fast trigonometrical and matrix operations - as fast as electricity can go.

## Czym jest GLSL?

GLSL oznacza "Open**GL** **S**hading **L**anguage" i stanowi standard pisania shaderów, który zobaczysz następnych rozdziałach tej książki. W zależności od hardware'u i systemu operacyjnego wyróżnia się też inne rodzaje shaderów. Tutaj skupimy się na specyfikacji OpenGL uregulowanej przez [Khronos Group](https://www.khronos.org/opengl/). Zrozumienie historii OpenGL może pomóc w zrozumieniu wielu dziwnych konwencji; w tym celu polecam zajrzeć do: [openglbook.com/chapter-0-preface-what-is-opengl.html](http://openglbook.com/chapter-0-preface-what-is-opengl.html).

GLSL stands for openGL Shading Language, which is the specific standard of shader programs you'll see in the following chapters. There are other types of shaders depending on hardware and Operating Systems. Here we will work with the openGL specs regulated by [Khronos Group](https://www.khronos.org/opengl/). Understanding the history of OpenGL can be helpful for understanding most of its weird conventions, for that I recommend taking a look at: [openglbook.com/chapter-0-preface-what-is-opengl.html](http://openglbook.com/chapter-0-preface-what-is-opengl.html)

## Dlaczego shadery budzą postrach?

Jak to mówią: "with great power comes great responsibility". Stosuje się to również do obliczeń równoległych - potężne rozwiązania architektoniczne w GPU wiążą się również z pewnymi ograniczeniami.

As Uncle Ben said “with great power comes great responsibility,” and parallel computation follows this rule; the powerful architectural design of the GPU comes with its own constraints and restrictions.

Aby wątki mogły działać równolegle, muszą być od siebie niezależne. Mówimy, że wątki są *ślepe* na to, co robi reszta wątków. Ograniczenie to implikuje, że dane muszą "płynąć w ten samą stronę" - nie jest możliwe sprawdzić wynik innego wątku, zmodyfikować jego wejście albo przekazać wyjście jednego wątku do wejścia drugiego.

In order to run in parallel every pipe, or thread, has to be independent from every other thread. We say the threads are *blind* to what the rest of the threads are doing. This restriction implies that all data must flow in the same direction. So it’s impossible to check the result of another thread, modify the input data, or pass the outcome of a thread into another thread. Allowing thread-to-thread communications puts the integrity of the data at risk.

Poza tym GPU odpowiada za to, żeby każdy wątek miał coś do roboty, i żeby otrzymał dane potrzebne do jej wykonania. Nie jest możliwe, aby wątek wiedział, co robił sekundę temu. Mógł rysować przycisk w UI systemu operacyjnego, a potem renderować fragment nieba w grze wideo, a jeszcze potem wyświetlać treść maila. Każdy wątek jest nie tylko **ślepy**, ale również **bez pamięci**. Te cechy sprawiają, że pisanie shaderów nie cieszy się dużą popularnością wśród początkujących programistów.

Also the GPU keeps the parallel micro-processor (the pipes) constantly busy; as soon as they get free they receive new information to process. It's impossible for a thread to know what it was doing in the previous moment. It could be drawing a button from the UI of the operating system, then rendering a portion of sky in a game, then displaying the text of an email. Each thread is not just **blind** but also **memoryless**. Besides the abstraction required to code a general function that changes the result pixel by pixel depending on its position, the blind and memoryless constraints make shaders not very popular among beginning programmers.

Ale nie martw się! W następnych rozdziałąch nauczymy się, krok po kroku, prostych i zaawansowanych obliczeń shadingowych. Jeżeli czytasz to we współczesnej przeglądarce, to z pewnością docenisz zabawę z interaktywnymi przykładami. Ale nie przedłużajmy! Naciśnij *Next >>* aby przejść dalej.

Don't worry! In the following chapters, we will learn step-by-step how to go from simple to advanced shading computations. If you are reading this with a modern browser, you will appreciate playing with the interactive examples. So let's not delay the fun any longer and press *Next >>* to jump into the code!
