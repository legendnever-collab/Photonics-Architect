# v0.7.1 executed QA report

Baseline: unmerged PR #9 Head `737aff3751672a204c96fb51414587052504a245`, Verify #60 SUCCESS. The baseline local suite passed246 tests. See STABILIZATION_V071.md for exact reproduction boundaries: the reported button-dependent distinction was not reproduced, but both physical Apply paths left stale results. Raw reproduction: v071-baseline-reproduction.log.

## Executed results

- Unit: **261 PASS /0 FAIL /0 skipped** (existing246 +15 new), Node test runner. Raw: v071-unit-tests.log.
- Browser: **13 suites PASS /0 FAIL**. Local Playwright1.51.1 / Chromium134; headed physical-device testing was not performed. CI independently uses the repository's Playwright1.62.1 setup.
- Suite names and raw logs: browser, codesign-browser, levels-browser, routing-browser, mobile-browser, touch-routing-browser, scaling-browser, solutions-browser, package-browser, flow-visualization-browser, wdm-browser, physical-browser, stabilization-browser. Each is saved as `v071-<suite>.log`.
- `npm run build`: PASS. Self-contained `dist/photonics-architect-v0.7.1.html`, no runtime asset downloads.
- `file:///`, offline contexts: zero required HTTP requests / zero page errors; JSON and PNG download exercised.

The regression runner temporarily aliases the current0.7.1 HTML to historical fixture filenames so all previous browser suites exercise current code; historical tracked HTML and screenshots were restored afterward. No unrelated historical ZIP was modified.

## Specific behavior verified

New stabilization suite applies **both Campaign and Header Solution for each Level14–18**, asserting actual fresh-result completion,100% progress and correct Next/Free Design enablement. Level14 verifies actual same-condition three-architecture results, customer-compatible defaults, incompatible full-solution rejection, optional individual-example workflow, and real14→15 transition. Physical suite executes actual15→16→17→18.

The Score guide selects a concrete entity, shows real weighted missing points, and offers preview-only real-solver geometry experiments. A predicted68→75 result matches the actual radius edits followed by Test. Read-only preview leaves the exported design exactly unchanged. Feasibility failures retain Score0 and prevent completion even when raw weighted score is positive. Restore/Edit/Undo/Redo/Resume/JSON retain Fresh Test gates and independently protected originals.

Desktop mouse, waypoint movement, position/rotation numeric inputs, inspector scrolling, mobile touch selection/drag/pan/pinch, portrait and landscape were exercised. Mobile stabilization verifies both Solution controls and Next after actual apply completion, target selection and visible guide. Screenshots: v071-score-guide-desktop.png, v071-mobile-portrait.png, v071-mobile-landscape.png; images visually inspected.

## Rerun details and limits

A final targeted rerun initially failed one mobile test assertion that read Next before the asynchronous protected-backup/application completed. The test now waits for the application dialog to close; the complete stabilization suite was rerun and passed. This is not recorded as an unexplained PASS. The physical suite also passed after the final Apply-button busy guard. All prior suites passed the complete regression run. The final build changes only the solution-data release metadata to0.7.1, while physical model stays0.7.0.

Initial published-head Verify #62 (run38478619950, Head2e96158) passed unit/build and the first11 browser suites, then failed at physical-browser.cjs:8 because its immediate Next assertion did not await asynchronous protected-backup/Application completion. The physical suite and remaining desktop stabilization Apply assertions now wait for dialog closure, retaining the real Test/Next checks without a timed sleep or forced gate. Excerpt: v071-ci-initial-failure.log. Runtime source/HTML and physics are unchanged by this follow-up.

GitHub final-head CI is independently verified after publication and reported in PR #9's verification comment. Local PASS is not used as a substitute for CI. Main remains unmerged. No real-phone/native keyboard, subjective engagement/learning, foundry sign-off or additional physics calibration claim.
