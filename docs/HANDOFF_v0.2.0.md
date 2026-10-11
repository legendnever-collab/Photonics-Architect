# Photonics Architect v0.2.0 — Handoff

Open`dist/photonics-architect-v0.2.0.html` after downloading. All CSS/JS embedded; no CDN/server/API key. Use left Customer Brief and environment, then place/route components. On the right, Modulator Technology and Driver Packet selectors preserve compatible wires. Test→Snapshot→modify→Test→Compare explores alternatives. JSON import is paste-based, no file upload required.

Source modules:`models.js` definitions/device/EIC/RF/thermal equations;`core.js`geometry/netlist/migration/graph solver/Brief/scoring/comparison;`app.js`incremental Design Studio/Inspector/export;`persistence.js`existing IndexedDB store plus legacy archive. Runtime dependencies:none. JavaScript ES modules; not TypeScript. Schema2 and model/solver0.2.0.

Local build:`npm test`;`npm run build`;`python scripts/package.py`. Browser tests:install Playwright1.62.1 and Chromium, then run`node tests/browser.cjs` and`node tests/codesign-browser.cjs`. Set CODEX_PRIMARY_RUNTIME_NODE_MODULES to absolute node_modules or use bundled runtime; BROWSER_EXECUTABLE optional. CI runs unit/build and both browser suites. Artifacts include source ZIP,release ZIP,manifest/SHA256SUMS.

Legacy schema1 paste import or automatic same-origin IndexedDB load migrates safely. Original raw v1 current is archived as`legacy-v1`. Export before changing profile/path/browser; file-origin persistence behavior varies. Import never trusts saved result. Named saves,Snapshots and backup persist. Undo history is session-only.

See TEST_REPORT.md for evidence and NOT RUN cases; MODELS_V02.md for sources,units,domains,assumptions and limitations. VALID means current educational constraints,not DRC/BER/manufacturing sign-off. Main merge/tag/formal Release remain pending owner approval.
