## texture2D
Pobiera teksele z tekstury

### Deklaracja
```glsl
vec4 texture2D(sampler2D sampler, vec2 coord)
vec4 texture2D(sampler2D sampler, vec2 coord, float bias)
```

### Parametry
```sampler``` określa sampler, do którego przypisana jest tekstura, z której pobierane będą teksele.

```coord``` określa współrzędne tekstury, w których tekstura będzie próbkowana.

```bias``` określa opcjonalne przesunięcie stosowane podczas obliczania poziomu szczegółowości.

### Opis
Funkcja texture2D zwraca teksel, czyli wartość (koloru) tekstury dla podanych współrzędnych. Funkcja przyjmuje jeden parametr wejściowy typu ```sampler2D``` oraz jeden parametr wejściowy typu ```vec2```: sampler, czyli uniform, do którego przypisana jest tekstura, oraz coord, czyli dwuwymiarowe współrzędne szukanego teksela.

Istnieje opcjonalny trzeci parametr wejściowy typu float: bias. Po obliczeniu odpowiedniego poziomu szczegółowości dla tekstury z mipmapami wartość bias jest dodawana przed wykonaniem właściwej operacji pobrania tekstury.

Uwaga na marginesie: na urządzeniach z systemem iOS pobieranie tekstur dostępne jest wyłącznie we fragment shaderze.

### Zobacz też
[textureCube](/glossary/?lan=pl&search=textureCube)
