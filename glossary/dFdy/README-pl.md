## dFdy
Zwraca pochodną cząstkową podanego wyrażenia względem y

### Deklaracja
```glsl
genType dFdy(float y);
```

### Parametry
```p``` określa wyrażenie, dla którego chcemy obliczyć pochodną cząstkową.

### Opis
Dostępna wyłącznie w fragment shaderze, ```dFdy``` zwraca pochodną cząstkową wyrażenia ```p``` względem ```y```. Pochodne obliczane są poprzez lokalne różnicowanie. Wyrażenia oznaczające pochodne wyższego rzędu, takie jak ```dFdy(dFdy(n))```, zwracają niezdefiniowane wyniki, podobnie jak mieszane pochodne, np. ```dFdy(dFdx(n))```. Przyjmuje się, że wyrażenie ```p``` jest ciągłe, więc wyrażenia oceniane w warunkowym przepływie sterowania (non-uniform control flow) mogą być niezdefiniowane.

### Zobacz też
[dFdx](/glossary/?lan=pl&search=dfdx)