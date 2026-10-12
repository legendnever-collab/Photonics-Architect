# Photonics Architect0.5.1 — Campaign Flow & Engineering Visualization

Run `dist/photonics-architect-v0.5.1.html` offline; no external assets. Source is `src/`, `index.html` and scripts. Build:`npm run build`. Unit:`npm test`. Browser suite uses Playwright and Chromium. Existing nine suites plus `node tests/flow-visualization-browser.cjs` verify the rebuilt0.5.1 file; CI aliases it under older fixture names and preserves those historical committed artifacts.

Registry:`src/campaign-registry.js`, generated `data/campaign-registry-v0.5.1.json`. Entry / completion / Goal / Next / Solution lists all read it. Original completed Designs are separately retained in the campaign archive and exported in JSON. No new Physics schema or Architecture/Level. Physics coefficients and Solver versions are unchanged; per-component power is added as result metadata.

Main new experience: Fresh Test → actual accomplishment / score / next problem → explicit Next;5→6 retains100G devices and layout while explaining the new400G hardware requirement;8→9 keeps1.6T Engine and explicitly adds Package conditions. Level11 offers Campaign Complete / Free Design / Compare / continuing edits.

Results Panel: Optical / Power / Thermal, with explicit Live Preview / Fresh / STALE states. Optical Waterfall reconciles with Solver Average and preserves NRZ/PAM4 levels and FAU boundary. Power metadata reconciles to Total and records the energy denominator/excluded items. Existing Heatmap uses fixed20–100°C scale, numerical Hotspot /65°C limit / component bars and same-scale Before/After. Chart selections sync Canvas and Inspector without changing Design.

Docs:BASELINE_V051.md, CAMPAIGN_REGISTRY_V051.md, VISUALIZATION_METRICS_V051.md, GAMEPLAY_REVIEW_V051.md and TEST_REPORT_V051.md. Primary model/source/educational assumption boundaries remain in MODELS_V050.md / MODELS_V041.md / MODELS_V02.md.

Known limits: educational models, no Receiver/full-link/BER claim, FEM, foundry DRC/LVS, production GDS or crossing-device loss. The archive retains one latest preserved Design per Level, separate from named saves/snapshots and protected Solution backup. Legacy/high-rate nominal temperature scope is unchanged. Actual touch events are tested in Chromium emulation, not physical phones. Game engagement and learning effectiveness are not certified by automated PASS results.

Stacked PR is based on unmerged PR6's latest Head. Neither the preceding nor this PR is merged before user review.
