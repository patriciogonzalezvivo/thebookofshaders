## reflect
Oblicza kierunek odbicia dla wektora padającego

### Deklaracja
```glsl
float reflect(float I, float N)
vec2 reflect(vec2 I, vec2 N)
vec3 reflect(vec3 I, vec3 N)
vec4 reflect(vec4 I, vec4 N)
```

### Parametry
```I``` określa wektor padający.

```N``` określa wektor normalny.

### Opis
Dla danego wektora padającego ```I``` i wektora normalnego powierzchni ```N``` reflect zwraca kierunek odbicia obliczony jako ```I - 2.0 * dot(N, I) * N```.

```N``` powinien zostać znormalizowany, aby uzyskać oczekiwany wynik.

### Zobacz też
[dot()](/glossary/?lan=pl&search=dot), [refract()](/glossary/?lan=pl&search=refract)
