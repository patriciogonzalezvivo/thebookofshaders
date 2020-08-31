## Mat4
Ma trận số thực 4x4

### Các phiên bản
```glsl
mat4 aMat4 = mat4(1.0, 0.0, 0.0, 0.0,  // Cột thứ 1
                  0.0, 1.0, 0.0, 0.0,  // Cột thứ 2
                  0.0, 0.0, 1.0, 0.0,  // Cột thứ 3
                  0.0, 0.0, 0.0, 1.0); // Cột thứ 4
mat4 bMat4 = mat4(1.0);

mat4 cMat4 = mat4(aVec4, bVec4, cVec4, dVec4);
mat4 dMat4 = mat4(aVec4, aVec3, bVec4, cVec4, aFloat);
```

### Mô tả
```mat4``` là ma trận số thực gồm 4 hàng và 4 cột. Nó có thể được khởi tạo bằng các cách:

- Chỉ định giá trị của từng thành phần
- Chỉ định 1 giá trị chung cho các thành phần trên đường chéo chính
- Chỉ định giá trị từng cột, mỗi cột coi như một ```vec4```

Có thể lấy giá trị của từng thành phần trong ma trận hoặc lấy từng cột:

```glsl
aMat4[3][3] = 1.0;
float aFloat = aMat4[3][3];

aMat4[0] = vec4(1.0);
vec4 aVec4 = aMat4[0];
```

### Tham khảo thêm
[mat2](/glossary/?lan=vi&search=mat2), [mat3](/glossary/?lan=vi&search=mat3), [matrixCompMult()](/glossary/?lan=vi&search=matrixCompMult)
