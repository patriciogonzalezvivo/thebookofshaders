## Bvec4
4 dimensional boolean vector

### Declaration
```glsl
vec4 aBvec4 = bvec4(true, true, true, true);
vec4 bBvec4 = bvec4(true);

vec4 cBvec4 = bvec4(aBvec2, aBool, aBvec3);
vec4 dBvec4 = bvec4(aBvec2.x, aBvec2.y, aBool, aBvec3.x);
```

### Description
```bvec4``` is a boolean vector with four components. It can be initialized by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a combination of vectors and scalars. The respective values are used to initialize the components. The arguments of the constructor must have at least as many components as the vector that is initialized.

### See Also
[bool](/glossary/?search=bool), [int](/glossary/?search=int), [float](/glossary/?search=float), [bvec2](/glossary/?search=bvec2), [bvec3](/glossary/?search=bvec3), [bvec4](/glossary/?search=bvec4), [ivec2](/glossary/?search=ivec2), [ivec3](/glossary/?search=ivec3), [ivec4](/glossary/?search=ivec4), [vec2](/glossary/?search=vec2), [vec3](/glossary/?search=vec3), [vec4](/glossary/?search=vec4), [mat2](/glossary/?search=mat2), [mat3](/glossary/?search=mat3), [mat4](/glossary/?search=mat4)
