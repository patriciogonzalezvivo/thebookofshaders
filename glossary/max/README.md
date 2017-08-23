## Max
Return the greater of two values

### Declaration
```glsl
float max(float x, float y)  
vec2 max(vec2 x, vec2 y)  
vec3 max(vec3 x, vec3 y)  
vec4 max(vec4 x, vec4 y)

vec2 max(vec2 x, float y)  
vec3 max(vec3 x, float y)  
vec4 max(vec4 x, float y)
```

### Parameters
```x``` specify the first value to compare.

```y``` specify the second value to compare.

### Description
```max()``` returns the maximum of the two parameters. It returns ```y``` if ```y``` is greater than ```x```, otherwise it returns ```x```.

<div class="simpleFunction" data="y = max(x,0.5); "></div>

### See Also
[min](/glossary/?search=min), [abs](/glossary/?search=abs), [clamp](/glossary/?search=clamp), [Chapter 05: Shaping Functions](/05/)
