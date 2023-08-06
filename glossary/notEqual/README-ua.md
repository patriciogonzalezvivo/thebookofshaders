## notEqual
Виконує по-компонентне порівняння двох векторів на нерівність

### Оголошення
```glsl
bvec2 notEqual(vec2 x, vec2 y)  
bvec3 notEqual(vec3 x, vec3 y)  
bvec4 notEqual(vec4 x, vec4 y)  

bvec2 notEqual(ivec2 x, ivec2 y)  
bvec3 notEqual(ivec3 x, ivec3 y)  
bvec4 notEqual(ivec4 x, ivec4 y)
```

### Параметри
**```x```** — перший вектор для порівняння.

**```y```** — другий вектор для порівняння.

### Опис
**```notEqual()```** повертає булів вектор, у якому кожен елемент **`i`** обчислюється як "**```x[i] != y[i]```**".

### Дивіться також
[lessThanEqual()](/glossary/?lan=ua&search=lessThanEqual), [lessThan()](/glossary/?lan=ua&search=lessThan), [greaterThanEqual()](/glossary/?lan=ua&search=greaterThanEqual), [greaterThan()](/glossary/?lan=ua&search=greaterThan), [equal()](/glossary/?lan=ua&search=equal), [any()](/glossary/?lan=ua&search=any), [all()](/glossary/?lan=ua&search=all), [not()](/glossary/?lan=ua&search=not)
