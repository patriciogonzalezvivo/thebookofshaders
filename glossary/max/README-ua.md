## max
Повертає більше з двох значень

### Оголошення
```glsl
float max(float x, float y)  
vec2 max(vec2 x, vec2 y)  
vec3 max(vec3 x, vec3 y)  
vec4 max(vec4 x, vec4 y)

vec2 max(vec2 x, float y)  
vec3 max(vec3 x, float y)  
vec4 max(vec4 x, float y)
```

### Параметри
**```x```** — перше значення для порівняння.

**```y```** — друге значення для порівняння.

### Опис
**```max()```** повертає максимальне значення із двох параметрів. Повертає **`y`**, якщо він більше за **`x`**, інакше повертає **`x`**.

<div class="simpleFunction" data="y = max(x,0.5);"></div>

### Дивіться також
[min](/glossary/?lan=ua&search=min), [abs](/glossary/?lan=ua&search=abs), [clamp](/glossary/?lan=ua&search=clamp), [Розділ 05: Формотворчі функції](/05/?lan=ua)
