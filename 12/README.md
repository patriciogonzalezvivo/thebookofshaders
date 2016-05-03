## Celluar Noise

In 1996, sixting years after Perlin's Noise and five years before his Simplex Noise, [Steven Worley wrote a paper call  “A Cellular Texture Basis Function”](http://www.rhythmiccanvas.com/research/papers/worley.pdf). In it he describes a procedural texturing tecnique now extensively use by the graphics community.

In 2011 that tecnique was [optimized for GPU by Stefan Gustavson](http://webstaff.itn.liu.se/~stegu/GLSL-cellular/GLSL-cellular-notes.pdf) becoming one powerfull way tools to produce textures with the feel&look of cellular tessue.

To learn more about this technique we need to be confortable thinking in terms of iterations.

### A distance field for some points

Let's say we want to make a distance field of 4 points. What we need to? esentially in each pixel, calculate the distance to the closest point. That means that we need to iterate throught all the points and store the value to the most close one. 

```glsl
    float m_dist = 1.;  // minimun distance
    for (int i = 0; i < TOTAL_POINTS; i++) {
        float dist = distance(st, points[i]);
        m_dist = min(m_dist, dist);
    }
```

To do that we can use a ```for``` loop to iterate through an array of points and keep track of the minimum distance using a [```min()```](../glossary/?search=min) function. Here a brief implementation of that:

<div class="codeAndCanvas" data="cellnoise-00.frag"></div>

In the above code you will find the mouse position as one of the given points, so you can get an idea of how this code behaves. Now try:

- How can you animate the rest of the points?
- After reading [the chapter about shapes](../07/), imagine interesting ways to use this distance field?
- What if you want to add more points to this distance field? What if we want to dynamically add/substract points?

### Tiling and iterating

By this point you probably notice that ```for``` loops and *arrays* are not so friendly in GLSL. Loops don't accept dynamic limits on the condition.
One way to solve this is to think the space in tiles. Not every pixel should be checking every single points, right? They just need to check the points that are close to them. Thats the original approach of [Steven Worley's paper](http://www.rhythmiccanvas.com/research/papers/worley.pdf). For that we are going to sub divide the space into cells like we did before in the [patterns](../09/), [random](../10/) and [noise](../11/) chapters, hopefully by now you are familiarize with this technique.

```glsl
    // Scale 
    st *= 3.;
    
    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
```

In the above code we subdivide the space in a 3x3 grid

Well if you have to scale the previus example with a bigger set of points you will discover that is actually very hard to do that in an efficient way. The solution involves tiling the space like we have done before.

<div class="codeAndCanvas" data="cellnoise-01.frag"></div>

```glsl
    ...
    m_dist = min(m_dist, m_dist*dist);
    ...
```

<a href="../edit.html#12/metaballs.frag"><canvas id="custom" class="canvas" data-fragment-url="metaballs.frag"  width="520px" height="200px"></canvas></a> 

[Inigo Quilez voronoi borders article](http://www.iquilezles.org/www/articles/smoothvoronoi/smoothvoronoi.htm)

*"Before continuing, it might be worth noting that there's a nice trick in this code above. Most implementations out there suffer from precission issues, because they generate their random points in "domain" space (like "world" or "object" space), which can be arbitrarily far from the origin. One can solve the issue moving all the code to higher precission data types, or by being a bit clever. My implementation does not generate the points in "domain" space, but in "cell" space: once the integer and fractioanl parts of the shading point are extracted and therefore the cell in which we are working identified, all we care about is what happens around this cell, meaning we can drop all the integer part of our coordinates away all together, saving many precision bits. In fact, in a regular voronoi implementation the integer parts of the point coordinates simply cancel out when the random per cell feature points are substracted from the shading point. In the implementation above, we don't even let that cancelation happen, cause we are moving all the computations to "cell" space. This trick also allows one to handle the case where you want to voronoi-shade a whole planet - one could simply replace the input to be double precission, perform the floor() and fract() computations, and go floating point with the rest of the computations without paying the cost of changing the whole implementation to double precission. Of course, same trick applies to Perlin Noise patterns (but i've never seen it implemented nor documented anywhere)."*

### Voronoi Algorithm

<div class="codeAndCanvas" data="vorono-00.frag"></div>

This is not scalable

<div class="codeAndCanvas" data="vorono-01.frag"></div>

[Inigo Quilez voronoi borders article](http://www.iquilezles.org/www/articles/voronoilines/voronoilines.htm)

<a href="../edit.html#12/2d-voronoi.frag"><canvas id="custom" class="canvas" data-fragment-url="2d-voronoi.frag"  width="520px" height="200px"></canvas></a> 
 
[Inigo Quilez article about voronoise](http://www.iquilezles.org/www/articles/voronoise/voronoise.htm)
<a href="../edit.html#12/2d-voronoise.frag"><canvas id="custom" class="canvas" data-fragment-url="2d-voronoise.frag"  width="520px" height="200px"></canvas></a> 
