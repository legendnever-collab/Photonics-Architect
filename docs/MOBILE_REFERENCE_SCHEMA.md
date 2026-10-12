# Mobile Studio / Reference persistence — v0.4.0

Implementation baseline main `fecf883e0b447c6fc871ae1e745391e2a68963c9` (approved merges PR #1–3). Application / Reference version 0.4.0; Solver / Routing remain 0.3.0; Device / EIC 0.2.1; Design Schema remains 3. No new optical model or lane-rate assumption.

`referenceUsage` is an optional bounded array (200 entries): `{id, level, version:'0.4.0', at}`. Import validates metadata. Usage has no score penalty. Application preserves all other Level records, removes current completion until actual Test, and deep-copies validated Components / Parameters / Nets / Route anchors / RF baseline. Only the actual current Test can add completion.

IndexedDB retains the existing database `photonics-architect` and `designs` store. Two additional keys:
- `reference-restore-v04`: full validated original Design from latest Apply. Separate from the six Snapshot limit and 100-entry Undo history. The next explicit Apply replaces this protected backup; viewing references never writes it.
- `studio-ui-v04`: finite viewBox and Select/Pan preference. Restore defaults to Select for predictable interaction; saved viewBox is restored. No saved in-progress gesture or pending connection is replayed.

JSON envelope remains schema3. `referenceBackup` is an optional complete exported Design, including prior snapshots/challenge/results; import validates it before replacing active Design. Geometry caches are regenerated. Original Test records remain historical, current result is stale after Resume / Undo / Restore.

Reference definitions live in `src/references.js` and are built into the offline HTML. Build also emits `data/reference-designs-v0.4.0.json`: 14 default-environment designs and actual solver verification results. Level1/3/4/5 each have MZM, MRM and EAM; Level2 has MRM/EAM. MRM uses Auto Heater Lock with 1309.55 nm cold resonance. RF references preserve a same-condition long-route baseline and shorten real manual anchors. Optical references detour at (620,180)/(620,460) around K1. All dimensions remain educational canvas planning units, 100 units/mm.

Reference comparison uses the same selected Level, environment and current Solver for every candidate. The default is 25 °C / 1310 nm, explicitly displayed next to Apply. My-environment mode recomputes every candidate, labels failures and disables their Apply. Applying standard conditions updates the Design environment as displayed. Footprint sum is component-area sum; layout envelope is the unrotated reference bounding box, not a fabricated die. Driver / Heater / Bias excludes External Laser electricity.

Touch routing: board-only Pointer Events with real two-pointer anchor-preserving zoom/pan, selected-component drag threshold, rollback when a second finger arrives, and suppression of synthetic follow-on clicks after board taps. Port candidates use 22 CSS px radius in screen coordinates regardless of zoom; overlapping candidates use a picker. Component body taps prioritize selection; starting/tapping a port supports compatible-target highlighting. Inspector port lists bypass Canvas hit ambiguity. Sheets/dialogs retain native scroll. Native keyboard / file-origin storage behavior remains browser-dependent and requires real-device validation.

Touch buttons activate on short pointerup, with trusted compatibility-click deduplication. Scroll drags exceeding8px do not activate their starting button. Mouse/keyboard click handling is retained.

Route selection additionally uses a12 CSS px invisible hit polyline in screen space; visible polyline/physics centerline remain unchanged. It is separate from Net count and exported geometry.
