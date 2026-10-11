# Component / Packet / Persistence schema — v0.2

Library definition:ID,version,name,w/h,ports(id,kind,direction,local geometry),model ID,grade,evidence,source,supported baud/format,defaults. Instances store{id,type,x,y,rotation,version,params}; MZM width derives from Length. Library and Instance never share mutable parameter state.

Packet records additionally include compatible technologies and conditions, max baud/formats,channel count,loaded swing convention/range,bias range,drive configuration,impedance,pad map/package geometry,RF model and range,power/thermal model,evidence/source/assumptions. A differential P/N pair is one logical RF port/channel.

Net{id,kind,a:{component,port},b:{component,port}} has unique ID and normalized output→input. Actual port coordinates are computed from current geometry/rotation. Technology and Packet swaps retain IDs and wires when the same port identities exist; an incompatible port map throws rather than silently deleting nets.

Design schema2:solverVersion,modelVersion,name,brief,environment{temperature,wavelength},components,nets,next,snapshots,completedLevels (unique First/Compact/Stable IDs), optional migrationNotice. Snapshot{name,solverVersion,design} is immutable design data without nested history; up to6. Comparison always recomputes with current solver, flags environment/Brief/solver mismatch and declines direct comparison. Current edits mark old results STALE and require Test before current result comparison/Snapshot.

JSON export envelope{schema:2,solverVersion,modelVersion,models:[{id,version,grade,evidence}],design}. Import validates first, then atomically replaces; no stored result is trusted. Component versions and model versions must be supported. Validates finite numeric coordinates/parameter domains/rotations,unique IDs,graph endpoints,occupancy,types,snapshot bounds and caps200 components/600 nets. Wrong driver capabilities can be retained as a diagnosable design but cannot pass simulation.

Schema1 migration preserves positions,rotations,connections,IDs,name and adds safe defaults matching legacy MZM/Driver intent, First Brief and25°C/1310nm. Input object is not mutated. IndexedDB uses the existing `photonics-architect` database/version1/store`designs`: data schema changes independently of database-store version. Automatic migration archives raw current v1 as`legacy-v1`; first save also retains old current as backup. Named saves migrate on load. Existing v1 file-origin storage may be isolated by browser/path/profile; paste legacy JSON provides a portable recovery route. v0.1 cannot read schema2: use archived original rather than opening new saves in the older application.

Prior schema2/model0.2.0 C-band saves migrate to model/solver0.2.1. Laser and MRM cold resonance shift −240 nm after checking old domains. Current raw data are archived as `legacy-cband`; converted data carry a visible notice. Snapshots recurse through migration and keep old solver tags for comparison warnings. Results are not carried over. Unknown models and malformed legacy numeric domains are rejected.

The first C-band archive is not overwritten by later different JSON imports: those are kept under separate `legacy-cband:<timestamp>` keys. Archives are retained locally; portable preservation still requires keeping the original JSON.
