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


float _sub(float a, float b)
{
  return max(a,-b);
}
float _cir(vec2 uv, float sz)
{
  return length(uv)-sz;
}

float _loz(vec2 uv,float sz)
{
  return lenny(uv)-sz;
}

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




void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;
    _seed = texture2D(greyNoise, gl_FragCoord.xy/resolution.xy).x+time;

    uv +=  (vec2(rand(), rand())-.5)*FFTlow*.2;
    vec3 col = vec3(0.);

    //col = vec3(1.,0.,0.)*pow(FFT(uv.x),1.);
    if (MIDI_FADER(0) > 0.01)
      col += MIDI_FADER(0)*rdrbubblestunnel(uv)*2.;
/*
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
*/
    float flicker = 1./16.;
    col = mix(col, col+vec3(1.,.2,.5)*(1.-sat(length(uv))), MIDI_BTN_S(0)*mod(time, flicker)/flicker);


    gl_FragColor = vec4(col, 1.0);
}
