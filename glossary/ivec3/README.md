## Ivec3
3 dimensional integer vector

### Declaration
```glsl
vec3 aIvec3 = ivec3(1, 1, 1);
vec3 bIvec3 = ivec3(1);

vec3 cIvec3 = ivec3(aIvec4);
vec3 dIvec3 = ivec3(aIvec4.x, aIvec4.y, aIvec4.z);

vec3 eIvec3 = ivec3(aIvec2, aInt);
vec3 fIvec3 = ivec3(aIvec2.x, aIvec2.y, aInt);
```

### Description
```ivec3``` is an integer vector with three components. It can be initialized by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a vector of higher dimension. The respective values are used to initialize the components.
- Providing a combination of vectors and/or scalars. The respective values are used to initialize the vector. The arguments of the constructor must have at least as many components as the vector that is initialized.

### See Also
[bool](/glossary/?search=bool), [int](/glossary/?search=int), [float](/glossary/?search=float), [bvec2](/glossary/?search=bvec2), [bvec3](/glossary/?search=bvec3), [bvec4](/glossary/?search=bvec4), [ivec2](/glossary/?search=ivec2), [ivec3](/glossary/?search=ivec3), [ivec4](/glossary/?search=ivec4), [vec2](/glossary/?search=vec2), [vec3](/glossary/?search=vec3), [vec4](/glossary/?search=vec4), [mat2](/glossary/?search=mat2), [mat3](/glossary/?search=mat3), [mat4](/glossary/?search=mat4)
