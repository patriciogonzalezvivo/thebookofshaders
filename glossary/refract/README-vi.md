## Refract
Tính vector khúc xạ khi tia tới va chạm với một bề mặt.

### Các phiên bản
```glsl
float refract(float I, float N, float eta)  
vec2 refract(vec2 I, vec2 N, float eta)  
vec3 refract(vec3 I, vec3 N, float eta)  
vec4 refract(vec4 I, vec4 N, float eta)
```

### Các tham số
```I``` Vector tới (incident vector), là vector chỉ hướng tia va chạm với bề mặt.

```N``` Vector pháp tuyến của bề mặt tại điểm va chạm, là vector vuông góc với bề mặt.

```eta``` Tỉ lệ chiết suất giữa hai môi trường.

### Mô tả
Cho vector tới ```I```, vector pháp tuyến của bề mặt va chạm ```N``` và , vector khúc xạ chỉ hướng khúc xạ sẽ được tính theo công thức dưới đây và trả về:

```glsl
k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));
if (k < 0.0)
    R = genType(0.0);       // hoặc genDType(0.0)
else
    R = eta * I - (eta * dot(N, I) + sqrt(k)) * N;
```
```I``` và ```N``` nên được chuẩn hóa (normalize) để có kết quả chính xác nhất.

### Tham khảo thêm

[dot()](/glossary/?lan=vi&search=dot), [reflect()](/glossary/?lan=vi&search=reflect)
