import {campaignLevel,campaignEntry} from './campaign-registry.js';
import {isPackage} from './package-models.js';
import {packageGoal,enterPackage} from './package-engine.js';
import {isScaling} from './scaling-models.js';
import {architectureGoal} from './arrays.js';
import {capture,solve,empty,add,connect,editRoute,routeInfo} from './core.js';
export function challengeProgress(d,r=solve(d)){return campaignLevel(d.brief).completion(d,r);}
export function beginRF(d){if(d.brief!=='rf'||d.challenge)return false;const r=solve(d);if(r.status!=='VALID')return false;const lane=[...r.lanes].sort((a,b)=>Math.min(a.rf.swing/a.rf.requiredSwing,a.rf.bwRatio)-Math.min(b.rf.swing/b.rf.requiredSwing,b.rf.bwRatio))[0];const baselineDesign=structuredClone(d);baselineDesign.snapshots=[];baselineDesign.challenge=null;delete baselineDesign.packageEngineBackup;d.challenge={level:'rf',targetNet:lane.rf.net,baseline:capture(baselineDesign,'RF Baseline · '+d.name)};return true;}
export function enterLevel(d,brief){Object.assign(d,campaignEntry(d,brief));}
export function practiceDesign(level='rf',type='mzm'){const d=empty();d.name=level==='rf'?'RF Practice Engine':'Optical Keep-out Practice';d.brief=level;const laser=add(d,'laser',20,285),split=add(d,'splitter',160,250);connect(d,{component:laser.id,port:'out'},{component:split.id,port:'in'});for(let i=0;i<4;i++){const y=100+i*130,m=add(d,type,430,y),driver=add(d,({mzm:'driver',mrm:'drivermrm',eam:'driveream'}[type]),455,y-60),out=add(d,'output',800,y+5);connect(d,{component:split.id,port:'o'+i},{component:m.id,port:'in'});const rf=connect(d,{component:driver.id,port:'rf'},{component:m.id,port:'rf'});connect(d,{component:m.id,port:'out'},{component:out.id,port:'in'});if(level==='rf'&&!i){const rec=editRoute(d,rf);rec.waypoints=[{x:390,y:85},{x:390,y:100}];}}if(level==='rf')beginRF(d);return d;}
