
/*{
"PASSES": [
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

#define sat(a) clamp(a, 0., 1.)

void main() {
  vec2 uv = gl_FragCoord.xy/resolution.xy;

  const int steps = 20; // SAMPLES COUNT
  vec3 col = vec3(0.);

  for (int i = 0; i< steps; ++i)
  {
      float f = float(i)/float(steps);
      f = (f -.5)*2.;
      float factor = 0.2; // DISTANCE
      vec2 nuv = uv+vec2(f*factor, 0.)*resolution.yx/resolution.xx;
      if (nuv.x > 0. && nuv.x < 1.)
        col += texture2D(sceneTexture, nuv).xyz/float(steps);
  }
  gl_FragColor = vec4(col,1.0);
}
