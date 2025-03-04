## all
Sprawdza, czy wszystkie elementy wektora logicznego są prawdziwe

### Deklaracja
```glsl
bool all(bvec2 x)  
bool all(bvec3 x)  
bool all(bvec4 x)
```

### Parametry
```x``` określa wektor, który ma zostać sprawdzony pod kątem prawdy.

### Opis
```all()``` zwraca ```true```, jeśli wszystkie elementy ```x``` są ```true``` i ```false``` w przeciwnym razie. Jest to funkcjonalnie równoważne:

```glsl
bool all(bvec x){       // bvec może być bvec2, bvec3 lub bvec4
    bool result = true;
    int i;
    for (i = 0; i < x.length(); ++i)
    {
        result &= x[i];
    }
    return result;
}
```
### Zobacz też
[any()](/glossary/?lan=pl&search=any), [not()](/glossary/?lan=pl&search=not)