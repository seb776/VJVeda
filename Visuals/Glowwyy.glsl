#include "../tools.glsl"

vec3 getCamglowwyy(vec3 rd, vec2 uv)
{
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+(r*uv.x+u*uv.y)*(1.5+.2*sin(FFT(.1)*.5+.5*time)));
}


vec2 mapglowwyy(vec3 p)
{
    vec2 acc = vec2(10000.,-1.);

    float z = time*7.+p.z+FFT(.1)*1.;
    float zrep = .5;
    float zindex = floor((z+zrep*.5)/zrep);
    z = mod(z+zrep*.5,zrep)-zrep*.5;
    //p.xy *= r2d(p.z*.25+time*.5*sign(sin(zindex*10.)));
    p.xy += vec2(sin(p.z*.5)*1.);

    p.xy *= r2d(zindex);
    p.z = z;
    float f = zindex+time;
    p.xy += vec2(sin(f), cos(f))*(sin(time*.25)*.5+.5);//*.2;
    //p.y -= .4;
    float an = atan(p.y, p.x);
    float astp = 3.14159265*2./(5.*sin(time*.5));
    float sector = mod(an+astp*.5, astp)-astp*.5;
    p.xy = vec2(sin(sector), cos(sector))*length(p.xy);
    acc = _min(acc, vec2(length(p.yz-vec2(1.5+FFT(zindex*.2)*.2+(sin(zindex*1.)*.5+.5)*7., .5*sin(p.x*.4*sin(time*.25)+time*10.)))-.0001, 0.));

    return acc;
}

vec3 getNormglowwyy(vec3 p, float d)
{
    vec2 e = vec2(0.01,0.);
    return normalize(vec3(d)-vec3(mapglowwyy(p-e.xyy).x, mapglowwyy(p-e.yxy).x, mapglowwyy(p-e.yyx).x));
}
vec3 accLight;
vec3 traceglowwyy(vec3 ro ,vec3 rd, int steps)
{
    accLight = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i< 128; ++i)
    {
        vec2 res = mapglowwyy(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        vec3 rgb = vec3(.5+.2*sin(p.z+time*8.), sin(p.z)*.1+.1,sin(p.z*5.)*.5+.5);
        accLight += .05*rgb*(1.-sat(res.x/mix(0.6,.5, FFT(.3))));
        p+=rd*res.x*.15;
    }
    return vec3(-1.);
}

vec3 rdrglowwyy(vec2 uv)
{
    vec3 col = vec3(0.);
    float d= 1.;
    float t = time;
    vec3 ro = vec3(sin(t)*.5,0.,-5.);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd = normalize(ta-ro);
    rd = getCamglowwyy(rd, uv);

    vec3 res = traceglowwyy(ro, rd, 128);
    vec3 dirGlow = accLight;
    if (res.y > 0.)
    {

        vec3 p = ro+rd*res.y;
        vec3 n = getNormglowwyy(p, res.x);
        col = n*.5+.5;
        col = vec3(1.);
    }
    col += dirGlow;
    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.xx;
    uv *= (1.+length(uv)*80.);
    vec3 col = rdr(uv);
    col.xy *= r2d(time+FFT(1.)*5.);
    col.xy = abs(col.xy);
    col = pow(col, vec3(1./2.2));
    fragColor = vec4(col,1.0);
}*/
