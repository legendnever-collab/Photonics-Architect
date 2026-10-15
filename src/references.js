import {isLink,LINK_LEVELS} from './link-models.js';
import {linkReferences} from './link-engine.js';
import {isPhysical} from './physical-models.js';
import {physicalReference,physicalGoal} from './physical-engine.js';
import {isWDM} from './wdm-models.js';
import {wdmReference,wdmGoal} from './wdm-engine.js';
import {campaignLevel} from './campaign-registry.js';
import {isPackage} from './package-models.js';
import {packageSolution,assemblyTestSync,cornerTests,packageGoal} from './package-engine.js';
import {scalingReference} from './arrays.js';
import {isScaling} from './scaling-models.js';
import {VERSION,solve,validateImport,editRoute,setWaypoint,definition} from './core.js';
import {practiceDesign,challengeProgress} from './campaign.js';
export const REFERENCE_VERSION='0.4.0';
export const REFERENCE_ENV={temperature:25,wavelength:1310};
const NOTES={
 mzm:{name:'MZM · Phase Engine',why:'MZM과 Differential EIC의 Swing/Bandwidth를 맞추고 짧은 RF로 4 Lane을 유지합니다.',trade:'넓은 파장·온도 여유. Phase Shifter와 Driver의 면적·전력이 큽니다.'},
 mrm:{name:'MRM · Tuned Compact Engine',why:'작은 Resonant Modulator와 matching EIC를 사용하고 Auto Heater Lock의 보정 여유를 확보합니다.',trade:'작은 면적·Driver 전력. Cold Resonance, Wavelength, Heater 전력과 Thermal Drift 관리가 필요합니다.'},
 eam:{name:'EAM · Absorption Engine',why:'GeSi EAM과 Bias 지원 EIC를 조합하고 High/Low Level 및 ER를 함께 만족합니다.',trade:'작은 면적과 짧은 RF. Absorption Loss, DC Bias와 GeSi integration 부담이 있습니다.'}
};
export function referenceDesigns(brief,environment=REFERENCE_ENV){if(LINK_LEVELS.includes(brief))return linkReferences(brief,environment);
 if(isPhysical({brief}))return ['compact','loss','balanced'].map(type=>{const design=physicalReference(brief,type);design.environment=structuredClone(environment);const result=solve(design);return {id:brief+'-'+type,version:'0.7.0',brief,type,name:design.name,why:'Rounded Route의 Length / Bend / Crossing을 기존 Optical Solver로 한 번만 평가했습니다.',tradeoff:type==='compact'?'작은 Envelope / 가까운 Filter: Thermal / Bend 여유를 확인하세요.':type==='loss'?'큰 Bend Radius와 Mux 분리: 면적 / 길이 부담과 Loss를 함께 비교하세요.':'면적과 Loss / Thermal 여유를 절충합니다.',design,result,satisfied:physicalGoal(design,result).complete,solverVersion:result.version,modelVersion:result.modelVersion};});
 if(isWDM({brief}))return campaignLevel(brief).solutions.map(type=>{const design=wdmReference(brief,type);design.environment=structuredClone(environment);const result=solve(design);return {id:brief+'-'+type,version:'0.6.0',brief,type,name:design.name,why:'독립 Data Channel과 실제 파장별 Source / Route / Filter를 현재 Solver로 검증했습니다. Level14는 세 실제 Snapshot과 고객 선택이 추가로 필요합니다.',tradeoff:type==='wdm'?'16 Data Channels를4 Physical Outputs로 결합합니다. 네 Source setpoint와4 Mux의 손실·면적·파장 관리가 늘어납니다.':type==='fast'?'8 Data Channels /8 Optical Outputs. 높은 Baud / RF / Channel 전력 부담, 작은 면적.':'16 Data Channels /16 Optical Outputs. 단일1310nm Source / 작은 Filter 부담, 큰 I/O 수.',design,result,satisfied:result.status==='VALID',solverVersion:result.version,modelVersion:result.modelVersion};});
 if(isPackage({brief}))return campaignLevel(brief).solutions.map(variant=>{const design=packageSolution(brief,variant);design.environment=structuredClone(environment);if(brief==='assembly'){design.package.cornerResult=cornerTests(design);design.package.assemblyResult=assemblyTestSync(design);}const result=solve(design);return {id:brief+'-'+variant,version:'0.5.0',brief,type:'hs200',name:design.name,why:'별도 EIC / PIC Zone, Clearance, 수동 RF / Optical Route, 8-channel FAU Mapping을 현재 Solver로 검증했습니다.',tradeoff:variant==='compact'?'짧은 RF / 작은 Engine Envelope. EIC 열 집중을 Cooling Conductance로 완화합니다. Expanded-mode FAU는 공간·Interface 비용이 증가합니다.':'EIC와 4 Lane을 2 mm 분산하여 Thermal Coupling을 줄입니다. 더 넓은 Envelope·Cooling 면적과 긴 Optical feed가 필요합니다.',design,result,satisfied:packageGoal(design,result).complete,solverVersion:result.version,modelVersion:result.modelVersion};});
 if(isScaling({brief}))return campaignLevel(brief).solutions.map(type=>[type,brief==='scale400'?4:type==='hs100'?16:8]).map(([type,count])=>{const design=scalingReference(brief,type,count);design.environment=structuredClone(environment);const result=solve(design);return {id:brief+'-'+type,version:'0.4.1',brief,type,name:design.name,why:'Editable Lane Tile / '+count+' Lane Array · 4-channel EIC + explicit 1×'+count+' distribution graph. 모든 Lane을 현재 Solver로 계산했습니다.',tradeoff:type==='hs100'?'16 Optical I/O와 큰 면적 / 낮은 Baud·Channel 전력 부담.':'8 Optical I/O / 높은 Baud·RF attenuation·Channel 전력 부담. 이 교육 시나리오의 결과이며 보편적 제품 비교가 아닙니다.',design,result,satisfied:result.status==='VALID',solverVersion:result.version,modelVersion:result.modelVersion};});
 const types=campaignLevel(brief).solutions;
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
 satisfaction:ref.satisfied?'PASS · '+r.gross+'G':'FAIL · '+r.status,
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
 if(!(isPhysical(next)?physicalGoal(next,r).complete:isWDM(next)?r.status==='VALID':isPackage(next)?packageGoal(next,r).complete:isScaling(next)?r.status==='VALID':challengeProgress(next,r).complete))throw Error('이 환경에서 Reference가 목표를 만족하지 못합니다.');
 next.name=(ref.name+' · My Design').slice(0,100);if(current.brief==='architecture'){next.scaling.customer=current.scaling.customer;next.scaling.choice=null;}
 if(isWDM(current)){next.wdm.customer=current.wdm.customer;next.wdm.choice=null;next.wdm.io={...structuredClone(current.wdm.io),channels:next.wdm.io.channels,mapping:next.wdm.io.mapping};}
 next.completedLevels=current.completedLevels.filter(k=>k!==current.brief);
 next.snapshots=structuredClone(current.snapshots);
 next.referenceUsage=[...(current.referenceUsage||[]),{id:ref.id,level:current.brief,version:ref.version,at:new Date().toISOString()}].slice(-200);
 return {design:next,backup:structuredClone(current)};
}
