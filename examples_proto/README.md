# Shader Gallery

The following is the list of examples present in this book and more from our excellent contributors and readers. Find your favorite example and play around with it. It's good idea to change the values or commenting out a part of the code to understand what each part of the code is doing. Once you feel comfortable with the example, try if you can create something unique and new by tweaking it bit by bit, then share your experiment with "share" button at the top of the editor so that someone can find it and study.

## Featured shaders

Featured examples shared by our readers and students. We are looking forward to see a lot more shaders created with the [GLSL editor](http://editor.thebookofshaders.com/). Please share your masterpiecess to [@bookofshaders](https://twitter.com/bookofshaders).

<div id="shared-examples"></div>
<script type="text/javascript">gallery.createExampleList("shared", 9)</script>
<!---
<div class="extra-container"><a href="shared.php">See All Shared Shaders</a></div>
--->

## Getting started
### "Hello World!"

Usually the "Hello world!" example is the first step to learning a new language. In GPU-land rendering text is an overcomplicated task for a first step, instead we'll choose a bright welcoming color to shout our enthusiasm!

Read ["Hello World!"](../02) to learn more.

<div id="c02-examples"></div>
<script type="text/javascript">gallery.createExampleList("c02", 3)</script>


### Uniforms

Learn how to use Uniform variables. Uniform variables, or simply *uniforms* are the variables that carry information equally accessible from all of the threads of your shader. The [GSLS editor](http://editor.thebookofshaders.com/) has three uniforms set up for you.

Read [Uniforms](../03) to learn more.

```glsl
uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;	  // Time in seconds since load
```

<div id="c03-examples"></div>
<script type="text/javascript">gallery.createExampleList("c03", 3)</script>

## Algorithmic drawing
### Shaping functions

Shaping functions is fundamental technique that is recursively used throughout this book that let you control the variation of value at will. Study how different functions of x are used to create different shapes and try making your own function.

Read [Shaping functions](../05) to learn more.

<div id="c05-examples"></div>
<script type="text/javascript">gallery.createExampleList("c05", 3)</script>
<div class="extra-container"><a href="c05.php">See All Examples</a></div>

### Color

Familiarize yourself with how to express colors in shaders. The examples cover how to mix colors and beautifully animate them over time as well as conversion between two different models(RGB and HSB).
In GLSL, colors are simply just vectors, which means you can easily apply the concepts and techniques you learn here to other

Read [Colors](../06) to learn more.

<div id="c06-examples"></div>
<script type="text/javascript">gallery.createExampleList("c06", 3)</script>
<div class="extra-container"><a href="c06.php">See All Examples</a></div>

### Shapes

Let's look at how to draw simple shapes in a parallel procedural way. In a nutshell, all you need to do is to determine if each pixel belongs to the shape you want to draw or not, and apply different colors accordingly. You can use coordinate system like a grid paper to draw rectangles and squares. We'll look at more advanced concept called distance field to draw more complex shapes.

Read [Shapes](../07) to learn more.

<div id="c07-examples"></div>
<script type="text/javascript">gallery.createExampleList("c07", 3)</script>
<div class="extra-container"><a href="c07.php">See All Examples</a></div>

### Matrix

Matrix is a very powerful tool for manipulating vectors. By mastering how to use matrices, you can freely translate, scale and rotate shapes. Since the technique can be equally applied to anything expressed by vectors, we will look at many more advanced use of matrices later in this book.
Matrices may look complex at a first glance, but you'll find it very handy and useful as you get used to the concept. Let's practice here and learn basics with simple examples.

Read [Matrix](../08) to learn more.

<div id="c08-examples"></div>
<script type="text/javascript">gallery.createExampleList("c08", 3)</script>
<div class="extra-container"><a href="c08.php">See All Examples</a></div>

### Patterns

Repetitive patterns are perfect theme for computational sketching. Different from conventional way of drawing, shaders lets you draw everything parallely at once. Instead of repeating the same procedure many times, you will wrap and repeat the "space". Sounds like Sci-Fi? Let's find out what it really means.

Read [Patterns](../09) to learn more.

<div id="c09-examples"></div>
<script type="text/javascript">gallery.createExampleList("c09", 3)</script>
<div class="extra-container"><a href="c09.php">See All Examples</a></div>


## Generative designs
### Random

Life is boring if everything was predictable. Though nothing is truly random in computers, we can create pseudo-randomness that looks totally unpredictable using simple tricks to create more interesting patterns and behaviors.

Read [Random](../10) to learn more.

<div id="c10-examples"></div>
<script type="text/javascript">gallery.createExampleList("c10", 3)</script>
<div class="extra-container"><a href="c10.php">See All Examples</a></div>

### Noise

How can we create more natural looking textures like surface of the roads, rocks, trees and clouds? Noise function is the answer.
Since Ken Perlin invented his first noise algorithm in 80s, the technique has been extensively used throughout computer graphics and simulations. Even if you have never heard of the name, it's not possible you have never seen it. Let's look step by step at how the function is built and works. We also cover more efficient version of the algorithm called simplex noise.

Read [Noise](../11) to learn more.


<div id="c11-examples"></div>
<script type="text/javascript">gallery.createExampleList("c11", 3)</script>
<div class="extra-container"><a href="c11.php">See All Examples</a></div>


## Advanced examples

This section features relatively advanced examples from different chapters. Try if you can read and understand all the examples here to test yourself.

<div id="advanced-examples"></div>
<script type="text/javascript">gallery.createExampleList("advanced", 3)</script>
<div class="extra-container"><a href="advanced.php">See All Examples</a></div>
