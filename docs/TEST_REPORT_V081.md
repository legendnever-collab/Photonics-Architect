# Photonics Architect v0.8.1 — executed QA

Baseline: v0.8 RC `7f04e9fdb37322b006bff4fe0167f7299a5fb181` / PR #10 / Verify #78 SUCCESS. Current review branch: `feature/v0.8.1-mobile-architecture-tracks`; no main merge.

**Executed artifact:** `dist/photonics-architect-v0.8.0.html` — application0.8.1, single executable, saved Light/Dark toggle. **SHA256:** `77c52eae6ff0df522c1fd3aabfcbfc7dd078af9060cfda23be7dc4d3f680b5be`.

## Executed checks

| Check | Result |
|---|---|
| Unit / engine / goals / migration | **335 PASS /0 FAIL** |
| Track/Tutorial/mobile/Theme/persistence/Touch/offline UI | **163 PASS** |
| All24 Legacy missions on the current build | **32 PASS** |
| v0.7 schema7 and RC Workspace migration / backups / atomic reject / Theme PNG | **24 PASS** |
| Track-specific Next reasons / Score Guide targets / actual Bias repair | **23 PASS** |
| Total browser assertions | **242 PASS /0 FAIL** |
| Full current-stage reference designs | **36/36 actual goal predicates pass** |
| Runtime HTTP / page errors in all4 browser suites | **0 /0** |

Source and relationship regressions remain in `npm test`; historical browser scripts remain as historical fixtures. The current browser harness replaces obsolete numbering/layout/dual-theme contracts with4 current UI suites, including all24 old missions. Old v0.7 HTML or cached old PASS is never executed as new-screen evidence. Raw current-build results/logs: `artifacts/v081-qa/`. The Score suite was executed separately on the same frozen HTML hash; CI runs all4 sequentially.

Actual UI completed18 stages: Fast & Narrow6, Slow & Wide6, WDM6; Solution →actual Test →Next. First-level examples contain one200G/100G Lane or one400G4λ Path, not a complete1.6T link. Full Track preview is explicit. All Track outputs are connected to Rate-compatible PD/TIA/Measurement; WDM has4 actual Demuxes /16 correctly mapped λ data channels. Manual Optical Route is required in Level3. Monitoring conserves actual main-path power, uses DC readout range and product Optical Probe Access, and final Fault answers use installed monitors.

Separate Tutorial:4 real touch placements /3 real Port connections /actual25G NRZ Test; Step1–3 display; returns to Fast & Narrow Level1 empty; its completed Design is independently preserved. Track first-entry empty and previous exact Design retained through Resume. Fresh Test required after Next/Resume/Import/Restore/Undo. Actual protected Solution Restore/Undo tested. Large whole-Workspace9.75MB clipboard data is retained behind a bounded12KB preview, then imported through the real validation/storage path; current Design round-trips exactly. ClipboardEvent fixture exercises the same paste handler; native OS clipboard service is not claimed tested.

Theme toggle preserves exported Design exactly, stores user preference, and restores it on reload. Light/Dark PNG exports are different while Design remains identical. Modal/chart/SVG Theme painting uses the existing presentation layer. JSON full Workspace export, Paste Restore, independent snapshots/backups and offline file:/// Resume tested. Actual CDP touch movement, Pinch/Pan, readable Selection Zoom and separate Panel scrolling tested.

## Viewport measurements

Measured available visualViewport height; default details/panels/tools collapsed. Canvas is the actual SVG rectangle. All44px bottom targets and14px Goal heading checked. No body scroll / horizontal overflow.

| Viewport | Canvas height | Canvas / available height |
|---|---:|---:|
|390×844 portrait|648px|76.8%|
|360×640 portrait|444px|69.4%|
|375×667 portrait|471px|70.6%|
|412×915 portrait|719px|78.6%|
|320×568 portrait|372px|65.5%|
|844×390 landscape|222px|56.9%|
|667×375 landscape|207px|55.2%|

The visualViewport resize path was exercised through these changes. Safe-area top/bottom/left/right use CSS environment insets; physical notch/browser-toolbar/nonzero hardware insets and native keyboard were not measured. Panel content uses internal overflow/overscroll containment and does not change Canvas view while scrolling.

## Screenshots

- `docs/v081-mobile-first-screen.png`: blank Fast & Narrow Level1, Canvas-first shell.
- `docs/v081-mobile-readable-selection.png`: real selected component at usable zoom after touch movement/Pinch.
- `docs/v081-fast-summary.png`, `v081-slow-summary.png`, `v081-wdm-summary.png`: actual tested complete architecture graphs, Throughput, optical budget, modeled power, observable faults/access and next-Track action.

## Failures found and resolved

During development the default Playwright browser was unavailable and full Chromium required a prohibited Unix socket. The installed Chromium headless_shell1161 runs; no browser download/repeated blocked launch was used. Tool expansion had a CSS specificity collision; corrected. The320px layout overflowed after the compact status text was added; grid-item/min-content widths corrected and all7 viewports remeasured. A9.75MB unwrapped single-line textarea caused a renderer crash; bounded clipboard preview plus fewer Workspace clone copies resolved it, and the complete content now passes actual Import/Restore. These failed attempts are not counted PASS.

## Limits / CI

System fonts are used. Local Linux has no installed Hangul glyph coverage, so Korean text appears as squares in screenshots; **Korean rendered glyph quality is not claimed PASS**. User-device system fonts are used at runtime. Local Chromium emulation does not certify physical Android/iOS/Safari/Firefox/native keyboard behavior or learning/engagement quality. Nominal25°C Receiver/high-rate junction Thermal, BER/FEC/Eye/noise/dispersion and manufacturing qualification remain outside the unchanged Educational model.

Local PASS is not a remote CI claim. Final published PR must report the actual Head and GitHub Verify conclusion independently; consult its current checks and final delivery message. No automatic merge is performed.

## Recovery verification (2026-10-15)

A fresh `npm run build` reproduced the exact frozen HTML SHA256 above; a fresh `npm test` passed335/335. Existing browser evidence is reused only for this identical executable, with raw9751568-byte paste and163-check tracks log. Recovery logs are `artifacts/v081-qa/recovery-build.log` and `recovery-unit.log`. Remote checkpoint8535138 CI is historical, not final-candidate CI. The latest PR Head checks are the authoritative final CI outcome.
