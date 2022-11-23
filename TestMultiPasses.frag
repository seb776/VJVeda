/*{
"PASSES": [
  {
    fs: "./BlurX.frag",
    TARGET: "blurX"
  },
  {
    fs: "./BlurY.frag",
    TARGET: "blurY"
  },
  {
    fs: "./MultiScene.frag",
    TARGET: "sceneTexture"
  },
  {}
]
}
*/
precision mediump float;


uniform vec2 resolution;
uniform sampler2D sceneTexture;
uniform sampler2D blurX;
uniform sampler2D blurY;

#define sat(a) clamp(a, 0., 1.)

void main() {
  vec2 ouv = gl_FragCoord.xy/resolution.xy;
 vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
  vec3 col = vec3(.3)*(1.-sat((length(uv)-.5)*400.));
  col = texture2D(sceneTexture, ouv).xyz;
  col += texture2D(blurY, ouv).xyz*2.;
    gl_FragColor = vec4(col, 1.0);
}
