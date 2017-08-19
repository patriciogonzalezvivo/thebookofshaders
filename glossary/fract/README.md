## Fract
Compute the fractional part of the argument

### Declaration
```glsl
float fract(float x)  
vec2 fract(vec2 x)  
vec3 fract(vec3 x)  
vec4 fract(vec4 x)
```

### Parameters
```x``` specify the value to evaluate.

### Description
```fract()``` returns the fractional part of ```x```. This is calculated as ```x - floor(x)```.

<div class="simpleFunction" data="y = fract(x); "></div>

### See Also
[floor](/glossary/?search=floor), [ceil](/glossary/?search=ceil), [mod](/glossary/?search=mod), [Chapter 05: Shaping Functions](/05/)
