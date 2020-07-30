## Ivec3
Vector số nguyên 3 chiều.

### Các phiên bản
```glsl
vec3 aIvec3 = ivec3(1, 1, 1);
vec3 bIvec3 = ivec3(1);

vec3 cIvec3 = ivec3(aIvec4);
vec3 dIvec3 = ivec3(aIvec4.x, aIvec4.y, aIvec4.z);

vec3 eIvec3 = ivec3(aIvec2, aInt);
vec3 fIvec3 = ivec3(aIvec2.x, aIvec2.y, aInt);
```

### Mô tả
```ivec3``` vector số nguyên gồm 3 thành phần. Nó có thể được khởi tạo bằng các cách:
- Chỉ định giá trị của từng thành phần
- Chỉ định 1 giá trị chung cho cả 3 thành phần
- Lấy giá trị từ 1 vector nhiều chiều hơn. Các thành phần sẽ được khởi tạo theo thứ tự.
- Lấy giá trị theo thứ tự lần lượt từ nhiều vector, miễn là đủ 3 thành phần.

### Tham khảo thêm
[bool](/glossary/?lan=vi&search=bool), [int](/glossary/?lan=vi&search=int), [float](/glossary/?lan=vi&search=float), [bvec2](/glossary/?lan=vi&search=bvec2), [bvec3](/glossary/?lan=vi&search=bvec3), [bvec4](/glossary/?lan=vi&search=bvec4), [ivec2](/glossary/?lan=vi&search=ivec2), [ivec3](/glossary/?lan=vi&search=ivec3), [ivec4](/glossary/?lan=vi&search=ivec4), [vec2](/glossary/?lan=vi&search=vec2), [vec3](/glossary/?lan=vi&search=vec3), [vec4](/glossary/?lan=vi&search=vec4), [mat2](/glossary/?lan=vi&search=mat2), [mat3](/glossary/?lan=vi&search=mat3), [mat4](/glossary/?lan=vi&search=mat4)
