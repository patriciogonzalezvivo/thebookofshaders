// Copyright 2015 Patricio Gonzalez Vivo (http://patriciogonzalezvivo.com)

PShader shader;

void setup() {
  size(640, 360, P2D);
  noStroke();

  // Load and compile shader
  shader = loadShader("shader.frag");
}

void draw() {
  // Set uniforms
  shader.set("u_resolution", float(width), float(height));
  shader.set("u_mouse", float(mouseX), float(mouseY));
  shader.set("u_time", millis() / 1000.0);

  // Replace the default pipeline programs with our shader
  shader(shader);

  // Draw a billboard
  rect(0,0,width,height);
}

void keyPressed(){
  // Reload shader everytime a key is press
  shader = loadShader("shader.frag");
}
