## Smoothstep
Perform Hermite interpolation between two values

### Các phiên bản
```glsl
float smoothstep(float edge0, float edge1, float x)  
vec2 smoothstep(vec2 edge0, vec2 edge1, vec2 x)  
vec3 smoothstep(vec3 edge0, vec3 edge1, vec3 x)  
vec4 smoothstep(vec4 edge0, vec4 edge1, vec4 x)

vec2 smoothstep(float edge0, float edge1, vec2 x)  
vec3 smoothstep(float edge0, float edge1, vec3 x)  
vec4 smoothstep(float edge0, float edge1, vec4 x)
```

### Các tham số
```edge0``` specifies the value of the lower edge of the Hermite function.

```edge1``` specifies the value of the upper edge of the Hermite function.

```x``` specifies the source value for interpolation.

### Mô tả
```smoothstep()``` performs smooth Hermite interpolation between ```0``` and ```1``` when ```edge0 < x < edge1```. This is useful in cases where a threshold function with a smooth transition is desired. ```smoothstep()``` is equivalent to:
```glsl
    genType t;  /* Or genDType t; */
    t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
```

Results are undefined ```if edge0 ≥ edge1```.

<div class="simpleFunction" data="y = smoothstep(0.0,1.0,x); "></div>

<div class="codeAndCanvas" data="../05/smoothstep.frag"></div>

### Tham khảo thêm
[mix](/glossary/?lan=vi&search=mix), [step](/glossary/?lan=vi&search=step), [Các hàm số cơ bản (Hàm hình dạng - Shape function)](/05/?lan=vi)
