# Handoff — Photonics Architect v0.3.0

## Run

Open `photonics-architect-v0.3.0.html` directly in a desktop browser. Network is unnecessary. Use Levels 1–3 to build / compare / stabilize the Engine, then Level 4 to shorten RF and Level 5 to route around Keep-out. Goal / NEXT ACTION / Test gate are persistent. An already-short valid RF Engine is recognized; unfold Help for a separate MZM/MRM/EAM Practice, preserving the original Snapshot.

Route click → Edit Route → drag white Waypoint; numeric mm inputs and add/delete are in Inspector. Driver movement/rotation updates endpoints and keeps manual anchors. Test commits a fresh result, Before / After explains changes. Undo/Redo restores component and route edits together. Reset is explicit; Reroute / Simplify is not an obstacle router.

## Versions / source

Baseline `221e868758dc4a2c5368fcfd32476952b5b252c2` / PR #2 remains unmerged at development start. v0.3 branch `feature/v0.3-layout-routing-challenge` is stacked on `feature/v0.2-modulator-eic-codesign`. Final commit and live CI are recorded in the pull request and release response; this document avoids self-referential commit hashes.

- `geometry.js`: shared polyline, simplification, planning intersections, validation.
- `models.js`: preserved 0.2.1 O-band device / EIC physics, extra briefs only.
- `core.js`: logical netlist, route APIs, deterministic Solver, schema3 migration, comparison.
- `campaign.js`: goal checks, baseline capture, optional practice.
- `app.js` / `style.css`: Canvas editing, goals, contextual Inspector, diagnostics and exports.
- `persistence.js`: same IndexedDB origin/store, raw archives and backup.

Build `npm run build`; tests `npm test` plus four Chromium browser suites; package `python scripts/package.py`. No application runtime dependencies. Source ZIP includes tests, reports, logs and screenshots; Release ZIP adds standalone HTML, source ZIP, documentation and play screenshots. SHA256SUMS / manifest record versions and baseline. Prior v0.1 / v0.2 artifacts remain.

## Known limitations

Educational centerlines have sharp elbows, zero extra clearance, no physical radius/cross-section/minimum spacing. No RF bend reflections, physical crossing penalties, full-wave or foundry validation. Same-domain crossings warn as Unsupported; legacy auto component traversal is nonblocking in Levels 1–3 for compatibility, strict in new challenges/manual routes. Orthogonal manual anchors use x-first elbows rather than fully free elbow orientation. No automatic obstacle router. Snapshots are bounded to six, Undo history to 100.

Desktop Chromium was exercised offline with real mouse actions. Safari / Firefox, OS-specific file-origin policy, mobile/touch, storage quota failures and human enjoyment have not been validated. IndexedDB is profile/origin specific; retain portable JSON. Imported results and progress do not bypass Fresh Test. Power excludes External Laser electrical power; no Net Throughput / Eye / BER claim.
