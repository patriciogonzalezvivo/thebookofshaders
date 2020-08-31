## Any
Check whether any element of a boolean vector is true

### Declaration
```glsl
bool all(bvec2 x)  
bool all(bvec3 x)  
bool all(bvec4 x)
```

### Parameters
```x``` specifies the vector to be tested for truth.

### Description
```any()``` returns true if any element of ```x``` is ```true``` and ```false``` otherwise. It is functionally equivalent to:

```glsl
bool any(bvec x) {     // bvec can be bvec2, bvec3 or bvec4
    bool result = false;
    int i;
    for (i = 0; i < x.length(); ++i) {
        result |= x[i];
    }
    return result;
}
```

### See Also
[any()](/glossary/?search=any), [not()](/glossary/?search=not)
