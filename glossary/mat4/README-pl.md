## mat4
Macierz 4x4 liczb zmiennoprzecinkowych

### Deklaracja
```glsl
mat4 aMat4 = mat4(1.0, 0.0, 0.0, 0.0,  // 1. kolumna
                  0.0, 1.0, 0.0, 0.0,  // 2. kolumna
                  0.0, 0.0, 1.0, 0.0,  // 3. kolumna
                  0.0, 0.0, 0.0, 1.0); // 4. kolumna
mat4 bMat4 = mat4(1.0);

mat4 cMat4 = mat4(aVec4, bVec4, cVec4, dVec4);
mat4 dMat4 = mat4(aVec4, aVec3, bVec4, cVec4, aFloat);
```

### Opis
Typ danych ```mat4``` to macierz 4x4 liczb zmiennoprzecinkowych. Jak widać powyżej, można ją zainicjalizować na różne sposoby:

- Podając wartość dla każdej składowej, kolumna po kolumnie.

- Podając jedną wartość, która zostanie użyta dla składowych na głównej przekątnej.

- Podając kombinację wektorów i skalarów.

W ten sam sposób można uzyskać dostęp do danych — składowa po składowej lub kolumna po kolumnie:

```glsl
mat4 aMat4;
aMat4[3][3] = 1.0;
float aFloat = aMat4[3][3];

aMat4[0] = vec4(1.0);
vec4 aVec4 = aMat4[0];
```

### Zobacz też
[mat2](/glossary/?lan=pl&search=mat2), [mat3](/glossary/?lan=pl&search=mat3), [matrixCompMult()](/glossary/?lan=pl&search=matrixCompMult)
