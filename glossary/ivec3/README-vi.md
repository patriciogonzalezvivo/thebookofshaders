## Ivec3
3 dimensional integer vector

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
```ivec3``` is an integer vector with three components. It can be initialized by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a vector of higher dimension. The respective values are used to initialize the components.
- Providing a combination of vectors and/or scalars. The respective values are used to initialize the vector. The arguments of the constructor must have at least as many components as the vector that is initialized.

### Tham khảo thêm
[bool](/glossary/?lan=vi&search=bool), [int](/glossary/?lan=vi&search=int), [float](/glossary/?lan=vi&search=float), [bvec2](/glossary/?lan=vi&search=bvec2), [bvec3](/glossary/?lan=vi&search=bvec3), [bvec4](/glossary/?lan=vi&search=bvec4), [ivec2](/glossary/?lan=vi&search=ivec2), [ivec3](/glossary/?lan=vi&search=ivec3), [ivec4](/glossary/?lan=vi&search=ivec4), [vec2](/glossary/?lan=vi&search=vec2), [vec3](/glossary/?lan=vi&search=vec3), [vec4](/glossary/?lan=vi&search=vec4), [mat2](/glossary/?lan=vi&search=mat2), [mat3](/glossary/?lan=vi&search=mat3), [mat4](/glossary/?lan=vi&search=mat4)
