## all
Перевіряє чи всі елементи логічного вектора істинні

### Оголошення
```glsl
bool any(bvec2 x)  
bool any(bvec3 x)  
bool any(bvec4 x)
```

### Параметри
**```x```** — вектор, який буде перевірено на істинність.

### Опис
**```all()```** повертає **`true`**, якщо всі елементи **`x`** мають значення **`true`**, інакше повертається **`false`**. Функціонально це еквівалентно до наступного коду:

```glsl
bool all(bvec x) {       // bvec може бути bvec2, bvec3 або bvec4
    bool result = true;
    int i;

    for (i = 0; i < x.length(); ++i) {
        result &= x[i];
    }

    return result;
}
```

### Дивіться також
[any()](/glossary/?lan=ua&search=any), [not()](/glossary/?lan=ua&search=not)
