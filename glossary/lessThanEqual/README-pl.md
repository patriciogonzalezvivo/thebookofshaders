## lessThanEqual
Wykonuje porównanie „mniejsze lub równe” dwóch wektorów element po elemencie

### Deklaracja
```glsl
bvec2 lessThanEqual(vec2 x, vec2 y)
bvec3 lessThanEqual(vec3 x, vec3 y)
bvec4 lessThanEqual(vec4 x, vec4 y)

bvec2 lessThanEqual(ivec2 x, ivec2 y)
bvec3 lessThanEqual(ivec3 x, ivec3 y)
bvec4 lessThanEqual(ivec4 x, ivec4 y)
```

### Parametry
```x``` określa pierwszy wektor użyty w operacji porównania.

```y``` określa drugi wektor użyty w operacji porównania.

### Opis
```lessThanEqual()``` zwraca wektor logiczny, w którym każdy element ```i``` obliczany jest jako ```x[i] ≤ y[i]```.

### Zobacz też
[lessThan()](/glossary/?lan=pl&search=lessThan), [greaterThan()](/glossary/?lan=pl&search=greaterThan), [greaterThanEqual()](/glossary/?lan=pl&search=greaterThanEqual), [equal()](/glossary/?lan=pl&search=equal), [notEqual()](/glossary/?lan=pl&search=notEqual), [any()](/glossary/?lan=pl&search=any), [all()](/glossary/?lan=pl&search=all), [not()](/glossary/?lan=pl&search=not)
