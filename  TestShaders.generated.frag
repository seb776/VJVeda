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



float _star(vec2 uv, float sz, float t)
{
  float a = atan(uv.y,uv.x);
  float stp = PI*2./4.;
  float sector = mod(a+stp*.5,stp)-stp*.5;
  uv = vec2(sin(sector),cos(sector))*length(uv);
  return _sqr(uv-vec2(0.,sz*2.), vec2(sz*.05,sz));
}

vec3 rdrtunneltargets3(vec2 uv, float sharp)
{
  uv*=.5;
  vec2 ouv = uv;

  vec3 col = vec3(0.);
  float shp = 400.*sharp;

  vec2 rep = vec2(.5);
  vec2 id = floor((uv+rep*.5)/rep);
  uv = mod(uv+rep*.5,rep)-rep*.5;
  uv*=r2d(sin(time+id.x));

  float sz = .05;
  float maska = sat(sin(id.x*5.+id.y*100.+id.y*5.+length(uv)*15.-time*5.));
  float cir = abs(length(uv)-sz*2.)-.001;
  col = maska*vec3(1.)*(1.-sat(_star(uv,sz,0.)*shp));
  col = mix(col,vec3(1.),maska*(1.-sat(cir*shp)));
  col += maska*.5*vec3(1.)*smoothstep(0.,1.,
    1.-sat(_star(uv,sz,0.)*20.*sharp));
  col += maska*.5*vec3(1.)*(1.-sat(cir*20.*sharp));
  col*=vec3(sin(length(id))*.2+.7,.5,.1);
  return col;
}

vec3 rdr2rdrtunneltargets(vec2 uv,vec2 ouv)
{

  vec3 col=rdrtunneltargets3(uv*1.5,1.);
  col+= rdrtunneltargets3(uv*.5+.1,.25).zxy*.5;
  col+= rdrtunneltargets3(uv*2.5+.1,.2).xxx*vec3(.75,.2,.7)*.15;
 col = col*1.5;
 vec3 rgb = vec3(.1,.7,.7);
 rgb.xy*=r2d(time);
 rgb= abs(rgb);
 col = mix(col, rgb*2.,
   pow(sat(.05/length(ouv)),1.));
  return col;
}

vec3 rdrtunneltargets(vec2 uv)
{
  vec2 ouv = uv;
 // uv.x += sin(length(uv)+time)*.5;
  uv*=r2d(.1*sin(.5*time+5.*length(uv))/length(uv));
  uv = vec2(5.*atan(uv.y,uv.x)/PI,1./length(uv)+5.*time);
  vec3 col=rdr2rdrtunneltargets(uv,ouv);
  col = pow(col, vec3(1.4));
  return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

  vec2 uv = (fragCoord.xy-.5*iResolution.xy) /iResolution.xx;
  vec2 ouv = uv;
 // uv.x += sin(length(uv)+time)*.5;
  uv*=r2d(.1*sin(.5*time+5.*length(uv))/length(uv));
  uv = vec2(5.*atan(uv.y,uv.x)/PI,1./length(uv)+5.*time);
  vec3 col=rdr2(uv,ouv);
  col = pow(col, vec3(1.4));
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



vec2 repeatpsysym(vec2 p, vec2 sp)
{
  return mod(p,sp)-sp/2.;
}

 float sdf_rect(vec2 uv, vec2 sz)
{
  vec2 r = abs(uv)-sz;
  return max(r.x,r.y);
}


vec3 rdrpsysym2(vec2 uv)
{
  vec3 cols[4];

  cols[0] = vec3(196.,1.,44.)/255.;
  cols[1] = .0*vec3(1.,44.,196.)/255.;
  cols[2] = vec3(1.,196.,153.)/255.;
  cols[3] = vec3(196.,153.,1.)/255.;
      #define COL_ACCESS_PSYSYM(A) (cols[0] * float(A == 0) + cols[1] * float(A == 1) + cols[2] * float(A == 2) + cols[3] * float(A == 3))
  float fidx= mod(-time+length(uv)*4.+.2*-abs(sin(50.*atan(uv.y,uv.x)/PI))
    +abs(0.1*sin(time*5.+sin(uv.x*5.)*179.7*atan(uv.y,uv.x)/PI))
      ,4.);
  int curIdx=int(fidx);
  vec3 bubbles = vec3(uv,.5)*(1.-sat(50.*_cir(repeatpsysym(uv*(sin(time*.5)*.2+.5)*r2d(.5*sin(uv.y*2.+time*.5)),vec2(.1)),.02)));
  return bubbles+vec3(.3)+mix(COL_ACCESS_PSYSYM(curIdx), COL_ACCESS_PSYSYM(int(mod(float(curIdx)+1.,4.))), fract(fidx));
}

vec3 rdrScnpsysym(vec2 uv)
{
  vec2 uvc = vec2(abs(uv.x),uv.y*sign(uv.x));
  vec2 uvcir =uvc- vec2(.0);
  float acir = atan(uvcir.y,uvcir.x)/PI;
  vec2 pcir = vec2(sin(time),cos(time*.7))*.5;
  float cir = (1.-sat(_cir(uv+pcir,.5)*200.))*float(acir<.7*sin(10.*-time+length(uvcir)*20.));;


  return vec3(abs(uv),.5)*cir*2.;
}

vec3 rdrDotpsysym(vec2 uv, float szmin, float szmax)
{
  vec2 ouv = uv;
  uv = vec2(int(uv.x/szmax),int(uv.y/szmax))*szmax;
  vec3 col = rdrScnpsysym(uv);

  return col*(1.-sat((length(ouv-uv-vec2(.5*szmax*sign(uv.x),.5*szmax*sign(uv.y)))-mix(szmin,(szmax-.1*szmax)*.5,col.x))*200.*(col.x+.1)));
}

float sdCross(vec2 p, float sz)
{
  vec2 sz2 = vec2(sz,sz/3.);
  float a = sdf_rect(p,sz2);
  float b = sdf_rect(p,sz2.yx);

  return min(a,b);
}

vec3 rdrCross(vec2 uv)
{
  vec3 acc;

  for (int i = 0;i<16;++i)
  {
    float fi = float(i);
    float px = sin(fi)*.5;
    vec2 pos= vec2(px,sin(px*2.+time)+mod((fi-4.)*5.,.53));
    vec2 p = (uv-vec2(pos))*r2d(sin(time*.5+float(i)));

    float sd = sat(sdCross(p,.1*fi*.3)*200.);
    float sdHalo = sat(sdCross(p,.1*(fi*.2))*5.);
    float sd2 = sat(sdCross(p,.08*(fi*.3))*200.);

    acc*= sd;
    acc+= vec3(1.)*(sd2*(1.-sd))+(1.-sdHalo)*sd*vec3(uv.xyx*.5+.5);
  }
  return acc;
}

vec3 rdrpsysyma(vec2 uv)
{
  vec3 opsy = rdrpsysym2(uv*r2d(-time));
  uv = abs(uv);
  uv = uv*r2d(20.*atan(uv.y,uv.x)/PI);
  uv= uv+(vec2(.1)*r2d(-time));
  float sel = float(mod(time,.4)<.2);
  vec3 col = rdrDotpsysym((uv+vec2(.3))*r2d(time),.02,mix(.05,.01,sel));
  vec3 c2 = rdrCross(uv);

  return mix(col,c2,c2.x)+rdrpsysym2(uv).yxz-opsy.zyx*.5;
}

vec3 rdrpsysym(vec2 uv)
{
  uv*=2.+(sin(time)*.5+.5);
    vec3 col = rdrpsysyma(uv);
      //uv.x += .5;
      float rad = length(uv)-.1;
      float an = abs(atan(uv.y, uv.x)/PI);
      vec3 col2 = col*float(rad < textureRepeat(greyNoise, vec2(int((an)*512.), 0.)).x)*.5;
      vec3 outcol = sat(1.-lenny(uv*.5))*col.zxy*.5+col2.zxy;
  //    outcol = pow(outcol, vec3(1./2.2));

      float fadeIn = clamp(time,0.,3.)/3.;
    //fragColor = vec4(outcol*fadeIn, 1.0);
    return outcol*fadeIn;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = fragCoord.xy / iResolution.xx;
  uv -= vec2(.5)*iResolution.xy/iResolution.xx;
uv*=2.+(sin(time)*.5+.5);
  vec3 col = rdr(uv);
    //uv.x += .5;
    float rad = length(uv)-.1;
    float an = abs(atan(uv.y, uv.x)/PI);
    vec3 col2 = col*float(rad < texelFetch(iChannel0, ivec2(int((an)*512.), 0), 0).x)*.5;
    vec3 outcol = sat(1.-lenny(uv*.5))*col.zxy*.5+col2.zxy;
//    outcol = pow(outcol, vec3(1./2.2));

    float fadeIn = clamp(time,0.,3.)/3.;
  fragColor = vec4(outcol*fadeIn, 1.0);
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



float getVolume()
{
    float cnt = 32.;
    float acc = 0.0;
    for (float i = 0.; i < 32.;++i)
        acc += FFT(i/cnt);
    return acc;
}
vec3 getCamgoafractal(vec3 rd, vec2 uv)
{
	float fov = (sin(time*.25)*.3+.5)*3.;
	vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
	vec3 u = normalize(cross(rd, r));
	return normalize(rd+(r*uv.x+u*uv.y)*fov);
}


float _cubegoafractal(vec3 p, vec3 s)
{
    s*= 2.;
	vec3 l =abs(p)-(s);
	return mix(max(l.x, max(l.y, l.z)), length(p)-s.x, FFT(0.)*5.);
}

vec2 mapgoafractal(vec3 p)
{
	vec2 acc = vec2(1000., -1.);
	p.xy *= r2d(p.z*.05*length(p.xy)*.2*.1*sin(time*.125));
    p.z += getVolume()*.7;
	vec3 pshape = p;
	float repay = 10.;
	float repa = 5.;
	float repz = 20.;
	float idz = floor((pshape.z+repz*.5)/repz);
	pshape.z = mod(pshape.z+time*20.+repz*.5, repz)-repz*.5;
	pshape.y = mod(pshape.y+repay*.5, repay)-repay*.5;
	pshape.x += (sin(time+pshape.y*2.)+time);
	pshape.x = mod(pshape.x+repa*.5,repa)-repa*.5;
	//pshape.xy *= r2d(-.1*sign(p.x)+idz+time*.5);
	float shape = mix(_cube(pshape, vec3(.3*(sin(time)*.2+.5), 1., .1)),
	length(pshape)-.5,
	sin(idz+time*.2*.1));
	acc = _min(acc, vec2(shape, 0.));

	vec3 pshape2 = p+vec3(0.,0.,time*13.*1.5);
	vec3 rep2 = vec3(5.);
	pshape2 = mod(pshape2+rep2*.5, rep2)-rep2*.5;
	float shape2 = _cubegoafractal(pshape2, vec3(.1));
	acc = _min(acc, vec2(shape2, 0.));

	return acc;
}

vec3 getNormgoafractal(vec3 p, float d)
{
	vec2 e = vec2(0.01, 0.);
	return normalize(vec3(d)-vec3(mapgoafractal(p-e.xyy).x, mapgoafractal(p-e.yxy).x, mapgoafractal(p-e.yyx).x));
}
vec3 accColgoafractal;
vec3 tracegoafractal(vec3 ro, vec3 rd, int steps)
{
	accColgoafractal = vec3(0.);
	vec3 p = ro;
	for (int i =0 ; i < 64; ++i)
	{
		vec2 res = mapgoafractal(p);
		if (res.x < 0.01)
			return vec3(res.x, distance(p, ro), res.y);
		accColgoafractal += vec3(1., .2, .5*(sin(p.z*10.)*.5+.5)).zyx*(1.-sat(res.x/1.5))*.02;
		p+=rd*res.x;
	}
	return vec3(-1.);
}

vec3 rdrgoafractal2(vec2 uv)
{
	vec3 col = vec3(0.);


	vec3 ro = vec3(1.,sin(time),-15.);
	vec3 ta = vec3(0.,sin(time*.0125)*14.,0.);
	vec3 rd = normalize(ta-ro);

	rd = getCamgoafractal(rd, uv);
	vec3 res = tracegoafractal(ro, rd, 256);
	if (res.y > 0.)
	{
		vec3 p = ro+rd*res.y;
		vec3 n = getNormgoafractal(p, res.x);
		col = n*.5+.5;
		col = vec3(0.8,0.4,0.3)*(1.-sat(res.y/100.));
	}
	col += accColgoafractal;
	return col;
}

vec3 rdrgoafractal(vec2 uv)
{
  vec2 ouv = uv;


	uv -= vec2(.0);
    uv *= asin(sin(time*.25))*.2+.8;
    uv *= r2d(length(uv)*5.*sin(time*.25)*.5);
	float a = atan(uv.y, uv.x);
	float stp = 3.14159265*2./(3.+mod(floor(time*.5), 5.));
	float b = mod(a+stp*.5,stp)-stp*.5;
	uv = vec2(sin(b), cos(b))*length(uv);

    uv = sign(sin(uv))*uv*r2d(sin(uv.x));

	vec3 col = rdrgoafractal2(uv);

	vec2 coords =uv;// mix(uv, ouv, sin(time))+vec2(time*.1,0.)*.1;
	float rep = .3;
	coords.x = mod(coords.x+rep*.5, rep)-rep*.5;
float shape = _sqr(coords, vec2(.05,.2));
//col = mix(col, col.zxy, 1.-sat(shape*400.));
col = pow(col, vec3(1.));
col.xy *= r2d(time*1.5+FFT(.5)*10.);
col.xz *= r2d(-time*1.25);
col = abs(col);
col = pow(col, vec3(.8))*FFT(.1);
col += pow(col, vec3(2.5))*FFT(.5)*.5;
col += pow(col, vec3(2.75))*FFT(.85)*4.;
//col *= FFT(0.);
col = pow(col, vec3(1.5));
col *= 1.-sat((2.-time)/2.);
col *= FFT(getVolume())+.2;
	//fragColor = vec4(col*15., 1.0);
  return col*15.;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	vec2 uv = (fragCoord.xy-.5*iResolution.xy)/iResolution.xx;
	vec2 ouv = uv;


	uv -= vec2(.0);
    uv *= asin(sin(time*.25))*.2+.8;
    uv *= r2d(length(uv)*5.*sin(time*.25)*.5);
	float a = atan(uv.y, uv.x);
	float stp = 3.14159265*2./(3.+mod(floor(time*.5), 5.));
	float b = mod(a+stp*.5,stp)-stp*.5;
	uv = vec2(sin(b), cos(b))*length(uv);

    uv = sign(sin(uv))*uv*r2d(sin(uv.x));

	vec3 col = rdr(uv);

	vec2 coords =uv;// mix(uv, ouv, sin(time))+vec2(time*.1,0.)*.1;
	float rep = .3;
	coords.x = mod(coords.x+rep*.5, rep)-rep*.5;
float shape = _sqr(coords, vec2(.05,.2));
//col = mix(col, col.zxy, 1.-sat(shape*400.));
col = pow(col, vec3(1.));
col.xy *= r2d(time*1.5+FFT(.5)*10.);
col.xz *= r2d(-time*1.25);
col = abs(col);
col = pow(col, vec3(.8))*FFT(.1);
col += pow(col, vec3(2.5))*FFT(.5)*.5;
col += pow(col, vec3(2.75))*FFT(.85)*4.;
//col *= FFT(0.);
col = pow(col, vec3(1.5));
col *= 1.-sat((2.-time)/2.);
col *= FFT(getVolume())+.2;
	fragColor = vec4(col*15., 1.0);
	//gl_FragColor = vec4(gl_FragCoord.xy / iResolution, cos(time), 1.0);
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





void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    if (MIDI_FADER(0) > 0.01)
      col += MIDI_FADER(0)*rdrtunneltargets(uv)*2.;

    if (MIDI_FADER(1) > 0.01)
      col += MIDI_FADER(1)*rdrpsysym(uv)*2.;

      if (MIDI_FADER(2) > 0.01)
        col += MIDI_FADER(2)*rdrgoafractal(uv)*2.;

        if (MIDI_FADER(3) > 0.01)
          col += MIDI_FADER(3)*rdrdnbcorridor(uv)*2.;
          /*
          if (MIDI_FADER(4) > 0.01)
            col += MIDI_FADER(4)*rdrmackjamtunnel(uv)*2.;
            if (MIDI_FADER(5) > 0.01)
              col += MIDI_FADER(5)*rdrkarenn(uv)*2.;
              if (MIDI_FADER(6) > 0.01)
                col += MIDI_FADER(6)*rdrtunnelpsy(uv)*2.;
                */
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);


    gl_FragColor = vec4(col, 1.0);
}

