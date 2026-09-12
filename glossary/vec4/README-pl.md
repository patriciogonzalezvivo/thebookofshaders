## vec4
4-wymiarowy wektor zmiennoprzecinkowy

### Deklaracja
```glsl
vec4 aVec4 = vec4(1.0, 1.0, 1.0, 1.0);
vec4 bVec4 = vec4(1.0);

vec4 cVec4 = vec4(aVec2, aFloat, aVec3);
vec4 dVec4 = vec4(aVec2.x, aVec2.y, aFloat, aVec3.x);
```

### Opis
```vec4``` to wektor zmiennoprzecinkowy mający cztery składowe. Można go zainicjalizować:

- Podając wartość skalarną dla każdej składowej.
- Podając jedną wartość skalarną. Wartość ta zostanie użyta dla wszystkich składowych.
- Podając kombinację wektorów i skalarów. Odpowiednie wartości zostaną użyte do inicjalizacji składowych. Argumenty konstruktora muszą mieć przynajmniej tyle składowych, ile ma inicjalizowany wektor.

### Zobacz też
[bool](/glossary/?lan=pl&search=bool), [int](/glossary/?lan=pl&search=int), [float](/glossary/?lan=pl&search=float), [bvec2](/glossary/?lan=pl&search=bvec2), [bvec3](/glossary/?lan=pl&search=bvec3), [bvec4](/glossary/?lan=pl&search=bvec4), [ivec2](/glossary/?lan=pl&search=ivec2), [ivec3](/glossary/?lan=pl&search=ivec3), [ivec4](/glossary/?lan=pl&search=ivec4), [vec2](/glossary/?lan=pl&search=vec2), [vec3](/glossary/?lan=pl&search=vec3), [vec4](/glossary/?lan=pl&search=vec4), [mat2](/glossary/?lan=pl&search=mat2), [mat3](/glossary/?lan=pl&search=mat3), [mat4](/glossary/?lan=pl&search=mat4)
