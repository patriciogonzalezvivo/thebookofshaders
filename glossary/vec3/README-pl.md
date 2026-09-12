## vec3
3-wymiarowy wektor zmiennoprzecinkowy

### Deklaracja
```glsl
vec3 aVec3 = vec3(1.0, 1.0, 1.0);
vec3 bVec3 = vec3(1.0);

vec3 cVec3 = vec3(aVec4);
vec3 dVec3 = vec3(aVec4.x, aVec4.y, aVec4.z);

vec3 eVec3 = vec3(aVec2, aFloat);
vec3 fVec3 = vec3(aVec2.x, aVec2.y, aFloat);
```

### Opis
```vec3``` to wektor zmiennoprzecinkowy mający trzy składowe. Można go zainicjalizować:

- Podając wartość skalarną dla każdej składowej.
- Podając jedną wartość skalarną. Wartość ta zostanie użyta dla wszystkich składowych.
- Podając wektor o wyższym wymiarze. Odpowiednie wartości zostaną użyte do inicjalizacji składowych.
- Podając kombinację wektorów i/lub skalarów. Odpowiednie wartości zostaną użyte do inicjalizacji wektora. Argumenty konstruktora muszą mieć przynajmniej tyle składowych, ile ma inicjalizowany wektor.

### Zobacz też
[bool](/glossary/?lan=pl&search=bool), [int](/glossary/?lan=pl&search=int), [float](/glossary/?lan=pl&search=float), [bvec2](/glossary/?lan=pl&search=bvec2), [bvec3](/glossary/?lan=pl&search=bvec3), [bvec4](/glossary/?lan=pl&search=bvec4), [ivec2](/glossary/?lan=pl&search=ivec2), [ivec3](/glossary/?lan=pl&search=ivec3), [ivec4](/glossary/?lan=pl&search=ivec4), [vec2](/glossary/?lan=pl&search=vec2), [vec3](/glossary/?lan=pl&search=vec3), [vec4](/glossary/?lan=pl&search=vec4), [mat2](/glossary/?lan=pl&search=mat2), [mat3](/glossary/?lan=pl&search=mat3), [mat4](/glossary/?lan=pl&search=mat4)
