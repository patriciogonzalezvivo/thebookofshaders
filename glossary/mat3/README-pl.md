## mat3
Macierz 3x3 liczb zmiennoprzecinkowych

### Deklaracja
```glsl
mat3 aMat3 = mat3(1.0, 0.0, 0.0,  // 1. kolumna
                  0.0, 1.0, 0.0,  // 2. kolumna
                  0.0, 0.0, 1.0); // 3. kolumna
mat3 bMat3 = mat3(1.0);

mat3 cMat3 = mat3(aVec3, bVec3, cVec3);
mat3 dMat3 = mat3(aVec4, bVec4, aFloat);
```

### Opis
Typ danych ```mat3``` to macierz 3x3 liczb zmiennoprzecinkowych. Jak widać powyżej, można ją zainicjalizować na różne sposoby:

- Podając wartość dla każdej składowej, kolumna po kolumnie.

- Podając jedną wartość, która zostanie użyta dla składowych na głównej przekątnej.

- Podając kombinację wektorów i skalarów.

W ten sam sposób można uzyskać dostęp do danych — składowa po składowej lub kolumna po kolumnie:

```glsl
mat3 aMat3;
aMat3[2][2] = 1.0;
float aFloat = aMat3[2][2];

aMat3[0] = vec3(1.0);
vec3 aVec3 = aMat3[0];
```

### Zobacz też
[mat2](/glossary/?lan=pl&search=mat2), [mat4](/glossary/?lan=pl&search=mat4), [matrixCompMult()](/glossary/?lan=pl&search=matrixCompMult)
