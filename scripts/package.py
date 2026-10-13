from pathlib import Path
import zipfile,hashlib,json,subprocess
root=Path(__file__).resolve().parents[1];dist=root/'dist';dist.mkdir(exist_ok=True)
version=json.loads((root/'package.json').read_text())['version'];stem='photonics-architect-v'+version
source=dist/(stem+'-source.zip')
try:
 candidates=[root/p for p in subprocess.check_output(['git','ls-files'],cwd=root,text=True).splitlines()]
except (subprocess.CalledProcessError,FileNotFoundError):
 candidates=list(root.rglob('*'))
with zipfile.ZipFile(source,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(candidates):
  rel=p.relative_to(root)
  if p.is_file() and not any(part in ('dist','.git','node_modules') for part in rel.parts) and p.suffix not in ('.png','.zip') and rel.name!='.git':z.write(p,rel)
html=dist/(stem+'.html');files=[html,source]
manifest={'version':version,'solverVersion':'0.5.0','modelVersion':'1.1.0 (package) / 1.0.0 (scaling) / 0.2.1 (legacy)','routeModelVersion':'0.3.0','schema':5,'referenceVersion':'0.5.0','baseline':'811463882a4eb7008b6622887088c177e3629a17','artifacts':{p.name:{'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size} for p in files}}
manifest_file=dist/(stem+'-manifest.json');manifest_file.write_text(json.dumps(manifest,indent=2))
release=dist/(stem+'-release.zip')
documents=['README.md','docs/SCHEMA_V050.md','docs/TEST_REPORT_V050.md','docs/HANDOFF_v0.5.0.md','docs/MODELS_V050.md','data/solution-designs-v0.5.0.json']
with zipfile.ZipFile(release,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files+[manifest_file]+[root/f for f in documents]:z.write(p,p.name)
 for p in sorted((root/'docs').glob('v050-*.png')):z.write(p,'screenshots/'+p.name)
 for p in sorted((root/'docs').glob('v050-*.log')):z.write(p,'tests/'+p.name)
(dist/(stem+'-SHA256SUMS')).write_text('\n'.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+p.name for p in files+[release,manifest_file])+'\n')
for p in files+[release]:print(p.name,p.stat().st_size)
