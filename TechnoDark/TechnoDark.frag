precision mediump float;

#include "../tools.glsl"

#include "DarkRoom.glsl"

void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;

    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    col += rdrDarkRoom(uv);
    gl_FragColor = vec4(col, 1.0);
}
