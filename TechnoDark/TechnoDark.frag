precision mediump float;

#include "../tools.glsl"

#include "DarkRoom.glsl"
#include "Mackjam.glsl"
#include "TheTunnel.glsl"
#include "TunnelDnB.glsl"
#include "TunnelBars.glsl"

void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    col += MIDI_FADER(0)*rdrDarkRoom(uv)*2.;
    col += MIDI_FADER(1)*rdrmack(uv)*2.;
    col += MIDI_FADER(2)*rdrtunnel(uv)*2.;
    col += MIDI_FADER(3)*rdrtunneldnb(uv)*2.;
    col += MIDI_FADER(4)*rdrtunnelbars(uv)*2.;
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);


    gl_FragColor = vec4(col, 1.0);
}
