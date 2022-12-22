precision mediump float;
uniform sampler2D backbuffer;
uniform sampler2D lolTex;
#include "tools.glsl"

#include "Visuals/DnBTunnel.glsl"
#include "Visuals/Mackjampsy.glsl"
#include "Visuals/Mackjamtunnel.glsl"

#include "Visuals/DnbCorridor.glsl"

#include "Visuals/DarkRoom.glsl"
#include "Visuals/Mackjam.glsl"
#include "Visuals/TunnelTargets.glsl"
#include "Visuals/TunnelDnB.glsl"
#include "Visuals/TunnelBars.glsl"
#include "Visuals/BubblesTunnel.glsl"

vec3 rdrcomposite(vec2 uv)
{
  mtime = time*(MIDI_KNOB(2)*15.+1.);
  uv += (vec2(hash11(FFT(0.1)), hash11(FFT(0.2)))-.5)*MIDI_KNOB(0)*.1;
  vec3 col = vec3(0.);

  //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
  if (MIDI_FADER(0) > 0.01)
    col += MIDI_FADER(0)*rdrdnbtunnel(uv).zxy*2.;

  if (MIDI_FADER(1) > 0.01)
    col += MIDI_FADER(1)*rdrdnbcorridor(uv)*2.;

    if (MIDI_FADER(2) > 0.01)
      ;//col += MIDI_FADER(2)*rdrDarkRoom(uv)*3.;

      if (MIDI_FADER(3) > 0.01)
        col += MIDI_FADER(3)*rdrmackjampsy(uv)*2.;
        if (MIDI_FADER(4) > 0.01)
          col += MIDI_FADER(4)*rdrtunnelbars(uv)*2.;
          if (MIDI_FADER(5) > 0.01)
            col += MIDI_FADER(5)*rdrtunneldnb(uv)*2.;

            if (MIDI_FADER(6) > 0.01)
              col += MIDI_FADER(6)*rdrtunneltargets(uv)*2.;
              if (MIDI_FADER(7) > 0.01)
                col += MIDI_FADER(7)*rdrbubblestunnel(uv)*2.;
  float flicker = 1./16.;
  col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv)))*2., FFT(0.1)*MIDI_KNOB(1)*mod(time, flicker)/flicker);
  col = mix(col, col+vec3(1.,.2,.5).zxy*(1.-sat(length(uv)))*2., MIDI_BTN_S(0)*mod(time, flicker)/flicker);
  col = mix(col, col.zxy, MIDI_BTN_M(0)*mod(time, flicker)/flicker);
  col = mix(col, 1.-col.zxy, MIDI_BTN_R(0)*mod(time, flicker)/flicker);
col =mix(col, col.xxx, sat(MIDI_KNOB(7)*2.));
return col;
}

void main() {
//  time = time*MIDI_KNOB(2);
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    uv *= 1.+MIDI_KNOB(3)*4.;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;
    vec2 uv2 = uv*r2d(mtime);
    uv2 = abs(uv2)+vec2(MIDI_KNOB(4), 0);
    uv = mix(uv, uv2, sat(MIDI_KNOB(5)*2.));
    //uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    float stp = .02;
    //vec2 off = vec2(.02)*hash11(floor(uv.y/stp+FFT(0.1)*2.)*stp)*pow(FFT(0.5),.5)*15.*MIDI_KNOB(1);
    vec3 col = vec3(0.);
    col = rdrcomposite(uv);
    col = mix(col, col.zxy, MIDI_KNOB(6));
/*    if (length(off) < 0.01)
    {
    }
    else
    {
      col.x = rdrcomposite(uv+off).x;
      col.y = rdrcomposite(uv).y;
      col.z = rdrcomposite(uv-off).z;
    }*/
    col += textureRepeat(lolTex, uv-.5).xyz*MIDI_FADER(2)*2.;
    gl_FragColor = vec4(col, 1.0);
}
