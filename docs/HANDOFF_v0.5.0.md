# Photonics Architect0.5.0 — From Engine to Package

Open `dist/photonics-architect-v0.5.0.html` locally. No external assets or network requests are needed. Source:src / index.html. Build:`npm run build`. Optional Source/Release ZIP:`python3 scripts/package.py` (versioned manifest and SHA256SUMS). Unit:`npm test`. Browser tests use Playwright and Chromium with `CODEX_PRIMARY_RUNTIME_NODE_MODULES` / optional `BROWSER_EXECUTABLE`; package scenario test:`node tests/package-browser.cjs`. CI runs all eight existing browser suites plus the new package suite against the rebuilt0.5 standalone file.

Flow: existing1.6T Engine → Level9 Package → place EIC/PIC/IO Zones and FAU / map channels / routes → Nominal Test → Level10 Heatmap / driver movement / Cooling → Level11 Precision/Interface profiles / Corners / Seeded MC → Snapshot Compare.

When the player's engine cannot yet pass1.6T, it is preserved on entry. Solution or Prepared Challenge is available. Prepared Challenge preserves the current design as a Snapshot. New Package constraints activate only in Level9–11. Separate Package control panel, Numeric Package Inspector, four read-only overlays, hotspot selection, channel diagnostics and existing touch navigation are integrated into the same Canvas. Two solver-verified alternative solutions are included for each new Level; Apply / Undo / Restore reuse the existing durable backup workflow.

New files:package-models.js (assumptions/geometry/thermal/FAU), package-engine.js (state entry/references/stress/sampling/freshness), package-ui.js (Canvas/panels/tests/comparison). Existing high-speed RF model accepts optional driver temperature; default25°C preserves older nominal behavior. Coefficients and limits:docs/MODELS_V050.md. State:docs/SCHEMA_V050.md. Tests:docs/TEST_REPORT_V050.md. Solutions:data/solution-designs-v0.5.0.json.

Known limits: 2D planning layer; assumed thermal response / device temperature coefficients / FAU coupling surrogate; crossing loss and physical crossing implementation unsupported; no actual assembly cost, FEM, BER, lifetime, foundry DRC/LVS, production GDS, WDM or448G. Current prepared package examples use8×200G; custom16×100G engines are retained and can be packaged, but their footprint/routing requires manual re-layout. Browser regression uses real Chromium pointer/touch events in emulation; no physical Android hardware was available in this environment.

PR is for review only. Do not merge before user review.
