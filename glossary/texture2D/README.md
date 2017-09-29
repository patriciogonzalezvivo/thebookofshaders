## Texture2D
Retrieves texels from a texture

### Declaration
```glsl
vec4 texture2D(sampler2D sampler, vec2 coord)  
vec4 texture2D(sampler2D sampler, vec2 coord, float bias)
```

### Parameters
```sampler``` specifies the sampler to which the texture from which texels will be retrieved is bound.

```coord``` specifies the texture coordinates at which texture will be sampled.

```bias``` specifies an optional bias to be applied during level-of-detail computation.

### Description
The texture2D function returns a texel, i.e. the (color) value of the texture for the given coordinates. The function has one input parameter of the type sampler2D and one input parameter of the type ```vec2``` : sampler, the uniform the texture is bound to, and coord, the 2-dimensional coordinates of the texel to look up.

There is an optional third input parameter of the type float: bias. After calculating the appropriate level of detail for a texture with mipmaps the bias is added before the actual texture lookup operation is executed.

Side note: On iOS devices texture lookup functionality is only available in the fragment shader.

### See Also
[textureCube](/glossary/?search=textureCube)
