#include "../tools.glsl"

float _time;



vec2 trails(vec3 p, float speed, float count, float dist, float mat)
{
        vec3 pt = p;//-vec3(0.,-.1,0.);
    float lrepa = TAU/count;

    float atrail = atan(pt.y, pt.x);
    float idxtrail = floor((atrail+lrepa*.5)/lrepa);
    float antrail = mod(atrail+lrepa*.5,lrepa)-lrepa*.5;
    pt = vec3(vec2(sin(antrail), cos(antrail))*length(pt.xy), pt.z);
    pt-=vec3(0.,dist,0.);
    float ttrail = _time*speed+idxtrail;
    float trails = max(length(pt.xy)-.00002*(1.-sat((p.z*2.+8.)/2.5)), sin(pt.z*.1+ttrail));
    return vec2(trails, mat);
}

vec2 mapdnbtunnel(vec3 p)
{
    vec2 acc = vec2(10000., -1.);

    float cylrep = 2.;
    vec3 pc = p;
    pc.z += _time;
    pc.x = abs(pc.x);
    pc.y = abs(pc.y);

    pc.z = mod(pc.z+cylrep*.5,cylrep)-cylrep*.5;
    pc -= vec3(1.5,0.7,0.);
    pc.xy *= r2d(-.7);
    float cappedCyl = max(length(pc.xz)-.001, abs(pc.y)-.35);

    acc =_min(acc, vec2(cappedCyl,0.));


    acc = _min(acc, trails(p, 2.,15.,0.9, 1.));
    acc = _min(acc, trails(p, 15.,3.,1.9, 1.));
    acc = _min(acc, trails(p, 20.,23.,5.9, 1.));

    //float
    vec3 pp = p+vec3(0.,0.,_time*40.);
    float prep = 37.;
    float idp = floor((pp.z+prep*.5)/prep);
    pp.z = mod(pp.z+prep*.5,prep)-prep*.5;
    pp.xy *= r2d(idp*PI*.25);
    vec2 lpatt = abs(pp.xy)-vec2(8.+2.*sin(idp));
    lpatt = abs(lpatt)-2.5*sin(_time+idp);

        //lpatt *= r2d(idp+iTime*.25);
    float patt = max(abs(min(lpatt.x, lpatt.y))-.01, abs(pp.z)-.01);
    if (p.z < 350.)
    acc = _min(acc, vec2(patt, 0.));

    return acc;
}

vec3 getCamdnbtunnel(vec3 rd, vec2 uv)
{
    float fov = 1.;
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec3 getNormdnbtunnel(vec3 p, float d)
{
    vec2 e = vec2(0.01,0.);
    return normalize(vec3(d)-vec3(mapdnbtunnel(p-e.xyy).x, mapdnbtunnel(p-e.yxy).x, mapdnbtunnel(p-e.yyx).x));
}
vec3 accCol0;
vec3 accCol1;
vec3 tracednbtunnel(vec3 ro, vec3 rd, int steps)
{
    accCol0 = vec3(0.);
    accCol1 = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 128; ++i)
    {
        vec2 res = mapdnbtunnel(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        if (res.y == 0.)
            accCol0 += vec3(sin(p.z)*.5+.5, .2, cos(p.z*3.+p.y*5.+_time*7.)*.2+.5)*(1.-sat(res.x/.3))*.2;
        if (res.y == 1.)
            accCol1 +=  vec3(0.200,0.643,0.980)*(1.-sat(res.x/.05))*.1;
            if (distance(p, ro) > 60.)
            break;
        p+= rd*res.x*.9;
    }
    return vec3(-1.);
}

vec3 rdrdnbtunnel(vec2 uv)
{
      _time = time+textureRepeat(greyNoise, uv).x*.5*(1.-sat(length(uv*3.)));
    vec3 col = mix(vec3(1.000,0.439,0.302)*2.2, vec3(0.075,0.027,0.110), sat(length(uv*2.5)));

    vec3 ro = vec3(0., 0.,-5.);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd= normalize(ta-ro);

    rd = getCam(rd, uv);
    vec3 rd2 = rd;

    col += vec3(1.)*pow(textureRepeat(greyNoise, vec2(atan(rd.z, rd.x), acos(rd.y))*5.).x, 15.);

    vec3 res = tracednbtunnel(ro, rd, 256);
    if (res.y > 0.)
    {
        vec3 p = ro+rd*res.y;
        vec3 n = getNormdnbtunnel(p, res.x);
        col = n*.5+.5;
        col = vec3(1.);
    }
    col += accCol0;
    col+= accCol1;

    return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-vec2(.5)*iResolution.xy)/iResolution.xx;
    _time = iTime+texture(iChannel0, fragCoord/8.).x*.5*(1.-sat(length(uv*3.)));
    vec3 col = rdr(uv);
    col *= pow(1.-sat(lenny(uv)-.35), 4.);
    col = pow(col, vec3(mix(.85,1., abs(uv.y*5.))));
    fragColor = vec4(col,1.0);
}*/
