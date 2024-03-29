## mat4
Матриця розміром 4x4 зі значеннями типу float

### Оголошення
```glsl
mat4 aMat4 = mat4(
    1.0, 0.0, 0.0, 0.0,  // 1. column
    0.0, 1.0, 0.0, 0.0,  // 2. column
    0.0, 0.0, 1.0, 0.0,  // 3. column
    0.0, 0.0, 0.0, 1.0   // 4. column
);
mat4 bMat4 = mat4(1.0);

mat4 cMat4 = mat4(aVec4, bVec4, cVec4, dVec4);
mat4 dMat4 = mat4(aVec4, aVec3, bVec4, cVec4, aFloat);
```

### Опис
**```mat4```** — тип даних, що є матрицею розміром 4x4 із значеннями типу **`float`**. Як видно із прикладу вище, ініціалізувати можна різними способами:

- надання значень для кожного компонента стовпець за стовпцем;

- надання одного значення, яке використовується для компонентів на головній діагоналі;

- надання комбінації векторів і скалярів;

Так само можна отримати доступ до даних покомпонентно або стовпець за стовпцем:

```glsl
aMat4[3][3] = 1.0;
float aFloat = aMat4[3][3];

aMat4[0] = vec4(1.0);
vec4 aVec4 = aMat4[0];
```

### Дивіться також
[mat2](/glossary/?lan=ua&search=mat2), [mat3](/glossary/?lan=ua&search=mat3), [matrixCompMult()](/glossary/?lan=ua&search=matrixCompMult)
