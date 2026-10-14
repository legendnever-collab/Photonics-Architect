// Stable IDs are independent of displayed Track-local level numbers.
export const TRACKS=Object.freeze([
 {id:'fast-narrow',title:'Fast & Narrow',architecture:'8 ×200G PAM4',arch:'fast',rate:200,lanes:8,firstTarget:200,tradeoff:'100GBd · 높은 Bandwidth / 적은 Optical I/O'},
 {id:'slow-wide',title:'Slow & Wide',architecture:'16 ×100G PAM4',arch:'slow',rate:100,lanes:16,firstTarget:100,tradeoff:'50GBd · 더 많은 Lane / 완화된 Bandwidth'},
 {id:'wdm',title:'WDM',architecture:'4 Spatial ×4λ ×100G',arch:'wdm',rate:100,lanes:16,firstTarget:400,tradeoff:'50GBd · 4λ Mapping / Mux–Demux Loss / 적은 Optical I/O'}
].map(t=>({...t,levels:Array.from({length:6},(_,i)=>t.arch+'-track-'+(i+1)),scope:'Tx → Channel → Rx → Monitoring · 6 Levels',related:[]})));
const titles=['첫 Data Channel과 Tx','1.6T로 확장','PIC Routing / Package Interface','Channel과 Receiver 연결','Monitoring / Test Access','최종 Link 평가'];
export const TRACK_MISSIONS=Object.freeze(TRACKS.flatMap(t=>t.levels.map((id,i)=>({id,track:t.id,arch:t.arch,number:i+1,title:titles[i],target:i===0?t.firstTarget:1600,txOnly:i<3,phase:i<3?'fastbuild':i===3?'linkcomplete':i===4?'tapmonitor':'faultdiagnosis',goal:i===0?(t.arch==='wdm'?'4λ ×100G의 첫 400G Tx Path를 연결하세요.': '첫 '+t.rate+'G PAM4 Tx Lane을 연결하세요.'):i===1?t.architecture+' =1.6T Tx를 완성하세요.':i===2?'1.6T를 유지하고 실제 Route / Output Interface를 검증하세요.':i===3?'모든 Data Channel을 호환 PD / TIA / Measurement에 연결하세요.':i===4?'Main Link를 유지하며 DC Monitor와 Optical Test Access를 구성하세요.':'전체 Link를 Test하고 관측 가능한 Fault 또는 Ambiguous를 평가하세요.',focus:i<3?'Add → Tx Lane / Path → Optical feed → Test':i===3?'Tx Output → Channel → '+(t.arch==='wdm'?'Demux → ':'')+'PD → TIA → Measurement':i===4?'Optical Net 선택 → Tap / DC Readout → Test Access':'Fault Exercise → 설치한 Monitor 관측 → 답 선택 → Test',next:t.levels[i+1]||null}))));
export const trackMission=id=>TRACK_MISSIONS.find(m=>m.id===id);
export const trackPhase=d=>trackMission(d.brief)?.phase||d.brief;
export const trackTxOnly=d=>trackMission(d.brief)?.txOnly||d.brief==='fastbuild';
