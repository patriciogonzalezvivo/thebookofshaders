## Vec4
4 dimensional floating point vector

### Các phiên bản
```glsl
vec4 aVec4 = vec4(1.0, 1.0, 1.0, 1.0);
vec4 bVec4 = vec4(1.0);

vec4 cVec4 = vec4(aVec2, aFloat, aVec3);
vec4 dVec4 = vec4(aBvec2.x, aBvec2.y, aFloat, aBvec3.x);
```

### Mô tả
```vec4``` is a floating point vector with four components. It can be initialized by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a combination of vectors and scalars. The respective values are used to initialize the components. The arguments of the constructor must have at least as many components as the vector that is initialized.

### Tham khảo thêm
[bool](/glossary/?lan=vi&search=bool), [int](/glossary/?lan=vi&search=int), [float](/glossary/?lan=vi&search=float), [bvec2](/glossary/?lan=vi&search=bvec2), [bvec3](/glossary/?lan=vi&search=bvec3), [bvec4](/glossary/?lan=vi&search=bvec4), [ivec2](/glossary/?lan=vi&search=ivec2), [ivec3](/glossary/?lan=vi&search=ivec3), [ivec4](/glossary/?lan=vi&search=ivec4), [vec2](/glossary/?lan=vi&search=vec2), [vec3](/glossary/?lan=vi&search=vec3), [vec4](/glossary/?lan=vi&search=vec4), [mat2](/glossary/?lan=vi&search=mat2), [mat3](/glossary/?lan=vi&search=mat3), [mat4](/glossary/?lan=vi&search=mat4)
