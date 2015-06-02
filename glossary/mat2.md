## Mat2
2x2 floating point matrix

### Declaration
```glsl
mat2 aMat2 = mat2(1.0, 0.0,  // 1. column
                  0.0, 1.0); // 2. column
mat2 bMat2 = mat2(1.0);
mat2 cMat2 = mat2(aVec2, bVec2);
mat2 dMat2 = mat2(aVec3, aFloat);
```

### Description
The data type ```mat2``` is used for floating point matrices with two times two components in column major order. There are several ways to initialize a matrix:

- Components are specified by providing a scalar value for each component (first example). The matrix is filled column by column.

- Components are specified by providing one scalar value. This value is used for the components on the main diagonal (the second example is equivalent to the first).

- Components are specified by providing a combination of vectors and scalars. The respective values are used to initialize the components column by column. The arguments of the constructor must have at least as many components as the matrix that is initialized.

The following examples show how the values of a matrix can be accessed to set or get the values:

```glsl
mat2 aMat2;
aMat2[1][1] = 1.0;
float aFloat = aMat2[1][1];

aMat2[0] = vec2(1.0);
vec2 aVec2 = aMat2[0];
```

The values of a matrix can be accessed component-wise or column by column:

- In the first example the bottom right component of a matrix is set to a float value.

- In the second example a new variable of type float is initialized with the value of the bottom right component of a matrix.

- In the third example the first column vector of a matrix is set with a vector.

- In the fourth example a new variable of type float vector is initialized with the column vector.

### See Also
[mat3](index.html#mat3.md), [mat4](index.html#mat4.md), [matrixCompMult()](index.html#matrixCompMult.md)
