## Mat4
4x4 floating point matrix

### Declaration
```glsl
mat4 aMat4 = mat4(1.0, 0.0, 0.0, 0.0,  // 1. column
                  0.0, 1.0, 0.0, 0.0,  // 2. column
                  0.0, 0.0, 1.0, 0.0,  // 3. column
                  0.0, 0.0, 0.0, 1.0); // 4. column
mat4 bMat4 = mat4(1.0);

mat4 cMat4 = mat4(aVec4, bVec4, cVec4, dVec4);
mat4 dMat4 = mat4(aVec4, aVec3, bVec4, cVec4, aFloat);
```

### Description
The data type mat4 is used for floating point matrices with four times four components in column major order. There are several ways to initialize a matrix:

- Components are specified by providing a scalar value for each component (first example). The matrix is filled column by column.

- Components are specified by providing one scalar value. This value is used for the components on the main diagonal (the second example is equivalent to the first).

- Components are specified by providing a combination of vectors and scalars. The respective values are used to initialize the components column by column. The arguments of the constructor must have at least as many components as the matrix that is initialized.

The following examples show how the values of a matrix can be accessed to set or get the values:

```glsl
aMat4[3][3] = 1.0;
float aFloat = aMat4[3][3];

aMat4[0] = vec4(1.0);
vec4 aVec4 = aMat4[0];
```

The values of a matrix can be accessed component-wise or column by column:

- In the first example the bottom right component of a matrix is set to a float value.

- In the second example a new variable of type float is initialized with the value of the bottom right component of a matrix.

- In the third example the first column vector of a matrix is set with a vector.

- In the fourth example a new variable of type float vector is initialized with the column vector.

### See Also
[mat2](index.html#mat2.md), [mat3](index.html#mat3.md), [matrixCompMult()](index.html#matrixCompMult.md)