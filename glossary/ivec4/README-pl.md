## ivec4
4-wymiarowy wektor całkowitoliczbowy

### Deklaracja
```glsl
ivec4 aIvec4 = ivec4(1, 1, 1, 1);
ivec4 bIvec4 = ivec4(1);

ivec4 cIvec4 = ivec4(aIvec2, aInt, aIvec3);
ivec4 dIvec4 = ivec4(aIvec2.x, aIvec2.y, aInt, aIvec3.x);
```

### Opis
```ivec4``` to wektor całkowitoliczbowy mający cztery składowe. Można go zainicjalizować:

- Podając wartość skalarną dla każdej składowej.
- Podając jedną wartość skalarną. Wartość ta zostanie użyta dla wszystkich składowych.
- Podając kombinację wektorów i/lub skalarów. Odpowiednie wartości zostaną użyte do inicjalizacji wektora. Argumenty konstruktora muszą mieć przynajmniej tyle składowych, ile ma inicjalizowany wektor.

### Zobacz też
[bool](/glossary/?lan=pl&search=bool), [int](/glossary/?lan=pl&search=int), [float](/glossary/?lan=pl&search=float), [bvec2](/glossary/?lan=pl&search=bvec2), [bvec3](/glossary/?lan=pl&search=bvec3), [bvec4](/glossary/?lan=pl&search=bvec4), [ivec2](/glossary/?lan=pl&search=ivec2), [ivec3](/glossary/?lan=pl&search=ivec3), [ivec4](/glossary/?lan=pl&search=ivec4), [vec2](/glossary/?lan=pl&search=vec2), [vec3](/glossary/?lan=pl&search=vec3), [vec4](/glossary/?lan=pl&search=vec4), [mat2](/glossary/?lan=pl&search=mat2), [mat3](/glossary/?lan=pl&search=mat3), [mat4](/glossary/?lan=pl&search=mat4)
