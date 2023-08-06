## bvec4
4-вимірний булевий вектор

### Оголошення
```glsl
vec4 aBvec4 = bvec4(true, true, true, true);
vec4 bBvec4 = bvec4(true);

vec4 cBvec4 = bvec4(aBvec2, aBool, aBvec3);
vec4 dBvec4 = bvec4(aBvec2.x, aBvec2.y, aBool, aBvec3.x);
```

### Опис
**```bvec4```** — булевий вектор з чотирма компонентами. Способи ініціалізації:

- надання скалярного значення для кожного компонента;
- надання одного скалярного значення, що буде використано для всіх компонентів;
- надання комбінації векторів та/або скалярів. Для ініціалізації вектора використовуються відповідні значення. Аргументи конструктора повинні містити принаймні стільки ж компонентів, скільки ініціалізований вектор.

### Дивіться також
[bool](/glossary/?lan=ua&search=bool), [int](/glossary/?lan=ua&search=int), [float](/glossary/?lan=ua&search=float), [bvec2](/glossary/?lan=ua&search=bvec2), [bvec3](/glossary/?lan=ua&search=bvec3), [bvec4](/glossary/?lan=ua&search=bvec4), [ivec2](/glossary/?lan=ua&search=ivec2), [ivec3](/glossary/?lan=ua&search=ivec3), [ivec4](/glossary/?lan=ua&search=ivec4), [vec2](/glossary/?lan=ua&search=vec2), [vec3](/glossary/?lan=ua&search=vec3), [vec4](/glossary/?lan=ua&search=vec4), [mat2](/glossary/?lan=ua&search=mat2), [mat3](/glossary/?lan=ua&search=mat3), [mat4](/glossary/?lan=ua&search=mat4)
