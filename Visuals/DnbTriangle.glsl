#include "../tools.glsl"



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
