# v0.5.1 executed validation report

Baseline: PR6 OPEN / v0.5 Head3ea3a628464351468c801df8639f5f4d95fd5bd6; baseline GitHub CI SUCCESS. See BASELINE_V051.md. Validation date:2026-10-13 KST.

## Unit / metric evidence

`npm test`:173 PASS /0 FAIL, including139 preserved tests and34 Campaign / visualization tests. Registry continuity and predicates, fresh/stale/resume gates,5→6 original NRZ preservation,8→9 engine/package entry, bounded archive validation, every reference Lane Waterfall, cascade splitter division/excess, sampled FAU/thermal response, actual electrical category/component totals, zero-throughput energy handling, thermal max/hotspot/limit, fixed scale and comparison-condition guards were tested. Metrics are read-only; exact Design and Result serialization remain unchanged when projected.

`npm run build`: all modules syntax-checked; self-contained0.5.1 HTML generated, plus registry JSON. No external CDN/chart/font asset is required. Physics model versions and coefficients remain unchanged; new per-component power fields are result metadata.

## Browser evidence

Existing nine browser suites plus the new `flow-visualization-browser.cjs` are executed against rebuilt0.5.1 HTML. Existing fixture names are aliases during testing only; prior committed HTMLs are preserved.

- browser: actual mouse placement,13 connections,4 Lane test, drag failure/Undo, numeric editing, Save/Resume, named saves, JSON/PNG, pan/zoom.
- codesign-browser: MZM/MRM/EAM behavior, bias/heater/environment operations, stale and snapshot comparison.
- levels-browser: now expects one `/11` campaign, first goals, Next, retained engine, corner goal, stale and resume gates, legacy band migration and recovery.
- routing-browser: actual RF/Optical waypoint edits, baseline improvement, exact route rendering, Keep-out, same-Level Before/After, preserved snapshots, save/resume and boundary views.
- mobile-browser / touch-routing-browser: true Chromium touch/CDP events, port controls, drag interruption/pinch/pan, panel scrolling, numeric controls, durable Solution backup, snapshot eviction and portrait/landscape.
- scaling-browser: editable Lane/Array, distribution,16/8 Lane comparison and Customer selection. The old assertion that Level7 must start empty was changed to assert the intentionally retained Level6 Engine, including Reference Undo recovery.
- solutions-browser: Preview/Fresh scoring, incomplete diagnostics, same-condition recalculation, differing-condition score protection, Level8 additional predicates, accessible Solution.
- package-browser: package entry, editable Zone/Cooling, actual thermal functional effect,FAU deletion cleanup, Corner/MC seed repeatability, cancellation, stale comparison, schema5 persistence, actual touch FAU move/Cooling resize and offline PNG.
- flow-visualization-browser: actual UI1→2→3→4→5→6→7→8→9→10→11.5→6 retains exact device types and actual nets and reports unsupported400G conversion;8→9 requires two tested architectures/customer choice and preserves completed engine;9→10→11 uses real thermal/corner/MC predicates. Next is never automatic. Level11 shows Campaign Complete / Free Design with identical Physics payload. Original Level5 design is restored after the whole campaign and repeated Solution applications.

JSON export-derived route metadata does not invalidate physically identical Assembly records; old v0.5 fingerprints are compared canonically, while actual waypoint/seed changes invalidate them.

New UI evidence also checks: STALE prior-result labels versus frozen Test Design; actual Waterfall final power/output margin versus Solver; PAM4 levels/FAU boundary; Worst Lane and step-to-Route/Inspector selection; actual power metadata and exclusions; fixed20–100°C legend / maximum / limit / same-scale Before/After; exact Physics JSON identity after read-only tab/Lane/chart/source/baseline operations; campaign archive/JSON/Resume/PNG. Resume requires Fresh Test even when complete history and assembly reports exist. Desktop1440×900 and real Touch390×844 /844×390 were inspected. All browser scenarios use file:/// Offline with0 HTTP requests and0 page errors.

## Findings and fixes during actual interaction

1. Level Selector initially closed the mobile Library and blocked Build Lane. Selector now keeps it open; explicit Next closes panels.
2. SVG groups initially had gaps between painted bars/text that failed pointer hit-testing. Full-row hit targets are now clickable.
3. Landscape Next label clipped and optional routing controls reduced Canvas height. Compact Solution/Next buttons fit inside viewport, and routing extras collapse in landscape.
4. Unifying transitions initially omitted the same-Level Optical Start snapshot, so Optical Before/After correctly refused an RF-versus-Optical comparison. Registry entry now captures a same-Level Optical baseline after preserving the previous complete design.

5. Goal content height changes during a mouse drag could shift the SVG transform and redirect a Waypoint. Mouse component/Waypoint/Package drags now keep the initial coordinate matrix, as the existing touch path already does; out-of-bound routing and Undo are tested.
6. Resizing from a tall desktop to1280×720 left a stale Goal height reservation. A ResizeObserver now synchronizes the Canvas reservation, with compact Goal content on short desktops; routing viewport checks cover both1280×720 and1920×1080. The first remote Chromium151 run exposed a resize-frame race in the immediate geometry assertion; desktop viewport assertions now wait two animation frames before applying the unchanged overlap / minimum-height checks.

These are observed interaction problems and fixes, not an automated claim of improved fun or measured learning. See GAMEPLAY_REVIEW_V051.md.

## Limits

Chromium Headless141 was used locally with real pointer/touch events; GitHub CI independently uses its installed Playwright Chromium. Physical Android/iOS hardware and native keyboard were not available. No user engagement/learning study, performance timing study, physical thermal calibration, Receiver/BER, FEM or fabrication verification was conducted. Same-domain crossing insertion loss remains Unsupported. Remote CI status is reported separately for the actual published Head and is not inferred from local PASS results.

Detailed logs:docs/v051-unit.log and docs/v051-*-browser.log. Main screenshots:docs/v051-optical-desktop.png, docs/v051-thermal-comparison-desktop.png, docs/v051-mobile-portrait.png, docs/v051-mobile-landscape.png; floorplan PNG export:docs/v051-floorplan-export.png.
