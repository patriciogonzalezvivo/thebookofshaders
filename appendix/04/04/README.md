

### textures and space

Let's start with a gentle one ; the Y axis is flipped.
Y points 'up', to the sky, while in the DOM & Canvas worlds, we're used to having the Y pointing 'down'.
This makes sense in the context of a DOM as it follows the way a web page would unroll(the navbar at the top, content at the bottom),
but if you were to tell where is the 'up' direction of a piece of paper, I'm sure you'd point 'up''.

This implies that the point 0,0, which is located in the top left corner of a canvas element will be located in the bottom right corner of a WebGL context.
The textures coordinates also will follow this rule which might be counter-intuitive but soon you'll get used to it.

[to be continued]
