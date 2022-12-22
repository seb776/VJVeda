#include "../tools.glsl"

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
        q -= vec3(5.,sin(z+mtime)*.05,z);
        sp = min(sp, sph(q, 1.5+sin(z+mtime)));
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
        vec2 p = uv*r2d(fi*5.+mtime*fi*.1);
        float an = atan(p.y, p.x);
        float rep = TAU/(5.+float(i));
        float b = mod(an+mtime*.1+.5*rep, rep)-.5*rep;
        p = vec2(sin(b), cos(b))*length(p);
        acc = min(acc, abs(_sqr(p-vec2(0.,.1)*(1.+fi*3.+.1*sin(fi*15.+mtime)), vec2(.03)*pow(1.-fi, .75)))-.001);
    }
    col = mix(col, vec3(1.), 1.-sat(acc*400.*(sin(mtime*.25)*.5+.5)));
    //col += vec3(0.620,0.886,1.000)*pow(1.-sat(acc*10.), 5.);
    col = pow(col, vec3(2.));
    return col;
}

vec3 rdr3Dbubblestunnel(vec2 uv)
{
vec3 col;
  vec3 orig = vec3(0.,10.*sin(mtime)*0.,-20.+mod(mtime*15., 30.));
  vec3 lookatpos = vec3(sin(mtime), 0., cos(mtime))*50.*0.;
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
      vec3 lPos = 3.*vec3(sin(mtime),cos(mtime),sin(mtime*5.)*5.+4.);
      float val = sat(dot(norm,normalize(lPos-p)));

      col= mix(vec3(1.,.5,.5), .5*vec3(4, 100, 209)/255., 1.-pow(val,.25))+vec3(1.)*pow(val,2.);
        break;
    }
    p+= dir*d;
  }
  vec3 colB = 1.5*(1.-sat(lenny(uv*vec2(1.,3.))))*(vec3(4, 150, 209)/255.);
  col += mix(colB, colB.xzy, sin(mtime));
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
  uv *= r2d(length(uv)*sin(mtime));
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
  uv *= r2d(length(uv)*sin(mtime));
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
