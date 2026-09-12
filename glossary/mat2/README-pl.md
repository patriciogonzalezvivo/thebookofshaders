## mat2
Macierz 2x2 liczb zmiennoprzecinkowych

### Deklaracja
```glsl
mat2 aMat2 = mat2(1.0, 0.0,  // 1. kolumna
                  0.0, 1.0); // 2. kolumna
mat2 bMat2 = mat2(1.0);
mat2 cMat2 = mat2(aVec2, bVec2);
mat2 dMat2 = mat2(aVec3, aFloat);
```

### Opis
Typ danych ```mat2``` to macierz 2x2 liczb zmiennoprzecinkowych. Jak widać powyżej, można ją zainicjalizować na różne sposoby:

- Podając wartość dla każdej składowej, kolumna po kolumnie.

- Podając jedną wartość, która zostanie użyta dla składowych na głównej przekątnej.

- Podając kombinację wektorów i skalarów.

W ten sam sposób można uzyskać dostęp do danych — składowa po składowej lub kolumna po kolumnie:

```glsl
mat2 aMat2;
aMat2[1][1] = 1.0;
float aFloat = aMat2[1][1];

aMat2[0] = vec2(1.0);
vec2 aVec2 = aMat2[0];
```

### Zobacz też
[mat3](/glossary/?lan=pl&search=mat3), [mat4](/glossary/?lan=pl&search=mat4), [matrixCompMult()](/glossary/?lan=pl&search=matrixCompMult)
