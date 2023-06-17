## refract
Обчислює напрямок заломлення для падаючого вектора

### Оголошення
```glsl
float refract(float I, float N, float eta)  
vec2 refract(vec2 I, vec2 N, float eta)  
vec3 refract(vec3 I, vec3 N, float eta)  
vec4 refract(vec4 I, vec4 N, float eta)
```

### Параметри
**```I```** — вектор інциденту (падаючий вектор).

**```N```** — вектор нормалі.

**```eta```** — співвідношення показників заломлення.

### Опис
Для вектора падіння **`I`**, нормалі до поверхні **`N`** та співвідношення показників заломлення **`eta`**, **`refract`** повертає вектор заломлення **`R`**.

**```R```** обчислюється як:
```glsl
k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));
if (k < 0.0)
    R = genType(0.0);     // or genDType(0.0)
else
    R = eta * I - (eta * dot(N, I) + sqrt(k)) * N;
```
Вхідні параметри **`I`** та **`N`** повинні бути нормалізовані для досягнення бажаного результату.

### Дивіться також
[dot()](/glossary/?lan=ua&search=dot), [reflect()](/glossary/?lan=ua&search=reflect)
