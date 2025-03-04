## struct
Визначає тип користувацької структури.

### Приклад
```glsl
struct matStruct {
    vec4 ambientColor;
    vec4 diffuseColor;
    vec4 specularColor;
    float specularExponent;
} newMaterialOne, newMaterialTwo; // одночасне оголошення змінних newMaterialOne та newMaterialTwo з типом matStruct 

// перед змінною newMaterialOne вже не потрібно вказувати тип matStruct, оскільки вона вже була оголошена раніше
newMaterialOne = matStruct(
    vec4(0.1, 0.1, 0.1, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(0.7, 0.7, 0.7, 1.0),
    50.0
);

// matStruct тепер використовується для позначення змінних відповідного типу
matStruct anotherNewMaterial = matStruct(...);

```

### Опис
**```struct```** оголошує користувацьку структуру даних на основі стандартних типів. Конструктор для такої структури створюється автоматично. Оголошення змінної, в даному прикладі "newMaterialOne", є необов'язковим, якщо її назва була перечислена одразу після оголошення структури.
