## Atan
Return the arc-tangent of the parameters

```glsl
float atan(float y, float x)  
vec2 atan(vec2 y, vec2 x)  
vec3 atan(vec3 y, vec3 x)  
vec4 atan(vec4 y, vec4 x)
```

```glsl
float atan(float y_over_x)  
vec2 atan(vec2 y_over_x)  
vec3 atan(vec3 y_over_x)  
vec4 atan(vec4 y_over_x)
```

### Parameters
```y``` Specify the numerator of the fraction whose arctangent to return.

```x``` Specify the denominator of the fraction whose arctangent to return.

```y_over_x``` Specify the fraction whose arctangent to return.

### Description
```atan()``` returns the angle whose trigonometric arctangent is ```y,x``` or ```y_over_x```, depending on which overload is invoked. In the first overload, the signs of ```y``` and ```x``` are used to determine the quadrant that the angle lies in. The values returned by atan in this case are in the range -PI and PI. Results are undefined if ```x``` is zero.

For the second overload, ```atan()``` returns the angle whose tangent is ```y_over_x```. Values returned in this case are in the range -PI to PI.

### See Also
[cos](index.html#cos.md), [acos](index.html#acos.md), [sin](index.html#sin.md), [asin](index.html#asin.md), [atan](index.html#atan.md), [Chapter 05: Shaping Functions](../05/), [Chapter 06: Color](../06/)
