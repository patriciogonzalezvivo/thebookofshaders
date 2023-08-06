## matrixCompMult
Виконує покомпонентне множення двох матриць

### Оголошення
```glsl
mat2 matrixCompMult(mat2 x, mat2 y)  
mat3 matrixCompMult(mat3 x, mat3 y)  
mat4 matrixCompMult(mat4 x, mat4 y)
```

### Параметри
**```x```** — перший матричний множник.

**```y```** — другий матричний множник.

### Опис
**```matrixCompMult()```** виконує покомпонентне множення двох матриць, повертаючи нову матрицю, де кожен компонент **```result[i][j]```** обчислюється як скалярний добуток **```x[i][j]```** та **```y[i][j]```**.

### Дивіться також
[mat2](/glossary/?lan=ua&search=mat2), [mat3](/glossary/?lan=ua&search=mat3), [mat4](/glossary/?lan=ua&search=mat4), [Розділ 08: Матриці](../08/?lan=ua)
