# Actual verification — Photonics Architect v0.4.0

Baseline main `fecf883e0b447c6fc871ae1e745391e2a68963c9` (v0.3 / PR #3); actual approved merges #1/#2/#3 completed after CI verification. v0.3 head `78a65dffee843f2ea878ae55199d9cd2b8a62aec`, PR CI run 38181831572 succeeded. Historical v0.3 report preserved as TEST_REPORT_V03.md. Tests executed 2026-10-12 KST in local Chromium141.0.7390.0 / Playwright1.62.1; native source is Node JavaScript/SVG with no runtime dependencies.

## Executed results

| Suite | Actual result | Evidence |
|---|---|---|
| Unit: 70 existing +8 Reference |78 PASS /0 FAIL /0 skipped|v04-unit.log|
| Desktop Canvas |17 groups PASS /0 page errors|v04-canvas.log|
| Desktop Co-design |16 groups PASS /0 page errors|v04-codesign.log|
| Existing Guided Levels |9 groups PASS /0 HTTP/page errors|v04-levels.log|
| Existing Routing |22 groups PASS /0 HTTP/page errors|v04-routing.log|
| Mobile Studio |13 groups PASS /0 HTTP/page errors|v04-mobile.log|
| Touch routing/recovery |5 groups PASS /0 page errors|v04-touch-routing.log|

These are **actual browser input interactions**, not only fixtures or a mobile viewport with mouse events. Mobile context has `hasTouch:true`, `isMobile:true`; touchscreen.tap invokes actual touch events. CDP Input.dispatchTouchEvent executes touchStart/touchMove/touchEnd with multiple simultaneous touch points, radius5 and force1. Actual Touch Pointer Events are observed independently at document capture. Test suites open the standalone file offline. Keyboard-sized viewport is simulated; physical soft keyboard and physical phones are NOT tested.

## Mobile and preservation

14 required Components were placed by actual Library touch → Preview → Canvas touch. Cancellation and one-placement completion verified. Tap-to-connect built actual Optical and RF nets, highlights compatible targets, resolves overlapping 44px hit candidates and rejects invalid ports atomically. Inspector Component/Port alternative and explicit cancellation were exercised.

Actual tap selects, selected-component drag changes the intended component, Undo/Redo restores positions. Direction step .01mm and numeric X edit verified. Real two-pointer pinch reduces viewBox width; two-finger constant-distance pan changes origin without changing Design. World coordinates remain correct for subsequent placement after zoom/pan. One-finger explicit Pan never modifies Components/Nets. A component drag already in motion is rolled back when a second finger starts a gesture. Enlarged Waypoint hit starts a real manual-route edit and produces STALE; Undo restores anchor. Native touch sheet scrolling leaves Design unchanged.

Portrait390×844 / Landscape844×390 render within viewport, Canvas remains visible, Touch buttons approximately44px. Numeric position editing works after a keyboard-sized390×480 viewport reduction. Inspector/Dialog retain scroll independently of board. Actual design engine and migration/core regressions preserved. Desktop mouse suites verify legacy build, packet/device changes, ports, numeric input, wheel/space pan, routing, diagnostics, before/after, progress, storage migration and exports.

## References and recovery

All14 default references independently pass actual Solver/Goal checks: Level1/3/4/5 MZM/MRM/EAM, Level2 MRM/EAM. At25°C /1310nm they deliver4 lanes/100G; Stable checks four ±3°C/±.03nm corners. RF examples shorten real same-condition baseline anchors. Optical examples clear K1. Invalid custom-environment references are labelled FAIL and blocked from Apply. Same-Level / same-environment / same-Solver comparison includes footprint-area definition/envelope, Driver/Heater/Bias, RF Length/Swing, optical routing loss/levels/ER and thermal/wavelength/corner trade-offs. Coefficients remain Educational/Assumed.

Viewer opening, architecture tab changes and preview zoom do not alter Design. Apply deep-copies Components/Parameters/Nets/Routes, preserves other Level records, creates current completion only through actual Test and records usage without penalty. Actual UI applies references in all five Levels. Original Design is retained in a separate protected backup. Undo/Redo, Save/Resume with stale result gate, portable JSON backup and Restore Previous Design all verified. Creating8 new snapshots leaves6 bounded snapshots while protected original backup remains restorable. Desktop Reference apply/compare also executed.

## Resolved during QA

Touch drag initially used the wrong component origin; fixed using the selected ID and verified with actual coordinates. Synthetic compatibility-click after a board tap could operate a new picker; deduplicated. Touch buttons use thresholded pointerup activation and native-click deduplication. Manual-route touch target enlarged in screen pixels. Reference application now fits all components; compact HUD keeps100G on one line. Backup JSON derives route geometry caches consistently. Test CDP streams specify force/radii and allow gesture completion; touch scripts are not replaced with mouse-only checks.

## Artifacts and CI

Syntax-checked offline HTML rebuilt from source; build emits versioned Reference JSON. Source/Release ZIPs and SHA256 manifest generated locally. Binary publication is deferred by owner instruction; Source/HTML/tests/docs/reference data are published first. CI runs78 unit tests/build +four Desktop +two Touch suites on the actual PR head. Actual CI conclusion and link are recorded in PR/final report after observation; this document does not invent a pending run as PASS.

Screenshots visually inspected: v04-mobile-portrait.png, v04-mobile-landscape.png, v04-reference-mobile.png, v04-desktop-studio.png, v04-reference-desktop.png and PNG Export. Regression images prefixed v04-regression-. QA font Noto CJK Korean installed locally; no font/network dependency added to the application.

## Unverified and limits

No physical Android/iOS phone/tablet, native soft keyboard, Safari/Firefox/official Edge, OS file-origin policy, storage quota/eviction/denial injection, screen-reader accessibility or human enjoyment/comprehension validation. Main Canvas supports pinch; Reference Preview uses zoom buttons plus scrolling. If browser storage is unavailable, runtime backup/Undo require portable Export before closure. Protected backup retains the latest Apply original, replaced only by a later explicit Apply. No foundry DRC/LVS, physical bend radius, full-wave/BER/eye, measured device/thermal calibration or fabrication-ready GDS. Existing educational1310nm/25GBd NRZ/100G model remains unchanged.
