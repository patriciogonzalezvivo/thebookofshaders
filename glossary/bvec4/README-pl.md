## bvec4
4-wymiarowy wektor logiczny

### Deklaracja
```glsl
bvec4 aBvec4 = bvec4(true, true, true, true);
bvec4 bBvec4 = bvec4(true);

bvec4 cBvec4 = bvec4(aBvec2, aBool, aBvec3);
bvec4 dBvec4 = bvec4(aBvec2.x, aBvec2.y, aBool, aBvec3.x);
```

### Opis
```bvec4``` to wektor logiczny mający cztery składowe. Można go zainicjalizować:

- Podając wartość skalarną dla każdej składowej.
- Podając jedną wartość skalarną. Wartość ta zostanie użyta dla wszystkich składowych.
- Podając kombinację wektorów i skalarów. Odpowiednie wartości zostaną użyte do inicjalizacji składowych. Argumenty konstruktora muszą mieć przynajmniej tyle składowych, ile ma inicjalizowany wektor.

### Zobacz też
[bool](/glossary/?lan=pl&search=bool), [int](/glossary/?lan=pl&search=int), [float](/glossary/?lan=pl&search=float), [bvec2](/glossary/?lan=pl&search=bvec2), [bvec3](/glossary/?lan=pl&search=bvec3), [bvec4](/glossary/?lan=pl&search=bvec4), [ivec2](/glossary/?lan=pl&search=ivec2), [ivec3](/glossary/?lan=pl&search=ivec3), [ivec4](/glossary/?lan=pl&search=ivec4), [vec2](/glossary/?lan=pl&search=vec2), [vec3](/glossary/?lan=pl&search=vec3), [vec4](/glossary/?lan=pl&search=vec4), [mat2](/glossary/?lan=pl&search=mat2), [mat3](/glossary/?lan=pl&search=mat3), [mat4](/glossary/?lan=pl&search=mat4)
