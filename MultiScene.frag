

/*{
"IMPORTED": {
  "greyNoise": {
    "PATH": "./Textures/GreyNoise.jpg",
  }
}
}
*/
precision mediump float;

uniform float time;
uniform vec2 resolution;

uniform sampler2D greyNoise;
uniform sampler2D backbuffer;
vec4 textureRepeat(sampler2D sampler, vec2 uv)
{
  return texture2D(sampler, mod(uv, vec2(1.)));
}
#define sat(a) clamp(a, 0., 1.)
mat2 r2d(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec3 getCam(vec3 rd, vec2 uv)
{
    float fov = 3.;
    vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
    vec3 u = normalize(cross(rd, r));
    return normalize(rd+fov*(r*uv.x+u*uv.y));
}

vec2 _min(vec2 a, vec2 b)
{
    if (a.x < b.x)
        return a;
    return b;
}
float hash(float seed)
{
  return fract(sin(seed*123.456)*123.456);
}

float _seed;
float rand()
{
    _seed++;
    return hash(_seed);
}
vec2 map(vec3 p)
{
    vec3 p2 = p;
    vec2 acc = vec2(10000.,-1.);
    vec2 rep = vec2(.25);
    vec2 id = floor((p.xz+rep*.5)/rep);

    p.xz = mod(p.xz+rep*.5,rep)-rep*.5;
    float sz = .1;
    float h = .5*textureRepeat(greyNoise, id*.01+time*.0008).x*length(id*.15);
    vec3 op = p;
    p.y = abs(p.y);
    p.y-= h;
    float bar = length(p)-sz;
    bar = min(bar, max(length(p.xz)-sz, abs(op.y)-h));
    bar = max(bar, op.y);
    acc = _min(acc, vec2(bar, 0.));

    vec3 rep2 = vec3(1.);
    p2.y += time;
    p2.xz *= r2d(sin(p2.y*3.-time)*.05);
    vec3 id2 = floor((p2+rep2*.5)/rep2);
    p2 = mod(p2+rep2*.5,rep2)-rep2*.5;
    float bubble = length(p2)+abs(sin(id2.y+id2.x+id2.z*10.));
    acc = _min(acc, vec2(bubble, 3.));


    return acc;
}

vec3 getNorm(vec3 p, float d)
{
    vec2 e = vec2(0.01, 0.);
    return normalize(vec3(d)-vec3(map(p-e.xyy).x, map(p-e.yxy).x, map(p-e.yyx).x));
}
vec3 accCol;
vec3 trace(vec3 ro, vec3 rd, int steps)
{
    accCol = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 128; ++i)
    {
        vec2 res = map(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        p+=rd*res.x*.35;
        vec3 rgb = mix(vec3(.1,.3,.5),vec3(0.078,0.522,0.471), sat(sin(2.*distance(p, ro))));
        accCol += rgb*0.01*sat(.3+sat(sin(p.x*2.)+sin(p.z)+sin(length(p.xz)+time)));//*(1.-sat(res.x/0.5))*.01;
    }
    return vec3(-1.);
}

vec3 rdr(vec2 uv)
{
    vec3 col = vec3(0.);
    float d = 2.;
    float a = time*.1;
    uv *= r2d(sin(time*.2)*.2);
    vec2 offr = (vec2(rand(), rand())-.5)*.05;
    vec3 ro = vec3(sin(a)*d+offr.x,-.8+offr.y+.2*sin(time*.1),cos(a)*d);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd = normalize(ta-ro);

    rd = getCam(rd, uv);
    vec3 res = trace(ro, rd, 128);
    float depth = 100.;
    if (res.y > 0.)
    {
        depth = res.y;
        vec3 p = ro+rd*res.y;
        vec3 n = getNorm(p, res.x);
        col = n*.5+.5;
        vec2 rep = vec2(.25);
        vec2 id = floor((p.xz+rep*.5)/rep);
        float h = textureRepeat(greyNoise, id*.01+time*.0008).x;
        vec3 rgb = mix(vec3(0.102,1.000,0.698), vec3(0.486,0.435,0.094), pow(h,3.));
        col = rgb*(1.-pow(sat(-dot(rd, n)), .25));
        col += rgb * pow(sat(-p.y*1.5),2.);
        col *= pow(h*1.5,2.);
        col = mix(col*.35, 1.5*col.yxz, sat(sin(length(id)*.7-time*2.)));
    }
    col = mix(col, accCol, 1.-sat(exp(-depth*0.4)));
    return col;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy)/resolution.xx;
    _seed = time+textureRepeat(greyNoise, uv).x;

    vec3 col = rdr(uv);

    vec2 off = vec2(1., -1.)/(resolution.x*1.5);

    if (true) // Not so cheap antialiasing
    {
        //col = vec3(1.,0.,0.);
        vec3 acc = col;
        acc += rdr(uv+off.xx);
        acc += rdr(uv+off.xy);
        acc += rdr(uv+off.yy);
        acc += rdr(uv+off.yx);
        col = acc/5.;

    }
    col *= 1.9/(col+1.);
    col = sat(col);


    gl_FragColor = vec4(col,1.0);
}
