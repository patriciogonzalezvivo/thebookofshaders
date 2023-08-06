## lessThan
Виконує по-компонентне порівняння двох векторів на меншість компонентів першого вектора по відношенню до другого

### Оголошення
```glsl
bvec2 lessThan(vec2 x, vec2 y)  
bvec3 lessThan(vec3 x, vec3 y)    
bvec4 lessThan(vec4 x, vec4 y)  

bvec2 lessThan(ivec2 x, ivec2 y)  
bvec3 lessThan(ivec3 x, ivec3 y)  
bvec4 lessThan(ivec4 x, ivec4 y)
```

### Параметри
**```x```** — перший вектор для порівняння.

**```y```** — другий вектор для порівняння.

### Опис
**```lessThan()```** повертає булів вектор, у якому кожен елемент **`i`** обчислюється як "**```x[i] < y[i]```**".

### Дивіться також
[lessThanEqual()](/glossary/?lan=ua&search=lessThanEqual), [greaterThan()](/glossary/?lan=ua&search=greaterThan), [greaterThanEqual()](/glossary/?lan=ua&search=greaterThanEqual), [equal()](/glossary/?lan=ua&search=equal), [notEqual()](/glossary/?lan=ua&search=notEqual), [any()](/glossary/?lan=ua&search=any), [all()](/glossary/?lan=ua&search=all), [not()](/glossary/?lan=ua&search=not)
