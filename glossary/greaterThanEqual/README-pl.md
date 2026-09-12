## greaterThanEqual
Wykonuje porównanie „większe lub równe” dwóch wektorów element po elemencie

### Deklaracja
```glsl
bvec2 greaterThanEqual(vec2 x, vec2 y)
bvec3 greaterThanEqual(vec3 x, vec3 y)
bvec4 greaterThanEqual(vec4 x, vec4 y)

bvec2 greaterThanEqual(ivec2 x, ivec2 y)
bvec3 greaterThanEqual(ivec3 x, ivec3 y)
bvec4 greaterThanEqual(ivec4 x, ivec4 y)
```

### Parametry
```x``` określa pierwszy wektor użyty w operacji porównania.

```y``` określa drugi wektor użyty w operacji porównania.

### Opis
```greaterThanEqual()``` zwraca wektor logiczny, w którym każdy element ```i``` obliczany jest jako ```x[i] ≥ y[i]```.

### Zobacz też
[lessThan()](/glossary/?lan=pl&search=lessThan), [lessThanEqual()](/glossary/?lan=pl&search=lessThanEqual), [greaterThan()](/glossary/?lan=pl&search=greaterThan), [equal()](/glossary/?lan=pl&search=equal), [notEqual()](/glossary/?lan=pl&search=notEqual), [any()](/glossary/?lan=pl&search=any), [all()](/glossary/?lan=pl&search=all), [not()](/glossary/?lan=pl&search=not)
