## ivec3
3-вимірний цілочисельний вектор

### Оголошення
```glsl
vec3 aIvec3 = ivec3(1, 1, 1);
vec3 bIvec3 = ivec3(1);

vec3 cIvec3 = ivec3(aIvec4);
vec3 dIvec3 = ivec3(aIvec4.x, aIvec4.y, aIvec4.z);

vec3 eIvec3 = ivec3(aIvec2, aInt);
vec3 fIvec3 = ivec3(aIvec2.x, aIvec2.y, aInt);
```

### Опис
**```ivec3```** — цілочисельний вектор із трьома компонентами. Способи ініціалізації:

- надання скалярного значення для кожного компонента;
- надання одного скалярного значення, що буде використано для всіх компонентів;
- надання вектора вищої розмірності, де відповідні значення будуть використані для ініціалізації компонентів;
- надання комбінації векторів та/або скалярів. Для ініціалізації вектора використовуються відповідні значення. Аргументи конструктора повинні містити принаймні стільки ж компонентів, скільки ініціалізований вектор.

### Дивіться також
[bool](/glossary/?lan=ua&search=bool), [int](/glossary/?lan=ua&search=int), [float](/glossary/?lan=ua&search=float), [bvec2](/glossary/?lan=ua&search=bvec2), [bvec3](/glossary/?lan=ua&search=bvec3), [bvec4](/glossary/?lan=ua&search=bvec4), [ivec2](/glossary/?lan=ua&search=ivec2), [ivec3](/glossary/?lan=ua&search=ivec3), [ivec4](/glossary/?lan=ua&search=ivec4), [vec2](/glossary/?lan=ua&search=vec2), [vec3](/glossary/?lan=ua&search=vec3), [vec4](/glossary/?lan=ua&search=vec4), [mat2](/glossary/?lan=ua&search=mat2), [mat3](/glossary/?lan=ua&search=mat3), [mat4](/glossary/?lan=ua&search=mat4)
