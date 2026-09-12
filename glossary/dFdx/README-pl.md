## dFdx
Zwraca pochodną cząstkową podanego wyrażenia względem x

### Deklaracja
```glsl
genType dFdx(genType p);
```

### Parametry
```p``` określa wyrażenie, którego pochodna cząstkowa ma zostać obliczona.

### Opis
Funkcja ```dFdx```, dostępna wyłącznie we fragment shaderze, zwraca pochodną cząstkową wyrażenia ```p``` względem ```x```. Pochodne obliczane są poprzez lokalne różnicowanie. Wyrażenia oznaczające pochodne wyższego rzędu, takie jak ```dFdx(dFdx(n))```, zwracają niezdefiniowane wyniki, podobnie jak mieszane pochodne, np. ```dFdx(dFdy(n))```. Przyjmuje się, że wyrażenie ```p``` jest ciągłe, więc wyrażenia obliczane w niejednolitym przepływie sterowania (non-uniform control flow) mogą być niezdefiniowane.

### Zobacz też
[dFdy](/glossary/?lan=pl&search=dFdy)
