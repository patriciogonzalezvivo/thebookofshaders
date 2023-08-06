## vec3
3-вимірний вектор із float-компонентами

### Оголошення
```glsl
vec3 aVec3 = vec3(1.0, 1.0, 1.0);
vec3 bVec3 = vec3(1.0);

vec3 cVec3 = vec3(aVec4);
vec3 dVec3 = vec3(aVec4.x, aVec4.y, aVec4.z);

vec3 eVec3 = vec3(aVec2, aFloat);
vec3 fVec3 = vec3(aVec2.x, aVec2.y, aFloat);
```

### Опис
**```vec3```** — вектор з трьома float-компонентами. Способи ініціалізації:

- надання скалярного значення для кожного компонента;
- надання одного скалярного значення, що буде використано для всіх компонентів;
- надання вектора вищої розмірності, де відповідні значення будуть використані для ініціалізації компонентів;
- надання комбінації векторів та/або скалярів. Для ініціалізації вектора використовуються відповідні значення. Аргументи конструктора повинні містити принаймні стільки ж компонентів, скільки ініціалізований вектор.

### Дивіться також
[bool](/glossary/?lan=ua&search=bool), [int](/glossary/?lan=ua&search=int), [float](/glossary/?lan=ua&search=float), [bvec2](/glossary/?lan=ua&search=bvec2), [bvec3](/glossary/?lan=ua&search=bvec3), [bvec4](/glossary/?lan=ua&search=bvec4), [ivec2](/glossary/?lan=ua&search=ivec2), [ivec3](/glossary/?lan=ua&search=ivec3), [ivec4](/glossary/?lan=ua&search=ivec4), [vec2](/glossary/?lan=ua&search=vec2), [vec3](/glossary/?lan=ua&search=vec3), [vec4](/glossary/?lan=ua&search=vec4), [mat2](/glossary/?lan=ua&search=mat2), [mat3](/glossary/?lan=ua&search=mat3), [mat4](/glossary/?lan=ua&search=mat4)
