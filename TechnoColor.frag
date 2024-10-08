precision mediump float;

#include "tools.glsl"

#include "Visuals/DnBTunnel.glsl"
#include "Visuals/Glowwyy.glsl"
#include "Visuals/LSDWormhole.glsl"
#include "Visuals/Mackjampsy.glsl"
#include "Visuals/Mackjamtunnel.glsl"
#include "Visuals/Karenn.glsl"
#include "Visuals/TunnelPsy.glsl"


void main() {
  mtime = time*(1.+MIDI_KNOB(1));
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
  //  uv = abs(uv);
    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    if (MIDI_FADER(0) > 0.01)
      col += MIDI_FADER(0)*rdrdnbtunnel(uv)*2.;

    if (MIDI_FADER(1) > 0.01)
      col += MIDI_FADER(1)*rdrglowwyy(uv)*2.;
      if (MIDI_FADER(2) > 0.01)
        col += MIDI_FADER(2)*rdrlsdwormhole(uv)*2.;
        if (MIDI_FADER(3) > 0.01)
          col += MIDI_FADER(3)*rdrmackjampsy(uv)*2.;
          if (MIDI_FADER(4) > 0.01)
            col += MIDI_FADER(4)*rdrmackjamtunnel(uv)*2.;
            if (MIDI_FADER(5) > 0.01)
              col += MIDI_FADER(5)*rdrkarenn(uv)*2.;
              if (MIDI_FADER(6) > 0.01)
                col += MIDI_FADER(6)*rdrtunnelpsy(uv)*2.;
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv)))*2., MIDI_BTN_S(0)*mod(time, flicker)/flicker);
    col = mix(col, (1.-col)*(1.-sat(length(uv)))*2., MIDI_BTN_M(0)*mod(time, flicker)/flicker);

col = mix(col,col.zxy, MIDI_KNOB(2));
col = mix(col, col*FFT(0.1)*3., MIDI_KNOB(3));
//col *= FFT(0.1)+.5;
    gl_FragColor = vec4(col, 1.0);
}
