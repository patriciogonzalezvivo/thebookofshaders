![first search result for 'vector villain' on Google Image, on the 2016/05/20](vector.jpg)
### Vectors

In Javascript like in GLSL, you'll need more sophisticated ways of handling data, that's where **`vectors`** come in handy.
I suppose that you've already coded a `Point` class in JavaScript to hold together a `x` and a `y` value, the code for this would go like:
```glsl
// 'class' definition:
var Point = function( x, y ){
    this.x = x || 0;
    this.y = y || 0;
}

//and you would instantiate it like:
var p = new Point( 100,100 );
```

As we've just seen, this is SO wrong at SO many levels! That **`var`** keyword for one, then the horendous **`this`**, then again **untyped** `x` and `y` values...
No, this is not going to work in shaderland.

Instead, GLSL exposes built-in data structures to hold data together, namely:

 * `bvec2`: a 2D Boolean vector, `bvec3`: a 3D Boolean vector, `bvec4`: a 4D Boolean vector
 * `ivec2`: a 2D Integer vector, `ivec3`: a 3D Integer vector, `ivec4`: a 4D Integer vector
 * `vec2`: a 2D Float vector, `vec3`: a 3D Float vector, `ivec4`: a 4D Float vector

You immediately noticed that there's a type of **vector** for each primitive type, clever bunny.
From what we just saw, you can deduce that a `bvec2` will hold two values of type `bool` and a `vec4` will hold four `float` values.

Another thing introduced by vectors is a number of **dimensions**, it doesn't mean that a 2D vector is used when you render 2D graphics and a 3D vector when you do 3D.
What would a 4D vector represent then? (actually a 4 diemnsional space is called a tesseract or hypercube)

No, the **dimensions** represent the number and the type of **components** or **variables** stored into the **vector**:
```glsl
// let's create a 2D Boolean vector
bvec2 b2 = bvec2 ( true, false );

// let's create a 3D Integer vector
ivec3 i3 = ivec3( 0,0,1 );

// let's create a 4D Float vector
vec4 v4 = vec4( 0.0, 1.0, 2.0, 1. );
```
`b2` stores two different boolean values, `i3` stores 3 different integer values and `v4` stores 4 different float values.

but how to retrieve those values?
in the case of `scalars`, the answer is obvious ; with `float f = 1.2;`, the variable `f` holds the value `1.2`.
With **vectors** it's a bit different and quite beautiful.

#### accessors
There are different ways of accessing the values
```glsl
// let's create a 4D Float vector
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );
```
to retrieve the 4 values, you can do the following:
```glsl
float x = v4.x;     // x = 0.0
float y = v4.y;     // y = 1.0
float z = v4.z;     // z = 2.0
float w = v4.w;     // w = 3.0
```
nice and easy ; but the following are equally valid ways of accessing your data:
```glsl
float x =   v4.x    =   v4.r    =   v4.s    =   v4[0];     // x = 0.0
float y =   v4.y    =   v4.g    =   v4.t    =   v4[1];     // y = 1.0
float z =   v4.z    =   v4.b    =   v4.p    =   v4[2];     // z = 2.0
float w =   v4.w    =   v4.a    =   v4.q    =   v4[3];     // w = 3.0
```

And the clever bunny you are already noticed three things:
   * `X`, `Y`, `Z` & `W` are used in 3D programs to represent 3D vectors
   * `R`, `G`, `B` & `A` are used to encode colors and alpha
   * `[0]`, `[1]`, `[2]` & `[3]` mean that we have a random access array of values

So depending on wether you're manipulating 2D or 3D coordinates, a color with or without an alpha value or simply some random variables, you can pick the most suited **vector** type and size.
Typically 2D coordinates and vectors (in the geometric sense) are stored as a `vec2`, `vec3` or `vec4`, colors as `vec3` or `vec4` if you need opacity but htere is no restriction on how to use the vectors.
For instance, if you want to store only one boolean value in a `bvce4`, it's possible, it's just a waste of memory.

**note**: in a shader, color values (`R`, `G`, `B` & `A`) are normalised, they range from 0 to 1 and not from 0 to 0xFF, so you'd rather use a Float `vec4` than an Integer `ivec4` to store them.

Nice already, but there's more!

#### swizzle

It is possible to return more than one value at once ; say you need only the `X` and `Y` values of a `vec4`, in JavaScript, you'd have to write something like:
```glsl
var needles = [0, 1]; // location of 'x' & 'y' in our data structure
var a = [ 0,1,2,3 ]; // our 'vec4' data structure
var b = a.filter( function( val, i, array ) {
return needles.indexOf( array.indexOf( val ) ) != -1;
});
// b = [ 0, 1 ]

//or more literally:
var needles = [0, 1];
var a = [ 0,1,2,3 ]; // our 'vec4' data structure
var b = [ a[ needles[ 0 ] ], a[ needles[ 1 ] ] ]; // b = [ 0, 1 ]
```
Ugly. In GLSL you can retrieve them like so:
```glsl
// create a 4D Float vector
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );

//and retrieve only the X & Y components
vec2 xy =   v4.xy; //   xy = vec2( 0.0, 1.0 );
```
What just happened?! when you **concatenate accessors**, GLSL gracefully returns a subset of the values you asked for, in the best suited **vector** format.
Indeed, the vector is a **random access** data structure, like an array in JavaScript if you want.
So not only can you retrieve a subset of your data, but you can also specify the **order** in which you need it, this will invert the values of the components of a vector:
```glsl
// create a 4D Float vector: R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

//and retrieve the color components in the A,B,G,R order
vec4 backwards = v4.abgr; // backawrds = vec4( 1.0, 0.0, 0.8, 0.2 );
```
And of course, you can ask the same component multiple times:
```glsl
// create a 4D Float vector: R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

//and retrieve a GAG vec3 based on the G & A channels of the color
vec3 GAG = v4.gag; // GAG = vec4( 0.8, 1.0, 0.8 );
```

This is extremely handy to combine parts of vectors together, extract only the rgb channels of a RGBA color etc.


#### overload everything!

In the [types section](../01/), I mentioned something about the **constructor** and that's yet again a great feature of GLSL ; **overloading**.
For those who don't know, **overloading** an operator or a function roughly means: _'changing the behaviour of said operator or function depending on the operands/arguments'_.
Overloading is not allowed in JavaScript, so this may be a bit strange at first but I'm sure that once you get used to it, you'll wonder why it is not implemented in JS (short answer, *typing*).

the most basic example of operator overloading goes as follow:

```glsl
vec2 a = vec2( 1.0, 1.0 );
vec2 b = vec2( 1.0, 1.0 );
//overloaded addition
vec2 c = a + b;     // c = vec2( 2.0, 2.0 );
```
WHAT? so you can add things that are not numbers?!

Yes, precisely. Of course this applies to all operators (`+`, `-`, `*` & `/`) but that's only the beginning.
Consider the following snippet:
```glsl
vec2 a = vec2( 0.0, 0.0 );
vec2 b = vec2( 1.0, 1.0 );
//overloaded constructor
vec4 c = vec4( a , b );         // c = vec4( 0.0, 0.0, 1.0, 1.0 );
```
We built a `vec4` out of two `vec2`, by doing so, the new `vec4` used the `a.x` and `a.y` as the `X`, `Y` components of `c`.
Then it took `b.x` and `b.y` and used them as the `Z` and `W` components of `c`.

This is what happens when a **function** is overloaded to accept different arguments, in this case, the `vec4` **constructor**.
It means that many **vesrions** of the same method with a different signature can coexist in the same program, for instance the following declarations are all valid:
```glsl
vec4 a = vec4(1.0, 1.0, 1.0, 1.0);
vec4 a = vec4(1.0);// x, y, z, w all equel 1.0
vec4 a = vec4( v2, float, v4 );// vec4( v2.x, v2.y, float, v4.x );
vec4 a = vec4( v3, float );// vec4( v3.x, v3.y, v3.z, float );
etc.
```
the only thing you should make sure of is to provide enough arguments to feed your **vector**.

Last thing, you are allowed to overload the built-in functions in your program so they can take arguments they were not designed for (this shouldn't happen too often though).
