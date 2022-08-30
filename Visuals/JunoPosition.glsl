#include "../tools.glsl"

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
