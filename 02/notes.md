### Scott

* After reading 1–7 I understand that there is some relationship between shader language and C, but I’m not sure what it is.  Can you tell us explicitly?  Is GLSL (shader language) C?  Is GLSL a subset of C?

* In point #5 you explain preprocessor macros, but you don’t explain why you used one here.  You probably don’t want to go off topic just yet, but I would appreciate a sidebar or brief comment explaining why you are including special handling for GL_ES.  (My mind goes:  Interesting, but why is mobile OpenGL different from non-mobile?)

* Point #6:  I hope later in the book you will show us an example of how changing float precision affects things visually.  (I sense it’s important, but don’t see how yet, and I recognize it is too soon to address it here.)

* Point #7:  I had to read this two times to get that you meant including the period (.) is casting.  I haven’t used C, so I didn’t understand that.  I am used to Processing/Java-style casting, like:
```
    (float) 1 == 1.0
```

* I figured out that vec4() is a vector with 4 values, but perhaps you could make that explicit somewhere.
