import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const files=['track-models','geometry','models','scaling-models','package-models','wdm-models','physical-models','link-models','link-solver','scaling-solver','wdm-solver','core','arrays','wdm-engine','physical-engine','package-engine','campaign-registry','campaign','chapters','engineering-metrics','wdm-visualization','solutions','persistence','references','link-engine','device-tips','solution-flow','score-coach','score-coach-ui','studio','scaling-ui','package-ui','campaign-ui','engineering-ui','wdm-ui','physical-ui','link-ui','theme','chapter-ui','onboarding','app'];
let code='';for(const name of files){const path='src/'+name+'.js';execFileSync(process.execPath,['--check',path]);let source=readFileSync(path,'utf8').replace(/^import .*;\n/gm,'').replace(/export /g,'');if(name==='persistence')source='const storage=(()=>{'+source+';return {openDB,read,write,save,load,archiveLegacy,archiveOriginal}})();';code+=source+'\n';}
mkdirSync('dist',{recursive:true});const html=readFileSync('index.html','utf8').replace('<link rel="stylesheet" href="src/style.css">','<style>'+readFileSync('src/style.css','utf8')+'</style>').replace('<script type="module" src="src/app.js"></script>','<script type="module">'+code+'</script>');writeFileSync('dist/photonics-architect-v0.8.0.html',html);console.log('v0.8.1: single standalone HTML / saved Light-Dark toggle / zero external assets');
const {referenceDesigns}=await import('../src/references.js');mkdirSync('data',{recursive:true});

const {CAMPAIGN}=await import('../src/campaign-registry.js');

writeFileSync("data/campaign-registry-v0.8.0.json",JSON.stringify(CAMPAIGN.map(({completion,entry,...r})=>r),null,2));
const {linkReferences}=await import('../src/link-engine.js');
const {LINK_LEVELS}=await import('../src/link-models.js');
const {TRACKS,trackMission}=await import('../src/track-models.js');
const {CHAPTERS}=await import('../src/chapters.js');
writeFileSync("data/chapter-registry-v0.8.0.json",JSON.stringify(CHAPTERS,null,2));
const linkSolutions=LINK_LEVELS.filter(level=>!trackMission(level)).flatMap(level=>linkReferences(level).map(r=>({id:r.id,name:r.name,brief:level,design:r.design,verified:{status:r.result.status,score:r.result.goalScore,satisfied:r.satisfied,gross:r.result.gross,powerW:r.result.powerW,coverage:r.result.link.coverage,receivers:r.result.link.receivers,items:r.result.link.items}})));
if(linkSolutions.some(r=>!r.verified.satisfied))throw Error("Reference verification failed");
writeFileSync("data/solution-designs-v0.8.0.json",JSON.stringify({version:"0.8.0",physicalModelVersion:"0.7.0",solutions:[...linkSolutions,...["picfloor","picroute","picwdm","picoptimize"].flatMap(l=>referenceDesigns(l).map(r=>({id:r.id,name:r.name,design:r.design,verified:{status:r.result.status,score:r.result.goalScore,physical:r.result.physical,area:r.result.routing.envelope,crossings:r.result.routing.crossingCount,violations:r.result.routing.errorCount,satisfied:r.satisfied}})))]},null,2));

const trackSolutions=TRACKS.flatMap(t=>t.levels.flatMap(level=>linkReferences(level).map(r=>({id:r.id,mission:level,architecture:t.architecture,implementation:'src/link-engine.js: linkReference',verified:{complete:r.satisfied,gross:r.result.gross,score:r.result.goalScore,powerW:r.result.powerW,receivers:r.result.link.receivers.length,coverage:r.result.link.coverage}}))));
if(trackSolutions.some(s=>!s.verified.complete))throw Error('Track Reference verification failed');
writeFileSync('data/track-solutions-v0.8.1.json',JSON.stringify(trackSolutions,null,2));

execFileSync(process.execPath,['scripts/manifest.js'],{stdio:'inherit'});
