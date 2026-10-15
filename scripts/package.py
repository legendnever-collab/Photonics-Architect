"""Package the v0.8.1 single-executable release without copying repository items to other storage."""
from pathlib import Path
import zipfile,hashlib,json
root=Path(__file__).resolve().parents[1];dist=root/'dist';dist.mkdir(exist_ok=True)
version=json.loads((root/'package.json').read_text())['version'];stem='photonics-architect-v'+version
html=dist/'photonics-architect-v0.8.0.html';source=dist/(stem+'-source.zip')
with zipfile.ZipFile(source,'w',zipfile.ZIP_DEFLATED) as z:
 for name in ['README.md','package.json','index.html']:
  z.write(root/name,name)
 for folder in ['src','scripts','tests','data','docs','.github']:
  for p in sorted((root/folder).rglob('*')):
   if p.is_file() and p.suffix not in ('.zip',) and (p.suffix!='.png' or p.name.startswith('v081-')):z.write(p,p.relative_to(root))
 for p in sorted((root/'artifacts/v081-qa').glob('*')):
  if p.is_file():z.write(p,p.relative_to(root))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
files=[html,source]
manifest={'version':version,'executableName':html.name,'singleExecutable':True,'modelVersion':'existing Educational v0.8.0 / nominal25C; unchanged physical coefficients','baseline':'7f04e9fdb37322b006bff4fe0167f7299a5fb181','branch':'feature/v0.8.1-mobile-architecture-tracks','artifacts':{p.name:{'sha256':sha(p),'bytes':p.stat().st_size} for p in files}}
m=dist/(stem+'-manifest.json');m.write_text(json.dumps(manifest,indent=2)+'\n')
(dist/(stem+'-SHA256SUMS.txt')).write_text('\n'.join(sha(p)+'  '+p.name for p in files+[m])+'\n')
for p in files:print(p.name,p.stat().st_size,sha(p))
