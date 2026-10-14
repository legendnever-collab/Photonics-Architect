# v0.7 transparent score / mission gate

Read-only assessment uses **the exact current Solver Result**. Scores never attenuate a signal or tune solver coefficients. A resume/import/edit/Undo/Redo/Reference Apply always requires a new actual Test for mission completion, even if Live Preview is feasible. Infeasible designs show score0 and still disclose their raw weighted subtotal.

## Normalization

`clamp(x)=max(0,min(1,x))`. Five criteria:

1. Optical: `clamp((worst output average dBm+4)/4dB)`. Output requirement is−4dBm;4dB additional margin fills the criterion. Full end-to-end IL, including distribution, is shown separately.
2. Compactness: `clamp(1−placement_envelope_mm²/840mm²)`. **840 is a fixed educational normalization area**, so expanding Die cannot improve this term for an unchanged layout. Die area and usage are shown independently.
3. Routing: `clamp(sum endpoint Manhattan lower bounds / total exact rounded optical route length)`. A fillet can slightly shorten a Manhattan control polygon; the ratio caps at1. This is path efficiency, not an electromagnetic optimum.
4. Compliance:1 for zero DRC-lite violations,0 otherwise.
5. Robustness: `clamp(min(output margin dB, filter headroom proxy, bend headroom proxy)/3)`. Filter headroom is `(0.9−max|shift_nm|)×10`, floored at0 (10 if inactive). Bend headroom is `(minimum_effective_R / required_R−1)×10` (10 for no bends). These are visible **engineering headroom proxies**, not process yield or lifetime.

Each weighted item rounds to0.1 point; their sum rounds to the nearest integer. All weights sum to100.

| Mission / customer | Optical | Compact | Routing | Compliance | Robustness |
|---|---:|---:|---:|---:|---:|
| Level15 |15|20|15|40|10|
| Level16 |30|10|30|20|10|
| Level17 |30|10|20|20|20|
| Level18 Balanced |30|20|20|15|15|
| Level18 Compactness |20|40|15|15|10|
| Level18 Optical Loss |45|10|20|15|10|

## Feasibility and completion

Feasible requires existing Optical/RF graph status VALID,1600G functional gross, zero DRC-lite errors, total worst average-equivalent source→output IL≤22dB for the default WDM brief (26dB for separately initialized spatial/fast layouts), crossings≤200, and the required WDM filter temperature/drift screens. Level17 additionally requires a WDM engine. WDM Level17/18 cannot disable the thermal check to bypass it.

**Score =0 if feasibility fails**, regardless of compactness or raw weighted score. Thus overlap, spacing, keep-out, boundary, connectivity, direction, tight radius, insufficient channel power or required thermal failures cannot be compensated by a weighted average. Level15–17 complete after Fresh Test and feasibility. Level18 additionally requires score≥60. Progress reaches100% on completed requirements; numerical Design Score remains separate and need not reach100.

## Actual solver reference comparison

Default Level18 /25°C / Balanced weights (nominal pre-optimization):

| Design | Worst total IL dB | Placement envelope mm² | DRC-lite | Score |
|---|---:|---:|---:|---:|
| Compact |20.37|238.28|0|68|
| Low-Loss |19.99|246.17|0|74|
| Balanced |20.37|284.36|0|69|

These are verified example layouts, not claims of global/Pareto optimality. Compact reserves less area; Low-Loss uses gentler bends and somewhat more area; Distributed/Balanced increases routing and thermal separation. The reference viewer re-solves My Design and each selected Reference under the current customer, constraints, environment and filter ambient. If source power or architecture differs, score superiority/Δ is suppressed. A preview is labelled LIVE PREVIEW/STALE until actual Test. Snapshots and saved Versions are compared from geometry, never a trusted cached score. The first original before Reference Apply is protected independently of repeated Apply, Undo/Redo, snapshots and the rolling six Versions.
