## step
Генерує східчасту функцію, порівнюючи два значення

### Оголошення
```glsl
float step(float edge, float x)  
vec2 step(vec2 edge, vec2 x)  
vec3 step(vec3 edge, vec3 x)  
vec4 step(vec4 edge, vec4 x)

vec2 step(float edge, vec2 x)  
vec3 step(float edge, vec3 x)  
vec4 step(float edge, vec4 x)
```

### Параметри
**```edge```** — порогове значення.

**```x```** — значення для генерації східчастої функції.

### Опис
**```step()```** генерує східчасту функцію шляхом порівняння **`x`** із **`edge`**.

Якщо передане значення **`x`** менше за **`edge`**, то функція повертає **`0.0`**, інакше повертається **`1.0`**.

<div class="simpleFunction" data="y = step(0.5,x); "></div>

<div class="codeAndCanvas" data="../05/step.frag"></div>

### Дивіться також
[mix](/glossary/?lan=ua&search=mix), [smoothstep](/glossary/?lan=ua&search=smoothstep), [Розділ 05: Формотворчі функції](/05/?lan=ua)
