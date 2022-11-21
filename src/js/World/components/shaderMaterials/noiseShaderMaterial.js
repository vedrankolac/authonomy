import { ShaderMaterial } from "three";

const noiseShaderMaterial = (color) => {
  console.log('+ color', color);

  const vertex = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`

  const fragment = `
  uniform vec3 uDiffuseColor;
  uniform vec3 randomFactors;
  varying vec2 vUv;
  varying vec3 vPosition;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }


  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

  float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);

      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);

      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);

      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));

      vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

      return o4.y * d.y + o4.x * (1.0 - d.y);
  }
  
  void main() {
    vec2 gridUv = vec2(floor(vUv.x * (randomFactors.x * 2048.0)) / (randomFactors.x * 2048.0), floor(vUv.y * (randomFactors.y * 2048.0)) / (randomFactors.y * 2048.0));
    float strength = random(gridUv);
    float n = noise(vPosition +0.3);

    float r = random(vUv) * 0.2 + 0.8;
    gl_FragColor = vec4(r, r, r, 1.0);
  }`

  const parameters = {
    uniforms: {
      uDiffuseColor: { value: color },
      randomFactors: { value: [1, 1, 1]}
    },
    vertexShader: vertex,
    fragmentShader: fragment
  }
  const material = new ShaderMaterial(parameters);
  
  return material;
}

export  { noiseShaderMaterial };