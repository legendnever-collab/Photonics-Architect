import {VERSION,solve,validateImport,editRoute,setWaypoint,definition} from './core.js';
import {practiceDesign,challengeProgress} from './campaign.js';
export const REFERENCE_VERSION='0.4.0';
export const REFERENCE_ENV={temperature:25,wavelength:1310};
const NOTES={
 mzm:{name:'MZM · Phase Engine',why:'MZM과 Differential EIC의 Swing/Bandwidth를 맞추고 짧은 RF로 4 Lane을 유지합니다.',trade:'넓은 파장·온도 여유. Phase Shifter와 Driver의 면적·전력이 큽니다.'},
 mrm:{name:'MRM · Tuned Compact Engine',why:'작은 Resonant Modulator와 matching EIC를 사용하고 Auto Heater Lock의 보정 여유를 확보합니다.',trade:'작은 면적·Driver 전력. Cold Resonance, Wavelength, Heater 전력과 Thermal Drift 관리가 필요합니다.'},
 eam:{name:'EAM · Absorption Engine',why:'GeSi EAM과 Bias 지원 EIC를 조합하고 High/Low Level 및 ER를 함께 만족합니다.',trade:'작은 면적과 짧은 RF. Absorption Loss, DC Bias와 GeSi integration 부담이 있습니다.'}
};
export function referenceDesigns(brief,environment=REFERENCE_ENV){
 const types=brief==='compact'?['mrm','eam']:['mzm','mrm','eam'];
 return types.map(type=>{
  const design=practiceDesign(brief,type);design.environment=structuredClone(environment);design.name=NOTES[type].name;
  if(type==='mrm')for(const c of design.components.filter(c=>c.type==='mrm')){c.params.resonance=1309.55;c.params.autoTune=true;}
  // RF baseline is captured under the same environment/device settings as the solution.
  if(brief==='rf'){
   design.challenge=null;
   // beginRF needs an unmodified, valid long path baseline.
   const r=solve(design);if(r.status==='VALID'){
    const net=design.nets.find(n=>n.kind==='rf');
    const baseline=structuredClone(design);baseline.snapshots=[];
    design.challenge={level:'rf',targetNet:net.id,baseline:{name:'Reference RF baseline',solverVersion:VERSION,design:baseline,originalResult:structuredClone(r)}};
    setWaypoint(design,net,0,{x:480,y:85});setWaypoint(design,net,1,{x:480,y:100});
   }
  }
  if(brief==='optical')for(const [index,anchor] of [[1,{x:620,y:180}],[2,{x:620,y:460}]]){
   const out=design.components.filter(c=>c.type==='output')[index];editRoute(design,design.nets.find(n=>n.b.component===out.id)).waypoints=[anchor];
  }
  const result=solve(design),satisfied=challengeProgress(design,result).complete;
  return {id:brief+'-'+type,version:REFERENCE_VERSION,brief,type,name:NOTES[type].name,why:NOTES[type].why,tradeoff:NOTES[type].trade,design,result,satisfied,solverVersion:VERSION,modelVersion:design.modelVersion};
 });
}
export function referenceMetrics(ref){const r=ref.result,d=ref.design;return {
 satisfaction:ref.satisfied?'PASS · 100G':'FAIL · '+r.status,
 devices:[...new Set(d.components.map(c=>c.type))].join(' / '),
 footprint:r.area,
 envelope:(Math.max(...d.components.map(c=>c.x+definition(c).w))-Math.min(...d.components.map(c=>c.x)))*(Math.max(...d.components.map(c=>c.y+definition(c).h))-Math.min(...d.components.map(c=>c.y)))/10000,
 driver:r.powerBreakdown.driverW,heater:r.powerBreakdown.heaterW,bias:r.powerBreakdown.biasW,
 rf:r.lanes.map(l=>({length:l.rf?.length,swing:l.rf?.swing,convention:l.rf?.convention})),
 optical:r.lanes.map(l=>({loss:l.optical?.loss,high:l.highDbm,low:l.lowDbm,average:l.power,er:l.er,temperature:l.temperature,detuning:l.detuning})),
 variation:r.variation,environment:structuredClone(d.environment)
};}
export function prepareReferenceApplication(current,ref){
 if(ref.brief!==current.brief)throw Error('현재 Level과 Reference가 다릅니다.');
 const next=validateImport(structuredClone(ref.design)),r=solve(next);
 if(!challengeProgress(next,r).complete)throw Error('이 환경에서 Reference가 목표를 만족하지 못합니다.');
 next.name=(ref.name+' · My Design').slice(0,100);
 next.completedLevels=current.completedLevels.filter(k=>k!==current.brief);
 next.snapshots=structuredClone(current.snapshots);
 next.referenceUsage=[...(current.referenceUsage||[]),{id:ref.id,level:current.brief,version:REFERENCE_VERSION,at:new Date().toISOString()}].slice(-200);
 return {design:next,backup:structuredClone(current)};
}
