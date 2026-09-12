## step
Generuje funkcję skokową poprzez porównanie dwóch wartości

### Deklaracja
```glsl
float step(float edge, float x)
vec2 step(vec2 edge, vec2 x)
vec3 step(vec3 edge, vec3 x)
vec4 step(vec4 edge, vec4 x)

vec2 step(float edge, vec2 x)
vec3 step(float edge, vec3 x)
vec4 step(float edge, vec4 x)
```

### Parametry
```edge``` określa położenie progu funkcji skokowej.

```x``` określa wartość, na podstawie której generowana jest funkcja skokowa.

### Opis
```step()``` generuje funkcję skokową, porównując ```x``` z ```edge```.

Dla elementu ```i``` zwracanej wartości zwracane jest ```0.0```, jeśli ```x[i] < edge[i]```, a w przeciwnym razie ```1.0```.

<div class="simpleFunction" data="y = step(0.5,x); "></div>

<div class="codeAndCanvas" data="../05/step.frag"></div>

### Zobacz też
[mix](/glossary/?lan=pl&search=mix), [smoothstep](/glossary/?lan=pl&search=smoothstep), [Rozdział 05: Shaping Functions](/05/?lan=pl)
