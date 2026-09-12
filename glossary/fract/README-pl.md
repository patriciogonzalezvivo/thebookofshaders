## fract
Oblicza część ułamkową podanego argumentu

### Deklaracja
```glsl
float fract(float x)
vec2 fract(vec2 x)
vec3 fract(vec3 x)
vec4 fract(vec4 x)
```

### Parametry
```x``` określa wartość do ewaluacji.

### Opis
```fract()``` zwraca część ułamkową ```x```. Obliczana jest ona jako ```x - floor(x)```.

<div class="simpleFunction" data="y = fract(x); "></div>

### Zobacz też
[floor](/glossary/?lan=pl&search=floor), [ceil](/glossary/?lan=pl&search=ceil), [mod](/glossary/?lan=pl&search=mod), [Rozdział 05: Shaping Functions](/05/?lan=pl)
