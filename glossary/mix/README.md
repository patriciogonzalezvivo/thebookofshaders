## Mix
Constrain a value to lie between two further values

### Declaration
```glsl
float mix(float x, float y, float a)  
vec2 mix(vec2 x, vec2 y, vec2 a)  
vec3 mix(vec3 x, vec3 y, vec3 a)  
vec4 mix(vec4 x, vec4 y, vec4 a)

vec2 mix(vec2 x, vec2 y, float a)  
vec3 mix(vec3 x, vec3 y, float a)  
vec4 mix(vec4 x, vec4 y, float a)
```

### Parameters
```x``` Specify the start of the range in which to interpolate.

```y``` Specify the end of the range in which to interpolate.

```a``` Specify the value to use to interpolate between x and y.

### Description
```mix()``` performs a linear interpolation between ```x``` and ```y``` using ```a``` to weight between them. The return value is computed as ```x×(1−a)+y×a```.

<div class="codeAndCanvas" data="../06/mix.frag"></div>

<div class="codeAndCanvas" data="../06/gradient.frag"></div>

### See Also

[min](/glossary/?search=min), [max](/glossary/?search=max), [Chapter 06: Color](/06/)
