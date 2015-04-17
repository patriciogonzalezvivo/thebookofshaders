## Clamp
Constrain a value to lie between two further values

```glsl
float clamp(float x, float minVal, float maxVal)  
vec2 clamp(vec2 x, vec2 minVal, vec2 maxVal)  
vec3 clamp(vec3 x, vec3 minVal, vec3 maxVal)  
vec4 clamp(vec4 x, vec4 minVal, vec4 maxVal)
```

```glsl
vec2 clamp(vec2 x, float minVal, float maxVal)  
vec3 clamp(vec3 x, float minVal, float maxVal)  
vec4 clamp(vec4 x, float minVal, float maxVal) 
```

### Parameters
```x``` Specify the value to constrain.

```minVal``` Specify the lower end of the range into which to constrain x.

```maxVal``` Specify the upper end of the range into which to constrain x.

### Description
```clamp()``` returns the value of ```x``` constrained to the range ```minVal``` to ```maxVal```. The returned value is computed as ```min(max(x, minVal), maxVal)```.

<div class="simpleFunction" data="y = clamp(x,0.,1.); "></div>

### See Also
[min](index.html#min.md), [abs](index.html#abs.md), [max](index.html#max.md)