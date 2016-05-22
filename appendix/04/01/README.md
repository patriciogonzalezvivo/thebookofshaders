![first search result for 'strong type' on Google Image, on the 2016/05/20](strong_type.jpg)
### strong types

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
There is a `void` type that roughly cooresponds to `null`, it is used as the return type of a method that doesn't return anything.
you can't assign it to a variable.

#### boolean
As you know, Booleans are mostly used in conditional tests ; `if( myBoolean == true ){}else{}`.
If the conditional branching is a valid option on the CPU, [the parallel nature](http://thebookofshaders/01/) of GLSL makes it less true.
Using conditionals is even discouraged most of the time, the book explains a couple of alternative techniques to solve this.

#### type casting
As [Aragorn](https://en.wikipedia.org/wiki/Aragorn) put it, "One does not simply combine Typed primitives". Unlike JavaScript, GLSL will not allow you to perform operations between variables of different types.

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
and this will work as expected ( `r` will store the result of `i` x `f`).

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
This may not sound like much for `scalar` types, it's not very different from **casting**, but it will make sense when adressing the *overload* section.

Ok, so these three are the `primitive types`, things you can't live without but of course, GLSL has more to offer.


