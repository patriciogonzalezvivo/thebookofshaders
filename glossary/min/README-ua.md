## min
Повертає менше з двох значень

### Оголошення
```glsl
float min(float x, float y)  
vec2 min(vec2 x, vec2 y)  
vec3 min(vec3 x, vec3 y)  
vec4 min(vec4 x, vec4 y)

vec2 min(vec2 x, float y)  
vec3 min(vec3 x, float y)  
vec4 min(vec4 x, float y)
```

### Параметри
**```x```** — перше значення для порівняння.

**```y```** — друге значення для порівняння.

### Опис
**```min()```** повертає мінімальне значення із двох параметрів. Повертає **`y`**, якщо він менше за **`x`**, інакше повертає **`x`**.

<div class="simpleFunction" data="y = min(x,0.5);"></div>

### Дивіться також
[max](/glossary/?lan=ua&search=max), [abs](/glossary/?lan=ua&search=abs), [clamp](/glossary/?lan=ua&search=clamp), [Розділ 05: Формотворчі функції](/05/?lan=ua)
