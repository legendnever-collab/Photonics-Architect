# Geometry models and assumptions — v0.3.0

Device / Packet numerical model **0.2.1** is retained. Solver / Geometry **0.3.0** adds shared explicit centerlines and Planning Rule Check. All new numerical planning choices are **Assumed / Educational**. Derived results are **Calculated**; none are Measured / Validated. Existing physics and its public Primary Sources are documented in [MODELS_V02.md](MODELS_V02.md).

## Before / After

| Quantity | v0.2 | v0.3 |
|---|---|---|
| Laser / MRM / EAM reference |1310 nm O-band|Unchanged|
| MZM / MRM / EAM equations, RF α/BW and thermal/power coefficients |Model 0.2.1|Numerically unchanged|
| Optical length |Legacy Manhattan|Same legacy default, editable shared orthogonal centerline|
| RF length |Straight endpoint Euclidean|Same straight default, editable shared polyline|
| Component movement |Changes endpoints / RF / optical / thermal|Same, manual anchors retained|
| New geometry violations |No explicit route editor|Planning errors / Unsupported warnings, no invented physical penalty|

## Equation / range / units

Canvas scale 100 units/mm. L = Σ sqrt((Δx)²+(Δy)²)/100 in mm, identical SVG polyline and Solver. Optical uses sharp planning elbows: no rounded arcs. Nondegenerate direction-changing turns N yield propagation loss **0.12 L dB**, bend planning surcharge **0.04 N dB**. These coefficients are inherited Assumptions, not new measured bend data. Auto legacy simplification preserves old lengths and bends. Straight RF and edited RF use the same length equation.

RF attenuation = packet α × L [dB] at 12.5 GHz. Delivered pad swing = configured swing ×10^(−attenuation/20) [Vpp or Vppd]. Route bandwidth =50/(1+L/3) [GHz]. Stage response and independent 17.5-GHz minimum-stage check remain unchanged. RF model valid range 0–10 mm. RF bends introduce no additional reflection/impedance model; polyline centerline length is an explicit educational approximation. No Eye / BER claim.

Optical planning routes must be finite, within 10×6.5-mm Floorplan and orthogonal. No physical bend radius, PDK minimum spacing or cross-section assumptions are implied. Rectangles have **zero extra clearance**: touching a boundary is allowed, crossing its open interior is forbidden. Component footprints use rotation-aware bounding boxes. Keep-out K1 is a fixed **gameplay** rectangle: x=6.5 mm, y=1.9 mm, width=0.8 mm, height=2.6 mm; it applies to both planning domains at Level 5. It is not a foundry or package manufacturing rule.

Overlaps / Floorplan breaches / Keep-out invasions / unsupported geometry / endpoint domain mismatch are blocking errors. Unrelated-component traversal blocks manual routes and Levels 4–5. Legacy Auto Route traversal in Levels 1–3 remains a nonblocking warning to preserve their success criteria. Same-domain proper crossings and collinear overlap produce **Unsupported geometry warnings** with no fabricated crossing loss, short or connectivity. Optical×RF crossings are ignored as independent domains. Automatic obstacle routing is not provided; Reroute / Simplify only simplifies the current centerline.

Thermal position model remains 0.2.1. Driver relocation can shorten RF while heating nearby MRM and shifting detuning or increasing heater consumption. Route-only edits do not move heat sources. Before / After presents these quantities separately. Power is Driver + Heater + EAM Bias; External Laser electrical power excluded. No net throughput is computed.

Level 4 relative target = max(0.35 mm, 0.75×Baseline targeted RF length). Same environment and Solver required, 100G and error-free geometry retained, attenuation reduced. Baseline already≤0.35 mm is explicitly recognized after Fresh Test. **25% and 0.35 mm are play objectives**, verified with representative designs, not physical pass thresholds. Repeated Test of the detoured RF Practice cannot complete. Level 5 permits longer paths if that avoids Keep-out and maintains optical requirements; all MZM/MRM/EAM representative solutions pass.

## Public Primary Sources inspected

- GDSFactory official routing documentation: https://gdsfactory.github.io/gdsfactory/api_routing/ . Its distinction between a Manhattan backbone and physical bend/straight placement motivates explicitly labeling this game's geometry as a planning centerline, not a fabricated waveguide. No documentation parameter is copied as a game coefficient.
- SiEPIC-Tools official source: https://github.com/SiEPIC/SiEPIC-Tools/blob/main/klayout_dot_config/python/SiEPIC/scripts.py . Physical waveguide construction checks radius/segment conditions; this game does not have those PDK-specific primitives and does not claim their manufacturing checks.

Checked 2026-10-11 UTC. New gameplay dimensions and reduction target are separately declared assumptions. No confidential PDK, internal measurement or user-uploaded company paper is incorporated.
