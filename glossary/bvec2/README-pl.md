## bvec2
2-wymiarowy wektor `bool`owski

### Deklaracja
```glsl
bvec2 aBvec2 = bvec2(true, true);
bvec2 bBvec2 = bvec2(true);

bvec2 cBvec2 = bvec2(aBvec3);
bvec2 dBvec2 = bvec2(aBvec3.x, aBvec3.y);
```

### Opis
`bvec2` to wektor `bool`owski z dwoma komponentami. Może być inicjalizowany na kilka sposobów:

- Poprzez podanie wartości skalarnej dla każdego komponentu.
- Poprzez podanie jednej wartości skalarnej – zostanie ona przypisana do wszystkich komponentów.
- Poprzez podanie wektora o wyższym wymiarze – odpowiednie wartości zostaną użyte do inicjalizacji komponentów.

### Zobacz też
[bool](/glossary/?lan=pl&search=bool), [int](/glossary/?lan=pl&search=int), [float](/glossary/?lan=pl&search=float), [bvec2](/glossary/?lan=pl&search=bvec2), [bvec3](/glossary/?lan=pl&search=bvec3), [bvec4](/glossary/?lan=pl&search=bvec4), [ivec2](/glossary/?lan=pl&search=ivec2), [ivec3](/glossary/?lan=pl&search=ivec3), [ivec4](/glossary/?lan=pl&search=ivec4), [vec2](/glossary/?lan=pl&search=vec2), [vec3](/glossary/?lan=pl&search=vec3), [vec4](/glossary/?lan=pl&search=vec4), [mat2](/glossary/?lan=pl&search=mat2), [mat3](/glossary/?lan=pl&search=mat3), [mat4](/glossary/?lan=pl&search=mat4)
