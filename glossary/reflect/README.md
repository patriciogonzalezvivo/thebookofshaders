## Reflect
Calculate the reflection direction for an incident vector

### Declaration
```glsl
float reflect(float I, float N)  
vec2 reflect(vec2 I, vec2 N)  
vec3 reflect(vec3 I, vec3 N)  
vec4 reflect(vec4 I, vec4 N)
```

### Parameters
```I``` specifies the incident vector.

```N``` specifies the normal vector.

### Description
For a given incident vector ```I``` and surface normal ```N``` reflect returns the reflection direction calculated as ```I - 2.0 * dot(N, I) * N```.

```N``` should be normalized in order to achieve the desired result.

### See Also

[dot()](/glossary/?search=dot), [refract()](/glossary/?search=refract)
