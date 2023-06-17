## smoothstep
Виконує плавну інтерполяцію Ерміта між двома значеннями

### Оголошення
```glsl
float smoothstep(float edge0, float edge1, float x)  
vec2 smoothstep(vec2 edge0, vec2 edge1, vec2 x)  
vec3 smoothstep(vec3 edge0, vec3 edge1, vec3 x)  
vec4 smoothstep(vec4 edge0, vec4 edge1, vec4 x)

vec2 smoothstep(float edge0, float edge1, vec2 x)  
vec3 smoothstep(float edge0, float edge1, vec3 x)  
vec4 smoothstep(float edge0, float edge1, vec4 x)
```

### Параметри
**```edge0```** — значення нижнього краю функції Ерміта.

**```edge1```** — значення верхнього краю функції Ерміта.

**```x```** — значення для інтерполяції.

### Опис
**```smoothstep()```** виконує плавну інтерполяцію Ерміта між **`0`** і **`1`**, коли **`edge0 < x < edge1`**. Це корисно у випадках, коли потрібна порогова функція з плавним переходом. Результат **`smoothstep()`** еквівалентний до:
```glsl
    genType t;  /* Or genDType t; */
    t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
```

Результат не визначено, якщо **`edge0 ≥ edge1`**.

<div class="simpleFunction" data="y = smoothstep(0.0, 1.0, x);"></div>

<div class="codeAndCanvas" data="../05/smoothstep.frag"></div>

### Дивіться також
[mix](/glossary/?lan=ua&search=mix), [step](/glossary/?lan=ua&search=step), [Розділ 05: Формотворчі функції](/05/?lan=ua)
