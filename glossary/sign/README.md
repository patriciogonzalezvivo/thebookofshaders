## Sign
Extract the sign of the parameter

### Declaration
```glsl
float sign(float x)  
vec2 sign(vec2 x)  
vec3 sign(vec3 x)  
vec4 sign(vec4 x)
```

### Parameters
```x``` specify the value from which to extract the sign.

### Description
```sign()``` returns -1.0 if x is less than 0.0, 0.0 if x is equal to 0.0, and +1.0 if x is greater than 0.0.

<div class="simpleFunction" data="y = sign(x); "></div>

### See Also
[abs](/glossary/?search=abs), [Chapter 05: Shaping Functions](/05/)
