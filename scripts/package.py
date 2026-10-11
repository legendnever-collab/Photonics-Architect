from pathlib import Path
import zipfile,hashlib,json
root=Path(__file__).resolve().parents[1];dist=root/'dist'
for name in ('manifest.json','SHA256SUMS'):
 previous=dist/('v0.2-'+name)
 if not previous.exists():previous.write_bytes((dist/name).read_bytes())
source=dist/'photonics-architect-v0.3.0-source.zip'
with zipfile.ZipFile(source,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file() and not any(part in ('dist','.git','node_modules') for part in p.relative_to(root).parts):z.write(p,p.relative_to(root))
html=dist/'photonics-architect-v0.3.0.html'
files=[html,source];manifest={p.name:{'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size} for p in files}
(dist/'manifest.json').write_text(json.dumps({'version':'0.3.0','solverVersion':'0.3.0','modelVersion':'0.2.1','routeModelVersion':'0.3.0','schema':3,'revision':'layout-routing-challenge','baseline':'221e868758dc4a2c5368fcfd32476952b5b252c2','artifacts':manifest},indent=2))
release=dist/'photonics-architect-v0.3.0-release.zip'
documents=['README.md','docs/BASELINE_V03.md','docs/ROUTING_SCHEMA.md','docs/TEST_REPORT.md','docs/MODELS_V03.md','docs/MODELS_V02.md','docs/HANDOFF_v0.3.0.md']
with zipfile.ZipFile(release,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files+[dist/'manifest.json']+[root/f for f in documents]:z.write(p,p.name)
 for p in sorted((root/'docs').glob('v03-*.png')):z.write(p,'screenshots/'+p.name)
(dist/'SHA256SUMS').write_text('\n'.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+p.name for p in files+[release,dist/'manifest.json'])+'\n')
for p in files+[release]:print(p.name,p.stat().st_size)
