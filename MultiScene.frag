
precision mediump float;


uniform vec2 resolution;
uniform sampler2D sceneTexture;

#define sat(a) clamp(a, 0., 1.)

void main() {
  vec2 ouv = gl_FragCoord.xy/resolution.xy;
 vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
  vec3 col = vec3(.3)*(1.-sat((length(uv)-.15)*400.));

    gl_FragColor = vec4(col, 1.0);
}
