## mix
Виконує лінійну інтерполяцію між двома значеннями.

### Оголошення
```glsl
float mix(float x, float y, float a)  
vec2 mix(vec2 x, vec2 y, vec2 a)  
vec3 mix(vec3 x, vec3 y, vec3 a)  
vec4 mix(vec4 x, vec4 y, vec4 a)

vec2 mix(vec2 x, vec2 y, float a)  
vec3 mix(vec3 x, vec3 y, float a)  
vec4 mix(vec4 x, vec4 y, float a)
```

### Параметри
**```x```** — початок діапазону інтерполяції.

**```y```** — кінець діапазону інтерполяції.

**```a```** — процентне значення ваги для інтерполяції, від 0.0 до 1.0.

### Опис
**```mix()```** виконує лінійну інтерполяцію між **`x`** та **`y`** використовуючи **`a`** для зважування між ними. Повернене значення обчислюється як "**```x * (1 − a) + y * a```**".

<div class="codeAndCanvas" data="../06/mix.frag"></div>

<div class="codeAndCanvas" data="../06/gradient.frag"></div>

### Дивіться також
[min](/glossary/?lan=ua&search=min), [max](/glossary/?lan=ua&search=max), [Розділ 06: Кольори](/06/?lan=ua)
