## Smoothstep
Perform Hermite interpolation between two values

### Declaration
```glsl
float smoothstep(float edge0, float edge1, float x)  
vec2 smoothstep(vec2 edge0, vec2 edge1, vec2 x)  
vec3 smoothstep(vec3 edge0, vec3 edge1, vec3 x)  
vec4 smoothstep(vec4 edge0, vec4 edge1, vec4 x)

vec2 smoothstep(float edge0, float edge1, vec2 x)  
vec3 smoothstep(float edge0, float edge1, vec3 x)  
vec4 smoothstep(float edge0, float edge1, vec4 x)
```

### Parameters
```edge0``` specifies the value of the lower edge of the Hermite function.

```edge1``` specifies the value of the upper edge of the Hermite function.

```x``` specifies the source value for interpolation.

### Description
```smoothstep()``` performs smooth Hermite interpolation between ```0``` and ```1``` when ```edge0 < x < edge1```. This is useful in cases where a threshold function with a smooth transition is desired. ```smoothstep()``` is equivalent to:
```glsl
    genType t;  /* Or genDType t; */
    t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
```

Results are undefined ```if edge0 ≥ edge1```.

<div class="simpleFunction" data="y = smoothstep(0.0,1.0,x); "></div>

<div class="codeAndCanvas" data="../05/smoothstep.frag"></div>

### See Also
[mix](/glossary/?search=mix), [step](/glossary/?search=step), [Chapter 05: Shaping Functions](/05/)
