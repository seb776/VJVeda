#include "../tools.glsl"

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
