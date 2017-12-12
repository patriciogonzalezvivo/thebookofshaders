## DFdy
Return the partial derivative of an argument with respect to y

### Declaration
```glsl
genType dFdy(float y);
```

### Parameters
```p``` specifies the expression of which to take the partial derivative.

### Description
Available only in the fragment shader, ```dFdy``` return the partial derivative of expression ```p``` in ```y```. Derivatives are calculated using local differencing. Expressions that imply higher order derivatives such as ```dFdy(dFdy(n))``` have undefined results, as do mixed-order derivatives such as ```dFdy(dFdx(n))```. It is assumed that the expression ```p``` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.

### See Also
[dFdx()](/glossary/?search=dFdx)
