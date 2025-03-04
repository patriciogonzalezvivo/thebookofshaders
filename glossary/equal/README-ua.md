## equal
Виконує по-компонентне порівняння двох векторів

### Оголошення
```glsl
bvec2 equal(vec2 x, vec2 y)  
bvec3 equal(vec3 x, vec3 y)  
bvec4 equal(vec4 x, vec4 y)  

bvec2 equal(ivec2 x, ivec2 y)  
bvec3 equal(ivec3 x, ivec3 y)  
bvec4 equal(ivec4 x, ivec4 y)
```

### Параметри
**```x```** — перший вектор для порівняння.

**```y```** — другий вектор для порівняння.

### Опис
**```equal()```** повертає булів вектор, у якому кожен елемент **`i`** обчислюється як "**```x[i] == y[i]```**".

### Дивіться також
[lessThanEqual()](/glossary/?lan=ua&search=lessThanEqual), [lessThan()](/glossary/?lan=ua&search=lessThan), [greaterThanEqual()](/glossary/?lan=ua&search=greaterThanEqual), [greaterThan()](/glossary/?lan=ua&search=greaterThan), [notEqual()](/glossary/?lan=ua&search=notEqual), [any()](/glossary/?lan=ua&search=any), [all()](/glossary/?lan=ua&search=all), [not()](/glossary/?lan=ua&search=not)
