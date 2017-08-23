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
```mat4``` data type is compose for a 4x4 matrix of floating point. As you can see above, can be initialize in different ways:

- Providing a value for each component column by column.

- Providing one value that is used for the components on the main diagonal.

- Providing a combination of vectors and scalars.

In the same way data can be accessed component-wise or column by column:

```glsl
aMat4[3][3] = 1.0;
float aFloat = aMat4[3][3];

aMat4[0] = vec4(1.0);
vec4 aVec4 = aMat4[0];
```

### See Also
[mat2](/glossary/?search=mat2), [mat3](/glossary/?search=mat3), [matrixCompMult()](/glossary/?search=matrixCompMult)
