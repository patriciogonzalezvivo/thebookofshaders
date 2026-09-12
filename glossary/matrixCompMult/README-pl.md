## matrixCompMult
Wykonuje mnożenie dwóch macierzy element po elemencie

### Deklaracja
```glsl
mat2 matrixCompMult(mat2 x, mat2 y)
mat3 matrixCompMult(mat3 x, mat3 y)
mat4 matrixCompMult(mat4 x, mat4 y)
```

### Parametry
```x``` określa pierwszy czynnik mnożenia.

```y``` określa drugi czynnik mnożenia.

### Opis
```matrixCompMult()``` wykonuje mnożenie dwóch macierzy element po elemencie, dając w wyniku macierz, w której każda składowa ```result[i][j]``` obliczana jest jako iloczyn ```x[i][j]``` i ```y[i][j]```.

### Zobacz też
[Rozdział 08: Macierze](/08/?lan=pl)
