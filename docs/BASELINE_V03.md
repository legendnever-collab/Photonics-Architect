# Authoritative v0.3 baseline

Actual GitHub state checked 2026-10-11 UTC (2026-10-12 KST), before implementation.

- main: `fa0383207a191b6c9a7b3ae749bf210f2137a467`, README-only.
- v0.2 PR [#2](https://github.com/legendnever-collab/Photonics-Architect/pull/2): Open / Unmerged.
- v0.2 branch: `feature/v0.2-modulator-eic-codesign`.
- v0.2 head: `221e868758dc4a2c5368fcfd32476952b5b252c2`.
- Implementation tree: `ff8f8e7a9fcbd40abf3e25c4b76eaef77ab348ef`.
- Actual v0.2 GitHub CI runs 38152041967 and 38152038635: success.
- PR #2 base: `feature/v0.1-first-optical-engine`, implementation head `c0a54d30c670d9dd1024d7cf7702df6b066bb90f`.
- README, all source modules, Solver 0.2.1 / Model 0.2.1, Schema 2, tests and release artifacts inspected. Repository has no AGENTS.md or CLAUDE.md.

Development branch `feature/v0.3-layout-routing-challenge` was created from the actual v0.2 head. main was not used as the implementation baseline. PR is stacked on v0.2 until separately authorized merge; neither underlying PR is merged by this work.

Baseline tests were **rerun**, not copied from the report: 43 unit tests, 17 Canvas, 16 Co-design and 9 Level browser scenario groups all passed. Logs: `baseline-v02/unit.log`, `canvas.log`, `codesign.log`, `levels.log`. Browser tests opened the standalone HTML and exercised actual controls in headless Chromium.

Baseline behavior retained: 1310 nm O-band, ±3 °C / ±0.03 nm Stable corners, Compact ≤6.4 mm², Fresh Test gates, selected Level / completion records, Engine / Snapshot preservation, original C-band Archive, MZM / MRM / EAM numerical device and packet assumptions.
