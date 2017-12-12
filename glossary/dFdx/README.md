## DFdx
Return the partial derivative of an argument with respect to x

### Declaration
```glsl
genType dFdx(float x);
```

### Parameters
```p``` specifies the expression of which to take the partial derivative.

### Description
Available only in the fragment shader, ```dFdx``` return the partial derivative of expression ```p``` in ```x```. Derivatives are calculated using local differencing. Expressions that imply higher order derivatives such as ```dFdx(dFdx(n))``` have undefined results, as do mixed-order derivatives such as ```dFdx(dFdy(n))```. It is assumed that the expression ```p``` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.

### See Also
[dFdy()](/glossary/?search=dFdy)
