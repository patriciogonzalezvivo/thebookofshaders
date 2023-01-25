## Macierze 2D

<canvas id="custom" class="canvas" data-fragment-url="matrix.frag"  width="700px" height="200px"></canvas>

### Translacja

W poprzednim rozdziale dowiedzieliśmy się, jak tworzyć różne kształty - sztuczka z przesuwaniem tych kształtów polega na przesuwaniu samego układu współrzędnych. Możemy to osiągnąć poprzez proste dodanie wektora do zmiennej ``st``, zawierającej położenie każdego fragmentu. Powoduje to przesunięcie całego układu współrzędnych.

<!-- In the previous chapter we learned how to make some shapes - the trick to moving those shapes is to move the coordinate system itself. We can achieve that by simply adding a vector to the ```st``` variable that contains the location of each fragment. This causes the whole space coordinate system to move. -->

![](translate.jpg)

Łatwiej jest to zobaczyć niż wytłumaczyć, zatem:

*Odkomentuj linijkę 35 poniższego kodu, by zobaczyć jak przestrzeń się przesuwa.

<!-- This is easier to see than to explain, so to see for yourself:

* Uncomment line 35 of the code below to see how the space itself moves around. -->

<div class="codeAndCanvas" data="cross-translate.frag"></div>

Spróbuj teraz wykonać następujące ćwiczenie:

* Używając ``u_time`` wraz z funkcjami kształtującymi poruszaj małym krzyżem w ciekawy sposób. Poszukaj interesującego cię ruchu i spróbuj sprawić, by krzyż poruszał się w ten sam sposób. Przydatne może być nagranie najpierw czegoś z "prawdziwego świata" - może to być przypływ i odpływ fal, ruch wahadła, odbijająca się piłka, przyspieszający samochód, zatrzymujący się rower.

### Rotacja

Aby obracać obiekty musimy również poruszać całym układem przestrzennym. Do tego celu będziemy używać [macierzy](http://en.wikipedia.org/wiki/Matrix_%28mathematics%29). Macierz to uporządkowany zbiór liczb w kolumnach i wierszach. Wektory są mnożone przez macierze według ściśle określonych reguł w celu zmodyfikowania wartości wektora w określony sposób.

[![wpis Wikipedii dotyczący macierzy](matrixes.png)](https://en.wikipedia.org/wiki/Matrix)

GLSL posiada natywne wsparcie dla dwu, trzy i czterowymiarowych macierzy: [``mat2``](../glossary/?search=mat2) (2x2), [``mat3``](../glossary/?search=mat3) (3x3) i [``mat4``](../glossary/?search=mat4) (4x4). GLSL obsługuje również mnożenie macierzy (``*``) oraz funkcję specyficzną dla macierzy ([``matrixCompMult()``](../glossary/?search=matrixCompMult)).

Na podstawie tego, jak zachowują się macierze, możliwe jest skonstruowanie macierzy w celu wytworzenia określonych zachowań. Na przykład możemy użyć macierzy do translacji wektora:

<!-- Now try the following exercise:

* Using ```u_time``` together with the shaping functions move the small cross around in an interesting way. Search for a specific quality of motion you are interested in and try to make the cross move in the same way. Recording something from the "real world" first might be useful - it could be the coming and going of waves, a pendulum movement, a bouncing ball, a car accelerating, a bicycle stopping.

### Rotations

To rotate objects we also need to move the entire space system. For that we are going to use a [matrix](http://en.wikipedia.org/wiki/Matrix_%28mathematics%29). A matrix is an organized set of numbers in columns and rows. Vectors are multiplied by matrices following a precise set of rules in order to modify the values of the vector in a particular way.

[![Wikipedia entry for Matrix (mathematics) ](matrixes.png)](https://en.wikipedia.org/wiki/Matrix)

GLSL has native support for two, three and four dimensional matrices: [```mat2```](../glossary/?search=mat2) (2x2), [```mat3```](../glossary/?search=mat3) (3x3) and [```mat4```](../glossary/?search=mat4) (4x4). GLSL also supports matrix multiplication  (```*```) and a matrix specific function ([```matrixCompMult()```](../glossary/?search=matrixCompMult)).

Based on how matrices behave it's possible to construct matrices to produce specific behaviors. For example we can use a matrix to translate a vector: -->

![](3dtransmat.png)

Co ciekawsze, możemy użyć macierzy do obrócenia całego układu współrzędnych

<!-- More interestingly, we can use a matrix to rotate the coordinate system: -->

![](rotmat.png)

Spójrz na poniższy kod funkcji, która konstruuje dwuwymiarową macierz rotacji. Funkcja ta oparta jest na [wzorze](http://en.wikipedia.org/wiki/Rotation_matrix) dla dwuwymiarowych wektorów, aby obrócić współrzędne wokół punktu ``vec2(0,0)``.

<!-- Take a look at the following code for a function that constructs a 2D rotation matrix. This function follows the above [formula](http://en.wikipedia.org/wiki/Rotation_matrix) for two dimensional vectors to rotate the coordinates around the ```vec2(0.0)``` point. -->

```glsl
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
```

Zgodnie ze sposobem, w jaki rysowaliśmy kształty, nie jest to dokładnie to, czego chcemy. Nasz krzyż jest rysowany w centrum płótna, co odpowiada pozycji ``vec2(0.5)``. Tak więc, zanim obrócimy przestrzeń musimy przenieść ten krzyż z `centrum` na współrzędną ``vec2(0.0)``, obrócić przestrzeń, a następnie ostatecznie przenieść go z powrotem na pierwotne miejsce.

<!-- According to the way we've been drawing shapes, this is not exactly what we want. Our cross shape is drawn in the center of the canvas which corresponds to the position ```vec2(0.5)```. So, before we rotate the space we need to move shape from the `center` to the ```vec2(0.0)``` coordinate, rotate the space, then finally move it back to the original place. -->

![](rotate.jpg)

Co odpowiada ponizszemu kodowi:

<!-- That looks like the following code: -->

<div class="codeAndCanvas" data="cross-rotate.frag"></div>

Spróbuj wykonać następujące ćwiczenia:

* Odkomentuj linię 45 powyższego kodu i zwróć uwagę na to, co się stanie.

* Zakomentuj translacje przed i po rotacji, w liniach 37 i 39, i zaobserwuj konsekwencje.

* Użyj rotacji, aby poprawić ruch, który zasymulowałeś w ćwiczeniu z podrozdziału "Translcją".

### Skalowanie

Widzieliśmy już, jak macierze służą do translacji i rotacji obiektów w przestrzeni. (A dokładniej do przekształcania układu współrzędnych w celu obracania i przesuwania obiektów). Jeśli używałeś programów do modelowania 3D albo funkcji macierzowych push i pop w Processing, to pewnie wiesz, że macierze mogą być również używane do skalowania rozmiaru obiektu.

<!-- Try the following exercises:

* Uncomment line 45 of above code and pay attention to what happens.

* Comment the translations before and after the rotation, on lines 37 and 39, and observe the consequences.

* Use rotations to improve the animation you simulated in the translation exercise.

### Scale

We've seen how matrices are used to translate and rotate objects in space. (Or more precisely to transform the coordinate system to rotate and move the objects.) If you've used 3D modeling software or the push and pop matrix functions in Processing, you will know that matrices can also be used to scale the size of an object. -->

![](scale.png)

Na podstawie powyższego wzoru, możemy stworzyć 2D macierz skalowania w GLSL:

<!-- Following the previous formula, we can figure out how to make a 2D scaling matrix: -->

```glsl
mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}
```

<div class="codeAndCanvas" data="cross-scale.frag"></div>

Spróbuj następujących ćwiczeń, aby głębiej zrozumieć, jak to działa.

* Odkomentuj linię 42 powyższego kodu, aby zobaczyć skalowaną współrzędną przestrzeni.

* Zobacz, co się stanie, gdy zakomentujesz translacje przed i po skalowaniu w liniach 37 i 39.

* Spróbuj połączyć macierz rotacji wraz z macierzą skalowania. Bądź świadomy, że kolejność ma znaczenie. Najpierw pomnóż przez macierz, a potem pomnóż wektory.

* Teraz, gdy wiesz już, jak rysować różne kształty oraz przesuwać, obracać i skalować je, czas na stworzenie ładnej kompozycji. Zaprojektuj i skonstruuj [UI lub HUD](https://www.pinterest.com/patriciogonzv/huds/) (ang. "heads up display"). Użyj następującego przykładu ShaderToy autorstwa [Ndel](https://www.shadertoy.com/user/ndel) jako inspiracji.

<!-- Try the following exercises to understand more deeply how this works.

* Uncomment line 42 of above code to see the space coordinate being scaled.

* See what happens when you comment the translations before and after the scaling on lines 37 and 39.

* Try combining a rotation matrix together with a scale matrix. Be aware that the order matters. Multiply by the matrix first and then multiply the vectors.

* Now that you know how to draw different shapes, and move, rotate and scale them, it's time to make a nice composition. Design and construct a [fake UI or HUD (heads up display)](https://www.pinterest.com/patriciogonzv/huds/). Use the following ShaderToy example by [Ndel](https://www.shadertoy.com/user/ndel) for inspiration and reference. -->

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/4s2SRt?gui=true&t=10&paused=true" allowfullscreen></iframe>

### Inne zastosowania macierzy: Kolor YUV

[YUV](http://en.wikipedia.org/wiki/YUV) to przestrzeń barw stosowana do analogowego kodowania zdjęć i filmów, która uwzględnia ludzką percepcję w celu zmniejszenia redundantnych informacji zawartych w reprezentacji RGB.

Poniższy kod jest ciekawą okazją do wykorzystania operacji macierzowych w GLSL do transformacji kolorów z jednej przestrzeni do drugiej.

<div class="codeAndCanvas" data="yuv.frag"></div>

Jak widać traktujemy kolory jak wektory, które można mnożyć przez macierze. W ten sposób mapujemy wartości.

W tym rozdziale dowiedzieliśmy się, jak używać przekształceń macierzowych do przesuwania, obracania i skalowania wektorów. Przekształcenia te będą niezbędne do tworzenia kompozycji z kształtów, które poznaliśmy w poprzednim rozdziale. W następnym rozdziale zastosujemy wszystko, czego dotychczas się nauczyliśmy, do tworzenia pięknych proceduralnych wzorów. Zobaczysz, że programowanie powtórzeń i wariacji może być bardzo ekscytujące.

<!-- ### Other uses for matrices: YUV color

[YUV](http://en.wikipedia.org/wiki/YUV) is a color space used for analog encoding of photos and videos that takes into account the range of human perception to reduce the bandwidth of chrominance components.

The following code is an interesting opportunity to use matrix operations in GLSL to transform colors from one mode to another.

<div class="codeAndCanvas" data="yuv.frag"></div>

As you can see we are treating colors as vectors by multiplying them with matrices. In that way we “move” the values around.

In this chapter we've learned how to use matrix transformations to move, rotate and scale vectors. These transformations will be essential for making compositions out of the shapes we learned about in the previous chapter. In the next chapter we'll apply all we've learned to make beautiful procedural patterns. You will find that coding repetition and variation can be an exciting practice. -->
