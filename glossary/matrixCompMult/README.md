## MatrixCompMult
Perform a component-wise multiplication of two matrices

### Declaration
```glsl
mat2 matrixCompMult(mat2 x, mat2 y)  
mat3 matrixCompMult(mat3 x, mat3 y)  
mat4 matrixCompMult(mat4 x, mat4 y)
```

### Parameters
```x``` specifies the first matrix multiplicand.

```y``` specifies the second matrix multiplicand.

### Description
```matrixCompMult()``` performs a component-wise multiplication of two matrices, yielding a result matrix where each component, ```result[i][j]``` is computed as the scalar product of ```x[i][j]``` and ```y[i][j]```.

### See Also
[Chapter 08: Matrix](../08/)
