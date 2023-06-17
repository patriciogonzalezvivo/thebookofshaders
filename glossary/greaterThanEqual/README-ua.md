## greaterThanEqual
Виконує по-компонентне порівняння двох векторів на більшість або рівність компонентів першого вектора по відношенню до другого

### Оголошення
```glsl
bvec2 greaterThanEqual(vec2 x, vec2 y)  
bvec3 greaterThanEqual(vec3 x, vec3 y)  
bvec4 greaterThanEqual(vec4 x, vec4 y)  

bvec2 greaterThanEqual(ivec2 x, ivec2 y)  
bvec3 greaterThanEqual(ivec3 x, ivec3 y)  
bvec4 greaterThanEqual(ivec4 x, ivec4 y)
```

### Параметри
**```x```** — перший вектор для порівняння.

**```y```** — другий вектор для порівняння.

### Опис
**```greaterThanEqual()```** повертає булів вектор, у якому кожен елемент **`i`** обчислюється як "**```x[i] ≥ y[i]```**".

### Дивіться також
[lessThanEqual()](/glossary/?lan=ua&search=lessThanEqual), [lessThan()](/glossary/?lan=ua&search=lessThan), [greaterThan()](/glossary/?lan=ua&search=greaterThan), [equal()](/glossary/?lan=ua&search=equal), [notEqual()](/glossary/?lan=ua&search=notEqual), [any()](/glossary/?lan=ua&search=any), [all()](/glossary/?lan=ua&search=all), [not()](/glossary/?lan=ua&search=not)
