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





vec3 lookatdnbtriangle(vec2 uv, vec3 dir)
{
  float fov = 5.;
  uv *= fov;
  dir = normalize(dir);
  vec3 right = normalize(cross(dir, vec3(0.,1.,0.)));
  vec3 up = normalize(cross(dir, right));

  return dir + uv.x * right + uv.y*up;
}

float mapdnbtriangle(vec3 p)
{
   float ax = time+atan(p.y, p.x);
    float ay = -time+atan(p.z, p.y);
    float stepval = EPS.x;
    float snd = FFT(abs(p.x));//texelFetch(greyNoise, ivec2(int(abs(p.x)*1.), 0), 0).x;


    return -p.y +5.+ 5.*snd+(3.*textureRepeat(greyNoise, p.xz*.002+time*0.002).x+3.*textureRepeat(greyNoise, p.xz*.0002+time*0.002).x);

    //
   if (p.y < 5.-2.*pow(textureRepeat(greyNoise, p.xz*.002+time*0.002).x, .5)*pow(textureRepeat(greyNoise, p.xz*.0005).x, .5))//  -.1*sin(p.z)+.5*sin(p.z+sin(p.x))+.3*sin(p.x*.5+p.z)+sat(sin(p.x*2.3))*.01*sin(p.x*50.);
   return EPS.x*100.;
    return -EPS.x*1.;
}

vec3 getNormaldnbtriangle( vec3 p )
{
    float d = 8.;
    return normalize( vec3( mapdnbtriangle(p-d*EPS.xyy) - mapdnbtriangle(p+d*EPS.xyy),
                            d*EPS.x,
                            mapdnbtriangle(p-d*EPS.yyx) - mapdnbtriangle(p+d*EPS.yyx) ) );
}

vec3 normaldnbtriangle(vec3 p, float d)
{
	return getNormaldnbtriangle(p);
  float xPos = mapdnbtriangle(p-EPS.xyy);
  float yPos = mapdnbtriangle(p-EPS.yxy);
  float zPos = mapdnbtriangle(p-EPS.yyx);
  //return (vec3(xPos, yPos,zPos)-d)/EPS.x;
  return vec3(mapdnbtriangle(p-EPS.xyy)-mapdnbtriangle(p+EPS.xyy),
    mapdnbtriangle(p-EPS.yxy)-mapdnbtriangle(p+EPS.yxy),
    mapdnbtriangle(p-EPS.yyx)-mapdnbtriangle(p+EPS.yyx));
}

vec3 blinndnbtriangle(vec3 L, vec3 N, vec3 V, vec3 p)
{
    vec3 LpV = L + V;
    vec3 H = LpV/ length(LpV);
    float NdotL = dot(N, L);

    vec3 sunambient = sat(dot(N, vec3(0.,-1.,1.)))*vec3(.23,.34,.57)*2.;
    vec3 diffuse = sat(NdotL) * vec3(.5,.2,.75) * 50./length(LpV);

    float NdotH = dot(N, H);

    vec3 spec = pow(sat(NdotH), 1.)*vec3(.4,.6,.9)*2.;
    float snd = FFT(abs(p.x));//texelFetch(iChannel1, ivec2(int(abs(p.x)*1.), 0), 0).x;
    return (diffuse+sunambient+spec)*(2.-mod(length(vec2(0.,-2.)+p.xz*.05)+time+snd*5., 2.))*.5;
}

vec4 rdr3Ddnbtriangle(vec2 uv)
{
  vec3 orig = vec3(0.,.5+sin(time)*.5+sin(time*.35),-5);
  vec3 lookatpos = vec3(0.);
  vec3 dir = normalize(lookatdnbtriangle(uv, lookatpos-orig));
  vec3 p = orig + dir;

  for (int i = 0; i <512;++i)
  {
    float d = mapdnbtriangle(p);

    if (d < EPS.x)
    {

      vec3 norm = normalize(normaldnbtriangle(p,d));
      //turn vec4(norm*.5+.5,1.);
             vec3 lPos = 15.*vec3(sin(time),5., cos(time));
        return vec4(blinndnbtriangle(lPos-p, norm, orig-p, p), 1.);
        /*

        vec3 OL = ;
        vec3 CamO = ;
        vec3 refl = normalize(reflect(CamO, norm));
        return vec4(vec3(1.)*pow(sat(dot(refl, OL)), 5.) ,1.);
        */
       //rern vec4(dot(norm,normalize(lPos-p))*vec3(1.),1.);
    }
    p+= dir*0.1;
  }
  return vec4(0.);
}

vec3 rdrScndnbtriangle(vec2 uv)
{
  vec3 land;
  vec3 light = .5*vec3(239,114,116)/255.;
   // float coef =
  land = mix(light,vec3(.1,.1,.2),sat(1.-length(uv)));
  vec4 col = rdr3Ddnbtriangle(uv);
  land = mix(land, col.xyz, col.w);
  return land;
}

vec3 rdrdnbtriangle(vec2 uv)
{
  //  uv*= 4.2; // horizontal
  uv*= 4.2; //vertical

      //uv.x = abs(uv.x);

      vec2 newUv2 = vec2(.5*mod(atan(uv.x, uv.y), .7*PI*1.)/PI, 0.1/(-length(uv)));
      vec2 newUv = vec2(.5*atan(uv.x, uv.y)/PI, .1*(-length(uv)));
    vec3 col;// = rdrScn(newUv);
  col += rdrScndnbtriangle(newUv2);
       col += (1.-sat(lenny(uv*vec2(.4,1.))))*vec3(.23,.12,.34)*5.;
  col *= 1.-length(uv*.5);
  col = pow(col, vec3(2.));
  return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = fragCoord.xy / iResolution.xx;
  uv -= vec2(.5)*iResolution.xy/iResolution.xx;
//  uv*= 4.2; // horizontal
uv*= 4.2; //vertical

    //uv.x = abs(uv.x);

    vec2 newUv2 = vec2(.5*mod(atan(uv.x, uv.y), .7*PI*1.)/PI, 0.1/(-length(uv)));
    vec2 newUv = vec2(.5*atan(uv.x, uv.y)/PI, .1*(-length(uv)));
  vec3 col;// = rdrScn(newUv);
col += rdrScn(newUv2);
     col += (1.-sat(lenny(uv*vec2(.4,1.))))*vec3(.23,.12,.34)*5.;
col *= 1.-length(uv*.5);
col = pow(col, vec3(2.));
  fragColor = vec4(col.zxy, 1.0);
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



float _sdSph(vec3 uv)
{
    // TODO sphere like freq ball done with bonzomatic
    return length(uv)-.5;
}





vec2 repeat(vec2 uv, vec2 rep)
{
    return mod(uv+0.5*rep,rep)-0.5*rep;
}

vec3 repeat(vec3 uv, vec3 rep)
{
    return mod(uv+0.5*rep,rep)-0.5*rep;
}

float _trees(vec2 uv, float sz, float rep)
{
    uv = repeat(uv, vec2(rep+0.05*sin(uv.y*2.+1.5), 5.));
    return _sqr(uv, vec2(sz, 2.));
}

float _cyl(vec3 p, vec3 a, vec3 b, float r)
{
    vec3  ba = b - a;
    vec3  pa = p - a;
    float baba = dot(ba,ba);
    float paba = dot(pa,ba);
    float x = length(pa*baba-ba*paba) - r*baba;
    float y = abs(paba-baba*0.5)-baba*0.5;
    float x2 = x*x;
    float y2 = y*y*baba;

    float d = (max(x,y)<0.0)?-min(x2,y2):(((x>0.0)?x2:0.0)+((y>0.0)?y2:0.0));

    return sign(d)*sqrt(abs(d))/baba;
}

vec3 lookAtfirstdnbvisual(vec3 dir, vec2 uv)
{
  dir = normalize(dir);
  vec3 right = -normalize(cross(dir, vec3(0., 1., 0.)));
  vec3 up = normalize(cross(dir, right));
vec2 fov = vec2(2.);
  return dir+right*uv.x*fov.x+up*uv.y*fov.y;
}
float rng(float a, float mi, float ma)
{
    return float(a > mi && a < ma);
}

vec3 texCross(vec2 uv)
{
    uv += .5*vec2(sin(time), cos(time));
    uv *= r2d(time);
    uv *= 3.;
    uv = repeat(uv, vec2(1.));
    float coef = min(_sqr(uv, vec2(.01, .2)), _sqr(uv, vec2(.01, .2).yx));
    return (1.-sat(coef*200.))*vec3(.34,.43,.56);
    return vec3(0.);
}

float mapfirstdnbvisual(vec3 p)
{

    p.xy *= r2d(time);
    p = repeat(p, vec3(2.));
    //p.yz *= r2d(time);
    float len = 5.;
    float rad = .5;
    float a = _cyl(p, vec3(0.,-len, 0.), vec3(0.,len, 0.), rad);
    float b = _cyl(p, vec3(-len, 0., 0.), vec3(len, 0., 0.), rad);
    float c = _cyl(p, vec3(0.,0.,-len), vec3(0.,0.,len), rad);
    return min(a, min(b, c));
}

vec3 rdr3Dfirstdnbvisual(vec2 uv)
{
    vec3 lookAtPos = vec3(0.);
    vec3 orig = vec3(sin(time), cos(time), -2.5);
    vec3 dir = lookAtfirstdnbvisual(lookAtPos - orig, uv);
    vec3 p = orig + dir;
    float dist = 0.;
    for (int i = 0; i < 256; ++i)
    {
        float d = mapfirstdnbvisual(p);
        if (d < 0.001)
        {
            return vec3(.5)*sat(dist);
        }
        dist += d;
        p += dir * d*0.999;
    }
    return vec3(0.);
}

vec3 rdrScnfirstdnbvisual(vec2 uv)
{
  vec3 land;
  vec3 light = vec3(100.,200.,197.)/255.;
  land = mix(vec3(.1,.1,.2),light,sat(.0+sat(1.-length(uv))));

  float trees = _trees(uv+vec2(time, 0.).yx, 0.05+sin(time+uv.x)*.1, 0.3);

  //land += .2*vec3(.5,.7,.74)*(sat(trees*20.));
land += light*sat(1.-lenny(uv*.5))*(sin(time+uv.x+PI)*.5+.5);
    vec3 blackStripsCol = texCross(uv)*(1.-sat(trees*250.));
  return land+rdr3Dfirstdnbvisual(uv)*(sat(.8+sat(trees*50.)))+blackStripsCol*.5;
}

vec3 rdrfirstdnbvisual(vec2 uv)
{
  //  uv*= 4.2; // horizontal
  uv*= 3.2+smoothstep(0., .439, mod(time,.4389))*.1; //vertical
      uv *= r2d(PI/12.);
    vec3 col = rdrScnfirstdnbvisual(uv);


    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    time = time*.2;
  vec2 uv = fragCoord.xy / iResolution.xx;
  uv -= vec2(.5)*iResolution.xy/iResolution.xx;
//  uv*= 4.2; // horizontal
uv*= 3.2+smoothstep(0., .439, mod(time,.4389))*.1; //vertical
    uv *= r2d(PI/12.);
  vec3 col = rdrScn(uv);


  fragColor = vec4(col, 1.0);
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


//#include "Visuals/LostStructures.glsl" // Bugged



void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    if (MIDI_FADER(0) > 0.01)
      col += MIDI_FADER(0)*rdrbubblestunnel(uv)*2.;

    if (MIDI_FADER(1) > 0.01)
      col += MIDI_FADER(1)*rdrdnbtriangle(uv)*2.;

      if (MIDI_FADER(2) > 0.01)
        col += MIDI_FADER(2)*rdrjunoposition(uv)*2.;
/*
        if (MIDI_FADER(3) > 0.01)
          col += MIDI_FADER(3)*rdrloststructures(uv)*2.;

          if (MIDI_FADER(4) > 0.01)
            col += MIDI_FADER(4)*rdrmackjamtunnel(uv)*2.;
            if (MIDI_FADER(5) > 0.01)
              col += MIDI_FADER(5)*rdrkarenn(uv)*2.;
*/
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);


    gl_FragColor = vec4(col, 1.0);
}
