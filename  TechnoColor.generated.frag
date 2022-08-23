precision mediump float;

#ifndef TOOLS_INCLUDE
#define TOOLS_INCLUDE

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x



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
float _sqr(vec2 p, vec2 s)
{
    vec2 l = abs(p)-s;
    return max(l.x, l.y);
}
float lenny(vec2 v)
{
    return abs(v.x)+abs(v.y);
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

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x



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
float _sqr(vec2 p, vec2 s)
{
    vec2 l = abs(p)-s;
    return max(l.x, l.y);
}
float lenny(vec2 v)
{
    return abs(v.x)+abs(v.y);
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

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x



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
float _sqr(vec2 p, vec2 s)
{
    vec2 l = abs(p)-s;
    return max(l.x, l.y);
}
float lenny(vec2 v)
{
    return abs(v.x)+abs(v.y);
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

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform sampler2D midi;

uniform sampler2D greyNoise;
#define FFTI(a) time

#define sat(a) clamp(a, 0., 1.)
#define FFT(a) texture2D(spectrum, vec2(a, 0.)).x



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
float _sqr(vec2 p, vec2 s)
{
    vec2 l = abs(p)-s;
    return max(l.x, l.y);
}
float lenny(vec2 v)
{
    return abs(v.x)+abs(v.y);
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
      /*
    if (MIDI_FADER(3) > 0.01)
      col += MIDI_FADER(3)*rdrtunneldnb(uv)*2.;
    if (MIDI_FADER(4) > 0.01)
      col += MIDI_FADER(4)*rdrtunnelbars(uv)*2.;
      */
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);


    gl_FragColor = vec4(col, 1.0);
}
