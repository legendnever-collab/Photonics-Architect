import {isWDM} from './wdm-models.js';
import {wdmAssessment,wdmConditions} from './wdm-engine.js';
import {campaignNumbers} from './campaign-registry.js';
import {isPackage,PACKAGE_BRIEF} from './package-models.js';
import {packageGoal,assemblyFresh} from './package-engine.js';
// Transparent gameplay rubric. It does not alter or calibrate the physics solver.
import {solve,componentRect} from './core.js';
import {challengeProgress} from './campaign.js';
import {BRIEFS,PACKETS,compatibility} from './models.js';
import {isScaling} from './scaling-models.js';
export const SOLUTION_LEVELS=campaignNumbers;
export function solutionAssessment(design,result=solve(design)){
 if(isWDM(design))return wdmAssessment(design,result);
 if(isPackage(design))return packageAssessment(design,result);
 const high=isScaling(design),target=high?(design.brief==='scale400'?400:1600):100,needed=high?(design.brief==='scale400'?4:design.scaling.profile==='hs200'?8:16):4;
 const clamp=v=>Math.max(0,Math.min(1,Number.isFinite(v)?v:0)),ratio=count=>clamp(count/needed),brief=BRIEFS[design.brief],goal=challengeProgress(design,result);
 const rfGood=result.lanes.filter(l=>{if(!l.rf)return false;const source=design.components.find(c=>c.id===design.nets.find(n=>n.id===l.rf.net)?.a.component);return high?l.rf.length<=5&&l.rf.effectiveSwing>=.65&&l.rf.residual<=.65&&l.levels?.gapRatio>=.22:PACKETS[source?.type]?.compatible.includes(l.type)&&!compatibility(source,design.components.find(c=>c.id===l.modulator)).length&&l.rf.length<=10&&l.rf.swingMargin>=0&&l.rf.bwRatio>=1;}).length;
 const opticalGood=result.lanes.filter(l=>l.optical&&l.power>=brief.avgMin&&l.er>=brief.erMin&&(!high||l.levels?.optical.every((v,i,a)=>!i||v>a[i-1]))&&!l.heater?.limited).length;
 const items=[
  {key:'functional',label:'Functional Gross',max:40,value:40*clamp(result.gross/target),detail:result.gross+' / '+target+' Gb/s · 실패 Lane 제외'},
  {key:'rf',label:'Driver / RF',max:20,value:20*ratio(rfGood),detail:rfGood+' / '+needed+' Lane · 호환 Packet·Swing·RF screen'},
  {key:'optical',label:'Optical',max:20,value:20*ratio(opticalGood),detail:opticalGood+' / '+needed+' Lane · 연결·Average·Extinction'},
  {key:'geometry',label:'Placement / Routing',max:10,value:Math.max(0,10-2*result.routing.errorCount),detail:result.routing.errorCount+' Planning 오류 · 오류당 −2 (최대 −10)'},
  {key:'goal',label:'Level Goal',max:10,value:goal.complete?10:0,detail:goal.complete?'Solver와 현재 Level 추가 조건 충족':design.brief==='architecture'?goal.reason:design.brief==='rf'?'본인 Baseline 대비 RF 개선 및 동일 환경 필요':design.brief==='stable'?'네 Environment Corner까지 유효해야 합니다.':'Lane 수·Level 제약을 모두 충족해야 합니다.'}
 ].map(item=>({...item,value:Math.round(item.value*10)/10}));
 let score=Math.round(items.reduce((a,item)=>a+item.value,0));if(!goal.complete)score=Math.min(score,99);
 const next=result.issues.find(i=>i.c)||result.issues[0];
 return {score,items,target,needed,goalComplete:!!goal.complete,status:result.status,nextAction:goal.complete?'목표 충족 · Power / Area / Optical I/O의 Trade-off를 비교하세요.':next?.text||goal.reason||'현재 Level의 추가 조건을 완료한 뒤 Test하세요.',result};
}
export function solutionLaserInputs(design){return design.components.filter(c=>['laser','laserhs'].includes(c.type)).map(c=>c.params.power).sort((a,b)=>a-b);}
export function solutionComparison(current,reference){
 if(isWDM(current))return {mine:wdmAssessment(current),solution:wdmAssessment(reference),comparable:wdmConditions(current,reference),sameEnvironment:JSON.stringify(current.environment)===JSON.stringify(reference.environment),sameLaser:Math.abs(solve(current).sourceTotalMw-solve(reference).sourceTotalMw)<1e-8,sameSolver:true,sameCustomer:current.wdm.customer===reference.wdm.customer,scoreDelta:wdmConditions(current,reference)?wdmAssessment(current).score-wdmAssessment(reference).score:null,envelopes:[solve(current).envelope,solve(reference).envelope]};
 const mine=solutionAssessment(current),solution=solutionAssessment(reference),a=current.environment,b=reference.environment,sameEnvironment=a.temperature===b.temperature&&a.wavelength===b.wavelength,sameLaser=JSON.stringify(solutionLaserInputs(current))===JSON.stringify(solutionLaserInputs(reference)),sameSolver=mine.result.version===solution.result.version,sameCustomer=current.brief!=='architecture'||current.scaling.customer===reference.scaling?.customer,sameAssembly=!isPackage(current)||current.package.width===reference.package?.width&&current.package.height===reference.package?.height&&JSON.stringify(current.package.assembly)===JSON.stringify(reference.package?.assembly),comparable=current.brief===reference.brief&&sameEnvironment&&sameLaser&&sameSolver&&sameCustomer&&sameAssembly;
 const envelope=d=>{const r=d.components.map(componentRect);return r.length?(Math.max(...r.map(c=>c.x+c.w))-Math.min(...r.map(c=>c.x)))*(Math.max(...r.map(c=>c.y+c.h))-Math.min(...r.map(c=>c.y)))/10000:0;};
 return {mine,solution,comparable,sameEnvironment,sameLaser,sameSolver,sameCustomer,scoreDelta:comparable?mine.score-solution.score:null,envelopes:[envelope(current),envelope(reference)]};
}
export function solutionWorkflow(brief){return isWDM({brief})?'독립 Electrical Data → 파장별 Source / Splitter → Mux Port Mapping → 실제 Output Test → Tile /4 Path → 같은 Total Optical Budget에서 Architecture 비교.':isPackage({brief})?'Engine 보존 → EIC / PIC Zone 배치 → FAU Channel 연결·Route → Nominal Test → Heatmap / Cooling 개선 → Corner / Seeded Assembly Test → 같은 조건으로 Compare.':brief==='architecture'?'16×100G를 Test → Snapshot 저장 → 8×200G를 Test → Snapshot 저장 → 같은 조건으로 Compare → Customer 조건 선택 → 현재 Architecture 선택 → Fresh Test. 한 예시를 적용하는 것만으로 Level 8이 완료되지 않습니다.':brief==='rf'?'본인 RF Baseline의 표시된 Route를 선택 → Driver 또는 Waypoint 수정 → RF 길이·손실 감소 확인 → Test → Before / After. 예시의 위치를 그대로 복제할 필요는 없습니다.':brief==='stable'?'Nominal Test → 네 Temperature / Wavelength Corner 확인 → 실패 Lane의 Bias / Tuning / Swing 조정 → 다시 Test.':isScaling({brief})?'한 Lane 제작 → Optical / RF 연결 → Test → Tile 지정 → Array Preview / 생성 → Distribution 연결 → 모든 Lane Test → Snapshot.':'Layout에서 Optical / RF 연결과 주요 Parameter 확인 → 내 설계와 비교 → 부족한 Lane / Route 수정 → Test → 다음 Level.';}

export function packageAssessment(d,r=solve(d)){
 const goal=packageGoal(d,r),fraction=assemblyFresh(d)?d.package.assemblyResult.passFraction:0,clamp=x=>Math.max(0,Math.min(1,x)),geometry=r.packageGeometry,thermal=r.thermal;
 const items=[{key:'functional',label:'Functional Performance',max:40,value:40*clamp(r.gross/1600),detail:r.gross+' / 1600 Gb/s · Thermal / Optical 실패 제외'}, {key:'geometry',label:'Package Geometry',max:30,value:Math.max(0,30-3*geometry.errorCount),detail:geometry.errorCount+' Geometry / Mapping 오류 · 오류당 −3'}, {key:'thermal',label:'Thermal Requirement',max:15,value:d.brief==='package'?15:15*clamp((65-thermal.max+15)/15),detail:d.brief==='package'?'Level9 Thermal 비활성화':thermal.max.toFixed(1)+' °C · ≤65 °C에서 15점, 초과 1 °C당 −1'}, {key:'assembly',label:'Assembly Robustness',max:15,value:d.brief!=='assembly'?15:15*clamp(fraction/.9),detail:d.brief!=='assembly'?'이 Level에서 미평가':assemblyFresh(d)?'Simulated pass fraction '+(fraction*100).toFixed(1)+'% · ≥90%에서 15점':'Fresh Seeded Monte Carlo 필요'}].map(i=>({...i,value:Math.round(i.value*10)/10}));let score=Math.round(items.reduce((a,i)=>a+i.value,0));if(!goal.complete)score=Math.min(score,99);return {score,items,target:1600,needed:r.physicalLanes,goalComplete:goal.complete,status:r.status,nextAction:r.issues[0]?.text||goal.reason||'목표 충족 · Package Trade-off를 비교하세요.',result:r};
}
