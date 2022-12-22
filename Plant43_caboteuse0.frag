precision mediump float;

#include "tools.glsl"

#include "Visuals/BubblesTunnel.glsl"
#include "Visuals/DnbTriangle.glsl"
#include "Visuals/FirstDnbVisual.glsl"
#include "Visuals/JunoPosition.glsl"
#include "Visuals/LostStructures.glsl"

vec3 rdrover(vec2 uv)
{
  vec3 col = vec3(0.);
  vec2 uv2 = uv;
  vec2 rep = vec2(.1);
  vec2 id = floor((uv2+rep*.5)/rep);
  uv2 = mod(uv2+rep*.5,rep)-rep*.5;
  float sz = mix(0.01,0.05,FFThigh);
  float shape = _sqr(uv2, vec2(sz));

  col = mix(col, vec3(.78,.23,.4), 1.-sat(shape*400.));

  return col;
}

void main() {
  mtime = time*(1.*MIDI_KNOB(1));
  float stp = .002;

    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    vec2 ouv = uv;
    uv *=  .5;
    uv = floor(uv/stp)*stp;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.1;
    uv += (FFT(0.1)-.5)*MIDI_KNOB(2);
    uv *= r2d(3.*length(uv)*sin(time*.5));
    uv *= length(uv)*4.+1.;
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
/*è
          if (MIDI_FADER(4) > 0.01)
            col += MIDI_FADER(4)*rdrmackjamtunnel(uv)*2.;
            if (MIDI_FADER(5) > 0.01)
              col += MIDI_FADER(5)*rdrkarenn(uv)*2.;
*/
    float flicker = 1./16.;
    col += rdrover(ouv);

    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);
//col *= FFT(.1)*10.;

  float shape = sin(lenny(uv)*10.+time*10.);
  col = mix(col, col.zxy*1.8, 1.-sat(shape*1.));
  col = pow(col, vec3(MIDI_FADER(7)*5.+1.));
    gl_FragColor = vec4(col*2., 1.0);
}
