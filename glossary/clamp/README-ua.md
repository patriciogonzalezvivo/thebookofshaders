## clamp
Повертає значення в діапазоні між двома обмежувачами

### Оголошення
```glsl
float clamp(float x, float minVal, float maxVal)  
vec2 clamp(vec2 x, vec2 minVal, vec2 maxVal)  
vec3 clamp(vec3 x, vec3 minVal, vec3 maxVal)  
vec4 clamp(vec4 x, vec4 minVal, vec4 maxVal)

vec2 clamp(vec2 x, float minVal, float maxVal)  
vec3 clamp(vec3 x, float minVal, float maxVal)  
vec4 clamp(vec4 x, float minVal, float maxVal)
```

### Параметри
**```x```** — значення для обмеження.

**```minVal```** — нижня межа діапазону.

**```maxVal```** — верхня межа діапазону.

### Опис
**```clamp()```** повертає значення **`x`** обмежене діапазоном від **`minVal`** до **`maxVal`**. Повернене значення обчислюється як **```min(max(x, minVal), maxVal)```**.

<div class="simpleFunction" data="y = clamp(x,0.,1.);"></div>

### Дивіться також
[min](/glossary/?lan=ua&search=min), [abs](/glossary/?lan=ua&search=abs), [max](/glossary/?lan=ua&search=max), [Розділ 05: Формотворчі функції](/05/?lan=ua)
