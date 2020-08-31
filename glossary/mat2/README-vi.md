## Mat2
Ma trận số thực 2x2

### Các phiên bản
```glsl
mat2 aMat2 = mat2(1.0, 0.0,  // Cột thứ nhất
                  0.0, 1.0); // Cột thứ hai
mat2 bMat2 = mat2(1.0);
mat2 cMat2 = mat2(aVec2, bVec2);
mat2 dMat2 = mat2(aVec3, aFloat);
```

### Mô tả
```mat2``` là ma trận số thực gồm 2 hàng và 2 cột. Nó có thể được khởi tạo bằng các cách:

- Chỉ định giá trị của từng thành phần
- Chỉ định 1 giá trị chung cho các thành phần trên đường chéo chính
- Chỉ định giá trị từng cột, mỗi cột coi như một ```vec2```

Có thể lấy giá trị của từng thành phần trong ma trận hoặc lấy từng cột:

```glsl
mat2 aMat2;
aMat2[1][1] = 1.0;
float aFloat = aMat2[1][1];

aMat2[0] = vec2(1.0);
vec2 aVec2 = aMat2[0];
```

### Tham khảo thêm
[mat3](/glossary/?lan=vi&search=mat3), [mat4](/glossary/?lan=vi&search=mat4), [matrixCompMult()](/glossary/?lan=vi&search=matrixCompMult)
