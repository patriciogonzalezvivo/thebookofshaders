## Faceforward
Return a vector pointing in the same direction as another

### Declaration
```glsl
float faceforward(float N, float I, float Nref)  
vec2 faceforward(vec2 N, vec2 I, vec2 Nref)  
vec3 faceforward(vec3 N, vec3 I, vec3 Nref)  
vec4 faceforward(vec4 N, vec4 I, vec4 Nref)
```

### Parameters
```N``` specifies the vector to orient.

```I``` specifies the incident vector.

```Nref``` specifies the reference vector.

### Description
```faceforward()``` orients a vector to point away from a surface as defined by its normal. ```If dot(Nref, I) < 0``` faceforward returns ```N```, otherwise it returns ```-N```.

### See Also
[reflect()](/glossary/?search=reflect), [refract()](/glossary/?search=refract)
