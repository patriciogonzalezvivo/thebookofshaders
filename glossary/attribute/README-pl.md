## attribute
Dane atrybutów wierzchołka.

### Przykład
```glsl
attribute vec4 v_color;
```

### Opis
`attribute` to zmienne tylko do odczytu, zawierające dane udostępniane z środowiska WebGL/OpenGL do vertex shadera.

Ponieważ vertex shader jest uruchamiany raz dla każdego wierzchołka, atrybuty określają dane specyficzne dla poszczególnych wierzchołków, takie jak: pozycja w przestrzeni, kolor, kierunek wektora normalnego czy współrzędne tekstury.

### Zobacz też
[const](/glossary/?lan=pl&search=const), [uniform](/glossary/?lan=pl&search=uniform), [varying](/glossary/?lan=pl&search=varying), [Rozdział 03: Uniformy](/03/?lan=pl)
