precision mediump float;
uniform sampler2D backbuffer;

#include "tools.glsl"

#include "Visuals/DnBTunnel.glsl"
#include "Visuals/Mackjampsy.glsl"
#include "Visuals/Mackjamtunnel.glsl"
#include "Visuals/Karenn.glsl"

#include "Visuals/DnbCorridor.glsl"

#include "Visuals/DarkRoom.glsl"
#include "Visuals/Mackjam.glsl"

#include "Visuals/TunnelDnB.glsl"
#include "Visuals/TunnelBars.glsl"
#include "Visuals/BubblesTunnel.glsl"

vec3 rdrcomposite(vec2 uv)
{
  uv += (vec2(hash11(FFT(0.1)), hash11(FFT(0.2)))-.5)*MIDI_KNOB(0);
  vec3 col = vec3(0.);

  //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
  if (MIDI_FADER(0) > 0.01)
    col += MIDI_FADER(0)*rdrdnbtunnel(uv).zxy*2.;

  if (MIDI_FADER(1) > 0.01)
    col += MIDI_FADER(1)*rdrdnbcorridor(uv)*2.;

    if (MIDI_FADER(2) > 0.01)
      col += MIDI_FADER(2)*rdrDarkRoom(uv)*3.;
/*
      if (MIDI_FADER(3) > 0.01)
        col += MIDI_FADER(3)*rdrmackjampsy(uv)*2.;
        if (MIDI_FADER(4) > 0.01)
          col += MIDI_FADER(4)*rdrtunnelbars(uv)*2.;
          if (MIDI_FADER(5) > 0.01)
            col += MIDI_FADER(5)*rdrtunneldnb(uv)*2.;

            if (MIDI_FADER(6) > 0.01)
              col += MIDI_FADER(6)*rdrmack(uv)*2.;
              if (MIDI_FADER(7) > 0.01)
                col += MIDI_FADER(7)*rdrbubblestunnel(uv)*2.;*/
  float flicker = 1./16.;
  col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv)))*2., MIDI_BTN_S(0)*mod(time, flicker)/flicker);
  col = mix(col, col.zxy, MIDI_BTN_M(0)*mod(time, flicker)/flicker);
  col = mix(col, 1.-col.zxy, MIDI_BTN_R(0)*mod(time, flicker)/flicker);
//col =mix(col, col.xxx, sat(MIDI_KNOB(7)*2.));
return col;
}

void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    //uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    float stp = .02;
    vec2 off = vec2(.02)*hash11(floor(uv.y/stp+FFT(0.1)*2.)*stp)*pow(FFT(0.5),.5)*15.*MIDI_KNOB(1);
    vec3 col = vec3(0.);
    if (length(off) < 0.01)
    {
      col = rdrcomposite(uv);
    }
    else
    {
      col.x = rdrcomposite(uv+off).x;
      col.y = rdrcomposite(uv).y;
      col.z = rdrcomposite(uv-off).z;
    }

    gl_FragColor = vec4(col, 1.0);
}
