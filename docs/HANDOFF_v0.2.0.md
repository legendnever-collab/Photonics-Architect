# Photonics Architect v0.2.0 — Handoff

Open`dist/photonics-architect-v0.2.0.html` after downloading. All CSS/JS embedded; no CDN/server/API key. Start at Level 1 with the persistent goal/NEXT ACTION above Canvas. Complete a fresh VALID Test, then Next Level preserves the Engine and advances to Compact (Level 2), then Stable (Level 3). Level selector permits replay/free exploration. Laser defaults to 1310 nm O-band. On the right, Modulator Technology and Driver Packet selectors preserve compatible wires. Test→Snapshot→modify→Test→Compare explores alternatives. JSON import is paste-based, no file upload required.

Source modules:`models.js` definitions/device/EIC/RF/thermal equations;`core.js`geometry/netlist/migration/graph solver/Brief/scoring/comparison;`app.js`incremental Design Studio/Inspector/export;`persistence.js`existing IndexedDB store plus legacy archive. Runtime dependencies:none. JavaScript ES modules; not TypeScript. Release filename remains v0.2.0; schema2 and revised model/solver0.2.1 identify the O-band correction, without starting v0.3.

Local build:`npm test`;`npm run build`;`python scripts/package.py`. Browser tests:install Playwright1.62.1 and Chromium, then run`node tests/browser.cjs` `node tests/codesign-browser.cjs` and`node tests/levels-browser.cjs`. Set CODEX_PRIMARY_RUNTIME_NODE_MODULES to absolute node_modules or use bundled runtime; BROWSER_EXECUTABLE optional. CI runs unit/build and all three browser suites. Artifacts include source ZIP,release ZIP,manifest/SHA256SUMS.

Legacy schema1 paste import or automatic same-origin IndexedDB load migrates safely. Original raw v1 current is archived as`legacy-v1`. Export before changing profile/path/browser; file-origin persistence behavior varies. Import never trusts saved result. Named saves,Snapshots and backup persist. Undo history is session-only.

See TEST_REPORT.md for evidence and NOT RUN cases; MODELS_V02.md for sources,units,domains,assumptions and limitations. VALID means current educational constraints,not DRC/BER/manufacturing sign-off. Main merge/tag/formal Release remain pending owner approval.

Prior v0.2 C-band saves are explicitly converted and archived; see COMPONENT_SCHEMA/MODELS_V02. Every resumed/imported design requires fresh Test. Goals and progress survive Save/Resume; undo remains session-only.
