## Mix
Nội suy tuyến tính giữa 2 giá trị

### Các phiên bản
```glsl
float mix(float x, float y, float a)  
vec2 mix(vec2 x, vec2 y, vec2 a)  
vec3 mix(vec3 x, vec3 y, vec3 a)  
vec4 mix(vec4 x, vec4 y, vec4 a)

vec2 mix(vec2 x, vec2 y, float a)  
vec3 mix(vec3 x, vec3 y, float a)  
vec4 mix(vec4 x, vec4 y, float a)
```

### Các tham số
```x``` Giá trị nhỏ hơn trong khoảng cần nội suy.

```y``` Giá trị lớn hơn trong khoảng cần nội suy.

```a``` Tỉ lệ nội suy. 

### Mô tả
```mix()``` nội suy giá trị giữa ```x``` và ```y``` sử dụng ```a``` làm tỉ lệ nội suy / trọng số. Kết quả của phép tính ```x×(1−a)+y×a```.

<div class="codeAndCanvas" data="../06/mix.frag"></div>

<div class="codeAndCanvas" data="../06/gradient.frag"></div>

### Tham khảo thêm

[min](/glossary/?lan=vi&search=min), [max](/glossary/?lan=vi&search=max), [Chương 6: Màu sắc](/06/?lan=vi)
