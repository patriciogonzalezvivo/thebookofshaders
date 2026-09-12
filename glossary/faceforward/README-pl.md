## faceforward
Zwraca wektor skierowany w tę samą stronę co inny wektor

### Deklaracja
```glsl
float faceforward(float N, float I, float Nref)
vec2 faceforward(vec2 N, vec2 I, vec2 Nref)
vec3 faceforward(vec3 N, vec3 I, vec3 Nref)
vec4 faceforward(vec4 N, vec4 I, vec4 Nref)
```

### Parametry
```N``` określa wektor, który ma zostać zorientowany.

```I``` określa wektor padający.

```Nref``` określa wektor odniesienia.

### Opis
```faceforward()``` orientuje wektor tak, aby był skierowany od powierzchni określonej przez jej wektor normalny. Jeśli ```dot(Nref, I) < 0```, faceforward zwraca ```N```, w przeciwnym razie zwraca ```-N```.

### Zobacz też
[reflect()](/glossary/?lan=pl&search=reflect), [refract()](/glossary/?lan=pl&search=refract)
