## Min
Return the lesser of two values

### Các phiên bản
```glsl
float min(float x, float y)  
vec2 min(vec2 x, vec2 y)  
vec3 min(vec3 x, vec3 y)  
vec4 min(vec4 x, vec4 y)

vec2 min(vec2 x, float y)  
vec3 min(vec3 x, float y)  
vec4 min(vec4 x, float y)
```

### Các tham số
```x``` specify the first value to compare.

```y``` specify the second value to compare.

### Mô tả
```min()``` returns the minimum of the two parameters. It returns ```y``` if ```y``` is less than ```x```, otherwise it returns ```x```.

<div class="simpleFunction" data="y = min(x,0.5); "></div>

### Tham khảo thêm
[max](/glossary/?lan=vi&search=max), [abs](/glossary/?lan=vi&search=abs), [clamp](/glossary/?lan=vi&search=clamp), [Các hàm số cơ bản (Hàm hình dạng - Shape function)](/05/?lan=vi)
