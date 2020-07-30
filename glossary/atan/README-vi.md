## Atan
Tính góc lượng giác tương ứng với giá trị tan

### Các phiên bản
```glsl
float atan(float y, float x)  
vec2 atan(vec2 y, vec2 x)  
vec3 atan(vec3 y, vec3 x)  
vec4 atan(vec4 y, vec4 x)

float atan(float y_over_x)  
vec2 atan(vec2 y_over_x)  
vec3 atan(vec3 y_over_x)  
vec4 atan(vec4 y_over_x)
```

### Các tham số
```y``` tử số của hàm tan

```x``` mẫu số của hàm tan

```y_over_x``` giá trị tan dạng phân số cần tìm góc tương ứng

### Mô tả
```atan()``` trả về góc lượng giác (đơn vị radian) ứng với tan bằng ```y,x``` hoặc ```y_over_x```, tuỳ theo phiên bản được sử dụng. Ở phiên bản đầu tiên thì dấu của ```y``` và ```x``` sẽ được dùng để xác định góc phần tư của góc lượng giác. Kết quả trả về trong trường hợp này sẽ nằm trong khoảng [-PI, PI]. Nếu ```x``` bằng không thì kết quả không xác định.
Ở phiên bản thứ hai, ```atan()``` trả về góc lượng giác (đơn vị radian) ứng với tan bằng ```y_over_x```. Kết quả trả về trong trường hợp này sẽ nằm trong khoảng [-PI/2, PI/2].

### Tham khảo thêm
[cos](/glossary/?lan=vi&search=cos), [acos](/glossary/?lan=vi&search=acos), [sin](/glossary/?lan=vi&search=sin), [asin](/glossary/?lan=vi&search=asin), [atan](/glossary/?lan=vi&search=atan), [Các hàm số cơ bản (Hàm hình dạng - Shape function)](/05/?lan=vi), [Chương 6: Màu sắc](/06/?lan=vi)
