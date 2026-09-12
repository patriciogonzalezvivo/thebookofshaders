## dFdy
Zwraca pochodną cząstkową podanego wyrażenia względem y

### Deklaracja
```glsl
genType dFdy(genType p);
```

### Parametry
```p``` określa wyrażenie, którego pochodna cząstkowa ma zostać obliczona.

### Opis
Funkcja ```dFdy```, dostępna wyłącznie we fragment shaderze, zwraca pochodną cząstkową wyrażenia ```p``` względem ```y```. Pochodne obliczane są poprzez lokalne różnicowanie. Wyrażenia oznaczające pochodne wyższego rzędu, takie jak ```dFdy(dFdy(n))```, zwracają niezdefiniowane wyniki, podobnie jak mieszane pochodne, np. ```dFdy(dFdx(n))```. Przyjmuje się, że wyrażenie ```p``` jest ciągłe, więc wyrażenia obliczane w niejednolitym przepływie sterowania (non-uniform control flow) mogą być niezdefiniowane.

### Zobacz też
[dFdx](/glossary/?lan=pl&search=dFdx)
