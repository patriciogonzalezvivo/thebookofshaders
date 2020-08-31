## Step
Kiểm tra một biến có nhỏ hơn ngưỡng nhất định không.

### Các phiên bản
```glsl
float step(float edge, float x)  
vec2 step(vec2 edge, vec2 x)  
vec3 step(vec3 edge, vec3 x)  
vec4 step(vec4 edge, vec4 x)

vec2 step(float edge, vec2 x)  
vec3 step(float edge, vec3 x)  
vec4 step(float edge, vec4 x)
```

### Các tham số
```edge``` ngưỡng cận biên.

```x``` giá trị cần kiểm tra xem có nằm trong ngưỡng cận biên không.

### Mô tả
```step()``` so sánh ```x``` với ```edge```.

Với mỗi thành phần thứ ```i``` trong vector kết quả, nó sẽ nhận giá trị ```0.0``` nếu ```x[i] < edge[i]```, và ngược lại nhận giá trị ```1.0```.

<div class="simpleFunction" data="y = step(0.5,x); "></div>

<div class="codeAndCanvas" data="../05/step.frag"></div>

### Tham khảo thêm
[mix](/glossary/?lan=vi&search=mix), [smoothstep](/glossary/?lan=vi&search=smoothstep), [Các hàm số cơ bản (Hàm hình dạng - Shape function)](/05/?lan=vi)
