## dot
Oblicza iloczyn skalarny (dot product) dwóch wektorów

### Deklaracja
```glsl
float dot(float x, float y)
float dot(vec2 x, vec2 y)
float dot(vec3 x, vec3 y)
float dot(vec4 x, vec4 y)
```

### Parametry
```x``` określa pierwszy z dwóch wektorów

```y``` określa drugi z dwóch wektorów

### Opis
```dot()``` zwraca iloczyn skalarny dwóch wektorów, ```x``` i ```y```, tzn. ```x[0]⋅y[0] + x[1]⋅y[1] + ...```
Jeśli ```x``` i ```y``` są identyczne, wówczas pierwiastek kwadratowy z iloczynu skalarnego jest równoważny długości wektora. Parametry wejściowe mogą być skalarnymi wartościami zmiennoprzecinkowymi lub wektorami zmiennoprzecinkowymi. W przypadku skalarów obliczenia sprowadzają się do pomnożenia ```x``` przez ```y```.

<div class="codeAndCanvas" data="../07/circle.frag"></div>

### Zobacz też
[cross](/glossary/?lan=pl&search=cross), [Rozdział 07: Kształty](/07/?lan=pl)