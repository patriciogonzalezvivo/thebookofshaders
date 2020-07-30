## Mod
Phép tính phần dư

### Các phiên bản
```glsl
float mod(float x, float y)  
vec2 mod(vec2 x, vec2 y)  
vec3 mod(vec3 x, vec3 y)  
vec4 mod(vec4 x, vec4 y)

vec2 mod(vec2 x, float y)  
vec3 mod(vec3 x, float y)  
vec4 mod(vec4 x, float y)
```

### Các tham số
```x``` số bị chia.
```y``` số chia.

### Mô tả
```mod()``` trả về kết quả là phần dư của phép chia ```x``` cho ```y```, theo công thức ```x - y * floor(x/y)```.

<div class="simpleFunction" data="y = mod(x,1.5); "></div>

### Tham khảo thêm
[floor](/glossary/?lan=vi&search=floor), [fract](/glossary/?lan=vi&search=fract), [ceil](/glossary/?lan=vi&search=ceil), [Các hàm số cơ bản (Hàm hình dạng - Shape function)](/05/?lan=vi)
