precision mediump float;
uniform sampler2D backbuffer;

#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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



float _time;



vec2 trails(vec3 p, float speed, float count, float dist, float mat)
{
        vec3 pt = p;//-vec3(0.,-.1,0.);
    float lrepa = TAU/count;

    float atrail = atan(pt.y, pt.x);
    float idxtrail = floor((atrail+lrepa*.5)/lrepa);
    float antrail = mod(atrail+lrepa*.5,lrepa)-lrepa*.5;
    pt = vec3(vec2(sin(antrail), cos(antrail))*length(pt.xy), pt.z);
    pt-=vec3(0.,dist,0.);
    float ttrail = _time*speed+idxtrail;
    float trails = max(length(pt.xy)-.00002*(1.-sat((p.z*2.+8.)/2.5)), sin(pt.z*.1+ttrail));
    return vec2(trails, mat);
}

vec2 mapdnbtunnel(vec3 p)
{
    vec2 acc = vec2(10000., -1.);

    float cylrep = 2.;
    vec3 pc = p;
    pc.z += _time;
    pc.x = abs(pc.x);
    pc.y = abs(pc.y);

    pc.z = mod(pc.z+cylrep*.5,cylrep)-cylrep*.5;
    pc -= vec3(1.5,0.7,0.);
    pc.xy *= r2d(-.7);
    float cappedCyl = max(length(pc.xz)-.001, abs(pc.y)-.35);

    acc =_min(acc, vec2(cappedCyl,0.));


    acc = _min(acc, trails(p, 2.,15.,0.9, 1.));
    acc = _min(acc, trails(p, 15.,3.,1.9, 1.));
    acc = _min(acc, trails(p, 20.,23.,5.9, 1.));

    //float
    vec3 pp = p+vec3(0.,0.,_time*40.);
    float prep = 37.;
    float idp = floor((pp.z+prep*.5)/prep);
    pp.z = mod(pp.z+prep*.5,prep)-prep*.5;
    pp.xy *= r2d(idp*PI*.25);
    vec2 lpatt = abs(pp.xy)-vec2(8.+2.*sin(idp));
    lpatt = abs(lpatt)-2.5*sin(_time+idp);

        //lpatt *= r2d(idp+iTime*.25);
    float patt = max(abs(min(lpatt.x, lpatt.y))-.01, abs(pp.z)-.01);
    if (p.z < 350.)
    acc = _min(acc, vec2(patt, 0.));

    return acc;
}

vec3 getCamdnbtunnel(vec3 rd, vec2 uv)
{
    float fov = 1.;
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec3 getNormdnbtunnel(vec3 p, float d)
{
    vec2 e = vec2(0.01,0.);
    return normalize(vec3(d)-vec3(mapdnbtunnel(p-e.xyy).x, mapdnbtunnel(p-e.yxy).x, mapdnbtunnel(p-e.yyx).x));
}
vec3 accCol0;
vec3 accCol1;
vec3 tracednbtunnel(vec3 ro, vec3 rd, int steps)
{
    accCol0 = vec3(0.);
    accCol1 = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 128; ++i)
    {
        vec2 res = mapdnbtunnel(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        if (res.y == 0.)
            accCol0 += vec3(sin(p.z)*.5+.5, .2, cos(p.z*3.+p.y*5.+_time*7.)*.2+.5)*(1.-sat(res.x/.3))*.2;
        if (res.y == 1.)
            accCol1 +=  vec3(0.200,0.643,0.980)*(1.-sat(res.x/.05))*.1;
            if (distance(p, ro) > 60.)
            break;
        p+= rd*res.x*.9;
    }
    return vec3(-1.);
}

vec3 rdrdnbtunnel(vec2 uv)
{
      _time = time+textureRepeat(greyNoise, uv).x*.5*(1.-sat(length(uv*3.)));
    vec3 col = mix(vec3(1.000,0.439,0.302)*2.2, vec3(0.075,0.027,0.110), sat(length(uv*2.5)));

    vec3 ro = vec3(0., 0.,-5.);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd= normalize(ta-ro);

    rd = getCam(rd, uv);
    vec3 rd2 = rd;

    col += vec3(1.)*pow(textureRepeat(greyNoise, vec2(atan(rd.z, rd.x), acos(rd.y))*5.).x, 15.);

    vec3 res = tracednbtunnel(ro, rd, 256);
    if (res.y > 0.)
    {
        vec3 p = ro+rd*res.y;
        vec3 n = getNormdnbtunnel(p, res.x);
        col = n*.5+.5;
        col = vec3(1.);
    }
    col += accCol0;
    col+= accCol1;

    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-vec2(.5)*iResolution.xy)/iResolution.xx;
    _time = iTime+texture(iChannel0, fragCoord/8.).x*.5*(1.-sat(length(uv*3.)));
    vec3 col = rdr(uv);
    col *= pow(1.-sat(lenny(uv)-.35), 4.);
    col = pow(col, vec3(mix(.85,1., abs(uv.y*5.))));
    fragColor = vec4(col,1.0);
}*/


#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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



vec2 mapmackjampsy(vec3 p)
{
  vec3 op = p;
  vec2 acc = vec2(10000.,-1.);

  acc = _min(acc, vec2(length(p+vec3(0.,0.,-15.))-1., 0.));

  p.xz *= r2d(.5*sin(.1*p.y));
  p.xz += vec2(sin(time), cos(time*75.1+p.y*.1))*1.;
  float rad = 20.;
  vec3 pdart = p+vec3(0.,FFTI(.05)*20.+time*85.,0.);
  float adart = atan(pdart.z, pdart.x);
  float stpdart = PI*2./20.;
  float sector = mod(adart+stpdart*.5,stpdart)-stpdart*.5;
  pdart.xz = vec2(sin(sector), cos(sector))*length(pdart.xz);
  float repyd = 15.;
  float idda = floor((pdart.y+repyd*.5)/repyd);
//  pdart.xz *= r2d(idda);
  float rada = mix(10.,20.,sin(idda)*.5+.5);
  pdart -= vec3(0.,45.,rada);
  pdart.y = mod(pdart.y+repyd*.5,repyd)-repyd*.5;
  float dart = _cube(pdart, vec2(.1,5.).xxy);
  acc = _min(acc, vec2(length(pdart-vec3(0.,0.,-5.))-0.25,-1.));

  acc = _min(acc, vec2(dart, 0.));

  vec3 pcube = p;
  float stpcube = PI*2./40.;
  float sectorcube = mod(adart+stpcube*.5,stpcube)-stpcube*.5;
  pcube.xz = vec2(sin(sectorcube), cos(sectorcube))*length(pcube.xz);
  float repyc = .5;
  float radb = mix(10.,20.,sin(repyc)*.5+.5);
  pcube -= vec3(0.,0.,radb);

  pcube.y = mod(pcube.y+repyc*.5,repyc)-repyc*.5;
  acc = _min(acc, vec2(_cube(pcube, vec3(.5,.2,2.)), 1.));

  float tunnel = -(length(p.xz)-rad);
  acc = _min(acc, vec2(tunnel, 0.));

  vec3 pcc = op-vec3(0.,55.,0.);
  pcc.xz *= r2d(time);
  pcc.yz *= r2d(.5*time);
  acc = _min(acc, vec2(_cucube(pcc-vec3(0.,15.,0.), vec3(1.), vec3(.01)), -5.));

  return acc;
}

vec3 getNormmackjampsy(vec3 p, float d)
{
  vec2 e = vec2(0.01,0.);
  return normalize(vec3(d)-vec3(mapmackjampsy(p-e.xyy).x,mapmackjampsy(p-e.yxy).x,mapmackjampsy(p-e.yyx).x));
}
vec3 accLightPsy;
vec3 tracemackjampsy(vec3 ro, vec3 rd, int steps)
{
  accLightPsy = vec3(0.);
  vec3 p  = ro;
  for (int i = 0; i < 128; ++i)
  {
    vec2 res = mapmackjampsy(p);
    if (res.x < 0.01)
      return vec3(res.x, distance(p, ro), res.y);
    if (res.y < 0.)
      accLightPsy += (vec3(172, 38, 235)/255.)*0.1+vec3(sin(distance(p, ro)*1.+time)*.5+.5, .5, .1)*(1.-sat(res.x/5.5))*.2;

    p+=rd*res.x*.5;
  }
  return vec3(-1.);
}

vec3 rdrmackjampsy2(vec2 uv)
{
  vec3 background = vec3(212, 140, 32)/255.;
  vec3 col = background;

  vec3 ro = vec3(0.,-5.,-5.);
  vec3 ta = vec3(0.,25.,0.);
  vec3 rd = normalize(ta-ro);

  rd = getCam(rd, uv);

  float depth = 150.;
  vec3 res = tracemackjampsy(ro, rd, 128);
  if (res.y > 0.)
  {
    depth = res.y;
    vec3 p = ro+rd*res.y;
    vec3 n = getNormmackjampsy(p, res.x);
    col = n*.5+.5;

    col = (vec3(23, 24, 51)/255.)*sat(dot(normalize(vec3(n.x, -1., n.z)), n));
  }
  col += accLightPsy;
  col = mix(col, vec3(0.), 1.-sat(exp(-depth*depth*0.0001)));
  return col;
}

vec3 rdrmackjampsy(vec2 uv)
{
  uv *= r2d(-time*.5);
  uv = abs(uv);
  uv -= vec2(.2+uv.y, 0.);
  uv *= r2d(.1*time);
  //uv = abs(uv);
 float stp = .1*length(uv);
  uv = floor(uv/stp)*stp;

  uv -= vec2(.25);
  //uv *= r2d(FFTI(.1)*10.);
 // uv = abs(uv);

  vec3 col = rdrmackjampsy2(uv);

  col *= 1.-sat(length(uv));
  //col = mix(col, vec3(199, 242, 58)/255., 1.-pow(sat(length(col)),8.));
  col = pow(col, vec3(1.45));
  //col *= vec3(199, 242, 58)/255.;
  float beat = 1./8.;
  col += (mod(time, beat)/beat)*sat(FFT(.1)*col)*45.;
  col = mix(col, textureRepeat(greyNoise, uv).xyz, .5);
  col.xy *= r2d(time);
  col = abs(col);
  return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = (fragCoord.xy-.5*iResolution.xy)/iResolution.xx;

  uv *= r2d(-time*.5);
  uv = abs(uv);
  uv -= vec2(.2+uv.y, 0.);
  uv *= r2d(.1*time);
  //uv = abs(uv);
 float stp = .1*length(uv);
  uv = floor(uv/stp)*stp;

  uv -= vec2(.25);
  //uv *= r2d(FFTI(.1)*10.);
 // uv = abs(uv);

  vec3 col = rdr(uv);

  col *= 1.-sat(length(uv));
  //col = mix(col, vec3(199, 242, 58)/255., 1.-pow(sat(length(col)),8.));
  col = pow(col, vec3(1.45));
  //col *= vec3(199, 242, 58)/255.;
  float beat = 1./8.;
  col += (mod(time, beat)/beat)*sat(FFT(.1)*col)*45.;
  col = mix(col, texture(iChannel0, fragCoord.xy/iResolution.xy).xyz, .5);
  col.xy *= r2d(time);
  col = abs(col);
	fragColor = vec4(col, 1.);
}
*/


#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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




vec2 mapmackjamtunnel(vec3 p)
{
  vec3 op = p;
  vec2 acc = vec2(10000.,-1.);

  acc = _min(acc, vec2(length(p+vec3(0.,0.,-15.))-1., 0.));

  p.xz *= r2d(.5*sin(.1*p.y));
  p.xz += vec2(sin(time), cos(time*5.1+p.y*.1))*1.;
  float rad = 20.;
  vec3 pdart = p+vec3(0.,FFTI(.05)*20.+time*85.,0.);
  float adart = atan(pdart.z, pdart.x);
  float stpdart = PI*2./10.;
  float sector = mod(adart+stpdart*.5,stpdart)-stpdart*.5;
  pdart.xz = vec2(sin(sector), cos(sector))*length(pdart.xz);
  float repyd = 15.;
  float idda = floor((pdart.y+repyd*.5)/repyd);
//  pdart.xz *= r2d(idda);
  float rada = mix(10.,40.,sin(idda)*.5+.5);
  pdart -= vec3(0.,45.,rada);
  pdart.y = mod(pdart.y+repyd*.5,repyd)-repyd*.5;
  float dart = _cube(pdart, vec2(.1,5.).xxy);
  acc = _min(acc, vec2(length(pdart-vec3(0.,0.,-5.))-0.25,-1.));

  acc = _min(acc, vec2(dart, 0.));

  vec3 pcube = p;
  float stpcube = PI*2./4.;
  float sectorcube = mod(adart+stpcube*.5,stpcube)-stpcube*.5;
  pcube.xz = vec2(sin(sectorcube), cos(sectorcube))*length(pcube.xz);
  float repyc = .5;
  float radb = mix(10.,20.,sin(repyc)*.5+.5);
  pcube -= vec3(0.,0.,radb);

  pcube.y = mod(pcube.y+repyc*.5,repyc)-repyc*.5;
  acc = _min(acc, vec2(_cube(pcube, vec3(.5,.2,2.)), 1.));

  float tunnel = -(length(p.xz)-rad);
  acc = _min(acc, vec2(tunnel, 0.));

  vec3 pcc = op-vec3(0.,55.,0.);
  pcc.xz *= r2d(time);
  pcc.yz *= r2d(.5*time);
  acc = _min(acc, vec2(_cucube(pcc-vec3(0.,15.,0.), vec3(1.), vec3(.01)), -5.));

  return acc;
}



vec3 getNormmackjamtunnel(vec3 p, float d)
{
  vec2 e = vec2(0.01,0.);
  return normalize(vec3(d)-vec3(mapmackjamtunnel(p-e.xyy).x,mapmackjamtunnel(p-e.yxy).x,mapmackjamtunnel(p-e.yyx).x));
}
vec3 accLightmackjamtunnel;
vec3 tracemackjamtunnel(vec3 ro, vec3 rd, int steps)
{
  accLightmackjamtunnel = vec3(0.);
  vec3 p  = ro;
  for (int i = 0; i < 128; ++i)
  {
    vec2 res = mapmackjamtunnel(p);
    if (res.x < 0.01)
      return vec3(res.x, distance(p, ro), res.y);
    if (res.y < 0.)
      accLightmackjamtunnel += (vec3(172, 38, 235)/255.)*0.1+vec3(sin(distance(p, ro)*1.+time)*.5+.5, .5, .1)*(1.-sat(res.x/5.5))*.2*sat(sin(p.y*.05+5.*time));

    p+=rd*res.x*.5;
  }
  return vec3(-1.);
}

vec3 rdrmackjamtunnel2(vec2 uv)
{
  vec3 background = vec3(212, 140, 32)/255.;
  vec3 col = background;

  vec3 ro = vec3(0.,-5.,-5.);
  vec3 ta = vec3(sin(time)*5.,85.,0.);
  vec3 rd = normalize(ta-ro);

  rd = getCam(rd, uv);

  float depth = 150.;
  vec3 res = tracemackjamtunnel(ro, rd, 128);
  if (res.y > 0.)
  {
    depth = res.y;
    vec3 p = ro+rd*res.y;
    vec3 n = getNormmackjamtunnel(p, res.x);
    col = n*.5+.5;

    col = (vec3(23, 24, 51)/255.)*sat(dot(normalize(vec3(n.x, -1., n.z)), n));
  }
  col += accLightmackjamtunnel;
  col = mix(col, vec3(0.), 1.-sat(exp(-depth*depth*0.0001)));
  return col;
}

vec3 rdrmackjamtunnel(vec2 uv)
{

    //uv *= r2d(-time*.5);
    //uv = abs(uv);
    //uv -= vec2(.2+uv.y, 0.);
    //uv *= r2d(.1*time);
    //uv = abs(uv);
   float stp = .01*length(uv);
    //uv = floor(uv/stp)*stp;

    //uv -= vec2(.25);
    //uv *= r2d(FFTI(.1)*10.);
   // uv = abs(uv);

    vec3 col = rdrmackjamtunnel2(uv);

    col *= 1.-sat(length(uv));
    //col = mix(col, vec3(199, 242, 58)/255., 1.-pow(sat(length(col)),8.));
    col = pow(col, vec3(1.45));
    //col *= vec3(199, 242, 58)/255.;
    float beat = 1./8.;
    col += (mod(time, beat)/beat)*sat(FFT(.1)*col)*45.;
    //col = mix(col, textureRepeat(greyNoise, uv).xyz, .5);
    col.xy *= r2d(time*.5);
    col = abs(col);
    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = (fragCoord.xy-.5*iResolution.xy)/iResolution.xx;

  //uv *= r2d(-time*.5);
  //uv = abs(uv);
  //uv -= vec2(.2+uv.y, 0.);
  //uv *= r2d(.1*time);
  //uv = abs(uv);
 float stp = .01*length(uv);
  //uv = floor(uv/stp)*stp;

  //uv -= vec2(.25);
  //uv *= r2d(FFTI(.1)*10.);
 // uv = abs(uv);

  vec3 col = rdr(uv);

  col *= 1.-sat(length(uv));
  //col = mix(col, vec3(199, 242, 58)/255., 1.-pow(sat(length(col)),8.));
  col = pow(col, vec3(1.45));
  //col *= vec3(199, 242, 58)/255.;
  float beat = 1./8.;
  col += (mod(time, beat)/beat)*sat(FFTS(.1)*col)*45.;
  col = mix(col, texture(iChannel0, gl_FragCoord.xy/iResolution.xy).xyz, .5);
  col.xy *= r2d(time*.5);
  col = abs(col);
	fragColor = vec4(col, 1.);
}
*/



// DOne based on Karenn - Crush the mushroom song

#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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



vec2 mapkarenn(vec3 p)
{
    vec2 acc = vec2(1000., -1.);

    float repa = 2.0*PI/21.;

    vec3 q = p;
    float a = atan(q.y, q.x);

    //a = mod(a+repa*.5,repa)-repa*.5;
    float sector = floor(a/repa);

    q.xy = r2d(sector*repa)*q.xy;
    q -= vec3(1.+sin(sector+_time)+FFT(sector)*2., 0.,0.);

    float repz = 5.8+sin(sector+_time*.01);

    q.z = mod(q.z+repz*.5+_time*10.+sector*2.5,repz)-repz*.5;
    //q.z *= .01;
    acc = _min(acc, vec2(max(length(q.xy),abs(q.z)-1.), 0.));

    return acc;
}

vec3 getNormkarenn(vec3 p, float d)
{
    vec2 e = vec2(0.01, 0.);
    return -normalize(vec3(d)-vec3(mapkarenn(p-e.xyy).x,mapkarenn(p-e.yxy).x,mapkarenn(p-e.yyx).x));
    //return normalize(cross(dFdx(p), dFdy(p)));
}

vec3 accColkarenn;

vec3 tracekarenn(vec3 ro, vec3 rd, int steps)
{
    accColkarenn = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 128; ++i)
    {
        vec2 res = mapkarenn(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        accColkarenn += .15*vec3(sin(p.z+_time*5.)*.5+.5, .3+.2*abs(sin(p.z*5.)),.5)*(1.-sat(res.x/.2));
        p+=rd*res.x;
    }
    return vec3(-1.);
}

vec3 rdrkarenn2(vec2 uv)
{
    vec3 col = vec3(0.,0.,0.);




    vec3 ro = vec3(0.,0.,-5.);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd = normalize(ta-ro);

    rd = getCam(rd, uv);

    vec3 res = tracekarenn(ro, rd, 128);
    if (res.y > 0.)
    {
        vec3 p = ro + res.y*rd;
        vec3 n = getNormkarenn(p, res.x);
        col = n*.5+.5;
        col = vec3(1.);
    }
    col += accColkarenn;

    float mask = length(uv)-.1;
    float a = abs(atan(uv.y, uv.x)-PI*.5);
    float coef = pow(FFT(a/PI), .5);
    col = mix(col, 2.*vec3(.5+.1*sin(coef*3.),0.361+.3*sin(coef*5.+_time),0.361+.2*sin(coef))*(sat(mask*400.)), (.5+coef)*pow(1.-sat(mask*1.), 5.));
    col = pow(col, vec3(2.2));
    return col;
}
vec3 rdrkarenn(vec2 uv)
{

      vec3 col = rdrkarenn2(mix(uv, uv*r2d(sin(length(uv)+_time)), sat((abs(uv.x)-.2)*400.)));

      col *= sat(1.-sat((abs(uv.x)-.2)*400.)+.5);
      return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    _time = texture(iChannel1, fragCoord/8.).x*.1+time;
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.xx;

    vec3 col = rdr(mix(uv, uv*r2d(sin(length(uv)+_time)), sat((abs(uv.x)-.2)*400.)));

    col *= sat(1.-sat((abs(uv.x)-.2)*400.)+.5);

    fragColor = vec4(col,1.0);
}*/



#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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



float _timednbcorridor;


vec2 mapdnbcorridor(vec3 p)
{
float ttunnel = _timednbcorridor*55.;
vec3 po = p;
    p.zy += vec2(_timednbcorridor*.5,0.);
//return vec2(length(p)-.5, 0.);
    vec2 acc = vec2(1000., -1.);
    acc = _min(acc, vec2(-p.y
    +sin(p.x+p.z-_timednbcorridor)*.1+0.025*sin((p.x-p.z*.5)*3.-_timednbcorridor*4.5)
    +0.015*sin((p.x+p.z)*12.3+_timednbcorridor)
    +0.01*sin((p.x-p.z)*9.+_timednbcorridor)*sin(p.x*5.)
    , 0.));
    p.zy += vec2(ttunnel*.5,0.);
    float offWall = .2*(1.-sat(pow(textureRepeat(greyNoise, p.zy*.1).z, 5.)));
    acc = _min(acc, vec2(-(abs(p.x)-1.-offWall), 1.));
    acc = _max(acc, vec2(abs(po.z)-20., 0.));

    vec3 cpos = po-vec3(0,-1.+sin(_timednbcorridor),-5.);
    cpos.zy*=r2d(_timednbcorridor);
    cpos.xz*= r2d(_timednbcorridor*.5);
    acc = _min(acc, vec2(_cube(cpos, vec3(.5)), 2.));

    return acc;
}

vec3 _normdnbcorridor(float d, vec3 p)
{
    //return normalize(-cross(dFdx(p), dFdy(p)));
    vec2 e = vec2(0.01,0.);
    return normalize(vec3(d)-vec3(mapdnbcorridor(p-e.xyy).x, mapdnbcorridor(p-e.yxy).x, mapdnbcorridor(p-e.yyx).x));
}

vec3 tracednbcorridor(vec3 ro, vec3 rd, int steps)
{
    vec3 p = ro;
    for (int i = 0; i < 256; ++i)
    {
        vec2 res = mapdnbcorridor(p);
        if (res.x<0.001)
            return vec3(res.x, distance(ro, p), res.y);
        p+= rd * res.x;
    }
    return vec3(-1.);
}

vec3 getCamdnbcorridor(vec3 rd, vec2 uv)
{
    float fov = 2.5;
    if (mod(time, 5.) < 2.)
        fov += 5.5;
    if (mod(time, 10.) < 5.)
        fov *= .2;
    fov -= FFT(10)*.5;
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec3 rdrdnbcorridora(vec2 uv)
{
    vec3 col = vec3(1.);

    float dist = mix(-20., -15., mod(_timednbcorridor, 5.)/5.+FFT(10));
    vec3 ro = vec3(sin(time+3.1415),-6.+sin(_timednbcorridor)*5.,dist);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd = normalize(ta-ro);

    rd = getCamdnbcorridor(rd, uv);
    rd.xy *= r2d(sin(_timednbcorridor+FFT(15)*5.)*.25);
    vec3 res = tracednbcorridor(ro, rd, 256);
    if (res.y > 0.)
    {
        vec3 p = ro+rd * res.y;
        vec3 n = _normdnbcorridor(res.x, p);

        //col = n*.5+.5;

        if (res.z == 0.)
        {
            col = vec3(.05);
            n.xz += 0.2*textureRepeat(greyNoise, p.xz*.1+_timednbcorridor*.025*vec2(1.,-1.)).x+.1*sin((p.x+p.z*.3)*8.+_timednbcorridor)+.1*sin(p.z*8.33-pow(abs(p.x)-.2, 5.)*10.)+.25*sin(_timednbcorridor+length((p.xz-vec2(0.,20.))*2.));
            n = normalize(n);
            col += pow(sat(-dot(normalize(vec3(0.,1.,1.)-rd), n)), 250.05)*vec3(.5)*length(uv*5.);
        }
        if (res.z == 1.)
        {
            col = vec3(.05);
            col *= textureRepeat(greyNoise, p.zy*vec2(.01,2.)).xxx;
            col += mix(vec3(0.), .15*textureRepeat(greyNoise, p.zy*.1*vec2(5.,1.)-vec2(-_timednbcorridor*.2, 0.)+sin((n.x+p.y+p.x)*3.+_timednbcorridor*.3)).xxx,
            textureRepeat(greyNoise, p.zy*vec2(.1,1.)*.5).x);
            col +=.1*textureRepeat(greyNoise, p.zy*vec2(1.,1.)*.5-vec2(-_timednbcorridor*.25,0.)).xyz;

        }
        if (res.z == 2.)
        {
            col = vec3(0.0);

            col += (n*.5+.5)*pow(1.-sat(-dot(n, rd)), 5.);
            //col = n*.5+.5;
        }
       col += vec3(.5)*pow(1.-sat(-dot(rd, n)), 5.);
       col = sat(col);
       col += pow(1.-sat(lenny(uv-vec2(0.,.15))), 3.)*1.2;
       if (res.z == 1.)
       {
           col *= sat(pow(sat(-p.y*.25), .5)+.4);
       }
    }

    float waves = sin((uv.x+uv.y)*55.);

     float flicker = 0.1;
     col = mix(col, 1.-col, sat(waves*400.)*pow(FFT(50),.25)*sat(length(uv*.25)));
    return col;
}

vec3 rdr2dnbcorridor(vec2 uv)
{
    vec2 dir = normalize(vec2(1.,1.));
    float strength = 0.03*FFT(20);
    vec3 col;
    col.r = rdrdnbcorridora(uv+dir*strength).r;
    col.g = rdrdnbcorridora(uv).g;
    col.b = rdrdnbcorridora(uv-dir*strength).b;
    col *= mix(vec3(1.), vec3(0.180,1.000,0.863), sat(length(uv)*1.5-.3)*sat((sin(-time*5.+(uv.y-uv.x)*50.)-.9)*400.));
    return col;
}

vec3 rdrdnbcorridor(vec2 uv)
{
  _timednbcorridor = time;

      vec3 col = rdr2dnbcorridor(uv);
      col *= mix(vec3(0.5), vec3(1.), 1.-sat(lenny(uv*1.5)));
      col = pow(col, vec3(1.2));
      float flicker = 1./12.;
      float flickperiod = 2.;
      col = mix(col, 1.-col, FFT(125)*float(mod(time, flickperiod)<.5)*sat(mod(time, flicker)/flicker));
      col = mix((col-rdr2dnbcorridor(uv-.02))*10., col, sat((sin(time*.5)+.8)*400.));

      col = mix(col, col.zxy*vec3(.1,.1,.3)*8., sat(sin(time*.25)*400.));
      col = col * 2.*vec3(sat((sin(time*.25)*.5+.5)+.5)*.5,textureRepeat(greyNoise, vec2(time*.05)).x, .5);
      col *= sat(pow(FFT(10)+.3,5.)+.5)*2.;
      return 2.*mix(col, col.xxx, .5)*mix(vec3(.1,.45,.23), vec3(0.541,1.000,0.992), sat(length(uv)));
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    _timednbcorridor = time;//+texture(iChannel3, fragCoord/8.).x*.1;
    vec2 uv = (fragCoord-vec2(.5)*iResolution.xy)/iResolution.xx;

    vec3 col = rdr2(uv);
    col *= mix(vec3(0.5), vec3(1.), 1.-sat(lenny(uv*1.5)));
    col = pow(col, vec3(1.2));
    float flicker = 1./12.;
    float flickperiod = 2.;
    col = mix(col, 1.-col, FFT(125)*float(mod(time, flickperiod)<.5)*sat(mod(time, flicker)/flicker));
    col = mix(fwidth(col)*10., col, sat((sin(time*.5)+.8)*400.));

    col = mix(col, col.zxy*vec3(.1,.1,.3)*8., sat(sin(time*.25)*400.));
    col = col * 2.*vec3(sat((sin(time*.25)*.5+.5)+.5)*.5,texture(iChannel0, vec2(time*.05)).x, .5);
    col *= sat(pow(FFT(10)+.3,5.)+.5)*2.;
    fragColor = vec4(2.*mix(col, col.xxx, .5)*mix(vec3(.1,.45,.23), vec3(0.541,1.000,0.992), sat(length(uv))),1.0);
}*/



#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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



vec2 mapDarkRoom(vec3 p)
{
    vec2 acc = vec2(10000.,-1.);

    //acc = _min(acc, vec2(length(p-vec3(sin(time*2.)-.5,cos(time*1.7)+cos(time*.5)*.5,cos(time*3.)+8.))-.5, 2.));

    acc = _min(acc, vec2(-(abs(p.y)-2.8), 0.));
    vec3 pwall = p;
    //pwall.xy*=r2d(.5);
    float sidewall = -(abs(p.y+p.x)-3.8);

    sidewall = max(sidewall, -(abs(p.z-3.5)-1.));
    acc = _min(acc, vec2(sidewall, 0.)); // Sidewalls
    acc = _min(acc, vec2(-(abs(p.z)-12.), 1.));

    return acc;
}

vec3 getNormDarkRoom(vec3 p, float d)
{
    vec2 e = vec2(0.01,0.);
    return normalize(vec3(d)-
        vec3(mapDarkRoom(p-e.xyy).x, mapDarkRoom(p-e.yxy).x, mapDarkRoom(p-e.yyx).x));
}

vec3 traceDarkRoom(vec3 ro, vec3 rd,  int steps)
{
    vec3 p = ro;
    for (int i = 0; i < 128; ++i)
    {
        vec2 res = mapDarkRoom(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        p+= rd*res.x;
    }
    return vec3(-1.);
}

vec3 getMatDarkRoom(vec3 rd, vec3 res, vec3 p, vec3 n)
{
    vec3 col = vec3(0.);

    col = n*.5+.5;
    if (res.z == 0.)
    {
        if (abs(dot(n,vec3(0.,0.,1.))) < 0.01)
        {
            col = vec3(0.051,0.404,0.408)*.2*pow(textureRepeat(greyNoise, p.xz*.1).x, .1)*vec3(.5); // ambient
        }
        else
            col = vec3(0.);
    }
    if (res.z == 1.)
    {
        vec2 uvwall = p.xy;
        float rep = 3.;
        float idwin = floor((uvwall.x+rep*.5)/rep);
        uvwall.y = abs(uvwall.y);
        uvwall.y -= 1.8;
        uvwall.x = mod(uvwall.x+rep*.5,rep)-rep*.5;
        float sqr = _sqr(uvwall, vec2(1.4, .78));
        float wincolfactor = sat(sin(FFTlow*10.+idwin*1.+3.*time*sign(p.y))*.5+.5);
        //wincolfactor += pow(FFT(.1),2.);
        //wincolfactor *= (mod(time, .2)/.2)*FFT(.1);
        vec3 rgbwin = mix(vec3(1.), vec3(1.,0.1,0.4), wincolfactor);
        col = mix(vec3(0.), rgbwin*(pow(FFT(.9),.5)+.5), 1.-sat(sqr*40.));
    }
    if (res.z == 2.)
    {
        col = vec3(0.165,0.996,0.678)*10.;//*FFT(.4);
    }

    return col;
}

float getWallSpec(vec3 p)
{
    return pow(textureRepeat(greyNoise, p.xz*.1).x, .1);
}

vec3 rdrDarkRoom(vec2 uv)
{
    vec3 col = vec3(0.);

    vec3 ro = vec3(-2.+sin(time*.2),1.+sin(time*.25),-8.);
    vec3 ta = vec3(-2.+sin(time*.2),0.+sin(time*.3)*.5,0.);
    vec3 rd = normalize(ta-ro);
    rd = getCam(rd, uv);

    vec3 res = traceDarkRoom(ro, rd, 128);
    if (res.y > 0.)
    {
        vec3 p = ro+rd*res.y;
        vec3 n = getNormDarkRoom(p, res.x);
        col = getMatDarkRoom(rd, res, p, n);

        if (res.z == 0.)
        {
            if (abs(dot(n,vec3(0.,0.,1.))) < 0.01)
            {
                float spec = pow(textureRepeat(greyNoise, p.xz*.1).x, 1.)*.2;
                vec3 refl = normalize(reflect(rd, n)+spec*2.*(vec3(rand(), rand(), rand())-.5));
                vec3 resrefl = traceDarkRoom(p+n*0.01, refl, 128);
                if (resrefl.y > 0.)
                {
                    vec3 prefl = p+refl*resrefl.y;
                    vec3 nrefl = getNormDarkRoom(prefl, resrefl.x);
                    col += getMatDarkRoom(refl, resrefl, prefl, nrefl);
                }
            }
        }

    }

    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.xx;
    seed=texture(iChannel0,uv).x;
    seed+=fract(time);
    vec3 col = rdr(uv);

    col = mix(col, texture(iChannel2, fragCoord/iResolution.xy).xyz, .7);
    fragColor = vec4(col,1.0);
}*/



#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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



vec2 mapmack(vec3 p)
{
  vec2 acc = vec2(10000.,-1.);

  acc = _min(acc, vec2(length(p+vec3(0.,0.,-15.))-1., 0.));

  p.xz *= r2d(.5*sin(.1*p.y));
  p.xz += vec2(sin(time), cos(time*.75+p.y*.1))*5.;
  float rad = 20.;
  vec3 pdart = p+vec3(0.,FFTI(.1)*50.,0.);
  float adart = atan(pdart.z, pdart.x);
  float stpdart = PI*2./12.;
  float sector = mod(adart+stpdart*.5,stpdart)-stpdart*.5;
  pdart.xz = vec2(sin(sector), cos(sector))*length(pdart.xz);
  float repyd = 15.;
  float idda = floor((pdart.y+repyd*.5)/repyd);
//  pdart.xz *= r2d(idda);
  float rada = mix(10.,20.,sin(idda)*.5+.5);
  pdart -= vec3(0.,45.,rada);
  pdart.y = mod(pdart.y+repyd*.5,repyd)-repyd*.5;
  float dart = _cube(pdart, vec2(.1,5.).xxy);
  acc = _min(acc, vec2(length(pdart-vec3(0.,0.,-5.))-0.25,-1.));

  acc = _min(acc, vec2(dart, 0.));

  vec3 pcube = p;
  float stpcube = PI*2./40.;
  float sectorcube = mod(adart+stpcube*.5,stpcube)-stpcube*.5;
  pcube.xz = vec2(sin(sectorcube), cos(sectorcube))*length(pcube.xz);
  pcube -= vec3(0.,0.,rad);
  float repyc = .5;
  pcube.y = mod(pcube.y+repyc*.5,repyc)-repyc*.5;
  acc = _min(acc, vec2(_cube(pcube, vec3(.5,.2,2.)), 1.));

  float tunnel = -(length(p.xz)-rad);
  acc = _min(acc, vec2(tunnel, 0.));

  return acc;
}

vec3 getNormmack(vec3 p, float d)
{
  vec2 e = vec2(0.01,0.);
  return normalize(vec3(d)-vec3(mapmack(p-e.xyy).x,mapmack(p-e.yxy).x,mapmack(p-e.yyx).x));
}
vec3 accLight;
vec3 tracemack(vec3 ro, vec3 rd, int steps)
{
  accLight = vec3(0.);
  vec3 p  = ro;
  for (int i = 0; i < 128; ++i)
  {
    vec2 res = mapmack(p);
    if (res.x < 0.01)
      return vec3(res.x, distance(p, ro), res.y);
    if (res.y < 0.)
      accLight += (vec3(172, 38, 235)/255.)*0.1+vec3(sin(distance(p, ro)*1.+time)*.5+.5, .5, .1)*(1.-sat(res.x/5.5))*.2;
    p+=rd*res.x*.5;
  }
  return vec3(-1.);
}

vec3 rdrmack(vec2 uv)
{
  vec3 background = vec3(212, 140, 32)/255.;
  vec3 col = background;

  vec3 ro = vec3(0.,-5.,-5.);
  vec3 ta = vec3(0.,25.,0.);
  vec3 rd = normalize(ta-ro);

  rd = getCam(rd, uv);

  float depth = 150.;
  vec3 res = tracemack(ro, rd, 128);
  if (res.y > 0.)
  {
    depth = res.y;
    vec3 p = ro+rd*res.y;
    vec3 n = getNormmack(p, res.x);
    col = n*.5+.5;

    col = (vec3(23, 24, 51)/255.)*sat(dot(normalize(vec3(n.x, -1., n.z)), n));
  }
  col += accLight;
  col = mix(col, vec3(0.), 1.-sat(exp(-depth*depth*0.0001)));
  return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = (fragCoord.xy-.5*iResolution.xy)/iResolution.xx;


  vec3 col = rdr(uv);

  col *= 1.-sat(length(uv));
  //col = mix(col, vec3(199, 242, 58)/255., 1.-pow(sat(length(col)),8.));
  col *= vec3(199, 242, 58)/255.;
	fragColor = vec4(col, 1.);
}*/



// Fork of "halu goa" by z0rg. https://shadertoy.com/view/NsdGWH
// 2021-12-13 21:44:29
#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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




float _bbox(vec3 p, vec3 s,vec3 t)
{
  vec3 l = abs(p)-s;
  float c = max(l.x,max(l.y,l.z));
  l = abs(l)-s*t;

  float x = max(max(l.x,c),l.y);
  float y = max(max(l.z,c),l.y);
  float z = max(max(l.x,c),l.z);
  return min(min(x,y),z);
}


float _sph(vec3 p, float r)
{
  return length(p)-r;
}



vec2 maptunneldnb(vec3 p)
{
  vec2 acc = vec2(1000.,-1.);
  float rep = 2.5;
  p= mod(p+rep*.5,rep)-rep*.5;
  //p.xy*=r2d(time+p.z);
  acc = vec2(_bbox(p,vec3(1.),vec3(.2)),0.);

  return acc;
}

vec3 tracetunneldnb(vec3 ro, vec3 rd, int steps)
{
  vec3 p = ro;
  for (int i = 0; i<128;++i)
  {
    vec2 res = maptunneldnb(p);
    res.x = min(res.x,.9);
    if (res.x<0.001)
      return vec3(res.x,distance(p,ro),res.y);
    p+= rd*res.x;
  }
  return vec3(-1.);
}

vec3 getCamtunneldnb(vec3 rd, vec2 uv)
{
  float fov = 5.;
  vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
  vec3 u = normalize(cross(rd,r));
  return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec3 getNormtunneldnb(vec3 p, float d)
{
  vec2 e = vec2(0.001,0.);
  return normalize(vec3(d)-vec3(maptunneldnb(p-e.xyy).x,maptunneldnb(p-e.yxy).x,maptunneldnb(p-e.yyx).x));
}

vec3 getMattunneldnb(vec3 res, vec3 rd, vec3 p, vec3 n)
{
    vec3 col = n*.5+.5;
    vec3 rgb = mix(vec3(0.),vec3(1.000,0.180,0.345)*1.,sat((sin((p.x)*20.)-.975)*400.));
    col = rgb;
    return col;
}

vec3 rdrtunneldnb(vec2 uv)
{
  vec3 col;

  float z = mod(time,18.);
  vec3 ro = vec3(0.,0.,-5.+time);
  vec3 ta = vec3(0.,0.,0.+time);
  vec3 rd = normalize(ta-ro);

  rd = getCamtunneldnb(rd,uv);

  vec3 res = tracetunneldnb(ro,rd,128);
  float depth = 15.;
  if (res.y>0.)
  {
    vec3 p = ro+rd*res.y;
    vec3 n = getNormtunneldnb(p,res.x);
    col = getMattunneldnb(res, rd, p, n);
    float spec = .1;
    vec3 refl = normalize(reflect(rd, n)+spec*(vec3(rand(), rand(), rand())-.5));
    vec3 resrefl = tracetunneldnb(p+n*0.01,refl, 512);
    if (resrefl.y > 0.)
    {
        vec3 prefl = p+refl*resrefl.y;
        vec3 nrefl = getNormtunneldnb(prefl, resrefl.x);
        col += getMattunneldnb(resrefl, refl, prefl, nrefl);
    }
    depth = res.y;
  }
  vec3 depthCol = 4.*vec3(0.780,0.286,0.200)*
    (pow(1.-sat(abs(uv.y)),5.)+.1);
   col = mix(col,depthCol,sat(depth/10.));
    col *= 1.-sat(length(uv));
  return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = (fragCoord.xy-vec2(.5)*iResolution.xy) / iResolution.xx;
  seed=texture(iChannel0,uv).x;
  seed+=fract(time);
    uv *= r2d(PI*.5);
  vec3 col = rdr(uv);
  col = pow(col, vec3(2.));
  fragColor = vec4(col, 1.0);
}*/


// Fork of "tunnelzefzef" by z0rg. https://shadertoy.com/view/stV3zt
// 2021-12-11 16:08:54

#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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



vec2 maptunnelbars(vec3 p)
{
  vec2 acc = vec2(1000.,-1.);

  vec3 op = p;
  float rep = 1.;
//p.z+=time;
float id = floor((p.z+rep*.5)/rep);
  p.z = mod(p.z+rep*.5,rep)-rep*.5;
vec2 sz = vec2(5.+sin(id*.4+time)*.5,.5+.3*sin(time+p.z));
  //p.xy *=r2d(PI*.25);
//  id = sin(id)*10.;
  float shape = max((abs(_sqr(p.xy*r2d(id*1.57),
    vec2(sz)))-.1),
     abs(p.z)-.2);
  acc = _min(acc, vec2(shape, 0.));


  return acc;
}

vec3 getCamtunnelbars(vec3 rd, vec2 uv)
{
  float fov = 2.;
  vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
  vec3 u = normalize(cross(rd, r));
  return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec3 getNormtunnelbars(vec3 p, float d)
{
  vec2 e = vec2(0.01,.0);
  return normalize(vec3(d)-vec3(maptunnelbars(p-e.xyy).x,
    maptunnelbars(p-e.yxy).x,
    maptunnelbars(p-e.yyx).x));
}
vec3 accCol;
vec3 tracetunnelbars(vec3 ro, vec3 rd, int steps)
{
  accCol = vec3(0.);
  vec3 p = ro;
  for (int i = 0; i<128;++i)
{
    vec2 res = maptunnelbars(p);
    if (res.x < 0.01)
      return vec3(res.x,distance(p,ro), res.y);
      if (distance(p, ro) > 15.)
        return vec3(-1.);
    accCol +=vec3(1.,sin(p.z)*.5+.5,.5)
    *(1.-sat(res.x/.7))*.015;
    p += rd*res.x*.25;
  }
  return vec3(-1.);
}

vec3 rdrtunnelbars(vec2 uv)
{
  vec3 col = vec3(0.);

  float z = time*10.;
  vec3 ro = vec3(0.,0.,z+-5.);
  vec3 ta = vec3(0.,0.,z);
  vec3 rd = normalize(ta-ro);
  rd = getCamtunnelbars(rd,uv);

  vec3 res = tracetunnelbars(ro, rd, 128);
  if (res.y >0.)
  {
    vec3 p = ro+rd*res.y;
    vec3 n = getNormtunnelbars(p, res.x);
    float dt = dot(n, vec3(0.,0.,1));
    if (abs(dt)<0.1)
      col = n*.5+.5;
    else
      col = vec3(.2);
  }
  col+=accCol;
  col.xy *=r2d(time);
  col.xy = abs(col.xy);
col = col.xxx;
col *= mix(vec3(1.),vec3(1.,.2,.3),
  1.-sat((abs(uv.x)-.1)*400.));
  return col;
}

/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ){
  vec2 uv = (fragCoord.xy-.5*iResolution.xy)/
    iResolution.xx;
    uv*= 1.-length(uv)*.5;
  vec3 col = rdr(uv*1.);


  col *= 1.-sat((abs(uv.y)-.3)*400.);
  //for (int i = 0; i<4;++i)
    //col += rdr(uv*(1.-.5*float(i)/4.))*.1;
  fragColor = vec4(col, 1.0);
}*/


#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x

#define EPS vec2(0.01, 0.)
#define AKAI_KNOB(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_KNOB(a) (texture2D(midi, vec2(176. / 256., (16.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_FADER(a) (texture2D(midi, vec2(176. / 256., (0.+min(max(float(a), 0.), 7.)) / 128.)).x)

#define MIDI_BTN_S(a) (texture2D(midi, vec2(176. /  256., (32.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_M(a) (texture2D(midi, vec2(176. / 256., (48.+min(max(float(a), 0.), 7.)) / 128.)).x)
#define MIDI_BTN_R(a) (texture2D(midi, vec2(176. / 256., (64.+min(max(float(a), 0.), 7.)) / 128.)).x)

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



vec3 lookat(vec2 uv, vec3 dir)
{
  float fov = 1.;
  uv *= fov;
  dir = normalize(dir);
  vec3 right = normalize(cross(dir, vec3(0.,1.,0.)));
  vec3 up = normalize(cross(dir, right));

  return dir + uv.x * right + uv.y*up;
}

float sph(vec3 p, float r)
{
    return length(p)-r;
}

// Trial with mod on z axis not working due to rotation artifact
float mapFail(vec3 p)
{
    float sp =  sph(p, .5);

    float an = atan(p.y, p.x);

    float stpRnd = 2.0*PI/12.;

    float sector = floor(an/stpRnd);

    float repDepth = 5.;
    float idxDep = floor((p.z-repDepth*.5)/repDepth);
    p.z = mod(p.z+repDepth*.5, repDepth)-repDepth*.5;
    //sp =  sph(p, .5);
    //return sp;
    p.xy *=  r2d(idxDep);
    p.xy =r2d(sector*stpRnd)*p.xy;
    p -= vec3(5.,0.,0.);

    return sph(p, .5);
   return min(sph(p, 1.5), sp);
}

float mapbubblestunnel(vec3 p)
{
    float sp =  5.;

    float an = atan(p.y, p.x);

    float stpRnd = 2.0*PI/12.;

    float sector = floor(an/stpRnd);

    for (int i = 0; i < 10; ++i)
    {
        float z = float(i)*3.-13.;
        vec3 q = p;
        q.xy =r2d(sector*stpRnd)*p.xy;
        q -= vec3(5.,sin(z+time)*.05,z);
        sp = min(sp, sph(q, 1.5+sin(z+time)));
    }
    return sp;
}

vec3 normalbubblestunnel(vec3 p, float d)
{

  float xPos = mapbubblestunnel(p+EPS.xyy);
  float yPos = mapbubblestunnel(p+EPS.yxy);
  float zPos = mapbubblestunnel(p+EPS.yyx);
  return (vec3(xPos, yPos,zPos)-d)/EPS.x;
  return vec3(mapbubblestunnel(p+EPS.xyy)-mapbubblestunnel(p-EPS.xyy),
    mapbubblestunnel(p+EPS.yxy)-mapbubblestunnel(p-EPS.yxy),
    mapbubblestunnel(p+EPS.yyx)-mapbubblestunnel(p-EPS.yyx));
}

vec3 rdr2bubblestunnel(vec2 uv)
{
    vec3 col = vec3(0.);

    float acc = 1000.;
    int cnt = 15;
    float fcnt = float(cnt);
    for (int i = 0; i < 15; ++i)
    {
        float fi = float(i)/fcnt;
        vec2 p = uv*r2d(fi*5.+time*fi*.1);
        float an = atan(p.y, p.x);
        float rep = TAU/(5.+float(i));
        float b = mod(an+time*.1+.5*rep, rep)-.5*rep;
        p = vec2(sin(b), cos(b))*length(p);
        acc = min(acc, abs(_sqr(p-vec2(0.,.1)*(1.+fi*3.+.1*sin(fi*15.+time)), vec2(.03)*pow(1.-fi, .75)))-.001);
    }
    col = mix(col, vec3(1.), 1.-sat(acc*400.*(sin(time*.25)*.5+.5)));
    //col += vec3(0.620,0.886,1.000)*pow(1.-sat(acc*10.), 5.);
    col = pow(col, vec3(2.));
    return col;
}

vec3 rdr3Dbubblestunnel(vec2 uv)
{
vec3 col;
  vec3 orig = vec3(0.,10.*sin(time)*0.,-20.+mod(time*15., 30.));
  vec3 lookatpos = vec3(sin(time), 0., cos(time))*50.*0.;
  vec3 dir = normalize(lookat(uv, lookatpos-orig));
  vec3 p = orig + dir;

  for (int i = 0; i <64;++i)
  {
    if (distance(p, orig) > 20.)
      break;
    float d = mapbubblestunnel(p);

    if (d < 0.001)
    {
      vec3 norm = normalbubblestunnel(p,d);
      vec3 lPos = 3.*vec3(sin(time),cos(time),sin(time*5.)*5.+4.);
      float val = sat(dot(norm,normalize(lPos-p)));

      col= mix(vec3(1.,.5,.5), .5*vec3(4, 100, 209)/255., 1.-pow(val,.25))+vec3(1.)*pow(val,2.);
        break;
    }
    p+= dir*d;
  }
  vec3 colB = 1.5*(1.-sat(lenny(uv*vec2(1.,3.))))*(vec3(4, 150, 209)/255.);
  col += mix(colB, colB.xzy, sin(time));
  //col *= rdr2(uv);
  return col;
}

vec3 rdrScnbubblestunnel(vec2 uv)
{
  vec2 dir = normalize(vec2(1.));
  float strength = 0.05*sat(length(uv));

  vec3 col;

  col.r = rdr3Dbubblestunnel(uv+dir*strength).r;
  col.g = rdr3Dbubblestunnel(uv).g;
  col.b = rdr3Dbubblestunnel(uv-dir*strength).b;
  return col;
}

vec3 rdrbubblestunnel(vec2 uv)
{
  //uv -= vec2(.5);//*iResolution.xy/iResolution.xx;
  uv *= r2d(length(uv)*sin(time));
//  uv*= 4.2; // horizontal
uv*= 1.2; //vertical
  vec3 col = rdrScnbubblestunnel(uv);
    //  float diff = pow(fwidth(col.z), .6);
    if (false)
    { // Not so cheap antialiasing SSAA x4

        vec2 off = vec2(1., -1.)/(resolution.x*2.);
        vec3 acc = col;
        // To avoid too regular pattern yielding aliasing artifacts
        mat2 rot = r2d(uv.y*5.); // a bit of value tweaking, appears to be working well
        acc += rdrScnbubblestunnel(uv-off.xx*rot);
        acc += rdrScnbubblestunnel(uv-off.xy*rot);
        acc += rdrScnbubblestunnel(uv-off.yy*rot);
        acc += rdrScnbubblestunnel(uv-off.yx*rot);
        col = acc/5.;
    }


  col = mix(col, col*vec3(0.4,0.8,0.98), col.x);
  return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = fragCoord.xy / iResolution.xx;
  uv -= vec2(.5)*iResolution.xy/iResolution.xx;
  uv *= r2d(length(uv)*sin(time));
//  uv*= 4.2; // horizontal
uv*= 1.2; //vertical
  vec3 col = rdrScnbubblestunnel(uv);
      float diff = pow(fwidth(col.z), .6);

    { // Not so cheap antialiasing SSAA x4

        vec2 off = vec2(1., -1.)/(iResolution.x*2.);
        vec3 acc = col;
        // To avoid too regular pattern yielding aliasing artifacts
        mat2 rot = r2d(uv.y*5.); // a bit of value tweaking, appears to be working well
        acc += rdrScnbubblestunnel(uv-off.xx*rot);
        acc += rdrScnbubblestunnel(uv-off.xy*rot);
        acc += rdrScnbubblestunnel(uv-off.yy*rot);
        acc += rdrScnbubblestunnel(uv-off.yx*rot);
        col = acc/5.;
    }


  col = mix(col, col*vec3(0.4,0.8,0.98), col.x);
  fragColor = vec4(col, 1.0);
}*/



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
  col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);
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
