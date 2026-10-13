# Executed v0.7 QA — 2026-10-13

## Summary

- Unmodified main: **204 unit tests PASS /0 FAIL**.
- Final release: **246 unit tests PASS /0 FAIL**, `npm test`.
- **12 browser scenario scripts PASS /0 FAIL** on the new v0.7 standalone. All11 prior scripts plus the new physical scenario were actually run. Existing assertion cases remain; campaign total assertions were changed14→18, and Level14's former final-screen assertions became Goal Complete / Next15. New Physical scores are separately tested rather than assuming all solutions score100.
- `npm run build`, Node syntax checks for every bundled module, `git diff --check`: PASS.
- Real headless Chromium executed `file:///`; offline scenarios recorded **0 required HTTP requests and0 page errors**. JSON paste/export and PNG downloaded and validated.
- Local browser environment: Playwright1.51.1, Chromium134.0.6998.35, Linux, synthetic mouse/touch events; screenshots used installed Noto Sans CJK KR. The primary-runtime newer Chromium download initially returned an invalid archive, so the installed older compatible browser was used. This was an environment setup issue, not a browser-test PASS. CI retains its existing Playwright1.62.1 setup and is verified independently after PR publication.

## Unit execution

246 checks cover previous NRZ/MRM/EAM/RF/routing/scaling/package/assembly/WDM behavior and new rounded arc length/units/effective radius/bend loss, intersection at vertices/dedup/terminal contacts, parallel overlap/spacing, clearance, all12 physical reference examples, crossing traversal accounting, loss-response change/reconciliation, hard feasibility gate, thermal filter transmission, customer weights/score determinism, compact/loss comparison, inherited spatial/fast architectures,14→15 preservation,15→18 fresh transitions, reference original preservation, schema7/6 roundtrip, malformed geometry and recursively validated Versions. Required WDM thermal cannot be disabled to bypass the mission.

Raw output:`v070-unit-tests.log`.

## Browser execution table

| Executed script | Result | Observed coverage |
|---|---|---|
| browser.cjs |PASS|Mouse build/ports, baseline solve, export, save/recover, pan|
| codesign-browser.cjs |PASS|Technology/EIC swaps, thermal/wavelength/tuning controls|
| levels-browser.cjs |PASS|Level1–5 progression/goals, desktop goal visibility, old C-band migration/archives, offline|
| routing-browser.cjs |PASS|RF/Optical manual routes, Waypoints, keep-out, undo, before/after|
| mobile-browser.cjs |PASS|Actual touch placement/selection, mobile gesture/pan/zoom, fine controls|
| touch-routing-browser.cjs |PASS|Touch routing, numeric Waypoints, references and offline|
| scaling-browser.cjs |PASS|400G/1.6T, Tile/Array, architecture choice and touch|
| solutions-browser.cjs |PASS|Optional Level solutions, solver comparison, restore/undo and touch|
| package-browser.cjs |PASS|Package/FAU/thermal/stress/MC, gestures and persistence|
| flow-visualization-browser.cjs |PASS|Actual progression, fresh gate, charts/power/thermal, protected archive, mobile, offline|
| wdm-browser.cjs |PASS|4λ path,16 independent channels,1.6T, three architecture snapshots, first-user originals, actual14→15 preserving engine, mobile/offline|
| physical-browser.cjs |PASS|Side-by-side refs, repeated Apply/protected restore, score vs solver, manual radius/Waypoint drag, numeric/component drag/rotation, scroll metrics,15→16→17→18, λ highlight, Versions/snapshots, Save/Resume/JSON, PNG, touch selection/numeric/component drag/pinch/pan, portrait/landscape|

Logs use `v070-<script>.log`. Older browser scripts were temporarily pointed to **the v0.7 HTML** through filename aliases exactly like CI; historical release files and screenshots were restored after execution. The original v0.6 artifacts remain unchanged in the submitted tree.

Initial detected failures were resolved and re-executed: two legacy browser assertions fixed the old campaign count14; early physical test scaffolding selected a straight route when a bend was required; mobile export needed the real More-menu interaction. Prototype reference geometry/score issues were corrected before the published build. No remaining local failure is hidden.

## Visual QA

Inspected desktop canvas and comparison PNGs, mobile portrait and landscape screenshots. Mission left / fixed metrics / inspector right, wavelength routes, complete1.6T graph and side-by-side designs render. A portrait Next action was initially clipped; actions now use two rows and fixed score/gross widths, followed by another passing physical browser execution. Screenshots:`v070-pic-desktop.png`, `v070-pic-comparison.png`, `v070-pic-mobile-portrait.png`, `v070-pic-mobile-landscape.png`; exported1600px PNG:`v070-pic-export.png`.

## Honest limits / remaining user review

Touch emulation is executed; real physical phones, native software keyboard behavior, Safari/Firefox, browser eviction/origin migration durability, accessibility audits, player retention/fun and learning outcomes are **not tested / no PASS claim**. The supported geometry remains DRC-lite, sampled crossing/obstacle checks and parallel-straight spacing. No PDK/LVS/FEM/FDTD/BER/GDS sign-off. Reference examples are feasible and reproducible, not proven global optimal designs. PR is not merged; user Gameplay review remains required.

Remote Head CI evidence is recorded in `CI_V070.md` after connector verification; local results are not used to claim remote success.
