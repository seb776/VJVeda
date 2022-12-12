
/*{
"PASSES": [
  {
    fs: "./BlurX.frag",
    TARGET: "blurX"
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
uniform float time;
uniform vec2 resolution;
uniform sampler2D sceneTexture;
uniform sampler2D blurX;
uniform sampler2D greyNoise;
uniform sampler2D backbuffer;
#define sat(a) clamp(a, 0., 1.)

void main() {
  vec2 uv = gl_FragCoord.xy/resolution.xy;

  const int steps = 20; // SAMPLES COUNT
  vec3 col = vec3(0.);

  for (int i = 0; i< steps; ++i)
  {
      float f = float(i)/float(steps);
      f = (f -.5)*2.;
      float factor = 0.01; // DISTANCE
      vec2 nuv = uv+vec2(f*factor, 0.).yx*resolution.yx/resolution.xx;
      if (nuv.y > 0. && nuv.y < 1.)
        col += texture2D(blurX, nuv).xyz/float(steps);
  }


  gl_FragColor = vec4(col,1.0);
}
