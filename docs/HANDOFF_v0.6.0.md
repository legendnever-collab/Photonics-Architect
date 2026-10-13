# Photonics Architect v0.6.0

Run `dist/photonics-architect-v0.6.0.html` offline. Source:`src/`, `index.html`. Build:`npm run build`. Unit:`npm test`. Browser validation uses Playwright with all11 scripts including `tests/wdm-browser.cjs`. CI builds the new file, temporarily aliases old fixture filenames and tests the real UI. Historical HTMLs remain committed unchanged.

Campaign14 Levels:11→12 retains Package/Engine before explicit WDM entry;12 builds4 independent100G PAM4 channels into one400G WDM output;13 expands the personally built Path to4×4λ /1.6T;14 compares16×100G Spatial,8×200G Fast & Narrow,4×4λ×100G WDM at one customer / total source optical budget. The final campaign screen is14. Every Next/score requires current Fresh Test and the registry predicate.

WDM components:4λ CW Source Bank, selectable individual CW Source,4×1 Mux and existing hs100 MZM/EIC. Source power is perλ. Actual optical graph packets retain independentλ / modulation / route / RF identity; Mux adds IL/filter transmission, not splitter division. Each wavelength has its own Waterfall/PAM4 levels; combined output sums linear average powers. Spectral plots are planning curves, not measured spectra. Optional FAU replaces Edge loss and shares physical-channel assembly offset acrossλ.

Model/primary-source/assumption boundaries:MODELS_V060.md. Schema/migration/protected original keys:SCHEMA_V060.md. Executed evidence:TEST_REPORT_V060.md and v060 logs/screenshots. Solutions:data/solution-designs-v0.6.0.json; registry:data/campaign-registry-v0.6.0.json.

Known limits:Educational grid is not CWDM/LAN-WDM compliance;100G/50GBd is gross. Generic hs100 response is assumed wavelength-flat over1302–1318nm at25°C. WDM Thermal/filter temperature drift, package-zone qualification, Receiver/BER, noise/coherence and lifetime/yield are Unsupported. Optional FAU uses a wavelength-flat coupling surrogate / manual stress scenario. Existing Levels9–11 package/thermal/seeded MC are unchanged. Source electrical power is excluded. Physical phones/native keyboard and game engagement are not certified by automated tests.

Preceding PR6 / PR7 are merged in order; this v0.6 PR is published for user review and must remain unmerged.
