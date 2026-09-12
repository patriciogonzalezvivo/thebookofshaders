## refract
Oblicza kierunek załamania dla wektora padającego

### Deklaracja
```glsl
float refract(float I, float N, float eta)
vec2 refract(vec2 I, vec2 N, float eta)
vec3 refract(vec3 I, vec3 N, float eta)
vec4 refract(vec4 I, vec4 N, float eta)
```

### Parametry
```I``` określa wektor padający.

```N``` określa wektor normalny.

```eta``` określa stosunek współczynników załamania.

### Opis
Dla danego wektora padającego ```I```, wektora normalnego powierzchni ```N``` oraz stosunku współczynników załamania ```eta``` refract zwraca wektor załamania ```R```.

```R``` obliczany jest następująco:
```glsl
k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));
if (k < 0.0)
    R = genType(0.0);       // lub genDType(0.0)
else
    R = eta * I - (eta * dot(N, I) + sqrt(k)) * N;
```
Parametry wejściowe ```I``` i ```N``` powinny zostać znormalizowane, aby uzyskać oczekiwany wynik.

### Zobacz też
[dot()](/glossary/?lan=pl&search=dot), [reflect()](/glossary/?lan=pl&search=reflect)
