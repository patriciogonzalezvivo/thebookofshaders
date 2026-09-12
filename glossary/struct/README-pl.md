## struct
Strukturalny typ zmiennej

### Przykład
```glsl
struct matStruct {
    vec4 ambientColor;
    vec4 diffuseColor;
    vec4 specularColor;
    float specularExponent;
} newMaterial;

newMaterial = matStruct(vec4(0.1, 0.1, 0.1, 1.0),
                        vec4(1.0, 0.0, 0.0, 1.0),
                        vec4(0.7, 0.7, 0.7, 1.0),
                        50.0);
```

### Opis
```struct``` deklaruje własną strukturę danych opartą na typach standardowych. Konstruktor struktury o tej samej nazwie tworzony jest automatycznie. Deklaracja zmiennej (w tym przypadku „newMaterial”) jest opcjonalna.
