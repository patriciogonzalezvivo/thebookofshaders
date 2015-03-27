#### Scott

* For these uniforms:
```
uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;      // Time in seconds since load
````
…what determines these variable names?  Are these set by you, so I could change them, or are these determined by the graphics card, GLSL, or something else?

* This list of GLSL-supported functions is super.  Maybe you could link to a comprehensive list here, too.

• In "Slow down the frequency until the color change becomes almost imperceptible" took me a minute to figure out the right place to do that.  I ended up writing:
```
    gl_FragColor = vec4( abs(sin(u_time * 0.4)) ,0.0,0.0,1.0);
```

I mention it because I felt this is the first place where you might lose some people.  Consider giving a little more guidance with this instruction.

* So gl_FragCoord is a varying, so it doesn’t have to be declared.  But uniforms do have to be declared before you can use them?  Is that right?

* Starting in this example, I need to be told what the components of a vec4() are.  It looks like you are using vec4.x and vec4.y.  But you didn’t introduce these.  What other options do I have?

* Also I would want the fields of gl_FragCoord explained.  You used gl_FragCoord.xy but didn’t explain it.  I assume it’s a vec2 with the x and y values, of course.

Come to think of it, it is crazy that you can write:

    gl_FragCoord.xy / u_resolution

and have that return a vec2!  In Processing you have to use something like vector.divide().  Maybe it would be worth explaining a bit what your line of code above does?  Does it really divide both the X and Y values by u_resolution?
