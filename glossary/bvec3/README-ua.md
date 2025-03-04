## bvec3
3-вимірний булевий вектор

### Оголошення
```glsl
vec3 aBvec3 = bvec3(true, true, true);
vec3 bBvec3 = bvec3(true);

vec3 cBvec3 = bvec3(aBvec4);
vec3 dBvec3 = bvec3(aBvec4.x, aBvec4.y, aBvec4.z);

vec3 eBvec3 = bvec3(aBvec2, aBool);
vec3 fBvec3 = bvec3(aBvec2.x, aBvec2.y, aBool);
```

### Опис
**```bvec3```** — булевий вектор з трьома компонентами. Способи ініціалізації:

- надання скалярного значення для кожного компонента;
- надання одного скалярного значення, що буде використано для всіх компонентів;
- надання вектора вищої розмірності, де відповідні значення будуть використані для ініціалізації компонентів;
- надання комбінації векторів та/або скалярів. Для ініціалізації вектора використовуються відповідні значення. Аргументи конструктора повинні містити принаймні стільки ж компонентів, скільки ініціалізований вектор.

### Дивіться також
[bool](/glossary/?lan=ua&search=bool), [int](/glossary/?lan=ua&search=int), [float](/glossary/?lan=ua&search=float), [bvec2](/glossary/?lan=ua&search=bvec2), [bvec3](/glossary/?lan=ua&search=bvec3), [bvec4](/glossary/?lan=ua&search=bvec4), [ivec2](/glossary/?lan=ua&search=ivec2), [ivec3](/glossary/?lan=ua&search=ivec3), [ivec4](/glossary/?lan=ua&search=ivec4), [vec2](/glossary/?lan=ua&search=vec2), [vec3](/glossary/?lan=ua&search=vec3), [vec4](/glossary/?lan=ua&search=vec4), [mat2](/glossary/?lan=ua&search=mat2), [mat3](/glossary/?lan=ua&search=mat3), [mat4](/glossary/?lan=ua&search=mat4)
