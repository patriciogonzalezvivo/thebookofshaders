## Attribute
Đánh dấu dữ liệu về các đỉnh của mesh.

### Ví dụ
```glsl
attribute vec4 v_color;
```

### Mô tả
```attribute``` đánh dấu dữ liệu về các đỉnh của mesh gửi từ môi trường WebGL/OpenGL cho vertex shader.

Vì vertex shader chỉ thực thi một lần cho mỗi đỉnh, nên các thuộc tính của mỗi đỉnh phải được chỉ đích danh: vị trí, màu sắc, vector pháp tuyến và toạ độ UV.

### Tham khảo thêm
[const](/glossary/?lan=vi&search=const), [uniform](/glossary/?lan=vi&search=uniform), [varying](/glossary/?lan=vi&search=varying), [Chương 03: Uniform](/03/?lan=vi)
