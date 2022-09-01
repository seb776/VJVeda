precision mediump float;

#include "tools.glsl"

#include "Visuals/TunnelTargets.glsl"
#include "Visuals/PsySym.glsl"
#include "Visuals/GoaFractal.glsl"
#include "Visuals/DnbCorridor.glsl"



void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    if (MIDI_FADER(0) > 0.01)
      col += MIDI_FADER(0)*rdrtunneltargets(uv)*2.;

    if (MIDI_FADER(1) > 0.01)
      col += MIDI_FADER(1)*rdrpsysym(uv)*2.;

      if (MIDI_FADER(2) > 0.01)
        col += MIDI_FADER(2)*rdrgoafractal(uv)*2.;

        if (MIDI_FADER(3) > 0.01)
          col += MIDI_FADER(3)*rdrdnbcorridor(uv)*2.;
          /*
          if (MIDI_FADER(4) > 0.01)
            col += MIDI_FADER(4)*rdrmackjamtunnel(uv)*2.;
            if (MIDI_FADER(5) > 0.01)
              col += MIDI_FADER(5)*rdrkarenn(uv)*2.;
              if (MIDI_FADER(6) > 0.01)
                col += MIDI_FADER(6)*rdrtunnelpsy(uv)*2.;
                */
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);


    gl_FragColor = vec4(col, 1.0);
}
