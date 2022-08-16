precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

#define sat(a) clamp(a, 0., 1.)



#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec3 col = vec3(0.);

    col = vec3(1.)*pow(FFT(uv.x)*sat(uv.x+.5)*4., 1.);
//col = vec3(0.);
  //col = vec3(1.)*MIDI_BTN_R(7);
    gl_FragColor = vec4(col, 1.0);
}
