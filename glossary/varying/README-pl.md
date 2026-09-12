## varying
Kwalifikator zmiennej varying.

### Przykład
```glsl
varying vec3 position;
```

### Opis
Zmienne ```varying``` zawierają dane udostępniane z vertex shadera do fragment shadera.

Zmienna musi zostać zapisana w vertex shaderze, a jej wartość tylko do odczytu we fragment shaderze jest następnie interpolowana z wierzchołków tworzących dany fragment.

### Zobacz też
[attribute](/glossary/?lan=pl&search=attribute), [const](/glossary/?lan=pl&search=const), [uniform](/glossary/?lan=pl&search=uniform), [Rozdział 03: Uniformy](/03/?lan=pl)
