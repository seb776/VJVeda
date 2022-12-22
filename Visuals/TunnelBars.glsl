// Fork of "tunnelzefzef" by z0rg. https://shadertoy.com/view/stV3zt
// 2021-12-11 16:08:54

#include "../tools.glsl"

vec2 maptunnelbars(vec3 p)
{
  vec2 acc = vec2(1000.,-1.);

  vec3 op = p;
  float rep = 1.;
//p.z+=mtime;
float id = floor((p.z+rep*.5)/rep);
  p.z = mod(p.z+rep*.5,rep)-rep*.5;
vec2 sz = vec2(5.+sin(id*.4+mtime)*.5,.5+.3*sin(mtime+p.z));
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

  float z = mtime*10.;
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
  col.xy *=r2d(mtime);
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
