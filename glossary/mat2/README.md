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
```mat2``` data type is compose for a 2x2 matrix of floating point. As you can see above, can be initialize in different ways:

- Providing a value for each component column by column.

- Providing one value that is used for the components on the main diagonal.

- Providing a combination of vectors and scalars.

In the same way data can be accessed component-wise or column by column:

```glsl
mat2 aMat2;
aMat2[1][1] = 1.0;
float aFloat = aMat2[1][1];

aMat2[0] = vec2(1.0);
vec2 aVec2 = aMat2[0];
```

### See Also
[mat3](/glossary/?search=mat3), [mat4](/glossary/?search=mat4), [matrixCompMult()](/glossary/?search=matrixCompMult)
