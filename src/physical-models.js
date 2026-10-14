// Educational geometry, no PDK. All physical distances use 100 canvas units/mm.
export const PHYSICAL_VERSION='0.7.0';
export const PHYSICAL_LEVELS=['picfloor','picroute','picwdm','picoptimize'];
export const isPhysical=d=>PHYSICAL_LEVELS.includes(d?.brief);
export const hasPhysical=d=>d?.physical?.enabled===true;
export const PIC_ASSUMPTIONS=Object.freeze({unitsPerMm:100,propagationDbPerMm:.12,crossingDb:.03,bendBaseDb:.01,bendScaleMm:.10,minBendMm:.04,minSpacingMm:.02,clearanceMm:.04,thermalReferenceC:25,thermalKernelKPerW:8,thermalDistanceMm:1,filterShiftNmPerK:.08,maxFilterTemperatureC:45,maxDriftNm:.9});
export const physicalDefaults=()=>({version:1,enabled:true,architecture:'wdm',target:1600,die:{width:2400,height:1800,units:'canvas',unitsPerMm:100},constraints:{minBend:.04,minSpacing:.02,clearance:.04,maxLoss:22,maxCrossings:200},thermal:{enabled:false,ambient:25},customer:'balanced',keepouts:[{id:'PIC-K1',x:1900,y:1450,w:130,h:140}],corridors:[{id:'BUS-CORRIDOR',x:150,y:150,w:450,h:1200}],versions:[]});
export function validatePhysicalState(d){
 if(!isPhysical(d)){if(d.physical)delete d.physical;return;}
 const p=d.physical;if(!p||p.version!==1||p.enabled!==true||!['spatial','fast','wdm'].includes(p.architecture)||p.target!==1600||!['compact','loss','balanced'].includes(p.customer))throw Error('Physical Layout state 오류');
 const die=p.die;if(!die||die.units!=='canvas'||die.unitsPerMm!==100||![die.width,die.height].every(v=>Number.isFinite(v)&&v>=600&&v<=4000))throw Error('Die Definition 오류');
 for(const [k,min,max]of [['minBend',.01,.2],['minSpacing',.005,.1],['clearance',.01,.2],['maxLoss',8,30],['maxCrossings',0,200]])if(!Number.isFinite(p.constraints?.[k])||p.constraints[k]<min||p.constraints[k]>max)throw Error('Physical Constraint '+k+' 오류');
 if(!p.thermal||typeof p.thermal.enabled!=='boolean'||!Number.isFinite(p.thermal.ambient)||p.thermal.ambient<20||p.thermal.ambient>40)throw Error('Physical Thermal 범위 오류');
 for(const k of ['keepouts','corridors'])if(!Array.isArray(p[k])||p[k].length>8||p[k].some(r=>typeof r.id!=='string'||r.id.length>40||![r.x,r.y,r.w,r.h].every(Number.isFinite)||r.x<0||r.y<0||r.w<=0||r.h<=0||r.x+r.w>die.width||r.y+r.h>die.height))throw Error('Physical '+k+' Geometry 오류');
 if(!Array.isArray(p.versions)||p.versions.length>6||p.versions.some(v=>!v||typeof v.name!=='string'||v.name.length>100||!Array.isArray(v.components)||v.components.length>200||!Array.isArray(v.nets)||v.nets.length>600))throw Error('Physical Versions 오류');
 d.schema=7;d.solverVersion=PHYSICAL_VERSION;
}
const peps=1e-7;
const pdist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function roundedGeometry(points,radiusMm=.08){
 if(points.length<2)return {points:[],bends:[],length:0,d:''};
 const bends=[],sampled=[{...points[0]}];let exact=points.slice(1).reduce((s,p,i)=>s+pdist(p,points[i]),0),path='M '+points[0].x+' '+points[0].y;
 for(let i=1;i<points.length-1;i++){
  const a=points[i-1],b=points[i],c=points[i+1],la=pdist(a,b),lb=pdist(b,c),u={x:(b.x-a.x)/la,y:(b.y-a.y)/la},v={x:(c.x-b.x)/lb,y:(c.y-b.y)/lb},cross=u.x*v.y-u.y*v.x;
  if(!la||!lb||Math.abs(cross)<peps){sampled.push({...b});path+=' L '+b.x+' '+b.y;continue;}
  const radius=Math.min(radiusMm*100,la/2,lb/2),start={x:b.x-u.x*radius,y:b.y-u.y*radius},end={x:b.x+v.x*radius,y:b.y+v.y*radius},center={x:start.x+v.x*radius,y:start.y+v.y*radius},angle=Math.atan2(start.y-center.y,start.x-center.x),turn=cross>0?1:-1;
  sampled.push(start);for(let j=1;j<=12;j++){const t=angle+turn*Math.PI/2*j/12;sampled.push({x:center.x+radius*Math.cos(t),y:center.y+radius*Math.sin(t)});}
  path+=' L '+start.x+' '+start.y+' A '+radius+' '+radius+' 0 0 '+(turn>0?1:0)+' '+end.x+' '+end.y;
  exact-=2*radius-Math.PI/2*radius;bends.push({position:{...b},center,start,end,radiusMm:radius/100,angle:90});
 }
 sampled.push({...points.at(-1)});path+=' L '+points.at(-1).x+' '+points.at(-1).y;return {points:sampled,bends,length:exact/100,d:path};
}
export const physicalBendLoss=radiusMm=>PIC_ASSUMPTIONS.bendBaseDb*Math.exp(PIC_ASSUMPTIONS.bendScaleMm/Math.max(.001,radiusMm));
export function inclusiveIntersection(a,b,c,d){const rx=b.x-a.x,ry=b.y-a.y,sx=d.x-c.x,sy=d.y-c.y,den=rx*sy-ry*sx;if(Math.abs(den)<peps)return null;const t=((c.x-a.x)*sy-(c.y-a.y)*sx)/den,u=((c.x-a.x)*ry-(c.y-a.y)*rx)/den;return t>=-peps&&t<=1+peps&&u>=-peps&&u<=1+peps?{x:a.x+t*rx,y:a.y+t*ry}:null;}
export function geometryIntersections(a,b){const found=[];for(let i=1;i<a.length;i++)for(let j=1;j<b.length;j++){const p=inclusiveIntersection(a[i-1],a[i],b[j-1],b[j]);if(p&&![a[0],a.at(-1),b[0],b.at(-1)].some(q=>pdist(p,q)<peps)&&!found.some(q=>pdist(p,q)<.1))found.push(p);}return found;}
export function parallelSpacing(a,b){let best=Infinity,position=null;for(let i=1;i<a.length;i++)for(let j=1;j<b.length;j++){const aa=a[i-1],ab=a[i],ba=b[j-1],bb=b[j],horizontal=Math.abs(aa.y-ab.y)<peps&&Math.abs(ba.y-bb.y)<peps,vertical=Math.abs(aa.x-ab.x)<peps&&Math.abs(ba.x-bb.x)<peps;if(!horizontal&&!vertical)continue;const k=horizontal?'x':'y',o=horizontal?'y':'x',lo=Math.max(Math.min(aa[k],ab[k]),Math.min(ba[k],bb[k])),hi=Math.min(Math.max(aa[k],ab[k]),Math.max(ba[k],bb[k]));if(hi-lo>peps){const dist=Math.abs(aa[o]-ba[o])/100;if(dist<best){best=dist;position={[k]:(lo+hi)/2,[o]:(aa[o]+ba[o])/2};}}}return {distance:best,position};}
export const rectGap=(a,b)=>Math.hypot(Math.max(0,a.x-b.x-b.w,b.x-a.x-a.w),Math.max(0,a.y-b.y-b.h,b.y-a.y-a.h))/100;
export const rectOverlap=(a,b)=>a.x<b.x+b.w-peps&&a.x+a.w>b.x+peps&&a.y<b.y+b.h-peps&&a.y+a.h>b.y+peps;
