## Min
Return the lesser of two values

### Declaration
```glsl
float min(float x, float y)  
vec2 min(vec2 x, vec2 y)  
vec3 min(vec3 x, vec3 y)  
vec4 min(vec4 x, vec4 y)

vec2 min(vec2 x, float y)  
vec3 min(vec3 x, float y)  
vec4 min(vec4 x, float y)
```

### Parameters
```x``` specify the first value to compare.

```y``` specify the second value to compare.

### Description
```min()``` returns the minimum of the two parameters. It returns ```y``` if ```y``` is less than ```x```, otherwise it returns ```x```.

<div class="simpleFunction" data="y = min(x,0.5); "></div>

### See Also
[max](/glossary/?search=max), [abs](/glossary/?search=abs), [clamp](/glossary/?search=clamp), [Chapter 05: Shaping Functions](/05/)
