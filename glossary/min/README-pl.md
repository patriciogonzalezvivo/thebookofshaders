## min
Zwraca mniejszą z dwóch wartości

### Deklaracja
```glsl
float min(float x, float y)
vec2 min(vec2 x, vec2 y)
vec3 min(vec3 x, vec3 y)
vec4 min(vec4 x, vec4 y)

vec2 min(vec2 x, float y)
vec3 min(vec3 x, float y)
vec4 min(vec4 x, float y)
```

### Parametry
```x``` określa pierwszą wartość do porównania.

```y``` określa drugą wartość do porównania.

### Opis
```min()``` zwraca mniejszy z dwóch parametrów. Zwraca ```y```, jeśli ```y``` jest mniejsze niż ```x```, w przeciwnym razie zwraca ```x```.

<div class="simpleFunction" data="y = min(x,0.5); "></div>

### Zobacz też
[max](/glossary/?lan=pl&search=max), [abs](/glossary/?lan=pl&search=abs), [clamp](/glossary/?lan=pl&search=clamp), [Rozdział 05: Shaping Functions](/05/?lan=pl)
