import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const html=['dist/photonics-architect-v0.8.0.html'];
for(const p of html){const content=readFileSync(p,'utf8');if(/<script\b[^>]*\bsrc\s*=|<link\b[^>]*\brel=["']stylesheet/i.test(content))throw Error('Required external asset in '+p);}
const inputs=['index.html','package.json','scripts/build.js','scripts/manifest.js',...readdirSync('src').filter(p=>p.endsWith('.js')||p.endsWith('.css')).map(p=>'src/'+p)].sort();
const artifacts=[...html,'data/campaign-registry-v0.8.0.json','data/chapter-registry-v0.8.0.json','data/solution-designs-v0.8.0.json','data/track-solutions-v0.8.1.json','docs/MODELS_V080.md','docs/CHAPTERS_MIGRATION_V080.md'];
const entries=paths=>paths.map(path=>({path,bytes:readFileSync(path).length,sha256:sha(path)}));
const source=entries(inputs),manifest={version:'0.8.1',baselineMain:'5da597a1096c0be2d848f034805b99a9320ea0ca',branch:'feature/v0.8.1-mobile-architecture-tracks',sourceDigest:createHash('sha256').update(JSON.stringify(source)).digest('hex'),build:'npm run build (Node >=20)',singleExecutable:true,requiredExternalHttpRequests:0,modelGrade:'Educational / Assumed; see docs/MODELS_V080.md',source,artifacts:entries(artifacts)};
writeFileSync('dist/release-manifest-v0.8.0.json',JSON.stringify(manifest,null,2)+'\n');
writeFileSync('dist/SHA256SUMS-v0.8.0.txt',[...artifacts,'dist/release-manifest-v0.8.0.json'].map(p=>sha(p)+'  '+p).join('\n')+'\n');
console.log('v0.8.1 manifest / SHA256: single theme-toggle application, no required external scripts/styles');
