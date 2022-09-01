#include "../tools.glsl"

vec3 getCamloststructures(vec3 rd, vec2 uv)
{
    float fov = 4.5;
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+fov*(uv.x*r+uv.y*u));
}

vec2 maploststructures(vec3 p)
{
    vec2 acc = vec2(10000.);
    for (int i = 0; i < 15; ++i)
    {
        float fi = float(i);
        vec3 pl = p;
        pl.xy *= r2d(sin(time*.5-fi*.1)*2.);
        float cucube = _cucube(pl, 5.*vec3(.5, .1, .5)*(fi/15.), vec3(.0001));
        acc = _min(acc, vec2(cucube, float(i)));
    }

    return acc;
}

vec3 gradloststructures(float f)
{
    vec3 cols[4];
    cols[0] = vec3(0.05);
    cols[1] = vec3(0.859,0.039,0.286);
    cols[2] = vec3(1.);
    cols[3] = vec3(1.0);

    f = pow(sat(sin(f*3.-time*1.5)*.5+.5), 2.)*3.0;
    // cols[int(f)] // Non-const array indexing is not permitted in GLES
    int fi = int(f);
    #define COL_ACCESS(i) (cols[0] * float(fi == 0) + cols[1] * float(fi == 1) + cols[2] * float(fi == 2) + cols[3] * float(fi == 3))
    vec3 prev = COL_ACCESS(fi);

    vec3 next = COL_ACCESS(int(min(f+1.,3.)));
    return mix(prev, next, fract(f))*1.2;
}

vec3 getColloststructures(float id)
{
    return gradloststructures(id/15.);
}

vec3 accColloststructures;
vec3 traceloststructures(vec3 ro, vec3 rd, int steps)
{
    accColloststructures = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 48; ++i)
    {
        vec2 res = maploststructures(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        accColloststructures += pow(1.-sat(res.x/.3),5.)*.07*getColloststructures(res.y).yzx;
        p+= rd*res.x;
    }
    return vec3(-1.);
}

vec3 rdrloststructures(vec2 uv)
{
    float d = 3.;
    vec3 ro = vec3(sin(time*.25)*d,0.,cos(time*.25)*d);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd = normalize(ta-ro);
    rd = getCamloststructures(rd, uv);
    vec3 col = textureRepeat(greyNoise, (rd*vec3(1.,1.,1.)).xy).xxx*.25*vec3(0.400,0.643,0.961);

    vec3 res = traceloststructures(ro, rd, 48);
    if (res.y > 0.)
    {
        vec3 p = ro + rd*res.y;

        col = getColloststructures(res.z);
    }
    col += accColloststructures;
    
    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 ouv = fragCoord/iResolution.xy;
    vec2 uv = (fragCoord-vec2(.5)*iResolution.xy)/iResolution.xx;

    vec3 col = rdr(uv);

    col = mix(col, texture(iChannel1, ouv).xyz, .5);

    fragColor = vec4(col,1.0);
}
*/
