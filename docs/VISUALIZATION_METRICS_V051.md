# Engineering visualization metric contract

`engineering-metrics.js` is read-only and consumes a Solver Result paired with its matching Design. `engineering-ui.js` renders all diagrams/numbers from that same pair. There is no external chart library/CDN and no added optical/thermal coefficient.

## Result state

Before first Test: Live Preview from current Design. After Test: Fresh Test Result. After edits: default STALE — previous Test Result, paired with the frozen Test Design and explicitly labeled with its Level. The player can switch to current Design Live Preview without running a test. Previous numbers are never rendered against the current changed optical graph. A Resume starts without a fresh Result regardless of stored completedLevels. View selections do not call `changed()`.

## Optical graph and Waterfall

Trace the selected Output backward along its actual Optical input nets to one Laser. Cycles, missing/ambiguous input, multiple modulation stages and coherent multi-laser combining are marked Unsupported. Each traced Route contributes its reported propagation and bend loss. For each actual splitter stage, selected-branch ideal division10log10(N) and configured excess are separate. Physical crossing loss is Unsupported and no arbitrary penalty is introduced.

Modulator stage uses the **average-equivalent attenuation of the actual Solver response**, not one fixed IL approximation: Laser Input minus all traced passive losses minus final Lane Average. Thus drive/bias/temperature-dependent NRZ or PAM4 levels are retained. The associated graph node identifies where this response occurs; alongside the Waterfall, the actual two NRZ High/Low powers or four PAM4 optical powers are drawn. Unit tests reconcile the whole Waterfall with the final Solver `lane.power` to numerical tolerance for every reference Lane, a two-stage splitter cascade and sampled thermal/FAU penalties. This is a result projection, not a separate physics solver.

Legacy Output includes its one configured Edge Coupler loss. Package levels replace that loss with reported FAU nominal + alignment + I/O route propagation/bends exactly once. Existing Modulator-to-Output routing is retained. The Waterfall never sums the legacy coupler and FAU a second time.

Units: Power dBm and linear mW; passive/response attenuation dB; OMA is High−Low in mW (PAM4 outer levels); ER in dB. Average is equiprobable NRZ High/Low mean or four-level PAM4 mean. Output Average Margin = reported Lane Average dBm − that Level's BRIEFS.avgMin dBm. It is a **transmitter Output margin**, not a Receiver / full communication Link budget or BER prediction. In Stable Level, Lane graphs are Nominal response; displayed functional Gross may be the minimum of tested environmental corners, which is explicitly noted.

Tap a Waterfall step / loss row / Lane bar to select the actual Component/Route/FAU channel. Hit regions cover each SVG row, not just the colored bar. Worst Lane means minimum finite reported Average Output. No estimated gain or invented loss fills missing paths.

## Power

Solver returns explicit `powerComponents` calculated from its existing power variables: per EIC Driver, operating Heater and Bias contributions, with actual packet channel counts/shared overhead in high-rate models. Existing Physics outputs and coefficients are unchanged; this is result metadata. Category Stacked Bar and component bars reconcile to `powerW`. No proportional allocation fabricates per-Lane packet power or duplicates shared overhead. For Architecture comparison, physical Lane count, EIC packet count and connected Channel count are shown.

`pjPerGrossBit` uses the existing Solver denominator and power boundary. Legacy/Stable energy uses Nominal valid Gross; high-rate energy uses functional valid Gross. Zero denominator yields null / 계산 불가, not NaN/Infinity. External Laser electrical power, cooling electrical power, RX/DSP/FEC remain excluded. Unsupported old Driver components left after5→6 are explicitly not counted by the high-rate EIC model; such a partial power result is not described as full actual electrical consumption. Cooling temperature improvement is not asserted to be electrical power saving.

## Thermal

Existing package Heatmap uses the existing educational steady-state kernel. Its display scale is now fixed20–100°C, and the same `thermalColor()` is used for main and Before/After maps. Color clips outside this range; actual numerical temperatures and limit markers do not clip. Result panel shows Ambient, Maximum,65°C package limit, Hotspot, Component bars and reported related failed Lanes. A marker and actual temperature remain visible on over-limit components.

Power → Temperature → Functional effect uses only existing power metadata, temperature fields and actual Lane.valid. No new temperature-dependent response is created. Legacy local Modulator temperatures can be shown with an explicit lack of an EIC junction limit; high-rate nominal Levels6–8 Thermal remains Unsupported, and Level9 Thermal remains explicitly inactive. Level10–11 still use the package thermal model introduced in v0.5.

Before/After maps reuse their respective Designs / existing Result sources and cooling conditions, with the same fixed scale. ΔTemperature is shown only for comparable conditions. A field Heatmap is an educational source-peak interpolation and not FEM; the exact component temperatures come from the existing solver matrix.

## Comparison conditions

Same Brief / Environment / Laser optical inputs / Solver and Model version / Customer settings required for numeric deltas. Package comparisons also require same Width/Height/Clearance; Assembly comparisons additionally require strategy/seed/sample count. Layout, cooling conductance and coupling design choices may differ. Different conditions show side-by-side numbers without direct score delta or improvement percentage. Solution Viewer also distinguishes a same-condition Preview from a confirmed Fresh Test score difference.
