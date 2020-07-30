## Faceforward
Tìm vector pháp tuyến cùng phía với vector tới so với một bề mặt.

### Các phiên bản
```glsl
float faceforward(float N, float I, float Nref)  
vec2 faceforward(vec2 N, vec2 I, vec2 Nref)  
vec3 faceforward(vec3 N, vec3 I, vec3 Nref)  
vec4 faceforward(vec4 N, vec4 I, vec4 Nref)
```

### Các tham số
```N``` vector pháp tuyến của bề mặt sẽ va chạm (hướng trả về sẽ trùng hướng này hoặc hướng ngược lại)

```I``` vector tới (hướng tới vị trí va chạm với bề mặt).

```Nref``` vector pháp tuyến của bề mặt cần kiểm tra.

### Mô tả
```faceforward()``` trả về hướng của bề mặt (vector pháp tuyến) tại vị trí va chạm với tia tới. Nếu ```dot(Nref, I) < 0``` trả về ```N```, ngược lại trả về ```-N```.

### Tham khảo thêm
[reflect()](/glossary/?lan=vi&search=reflect), [refract()](/glossary/?lan=vi&search=refract)
