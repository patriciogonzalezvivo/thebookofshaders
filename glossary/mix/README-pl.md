## mix
Wykonuje interpolację liniową między dwiema wartościami

### Deklaracja
```glsl
float mix(float x, float y, float a)
vec2 mix(vec2 x, vec2 y, vec2 a)
vec3 mix(vec3 x, vec3 y, vec3 a)
vec4 mix(vec4 x, vec4 y, vec4 a)

vec2 mix(vec2 x, vec2 y, float a)
vec3 mix(vec3 x, vec3 y, float a)
vec4 mix(vec4 x, vec4 y, float a)
```

### Parametry
```x``` określa początek zakresu, w którym wykonywana jest interpolacja.

```y``` określa koniec zakresu, w którym wykonywana jest interpolacja.

```a``` określa wartość używaną do interpolacji między x i y.

### Opis
```mix()``` wykonuje interpolację liniową między ```x``` a ```y```, używając ```a``` jako wagi. Zwracana wartość obliczana jest jako ```x×(1−a)+y×a```.

<div class="codeAndCanvas" data="../06/mix.frag"></div>

<div class="codeAndCanvas" data="../06/gradient.frag"></div>

### Zobacz też
[min](/glossary/?lan=pl&search=min), [max](/glossary/?lan=pl&search=max), [Rozdział 06: Kolory](/06/?lan=pl)
