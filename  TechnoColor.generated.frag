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
    for (int i = 0; i < 256; ++i)
    {
        vec2 res = mapdnbtunnel(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        if (res.y == 0.)
            accCol0 += vec3(sin(p.z)*.5+.5, .2, cos(p.z*3.+p.y*5.+_time*7.)*.2+.5)*(1.-sat(res.x/.3))*.2;
        if (res.y == 1.)
            accCol1 +=  vec3(0.200,0.643,0.980)*(1.-sat(res.x/.05))*.1;
        p+= rd*res.x*.75;
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

// To replace missing behavior in veda
vec4 textureRepeat(sampler2D sampler, vec2 uv)
{
  return texture2D(sampler, mod(uv, vec2(1.)));
}

#endif // !TOOLS_INCLUDE



vec3 getCamglowwyy(vec3 rd, vec2 uv)
{
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+(r*uv.x+u*uv.y)*(1.5+.2*sin(FFT(.1)*.5+.5*time)));
}


vec2 mapglowwyy(vec3 p)
{
    vec2 acc = vec2(10000.,-1.);

    float z = time*7.+p.z+FFT(.1)*1.;
    float zrep = .5;
    float zindex = floor((z+zrep*.5)/zrep);
    z = mod(z+zrep*.5,zrep)-zrep*.5;
    //p.xy *= r2d(p.z*.25+time*.5*sign(sin(zindex*10.)));
    p.xy += vec2(sin(p.z*.5)*1.);

    p.xy *= r2d(zindex);
    p.z = z;
    float f = zindex+time;
    p.xy += vec2(sin(f), cos(f))*(sin(time*.25)*.5+.5);//*.2;
    //p.y -= .4;
    float an = atan(p.y, p.x);
    float astp = 3.14159265*2./(5.*sin(time*.5));
    float sector = mod(an+astp*.5, astp)-astp*.5;
    p.xy = vec2(sin(sector), cos(sector))*length(p.xy);
    acc = _min(acc, vec2(length(p.yz-vec2(1.5+FFT(zindex*.2)*.2+(sin(zindex*1.)*.5+.5)*7., .5*sin(p.x*.4*sin(time*.25)+time*10.)))-.0001, 0.));

    return acc;
}

vec3 getNormglowwyy(vec3 p, float d)
{
    vec2 e = vec2(0.01,0.);
    return normalize(vec3(d)-vec3(mapglowwyy(p-e.xyy).x, mapglowwyy(p-e.yxy).x, mapglowwyy(p-e.yyx).x));
}
vec3 accLight;
vec3 traceglowwyy(vec3 ro ,vec3 rd, int steps)
{
    accLight = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i< 128; ++i)
    {
        vec2 res = mapglowwyy(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        vec3 rgb = vec3(.5+.2*sin(p.z+time*8.), sin(p.z)*.1+.1,sin(p.z*5.)*.5+.5);
        accLight += .05*rgb*(1.-sat(res.x/mix(0.6,.5, FFT(.3))));
        p+=rd*res.x*.15;
    }
    return vec3(-1.);
}

vec3 rdrglowwyy(vec2 uv)
{
    vec3 col = vec3(0.);
    float d= 1.;
    float t = time;
    vec3 ro = vec3(sin(t)*.5,0.,-5.);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd = normalize(ta-ro);
    rd = getCamglowwyy(rd, uv);

    vec3 res = traceglowwyy(ro, rd, 128);
    vec3 dirGlow = accLight;
    if (res.y > 0.)
    {

        vec3 p = ro+rd*res.y;
        vec3 n = getNormglowwyy(p, res.x);
        col = n*.5+.5;
        col = vec3(1.);
    }
    col += dirGlow;
    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.xx;
    uv *= (1.+length(uv)*80.);
    vec3 col = rdr(uv);
    col.xy *= r2d(time+FFT(1.)*5.);
    col.xy = abs(col.xy);
    col = pow(col, vec3(1./2.2));
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

// To replace missing behavior in veda
vec4 textureRepeat(sampler2D sampler, vec2 uv)
{
  return texture2D(sampler, mod(uv, vec2(1.)));
}

#endif // !TOOLS_INCLUDE



vec3 rdrlsdwormhole(vec2 uv)
{
  vec3 col;
  float t = time*.1+uv.x*2.*sin(time)+uv.y*4.*sin(time);
  float tt = time;//*(1.+.05*sin(time*.2));
  float blur = 2.*mix(0.01,0.001,sin(time*.2)*.5+.5);
  float l = pow(length(uv),.1)*1.;
  uv += vec2(sin(t+l),cos(t+l))*.2*pow(length(uv),.5);
  col = textureRepeat(greyNoise, vec2(0.1*atan(uv.y, uv.x)/PI, .05*tt+blur/length(uv))).xyz;
vec3 col2 = textureRepeat(greyNoise, -vec2(.2*atan(uv.y, uv.x)/PI, .05*tt+.001/length(uv))).xyz;

  return vec3(.9,.12,.38)*col2*.8+.1*col*pow(length(uv),.5)*vec3(.5,.3,.7)*max(dot(uv, vec2(1.)),.5)
  + 3.5*pow(1.-sat(lenny(uv*.5)),5.)*vec3(.32,.45,.65);
}

/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = fragCoord.xy / iResolution.xx;
uv -= vec2(.5)*iResolution.xy/iResolution.xx;
    uv += vec2(sin(time)*.1, cos(time*.2)*.1);
uv*=1.5;
vec3 col = rdr(uv);
col = mix(col, col.xzy,sin(5.*length(uv)+time*2.)*1.);
    col *= pow(sat(1.-lenny(uv*.05)), 20.);

col = pow(col, vec3(1./1.2));
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
    col = mix(col, textureRepeat(greyNoise, uv).xyz, .5);
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

// To replace missing behavior in veda
vec4 textureRepeat(sampler2D sampler, vec2 uv)
{
  return texture2D(sampler, mod(uv, vec2(1.)));
}

#endif // !TOOLS_INCLUDE



vec2 _max(vec2 a, vec2 b)
{
    if (a.x > b.x)
        return a;
    return b;
}

vec2 maptunnelpsy(vec3 p)
{
    vec3 op = p;
    vec2 acc = vec2(1000.,-1.);

    float an = atan(p.y, p.x);
    p.xy -= vec2(sin(p.z+time), cos(p.z*.5+time))*.5;
    p.y += sin(p.z*2.+time)*.1;
    float rad = FFT(abs(p.z*.001))*.25;
    vec2 tube = vec2(-(length(p.xy)-2.-rad+sin(p.z*.25)), 0.);
    acc = _min(acc, tube);

    //acc = _min(acc, _max(tube, vec2((sin(an*1.+op.z*3.)-.8), 1.)));

    return acc;
}
vec3 accColtunnelpsy;
vec3 tracetunnelpsy(vec3 ro, vec3 rd, int steps)
{
    accColtunnelpsy = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 256; ++i)
    {
        vec2 res = maptunnelpsy(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
       // if (res.y == 1.)
            accColtunnelpsy += vec3(1., .5, sin(p.z)*.5+.5)*pow(1.-sat(res.x/.7), 30.)*.3;
        p += rd*res.x*.7;
    }
    return vec3(-1.);
}
vec3 getCamtunnelpsy(vec3 rd, vec2 uv)
{
    float fov = 1.;
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec3 getNormtunnelpsy(vec3 p, float d)
{
    vec2 e = vec2(0.01, 0.);
    return normalize(vec3(d)-vec3(maptunnelpsy(p-e.xyy).x, maptunnelpsy(p-e.yxy).x, maptunnelpsy(p-e.yyx).x));
}


vec3 rdrtunnelpsy2(vec2 uv)
{
    vec3 col = vec3(1.);
    float t= time*2.;
    vec3 ro = vec3(sin(time)*.15,cos(time*.5)*.12,-12.+t);
    vec3 ta = vec3(0.,0.,0.+t);
    vec3 rd = normalize(ta-ro);
    rd.xz *= r2d(sin(time*.5)*.15);
    rd.yz *= r2d(sin(time+.5)*.15);
    rd = getCamtunnelpsy(rd, uv);
    vec3 res = tracetunnelpsy(ro, rd, 256);
    if (res.y > 0.)
    {
        vec3 p = ro+rd*res.y;
        vec3 n = getNormtunnelpsy(p, res.x);
        col = n*.5+.5;
        vec3 lpos = vec3(0.);
        vec3 ldir = p-lpos;
        col = sat(dot(normalize(ldir), n))*vec3(1.);
        col += accColtunnelpsy;
        col = pow(col, vec3(3.));
        float an = atan(p.y, p.x);
        vec2 rep = vec2(.9, .5);
        vec2 luv = vec2(an, p.z+time);
        vec2 id = floor((luv+.5*rep)/rep);
        luv.x += sin(id.y*.5)*time*2.;
        luv = mod(luv+.5*rep, rep)-.5*rep;
        float shape = _sqr(luv, vec2(5.4*pow(FFT(abs(id.y*.01)),5.), .05));
        vec3 rgb = mix(col, vec3(1.), 1.-sat(shape*50.));
        rgb += pow(FFT(.0),2.)*2.*vec3(1., .5, sin(p.z*10.)*.5+.5)*(1.-sat(shape*1.))*(1.-sat(length(uv*1.)));
        col = mix(col, rgb, sin(time*5.+p.z*.5)*.5+.5);
        col += 0.2*textureRepeat(greyNoise, vec2(atan(p.y, p.x)*2., length(p.xy*.1)-.25*time)*.1).xyz;
        col = mix(col, col.zyx, sin(time*1.+p.z*.1)*.5+.5);
        //col = mix(col, col*texture(iChannel0, vec2(atan(p.y, p.x)*2., length(p.xy*.1)-time)*.25).xxx, 1.-sat(length(uv*2.)));

    }

    return col;
}

vec2 messupUVtunnelpsy(vec2 uv)
{
       vec2 ouv = uv;
    uv += vec2(.1, 0.);
    uv.x = abs(uv.x);
    uv *= r2d(time*.25);
    //uv += vec2(.3, 0.);
    uv.y = abs(uv.y);
    uv *= r2d(-time*.5);
     uv *= r2d(.2*time+uv.x);
    uv *= sin(time*.15);

    vec2 uv3 = uv*15.*uv.yx*r2d(length(uv));
    return mix(mix(ouv, uv, sin(time*.2)), uv3, sin(time*.1));
}
vec3 rdrtunnelpsy(vec2 uv)
{
  //uv = messupUVtunnelpsy(uv);
  vec3 col = rdrtunnelpsy2(uv);
  return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-vec2(.5)*iResolution.xy)/iResolution.xx;
    //uv = messupUV(uv);
    vec3 col = rdr(uv);

    fragColor = vec4(col,1.0);
}*/




void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    if (MIDI_FADER(0) > 0.01)
      col += MIDI_FADER(0)*rdrdnbtunnel(uv)*2.;

    if (MIDI_FADER(1) > 0.01)
      col += MIDI_FADER(1)*rdrglowwyy(uv)*2.;
      if (MIDI_FADER(2) > 0.01)
        col += MIDI_FADER(2)*rdrlsdwormhole(uv)*2.;
        if (MIDI_FADER(3) > 0.01)
          col += MIDI_FADER(3)*rdrmackjampsy(uv)*2.;
          if (MIDI_FADER(4) > 0.01)
            col += MIDI_FADER(4)*rdrmackjamtunnel(uv)*2.;
            if (MIDI_FADER(5) > 0.01)
              col += MIDI_FADER(5)*rdrkarenn(uv)*2.;
              if (MIDI_FADER(6) > 0.01)
                col += MIDI_FADER(6)*rdrtunnelpsy(uv)*2.;
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);


    gl_FragColor = vec4(col, 1.0);
}

