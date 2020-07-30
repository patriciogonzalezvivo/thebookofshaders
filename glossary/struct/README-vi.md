## Struct
Kiểu dữ liệu cấu trúc - struct.

### Ví dụ
```glsl
struct matStruct {
    vec4 ambientColor;
    vec4 diffuseColor;
    vec4 specularColor;
    float specularExponent;
} newMaterial;

newMaterial = matStruct(vec4(0.1, 0.1, 0.1, 1.0),
                        vec4(1.0, 0.0, 0.0, 1.0),
                        vec4(0.7, 0.7, 0.7, 1.0),
                        50.0);
```

### Mô tả
```struct``` là một kiểu dữ liệu tự do được tạo nên từ các biến dữ liệu có kiểu cơ bản. Với mỗi struct, một hàm tạo cùng tên sẽ được tạo tự động. Không nhất thiết phải khởi tạo các giá trị khi dùng hàm tạo.
