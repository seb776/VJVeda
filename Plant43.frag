precision mediump float;

#include "tools.glsl"

#include "Visuals/BubblesTunnel.glsl"
#include "Visuals/DnbTriangle.glsl"
#include "Visuals/FirstDnbVisual.glsl"
#include "Visuals/JunoPosition.glsl"
#include "Visuals/LostStructures.glsl"



void main() {
  mtime = time*(1.*MIDI_KNOB(1));
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    uv += (FFT(0.1)-.5)*MIDI_KNOB(2);
    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    if (MIDI_FADER(0) > 0.01)
      col += MIDI_FADER(0)*rdrbubblestunnel(uv)*2.;

    if (MIDI_FADER(1) > 0.01)
      col += MIDI_FADER(1)*rdrdnbtriangle(uv)*2.;

      if (MIDI_FADER(2) > 0.01)
        col += MIDI_FADER(2)*rdrjunoposition(uv)*2.;

        if (MIDI_FADER(3) > 0.01)
          col += MIDI_FADER(3)*rdrloststructures(uv)*2.;
/*
          if (MIDI_FADER(4) > 0.01)
            col += MIDI_FADER(4)*rdrmackjamtunnel(uv)*2.;
            if (MIDI_FADER(5) > 0.01)
              col += MIDI_FADER(5)*rdrkarenn(uv)*2.;
*/
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);


    gl_FragColor = vec4(col, 1.0);
}
