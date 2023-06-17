## faceforward
Повертає вектор, що вказує в тому ж напрямку, що й інший

### Оголошення
```glsl
float faceforward(float N, float I, float Nref)  
vec2 faceforward(vec2 N, vec2 I, vec2 Nref)  
vec3 faceforward(vec3 N, vec3 I, vec3 Nref)  
vec4 faceforward(vec4 N, vec4 I, vec4 Nref)
```

### Параметри
**```N```** — вектор для орієнтації.

**```I```** — вектор інциденту.

**```Nref```** — опорний вектор.

### Опис
**```faceforward()```** орієнтує вектор так, щоб він був направлений від поверхні, яка визначена її нормаллю. Якщо **```If dot(Nref, I) < 0```** функція повертає **`N`**, інакше **`-N`**.

### Дивіться також
[reflect()](/glossary/?lan=ua&search=reflect), [refract()](/glossary/?lan=ua&search=refract)
