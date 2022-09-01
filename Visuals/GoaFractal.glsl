#include "../tools.glsl"

float getVolume()
{
    float cnt = 32.;
    float acc = 0.0;
    for (float i = 0.; i < 32.;++i)
        acc += FFT(i/cnt);
    return acc;
}
vec3 getCamgoafractal(vec3 rd, vec2 uv)
{
	float fov = (sin(time*.25)*.3+.5)*3.;
	vec3 r = normalize(cross(rd, vec3(0.,1.,0.)));
	vec3 u = normalize(cross(rd, r));
	return normalize(rd+(r*uv.x+u*uv.y)*fov);
}


float _cubegoafractal(vec3 p, vec3 s)
{
    s*= 2.;
	vec3 l =abs(p)-(s);
	return mix(max(l.x, max(l.y, l.z)), length(p)-s.x, FFT(0.)*5.);
}

vec2 mapgoafractal(vec3 p)
{
	vec2 acc = vec2(1000., -1.);
	p.xy *= r2d(p.z*.05*length(p.xy)*.2*.1*sin(time*.125));
    p.z += getVolume()*.7;
	vec3 pshape = p;
	float repay = 10.;
	float repa = 5.;
	float repz = 20.;
	float idz = floor((pshape.z+repz*.5)/repz);
	pshape.z = mod(pshape.z+time*20.+repz*.5, repz)-repz*.5;
	pshape.y = mod(pshape.y+repay*.5, repay)-repay*.5;
	pshape.x += (sin(time+pshape.y*2.)+time);
	pshape.x = mod(pshape.x+repa*.5,repa)-repa*.5;
	//pshape.xy *= r2d(-.1*sign(p.x)+idz+time*.5);
	float shape = mix(_cube(pshape, vec3(.3*(sin(time)*.2+.5), 1., .1)),
	length(pshape)-.5,
	sin(idz+time*.2*.1));
	acc = _min(acc, vec2(shape, 0.));

	vec3 pshape2 = p+vec3(0.,0.,time*13.*1.5);
	vec3 rep2 = vec3(5.);
	pshape2 = mod(pshape2+rep2*.5, rep2)-rep2*.5;
	float shape2 = _cubegoafractal(pshape2, vec3(.1));
	acc = _min(acc, vec2(shape2, 0.));

	return acc;
}

vec3 getNormgoafractal(vec3 p, float d)
{
	vec2 e = vec2(0.01, 0.);
	return normalize(vec3(d)-vec3(mapgoafractal(p-e.xyy).x, mapgoafractal(p-e.yxy).x, mapgoafractal(p-e.yyx).x));
}
vec3 accColgoafractal;
vec3 tracegoafractal(vec3 ro, vec3 rd, int steps)
{
	accColgoafractal = vec3(0.);
	vec3 p = ro;
	for (int i =0 ; i < 64; ++i)
	{
		vec2 res = mapgoafractal(p);
		if (res.x < 0.01)
			return vec3(res.x, distance(p, ro), res.y);
		accColgoafractal += vec3(1., .2, .5*(sin(p.z*10.)*.5+.5)).zyx*(1.-sat(res.x/1.5))*.02;
		p+=rd*res.x;
	}
	return vec3(-1.);
}

vec3 rdrgoafractal2(vec2 uv)
{
	vec3 col = vec3(0.);


	vec3 ro = vec3(1.,sin(time),-15.);
	vec3 ta = vec3(0.,sin(time*.0125)*14.,0.);
	vec3 rd = normalize(ta-ro);

	rd = getCamgoafractal(rd, uv);
	vec3 res = tracegoafractal(ro, rd, 256);
	if (res.y > 0.)
	{
		vec3 p = ro+rd*res.y;
		vec3 n = getNormgoafractal(p, res.x);
		col = n*.5+.5;
		col = vec3(0.8,0.4,0.3)*(1.-sat(res.y/100.));
	}
	col += accColgoafractal;
	return col;
}

vec3 rdrgoafractal(vec2 uv)
{
  vec2 ouv = uv;


	uv -= vec2(.0);
    uv *= asin(sin(time*.25))*.2+.8;
    uv *= r2d(length(uv)*5.*sin(time*.25)*.5);
	float a = atan(uv.y, uv.x);
	float stp = 3.14159265*2./(3.+mod(floor(time*.5), 5.));
	float b = mod(a+stp*.5,stp)-stp*.5;
	uv = vec2(sin(b), cos(b))*length(uv);

    uv = sign(sin(uv))*uv*r2d(sin(uv.x));

	vec3 col = rdrgoafractal2(uv);

	vec2 coords =uv;// mix(uv, ouv, sin(time))+vec2(time*.1,0.)*.1;
	float rep = .3;
	coords.x = mod(coords.x+rep*.5, rep)-rep*.5;
float shape = _sqr(coords, vec2(.05,.2));
//col = mix(col, col.zxy, 1.-sat(shape*400.));
col = pow(col, vec3(1.));
col.xy *= r2d(time*1.5+FFT(.5)*10.);
col.xz *= r2d(-time*1.25);
col = abs(col);
col = pow(col, vec3(.8))*FFT(.1);
col += pow(col, vec3(2.5))*FFT(.5)*.5;
col += pow(col, vec3(2.75))*FFT(.85)*4.;
//col *= FFT(0.);
col = pow(col, vec3(1.5));
col *= 1.-sat((2.-time)/2.);
col *= FFT(getVolume())+.2;
	//fragColor = vec4(col*15., 1.0);
  return col*15.;
}
/*
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	vec2 uv = (fragCoord.xy-.5*iResolution.xy)/iResolution.xx;
	vec2 ouv = uv;


	uv -= vec2(.0);
    uv *= asin(sin(time*.25))*.2+.8;
    uv *= r2d(length(uv)*5.*sin(time*.25)*.5);
	float a = atan(uv.y, uv.x);
	float stp = 3.14159265*2./(3.+mod(floor(time*.5), 5.));
	float b = mod(a+stp*.5,stp)-stp*.5;
	uv = vec2(sin(b), cos(b))*length(uv);

    uv = sign(sin(uv))*uv*r2d(sin(uv.x));

	vec3 col = rdr(uv);

	vec2 coords =uv;// mix(uv, ouv, sin(time))+vec2(time*.1,0.)*.1;
	float rep = .3;
	coords.x = mod(coords.x+rep*.5, rep)-rep*.5;
float shape = _sqr(coords, vec2(.05,.2));
//col = mix(col, col.zxy, 1.-sat(shape*400.));
col = pow(col, vec3(1.));
col.xy *= r2d(time*1.5+FFT(.5)*10.);
col.xz *= r2d(-time*1.25);
col = abs(col);
col = pow(col, vec3(.8))*FFT(.1);
col += pow(col, vec3(2.5))*FFT(.5)*.5;
col += pow(col, vec3(2.75))*FFT(.85)*4.;
//col *= FFT(0.);
col = pow(col, vec3(1.5));
col *= 1.-sat((2.-time)/2.);
col *= FFT(getVolume())+.2;
	fragColor = vec4(col*15., 1.0);
	//gl_FragColor = vec4(gl_FragCoord.xy / iResolution, cos(time), 1.0);
}*/
