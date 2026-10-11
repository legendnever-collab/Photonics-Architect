from pathlib import Path
import zipfile,hashlib,json
root=Path(__file__).resolve().parents[1];dist=root/'dist'
source=dist/'photonics-architect-v0.1.0-source.zip'
with zipfile.ZipFile(source,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file() and not any(part in ('dist','.git','node_modules') for part in p.relative_to(root).parts):z.write(p,p.relative_to(root))
html=dist/'photonics-architect-v0.1.0.html'
files=[html,source];manifest={p.name:{'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size} for p in files}
(dist/'manifest.json').write_text(json.dumps({'version':'0.1.0','baseline':'fa0383207a191b6c9a7b3ae749bf210f2137a467','artifacts':manifest},indent=2))
release=dist/'photonics-architect-v0.1.0-release.zip'
with zipfile.ZipFile(release,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files+[dist/'manifest.json',root/'README.md',root/'docs/TEST_REPORT.md']:z.write(p,p.name)
(dist/'SHA256SUMS').write_text('\n'.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+p.name for p in files+[release,dist/'manifest.json'])+'\n')
for p in files+[release]:print(p.name,p.stat().st_size)
