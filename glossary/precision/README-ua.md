## precision
Кваліфікатор точності оголошує мінімальний діапазон і точність, які базова реалізація повинна використовувати під час зберігання відповідних змінних.

### Приклад
```glsl
precision lowp float;
precision mediump float;
precision highp float;
precision lowp int;  
precision mediump int;  
precision highp int;  
```

### Значення
**```lowp```** — 8+ біт, діапазон для **`float`** від -2 до 2, діапазон для **`int`** від -2^8 до 2^8

**```mediump```** — 16+ біт, діапазон для **`float`** від -2^14 to +2^14, діапазон для **`int`** від -2^10 до 2^10

**```highp```** — 32+ біт, діапазон для **`float`** від -2^62 to +2^62, діапазон для **`int`** від -2^16 до 2^16

### Дивіться також
[lowp](/glossary/?lan=ua&search=lowp), [mediump](/glossary/?lan=ua&search=mediump), [highp](/glossary/?lan=ua&search=highp)
