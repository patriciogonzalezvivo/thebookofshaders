## Bvec4
Vector boolean 4 chiều

### Các phiên bản
```glsl
vec4 aBvec4 = bvec4(true, true, true, true);
vec4 bBvec4 = bvec4(true);

vec4 cBvec4 = bvec4(aBvec2, aBool, aBvec3);
vec4 dBvec4 = bvec4(aBvec2.x, aBvec2.y, aBool, aBvec3.x);
```

### Mô tả
```bvec4``` vector boolean gồm 4 thành phần. Nó có thể được khởi tạo bằng các cách:
- Chỉ định giá trị của từng thành phần
- Chỉ định 1 giá trị chung cho cả 4 thành phần
- Lấy giá trị theo thứ tự lần lượt từ nhiều vector, miễn là đủ 4 thành phần.

### Tham khảo thêm
[bool](/glossary/?lan=vi&search=bool), [int](/glossary/?lan=vi&search=int), [float](/glossary/?lan=vi&search=float), [bvec2](/glossary/?lan=vi&search=bvec2), [bvec3](/glossary/?lan=vi&search=bvec3), [bvec4](/glossary/?lan=vi&search=bvec4), [ivec2](/glossary/?lan=vi&search=ivec2), [ivec3](/glossary/?lan=vi&search=ivec3), [ivec4](/glossary/?lan=vi&search=ivec4), [vec2](/glossary/?lan=vi&search=vec2), [vec3](/glossary/?lan=vi&search=vec3), [vec4](/glossary/?lan=vi&search=vec4), [mat2](/glossary/?lan=vi&search=mat2), [mat3](/glossary/?lan=vi&search=mat3), [mat4](/glossary/?lan=vi&search=mat4)
