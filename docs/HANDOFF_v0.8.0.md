# v0.8.0 handoff

Baseline main: v0.7.1 / merged PR #9 /5da597a. Development branch: `feature/v0.8-complete-optical-link`. Review PR: [#10](https://github.com/legendnever-collab/Photonics-Architect/pull/10). **Do not merge before the user reviews gameplay.** No release tag or merge is created by this task.

## Run

Download `dist/photonics-architect-v0.8.0-light.html` or `dist/photonics-architect-v0.8.0-dark.html`, then open the downloaded file in a browser. GitHub's HTML blob page displays source. Each file is self-contained, supports both themes, uses system fonts and needs no HTTP requests. The initial theme differs; a saved preference overrides it. Generic `photonics-architect-v0.8.0.html` starts Light too. SHA256 and artifact/source digests: `dist/SHA256SUMS-v0.8.0.txt`, `dist/release-manifest-v0.8.0.json`.

Existing IndexedDB data becomes Legacy Workspace. Use Designs / Export before trying a different browser or moving the file; file-origin storage sharing depends on browser policy. Workspace JSON includes all chapters and originals. Opening a new chapter never automatically reuses another chapter's design. Startup waits for workspace restoration before enabling editing.

## Suggested review

1. New user: take the interactive Receiver Tutorial or Skip to Chapter Hub. Tutorial requires real placement, three port connections and Run Engine. Help reopens it without replacing the production workspace.
2. Foundations: choose empty start. Build Laser → Splitter → four Modulators/Drivers → Outputs; connect ports and Test. Existing Solution remains available.
3. Complete Optical Link: explicitly Copy the Foundations or another Tx workspace. Copy selects Complete Link for a real Tx, preserving the source chapter. Place Receiver Blocks per lane and manually connect Output → Channel → PD; the packet connects PD→TIA→Measurement. WDM needs Demux output mapping. Test the actual graph and inspect lane range/waterfall.
4. First Receiver: intentionally set PD bias0, TIA BW low, input too weak/strong, or wrong packet. Run and follow the concrete failing block from Score Guide/Inspector. Laser power cannot repair bandwidth/bias/profile errors.
5. Customer Link: target is fixed1.6T. Select Reach/Density/Power and compare Fast/WDM at the same source budget. Inspect actual I/O, electrical budget and receiver operating range; an unsuitable Solution cannot Apply.
6. Monitoring: explicitly Copy a complete Link. Select a downstream Optical Net (Canvas or dropdown), insert Tap/DC Monitor; choose a wafer/package stage and add Grating Probe Access on another branch. Check main budget, DC signal/readout range and product access. Save two Plans and compare actual solver results. An independent process Reference cannot substitute for product access.
7. Fault Diagnosis: start a seeded known−2dB exercise, use only installed observed monitor readings and verified baselines, then answer. If several families have the same signature, choose Ambiguous. No uninstalled node or exact hidden location is revealed. Finish returns to Chapter Hub.
8. At each new mission compare header Solution and Campaign Solution: both Apply + actual Test, preserve the first original, and enable Next/Chapter Complete only when all predicates pass. Restore/Undo/Resume needs another fresh Test.
9. Switch Light/Dark, export JSON/PNG, Resume a different chapter and return. On mobile use tap selection, port actions, Inspector numeric controls and Optical Net dropdown. Pan/Pinch/Undo retain the original controls.

## Score reading

Click Score to see item deficits, a concrete edit target and why. Complete Link shows Functional35 / Receiver20 / Power-Area15 / Observability20 / Test-Customer10. The Solution table shows actual total and item scores; different conditions are not compared with an improvement delta. Clone Solver Preview changes a cloned Channel insertion input only and reports its actual result without editing My Design. Reducing loss may improve lower-limit headroom while worsening overload headroom. Extra monitors cost optical power, area and readout power; only distinguishable fault signatures improve observability. Current downstream fault coverage tops out at75%; 100 score/coverage is not required. Mission constraints and Fresh Test are independent gates.

## Engineering boundaries

The v0.8 Receiver Screen is nominal25°C/1300–1320nm and short PD–TIA planning interconnect≤2mm. Fiber is0–2km loss-only, not a validated reach. Data PD and slow DC monitor are separate port/profile domains. No BER/FEC/Eye, receiver noise, electrical RC/stability, full thermal response, dispersion/PMD, foundry DRC/LVS, or real GDS qualification. Loopback is a scalar-loss test path; external detector instrumentation is excluded. The modulator fault is an output-loss surrogate, not actual bias/ER physics. MIM is a circuit-purpose note; the user's PDK-specific rule remains **verification required**. All added numeric packet thresholds are game assumptions.

Model/source/score details: [MODELS_V080.md](MODELS_V080.md). Chapter/schema preservation: [CHAPTERS_MIGRATION_V080.md](CHAPTERS_MIGRATION_V080.md). Checkpoints: [DEVELOPMENT_V080.md](DEVELOPMENT_V080.md). Final executed evidence and known QA gaps: [TEST_REPORT_V080.md](TEST_REPORT_V080.md).

## Build and test

Node≥20: `npm test`, `npm run build`. Build emits the three standalone files, generated campaign/chapter/Solution data and deterministic manifest/SHA256. There are no production npm dependencies. Browser validation: install Playwright/Chromium, then `npm run test:browser`; `CODEX_PRIMARY_RUNTIME_NODE_MODULES` may point to its external installation. CI installs Playwright1.62.1. Local fallback browser version is recorded in QA.

The runner executes18 suites sequentially, prints30-second heartbeats, bounds each suite to240 seconds, records logs/exit codes/build SHA256 in `artifacts/v080-qa`, and restores historical HTML/screenshots after using current v0.8 aliases. A failure stays a failure; the runner continues independent suites for diagnosis. Published historical HTML files are not used as the final test subject.
