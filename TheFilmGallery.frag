/*{ "camera": true }*/
uniform sampler2D camera;

#include "tools.glsl"

vec2 map(vec3 p)
{
    vec2 acc = vec2(10000., -1.);


    acc = _min(acc, vec2(length(p)-1., 0.));
    return acc;
}


vec3 accCol;
vec3 trace(vec3 ro, vec3 rd)
{
    accCol = vec3(0.);
    vec3 p = ro;
    for (int i = 0; i < 128; ++i)
    {
        vec2 res = map(p);
        if (res.x < 0.01)
            return vec3(res.x, distance(p, ro), res.y);
        p+= rd*res.x;
    }
    return vec3(-1.);
}

vec3 getNorm(vec3 p, float d)
{
  vec2 e = vec2(0.01, 0.);
  return  normalize(vec3(d) - vec3(map(p-e.xyy).x, map(p-e.yxy).x, map(p-e.yyx).x));
}

vec3 rdr(vec2 uv)
{
    vec3 ro = vec3(0., 0., -5.);
    vec3 ta = vec3(0.,0.,0.);
    vec3 rd = normalize(ta-ro);
    rd = getCam(rd, uv);
    vec3 col = vec3(0.);

    vec3 res = trace(ro, rd);
    if (res.y > 0.)
    {
        vec3 p = ro + rd*res.y;
        vec3 n = getNorm(p, res.x);
        col = n *.5+.5;
    }

    return col;
}
void main() {
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy) / resolution.xx;

   vec3 col = rdr(uv);
   col = texture2D(camera, uv).xyz;
//vec3 col = vec3(0.,0.,.5);
    gl_FragColor = vec4(col, 1.0);
}
