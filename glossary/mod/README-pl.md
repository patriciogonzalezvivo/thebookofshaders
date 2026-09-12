## mod
Oblicza resztę z dzielenia jednego parametru przez drugi

### Deklaracja
```glsl
float mod(float x, float y)
vec2 mod(vec2 x, vec2 y)
vec3 mod(vec3 x, vec3 y)
vec4 mod(vec4 x, vec4 y)

vec2 mod(vec2 x, float y)
vec3 mod(vec3 x, float y)
vec4 mod(vec4 x, float y)
```

### Parametry
```x``` określa wartość do ewaluacji.

```y``` określa wartość, przez którą wykonywane jest dzielenie modulo.

### Opis
```mod()``` zwraca resztę z dzielenia ```x``` modulo ```y```. Obliczana jest ona jako ```x - y * floor(x/y)```.

<div class="simpleFunction" data="y = mod(x,1.5); "></div>

### Zobacz też
[floor](/glossary/?lan=pl&search=floor), [fract](/glossary/?lan=pl&search=fract), [ceil](/glossary/?lan=pl&search=ceil), [Rozdział 05: Shaping Functions](/05/?lan=pl)
