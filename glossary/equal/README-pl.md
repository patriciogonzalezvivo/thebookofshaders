## equal
Wykonuje porównanie „równe” dwóch wektorów element po elemencie

### Deklaracja
```glsl
bvec2 equal(vec2 x, vec2 y)
bvec3 equal(vec3 x, vec3 y)
bvec4 equal(vec4 x, vec4 y)

bvec2 equal(ivec2 x, ivec2 y)
bvec3 equal(ivec3 x, ivec3 y)
bvec4 equal(ivec4 x, ivec4 y)
```

### Parametry
```x``` określa pierwszy wektor użyty w operacji porównania.

```y``` określa drugi wektor użyty w operacji porównania.

### Opis
```equal()``` zwraca wektor logiczny, w którym każdy element ```i``` obliczany jest jako ```x[i] == y[i]```.

### Zobacz też
[lessThan()](/glossary/?lan=pl&search=lessThan), [lessThanEqual()](/glossary/?lan=pl&search=lessThanEqual), [greaterThan()](/glossary/?lan=pl&search=greaterThan), [greaterThanEqual()](/glossary/?lan=pl&search=greaterThanEqual), [notEqual()](/glossary/?lan=pl&search=notEqual), [any()](/glossary/?lan=pl&search=any), [all()](/glossary/?lan=pl&search=all), [not()](/glossary/?lan=pl&search=not)
