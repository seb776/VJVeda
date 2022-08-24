#include "../tools.glsl"

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
