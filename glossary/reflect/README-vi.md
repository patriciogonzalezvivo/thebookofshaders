## Reflect
Tính vector phản xạ khi tia tới va chạm với một bề mặt.

### Các phiên bản
```glsl
float reflect(float I, float N)  
vec2 reflect(vec2 I, vec2 N)  
vec3 reflect(vec3 I, vec3 N)  
vec4 reflect(vec4 I, vec4 N)
```

### Các tham số
```I``` Vector tới (incident vector), là vector chỉ hướng tia va chạm với bề mặt.

```N``` Vector pháp tuyến của bề mặt tại điểm va chạm, là vector vuông góc với bề mặt.

### Mô tả
Cho vector tới ```I``` và vector pháp tuyến của bề mặt va chạm ```N```, vector phản xạ chỉ hướng phản xạ được tính theo công thức ```I - 2.0 * dot(N, I) * N```.

```N``` nên được chuẩn hóa (normalize) để có kết quả chính xác nhất.

### Tham khảo thêm

[dot()](/glossary/?lan=vi&search=dot), [refract()](/glossary/?lan=vi&search=refract)
