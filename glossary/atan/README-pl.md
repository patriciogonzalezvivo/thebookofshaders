## atan
Zwraca arcus tangens parametrów

### Deklaracja
```glsl
float atan(float y, float x)
vec2 atan(vec2 y, vec2 x)
vec3 atan(vec3 y, vec3 x)
vec4 atan(vec4 y, vec4 x)

float atan(float y_over_x)
vec2 atan(vec2 y_over_x)
vec3 atan(vec3 y_over_x)
vec4 atan(vec4 y_over_x)
```

### Parametry
```y``` określa licznik ułamka, którego arcus tangens ma zostać zwrócony.

```x``` określa mianownik ułamka, którego arcus tangens ma zostać zwrócony.

```y_over_x``` określa ułamek, którego arcus tangens ma zostać zwrócony.

### Opis
```atan()``` zwraca kąt, którego trygonometryczny arcus tangens jest równy ```y,x``` lub ```y_over_x```, w zależności od tego, który przeciążenie jest wywoływane. W pierwszym przeciążeniu znaki ```y``` i ```x``` są używane do określenia ćwiartki, w której znajduje się kąt. Wartości zwracane przez ```atan``` w tym przypadku mieszczą się w zakresie -PI i PI. Wyniki są niezdefiniowane, jeśli ```x``` wynosi zero.

Dla drugiego przeciążenia, ```atan()``` zwraca kąt, którego tangens wynosi ```y_over_x```. Wartości zwracane w tym przypadku mieszczą się w zakresie -PI do PI.

### Zobacz też
[cos](/glossary/?lan=pl&search=cos), [acos](/glossary/?lan=pl&search=acos), [sin](/glossary/?lan=pl&search=sin), [asin](/glossary/?lan=pl&search=asin), [atan](/glossary/?lan=pl&search=atan), [Rozdział 05: Shaping Functions](/05/), [Rozdział 06: Kolory](/06/)
[]: # (end)
[]: # (end)