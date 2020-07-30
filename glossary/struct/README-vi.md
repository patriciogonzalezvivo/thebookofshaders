## Struct
Structure variable type

### Ví dụ
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

### Mô tả
```struct``` declare a custom data structures based on standard types. A constructor for the structure with the same name is created automatically. The declaration of a variable (in this case "newMaterial") is optional.
