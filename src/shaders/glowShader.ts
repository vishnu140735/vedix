export const glowVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const glowFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);
    
    vec3 glowColor = uColor * uIntensity * fresnel;
    glowColor += uColor * 0.3 * sin(uTime + vUv.x * 10.0) * 0.5 + 0.5;
    
    gl_FragColor = vec4(glowColor, 1.0);
  }
`;

