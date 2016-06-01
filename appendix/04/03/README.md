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

### statements & conditions

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
note that on some hardware, ```break``` does not work as expected and the loop doesn't bail out early.

In genearal, you'll want to keep the iteration count as low as possible and avoid the loops and the conditionals as often as you can.


### qualifiers

On top of the variable types, GLSL uses **qualifiers**.
Long story short, qualifiers help the compiler know which variable is what.
For instance some data can only be provided by the CPU to the GPU, those are called **attributes** and **uniforms**.
The **attributes** are reserved for the vertex shaders, the **uniforms** can be used in both the vertex and the fragment shaders.
There's also a ```varying``` **attributes** used to pass variables between the vertex and the fragment shader.

I won't go too much into details here as we're mostly focused on the **fragment shader** but later in the book, you'll see sometihng like:
```glsl
uniform vec2 u_resolution;
```
See what we did here? we stuck a ```unifrom``` qualifier before the type of the variable
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

With argumnts qualifiers, you can specify the behaviour of the the arguments:
  * ```in``` will be read-only ( default )
  * ```out```  write-only: you can't read the value of this argument but you can set it
  * ```inout```  read-write: you can both get and set the value of this variable

rewriting the banana method in GLSL would look like
```glsl
void banana( inout float a ){
    a += 1.;
}
float A = 0.;
banana( A ); //now A = 1.;
```
This is very different from JS and quite powerful too but you don't have to specify the signature qualifiers (the default is read-only).


### And we're done!
Of course we could have gone deeper into the various concepts but as mentioned earlier, this is meant to give a BUG HUG to the newcomers.
It's a quite a lot to ingest but with patience and practice, this will become more and more natural.

I hope you found some of this useful, now [what about starting your journey through the book?]("https://thebookofshaders.com/")


