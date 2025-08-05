precision highp float;
uniform sampler2D backbuffer;
uniform sampler2D cookieTex;
uniform sampler2D aastalTex;
uniform sampler2D z0rgTex;
uniform sampler2D pixelDance;
uniform sampler2D aliG;
uniform sampler2D catEnergy;
uniform sampler2D circuitTex;
uniform sampler2D aerobic;


uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;

float mtime; // modulated time

#define FFTI(a) time
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define sat(a) clamp(a, 0., 1.)

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
  float fov = 2.;
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+(r*uv.x+u*uv.y)*fov);
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

// ================================================================= Here's the actual shader code =D

float map(vec3 p)
{
  //p.xy *= r2d(time*.12);
  //p.xy = abs(p.xy);
  vec3 op = p;

float gnd = -p.y+11.1-textureRepeat(circuitTex, p.xz*.3).x;

  vec3 rep = vec3(25.);
  p = mod(p+rep*.5,rep)-rep*.5;
vec3 pc2 = p;
pc2.xy *= r2d(time);
pc2.xz *= r2d(time);
  float c = _cucube(pc2, vec3(1.+FFT(.1)*3.), vec3(0.02+.5*FFT(.1)));
  c = mix(c,length(p)-1., -.3);
  vec3 pc = p+vec3(sin(time)*3., 0.,0.);
  pc.xy *= r2d(-time);
  pc.xz *= r2d(time);

  float c2 = _cucube(pc, vec3(2.), vec3(.01));
float shape = smin(c2, c, .5);
//shape = length(p)-4.;
shape -= noise(p*10.+time*20.+FFT(.3)*10.)*.1;

//shape = max(shape, -(length(op)-5.));

//shape = min(shape, gnd);
  return shape;
}

vec3 getNorm(vec3 p) {
  vec2 e = vec2(0.01, 0.);
  return normalize(vec3(map(p)) - vec3(map(p-e.xyy), map(p-e.yxy), map(p-e.yyx)));
}

vec3 rdr(vec2 uv)
{
  vec2 buv = uv;
//  uv *= r2d(length(uv)*MIDI_FADER(3)*30.+time);
  vec3 ro = vec3(0.,10.,-1.);
  vec3 ta = vec3(0.,0.,0.);
  vec3 rd = normalize(ta-ro);
  rd = getCam(rd, uv);
  vec3 p = ro;
  vec2 uva = uv*vec2(1.,1.5)+.5;
  float pix = .01;
  uva = floor(uva/pix)*pix;
  vec3 col = texture2D(catEnergy, uva).xyz*MIDI_FADER(0);
  vec3 acc = vec3(0.);
  float depth = 1000.;
  for (float i = 0.; i < 128.; ++i)
  {
    if (distance(p, ro) > 50.)
      break;
    float d = map(p);
    if (d < 0.01) {
      vec3 n = getNorm(p);
      //col = n*.5+.5;
      vec3 rgb = texture2D(circuitTex, p.xy).xyz*sat(sin(length(p.xz)*5.+time));
      //col += (vec3(sin(p.z))+rgb)*sat(i/64.)*3.;
      depth = distance(p, ro);
      break;
    }
    acc += vec3(1.)*sat(d/.5)*.03;
    p+=rd*d;
  }


col += acc;
col *= 0.;
float rep = .3;
//uv.x += time*.33;
float id = floor((uv.x+rep*.5)/rep);
float sz = mix(4.,.5, hash11(id*.1+.5))*mix(1.,.5, sin(time+id));

uv.x = mod(uv.x+rep*.5,rep)-rep*.5;
if (depth > 3.)
  //col += texture2D(pixelDance, uv*vec2(sign(sin(id*10.)), 1.)*sz+.5).xyz;
  //col += texture2D(pixelDance, buv-vec2(0.,-.5)).xyz;
  //col *= .0;
  //col += texture2D(catEnergy, uva).xyz;

  float sz2 = mix(1.,2., sat(sin(length(uv+.5)+time)));
    //col += vec3(sin(uv+time), .8)*(textureRepeat(circuitTex, (uv*sz2)+.5).xxx)*sat(sin(length(uv)*5.-time*3.)*.1);

  return pow(sat(col.zxy), vec3(2.))*2.;
}
vec3 rdr2(vec2 uv)
{
  vec2 off = vec2(0.1, 0.)*(MIDI_KNOB(0.))*3.*FFT(abs(uv.y));
  vec3 col = vec3(0.);

  col.x = rdr(uv+off).x;
  col.y = rdr(uv).y;
  col.z = rdr(uv-off).z;

  return col;
}

float map2(vec3 p)
{
  float pix = .2;
  p = floor(p/pix)*pix;
  p.xy = abs(p.xy);
  p.xy *= r2d(time);
  p.yz *= r2d(time);
  vec3 rep = vec3(5.);
  p = mod(p+rep*.5,rep)-rep*.5;
  float shape = length(p)-1.;
  shape = mix(shape, _cucube(p, vec3(.7), vec3(.01)), 2.);
  return shape-FFT(noise(p*5.))*2.;
}

vec3 render(vec2 uv, vec2 ouv)
{
  float pix = mix(.004, 0.6, MIDI_KNOB(0));
  uv = floor(uv/pix)*pix;
  vec2 buv5 = uv;
  uv *= 1.+FFT(.2)*MIDI_KNOB(1)*5.;
vec2 buv2 = uv;
vec2 buv3 = uv;
vec2 buv4 = uv*r2d(time*sign(sin(time*.2)));




uv.y -= -.1;

if (false){//sin(time*.2+1.) > 0.) {
uv *= r2d(time*.3);
uv = abs(uv);
uv *= r2d(-time*.1);
}

  vec2 buv = uv;
uv *= 2.;
  _seed = textureRepeat(greyNoise, uv).x;
  //uv += (vec2(rand()+FFT(.1)*3., rand()*0.)-.5)*.25*pow(FFT(0.1), 1.)*1.;
  float t = time*5.*MIDI_KNOB(1);
  uv += vec2(sin(t*5.)+.5*sin(t*3.3), sin(t*2.2)+sin(t*4.7))*.01*MIDI_FADER(1.);
  vec3 col = rdr2(uv);

float beat = 1./8.;
col += vec3(.9,.2,.6)*sat(mod(time, beat)/beat)*MIDI_BTN_S(0.)*2.;

float beat2 = 1./6.;
col = mix(col, col.zxy, sat(mod(time, beat2)/beat2)*MIDI_BTN_M(0.));

float beat3 = 1./6.;
col = mix(col, 1.-col.zxy, sat(mod(time, beat3)/beat3)*MIDI_BTN_R(0.));

col += sat(lenny(uv))*FFT(0.)*vec3(1., .2,.5)*.1*FFT(abs(uv.x*.2))*.5;
float sz = mix(1.,2., sat(sin(length(uv+.5)+time)));
//col += vec3(sin(uv+time), .8)*(textureRepeat(circuitTex, (uv*sz)+.5).xxx)*sat(sin(length(uv)*5.-time*3.)*.1);
col *= .8;
  col += texture2D(aliG, buv+.5).xyz;
col *= FFT(abs(uv.x)*.5)+.5;;
col = sat(col);
col *= .7;
//col *= .8+texture2D(circuitTex,buv*r2d(time*.1)+.5).xyz;
col += vec3(sin(uv), .5)*FFT(abs(uv.x)+abs(uv.y));
col *= .5+ sat(sin(length(uv)*2.-time*3.));
col = mix(col, sat(texture2D(backbuffer, (ouv-.5)*.95*r2d(MIDI_FADER(2)-.5)+.5).xyz), MIDI_KNOB(2));
//col = col.xxx;

float line = sin(length(uv)*10.+time);
if (sin(time*.1) > 0.)
col = mix(col, col.xxx, 1.-sat(line*500.));

uv = buv3;
float an = atan(uv.y, uv.x);
//uv = vec2(an*.2, length(uv)*.3);
uv.x += time+FFT(.1);
float rep = .2;
float id = floor((uv.x+rep*.5)/rep);
uv.x = mod(uv.x+rep*.5,rep)-rep*.5;
uv.x += sin(uv.y*10.+time)*.05;
uv.y += sin(id*10.+time)*.1;
float l = abs(uv.x-sin(uv.y*30.+time)*.05*sat(-uv.y))-.01;
l = max(l, uv.y);
float h = length(uv)-.02;
l = smin(l, h, .1);
vec3 rgb = vec3(0.);
uv.x = abs(uv.x)-.02;
uv.y = abs(uv.y)+.005+.005*sin(time*5.+id*10.);
float e = length(uv)-.01;
rgb = mix(rgb, vec3(1.,0.,0.), 1.-sat(e*500.));
col = mix(col, rgb, 1.-sat(l*500.));
col += vec3(1., 0., 0.)*(1.-sat(e*50.))*.1;
buv4 = abs(buv4+vec2(sin(buv4.y), 0.))-.2;
buv4 = abs(buv4);
buv4 *= r2d(-time);

vec2 uvt = buv4+vec2(time*.5, 0.);
float rept = .1;
uvt.x = mod(uvt.x+rept*.5,rept)-rept*.5;
float train = _sqr(uvt, vec2(.02, .1));
uvt.y = abs(uvt.y)-.07;
train = min(train, abs(uvt.y)-.01);
col = mix(col, col.zxy, 1.-sat(train*50.));

vec3 ro = vec3(0., 0., -5.);
vec3 rd = normalize(vec3(buv5, 1.));
//col *= .2;
vec3 p = ro;
for(float i = 0.; i < 128.; i++)
{
float d= map2(p);
if (d < 0.01)
{
  col += .1*vec3(abs(sin(p)))*(1.-sat(distance(p, ro)/15.))*5.;

  break;
}
p+=rd*d;
}
return col;
}

vec3 render2(vec2 uv, vec2 ouv)
{
  vec3 col = vec3(0.);
  vec2 off = vec2(0.01, 0.)*FFT(uv.y)*.5;
  col.x = render(uv+off, ouv).x;
  col.y = render(uv, ouv).y;
  col.z = render(uv-off, ouv).z;

  return col;
}

void main() {
  vec2 ouv = gl_FragCoord.xy/resolution.xy;
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    vec3 col = render2(uv, ouv);
    col = mix(col, textureRepeat(aerobic, (uv-.5)*2.).xyz, MIDI_KNOB(2));
    col *= .5+MIDI_KNOB(3)*textureRepeat(circuitTex, uv).xxx;

    float an = atan(uv.y, uv.x);
    float c = abs(length(uv)-.52 -.1*FFT(an*10.))-.1;
    col = mix(col, col.zxy, 1.-sat(c*500.));

    gl_FragColor = vec4(col*2., 1.0);
}
