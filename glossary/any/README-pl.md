## any
Sprawdza, czy choć jeden element wektora logicznego jest prawdziwy

### Deklaracja
```glsl
bool any(bvec2 x)
bool any(bvec3 x)
bool any(bvec4 x)
```

### Parametry
```x``` określa wektor, który ma zostać sprawdzony pod kątem prawdy.

### Opis
```any()``` zwraca ```true```, jeśli którykolwiek element ```x``` jest ```true``` i ```false``` w przeciwnym razie. Jest to funkcjonalnie równoważne:

```glsl
bool any(bvec x) {     // bvec może być bvec2, bvec3 lub bvec4
    bool result = false;
    int i;
    for (i = 0; i < x.length(); ++i) {
        result |= x[i];
    }
    return result;
}
```

### Zobacz też
[all()](/glossary/?lan=pl&search=all), [not()](/glossary/?lan=pl&search=not)
