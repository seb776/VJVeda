#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;

float mtime; // modulated time

#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) sat(texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x*10.)
#define MIDI_BTN_M(a) sat(texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x*10.)
#define MIDI_BTN_R(a) sat(texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x*10.)

#define FFTlow (FFT(0.1) * MIDI_KNOB(0))
#define FFTmid (FFT(0.5) * MIDI_KNOB(1))
#define FFThigh (FFT(0.7) * MIDI_KNOB(2))
#define PI 3.14159265
#define TAU (PI*2.0)
float hash11(float seed)
{
    return fract(sin(seed*123.456)*123.456);
}

float _cube(vec3 p, vec3 s)
{
  vec3 l = abs(p)-s;
  return max(l.x, max(l.y, l.z));
}
float _cucube(vec3 p, vec3 s, vec3 th)
{
    vec3 l = abs(p)-s;
    float cube = max(max(l.x, l.y), l.z);
    l = abs(l)-th;
    float x = max(l.y, l.z);
    float y = max(l.x, l.z);
    float z = max(l.x, l.y);

    return max(min(min(x, y), z), cube);
}
float _seed;

float rand()
{
    _seed++;
    return hash11(_seed);
}

mat2 r2d(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec3 getCam(vec3 rd, vec2 uv)
{
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+r*uv.x+u*uv.y);
}

float lenny(vec2 v)
{
    return abs(v.x)+abs(v.y);
}
float _sqr(vec2 p, vec2 s)
{
    vec2 l = abs(p)-s;
    return max(l.x, l.y);
}
float _cir(vec2 uv, float sz)
{
  return length(uv)-sz;
}

float _loz(vec2 uv,float sz)
{
  return lenny(uv)-sz;
}
vec2 _min(vec2 a, vec2 b)
{
    if (a.x < b.x)
        return a;
    return b;
}
vec2 _max(vec2 a, vec2 b)
{
  if (a.x > b.x)
      return a;
  return b;
}

// To replace missing behavior in veda
vec4 textureRepeat(sampler2D sampler, vec2 uv)
{
  return texture2D(sampler, mod(uv, vec2(1.)));
}

#endif // !TOOLS_INCLUDE



#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;

float mtime; // modulated time

#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) sat(texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x*10.)
#define MIDI_BTN_M(a) sat(texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x*10.)
#define MIDI_BTN_R(a) sat(texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x*10.)

#define FFTlow (FFT(0.1) * MIDI_KNOB(0))
#define FFTmid (FFT(0.5) * MIDI_KNOB(1))
#define FFThigh (FFT(0.7) * MIDI_KNOB(2))
#define PI 3.14159265
#define TAU (PI*2.0)
float hash11(float seed)
{
    return fract(sin(seed*123.456)*123.456);
}

float _cube(vec3 p, vec3 s)
{
  vec3 l = abs(p)-s;
  return max(l.x, max(l.y, l.z));
}
float _cucube(vec3 p, vec3 s, vec3 th)
{
    vec3 l = abs(p)-s;
    float cube = max(max(l.x, l.y), l.z);
    l = abs(l)-th;
    float x = max(l.y, l.z);
    float y = max(l.x, l.z);
    float z = max(l.x, l.y);

    return max(min(min(x, y), z), cube);
}
float _seed;

float rand()
{
    _seed++;
    return hash11(_seed);
}

mat2 r2d(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec3 getCam(vec3 rd, vec2 uv)
{
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+r*uv.x+u*uv.y);
}

float lenny(vec2 v)
{
    return abs(v.x)+abs(v.y);
}
float _sqr(vec2 p, vec2 s)
{
    vec2 l = abs(p)-s;
    return max(l.x, l.y);
}
float _cir(vec2 uv, float sz)
{
  return length(uv)-sz;
}

float _loz(vec2 uv,float sz)
{
  return lenny(uv)-sz;
}
vec2 _min(vec2 a, vec2 b)
{
    if (a.x < b.x)
        return a;
    return b;
}
vec2 _max(vec2 a, vec2 b)
{
  if (a.x > b.x)
      return a;
  return b;
}

// To replace missing behavior in veda
vec4 textureRepeat(sampler2D sampler, vec2 uv)
{
  return texture2D(sampler, mod(uv, vec2(1.)));
}

#endif // !TOOLS_INCLUDE



float _trijunoposition(vec2 p, float r)
{
    float a = atan(p.y, p.x);
    /*
    //p = vec2(length(
    float s = 3.;
    float stp = float(int((a)/s))*s;
    vec2 uv = p*r2d(stp);*/
    float s = 3.;
    float as = PI*2.0/s;

    float ra = mod(a+.5*as, as)-.5*as;

    vec2 uv = length(p)*vec2(sin(ra),cos(ra));

    return uv.y-r;
}

vec3 rdrjunoposition2(vec2 uv)
{
    vec3 col = mix(vec3(.1), vec3(0.690,0.188,0.439), 1.-sat(length(uv*2.)));

    for (int i = 0; i < 20;/*int(FFT(time*.1)*10.)+20;*/ ++i)
    {
        float fi = 10.-float(i);

        float sz = .3*pow(FFT(fi*.1),.5)+(sin(fi+time)*.2+1.)/(fi+1.);
        float th = 0.1*fi/(fi+1.);
        float t = abs(_trijunoposition(uv*r2d(fi*.1+time*(fi+1.)*.05), sz))-th;
        vec3 rgb = vec3(0.);
        if (mod(float(i), 2.) < 0.1)
            rgb = vec3(0.969,0.212,0.478)*4.;
        if (mod(fi, 3.) < 0.1)
            rgb = rgb.zyx;
        col = mix(col, rgb, (1.-sat(t*400.)));
    }


    return col;
}

vec3 rdrjunoposition(vec2 uv)
{
  uv *= 2.;
  vec3 col = rdrjunoposition2(uv*2.*(sin(time*.5)+1.5))*.5;

  float stp = 0.01;
  uv = floor(uv/stp)*stp;
  col += rdrjunoposition2(uv*2.*(sin(time*.2)+1.5)).zxy*.5;
  return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-vec2(.5)*iResolution.xy)/iResolution.xx;
    uv *= 2.;
    vec3 col = rdrjunoposition(uv*2.*(sin(time*.5)+1.5))*.5;

    float stp = 0.01;
    uv = floor(uv/stp)*stp;
    col += rdr(uv*2.*(sin(time*.2)+1.5)).zxy*.5;

    fragColor = vec4(col/2.,1.0);
}*/



vec3 getCam2(vec3 rd, vec2 uv)
{
  float fov = 3.;//12.*sin(time*.1);
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec2 map(vec3 p)
{
  vec2 acc = vec2(10000., -1.);

  vec3 repnew = vec3(14.);
  vec3 pnew = p;
  pnew.xy *= r2d(time*.5+pnew.z*.01);
  vec3 limnew = vec3(4.5)*repnew;
  pnew = clamp(pnew, -limnew, limnew);
  vec3 idnew = floor((pnew+repnew*.5)/repnew);
  pnew = mod(pnew+repnew*.5, repnew)-repnew*.5;
  float sznew = FFT(idnew.z*.005)*3.;
  float shapenew = _cube(pnew, vec3(sznew+.5));// length(pnew)-.5-sznew;
  acc = _min(acc, vec2(shapenew, 0.));


  acc = _min(acc, vec2(-p.y, 1.));
  return acc;

  p.z += time*12.;
      vec3 p3 = p;
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
            if (res.y == 0.)
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
  float d = 40.;
  float t =   mtime;
    vec3 ro = vec3(sin(t)*d, -4., cos(t)*d);
    vec3 ta = vec3(0.,-1.,0.);
    vec3 rd = normalize(ta-ro);
    rd = getCam2(rd, uv);
    vec3 col = vec3(0.);

    vec3 res = trace(ro, rd);
    vec3 acc0 = accCol;
    if (res.y > 0.)
    {
        vec3 p = ro + rd*res.y;
        vec3 n = getNorm(p, res.x);
        //col = n *.5+.5;
        col = sat(dot(n, normalize(vec3(sin(time), 0., cos(time)))))*vec3(.1,.2,.8);
        vec3 refl = normalize(reflect(rd, n) + (vec3(rand(),rand(),rand())-.5)*.1);
        vec3 resrefl = trace(p+n*.01, refl);
        col += accCol;
    }
  col += acc0;
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

vec3 rdrChroma(vec2 uv, float stepp)
{
  vec3 col = vec3(0.);
  vec2 stp = vec2(stepp);
  uv = floor(uv/stp)*stp;
  vec2 off = vec2(.4)*.05*sin(uv.y*5.+time*2.);
  col += rdr(uv+off).x*vec3(.5,.1,.7);
  col += rdr(uv).y*vec3(.2,.8, .2);
  col += rdr(uv-off)*vec3(.7,.2,.8);
  return col;
}

void main() {
  mtime = time * MIDI_KNOB(0);
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    vec2 off = FFT(.5)*vec2(.02,0.);
    vec3 col = vec3(0.);
  //  col.x = rdr2(uv+off).x;
  //  col.y = rdr2(uv).y;
  //  col.z = rdr2(uv-off).x;
    col *= MIDI_KNOB(2);
//col += .1*rdrjunoposition(uv)*.35;
col += 1.*rdrChroma(uv, .02)*.25;
col += 1.*rdrChroma(uv, .003);
//textureRepeat(backbuffer, uv).xyz;
    gl_FragColor = vec4(col, 1.0);
}

