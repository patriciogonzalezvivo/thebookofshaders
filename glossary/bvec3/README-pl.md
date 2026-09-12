## bvec3
3-wymiarowy wektor logiczny

### Deklaracja
```glsl
bvec3 aBvec3 = bvec3(true, true, true);
bvec3 bBvec3 = bvec3(true);

bvec3 cBvec3 = bvec3(aBvec4);
bvec3 dBvec3 = bvec3(aBvec4.x, aBvec4.y, aBvec4.z);

bvec3 eBvec3 = bvec3(aBvec2, aBool);
bvec3 fBvec3 = bvec3(aBvec2.x, aBvec2.y, aBool);
```

### Opis
```bvec3``` to wektor logiczny mający trzy składowe. Można go zainicjalizować:

- Podając wartość skalarną dla każdej składowej.
- Podając jedną wartość skalarną. Wartość ta zostanie użyta dla wszystkich składowych.
- Podając wektor o wyższym wymiarze. Odpowiednie wartości zostaną użyte do inicjalizacji składowych.
- Podając kombinację wektorów i/lub skalarów. Odpowiednie wartości zostaną użyte do inicjalizacji wektora. Argumenty konstruktora muszą mieć przynajmniej tyle składowych, ile ma inicjalizowany wektor.

### Zobacz też
[bool](/glossary/?lan=pl&search=bool), [int](/glossary/?lan=pl&search=int), [float](/glossary/?lan=pl&search=float), [bvec2](/glossary/?lan=pl&search=bvec2), [bvec3](/glossary/?lan=pl&search=bvec3), [bvec4](/glossary/?lan=pl&search=bvec4), [ivec2](/glossary/?lan=pl&search=ivec2), [ivec3](/glossary/?lan=pl&search=ivec3), [ivec4](/glossary/?lan=pl&search=ivec4), [vec2](/glossary/?lan=pl&search=vec2), [vec3](/glossary/?lan=pl&search=vec3), [vec4](/glossary/?lan=pl&search=vec4), [mat2](/glossary/?lan=pl&search=mat2), [mat3](/glossary/?lan=pl&search=mat3), [mat4](/glossary/?lan=pl&search=mat4)
