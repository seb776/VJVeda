// Fork of "halu goa" by z0rg. https://shadertoy.com/view/NsdGWH
// 2021-12-13 21:44:29
#include "../tools.glsl"


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
