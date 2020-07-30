## Step
Generate a step function by comparing two values

### Các phiên bản
```glsl
float step(float edge, float x)  
vec2 step(vec2 edge, vec2 x)  
vec3 step(vec3 edge, vec3 x)  
vec4 step(vec4 edge, vec4 x)

vec2 step(float edge, vec2 x)  
vec3 step(float edge, vec3 x)  
vec4 step(float edge, vec4 x)
```

### Các tham số
```edge``` specifies the location of the edge of the step function.

```x``` specify the value to be used to generate the step function.

### Mô tả
```step()``` generates a step function by comparing ```x``` to ```edge```.

For element ```i``` of the return value, ```0.0``` is returned ```if x[i] < edge[i]```, and ```1.0``` is returned otherwise.

<div class="simpleFunction" data="y = step(0.5,x); "></div>

<div class="codeAndCanvas" data="../05/step.frag"></div>

### Tham khảo thêm
[mix](/glossary/?lan=vi&search=mix), [smoothstep](/glossary/?lan=vi&search=smoothstep), [Các hàm số cơ bản (Hàm hình dạng - Shape function)](/05/?lan=vi)
