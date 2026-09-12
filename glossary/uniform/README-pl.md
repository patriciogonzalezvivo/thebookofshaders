## uniform
Kwalifikator zmiennej uniform.

### Przykład
```glsl
uniform vec4 direction;
```

### Opis
Zmienne ```uniform``` zawierają dane tylko do odczytu, udostępniane ze środowiska WebGL/OpenGL do vertex lub fragment shadera.

Wartość jest taka sama dla całego prymitywu, więc kwalifikator ten przydaje się w przypadku zmiennych, które pozostają stałe w obrębie prymitywu, klatki lub sceny.

### Zobacz też
[attribute](/glossary/?lan=pl&search=attribute), [const](/glossary/?lan=pl&search=const), [varying](/glossary/?lan=pl&search=varying), [Rozdział 03: Uniformy](/03/?lan=pl)
