#include "tools.glsl"

#include "Visuals/JunoPosition.glsl"

vec3 getCam2(vec3 rd, vec2 uv)
{
  float fov = 1.;//12.*sin(time*.1);
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec2 map(vec3 p)
{
      vec3 p3 = p;
    vec2 acc = vec2(10000., -1.);
    p.xy += vec2(sin(p.z*1.+mtime), cos(p.z*1.));
    vec3 rep = vec3(30., 30., 100.);
    vec3 p2 = p+vec3(0.,0.,mtime*15.);
    //p2.xy *= r2d(sin(p2.z*.25+mtime)*.5);
    vec3 id = floor((p2+rep*.5)/rep);
    p2 = mod(p2+rep*.5,rep)-rep*.5;
    p2.yz *= r2d(mtime);
    float shape = length(p2)-.1-FFT(mod(id.z*.3, 1.))*.8;
    //p2.xy *= r2d(p.z);
    shape = _cucube(p2, vec3(0.,0.,40.)+vec3(2.5)*(sin(id.z+time)*.5+.5)+vec3(1.)*FFT(mod(id.z*.3, 1.))*1.8*sin(id.z), vec3(.1));
    acc = _min(acc, vec2(shape, 0.));


    float shape2 = length(p)-1.-FFT(abs(atan(p3.z, p3.x)*.01));

    acc= _min(acc, vec2(shape2, 1.));
    return acc;
}


vec3 accCol;
vec3 trace(vec3 ro, vec3 rd)
{
    accCol = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 32; ++i)
    {
        vec2 res = map(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
            accCol += vec3(sin(p.z)*.5+.5, .5, cos(p.y)*.3+.7).zxy*(1.-sat(res.x/0.85))*.1*(.5+FFT(p.z));
        p+= rd*res.x;
    }
    return vec3(-1.);
}

vec3 getNorm(vec3 p, float d)
{
  vec2 e = vec2(0.01, 0.);
  return  normalize(vec3(d) - vec3(map(p-e.xyy).x, map(p-e.yxy).x, map(p-e.yyx).x));
}

vec3 rdr(vec2 uv)
{
  float d = 10.;
  float t = mtime;
    vec3 ro = vec3(sin(t)*d, 2., cos(t)*d);
    vec3 ta = vec3(0.,-1.,0.);
    vec3 rd = normalize(ta-ro);
    rd = getCam2(rd, uv);
    vec3 col = vec3(0.);

    vec3 res = trace(ro, rd);
    if (res.y > 0.)
    {
        vec3 p = ro + rd*res.y;
        vec3 n = getNorm(p, res.x);
        //col = n *.5+.5;
    }
  col += accCol;
    return col;
}

vec3 rdr2(vec2 uv)
{
  float stp = .02;//mix(0.002, .001, 1.-sat(length(uv)));
  uv = floor(uv/stp)*stp;
//  uv += MIDI_KNOB(1)*(FFT(0.1)-.5)*.1;
uv = abs(uv);
  float t = time*.125;
//  uv += vec2(sin(t), cos(t))*.5;
 vec3 col = rdr(uv);
 float beat = 1./4.;
 col +=2.* vec3(.4,.2, .9)*(1.-sat(lenny(uv))) * (mod(time, beat)/beat);

 float beat2 = 1./16.;
 col = mix(col, col.zxy, (mod(time, beat2)/beat2)*MIDI_BTN_S(0));

 float donut = abs(length(uv)-mod(time*2., 2.))-.1;
 col += col *(1.-sat(donut*1.))*2.;

 return col;
}

void main() {
  mtime = time * MIDI_KNOB(0);
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    vec3 col = vec3(0.);
    vec2 off = FFT(.5)*vec2(.02,0.);
    col.x = rdr2(uv+off).x;
    col.y = rdr2(uv).y;
    col.z = rdr2(uv-off).x;
    col *= MIDI_KNOB(2);
col += rdrjunoposition(uv)*.15;
col += rdr(uv);
//col = vec3(0.);
    gl_FragColor = vec4(col, 1.0);
}
