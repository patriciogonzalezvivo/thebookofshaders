## Dot
Calculate the dot product of two vectors

### Declaration
```glsl
float dot(float x, float y)  
float dot(vec2 x, vec2 y)  
float dot(vec3 x, vec3 y)  
float dot(vec4 x, vec4 y)
```

### Parameters
```x``` specifies the first of two vectors

```y``` specifies the second of two vectors

### Description
```dot()``` returns the dot product of two vectors, ```x``` and ```y```. i.e., ```x[0]⋅y[0]+x[1]⋅y[1]+...```
If ```x``` and ```y``` are the same the square root of the dot product is equivalent to the length of the vector. The input parameters can be floating scalars or float vectors. In case of floating scalars the dot function is trivial and returns the product of x and y.

<div class="codeAndCanvas" data="../07/circle.frag"></div>

### See Also

[cross()](/glossary/?search=cross), [Chapter 07: Shapes](/07/)
