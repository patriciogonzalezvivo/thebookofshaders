## All
Check whether all elements of a boolean vector are true

### Declaration
```glsl
bool any(bvec2 x)  
bool any(bvec3 x)  
bool any(bvec4 x)
```

### Parameters
```x``` specifies the vector to be tested for truth.

### Description
```all()``` returns true if all elements of ```x``` are ```true``` and ```false``` otherwise. It is functionally equivalent to:

```glsl
bool all(bvec x){       // bvec can be bvec2, bvec3 or bvec4
    bool result = true;
    int i;
    for (i = 0; i < x.length(); ++i)
    {
        result &= x[i];
    }
    return result;
}
```
### See Also
[any()](/glossary/?search=any), [not()](/glossary/?search=not)
