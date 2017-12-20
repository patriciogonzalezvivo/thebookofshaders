## Vec3
3 dimensional floating point vector

### Declaration
```glsl
vec3 aVec3 = vec3(1.0, 1.0, 1.0);
vec3 bVec3 = vec3(1.0);

vec3 cVec3 = vec3(aVec4);
vec3 dVec3 = vec3(aVec4.x, aVec4.y, aVec4.z);

vec3 eVec3 = vec3(aVec2, aFloat);
vec3 fVec3 = vec3(aVec2.x, aVec2.y, aFloat);
```

### Description
```vec3``` is a floating point vector with three components. It can be initialized by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a vector of higher dimension. The respective values are used to initialize the components.
- Providing a combination of vectors and/or scalars. The respective values are used to initialize the vector. The arguments of the constructor must have at least as many components as the vector that is initialized.

### See Also
[bool](/glossary/?search=bool), [int](/glossary/?search=int), [float](/glossary/?search=float), [bvec2](/glossary/?search=bvec2), [bvec3](/glossary/?search=bvec3), [bvec4](/glossary/?search=bvec4), [ivec2](/glossary/?search=ivec2), [ivec3](/glossary/?search=ivec3), [ivec4](/glossary/?search=ivec4), [vec2](/glossary/?search=vec2), [vec3](/glossary/?search=vec3), [vec4](/glossary/?search=vec4), [mat2](/glossary/?search=mat2), [mat3](/glossary/?search=mat3), [mat4](/glossary/?search=mat4)
