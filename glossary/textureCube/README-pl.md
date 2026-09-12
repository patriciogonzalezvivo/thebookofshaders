## textureCube
Pobiera teksele z tekstury

### Deklaracja
```glsl
vec4 textureCube(samplerCube sampler, vec3 coord)
vec4 textureCube(samplerCube sampler, vec3 coord, float bias)
```

### Parametry
```sampler``` określa sampler, do którego przypisana jest tekstura, z której pobierane będą teksele.

```coord``` określa współrzędne tekstury, w których tekstura będzie próbkowana.

```bias``` określa opcjonalne przesunięcie stosowane podczas obliczania poziomu szczegółowości.

### Opis
Funkcja textureCube zwraca teksel, czyli wartość (koloru) tekstury dla podanych współrzędnych. Funkcja przyjmuje jeden parametr wejściowy typu ```samplerCube``` oraz jeden parametr wejściowy typu ```vec3```: sampler, czyli uniform, do którego przypisana jest tekstura, oraz coord, czyli trójwymiarowe współrzędne szukanego teksela.

Istnieje opcjonalny trzeci parametr wejściowy typu float: bias. Po obliczeniu odpowiedniego poziomu szczegółowości dla tekstury z mipmapami wartość bias jest dodawana przed wykonaniem właściwej operacji pobrania tekstury.

Uwaga na marginesie: na urządzeniach z systemem iOS pobieranie tekstur dostępne jest wyłącznie we fragment shaderze.

### Zobacz też
[texture2D](/glossary/?lan=pl&search=texture2D)
