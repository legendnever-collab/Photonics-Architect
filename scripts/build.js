import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const files=['geometry','models','scaling-models','package-models','wdm-models','physical-models','scaling-solver','wdm-solver','core','arrays','wdm-engine','physical-engine','package-engine','campaign-registry','campaign','engineering-metrics','wdm-visualization','solutions','persistence','references','studio','scaling-ui','package-ui','campaign-ui','engineering-ui','wdm-ui','physical-ui','app'];
let code='';for(const name of files){const path='src/'+name+'.js';execFileSync(process.execPath,['--check',path]);let source=readFileSync(path,'utf8').replace(/^import .*;\n/gm,'').replace(/export /g,'');if(name==='persistence')source='const storage=(()=>{'+source+';return {openDB,read,write,save,load,archiveLegacy,archiveOriginal}})();';code+=source+'\n';}
mkdirSync('dist',{recursive:true});const html=readFileSync('index.html','utf8').replace('<link rel="stylesheet" href="src/style.css">','<style>'+readFileSync('src/style.css','utf8')+'</style>').replace('<script type="module" src="src/app.js"></script>','<script type="module">'+code+'</script>');writeFileSync('dist/photonics-architect-v0.7.0.html',html);console.log('v0.7.0 standalone HTML built without external assets');
const {referenceDesigns}=await import('../src/references.js');mkdirSync('data',{recursive:true});

const {CAMPAIGN}=await import('../src/campaign-registry.js');

writeFileSync("data/campaign-registry-v0.7.0.json",JSON.stringify(CAMPAIGN.map(({completion,entry,...r})=>r),null,2));
writeFileSync("data/solution-designs-v0.7.0.json",JSON.stringify({version:"0.7.0",solutions:["picfloor","picroute","picwdm","picoptimize"].flatMap(l=>referenceDesigns(l).map(r=>({id:r.id,name:r.name,design:r.design,verified:{status:r.result.status,score:r.result.goalScore,physical:r.result.physical,area:r.result.routing.envelope,crossings:r.result.routing.crossingCount,violations:r.result.routing.errorCount,satisfied:r.satisfied}})))},null,2));
