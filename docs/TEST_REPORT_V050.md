# v0.5.0 executed test report

Date:2026-10-13 KST. Baseline main8114638 / PR5, exact tracked tree verified before incremental edits.

## Results

- `npm test`:139 PASS /0 FAIL (113 preserved baseline tests +26 new package tests).
- `npm run build`:all source modules pass syntax checks; one self-contained standalone HTML built.
- Eight existing Chromium browser suites: PASS. They were executed against the rebuilt0.5 HTML under the old test fixture filename; historical committed0.4.1 artifact is preserved in the final source tree.
- New package-browser suite: PASS, desktop and Touch scenarios. file:/// Offline mode,0 HTTP requests,0 page errors.

Logs: v050-unit.log, v050-browser.log, v050-codesign-browser.log, v050-levels-browser.log, v050-routing-browser.log, v050-mobile-browser.log, v050-touch-routing-browser.log, v050-scaling-browser.log, v050-solutions-browser.log, v050-package-browser.log.

## Physical relations and model bounds

Zero-power sources return Ambient; doubled source power doubles temperature rise; higher swing/power raises temperature; Cooling conductance lowers supported temperatures; nearby sources produce stronger coupling. Driver bandwidth / loaded swing and MZM phase/loss recompute PAM4 response under temperature. Over-temperature and optical failure exclude failing lanes from functional throughput. Self-heating remains finite; electrical packet overhead and connected channel power are counted once, fixed heater power remains separate. Level9 thermal inactive, Level10–11 explicit activation.

FAU loss replaces legacy Edge Coupler loss, and linear optical power ratios match the dB penalty. Boundary/customer caps, clearance, zone overlap/platform placement, actual routing obstacles and FAU duplicate/missing channel mapping are detected. Zero Variation equals Nominal. Common offsets are shared by channels, residuals differ, rotation depends on channel position. Every MC sample runs the actual solver and uses the same1600G validity criterion. Seeded outputs reproduce exactly. Cancelled work is not a complete record. Design/Seed changes invalidate records and score; snapshot names/history do not.

## Actual player scenarios

Existing16×100G Engine survives package entry with graph/positions and explicit original backup. Level9–11 two alternative solutions use the actual current Solver; no layout-similarity scoring. Solution viewer includes zones/cooling/FAU, Apply runs Test, Undo/Restore retain the original design. Numeric Zone/Cooling changes immediately make score and advancement STALE. Hotspot selection chooses the responsible EIC. Overlay switching preserves exact Design state. Removing Cooling changes temperature and functional throughput; Undo repairs it. Eight stress corners and repeated seeded MC complete Level11; changing Seed disables direct comparison.512-sample progress stays responsive and cancellation retains the last complete record as STALE. Deleting an Output removes its FAU mapping; deleting a component also clears its fixed heater assignment. Incomplete designs save safely and Undo restores the engine. Package state/records survive IndexedDB Save/Resume and JSON Paste. PNG contains Package / FAU / heatmap elements.

Mobile tests dispatch actual Chromium Touch/CDP events: tapping solutions/controls, Numeric Cooling edit, one-finger FAU drag, Cooling resize handle, Undo, two-finger Package pinch, independent sheets, portrait390×844 and landscape844×390. Device emulation is actual browser interaction, not testing on physical Android hardware. Native OS keyboard and physical-device rendering were not tested here.

## Solution nominal evidence

At25°C Ambient/1310nm, both8×200G packages pass1600G. Compact hotspot≈44.30°C; Distributed≈41.38°C. Both use5.25W modeled EIC power, Expanded-mode FAU and Vision-assisted assembly. Both seeded N64 examples pass all eight defined Stress Corners and show100% simulated sample pass fraction; Wilson uncertainty is displayed and this is not measured production yield. See data/solution-designs-v0.5.0.json and MODELS_V050.md for exact conditions and assumption boundaries.

## Limits

Educational thermal/coupling/device surrogates; no FEM/BER/lifetime/production GDS/DRC-LVS. Same-domain crossing fabrication/loss is explicitly unsupported. Known limits and reproduction: HANDOFF_v0.5.0.md. GitHub CI status is reported separately for the actual published commit; local success is not represented as remote CI success.
