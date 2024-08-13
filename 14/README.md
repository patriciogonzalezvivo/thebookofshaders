## Fractals

In the prevous chapter we addeded incrising octaves of noise while we were decreasing it's amplitud, resulting in a more granular noise we called that fractal noise. It's name reside in the fact that the structure repeats it self at different scales. That property is known as **self similarity**. And is actually very useful in computer graphics, because it allows us to create complex structures from simple ones at any scale or resolution. For the same reason fractals can be spot on nature everywhere, from the shape of a tree, a shell, fern, etc. It's a smart way for life to grow and scale in a very efficient way with very little information.

Let's study self similarity in a simple way, no complicated math or formulas for now. We will go back and use [tile patterns](https://thebookofshaders.com/09/) and a [random functions](https://thebookofshaders.com/10/) from chapters 9 and 10 to get familiar with recursion and self similarity.

Recursion

<div class='codeAndCanvas' data='tiling_00.frag'></div>


<div class='codeAndCanvas' data='tiling_01.frag'></div>

Self similarity

<div class='codeAndCanvas' data='tiling_02.frag'></div>

<div class='codeAndCanvas' data='tiling_03.frag'></div>

<div class='codeAndCanvas' data='tiling_04.frag'></div>

<div class='codeAndCanvas' data='tiling_05.frag'></div>

<div class='codeAndCanvas' data='tiling_06.frag'></div>

<div class='codeAndCanvas' data='tiling_07.frag'></div>

<div class='codeAndCanvas' data='tiling_08.frag'></div>


Mathematical model

<div class='codeAndCanvas' data='mandelbrot_00.frag'></div>
