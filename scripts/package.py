from pathlib import Path
import zipfile,hashlib,json
root=Path(__file__).resolve().parents[1];dist=root/'dist';dist.mkdir(exist_ok=True)
version=json.loads((root/'package.json').read_text())['version'];stem='photonics-architect-v'+version
source=dist/(stem+'-source.zip')
with zipfile.ZipFile(source,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  rel=p.relative_to(root)
  if p.is_file() and not any(part in ('dist','.git','node_modules') for part in rel.parts) and p.suffix not in ('.png','.zip') and rel.name!='.git':z.write(p,rel)
html=dist/(stem+'.html');files=[html,source]
manifest={'version':version,'solverVersion':'0.3.0','modelVersion':'0.2.1','routeModelVersion':'0.3.0','schema':3,'referenceVersion':'0.4.0','baseline':'fecf883e0b447c6fc871ae1e745391e2a68963c9','artifacts':{p.name:{'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size} for p in files}}
manifest_file=dist/(stem+'-manifest.json');manifest_file.write_text(json.dumps(manifest,indent=2))
release=dist/(stem+'-release.zip')
documents=['README.md','docs/MOBILE_REFERENCE_SCHEMA.md','docs/TEST_REPORT.md','docs/HANDOFF_v0.4.0.md','docs/MODELS_V03.md','data/reference-designs-v0.4.0.json']
with zipfile.ZipFile(release,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files+[manifest_file]+[root/f for f in documents]:z.write(p,p.name)
 for p in sorted((root/'docs').glob('v04-*.png')):z.write(p,'screenshots/'+p.name)
 for p in sorted((root/'docs').glob('v04-*.log')):z.write(p,'tests/'+p.name)
(dist/(stem+'-SHA256SUMS')).write_text('\n'.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+p.name for p in files+[release,manifest_file])+'\n')
for p in files+[release]:print(p.name,p.stat().st_size)
