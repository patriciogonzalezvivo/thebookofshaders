## Vec3
Vector số thực 3 chiều.

### Các phiên bản
```glsl
vec3 aVec3 = vec3(1.0, 1.0, 1.0);
vec3 bVec3 = vec3(1.0);

vec3 cVec3 = vec3(aVec4);
vec3 dVec3 = vec3(aVec4.x, aVec4.y, aVec4.z);

vec3 eVec3 = vec3(aVec2, aFloat);
vec3 fVec3 = vec3(aVec2.x, aVec2.y, aFloat);
```

### Mô tả
```vec3``` vector số thực gồm 3 thành phần. Nó có thể được khởi tạo bằng các cách:
- Chỉ định giá trị của từng thành phần
- Chỉ định 1 giá trị chung cho cả 3 thành phần
- Lấy giá trị từ 1 vector nhiều chiều hơn. Các thành phần sẽ được khởi tạo theo thứ tự.
- Lấy giá trị theo thứ tự lần lượt từ nhiều vector, miễn là đủ 3 thành phần.

### Tham khảo thêm
[bool](/glossary/?lan=vi&search=bool), [int](/glossary/?lan=vi&search=int), [float](/glossary/?lan=vi&search=float), [bvec2](/glossary/?lan=vi&search=bvec2), [bvec3](/glossary/?lan=vi&search=bvec3), [bvec4](/glossary/?lan=vi&search=bvec4), [ivec2](/glossary/?lan=vi&search=ivec2), [ivec3](/glossary/?lan=vi&search=ivec3), [ivec4](/glossary/?lan=vi&search=ivec4), [vec2](/glossary/?lan=vi&search=vec2), [vec3](/glossary/?lan=vi&search=vec3), [vec4](/glossary/?lan=vi&search=vec4), [mat2](/glossary/?lan=vi&search=mat2), [mat3](/glossary/?lan=vi&search=mat3), [mat4](/glossary/?lan=vi&search=mat4)
