## clamp
Ogranicza wartość, aby mieściła się między dwoma skrajnymi wartościami

### Deklaracja
```glsl
float clamp(float x, float minVal, float maxVal)
vec2 clamp(vec2 x, vec2 minVal, vec2 maxVal)
vec3 clamp(vec3 x, vec3 minVal, vec3 maxVal)
vec4 clamp(vec4 x, vec4 minVal, vec4 maxVal)

vec2 clamp(vec2 x, float minVal, float maxVal)
vec3 clamp(vec3 x, float minVal, float maxVal)
vec4 clamp(vec4 x, float minVal, float maxVal)
```

### Parametry
```x``` określa wartość, którą należy ograniczyć.

```minVal``` określa dolną granicę zakresu, w którym będzie ograniczana wartość x.

```maxVal``` określa górną granicę zakresu, w którym będzie ograniczana wartość x.

### Opis
```clamp()``` zwraca wartość ```x``` ograniczoną do zakresu od ```minVal``` do ```maxVal```. Zwrócona wartość obliczana jest jako ```min(max(x, minVal), maxVal)```.

<div class="simpleFunction" data="y = clamp(x,0.,1.);"></div>

### Zobacz też
[min](/glossary/?lan=pl&search=min), [abs](/glossary/?lan=pl&search=abs), [max](/glossary/?lan=pl&search=max)