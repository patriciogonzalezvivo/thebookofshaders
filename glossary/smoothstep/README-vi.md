## Smoothstep
Thực hiện phép nội suy Hermitte giữa 0 và 1 theo tỉ lệ.

### Các phiên bản
```glsl
float smoothstep(float edge0, float edge1, float x)  
vec2 smoothstep(vec2 edge0, vec2 edge1, vec2 x)  
vec3 smoothstep(vec3 edge0, vec3 edge1, vec3 x)  
vec4 smoothstep(vec4 edge0, vec4 edge1, vec4 x)

vec2 smoothstep(float edge0, float edge1, vec2 x)  
vec3 smoothstep(float edge0, float edge1, vec3 x)  
vec4 smoothstep(float edge0, float edge1, vec4 x)
```

### Các tham số
```edge0``` cận dưới trên trục hoành của hàm Hermitte

```edge1``` cận trên trên trục hoành của hàm Hermitte

```x``` giá trị trên trục hoành

### Mô tả
```smoothstep()``` thực hiện phép nội suy giữa ```0``` và ```1``` nếu ```edge0 < x < edge1```. Nếu ```x < edge0``` thì trả về ```0```, còn nếu ```x > edge1``` thì trả về ```1```. Hàm này hay dùng khi cần chuyển tiếp giữa 2 vùng mà không muốn đột ngột thay đổi giá trị. Hàm ```smoothstep()``` tương đương với:
```glsl
    genType t;  /* Hoặc genDType t; */
    t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
```

Nếu ```edge0 ≥ edge1``` thì kết quả không xác định được.

<div class="simpleFunction" data="y = smoothstep(0.0,1.0,x); "></div>

<div class="codeAndCanvas" data="../05/smoothstep.frag"></div>

### Tham khảo thêm
[mix](/glossary/?lan=vi&search=mix), [step](/glossary/?lan=vi&search=step), [Các hàm số cơ bản (Hàm hình dạng - Shape function)](/05/?lan=vi)
