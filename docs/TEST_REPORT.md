# Actual verification — Photonics Architect v0.3.0

Executed 2026-10-11 UTC / 2026-10-12 KST. Baseline: `221e868758dc4a2c5368fcfd32476952b5b252c2`; final implementation is identified by the PR head. Historical v0.2 report is preserved as TEST_REPORT_V02.md.

## Executed results

| Suite | Actual result | Evidence |
|---|---|---|
| Baseline v0.2 unit |43 PASS /0 fail|baseline-v02/unit.log|
| Baseline v0.2 UI |17 Canvas +16 Co-design +9 Level groups PASS|baseline-v02/*.log|
| v0.3 unit |70 PASS /0 fail /0 skipped|unit-test.log|
| v0.3 Canvas UI |17 groups PASS /0 page errors|canvas-browser.log|
| v0.3 Co-design UI |16 groups PASS /0 page errors|codesign-browser.log|
| v0.3 existing Level UI |9 groups PASS /0 HTTP requests /0 page errors|levels-browser.log|
| v0.3 Routing UI |22 groups PASS /0 HTTP requests /0 page errors|routing-test.log|
| Standalone build |syntax checks and embedded HTML PASS|scripts/build.js|

Browser evidence is **actual mouse/control interaction in headless Chromium**, not only solver fixtures. Playwright 1.62.1, Node runtime used in the local environment, desktop viewports 1440×900, 1280×720 and 1920×1080. Browser does not need HTTP assets: routing/level tests set offline mode and require zero HTTP requests. Font fallback remains system-provided, no external font dependency.

## Physics and migration

Original 43 tests are retained. New 27 tests cover all three technologies' actual v0.2-to-v0.3 optical/RF/power equivalence, centerline length and bend identities, manual RF attenuation improvement, Keep-out clearance, endpoint movement/rotation, strict manual geometry vs legacy warning, independent domains, same-domain Unsupported crossing/overlap, finite corrupted-data handling, deterministic results, challenge baseline serialization and original snapshot result preservation.

Splitter power conservation, modulation levels/ER, RF attenuation/range, MRM detuning/tuning limits/nonnegative heater power, drive failures not fixed by heater, EAM bias/swing response and representatives/failures remain covered. MRM Driver relocation test shows shorter RF with increased local temperature and changed detuning. Optical Keep-out solutions independently pass with MZM, MRM and EAM. O-band defaults / reference domains and C-band original archives are checked by existing suites.

## Real routing play

- Route-less v0.2 save resumed with previous Level records,1310 nm, original archive and generated schema3 routes. Imported/exported results do not unlock Next.
- Good already-short Engine recognized after Fresh Test, without degrading its layout. Incomplete Engine cannot make a trusted RF Baseline and gives Build-first guidance.
- Separate RF Practice preserves Original Engine Snapshot; repeated Test remains incomplete.
- Real two-Waypoint drags shorten targeted RF **2.43→0.585 mm**; loss **1.944→approximately0.468 dB**; delivered swing **approximately2.64→3.13 Vppd**. 100G remains valid and Level4 completes only after fresh Test. Rendered SVG point list equals core Route geometry.
- Route selection/hover keep result fresh; actual edit makes it STALE. Grid Snap coordinates verified; blank numeric input rejected without changing the result. Reset, add/delete, Simplify, Undo/Redo and actual Driver drag exercise shared history and endpoint update while retaining manual anchors.
- Level4→5 keeps Engine and Snapshots, shows distinct persistent Goal / NEXT ACTION and activates Keep-out. Two blocked routes initially yield50G.
- Click actual Canvas warning opens affected Optical Inspector. Real Optical Waypoint drags route above/below K1, clear both invasions, restore four valid outputs and complete Level5 at100G. The optical detour grows total route length **20.95→23.95 mm**, with increased propagation/bend loss shown rather than hidden.
- Before / After uses actual saved baseline and recomputed current values; RF improvements and optical detour trade-off shown. Original result retained and direct-comparison limits checked.
- Out-of-boundary impossible geometry blocks with diagnosis; Undo repairs. Damaged serialized geometry is visibly reset to recoverable default and requires Test.
- Manual geometry, Level4 baseline, Level4/5 records survive Save/Resume and JSON import. PNG exported and visually inspected; manual paths/Keep-out appear without filled polyline artifacts.
- Goal/Canvas/HUD remain inside tested desktop viewport without page scrolling.

Screenshots: v03-level4-before/after.png, v03-before-after.png, v03-level5-before/after.png, v03-optical-comparison.png and v03-floorplan.png. Regression screenshots are prefixed v03-regression-; historical screenshots remain untouched.

## Resolved during QA

Actual Level4→5 interaction exposed RF-only progress-field access in Optical view; fixed and complete routing suite rerun successfully. Async JSON archive completion is awaited before fresh-gate assertions. Polyline interaction tests hit visible route segments rather than bounding-box centers. These fixes were verified by real control/mouse actions.

## CI and limits

CI runs70 unit tests/build and all four browser suites. Live run IDs/conclusions are recorded in PR/final handoff after publication; this local report does not claim an unobserved run as PASS.

Not tested: Safari/Firefox, native Windows/macOS policies, mobile/touch, storage quota/denial injection, human enjoyment or comprehension. No physical bend radius, RF bend discontinuity, fabricated crossing loss, measured thermal/device calibration, BER/Eye or manufacturing validation. The geometry model is Educational Planning Rule Check with zero added clearance. Keep-out practice is not a physical foundry rule. No automatic obstacle router.

## Recovery verification (2026-10-12)
Recovered existing v0.3 Source into an isolated Git checkout. No prior files deleted. Rebuilt HTML SHA256 `23a38196e313d84c37e0a01315161a91c2da0951205e112bdb05abd75a25e04f` exactly matches delivered HTML. Reran 70 unit tests and all four browser suites: 17 Canvas, 16 Co-design, 9 Level and 22 Routing groups, all passed. Local Chromium 141.0.7390.0 reconstructed from preserved compressed runtime; Playwright 1.62.1. Actual desktop mouse interaction, Level 4/5, Save/Resume, JSON and PNG Export were exercised offline. CLI Push lacks credentials; publication uses authenticated GitHub connector Git Data APIs.
