## Fract
Compute the fractional part of the argument

### Các phiên bản
```glsl
float fract(float x)  
vec2 fract(vec2 x)  
vec3 fract(vec3 x)  
vec4 fract(vec4 x)
```

### Các tham số
```x``` specify the value to evaluate.

### Mô tả
```fract()``` returns the fractional part of ```x```. This is calculated as ```x - floor(x)```.

<div class="simpleFunction" data="y = fract(x); "></div>

### Tham khảo thêm
[floor](/glossary/?lan=vi&search=floor), [ceil](/glossary/?lan=vi&search=ceil), [mod](/glossary/?lan=vi&search=mod), [Các hàm số cơ bản (Hàm hình dạng - Shape function)](/05/?lan=vi)
