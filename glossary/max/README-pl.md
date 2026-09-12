## max
Zwraca większą z dwóch wartości

### Deklaracja
```glsl
float max(float x, float y)
vec2 max(vec2 x, vec2 y)
vec3 max(vec3 x, vec3 y)
vec4 max(vec4 x, vec4 y)

vec2 max(vec2 x, float y)
vec3 max(vec3 x, float y)
vec4 max(vec4 x, float y)
```

### Parametry
```x``` określa pierwszą wartość do porównania.

```y``` określa drugą wartość do porównania.

### Opis
```max()``` zwraca większy z dwóch parametrów. Zwraca ```y```, jeśli ```y``` jest większe niż ```x```, w przeciwnym razie zwraca ```x```.

<div class="simpleFunction" data="y = max(x,0.5); "></div>

### Zobacz też
[min](/glossary/?lan=pl&search=min), [abs](/glossary/?lan=pl&search=abs), [clamp](/glossary/?lan=pl&search=clamp), [Rozdział 05: Shaping Functions](/05/?lan=pl)
