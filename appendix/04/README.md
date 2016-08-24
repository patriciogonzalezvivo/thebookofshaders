## An introduction for those coming from JS
by [Nicolas Barradeau](http://www.barradeau.com/)


If you're a JavaScript developer, chances are you'll be a bit puzzled when reading the book.
Indeed, there are many differences between manipulating high-level JS and getting down and dirty with shaders.
Yet, as opposed to the underlying assembly language, GLSL is human readable and I'm sure that, once you acknowledge its specificities, you'll quickly be up and running.

I assume you have a prior (be it shallow) knowledge of JavaScript of course, but also of the Canvas API.
If not, don't worry, you'll still be able to get most of this section.

Also, I won't go too much into details and some things may be _half true_, don't expect a "definitive guide" but rather

### A BIG HUG

JavaScript is great at quick prototyping ; you throw a bunch of random, untyped variables and methods, you can dynamically add and remove class members, refresh the page and see if it works,
make changes accordingly, refresh the page, repeat, life is easy.
So you may wonder what is the difference between JavaScript and GLSL.
After all, both run in the browser, both are used to draw a bunch of funky stuff on a screen and to that extent, JS is easier to use.

Well, the main difference is that Javascript is an **interpreted** language while GLSL is a **compiled** language.
A **compiled** program is executed natively on the OS, it is low level and generally fast.
An **interpreted** program requires a [Virtual Machine](https://en.wikipedia.org/wiki/Virtual_machine) (VM) to be executed, it is high level and generally slow.


When a browser (the _JavaScript **VM**_) **executes** or **interprets** a piece of JS, it has no clue about which variable is what and which function does what (with the notable exception of **TypedArrays**).
Therefore it can't optimize anything _upfront_, so it takes some time to read your code, to **infer** (deduce from the usage) the types of your variables and methods
 and when possible, it will convert _some_ of your code into assembly code that will execute much faster.

It's a slow, painstaking and insanely complex process, if you're interested in the details, I'd recommend watching how [Chrome's V8 engine works](https://developers.google.com/v8/).
The worst is that every browser optimizes JS its way and the process is _hidden_ from you ; you are powerless.

A **compiled** program is not interpreted ; the OS runs it, if the program is valid, the program is executed.
That's a big change ; if you forget a semicolon at the end of line, your code is invalid, it will not compile: your code won't turn into a program at all.

That's cold but that's what a **shader** is: _a compiled program executed on the GPU_.
Fear not! a **compiler**, the piece of program that makes sure your code is valid, will become your best friend.
The examples of this book and the [companion editor](http://editor.thebookofshaders.com/) are very user friendly.
They'll tell you where and why your program failed to compile, then you'll have to fix things and whenever the shader is ready to compile, it will be displayed instantly.
That's a great way of learning as it's very visual and you can't really break anything.

Last note, a **shader** is made of 2 programs, the **vertex shader** and the **fragment shader**.
In a nutshell, the **vertex shader**, the first program, receives a *geometry* as an input and turns it into series of **pixels** (or *fragments*) then hands them over to the
**fragment shader**, the second program, that will decide which color to paint the pixels.
This book is mostly focused on the latter, in all the examples, the geometry is a simple quadrilateral that covers the whole screen.

SO! ready?

off we go!

### strong types
![first search result for 'strong type' on Google Image, on the 2016/05/20](strong_type.jpg)

When you come from JS or any untyped language, **typing** your variables is an alien concept, making **typing** the hardest step to take towards GLSL.
**Typing**, as the name suggests, means that you'll give a **type** to your variables (and functions of course).
This basically means that the word **`var`** doesn't exist anymore.
The GLSL thought-police erased it from the common tongue and you're not able to speak it because, well... it doesn't exist.

Instead of using the magic word **`var`**, you'll have to _explicitly specify the type of each variable_ you use, then the compiler will only see objects and primitives it knows how to handle efficiently.
The downside when you can't use the **`var`** keyword and must _specify everything_, is that you'll have to know the type of all the variables and know them well.
Rest assured, there are few and they're fairly simple (GLSL is not a Java framework).

Might sound scary but all in all, it's not very different from what you're doing when you code JavaScript ; if a variable is a `boolean`, you'll expect it to store `true` or `false` and nothing else.
If a variable is called `var uid = XXX;`, chances are that you'll store an integer value in there and a `var y = YYY;` _might_ be a reference to a floating point value.
Even better, with **strong types**, you won't waste time wondering if `X == Y` (or was it `typeof X == typeof Y` ? .. or `typeof X !== null && Y...` ... anyway) ; you'll just *know* it and if you don't, the compiler will.

Here are the **scalar types** (a **scalar** describes a quantity) you can use in GLSL: `bool` (Boolean), `int`(Integer), `float`(floating point Number).
There are other types but let's take it easy, the following snippet shows how to declare **`vars`** (yes, I spoke the forbidden word) in GLSL:
```glsl
//a Boolean value:
JS: var b = true;               GLSL: bool b = true;

//an Integer value
JS: var i = 1;                  GLSL: int i = 1;

//a Float value (a Number)
JS: var f = 3.14159;            GLSL: float f = 3.14159;
```
Not that hard right? as mentioned above, it even makes things easier when it comes to coding as you don't waste your time checking the type of a given variable.
When in doubt, remember that you're doing this for your program to run immensely faster than in JS.

#### void
There is a `void` type that roughly corresponds to `null`, it is used as the return type of a method that doesn't return anything.
you can't assign it to a variable.

#### boolean
As you know, Booleans are mostly used in conditional tests ; `if( myBoolean == true ){}else{}`.
If the conditional branching is a valid option on the CPU, [the parallel nature](http://thebookofshaders/01/) of GLSL makes it less true.
Using conditionals is even discouraged most of the time, the book explains a couple of alternative techniques to solve this.

#### type casting
As [Boromir](https://en.wikipedia.org/wiki/Boromir) put it, "One does not simply combine Typed primitives". Unlike JavaScript, GLSL will not allow you to perform operations between variables of different types.

This for instance:
```glsl
int     i = 2;
float   f = 3.14159;

//trying to multiply an integer by a float value
float   r = i * f;
```
will not play nice because you're trying to crossbreed a **_cat_** and a **_giraffe_**.
The solution to this is to use **type casting** ; it will _make the compiler believe_ that *`i`* is of type `float` without actually changing the type of *`i`*.
```glsl
//casting the type of the integer variable 'i' into float
float   r = float( i ) * f;
```

Which is strictly equivalent to dressing up a **_cat_** in a **_giraffe_ outfit** and will work as expected ( `r` will store the result of `i` x `f`).

It is possible to **cast** any of the above types into any other type, note that casting a `float` to `int` will behave like a `Math.floor()` as it will remove the values behind the floating point.
 Casting a `float` or a `int` to `bool` will return `true` if the variable is not equal to zero.

#### constructor
The variable **types** are also their own **class constructor** ; in fact a `float` variable can be thought of as an _`instance`_ of a _`Float`_ class.

This declarations are equally valid:

```glsl
int     i = 1;
int     i = int( 1 );
int     i = int( 1.9995 );
int     i = int( true );
```
This may not sound like much for `scalar` types, it's not very different from **casting**, but it will make sense when addressing the *overload* section.

Ok, so these three are the `primitive types`, things you can't live without but of course, GLSL has more to offer.

### Vectors
![first search result for 'vector villain' on Google Image, on the 2016/05/20](vector.jpg)

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

As we've just seen, this is SO wrong at SO many levels! That **`var`** keyword for one, then the horrendous **`this`**, then again **untyped** `x` and `y` values...
No, this is not going to work in shaderland.

Instead, GLSL exposes built-in data structures to hold data together, namely:

 * `bvec2`: a 2D Boolean vector, `bvec3`: a 3D Boolean vector, `bvec4`: a 4D Boolean vector
 * `ivec2`: a 2D Integer vector, `ivec3`: a 3D Integer vector, `ivec4`: a 4D Integer vector
 * `vec2`: a 2D Float vector, `vec3`: a 3D Float vector, `vec4`: a 4D Float vector

You immediately noticed that there's a type of **vector** for each primitive type, clever bunny.
From what we just saw, you can deduce that a `bvec2` will hold two values of type `bool` and a `vec4` will hold four `float` values.

Another thing introduced by vectors is a number of **dimensions**, it doesn't mean that a 2D vector is used when you render 2D graphics and a 3D vector when you do 3D.
What would a 4D vector represent then? (well, actually it is called a tesseract or hypercube)

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

So depending on whether you're manipulating 2D or 3D coordinates, a color with or without an alpha value or simply some random variables, you can pick the most suited **vector** type and size.
Typically 2D coordinates and vectors (in the geometric sense) are stored as a `vec2`, `vec3` or `vec4`, colors as `vec3` or `vec4` if you need opacity but there is no restriction on how to use the vectors.
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
vec4 backwards = v4.abgr; // backwards = vec4( 1.0, 0.0, 0.8, 0.2 );
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

In the types section, I mentioned something about the **constructor** and that's yet again a great feature of GLSL ; **overloading**.
For those who don't know, **overloading** an operator or a function roughly means: _'changing the behaviour of said operator or function depending on the operands/arguments'_.
Overloading is not allowed in JavaScript, so this may be a bit strange at first but I'm sure that once you get used to it, you'll wonder why it is not implemented in JS (short answer, *typing*).

The most basic example of operator overloading goes as follow:

```glsl
vec2 a = vec2( 1.0, 1.0 );
vec2 b = vec2( 1.0, 1.0 );
//overloaded addition
vec2 c = a + b;     // c = vec2( 2.0, 2.0 );
```
WHAT? So you can add things that are not numbers?!

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
It means that many **versions** of the same method with a different signature can coexist in the same program, for instance the following declarations are all valid:
```glsl
vec4 a = vec4(1.0, 1.0, 1.0, 1.0);
vec4 a = vec4(1.0);// x, y, z, w all equal 1.0
vec4 a = vec4( v2, float, v4 );// vec4( v2.x, v2.y, float, v4.x );
vec4 a = vec4( v3, float );// vec4( v3.x, v3.y, v3.z, float );
etc.
```
The only thing you should make sure of is to provide enough arguments to feed your **vector**.

Last thing, you are allowed to overload the built-in functions in your program so they can take arguments they were not designed for (this shouldn't happen too often though).

#### more types
Vectors are fun, they're the meat of your shader.
There are other primitives such as Matrices and Texture samplers which will be covered later in the book.

We can also use Arrays. Of course they have to be typed and there are *twists*:
 * they have a fixed size
 * you can't push(), pop(), splice() etc. and there is no ```length``` property
 * you can't initialize them immediately with values
 * you have to set the values individually

this won't work:
```glsl
int values[3] = [0,0,0];
```
but this will:
```glsl
int values[3];
values[0] = 0;
values[1] = 0;
values[2] = 0;
```
This is fine when you know your data or have small arrays of values.
If you want a more expressive way of declaring a variable,
there is also a ```struct``` type. These are like _objects_ without methods ;
they allow to store and access multiple variables inside the same object
```glsl
struct ColorStruct {
    vec3 color0;
    vec3 color1;
    vec3 color2;
}
```
then you can set and retrieve the values of _colors_ by doing:
```glsl
//initialize the struct with some values
ColorStruct sandy = ColorStruct( 	vec3(0.92,0.83,0.60),
                                    vec3(1.,0.94,0.69),
                                    vec3(0.95,0.86,0.69) );

//access a values from the struct
sandy.color0 // vec3(0.92,0.83,0.60)
```
This is syntactic sugar but it can help you write cleaner code, at least code you're more familiar with.

#### statements & conditions

Data structures are nice as such but we _might_ need to iterate or perform conditional tests at some point.
Fortunately for us, the syntax is very close to the JavaScript.
A condition is like:
```glsl
if( condition ){
    //true
}else{
    //false
}
```
A for loop is usually:
```glsl
const int count = 10;
for( int i = 0; i <= count; i++){
    //do something
}
```
or with a float iterator:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    //do something
}
```
Note that ```count``` will have to be defined as a ```constant```.
This means prefixing the type with a ```const``` **qualifier**, we'll cover this in a second.

we also have the ```break``` and ```continue``` statements:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    if( i < 5. )continue;
    if( i >= 8. )break;
}
```
Note that on some hardware, ```break``` does not work as expected and the loop doesn't bail out early.

In general, you'll want to keep the iteration count as low as possible and avoid the loops and the conditionals as often as you can.


#### qualifiers

On top of the variable types, GLSL uses **qualifiers**.
Long story short, qualifiers help the compiler know which variable is what.
For instance some data can only be provided by the CPU to the GPU, those are called **attributes** and **uniforms**.
The **attributes** are reserved for the vertex shaders, the **uniforms** can be used in both the vertex and the fragment shaders.
There's also a ```varying``` qualifier used to pass variables between the vertex and the fragment shader.

I won't go too much into details here as we're mostly focused on the **fragment shader** but later in the book, you'll see something like:
```glsl
uniform vec2 u_resolution;
```
See what we did here? We stuck a ```uniform``` qualifier before the type of the variable
This means that the resolution of the canvas we're working on is passed to the shader from the CPU.
The width of the canvas is stored in the x and the height in the y component of the 2D vector.

When the compiler sees a variable preceded by this qualifier, it will make sure that you can't *set* those values at runtime.

The same applied to our ```count``` variable which was the limit of our ```for``` loop:
```glsl
const float count = 10.;
for( ... )
```
When we use a ```const``` qualifier, the compiler will make sure that we set the variable's value only once, otherwise it's not a constant.

There are 3 extra qualifiers that are used in the functions signatures : ```in```, ```out``` and ```inout```.
In JavaScript, when you pass scalar arguments to a function, their value is read-only and if you change their values inside the function,
the changes are not applied to the variable outside the function.
```glsl
function banana( a ){
    a += 1;
}
var value = 0;
banana( value );
console.log( value );// > 0 ; the changes are not taken into account outside the function
```

With arguments qualifiers, you can specify the behaviour of the the arguments:
  * ```in``` will be read-only ( default )
  * ```out```  write-only: you can't read the value of this argument but you can set it
  * ```inout```  read-write: you can both get and set the value of this variable

Rewriting the banana method in GLSL would look like
```glsl
void banana( inout float a ){
    a += 1.;
}
float A = 0.;
banana( A ); //now A = 1.;
```
This is very different from JS and quite powerful too but you don't have to specify the signature qualifiers (the default is read-only).

#### space & coordinates

Final note, in the DOM and the Canvas 2D, we're used to have the Y axis pointing 'down'.
This makes sense in the context of a DOM as it follows the way a web page unrolls ; the navbar at the top, content expanding towards the bottom.
In a WebGL canvas, the Y axis is flipped: Y points 'up'.

This means that the origin, the point (0,0), is located at the bottom left corner of a WebGL context, not at the top left corner like in a 2D Canvas.
The textures coordinates follow this rule which might be counter-intuitive at first.

## And we're done!
Of course we could have gone deeper into the various concepts but as mentioned earlier, this is meant to give a BIG HUG to the newcomers.
It's a quite a lot to ingest but with patience and practice, this will become more and more natural.

I hope you found some of this useful, now [what about starting your journey through the book?]("https://www.thebookofshaders.com/")
