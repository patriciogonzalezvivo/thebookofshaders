## Clamp
Giới hạn 1 giá trị nằm trong 1 khoảng.

### Các phiên bản
```glsl
float clamp(float x, float minVal, float maxVal)  
vec2 clamp(vec2 x, vec2 minVal, vec2 maxVal)  
vec3 clamp(vec3 x, vec3 minVal, vec3 maxVal)  
vec4 clamp(vec4 x, vec4 minVal, vec4 maxVal)

vec2 clamp(vec2 x, float minVal, float maxVal)  
vec3 clamp(vec3 x, float minVal, float maxVal)  
vec4 clamp(vec4 x, float minVal, float maxVal)
```

### Các tham số
```x``` giá trị cần giới hạn.

```minVal``` giá trị nhỏ nhất trong khoảng giới hạn

```maxVal``` giá trị lớn nhất trong khoảng giới hạn

### Mô tả
```clamp()``` trả về giá trị ```x``` sau khi đã đảm bảo nó nằm trong khoảng từ ```minVal``` tới ```maxVal```. Cách tính chi tiết: ```min(max(x, minVal), maxVal)```.

<div class="simpleFunction" data="y = clamp(x,0.,1.); "></div>

### Tham khảo thêm
[min](/glossary/?lan=vi&search=min), [abs](/glossary/?lan=vi&search=abs), [max](/glossary/?lan=vi&search=max)
