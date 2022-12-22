precision mediump float;

#include "tools.glsl"

#include "Visuals/BubblesTunnel.glsl"
#include "Visuals/DnbTriangle.glsl"
#include "Visuals/FirstDnbVisual.glsl"
#include "Visuals/JunoPosition.glsl"
#include "Visuals/LostStructures.glsl"
vec2 mapover(vec3 p)
{
  vec2 acc = vec2(10000., -1.);

  p.z += time*10.;
  vec3 rep = vec3(10.);
  p = mod(p+rep*.5,rep)-rep*.5;
  acc = _min(acc, vec2(length(p)-1., 0.));
  return acc;
}

vec3 getNormOver(vec3 p, float d)
{
  vec2 e = vec2(0.01,0.);
  return normalize(vec3(d)-vec3(mapover(p-e.xyy).x, mapover(p-e.yxy).x, mapover(p-e.yyx).x));
}



vec3 traceover(vec3 ro, vec3 rd)
{
  vec3 p = ro;

  for (int i = 0; i < 128; ++i)
  {
    vec2 res = mapover(p);
    if (res.x < 0.01)
      return vec3(res.x, distance(p, ro), res.y);
    p+=rd*res.x;
  }

  return vec3(-1.);;
}

vec3 rdrover(vec2 uv)
{
    vec3 col = vec3(0.);
    uv.x += .05*sin(uv.y*8.+time*.5);
    uv.y -= time*.3;
vec2 rep = vec2(.1);
vec2 id = floor((uv+rep*.5)/rep);
uv = mod(uv+rep*.5,rep)-rep*.5;
float sz = sin(id.x+id.y*100.+length(id)+time);
  float bubbles = abs(length(uv)-.02*sz)-.002;

col = mix(col, vec3(.1,.4,.8), 1.-sat(bubbles*400.));

  return col*.5;
}

vec3 rdrover2(vec2 uv)
{
  vec3 col = vec3(0.);
  for (float i = 0. ; i < 4.; ++i)
  {
    col += rdrover(uv*(2.+i/4.));
  }


  return col;
}

vec3 rdrover3(vec2 uv)
{
  vec3 col = vec3(0.);
  vec3 ro = vec3(2.,0.,-5.);
  vec3 ta = vec3(0.);
  vec3 rd = normalize(ta-ro);
  rd = getCam(rd, uv);

  vec3 res = traceover(ro, rd);
  if (res.y > 0.)
  {
    vec3 p = ro+rd*res.y;
    vec3 n = getNormOver(p, res.x);
    col = vec3(.2,.5,.7)*sat(dot(normalize(vec3(sin(time), cos(time),cos(time))),n));
  }
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
  col += rdrover3(uv);
    float flicker = 1./4.;

    col += rdrover2(ouv);

    col = mix(col, col+vec3(1.,.2,.5).xxx*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);

//col *= FFT(.1)*10.;

  float shape = sin(lenny(uv)*10.+time*10.);
  vec3 wavecol = mix(col, col.zxy*1.8, 1.-sat(shape*1.));
col = mix(col, wavecol, MIDI_FADER(5));
  col = mix(col, col.yyy, MIDI_FADER(6));
  col = pow(col, vec3(MIDI_FADER(7)*5.+1.));

  vec2 uv2 = ouv;
  uv2.x

    gl_FragColor = vec4(col*2., 1.0);
}
