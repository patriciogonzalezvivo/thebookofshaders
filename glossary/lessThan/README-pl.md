## lessThan
Wykonuje porównanie „mniejsze niż” dwóch wektorów element po elemencie

### Deklaracja
```glsl
bvec2 lessThan(vec2 x, vec2 y)
bvec3 lessThan(vec3 x, vec3 y)
bvec4 lessThan(vec4 x, vec4 y)

bvec2 lessThan(ivec2 x, ivec2 y)
bvec3 lessThan(ivec3 x, ivec3 y)
bvec4 lessThan(ivec4 x, ivec4 y)
```

### Parametry
```x``` określa pierwszy wektor użyty w operacji porównania.

```y``` określa drugi wektor użyty w operacji porównania.

### Opis
```lessThan()``` zwraca wektor logiczny, w którym każdy element ```i``` obliczany jest jako ```x[i] < y[i]```.

### Zobacz też
[lessThanEqual()](/glossary/?lan=pl&search=lessThanEqual), [greaterThan()](/glossary/?lan=pl&search=greaterThan), [greaterThanEqual()](/glossary/?lan=pl&search=greaterThanEqual), [equal()](/glossary/?lan=pl&search=equal), [notEqual()](/glossary/?lan=pl&search=notEqual), [any()](/glossary/?lan=pl&search=any), [all()](/glossary/?lan=pl&search=all), [not()](/glossary/?lan=pl&search=not)
