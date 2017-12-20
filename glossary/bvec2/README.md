## Bvec2
2 dimensional boolean vector

### Declaration
```glsl
bvec2 aBvec2 = bvec2(true, true);
bvec2 bBvec2 = bvec2(true);

bvec2 cBvec2 = bvec2(aBvec3);
bvec2 dBvec2 = bvec2(aBvec3.x, aBvec3.y);
```

### Description
```bvec2``` is a boolean vector with two components. It can be initialized by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a vector of higher dimension. The respective values are used to initialize the components.

### See Also
[bool](/glossary/?search=bool), [int](/glossary/?search=int), [float](/glossary/?search=float), [bvec2](/glossary/?search=bvec2), [bvec3](/glossary/?search=bvec3), [bvec4](/glossary/?search=bvec4), [ivec2](/glossary/?search=ivec2), [ivec3](/glossary/?search=ivec3), [ivec4](/glossary/?search=ivec4), [vec2](/glossary/?search=vec2), [vec3](/glossary/?search=vec3), [vec4](/glossary/?search=vec4), [mat2](/glossary/?search=mat2), [mat3](/glossary/?search=mat3), [mat4](/glossary/?search=mat4)
