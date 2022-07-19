precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
//uniform sampler2D midi;

#define sat(a) clamp(a, 0., 1.)

#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec3 col = vec3(0.);
    col = vec3(1.)*pow(FFT(uv.x)*sat(uv.x+.5)*4., 1.);
col = vec3(0.);
  //col = vec3(1.)*texture2D(midi, vec2(144. / 256., 0)).x;
    gl_FragColor = vec4(col, 1.0);
}
