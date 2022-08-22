#include "../tools.glsl"

float _rsqr(vec2 uv, vec2 s, float r)
{
    vec2 l = abs(uv)-s;
    return min(length(max(l, 0.)+min(max(l.x, l.y), 0.))-r, max(l.x, l.y));
}



vec2 maptunnel(vec3 p)
{
    vec2 acc = vec2(1000.,-1.);

    float tunnel = -_rsqr(p.xy, vec2(3., 1.), .4);
    tunnel = max(tunnel, abs(p.z)-10.);
    acc = _min(acc, vec2(tunnel, 0.));

    vec3 pc1 = p-vec3(sin(time*.5),.4*sin(time),8.+2.*sin(time*1.5));
    pc1.xy *= r2d(time+sin(time*.2));
    pc1.xz *= r2d(-time*.5);
    float cubes = _cube(pc1, vec3(.4));

    acc = _min(acc, vec2(cubes, 1.));
    return acc;
}

vec3 getNormtunnel(vec3 p, float d)
{
    vec2 e = vec2(0.01, 0.);
    return normalize(vec3(d)-vec3(maptunnel(p+e.xyy).x, maptunnel(p+e.yxy).x, maptunnel(p+e.yyx).x));
}

vec3 tracetunnel(vec3 ro, vec3 rd, int steps)
{
    vec3 p = ro;
    for (int i = 0; i< 256; ++i)
    {
        vec2 res = maptunnel(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        p+= rd*res.x;
    }
    return vec3(-1.);
}

vec3 getEnvtunnel(vec3 rd)
{
    return vec3(1.);//2.*textureRepeat(greyNoise, rd*vec3(1.,-1.,1.)*vec3(15.,15.,1.)+vec3(0.,.5,0.)).xyz*vec3(0.357,0.745,0.565);
}

vec3 rdrtunnel(vec2 uv)
{
    vec3 col = vec3(0.);

    vec3 off = (vec3(rand(),rand(),rand())-.5)*2.;
    vec3 ro = vec3(sin(time*.2),1.3,-5.)+off*.005;
    vec3 ta = vec3(0.,1.1,6.);
    vec3 rd = normalize(ta-ro);
    rd = getCam(rd, uv);
    rd = normalize(rd-off*.001);
    vec3 res = tracetunnel(ro,rd, 256);
    if (res.y > 0.)
    {
        vec3 p = ro +rd*res.y;
        vec3 n = getNormtunnel(p, res.x);
        if (res.z  == 0.)
        {
            vec2 uvt = vec2(atan(p.y, p.x)*7., p.z);

            vec2 rep = vec2(.5);
            uvt = mod(uvt+rep*.5,rep)-rep*.5;
            float carrelage = _sqr(uvt, vec2(.2));
            vec3 tng = normalize(cross(rd, n));
            n = normalize(n+tng*sat(carrelage*10.)*.5+textureRepeat(greyNoise, 3.*p.xy*vec2(1.,10.)).xxx*.05);
            n = normalize(n+(vec3(rand(),rand(), rand())-.5)*.05);
            vec3 rdrefl = normalize(reflect(rd, n));
            vec3 resrefl = tracetunnel(p-n*0.01, rdrefl, 128);
            if (resrefl.y > 0.)
            {
                col = vec3(0.075,0.427,0.427)*(1.-sat(carrelage))*.5
                *(1.-sat(length(uv*1.)));
            }
            else
                col = getEnvtunnel(rdrefl);
        }
    }
    else
        col = getEnvtunnel(rd);

    col = mix(col, vec3(0.894,0.969,0.631), pow(sat(length(col)), 25.));
    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.xx;
    seed=texture(iChannel1,uv).x;
    seed+=fract(time);
    vec3 col = rdr(uv);
    col = mix(col, texture(iChannel2, fragCoord/iResolution.xy).xyz, .75);
    fragColor = vec4(col,1.0);
}*/
