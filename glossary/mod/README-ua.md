## mod
Повертає залишок від ділення першого параметра на другий. Результат має такий самий знак, як і дільник.

### Оголошення
```glsl
float mod(float x, float y)  
vec2 mod(vec2 x, vec2 y)  
vec3 mod(vec3 x, vec3 y)  
vec4 mod(vec4 x, vec4 y)

vec2 mod(vec2 x, float y)  
vec3 mod(vec3 x, float y)  
vec4 mod(vec4 x, float y)
```

### Параметри
**```x```** — число, для якого потрібно знайти залишок.

**```y```** — число, на яке потрібно виконати ділення.

### Опис
**```mod()```** повертає значення операції модуля **`x`** на **`y`**. Обчислюється як "**```x - y ⋅ floor(x / y)```**".

<div class="simpleFunction" data="y = mod(x,1.5);"></div>

### Дивіться також
[floor](/glossary/?lan=ua&search=floor), [fract](/glossary/?lan=ua&search=fract), [ceil](/glossary/?lan=ua&search=ceil), [Розділ 05: Формотворчі функції](/05/?lan=ua)
