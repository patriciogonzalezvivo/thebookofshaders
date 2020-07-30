## Mat3
Ma trận số thực 3x3

### Các phiên bản
```glsl
mat3 aMat3 = mat3(1.0, 0.0, 0.0,  // Cột thứ 1
                  0.0, 1.0, 0.0,  // Cột thứ 2
                  0.0, 0.0, 1.0); // Cột thứ 3
mat3 bMat3 = mat3(1.0);

mat3 cMat3 = mat3(aVec3, bVec3, cVec3);
mat3 dMat3 = mat3(aVec4, aVec3, bVec4, aFloat);
```

### Mô tả
```mat3``` là ma trận số thực gồm 3 hàng và 3 cột. Nó có thể được khởi tạo bằng các cách:

- Chỉ định giá trị của từng thành phần
- Chỉ định 1 giá trị chung cho các thành phần trên đường chéo chính
- Chỉ định giá trị từng cột, mỗi cột coi như một ```vec3```

Có thể lấy giá trị của từng thành phần trong ma trận hoặc lấy từng cột:

```glsl
mat3 aMat3;
aMat3[2][2] = 1.0;
float aFloat = aMat3[2][2];

aMat3[0] = vec3(1.0);
vec3 aVec3 = aMat3[0];
```

### Tham khảo thêm
[mat2](/glossary/?lan=vi&search=mat2), [mat4](/glossary/?lan=vi&search=mat4), [matrixCompMult()](/glossary/?lan=vi&search=matrixCompMult)
