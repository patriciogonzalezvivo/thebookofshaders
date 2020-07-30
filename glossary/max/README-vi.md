## Max
Return the greater of two values

### Các phiên bản
```glsl
float max(float x, float y)  
vec2 max(vec2 x, vec2 y)  
vec3 max(vec3 x, vec3 y)  
vec4 max(vec4 x, vec4 y)

vec2 max(vec2 x, float y)  
vec3 max(vec3 x, float y)  
vec4 max(vec4 x, float y)
```

### Các tham số
```x``` specify the first value to compare.

```y``` specify the second value to compare.

### Mô tả
```max()``` returns the maximum of the two parameters. It returns ```y``` if ```y``` is greater than ```x```, otherwise it returns ```x```.

<div class="simpleFunction" data="y = max(x,0.5); "></div>

### Tham khảo thêm
[min](/glossary/?lan=vi&search=min), [abs](/glossary/?lan=vi&search=abs), [clamp](/glossary/?lan=vi&search=clamp), [Các hàm số cơ bản (Hàm hình dạng - Shape function)](/05/?lan=vi)
