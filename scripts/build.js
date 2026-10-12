import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const files=['geometry','models','scaling-models','package-models','scaling-solver','core','arrays','package-engine','campaign-registry','campaign','engineering-metrics','solutions','persistence','references','studio','scaling-ui','package-ui','campaign-ui','engineering-ui','app'];
let code='';for(const name of files){const path='src/'+name+'.js';execFileSync(process.execPath,['--check',path]);let source=readFileSync(path,'utf8').replace(/^import .*;\n/gm,'').replace(/export /g,'');if(name==='persistence')source='const storage=(()=>{'+source+';return {openDB,read,write,save,load,archiveLegacy,archiveOriginal}})();';code+=source+'\n';}
mkdirSync('dist',{recursive:true});const html=readFileSync('index.html','utf8').replace('<link rel="stylesheet" href="src/style.css">','<style>'+readFileSync('src/style.css','utf8')+'</style>').replace('<script type="module" src="src/app.js"></script>','<script type="module">'+code+'</script>');writeFileSync('dist/photonics-architect-v0.5.1.html',html);console.log('v0.5.1 standalone HTML built without external assets');
const {referenceDesigns}=await import('../src/references.js');mkdirSync('data',{recursive:true});

writeFileSync('data/solution-designs-v0.5.0.json',JSON.stringify({version:'0.5.0',solutions:['package','thermal','assembly'].flatMap(level=>referenceDesigns(level).map(r=>({id:r.id,brief:r.brief,name:r.name,version:r.version,why:r.why,tradeoff:r.tradeoff,design:r.design,verified:{status:r.result.status,gross:r.result.gross,maximumTemperature:r.result.thermal.max,componentArea:r.result.packageGeometry.componentArea,placementEnvelope:r.result.packageGeometry.envelope,satisfied:r.satisfied}})))}));

const {CAMPAIGN}=await import('../src/campaign-registry.js');writeFileSync('data/campaign-registry-v0.5.1.json',JSON.stringify(CAMPAIGN.map(({completion,entry,...record})=>record),null,2));
