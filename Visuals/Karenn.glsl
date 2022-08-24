
// DOne based on Karenn - Crush the mushroom song

#include "../tools.glsl"

vec2 mapkarenn(vec3 p)
{
    vec2 acc = vec2(1000., -1.);

    float repa = 2.0*PI/21.;

    vec3 q = p;
    float a = atan(q.y, q.x);

    //a = mod(a+repa*.5,repa)-repa*.5;
    float sector = floor(a/repa);

    q.xy = r2d(sector*repa)*q.xy;
    q -= vec3(1.+sin(sector+_time)+FFT(sector)*2., 0.,0.);

    float repz = 5.8+sin(sector+_time*.01);

    q.z = mod(q.z+repz*.5+_time*10.+sector*2.5,repz)-repz*.5;
    //q.z *= .01;
    acc = _min(acc, vec2(max(length(q.xy),abs(q.z)-1.), 0.));

    return acc;
}

vec3 getNormkarenn(vec3 p, float d)
{
    vec2 e = vec2(0.01, 0.);
    return -normalize(vec3(d)-vec3(mapkarenn(p-e.xyy).x,mapkarenn(p-e.yxy).x,mapkarenn(p-e.yyx).x));
    //return normalize(cross(dFdx(p), dFdy(p)));
}

vec3 accColkarenn;

vec3 tracekarenn(vec3 ro, vec3 rd, int steps)
{
    accColkarenn = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 128; ++i)
    {
        vec2 res = mapkarenn(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        accColkarenn += .15*vec3(sin(p.z+_time*5.)*.5+.5, .3+.2*abs(sin(p.z*5.)),.5)*(1.-sat(res.x/.2));
        p+=rd*res.x;
    }
    return vec3(-1.);
}

vec3 rdrkarenn2(vec2 uv)
{
    vec3 col = vec3(0.,0.,0.);




    vec3 ro = vec3(0.,0.,-5.);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd = normalize(ta-ro);

    rd = getCam(rd, uv);

    vec3 res = tracekarenn(ro, rd, 128);
    if (res.y > 0.)
    {
        vec3 p = ro + res.y*rd;
        vec3 n = getNormkarenn(p, res.x);
        col = n*.5+.5;
        col = vec3(1.);
    }
    col += accColkarenn;

    float mask = length(uv)-.1;
    float a = abs(atan(uv.y, uv.x)-PI*.5);
    float coef = pow(FFT(a/PI), .5);
    col = mix(col, 2.*vec3(.5+.1*sin(coef*3.),0.361+.3*sin(coef*5.+_time),0.361+.2*sin(coef))*(sat(mask*400.)), (.5+coef)*pow(1.-sat(mask*1.), 5.));
    col = pow(col, vec3(2.2));
    return col;
}
vec3 rdrkarenn(vec2 uv)
{

      vec3 col = rdrkarenn2(mix(uv, uv*r2d(sin(length(uv)+_time)), sat((abs(uv.x)-.2)*400.)));

      col *= sat(1.-sat((abs(uv.x)-.2)*400.)+.5);
      return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    _time = texture(iChannel1, fragCoord/8.).x*.1+time;
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.xx;

    vec3 col = rdr(mix(uv, uv*r2d(sin(length(uv)+_time)), sat((abs(uv.x)-.2)*400.)));

    col *= sat(1.-sat((abs(uv.x)-.2)*400.)+.5);

    fragColor = vec4(col,1.0);
}*/
