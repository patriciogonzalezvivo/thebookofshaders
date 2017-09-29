Add some references and ideas from this IQ article: http://iquilezles.org/www/articles/palettes/palettes.htm

 ### nicolas
 * struct exist in GLSL : this is valid
 ```precision mediump float;
    struct my_struct {
      vec4 color;
    };
    uniform my_struct u_colors[2];
    void main(void) {
        gl_FragColor = u_colors[0].color;
    }
 ```
[source](https://github.com/KhronosGroup/WebGL/blob/master/sdk/tests/conformance/glsl/misc/shader-with-array-of-structs-uniform.html)


[NICO]
note: I had previously associated the name *accessor* to 'the way one can access the properties of an object'.

we can use those **accessors** independently ; the following code creates a clone *newColor* of the *color* vector by using a different accessor for each property.
```glsl
vec4 color = vec4( 1.,0.,0.5,1. );
vec4 newColor = vec4( color[0], color.g, color.z, color.q );
```

It is possible to combine the properties by **concatenating** different accessors:
if we need to use the ```.r```, ```.g``` and ```.b``` values of a 4 dimensions vector but don't need the ```.a``` (alpha) value, we can write:

```glsl
vec4 color = vec4( 1.,0.,0.5,1. );
vec4 newColor = vec4( color.rgb, 1.0 );
```

Which is the same as cloning each property ```.r```, ```.g``` and ```.b``` from ```color``` individually and dropping the last (```.a```).

In this case, ```color.rgb``` is interpreted as a vector of type ```vec3``` that contains the values ```.r```, ```.g``` and ```.b``` of the original ```vec4``` vector *color*.
The same goes for:

```glsl
vec4 color = vec4( 1.,0.,0.5,1. );
vec3 newColor = vec3( color.xy, 1.0 );
```

We use the values ```.x``` and ```.y``` from *color* to build a vector *newColors* of type ```vec3``` which ```.r``` and ```.g``` values will be the same as the *color* vector and ```.b``` value will be ```1.0```.

Last but not least, the order in which you **concatenate** the accessors matters.

If you want to build a vector from another vector but want to reverse the order of the properties, here's how you can write it:

```glsl
vec3 color = vec3( 1.0, 0.0, 0.5 );
vec3 newColor = color.bgr;
```

the *newColor* vector will copy *color*'s properties but instead of copying them in the "regular" order: ```.r```, ```.g``` and ```.b```,
it will copy them in the order defined by the concatenation: ```.b```, ```.g``` and ```.r```.

```glsl
color.r => 1.0
color.g => 0.0
color.b => 0.5
and
newColor.r => 0.5
newColor.g => 0.0
newColor.b => 1.0
```

On a side note, you can reuse the same accessor mutiple times and in whatever order in a concatenated accessor:

```glsl
color.rrr => vec3( 1.0 )
color.rrg => vec3( 1.0, 1.0, 0.0)
color.bgg => vec3( 0.5, 0.0, 0.0)
etc.
```

This results in the fact that, if the following is true:

```glsl
color.rgba = color.xyzw = color.stpq
```

these statements are not necessarily true:

```glsl
color.rgba != color.argb != color.rbga != color.abgr etc.
color.xyzw != color.wxyz != color.xzyw != color.wzyx etc.
color.stpq != color.qstp != color.sptq != color.qpts etc.
```

This is a powerful feature ; it allows to store the data in compact forms and manipulate them in very flexible ways.
Let's see a use case of the *compactness*: say you want to describe a rectangle, you can do so by using 2 ```vec2``` describing respectively the top left corner and the bottom right corner
or you can instead, use a single ```vec4``` which ```.xy``` **accessor** will return a ```vec2``` describing the top left corner, and which ```.zw``` **accessor** will return a ```vec2``` describing the bottom right corner.

[/NICO]

These different ways of pointing to the variables inside a vector are just nomenclatures designed to help you write clear code. This flexibility embedded in shading language is a door for you to start thinking interchangably about color and space coordinates.

[NICO]

rephrased this:
Another great feature of vector types in GLSL is that the properties can be combined in any order you want, which makes it easy to cast and mix values. This ability is called *swizzle*.

to:
Concatenation or *swizzle* gets really interesting when we need to cast and mix values. The following example show you how to *swizzle* properties between vectors.

[/NICO]
