## Bvec3
Vector boolean 3 chiều

### Các phiên bản
```glsl
vec3 aBvec3 = bvec3(true, true, true);
vec3 bBvec3 = bvec3(true);

vec3 cBvec3 = bvec3(aBvec4);
vec3 dBvec3 = bvec3(aBvec4.x, aBvec4.y, aBvec4.z);

vec3 eBvec3 = bvec3(aBvec2, aBool);
vec3 fBvec3 = bvec3(aBvec2.x, aBvec2.y, aBool);
```

### Mô tả
```bvec3``` vector boolean gồm 3 thành phần. Nó có thể được khởi tạo bằng các cách:
- Chỉ định giá trị của từng thành phần
- Chỉ định 1 giá trị chung cho cả 3 thành phần
- Lấy giá trị từ 1 vector nhiều chiều hơn. Các thành phần sẽ được khởi tạo theo thứ tự.
- Lấy giá trị theo thứ tự lần lượt từ nhiều vector, miễn là đủ 3 thành phần.

### Tham khảo thêm
[bool](/glossary/?lan=vi&search=bool), [int](/glossary/?lan=vi&search=int), [float](/glossary/?lan=vi&search=float), [bvec2](/glossary/?lan=vi&search=bvec2), [bvec3](/glossary/?lan=vi&search=bvec3), [bvec4](/glossary/?lan=vi&search=bvec4), [ivec2](/glossary/?lan=vi&search=ivec2), [ivec3](/glossary/?lan=vi&search=ivec3), [ivec4](/glossary/?lan=vi&search=ivec4), [vec2](/glossary/?lan=vi&search=vec2), [vec3](/glossary/?lan=vi&search=vec3), [vec4](/glossary/?lan=vi&search=vec4), [mat2](/glossary/?lan=vi&search=mat2), [mat3](/glossary/?lan=vi&search=mat3), [mat4](/glossary/?lan=vi&search=mat4)
