## An introduction for those coming from JS
by Nicolas Barradeau


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

Last note, a **shader** is made of 2 programs, the **vertex shaderr** and the **fragment shader**.
In a nutshell, the **vertex shader**, the first programm, recieves a *geometry* as an input and turns it into series of **pixels** (or *fragments*) then hands it over to the
**fragment shader**, the second program, that will decide which color to paint the pixels.
This book is mostly focused on the latter, in all the examples, the geometry is a simple quadrilateral that covers the whole screen.

SO! ready?
off we go!

* [types](./01/)
* [vectors](./02/)
* [unicorns](./03/)

