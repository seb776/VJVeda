precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
uniform sampler2D pixelDance;
uniform sampler2D circuitTex;

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
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}
// Thanks IQ <3
float smin( float d1, float d2, float k ) {
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h); }

    vec3 peye;
vec2 map(vec3 p)
{
  float pix = .01;
  p = floor(p/pix)*pix;
  p.xy *= r2d(p.z*.02);
  p.z += time*7.;
    vec3 rep = vec3(16.);
    vec3 id = floor((p+rep*.5)/rep);
    p = mod(p+rep*.5,rep)-rep*.5;
    vec2 acc = vec2(10000., -1.);
    p.xz *= r2d(sin(time*2.)*.2+(MIDI_FADER(0)-.5)*2.);
    p.yz *= r2d(sin(time*.4)*.2+(MIDI_FADER(1)-.5)*2.);
    vec3 ps = p;
    peye = ps;
    float an = atan(p.y, p.x);
    float eye = length(peye.xy)-.5;
    float rad = 1.+FFT(abs(an*.06))*(1.-sat(eye));
    rad = mix(rad, -1., sin(length(id)+time*.5)*.5+.5);
    float sph = length(ps)-rad;
    acc = _min(acc, vec2(sph, 0.));
    float c = _cucube(ps, vec3(7.), vec3(.1));
    c = max(c, sin(length(id)+time));
    acc = _min(acc, vec2(c, 0.));

    return acc;
}


vec3 accCol;
vec3 trace(vec3 ro, vec3 rd)
{
    accCol = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 128; ++i)
    {
        vec2 res = map(p);
        if (res.x > 20.)
          break;
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        p+= rd*res.x*.5;
        accCol += (vec3(sin(p))*.5+.5)*(1.-sat(res.x/.5))*.1;
    }
    return vec3(-1.);
}

vec3 getNorm(vec3 p, float d)
{
  vec2 e = vec2(0.01, 0.);
  return  normalize(vec3(d) - vec3(map(p-e.xyy).x, map(p-e.yxy).x, map(p-e.yyx).x));
}

vec3 getMat(vec3 p, vec3 n, vec3 rd, vec3 res)
{
  vec3 col = (n *.5+.5)*sat(length(p)-.7)*5.;
  vec3 ldir = normalize(vec3(1.));
  if (res.z == 0.)
  {
    col =col*.5;
    float ir = length(peye.xy)-.5;
    vec3 white = vec3(1.,1.,.8)*sat(dot(ldir, n));
    col = mix(vec3(1.,.9,.8)*.2+white, col.zxy, 1.-sat(ir*500.));
    float ir2 = length(peye.xy)-.2;
    col = mix(col, vec3(0.), 1.-sat(ir2*500.));
    //col += textureRepeat(pixelDance, peye.xy-.5).xyz;
  }
  return col;
}

vec3 rdr(vec2 uv)
{
    vec3 ro = vec3(2., 0., -5.);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd = normalize(ta-ro);
    rd = getCam(rd, uv);
    vec3 col = vec3(0.);
    vec3 res = trace(ro, rd);
    if (res.y > 0.)
    {
        vec3 p = ro + rd*res.y;
        vec3 n = getNorm(p, res.x);
        col = getMat(p, n, rd, res);
    }
    col += accCol*FFT(0.1)*mix(0.,7., MIDI_KNOB(0));
    return col;
}
void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    uv *= 1.-2.*sat(length(uv));
    vec2 buv = uv;
    vec2 buv2 = uv;
    float pix = .001;
    uv = floor(uv/pix)*pix;
    uv = abs(uv*2.);
    uv *= r2d(time*.2);
   vec3 col = rdr(uv);
   col = mix(col, col.zxy*4., textureRepeat(circuitTex, uv*.5).x);
   float rep = .4;
   buv = buv+vec2(sin(time), 0.)*.3;
   buv.x = mod(buv.x+rep*.5, rep)-rep*.5;
   //col -= 2.*textureRepeat(pixelDance, buv-.5).zxy;
   col +=.99*vec3(sin(uv), .5)*FFT(fract(abs(buv2.x)+abs(buv2.y)-time)*.2);
   col = sat(col);
    gl_FragColor = vec4(col*1.5, 1.0);
}
