## Mod
Compute value of one parameter modulo another

### Declaration
```glsl
float mod(float x, float y)  
vec2 mod(vec2 x, vec2 y)  
vec3 mod(vec3 x, vec3 y)  
vec4 mod(vec4 x, vec4 y)

vec2 mod(vec2 x, float y)  
vec3 mod(vec3 x, float y)  
vec4 mod(vec4 x, float y)
```

### Parameters
```x``` specify the value to evaluate.
```y``` specify the value to obtain the modulo of.

### Description
```mod()``` returns the value of ```x``` modulo ```y```. This is computed as ```x - y * floor(x/y)```.

<div class="simpleFunction" data="y = mod(x,1.5); "></div>

### See Also
[floor](index.html#floor.md), [fract](index.html#fract.md), [ceil](index.html#ceil.md), [Chapter 05: Shaping Functions](../05/)