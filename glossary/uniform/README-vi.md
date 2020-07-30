## Uniform
Qualifier đánh dấu biến chứa dữ liệu được gửi từ CPU sang GPU.

### Ví dụ
```glsl
uniform vec4 direction;
```

### Mô tả
Các biến ```uniform``` được gửi từ CPU sang cả 2 chương trình vertex shader và fragment shader chạy trên GPU. Giá trị của các biến này không thể thay đổi.

_The value is per primitive, so is useful for variables which remain constant along a primitive, frame or scene._

### Tham khảo thêm
[attribute](/glossary/?lan=vi&search=attribute), [const](/glossary/?lan=vi&search=const), [varying](/glossary/?lan=vi&search=varying), [Chương 03: Uniform](/03/?lan=vi)
