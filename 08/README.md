## 2D Matrixes

### Translate

In the previous chapter we learn how to make some shapes. We are already familiar with values between 0.0 and 1.0, and the trick to move the shapes we previusly work with is moving the coordinate system it self. We can achive that by simply adding a vector to the ```st``` variable that contain the normalized position of the coordinate of the fragment. By doing that the hole space coordinates move it self. 

<div class="codeAndCanvas" data="cross-translate.frag"></div>
 
Now try the following excersises:

* Uncomment line 33 of the above code to see how the space it self is shifted around.

* Using ```u_time``` together with the shaping functions move the small cross around in an interesting way. Search for a specify quality on motion you are interested on (recording something from the *"real world"* first could be useful). It could be the come and go of the waves, a pendulum movement, a bouncing ball, a car accelerating, a bicycle stoping.

### Rotations

To rotate objects we also need to move the entire space system. For that we are going to use a [matrix](http://en.wikipedia.org/wiki/Matrix_%28mathematics%29). Matrixes are organized set of numbers in columns and rows, that are multiply by vectors following a precise set of rules, that modify the values of the vector in a particular way.

![](matrixes.png)

GLSL have native support for two, three and four dimensional matrixes: [```mat2```](http://www.shaderific.com/glsl-types/#2x2floatingpointmatrix) (2x2), [```mat3```](http://www.shaderific.com/glsl-types/#3x3floatingpointmatrix) (3x3) and [```mat4```](4x4floatingpointmatrix) (4x4) together with a matrix specific functions ( [```matrixCompMult()```](http://www.shaderific.com/glsl-functions/#componentwisematrixmultiplication) ) beside the multiplication  (```*```) operator.

Based on how matrixes behave is posible to construct matrixes that produces specific behaviur. For example we can use a matrix to translate a vector:

![](3dtransmat.png)

More interestingly, we can use a matrix to rotate the coordinate system. 

![](2drotmat.png)

Take a look to the following code of a function that constructs a 2D rotation matrix. This function follows the above [formula](http://en.wikipedia.org/wiki/Rotation_matrix) that rotates the coordinates around the ```vec2(0.0)``` point. 

```glsl
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
```

According to the way we have been drawing shapes this is not exactly what we want. Our cross shape is draw in the center of the canvas which correspond to the position ```vec2(0.5)```. So before we rotate the space we need to move shape from the `center` to the ```vec2(0.0)``` coordinate, then rotate the space to finally move it back to the original place.

<div class="codeAndCanvas" data="cross-rotate.frag"></div>

Note that we need to multiply the rotation matrix for the position vector to return a rotated vector which in our example is just the original position variable that we are over writing. If you want to rotate different elements in different proportions you need to “preserve” the original coordinate system by assigning another vector.  

Try the following excersices:

* Uncomment line 40 of above code and pay atention to what happens.

* Comment the translations before and after the rotations on line 35 and 37 and observe the consecuences.

* Use rotations to improve the animation you simulate in the translation exercise. 

### Scale

So we saw how matrixes were use to translate and rotate object on space (more precise transform the coordinate system and by that rotate and move them). If you have use 3D modeling software or if you have use some push and pop matrix function in processing you will know that also matrixes can be use to scale the size of an object. 

![](3dscalemat.png)

Following the previus formula we can understand how to make a 2D scaling matrix.

```glsl
mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}
```

<div class="codeAndCanvas" data="cross-scale.frag"></div> 

Do the following excersises to understand deeply how it works

* Uncommenting line 40 of above code to see the space coordinate being scale.

* See what happens when you comment the translations before and after the scaling on line 35 and 37.

* Try combining a rotation matrix together with a scale matrix. Be aware that the order matters. Multiply the matrix first and at the end the vectors.

* Now that you know how to do draw different shapes, and move, rotate and scale them is time to make a nice composition. Design and construct a [fake UI or HUD (heads up display)](https://www.pinterest.com/patriciogonzv/huds/). Use the following ShaderToy example by [Ndel](https://www.shadertoy.com/user/ndel) as inspiration and reference.

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/4s2SRt?gui=true&t=10&paused=true" allowfullscreen></iframe>

### Other uses for matrixes: color - YUV

[YUV](http://en.wikipedia.org/wiki/YUV) is a color space use for analog encoding of photos and videos that use the range of human perception to reduce the bandwidth of chrominance components.

The following code is an interesting opportunity to use [matrix](http://en.wikipedia.org/wiki/Matrix_(mathematics)) operations on GLSL to transform colors from one mode to the other one.

<div class="codeAndCanvas" data="yuv.frag"></div>

As you can see we are treating colors as vectors by multiplying them to matrices. In that way we “move” the values arround.

