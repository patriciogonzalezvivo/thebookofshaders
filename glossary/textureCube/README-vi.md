## TextureCube
Lấy màu của một vị trí bất kỳ trên texture có định dạng cube (6 mặt của khối lập phương).

### Các phiên bản
```glsl
vec4 textureCube(samplerCube sampler, vec3 coord)  
vec4 textureCube(samplerCube sampler, vec3 coord, float bias)
```

### Các tham số
```sampler``` là sampler đã khởi tạo với texture, sẽ giúp ta lấy được màu tại tọa độ mong muốn.

```coord``` tọa độ vị trí cần lấy màu trên texture.

```bias``` sai số cho phép nếu áp dụng cơ chế Level-Of-Detail.

### Mô tả
Kết quả của hàm là 1 texel, tức màu tại vị trí chỉ định trên texture. 

Tham số thứ ba không bắt buộc. Sau khi tính toán xong Level-Of-Detail phù hợp dựa trên các cấp mipmap, ```bias``` sẽ được dùng để tìm tọa độ trên texture.

Chú ý: Trên các thiết bị iOS, hàm này chỉ có thể dùng trong fragment shader.

### Tham khảo thêm
[texture2D](/glossary/?lan=vi&search=texture2D)
