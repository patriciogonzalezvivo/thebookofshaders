## Ivec4
4 dimensional integer vector

### Các phiên bản
```glsl
vec4 aIvec4 = ivec4(1, 1, 1, 1);
vec4 bIvec4 = ivec4(1);

vec4 cIvec4 = ivec4(aIvec2, aInteger, aIvec3);
vec4 dIvec4 = ivec4(aIvec2.x, aIvec2.y, aInt, aIvec3.x);
```

### Mô tả
```ivec4``` is an integer vector with four components. It can be initialized by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a combination of vectors and/or scalars. The respective values are used to initialize the vector. The arguments of the constructor must have at least as many components as the vector that is initialized.

### Tham khảo thêm
[bool](/glossary/?lan=vi&search=bool), [int](/glossary/?lan=vi&search=int), [float](/glossary/?lan=vi&search=float), [bvec2](/glossary/?lan=vi&search=bvec2), [bvec3](/glossary/?lan=vi&search=bvec3), [bvec4](/glossary/?lan=vi&search=bvec4), [ivec2](/glossary/?lan=vi&search=ivec2), [ivec3](/glossary/?lan=vi&search=ivec3), [ivec4](/glossary/?lan=vi&search=ivec4), [vec2](/glossary/?lan=vi&search=vec2), [vec3](/glossary/?lan=vi&search=vec3), [vec4](/glossary/?lan=vi&search=vec4), [mat2](/glossary/?lan=vi&search=mat2), [mat3](/glossary/?lan=vi&search=mat3), [mat4](/glossary/?lan=vi&search=mat4)
