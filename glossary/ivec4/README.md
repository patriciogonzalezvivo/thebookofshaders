## Ivec4
4 dimensional integer vector

### Declaration
```glsl
vec4 aIvec4 = ivec4(1, 1, 1, 1);
vec4 bIvec4 = ivec4(1);

vec4 cIvec4 = ivec4(aIvec2, aInteger, aIvec3);
vec4 dIvec4 = ivec4(aIvec2.x, aIvec2.y, aInt, aIvec3.x);
```

### Description
```ivec4``` is an integer vector with four components. It can be initialized by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a combination of vectors and/or scalars. The respective values are used to initialize the vector. The arguments of the constructor must have at least as many components as the vector that is initialized.

### See Also
[bool](/glossary/?search=bool), [int](/glossary/?search=int), [float](/glossary/?search=float), [bvec2](/glossary/?search=bvec2), [bvec3](/glossary/?search=bvec3), [bvec4](/glossary/?search=bvec4), [ivec2](/glossary/?search=ivec2), [ivec3](/glossary/?search=ivec3), [ivec4](/glossary/?search=ivec4), [vec2](/glossary/?search=vec2), [vec3](/glossary/?search=vec3), [vec4](/glossary/?search=vec4), [mat2](/glossary/?search=mat2), [mat3](/glossary/?search=mat3), [mat4](/glossary/?search=mat4)
