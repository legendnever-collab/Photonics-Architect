import {capture,solve,validateImport} from './core.js';
import {prepareReferenceApplication,referenceDesigns} from './references.js';
import {wdmGoal} from './wdm-engine.js';
import {WDM_CUSTOMERS} from './wdm-models.js';

// One explicit apply -> actual Test -> persistence contract for both Solution entry points.
export async function applyTestedSolution(api,prepared){
 api.checkpoint();api.set({design:prepared.design,selected:null,pending:null,placing:null,addingWaypoint:null});
 api.closePanels?.();api.changed();document.getElementById('modal').close();document.getElementById('fit').click();
 api.run();if(innerWidth<=900){const d=api.get().design,focus=d.components.find(c=>/^hs/.test(c.type))||d.components[0];if(focus){api.set({selected:focus.id});document.getElementById('selectionZoom').click();}}await api.persist();
}
export function bindSolutionEntryPoints(open){for(const id of ['reference','levelSolution']){const button=document.getElementById(id);if(button)button.onclick=open;}}
export function fitsWDMCustomer(design,result=solve(design)){const cap=WDM_CUSTOMERS[design.wdm.customer];return result.status==='VALID'&&result.gross===1600&&result.powerW<=cap.power&&result.area<=cap.area&&result.physicalLanes<=cap.io;}
// The full worked solution is opt-in and visibly supplies three independently solved
// same-condition examples. It never forges completion, uses a cached score, or bypasses Test.
export function prepareWorkedReferenceApplication(current,ref){
 const prepared=prepareReferenceApplication(current,ref);if(current.brief!=='wdmarchitecture')return prepared;
 const next=prepared.design,total=solve(next).sourceTotalMw;
 const examples=referenceDesigns('wdmarchitecture',next.environment).map(r=>{
  const design=structuredClone(r.design);design.wdm.customer=next.wdm.customer;
  design.wdm.io={...structuredClone(next.wdm.io),channels:design.wdm.io.channels,mapping:design.wdm.io.mapping};
  for(const source of design.components.filter(c=>['source4','laserhs'].includes(c.type)))source.params.power=10*Math.log10(total/(source.type==='source4'?4:1));
  const valid=validateImport(design),result=solve(valid);if(result.status!=='VALID'||result.gross!==1600)throw Error('전체 풀이의 '+r.name+' Test가 실패했습니다: '+(result.issues[0]?.text||result.status));
  return capture(valid,'Worked Solution · '+r.name);
 });
 if(!fitsWDMCustomer(next))throw Error('선택 Solution이 현재 Customer 요구를 충족하지 않습니다. 고객 조건에 맞는 Architecture를 선택하세요.');
 next.snapshots=[...next.snapshots,...examples].slice(-6);next.wdm.choice=next.wdm.architecture;
 if(!wdmGoal(next,solve(next)).complete)throw Error('실제 Comparison / Customer / Source 조건이 일치하지 않습니다.');
 return {...prepared,design:validateImport(next),comparison:examples};
}
