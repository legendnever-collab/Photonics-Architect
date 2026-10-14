# Executed QA — v0.8.0

Baseline: merged v0.7.1 main5da597a /261 unit tests. Existing Level1–18 completion predicates, legacy Tx/PIC/Package equations and published historical HTML are retained. No physical-phone, standards compliance or subjective-fun PASS is implied.

## Executed local evidence

- `npm test`: **308 PASS /0 FAIL /0 skipped**. The original261 baseline plus47 added tests are included. [Unit log](qa-v080/unit.log).
- `npm run build`: all three current v0.8 HTML files, registry/Solution data, manifest and SHA256 generated; syntax checked. Light/Dark differ only in initial-theme attribute; no required external script/style assets.
- Full18 browser suites: **18 PASS /0 FAIL**, on v0.8 Light SHA256 `ff726659c38fc30a5c2e0b18efdde7f6982fac03c98c141eb23b1d776ceebeb5` (source checkpoint0598c18). Each historical fixture filename was replaced temporarily with these **new v0.8 bytes**, not the old v0.7 executable. The runner restored published historical files after execution. [Machine-readable full results](qa-v080/full/results.json).
- Final presentation-only delta: actual Architecture target hint, removal of Rx controls from Tx-only Fast & Narrow, and rejection of copying a Receiver graph into that Tx-only chapter. **Final delta3/3 PASS** on Light SHA256 `2bca274d4d8e797de6dd7ceca811951aa54ae9902abc1238a43aa29e135c5956`. [Final delta results](qa-v080/final-delta/results.json). The final CI re-runs every suite on the final commit.

Local runtime: Node24.19.0, Playwright1.51.1 + Chromium134 (fallback after current CDN archives were truncated). CI uses Node22 / Playwright1.62.1 + its Chromium. No production dependency or external font is added.

| Suite | Result | Seconds |
|---|---|---:|
| browser | PASS | 13.47 |
| codesign-browser | PASS | 20.1 |
| levels-browser | PASS | 6.01 |
| routing-browser | PASS | 32.32 |
| mobile-browser | PASS | 17.86 |
| touch-routing-browser | PASS | 12.19 |
| scaling-browser | PASS | 13.06 |
| solutions-browser | PASS | 9.57 |
| package-browser | PASS | 18.39 |
| flow-visualization-browser | PASS | 29.81 |
| wdm-browser | PASS | 42.81 |
| physical-browser | PASS | 41.01 |
| stabilization-browser | PASS | 39.95 |
| chapters-browser | PASS | 4.98 |
| onboarding-browser | PASS | 7.73 |
| link-browser | PASS | 30.24 |
| link-mobile-browser | PASS | 6.97 |
| migration-theme-browser | PASS | 16.55 |

## What was actually exercised

Desktop mouse placement/routing/selection/drag/numeric/Undo/Redo/zoom/pan; real CDP multi-pointer touch placement, port interactions, pinch/pan and independent inspector scrolling; portrait/landscape and constrained keyboard-sized viewport. Legacy1–18 progress,14→15→16→17→18, Package/thermal/assembly stress predicates, reference/source preservation, fresh Test gates, JSON/named/backup/Resume and PNG remain exercised.

New-user Skip→Hub→empty Foundations:14 real mouse placements +13 port connections, actual Test, explicit Copy to Link, four Receiver block placements +eight manual optical connections, actual100G complete Link. Receiver range and reconciled waterfall, theme/clone nonmutation, direct Tap/DC Monitor/Grating Access insertion, main budget, two actual saved Monitoring Plans,23→24, installed observations only, Ambiguous answer and Chapter Complete→Hub. Both Solution entry points ×six new missions, real Apply/Test, protected bias0 original restore and chapter/revision Resume were exercised.

The migration/theme suite loads the actual tracked v0.7.1 schema7 fixture, preserving18 completed IDs, geometry, snapshots, named/raw archives; whole-workspace Import/pre-import Restore and malformed input rejection; unsupported Copy rollback with valid Hub; actual WDM wavelength/shared-bus markers, reconciled budget; both PNG background pixels; Theme preserves exact inputs, Fresh Test, range and fixed Thermal20–100 scale/cell values. Unit tests exercise all four Tx architectures and12 new reference variants, Average/OMA/overload/current/voltage/BW/bias/profile/λ/interconnect failures, double-count guards, tap conservation, DC vs AC, process access distinction, Loopback stage, seeded ambiguity and unavailable ADC readings.

The automated file:/// suites set offline and count required HTTP requests/page errors: **0** in passing suites. Public source links are optional explicit navigation, not runtime dependencies. The model guard also checks no external script/stylesheet and identical Light/Dark application bytes.

## Failures found and remediation

First local current-build run:13/17 PASS, four failures. Initial current-build CI [Verify#74](https://github.com/legendnever-collab/Photonics-Architect/actions/runs/38645151217) failed (Unit/Build passed, Browser13/18 passed). These are not reported as successful acceptance runs. Initial local results are preserved in [initial-failures.json](qa-v080/initial-failures.json); CI keeps its raw logs and artifacts.

- Pre-upgrade fixtures wrote only `current` after v0.8 had already created its authoritative workspace. Their setup now removes the new workspace key before injecting legacy data; actual schema7 migration is tested separately. Level count18→24 and Library metadata assertions reflect the extended registry.
- Async workspace/original restoration could overlap an early Test after reload. Editing stays inert until ready; tests wait for that signal, not an arbitrary300ms delay.
- WDM full workspace JSON (~3.68MB) timed out during single-line textarea layout. Paste disables wrap/spellcheck; actual full Import/Resume/PNG now passes. No graph/original payload was dropped to make the test smaller.
- Warning target moved under the toolbar at the new viewport height; test uses actual Fit All before the warning click.
- Damaged-route repair intentionally edits a Design-only payload; carrying an unchanged whole-workspace copy beside it contradicted the atomic current/workspace validation. Test now declares Design-only intent; malformed whole-workspace rejection remains tested.
- A separate pre-Tap scroll helper could detach after a Theme render in current Playwright. Native Locator Tap now handles its own auto-scroll/auto-wait; actual touch actions and assertions remain.
- Source inspection found unsupported Copy could leave an empty record. Workspace rollback now preserves the original state; nominal destination Copy also clears only the exercise state, not the source design.

Earlier `/tmp` logs/sessions were lost with runtime replacement and are not counted as final passes. `ps` failed with `fatal library error, lookup self`; process tracking used tool sessions and the bounded QA runner instead of repeated failed commands. Font fetch hit one connection timeout and was stopped. Installed System Font was used; local Linux lacks Hangul glyphs, so some screenshots show squares. This is an environment typography limitation; Korean glyph readability is **not** marked PASS. No runtime font download is required. Theme/layout/English numeric visibility and PNG pixel assertions passed.

## Known limits / not executed

Physical phones, native mobile keyboard, Safari/Firefox and assistive-technology audit were not executed. Touch results are Chromium emulation. No measured optical/receiver/PDK validation, BER/FEC/Eye, dispersion/PMD/RC/noise, thermal FEM, foundry DRC/LVS or tape-out sign-off. Faults are four known−2dB scalar families; the modulator case is a loss surrogate. Current downstream coverage can remain75% and Ambiguous. No private PDK document or universal MIM-after-GePD rule is included.

## CI and review record

Source checkpoint0598c18 passed [Verify#76](https://github.com/legendnever-collab/Photonics-Architect/actions/runs/38646237281). The final-head CI result is posted after publication in the validation comment on [PR#10](https://github.com/legendnever-collab/Photonics-Architect/pull/10), with exact head SHA, run URL, job outcomes and actual new-build SHA. A pending CI is never counted PASS in this file. The PR remains unmerged for user gameplay review. Source/HTML were pushed at P0, P1, P2/P3 and stabilization checkpoints rather than held for screenshots/ZIP.
