## Mat3
3x3 floating point matrix

### Declaration
```glsl
mat3 aMat3 = mat3(1.0, 0.0, 0.0,  // 1. column
                  0.0, 1.0, 0.0,  // 2. column
                  0.0, 0.0, 1.0); // 3. column
mat3 bMat3 = mat3(1.0);

mat3 cMat3 = mat3(aVec3, bVec3, cVec3);
mat3 dMat3 = mat3(aVec4, aVec3, bVec4, aFloat);
```

### Description
```mat3``` data type is compose for a 3x3 matrix of floating point. As you can see above, can be initialize in different ways:

- Providing a value for each component column by column.

- Providing one value that is used for the components on the main diagonal.

- Providing a combination of vectors and scalars.

In the same way data can be accessed component-wise or column by column:


```glsl
mat3 aMat3;
aMat3[2][2] = 1.0;
float aFloat = aMat3[2][2];

aMat3[0] = vec3(1.0);
vec3 aVec3 = aMat3[0];
```

### See Also
[mat2](/glossary/?search=mat2), [mat4](/glossary/?search=mat4), [matrixCompMult()](/glossary/?search=matrixCompMult)
