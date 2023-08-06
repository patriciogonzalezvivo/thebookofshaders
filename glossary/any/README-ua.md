## any
Перевіряє чи хоча б один елемент булевого вектора має значення true

### Оголошення
```glsl
bool all(bvec2 x)  
bool all(bvec3 x)  
bool all(bvec4 x)
```

### Параметри
**```x```** — вектор, який буде перевірено на істинність.

### Опис
**```any()```** повертає **`true`**, якщо будь-який елемент **`x`** має значення **`true`**, інакше повертається **`false`**. Функціонально це еквівалентно до наступного коду:

```glsl
bool any(bvec x) {     // bvec може бути bvec2, bvec3 або bvec4
    bool result = false;
    int i;

    for (i = 0; i < x.length(); ++i) {
        result |= x[i];
    }

    return result;
}
```

### Дивіться також
[any()](/glossary/?lan=ua&search=any), [not()](/glossary/?lan=ua&search=not)
