## dFdx
Zwraca pochodną cząstkową podanego wyrażenia względem x

### Deklaracja
```glsl
genType dFdx(float x);
```

### Parametry
```p``` określa wyrażenie, dla którego chcemy obliczyć pochodną cząstkową.

### Opis
Dostępna wyłącznie w fragment shaderze , ```dFdx``` zwraca pochodną cząstkową wyrażenia ```p``` względem ```x```. Pochodne obliczane są poprzez lokalne różnicowanie. Wyrażenia oznaczające pochodne wyższego rzędu, takie jak ```dFdx(dFdx(n))```, zwracają niezdefiniowane wyniki, podobnie jak mieszane pochodne, np. ```dFdx(dFdy(n))```. Przyjmuje się, że wyrażenie ```p``` jest ciągłe, więc wyrażenia oceniane w warunkowym przepływie sterowania (non-uniform control flow) mogą być niezdefiniowane.

### Zobacz też
[dFdy](/glossary/?lan=pl&search=dFdy)