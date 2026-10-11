# v0.1.0 Test report

Verified 2026-10-11. Authoritative main baseline: fa0383207a191b6c9a7b3ae749bf210f2137a467. Final local runs: **12 unit PASS / 0 FAIL**, **17 browser scenario groups PASS / 0 FAIL**, zero browser page errors. Browser scenario groups are not individual assertion counts. Build PASS (single HTML with embedded JS/CSS and no network references).

## Executed

Node v24.19.0, node:test. dBm/mW conversion; ideal splitter power conservation; independent 4-lane graph/100G; missing optical output; RF length and attenuation units/drive decline; 100 coordinates = 1 mm; cross-kind reject/atomicity; boundary and overlap; JSON validation/rollback; deterministic results/library separation; optical geometry loss; occupied port rejection.

Playwright 1.62.1 using available Chromium executable in headless mode. Actual page mouse events place 14 components and connect 13 nets (no injected completed fixture). Run gives VALID/100G. Mouse dragging a Driver causes RF degradation; undo recovers. file:/// IndexedDB autosave/manual save, page reload and Resume pass. Invalid JSON leaves current design intact. JSON, PNG and Summary downloads pass; PNG signature verified. Named Save/Load, incompatible port feedback, wheel zoom/reset, lane duplication/undo, keyboard movement, rotate/delete/undo, numeric position/redo, Space-pan and backup recovery pass. Viewport 1280×720 and 1920×1080 checks confirm no whole-page vertical scroll. 1440×900 screenshot saved.

Pan verification initially failed because the test retained numeric-input focus. Test now clicks Canvas first; Canvas capture handling additionally supports Space-pan over components. Final run passes.

## Regression matrix

| Regression | Result |
|---|---|
| A First launch / B Empty design | PASS |
| C First placement | PASS |
| D Optical / E RF / F Invalid connection | PASS |
| G 4-Lane / H Optical / I RF | PASS |
| J Geometry validation | PASS (unit tests) |
| K Failure diagnosis / L Improvement | PASS |
| M Save/Resume / N Export/Import / O Reload | PASS |
| P Standalone production build/file origin | PASS |

## NOT RUN / limitations

Official Chrome Desktop and Edge Desktop binaries unavailable: **NOT RUN**. This report does not equate Chromium with an actual Edge or Chrome run. Cross-profile/file relocation persistence, quota/storage-denial fault injection, different OS behavior and native palette drag-and-drop have not been separately verified (palette click placement and actual Canvas drag movement are verified). Korean system font is absent in this headless environment; screenshots show fallback missing-glyph boxes for Korean while DOM text is intact. Windows Korean rendering requires user-side verification. Automated GitHub CI is configured; its remote outcome is tracked on the PR and is not part of local PASS totals.

Known scope limits: educational device values, schematic EIC/PIC floorplan, automatic simplified routing with no obstacle avoidance or bend-radius DRC, fixed device parameters, no quantitative Eye/BER, no power/thermal solver, no GDS. Source is dependency-free JavaScript rather than TypeScript. One Mission only; gameplay enjoyment needs human playtesting.
