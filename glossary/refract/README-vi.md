## Refract
Calculate the refraction direction for an incident vector

### Các phiên bản
```glsl
float refract(float I, float N, float eta)  
vec2 refract(vec2 I, vec2 N, float eta)  
vec3 refract(vec3 I, vec3 N, float eta)  
vec4 refract(vec4 I, vec4 N, float eta)
```

### Các tham số
```I``` specifies the incident vector.

```N``` specifies the normal vector.

```eta``` specifies the ratio of indices of refraction.

### Mô tả
For a given incident vector ```I```, surface normal ```N``` and ratio of indices of refraction, ```eta```, refract returns the refraction vector, ```R```.

```R``` is calculated as:
```glsl
k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));
if (k < 0.0)
    R = genType(0.0);       // or genDType(0.0)
else
    R = eta * I - (eta * dot(N, I) + sqrt(k)) * N;
```
The input parameters ```I``` and ```N``` should be normalized in order to achieve the desired result.

### Tham khảo thêm

[dot()](/glossary/?lan=vi&search=dot), [reflect()](/glossary/?lan=vi&search=reflect)
