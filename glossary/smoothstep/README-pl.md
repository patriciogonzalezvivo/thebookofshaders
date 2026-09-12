## smoothstep
Wykonuje interpolację Hermite'a między dwiema wartościami

### Deklaracja
```glsl
float smoothstep(float edge0, float edge1, float x)
vec2 smoothstep(vec2 edge0, vec2 edge1, vec2 x)
vec3 smoothstep(vec3 edge0, vec3 edge1, vec3 x)
vec4 smoothstep(vec4 edge0, vec4 edge1, vec4 x)

vec2 smoothstep(float edge0, float edge1, vec2 x)
vec3 smoothstep(float edge0, float edge1, vec3 x)
vec4 smoothstep(float edge0, float edge1, vec4 x)
```

### Parametry
```edge0``` określa wartość dolnego progu funkcji Hermite'a.

```edge1``` określa wartość górnego progu funkcji Hermite'a.

```x``` określa wartość źródłową dla interpolacji.

### Opis
```smoothstep()``` wykonuje gładką interpolację Hermite'a między ```0``` a ```1```, gdy ```edge0 < x < edge1```. Przydaje się to w sytuacjach, w których potrzebna jest funkcja progowa z płynnym przejściem. ```smoothstep()``` jest równoważne:
```glsl
    genType t;  /* Lub genDType t; */
    t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
```

Wyniki są niezdefiniowane, jeśli ```edge0 ≥ edge1```.

<div class="simpleFunction" data="y = smoothstep(0.0,1.0,x); "></div>

<div class="codeAndCanvas" data="../05/smoothstep.frag"></div>

### Zobacz też
[mix](/glossary/?lan=pl&search=mix), [step](/glossary/?lan=pl&search=step), [Rozdział 05: Shaping Functions](/05/?lan=pl)
