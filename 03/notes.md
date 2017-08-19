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


NOTES:

uniform vec2 u_resolution;  // vec2(500.0,500.0)
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    //                          X  Y
    // gl_FragCoord.xy = vec2(0.0,0.0);
    //                          / /
    //                   vec2(500.0,500.0);

    vec2 st = gl_FragCoord.xy/u_resolution;

    // ST -> vec2(0.0,0.0) to vec2(1.0,1.0)

    //                  RED   GREEN   BLUE  ALPHA
    gl_FragColor = vec4(st.x, st.y,   0.0,  1.0);
}

### Nicolas
*    >You can picture the uniforms like little bridges between the CPU and the GPU

        a 'one-way'' bridges that is :) I translated it to:

        >We can picture the uniforms as small one-way bridges from the CPU (our main program) to the GPU (where the shader will be executed).

*   >In the same way GLSL gives us a default output, ```vec4 gl_FragColor```, it also gives us a default input, ```vec4 gl_FragCoord```,
which holds the screen coordinates of the *pixel* or *screen fragment* that the active thread is working on.

    I developped a bit more to disambiguate pixel & fragment, I think it's an important step, the first time we meet the word fragment _for real_

* I've stressed the fact that gl_FragCoord is implicitly declared so that people don't panic when they don't find it in the new code sample :)
    also those are reserved names, so I stressed the fact that you can't use them as var names in your custom code.
