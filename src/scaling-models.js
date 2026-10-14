// Coefficients are scenario assumptions, not a commercial device calibration.
export const SCALING_VERSION='0.4.1';
export const SCALING_MODEL_VERSION='1.0.0';
export const SCALING_LEVELS=['scale400','scale1600','architecture','package','thermal','assembly'];
export const isScaling=d=>SCALING_LEVELS.includes(d.brief);
export const planningBounds=d=>d.link?{w:4000,h:2400}:d.physical?.enabled?{w:d.physical.die.width,h:d.physical.die.height}:(isScaling(d)||['wdmpath','wdmengine','wdmarchitecture'].includes(d.brief))?{w:2000,h:1600}:{w:1000,h:650};
export const HS_PROFILES={
 hs100:{rate:100,baud:50,modulation:'PAM4',vpi:2.4,loss:3,bw:45,driverBW:50,swing:1.8,channelW:.22,overheadW:.12},
 hs200:{rate:200,baud:100,modulation:'PAM4',vpi:2.2,loss:3.3,bw:75,driverBW:85,swing:2,channelW:.48,overheadW:.30}
};
const hsPort=(id,kind,dir,x,y)=>({id,kind,dir,x,y});
export const HS_LIB={};
for(const [type,w,h] of [['hs100',100,38],['hs200',125,42]])HS_LIB[type]={name:'Generic '+HS_PROFILES[type].rate+'G PAM4 MZM',w,h,color:'#b5a2ff',ports:[hsPort('in','optical','in',0,h/2),hsPort('out','optical','out',w,h/2),hsPort('rf','rf','in',w/2,0)],params:{bias:0},profile:type};
for(const [type,profile,w,h] of [['eic100','hs100',190,45],['eic200','hs200',240,55]])HS_LIB[type]={name:'Generic '+HS_PROFILES[profile].rate+'G ×4 EIC',w,h,color:'#ffaf69',ports:Array.from({length:4},(_,i)=>hsPort('rf'+i,'rf','out',25+i*(w-50)/3,h)),params:{swing:HS_PROFILES[profile].swing},profile,channels:4};
HS_LIB.laserhs={name:'External CW · Scaling',w:80,h:55,color:'#5ce1e6',ports:[hsPort('out','optical','out',80,28)],params:{power:23}};
for(const count of [8,16])HS_LIB['split'+count]={name:'Educational 1×'+count+' Splitter',w:85,h:count*24+20,color:'#59dfe9',division:count,ports:[hsPort('in','optical','in',0,(count*24+20)/2),...Array.from({length:count},(_,i)=>hsPort('o'+i,'optical','out',85,22+i*24))],params:{excess:count===8?.9:1.2}};
for(const [type,def] of Object.entries(HS_LIB))Object.assign(def,{id:type,version:SCALING_MODEL_VERSION,grade:'Educational',evidence:'Assumed',format:'PAM4',source:'docs/MODELS_V041.md',model:type+'-1'});
export function hsRF(profile,swing,mm,driverTemperature=25){const p=HS_PROFILES[profile],f=p.baud/2,alpha=.35*Math.sqrt(f/25)+.05*f/25,loss=alpha*mm,routeBW=130/(1+mm/2),poles=[p.driverBW/(1+.0015*Math.max(0,driverTemperature-25)),p.bw,routeBW];const attenuation=freq=>(.35*Math.sqrt(freq/25)+.05*freq/25)*mm,amplitude=freq=>10**(-attenuation(freq)/20)*poles.reduce((a,bw)=>a/Math.sqrt(1+(freq/bw)**2),1),effective=swing*amplitude(f);
 // A conservative sum of pole tail residues at half a symbol: a planning proxy, not an eye/BER simulation.
 const residual=Math.min(1,poles.reduce((a,bw)=>a+Math.exp(-Math.PI*bw/p.baud),0));
 return {length:mm,loss,swing:swing*10**(-loss/20),effectiveSwing:effective,convention:'Vppd',requiredSwing:1,bw:Math.min(...poles),bwRatio:Math.min(...poles)/f,bandwidthRatioName:'minimum pole / half-baud (screen only)',residual,spectrum:[.25,.5,.75].map(k=>({ghz:p.baud*k,loss:attenuation(p.baud*k),amplitude:amplitude(p.baud*k)}))};}
export function pam4Levels(profile,swing,bias=0){const p=HS_PROFILES[profile],electrical=[-.5,-1/6,1/6,.5].map(v=>v*swing),optical=electrical.map(v=>10**(-p.loss/10)*(1+Math.sin(Math.PI*v/p.vpi+bias))/2),gaps=optical.slice(1).map((v,i)=>v-optical[i]),span=optical[3]-optical[0];return {electrical,optical,gaps,minimumGap:Math.min(...gaps),gapRatio:span>0?Math.min(...gaps)/span:0,nonlinearity:span>0?(Math.max(...gaps)-Math.min(...gaps))/(span/3):Infinity};}
