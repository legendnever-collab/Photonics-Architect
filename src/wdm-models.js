// Explicit educational grid: not CWDM/LAN-WDM or a measured device.
export const WDM_VERSION='0.6.0';
export const WDM_MODEL_VERSION='1.0.0-wdm';
export const WDM_LEVELS=['wdmpath','wdmengine','wdmarchitecture'];
export const isWDM=d=>WDM_LEVELS.includes(d.brief);
export const WDM_GRID=Object.freeze({id:'edu-ob4',name:'Educational O-band 4λ',centers:[1304,1308,1312,1316],spacingNm:4,fwhmNm:2,range:[1302,1318],grade:'Educational / Assumed',temperatureShift:'Unsupported; spectral shift is not modeled',standard:'No CWDM / LAN-WDM compliance claim'});
export const WDM_COLORS=['#ffb76b','#70dd9a','#78c9ff','#cf9cff'];
export const WDM_CUSTOMERS={efficiency:{name:'Electrical + Area',power:4.2,area:20,io:16},density:{name:'Optical I/O Density',power:5,area:26,io:4},compact:{name:'Compact Envelope',power:5,area:16,io:8}};
const wdmPort=(id,dir,x,y)=>({id,kind:'optical',dir,x,y});
export const WDM_LIB={
 source4:{name:'4λ CW Source Bank',w:90,h:160,color:'#ffc17e',ports:WDM_GRID.centers.map((_,i)=>wdmPort('l'+i,'out',90,20+i*35)),params:{power:18,w0:1304,w1:1308,w2:1312,w3:1316},model:'edu-ob4-source'},
 laserwdm:{name:'Selectable CW λ',w:90,h:55,color:'#ffc17e',ports:[wdmPort('out','out',90,28)],params:{power:18,wavelength:1304},model:'edu-ob4-cw'},
 mux4:{name:'4×1 WDM Mux',w:80,h:160,color:'#c9a0ff',ports:[...WDM_GRID.centers.map((_,i)=>wdmPort('i'+i,'in',0,20+i*35)),wdmPort('out','out',80,80)],params:{insertion:2,offset:0,bandwidth:2,isolation:30},model:'gaussian-intensity-mux'}
};
for(const [id,v]of Object.entries(WDM_LIB))Object.assign(v,{id,version:WDM_MODEL_VERSION,grade:'Educational',evidence:'Assumed',source:'docs/MODELS_V060.md',format:'PAM4'});
export function muxTransmission(params,port,wavelength){const center=WDM_GRID.centers[port]+params.offset,detuning=wavelength-center,passband=Math.exp(-4*Math.log(2)*(detuning/params.bandwidth)**2),floor=10**(-params.isolation/10),normalized=floor+(1-floor)*passband,transmission=10**(-params.insertion/10)*normalized;return {center,wavelength,detuning,passband,transmission,lossDb:-10*Math.log10(transmission),insertionDb:params.insertion,filterDb:-10*Math.log10(normalized)};}
export function wdmDefaults(){return {version:1,grid:WDM_GRID.id,architecture:'wdm',tiles:[],arrays:[],customer:'density',choice:null,io:{enabled:false,channels:4,pitch:25,x:1900,y:800,orientation:90,profile:'compact',mapping:[],sample:{x:0,y:0,rotation:0,residual:[]}}};}
export function validateWDMState(d){if(!isWDM(d)&&!(d.physical?.enabled&&d.physical.architecture==='wdm')){if(d.components.some(c=>WDM_LIB[c.type]))throw Error('WDM components require an explicit WDM Level');return;}
 const w=d.wdm;if(!w||w.version!==1||w.grid!==WDM_GRID.id||!['wdm','spatial','fast'].includes(w.architecture)||!WDM_CUSTOMERS[w.customer]||w.choice!==null&&!['wdm','spatial','fast'].includes(w.choice)||!Array.isArray(w.tiles)||w.tiles.length>4||!Array.isArray(w.arrays)||w.arrays.length>4)throw Error('WDM state / profile 오류');
 const ids=new Set(d.components.map(c=>c.id));for(const t of w.tiles)if(typeof t.id!=='string'||!ids.has(t.mux)||!ids.has(t.output)||!Array.isArray(t.modulators)||t.modulators.length!==4||t.modulators.some(id=>!ids.has(id)))throw Error('WDM Tile 오류');for(const a of w.arrays)if(!Array.isArray(a.components)||a.components.some(id=>!ids.has(id)))throw Error('WDM Array 오류');
 if(w.architecture!=='wdm'&&(!d.scaling||!['hs100','hs200'].includes(d.scaling.profile)))throw Error('Comparison Architecture state 오류');
 const io=w.io;if(!io||typeof io.enabled!=='boolean'||![1,4,8,16].includes(io.channels)||!Number.isFinite(io.pitch)||io.pitch<10||io.pitch>100||![io.x,io.y].every(Number.isFinite)||![0,90,180,270].includes(io.orientation)||!['compact','expanded'].includes(io.profile)||!Array.isArray(io.mapping)||io.mapping.length>16||io.mapping.some(m=>!ids.has(m.output)||!Number.isInteger(m.channel)||m.channel<0||m.channel>=io.channels||!Array.isArray(m.waypoints)||m.waypoints.length>16||m.waypoints.some(p=>![p.x,p.y].every(Number.isFinite))))throw Error('WDM FAU state 오류');
 if(!io.sample||![io.sample.x,io.sample.y,io.sample.rotation].every(Number.isFinite)||Math.abs(io.sample.x)>20||Math.abs(io.sample.y)>20||Math.abs(io.sample.rotation)>1||!Array.isArray(io.sample.residual)||io.sample.residual.length>16||io.sample.residual.some(p=>![p.x,p.y].every(Number.isFinite)||Math.abs(p.x)>20||Math.abs(p.y)>20))throw Error('WDM Assembly scenario 오류');
 d.schema=6;d.solverVersion=WDM_VERSION;
}
