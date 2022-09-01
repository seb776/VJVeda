#include "../tools.glsl"

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
