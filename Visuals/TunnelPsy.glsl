#include "../tools.glsl"


vec2 maptunnelpsy(vec3 p)
{
    vec3 op = p;
    vec2 acc = vec2(1000.,-1.);

    float an = atan(p.y, p.x);
    p.xy -= vec2(sin(p.z+time), cos(p.z*.5+time))*.5;
    p.y += sin(p.z*2.+time)*.1;
    float rad = FFT(abs(p.z*.001))*.25;
    vec2 tube = vec2(-(length(p.xy)-2.-rad+sin(p.z*.25)), 0.);
    acc = _min(acc, tube);

    //acc = _min(acc, _max(tube, vec2((sin(an*1.+op.z*3.)-.8), 1.)));

    return acc;
}
vec3 accColtunnelpsy;
vec3 tracetunnelpsy(vec3 ro, vec3 rd, int steps)
{
    accColtunnelpsy = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 256; ++i)
    {
        vec2 res = maptunnelpsy(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
       // if (res.y == 1.)
            accColtunnelpsy += vec3(1., .5, sin(p.z)*.5+.5)*pow(1.-sat(res.x/.7), 30.)*.3;
        p += rd*res.x*.7;
    }
    return vec3(-1.);
}
vec3 getCamtunnelpsy(vec3 rd, vec2 uv)
{
    float fov = 1.;
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec3 getNormtunnelpsy(vec3 p, float d)
{
    vec2 e = vec2(0.01, 0.);
    return normalize(vec3(d)-vec3(maptunnelpsy(p-e.xyy).x, maptunnelpsy(p-e.yxy).x, maptunnelpsy(p-e.yyx).x));
}


vec3 rdrtunnelpsy2(vec2 uv)
{
    vec3 col = vec3(1.);
    float t= time*2.;
    vec3 ro = vec3(sin(time)*.15,cos(time*.5)*.12,-12.+t);
    vec3 ta = vec3(0.,0.,0.+t);
    vec3 rd = normalize(ta-ro);
    rd.xz *= r2d(sin(time*.5)*.15);
    rd.yz *= r2d(sin(time+.5)*.15);
    rd = getCamtunnelpsy(rd, uv);
    vec3 res = tracetunnelpsy(ro, rd, 256);
    if (res.y > 0.)
    {
        vec3 p = ro+rd*res.y;
        vec3 n = getNormtunnelpsy(p, res.x);
        col = n*.5+.5;
        vec3 lpos = vec3(0.);
        vec3 ldir = p-lpos;
        col = sat(dot(normalize(ldir), n))*vec3(1.);
        col += accColtunnelpsy;
        col = pow(col, vec3(3.));
        float an = atan(p.y, p.x);
        vec2 rep = vec2(.9, .5);
        vec2 luv = vec2(an, p.z+time);
        vec2 id = floor((luv+.5*rep)/rep);
        luv.x += sin(id.y*.5)*time*2.;
        luv = mod(luv+.5*rep, rep)-.5*rep;
        float shape = _sqr(luv, vec2(5.4*pow(FFT(abs(id.y*.01)),5.), .05));
        vec3 rgb = mix(col, vec3(1.), 1.-sat(shape*50.));
        rgb += pow(FFT(.0),2.)*2.*vec3(1., .5, sin(p.z*10.)*.5+.5)*(1.-sat(shape*1.))*(1.-sat(length(uv*1.)));
        col = mix(col, rgb, sin(time*5.+p.z*.5)*.5+.5);
        col += 0.2*textureRepeat(greyNoise, vec2(atan(p.y, p.x)*2., length(p.xy*.1)-.25*time)*.1).xyz;
        col = mix(col, col.zyx, sin(time*1.+p.z*.1)*.5+.5);
        //col = mix(col, col*texture(iChannel0, vec2(atan(p.y, p.x)*2., length(p.xy*.1)-time)*.25).xxx, 1.-sat(length(uv*2.)));

    }

    return col;
}

vec2 messupUVtunnelpsy(vec2 uv)
{
       vec2 ouv = uv;
    uv += vec2(.1, 0.);
    uv.x = abs(uv.x);
    uv *= r2d(time*.25);
    //uv += vec2(.3, 0.);
    uv.y = abs(uv.y);
    uv *= r2d(-time*.5);
     uv *= r2d(.2*time+uv.x);
    uv *= sin(time*.15);

    vec2 uv3 = uv*15.*uv.yx*r2d(length(uv));
    return mix(mix(ouv, uv, sin(time*.2)), uv3, sin(time*.1));
}
vec3 rdrtunnelpsy(vec2 uv)
{
  //uv = messupUVtunnelpsy(uv);
  vec3 col = rdrtunnelpsy2(uv);
  return col;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-vec2(.5)*iResolution.xy)/iResolution.xx;
    //uv = messupUV(uv);
    vec3 col = rdr(uv);

    fragColor = vec4(col,1.0);
}*/
