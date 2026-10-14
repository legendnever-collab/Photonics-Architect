import {isLink,linkDefaults} from './link-models.js';
import {isPhysical} from './physical-models.js';
import {enterPhysical,physicalGoal} from './physical-engine.js';
import {isWDM} from './wdm-models.js';
import {enterWDM,wdmGoal} from './wdm-engine.js';
// One campaign contract for navigation, completion, entry, goals and available solutions.
import {solve,validateImport,capture} from './core.js';
import {architectureGoal,startScaling} from './arrays.js';
import {packageGoal,enterPackage} from './package-engine.js';
import {beginRF} from './campaign.js';
const rows=[
 ['first','First Engine','1310 nm Laser로 4-Lane / 100G NRZ Engine을 완성하세요.','Laser → Splitter → Modulator → Output · Driver → RF','legacy',['mzm','mrm','eam'],'Nominal VALID Test'],
 ['compact','Compact Engine','100G를 유지하며 Component Area 합을 6.4 mm² 이하로 줄이세요.','Modulator / EIC를 함께 선택하고 면적·전력을 비교하세요.','legacy',['mrm','eam'],'Nominal VALID Test / Area'],
 ['stable','Stable Engine','온도 ±3 °C · Laser ±0.03 nm의 네 Corner에서도 100G를 유지하세요.','Nominal과 네 Temperature / Wavelength Corner를 확인하세요.','legacy',['mzm','mrm','eam'],'Nominal + four Environment Corners'],
 ['rf','Shorten the RF Path','100G를 유지하며 본인 Baseline의 대상 RF Route 길이와 손실을 줄이세요.','Driver 위치 → RF Waypoint → Test → Before / After','legacy',['mzm','mrm','eam'],'Fresh VALID Test / Same-condition RF Baseline improvement'],
 ['optical','Route the Optical Engine','Keep-out을 피해 실제 Optical Route를 연결하고 4-Lane / 100G를 유지하세요.','Optical Route 선택 → Waypoint 우회 → Test','legacy',['mzm','mrm','eam'],'Fresh VALID Test / Planning Geometry'],
 ['scale400','4 × 100G Engine','4×100G PAM4 / 50GBd로 400G Engine을 만드세요.','100G Design을 보존합니다. 고속 MZM / EIC와 Distribution을 다시 구성하세요.','scaling',['hs100'],'Fresh VALID Test / 400G'],
 ['scale1600','Build Your 1.6T','16×100G / 8×200G PAM4로 1.6T Engine을 만드세요.','완료한 Lane을 Tile / Array로 확장하고 모든 Lane을 Test하세요.','scaling',['hs100','hs200'],'Fresh VALID Test / 1.6T'],
 ['architecture','Architecture Comparison','동일 조건의 16×100G / 8×200G를 비교하고 Customer 조건에 맞게 선택하세요.','두 유효 Snapshot → Compare → Customer → Architecture 선택 → Test','scaling',['hs100','hs200'],'Fresh VALID Test / two actual tested Architectures / Customer choice'],
 ['package','Fit the Package','1.6T Engine을 ≤18 ×14 mm Package에 배치하고 FAU를 연결하세요.','기존 Engine 유지 · Package Boundary / PIC·EIC·I/O Zone / Route 조정','package',['compact','distributed'],'Fresh VALID Test / Package Geometry / FAU Mapping'],
 ['thermal','Cool the Engine','1.6T를 유지하며 Estimated Hotspot ≤65 °C를 만족하세요.','Hotspot 선택 → 배치 / Cooling 조정 → RF·열·전력 Trade-off 확인','package',['compact','distributed'],'Fresh VALID Test / Thermal Requirement'],
 ['assembly','Survive Assembly Variation','1.6T Nominal과 Stress Corners, Simulated Pass Fraction ≥90% / ≥64 samples를 만족하세요.','Interface / Assembly Strategy → Corners → Seeded Monte Carlo → Compare','package',['compact','distributed'],'Fresh VALID Test / eight Stress Corners / same-design completed MC'],
 ['wdmpath','Build a 4-Wavelength Path','독립4×100G PAM4 Channel을4λ Mux로 묶어 한 Optical Output /400G를 만드세요.','Source λ → 독립 EIC / MZM → Mux Mapping → Detuning / Test','wdm',['wdm'],'Fresh VALID Test / four independent wavelength channels'],
 ['wdmengine','Scale to a 1.6T WDM Engine','4 Spatial ×4λ ×100G =1.6T ·16 Data Channels /4 Optical Outputs','한 유효 WDM Path를 Tile로 지정 →4 Path Array → 파장별1×4 Distribution → Test','wdm',['wdm'],'Fresh VALID Test / 16 data channels / four output paths'],
 ['wdmarchitecture','Choose Your Optical Parallelism','동일 고객 / Total Source Budget에서 Spatial·Fast·WDM을 비교하고 선택하세요.','세 Architecture 실제 Test / Snapshot → 동일 조건 Compare → Customer / 선택 → Test','wdm',['spatial','fast','wdm'],'Fresh VALID Test / three tested snapshots / common conditions / customer choice'],
 ['picfloor','PIC Floorplan Challenge','1.6T Engine을 PIC Die에 배치하고 Overlap / Boundary / Clearance를 해결하세요.','위반 Marker 선택 → Component 이동 → Port 방향과 Corridor 확인 → Test','physical',['compact','loss','balanced'],'Fresh VALID Test / Placement + DRC-lite'],
 ['picroute','Waveguide Routing Challenge','Bend Radius와 실제 Crossing을 평가하고 1.6T Optical Route를 개선하세요.','Route 선택 → Waypoint / Radius 편집 → Loss 변화 확인 → Test','physical',['compact','loss','balanced'],'Fresh VALID Test / Rounded Routes + DRC-lite'],
 ['picwdm','WDM Physical Integration','4 Spatial ×4λ Engine의 Mux Mapping과 Thermal Filter Drift를 제어하세요.','Mux 배치 → λ Route / Shared Bus → Filter Drift / Loss → Test','physical',['compact','loss','balanced'],'Fresh VALID Test / WDM + Filter Thermal'],
 ['picoptimize','PIC Design Optimization','고객 가중치에 맞춰 유효 1.6T PIC Design의 Score ≥60을 달성하세요.','My PIC → Optimize → Snapshot → 두 Reference와 Layout / Loss / Score 비교','physical',['compact','loss','balanced'],'Fresh VALID Test / Feasibility Gate + Score ≥60'],
 ['fastbuild','Fast & Narrow Engine','실제8×200G PAM4 Engine을 구성하세요.','고속 MZM / EIC 배치 →8 Lane →Test','link',['compact','loss'],'Fresh VALID Test /8×200G'],
 ['rxfirst','First Receiver','Calibrated Optical Input → GePD → TIA → Measurement를 연결하세요.','25G NRZ Profile / Bias / BW / Operating Range','link',['compact','loss'],'Fresh Receiver Screen'],
 ['linkcomplete','Complete the Link','본인의 Tx → Fiber Channel → Receiver Link를 완성하세요.','모든 Tx Lane의 PD / TIA / Electrical Measurement 연결','link',['compact','loss'],'Fresh Tx–Rx Screen'],
 ['linkcustomer','Customer Link Challenge','거리·Physical I/O·Electrical Power·Rx 조건을 동시에 만족하세요.','Architecture 선택 → Channel → Customer 조건 확인','link',['compact','loss'],'Fresh Customer Link Screen'],
 ['tapmonitor','Monitoring Plan','Tap / DC Readout / 적절한 Test Access를 구성하고 Main Link를 유지하세요.','Tap 손실과 Signal Range → 비교 가능한 관측 Plan','link',['compact','loss'],'Fresh Link + Observability / Access'],
 ['faultdiagnosis','Observable Fault Diagnosis','설치한 Monitor로만 고장을 판별하거나 Ambiguous로 답하세요.','관측값·Baseline 비교 → 구분 가능한 원인만 선택 →Test','link',['compact','loss'],'Fresh Observations + Valid Answer']
];
export const CAMPAIGN=Object.freeze(rows.map(([id,title,goal,focus,kind,solutions,requiredTests],i)=>Object.freeze({id,number:i+1,title,goal,focus,kind,solutions:Object.freeze(solutions),requiredTests,next:[17,18,21].includes(i)?null:rows[i+1]?.[0]||null,solver:kind==='link'?'0.8.0':kind==='physical'?'0.7.0':kind==='wdm'?'0.6.0':kind==='legacy'?'0.3.0':kind==='scaling'?'0.4.1':'0.5.0',completion:(d,r)=>campaignPredicate(id,d,r),entry:(d)=>campaignEntry(d,id)})));
export const campaignLevel=id=>CAMPAIGN.find(l=>l.id===id);
export const campaignNumbers=Object.freeze(Object.fromEntries(CAMPAIGN.map(l=>[l.id,l.number])));
export function campaignPredicate(id,d,r=solve(d)){
 if(id!==d.brief)return {ready:false,complete:false,reason:'선택 Level과 Design이 다릅니다.'};
 const level=campaignLevel(id);if(!level)return {ready:false,complete:false,reason:'알 수 없는 Level'};
 if(level.kind==='link')return {ready:true,complete:!!r.link?.complete,reason:r.issues[0]?.text||'Receiver / Monitoring / Fault 조건을 확인하세요.'};
 if(level.kind==='physical')return physicalGoal(d,r);
 if(level.kind==='wdm')return wdmGoal(d,r);
 if(level.kind==='package')return packageGoal(d,r);
 if(level.kind==='scaling')return id==='architecture'?{...architectureGoal(d),ready:true}:{ready:true,complete:r.status==='VALID'&&r.gross===(id==='scale400'?400:1600),reason:r.issues[0]?.text||'모든 Lane의 Fresh Test가 필요합니다.'};
 if(id!=='rf')return {ready:true,complete:r.status==='VALID'&&r.gross===100&&(id!=='optical'||r.routing.errorCount===0),reason:r.issues[0]?.text||'현재 목표의 Fresh VALID Test가 필요합니다.'};
 const q=d.challenge;if(!q)return {ready:false,complete:false,reason:'유효한 Engine을 Test해 RF Baseline을 만드세요.'};
 const before=solve(q.baseline.design),lane=before.lanes.find(l=>l.rf?.net===q.targetNet),after=r.lanes.find(l=>l.rf?.net===q.targetNet);if(!lane?.rf||before.status!=='VALID')return {ready:false,complete:false,reason:'RF Baseline이 유효하지 않습니다. 원본 조건을 확인하세요.'};
 const alreadyOptimized=lane.rf.length<=.35,targetLength=alreadyOptimized?.35:Math.max(.35,lane.rf.length*.75),sameConditions=JSON.stringify(d.environment)===JSON.stringify(q.baseline.design.environment)&&q.baseline.solverVersion===r.version;
 return {ready:true,targetNet:q.targetNet,before:lane.rf,after:after?.rf,targetLength,alreadyOptimized,sameConditions,complete:r.status==='VALID'&&r.routing.errorCount===0&&sameConditions&&!!after?.rf&&after.rf.length<=targetLength+1e-7&&(alreadyOptimized||after.rf.loss<lane.rf.loss-1e-7),reason:!sameConditions?'RF Baseline과 환경 / Solver가 다릅니다.':alreadyOptimized?'Baseline RF가 이미 ≤0.35 mm입니다. Fresh Test로 확인하세요.':'대상 RF를 ≤'+targetLength.toFixed(2)+' mm로 줄이고 다시 Test하세요.'};
}
export function campaignState(d,r,dirty,hasTest=true){const level=campaignLevel(d.brief),goal=level.completion(d,r),fresh=!dirty&&hasTest,complete=fresh&&goal.complete;return {level,goal,fresh,complete,state:fresh?'Fresh Test Result':hasTest?'STALE — 이전 결과':'Live Preview',canNext:complete&&!!level.next,reason:!fresh?'설계 / 조건 변경 또는 Resume 후 Fresh Test가 필요합니다.':!goal.complete?goal.reason||r.issues[0]?.text||'현재 목표를 완료하세요.':level.next?'다음 Level로 이동할 수 있습니다.':'Campaign Complete · Free Design / Compare 가능'};}
export function campaignEntry(current,id,{newDesign=false}={}){
 const level=campaignLevel(id);if(!level)throw Error('지원하지 않는 Campaign Level');let d=structuredClone(current);
 if(level.kind==='link'){if(newDesign)d={...d,components:[],nets:[],snapshots:[],next:1,challenge:null};d.brief=id;d.link??=linkDefaults();if(id==='fastbuild'){d.link.architecture='fast';d.link.txBrief='architecture';}d.physical={enabled:false};d.package={enabled:false};return validateImport(d);}
 if(level.kind==='physical')return enterPhysical(current,id,{newDesign});
 if(level.kind==='wdm')return enterWDM(current,id,{newDesign});
 if(newDesign){d=startScaling(current,level.kind==='package'?'scale1600':id,current.scaling?.profile||'hs100');if(level.kind==='legacy'){d.components=[];d.nets=[];d.schema=3;d.brief=id;delete d.scaling;}}
 if(level.kind==='legacy'){d.brief=id;d.schema=3;d.package={enabled:false};}
 else {d.scaling??={version:1,profile:'hs100',tiles:[],arrays:[],customer:'power',choice:null};d.schema=4;if(level.kind==='package')enterPackage(d,id);else {d.brief=id;d.package={enabled:false};}}
 if(id==='rf'){d.challenge=null;beginRF(d);}else d.challenge=null;
 if(id==='architecture'&&current.brief!==id)d.scaling.choice=null;
 const valid=validateImport(d);if(id==='optical'&&current.brief!==id){valid.snapshots.push(capture(valid,'Optical Start · '+valid.name));valid.snapshots=valid.snapshots.slice(-6);}return valid;
}
export function campaignTransition(current,r,dirty){const state=campaignState(current,r,dirty,true);if(!state.canNext)throw Error(state.reason);const preserved=capture(current,'Level '+state.level.number+' Complete · '+current.name),input=structuredClone(current);input.snapshots=[...input.snapshots,preserved].slice(-6);const design=campaignEntry(input,state.level.next);return {design,preserved,from:state.level.id,to:state.level.next,notice:state.level.number===5?'100G Engine 원본과 Layout을 보존했습니다. 새 목표는 400G PAM4입니다. 기존 저속 부품은 자동으로 고속 부품이 되지 않습니다. 고속 MZM / EIC를 다시 배치하거나 별도 Architecture를 시작하세요.':state.level.number===8?'1.6T Engine을 보존하고 Package 조건을 활성화했습니다. Boundary / Zone / FAU를 구성하세요.':'기존 Design을 보존했습니다. 새로운 목표로 Fresh Test가 필요합니다.'};}
export function validateCampaignArchive(value){if(!Array.isArray(value)||value.length>24)throw Error('Campaign Archive 오류');const ids=new Set;return value.map(s=>{if(!campaignLevel(s.level)||ids.has(s.level)||typeof s.name!=='string'||s.name.length>100||s.design?.brief!==s.level)throw Error('Campaign Archive Level 오류');ids.add(s.level);return {level:s.level,name:s.name,solverVersion:s.solverVersion,design:validateImport(s.design)};});}
