# Photonics Architect v0.2.0 — Verification

Date: 2026-10-11. Baseline: v0.1 implementation `c0a54d30c670d9dd1024d7cf7702df6b066bb90f`, PR #1 unmerged; main initial commit `fa0383207a191b6c9a7b3ae749bf210f2137a467`. Existing repository CI: both v0.1 workflows success. Original baseline rerun: 12 unit tests + 17 browser scenario groups PASS.

## Final local evidence

**39 unit PASS / 0 FAIL; 17 retained Canvas browser scenario groups PASS / 0 FAIL; 16 Co-design browser scenario groups PASS / 0 FAIL. Zero page errors.** Browser groups are named scenarios, not individual assertion counts. Syntax check/build PASS. Standalone runs at file:/// with embedded JS/CSS and no external assets. SHA256SUMS validates all release artifacts.

Runtime: Node v24.19.0; Playwright 1.62.1; available Chromium headless executable. Browser testing sends actual mouse clicks, pointer drags, key presses and Inspector input/select events; UI is not replaced by solver fixtures. Retained Canvas suite places 14 components and wires 13 nets through the UI. Co-design suite seeds a schema1 IndexedDB record solely for migration, then uses actual UI selection/parameters/export/import for alternatives.

## Acceptance scenarios

| Scenario | Executed evidence | Result |
|---|---|---|
| 1 Legacy v0.1 restore | IndexedDB schema1 → schema2; raw `legacy-v1` archive; preserved geometry/13 nets; Test | PASS |
| 2 MZM 4-Lane engine | Actual palette placement and port wiring; 100G/VALID | PASS |
| 3 Alternate MRM / EAM designs | UI Technology selection preserves nets; immutable Snapshots for alternatives | PASS |
| 4 EIC selection | Correct Low-swing / Bias-capable Packet selected in Inspector | PASS |
| 5 Wrong Driver | Compatible capability, Convention, Configuration failures surfaced | PASS |
| 6 Driver position | Actual mouse movement RF degradation/undo; thermal distance unit test | PASS |
| 7 Temperature / Wavelength | UI Ambient/Wavelength change alters MRM detuning and ER | PASS |
| 8 Heater tuning | Cold resonance + Auto Lock restores Stable; positive power; limit tests | PASS |
| 9 EAM levels | UI Bias/Swing changes both levels and ER; unit identities | PASS |
| 10 Same Brief alternatives | Compact MRM and EAM both VALID; UI comparison table | PASS |
| 11 Stale result | Edits show STALE; Test required; no stale animation/result reuse | PASS |
| 12 Persistence / exports / history | Save/reload, named load, backup, snapshots, Undo/Redo, JSON/model envelope, PNG download | PASS |

Additional: disconnected optical path; cross-kind invalid connection; occupied RF Driver Channel UI reject and solver corrupt-netlist duplicate detection; overlap/boundary; nonphysical numeric rejection; same-input deterministic outputs; splitter conservation; High/Low/Average/ER/OMA consistency; RF attenuation units/monotonicity; MRM linewidth/cavity BW consistency; heater clamp/nonnegative values; heating cannot cure low RF Swing; model/parameter/envelope version validation; snapshot serialization; different environmental/solver comparison flags.

## Representative model evidence

The same manually wired geometry is validated with each matching packet. Compact constraint 6.4 mm² is a **summed planning footprint** constraint, not a package envelope.

- MZM First: VALID 100G; reference summed footprint 7.91 mm²; nominal Driver power 1.00 W. Stable four sampled corners also VALID. Default geometry does not meet Compact area.
- MRM Compact: VALID 100G; footprint 4.98 mm²; nominal Driver power 0.32 W. Fixed tuning fails Stable variation. Cold resonance 1549.6 nm and bounded Auto Lock restore Stable with additional heater power; all sampled corners meet constraints.
- EAM Compact: VALID 100G; footprint 5.33 mm²; nominal Driver 0.64 W + Bias load 0.03 W. Stable corners also VALID in the explicitly limited model.

Values above are educational calculated outputs, not vendor specifications or measured data. Device parameters, high/low levels and final screenshots come from the released model, including revised ring linewidth-derived bandwidth. The regression logs contain complete pass labels.

## Issues caught and corrected

Legacy unit test initially rejected schema2 because that was the old unsupported-version example; it now rejects schema99 and asserts schema2. UI comparison test initially selected snapshots from different Briefs; the application correctly refused direct comparison, and the test now selects the same Compact Brief. A comparison-row string syntax error introduced during final UI refinement caused browser startup to fail; corrected before release, and Build now checks every source module syntax before generating HTML. A final interaction check also corrected selection-only actions unnecessarily marking results STALE: history/dirty state now begin at actual movement; invalid connections preserve redo state. UI verifies selection keeps a fresh Test available for Snapshot. Final suites rerun after fixes and model consistency updates.

## NOT RUN / known limits

Official Chrome and Edge Desktop binaries, manual human playtesting, Windows/Mac render verification, storage quota/denial fault injection, cross-profile/file relocation persistence and native palette drag-and-drop separately are **NOT RUN**. Canvas mouse dragging and click placement are executed. Headless environment lacks Korean fonts: screenshots contain missing-glyph boxes, while Korean DOM text is intact. User's OS font rendering requires verification. Do not infer validated game enjoyment from automated PASS.

Models are Educational Assumptions, not Measured or Validated. Thermal kernel and resonance approximation, automatic Manhattan/straight routing, EAM absorption surrogate, minimum-stage BW ratio and spectral-equivalent optical levels have documented limits. No Eye/BER, PDK DRC/LVS, Full-wave, GDS or measured thermal model. Four Stable corners do not prove continuous environmental stability. EIC/PIC share a planning Canvas, not a monolithic foundry die. Source uses JavaScript ES modules, not TypeScript. Max six Snapshots; Undo history is session-only.

GitHub CI is configured for 39-unit test/build and both browser suites. Remote CI conclusions are reported on the PR separately; local totals do not include remote executions. Main merge, tag and formal Release are not authorized.
