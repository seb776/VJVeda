#include "../tools.glsl"

vec2 mapDarkRoom(vec3 p)
{
    vec2 acc = vec2(10000.,-1.);

    //acc = _min(acc, vec2(length(p-vec3(sin(mtime*2.)-.5,cos(mtime*1.7)+cos(mtime*.5)*.5,cos(mtime*3.)+8.))-.5, 2.));

    acc = _min(acc, vec2(-(abs(p.y)-2.8), 0.));
    vec3 pwall = p;
    //pwall.xy*=r2d(.5);
    float sidewall = -(abs(p.y+p.x)-3.8);

    sidewall = max(sidewall, -(abs(p.z-3.5)-1.));
    acc = _min(acc, vec2(sidewall, 0.)); // Sidewalls
    acc = _min(acc, vec2(-(abs(p.z)-12.), 1.));

    return acc;
}

vec3 getNormDarkRoom(vec3 p, float d)
{
    vec2 e = vec2(0.01,0.);
    return normalize(vec3(d)-
        vec3(mapDarkRoom(p-e.xyy).x, mapDarkRoom(p-e.yxy).x, mapDarkRoom(p-e.yyx).x));
}

vec3 traceDarkRoom(vec3 ro, vec3 rd,  int steps)
{
    vec3 p = ro;
    for (int i = 0; i < 128; ++i)
    {
        vec2 res = mapDarkRoom(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        p+= rd*res.x;
    }
    return vec3(-1.);
}

vec3 getMatDarkRoom(vec3 rd, vec3 res, vec3 p, vec3 n)
{
    vec3 col = vec3(0.);

    col = n*.5+.5;
    if (res.z == 0.)
    {
        if (abs(dot(n,vec3(0.,0.,1.))) < 0.01)
        {
            col = vec3(0.051,0.404,0.408)*.2*pow(textureRepeat(greyNoise, p.xz*.1).x, .1)*vec3(.5); // ambient
        }
        else
            col = vec3(0.);
    }
    if (res.z == 1.)
    {
        vec2 uvwall = p.xy;
        float rep = 3.;
        float idwin = floor((uvwall.x+rep*.5)/rep);
        uvwall.y = abs(uvwall.y);
        uvwall.y -= 1.8;
        uvwall.x = mod(uvwall.x+rep*.5,rep)-rep*.5;
        float sqr = _sqr(uvwall, vec2(1.4, .78));
        float wincolfactor = sat(sin(FFTlow*10.+idwin*1.+3.*mtime*sign(p.y))*.5+.5);
        //wincolfactor += pow(FFT(.1),2.);
        //wincolfactor *= (mod(mtime, .2)/.2)*FFT(.1);
        vec3 rgbwin = mix(vec3(1.), vec3(1.,0.1,0.4), wincolfactor);
        col = mix(vec3(0.), rgbwin*(pow(FFT(.9),.5)+.5), 1.-sat(sqr*40.));
    }
    if (res.z == 2.)
    {
        col = vec3(0.165,0.996,0.678)*10.;//*FFT(.4);
    }

    return col;
}

float getWallSpec(vec3 p)
{
    return pow(textureRepeat(greyNoise, p.xz*.1).x, .1);
}

vec3 rdrDarkRoom(vec2 uv)
{
    vec3 col = vec3(0.);

    vec3 ro = vec3(-2.+sin(mtime*.2),1.+sin(mtime*.25),-8.);
    vec3 ta = vec3(-2.+sin(mtime*.2),1.+sin(mtime*.3)*.5,0.);
    vec3 rd = normalize(ta-ro);
    rd = getCam(rd, uv);

    vec3 res = traceDarkRoom(ro, rd, 128);
    if (res.y > 0.)
    {
        vec3 p = ro+rd*res.y;
        vec3 n = getNormDarkRoom(p, res.x);
        col = getMatDarkRoom(rd, res, p, n);

        if (res.z == 0.)
        {
            if (abs(dot(n,vec3(0.,0.,1.))) < 0.01)
            {
                float spec = pow(textureRepeat(greyNoise, p.xz*.1).x, 1.)*.2;
                vec3 refl = normalize(reflect(rd, n)+spec*2.*(vec3(rand(), rand(), rand())-.5));
                vec3 resrefl = traceDarkRoom(p+n*0.01, refl, 128);
                if (resrefl.y > 0.)
                {
                    vec3 prefl = p+refl*resrefl.y;
                    vec3 nrefl = getNormDarkRoom(prefl, resrefl.x);
                    col += getMatDarkRoom(refl, resrefl, prefl, nrefl);
                }
            }
        }

    }

    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.xx;
    seed=texture(iChannel0,uv).x;
    seed+=fract(mtime);
    vec3 col = rdr(uv);

    col = mix(col, texture(iChannel2, fragCoord/iResolution.xy).xyz, .7);
    fragColor = vec4(col,1.0);
}*/
