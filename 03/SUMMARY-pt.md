Aprenda como usar variáveis Uniform. Variáveis uniform, ou simplesmente *uniformes* são as variáveis que carregam informação acessível igualmente de todas as threads do seu shader. O [editor GSLS](http://editor.thebookofshaders.com/) tem três uniformes setados para você.

```glsl
uniform vec2 u_resolution; // Tamanho do canvas  (largura,altura)
uniform vec2 u_mouse;      // posição do mouse em pixels da tela
uniform float u_time;	  // Tempo em segundos desde carregamento
```
