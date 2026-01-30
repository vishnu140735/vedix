export const gradientVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const gradientFragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float mixFactor = (sin(uv.x * 3.14159 + uTime) + 1.0) * 0.5;
    vec3 color = mix(uColor1, uColor2, mixFactor);
    gl_FragColor = vec4(color, 1.0);
  }
`;

