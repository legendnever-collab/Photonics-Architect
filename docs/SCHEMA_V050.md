# Schema5 package state / migration

Main baseline: 811463882a4eb7008b6622887088c177e3629a17, merged PR5, tree 49d217d6bd2a2abcf5a1eab02fb470897c640ca5. AGENTS.md was absent from the recursive tree. Local baseline matched every tracked Git blob in that main tree before edits.

Schema1–4 remain accepted. Existing Level1–8 data stays in its prior schema/brief and model; absence of `package` means disabled. If an explicit disabled package exists, it is normalized to `{enabled:false}`. No package constraint is silently applied to earlier Levels or their references. IndexedDB keeps the existing database and autosave/backup keys. Raw imported or migrated saves are archived before mutation by existing persistence code.

Schema5 is enabled only for `package` / `thermal` / `assembly` briefs. Environment remains O-band1310 nm and valid 20–60 °C ambient. Components retain all existing IDs, positions, params and routes and gain a `platform` field (EIC/PIC/External).

`package` fields:
- enabled:true, version:1, width/height/clearance in canvas units.
- zones:[{id,kind:PIC|EIC|IO|keepout,x,y,w,h}].
- cooling:[{id,x,y,w,h,conductance in W/K}].
- heaters:{MZM component ID:power in mW}.
- fau:{id:'fau',channels:8|16,pitch in canvas units,x,y,orientation:0|90,profile:compact|expanded,mapping:[{output,channel,waypoints:[{x,y}]}]}.
- assembly:{profile:passive|vision|active|zero,seed uint32,samples16–512}.
- assemblyResult / cornerResult: completed educational simulation records, seed/distribution/sample conditions, solver version and design fingerprint; retained for inspection and freshness checks.

Entering package preserves the original engine in `packageEngineBackup` (snapshots removed to avoid recursive nesting), and Undo also retains the whole prior design. Prepared Challenge starts preserve the prior whole design as a Snapshot. Solution Apply uses the existing durable independent `reference-restore-v04` backup and JSON `referenceBackup` envelope; this is preserved across snapshot eviction. Imported package backups are validated recursively. Returning to earlier Levels explicitly disables package constraints; original engine can be loaded from its backup/snapshot or using Undo / Reference Restore.

JSON Import validates finite values, supported version/profile/seed/sample ranges, zone/cooling limits, permitted component IDs and waypoint limits before replacement. A geometry or mapping that is incomplete but structurally parseable can be imported and diagnosed in the Solver; duplicate/missing channel coverage blocks gameplay rather than being silently repaired. Out-of-range or malformed data is rejected while the current design stays intact. Cached reported scores never directly set fresh HUD results.

Overlay choice, current mobile sheet and view are UI state. Overlay switching does not mutate Design. Package elements have numeric controls and drag/resize; changes use the shared Undo/Redo and autosave path. MC simulation's temporary `packageSample` is never written to user saves.
