## Varying
Qualifier đánh dấu biến chứa dữ liệu đã được vertex shader xử lý và chuyển tiếp sang cho fragment shader xử lý tiếp.

### Ví dụ
```glsl
varying vec3 position;
```

### Mô tả
```varying``` đánh dấu biến chứa dữ liệu đã được vertex shader xử lý và chuyển tiếp sang cho fragment shader xử lý tiếp.

Biến này có thể được chỉnh sửa bởi vertex shader, nhưng phải là biến read-only đối với fragment shader.

### Tham khảo thêm
[attribute](/glossary/?lan=vi&search=attribute), [const](/glossary/?lan=vi&search=const), [uniform](/glossary/?lan=vi&search=uniform), [Chương 03: Uniform](/03/?lan=vi)
