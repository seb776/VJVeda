precision mediump float;

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
    for (int i = 0; i < 256; ++i)
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
    vec3 ta = vec3(-2.+sin(time*.2),0.+sin(time*.3),0.);
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



float _rsqr(vec2 uv, vec2 s, float r)
{
    vec2 l = abs(uv)-s;
    return min(length(max(l, 0.)+min(max(l.x, l.y), 0.))-r, max(l.x, l.y));
}



vec2 maptunnel(vec3 p)
{
    vec2 acc = vec2(1000.,-1.);

    float tunnel = -_rsqr(p.xy, vec2(3., 1.), .4);
    tunnel = max(tunnel, abs(p.z)-10.);
    acc = _min(acc, vec2(tunnel, 0.));

    vec3 pc1 = p-vec3(sin(time*.5),.4*sin(time),8.+2.*sin(time*1.5));
    pc1.xy *= r2d(time+sin(time*.2));
    pc1.xz *= r2d(-time*.5);
    float cubes = _cube(pc1, vec3(.4));

    acc = _min(acc, vec2(cubes, 1.));
    return acc;
}

vec3 getNormtunnel(vec3 p, float d)
{
    vec2 e = vec2(0.01, 0.);
    return normalize(vec3(d)-vec3(maptunnel(p+e.xyy).x, maptunnel(p+e.yxy).x, maptunnel(p+e.yyx).x));
}

vec3 tracetunnel(vec3 ro, vec3 rd, int steps)
{
    vec3 p = ro;
    for (int i = 0; i< 256; ++i)
    {
        vec2 res = maptunnel(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        p+= rd*res.x;
    }
    return vec3(-1.);
}

vec3 getEnvtunnel(vec3 rd)
{
    return vec3(1.);//2.*textureRepeat(greyNoise, rd*vec3(1.,-1.,1.)*vec3(15.,15.,1.)+vec3(0.,.5,0.)).xyz*vec3(0.357,0.745,0.565);
}

vec3 rdrtunnel(vec2 uv)
{
    vec3 col = vec3(0.);

    vec3 off = (vec3(rand(),rand(),rand())-.5)*2.;
    vec3 ro = vec3(sin(time*.2),1.3,-5.)+off*.005;
    vec3 ta = vec3(0.,1.1,6.);
    vec3 rd = normalize(ta-ro);
    rd = getCam(rd, uv);
    rd = normalize(rd-off*.001);
    vec3 res = tracetunnel(ro,rd, 256);
    if (res.y > 0.)
    {
        vec3 p = ro +rd*res.y;
        vec3 n = getNormtunnel(p, res.x);
        if (res.z  == 0.)
        {
            vec2 uvt = vec2(atan(p.y, p.x)*7., p.z);

            vec2 rep = vec2(.5);
            uvt = mod(uvt+rep*.5,rep)-rep*.5;
            float carrelage = _sqr(uvt, vec2(.2));
            vec3 tng = normalize(cross(rd, n));
            n = normalize(n+tng*sat(carrelage*10.)*.5+textureRepeat(greyNoise, 3.*p.xy*vec2(1.,10.)).xxx*.05);
            n = normalize(n+(vec3(rand(),rand(), rand())-.5)*.05);
            vec3 rdrefl = normalize(reflect(rd, n));
            vec3 resrefl = tracetunnel(p-n*0.01, rdrefl, 128);
            if (resrefl.y > 0.)
            {
                col = vec3(0.075,0.427,0.427)*(1.-sat(carrelage))*.5
                *(1.-sat(length(uv*1.)));
            }
            else
                col = getEnvtunnel(rdrefl);
        }
    }
    else
        col = getEnvtunnel(rd);

    col = mix(col, vec3(0.894,0.969,0.631), pow(sat(length(col)), 25.));
    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.xx;
    seed=texture(iChannel1,uv).x;
    seed+=fract(time);
    vec3 col = rdr(uv);
    col = mix(col, texture(iChannel2, fragCoord/iResolution.xy).xyz, .75);
    fragColor = vec4(col,1.0);
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



void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    if (MIDI_FADER(0) > 0.01)
      col += MIDI_FADER(0)*rdrDarkRoom(uv)*3.;
    if (MIDI_FADER(1) > 0.01)
      col += MIDI_FADER(1)*rdrmack(uv)*2.;
    if (MIDI_FADER(2) > 0.01)
      col += MIDI_FADER(2)*rdrtunnel(uv)*2.;
    if (MIDI_FADER(3) > 0.01)
      col += MIDI_FADER(3)*rdrtunneldnb(uv)*2.;
    if (MIDI_FADER(4) > 0.01)
      col += MIDI_FADER(4)*rdrtunnelbars(uv)*2.;
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);


    gl_FragColor = vec4(col, 1.0);
}

