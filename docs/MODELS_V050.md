# v0.5.0 Package model and evidence boundary

Solver 0.5.0 / Package Model 1.1.0 / Route Model 0.3.0. All new numeric coefficients are **Educational Assumptions**. The model is a deterministic planning surrogate; it is not FEM, BER, a foundry rule deck, production yield or lifetime prediction.

## Primary sources consulted

1. F. Wang et al., *Detachable interface toward a low-loss reflow-compatible fiber coupling for co-packaged optics (CPO)*, Optics Express 31, 1318–1329 (2023). DOI: https://doi.org/10.1364/OE.480418. Attached source `03-Detachable_interface_toward_a_low-loss_reflow-comp.pdf`: Gaussian coupling / offset / angular sensitivity discussion, expanded-beam interface, channel array demonstrations. It supports the physical relationships and detachable I/O concept. Its particular measured losses and tolerances are **not** the game's compact/expanded-mode profiles; this game does not claim to reproduce that interface.
2. OIF, *Implementation Agreement for a 3.2Tb/s Co-Packaged (CPO) Module*, OIF-Co-Packaging-3.2T-Module-01.0: https://www.oiforum.com/wp-content/uploads/OIF-Co-Packaging-3.2T-Module-01.0.pdf. Attached source `07-OIF-Co-Packaging-3.2T-Module-01.0.pdf`: mechanical module/optical interface and thermal considerations; heat spreader interfacing with system cooling. This supports separating the package, optical interface and cooling boundary. The game's 18×14 mm brief, 65 °C hotspot ceiling and thermal coefficients are not OIF limits.
3. Attached Boucaud glass interposer paper, `02-2024-Boucaud-APL-Photonic-Glass-Interposer-ann.pdf`, was inspected for glass-platform context. It is not a numeric calibration for this package kernel.

No market report or AI-authored technical summary is treated as a source of validated device coefficients. The attached sources stay outside the public repository.

## Geometry and platform

100 canvas units = 1 mm; 1 canvas unit = 10 µm. Components have explicit `platform`: EIC / PIC / External. EIC rectangles are separate dies placed in an EIC zone; they are not manufactured inside the PIC. Zone containment, die overlap, pairwise assembly clearance, keep-out intersection, FAU footprint, engine route geometry and explicit Output-to-FAU centerlines are tested. Cooling is a top-side planning overlay and may cover EIC/PIC zones, but must not occupy the FAU assembly footprint. This is a 2D planning layer, not fabrication CAD.

Three area boundaries:
- Component Area: sum of rotated component rectangle areas on package; excludes the external optical input terminal.
- Engine Placement Envelope: enclosing rectangle of those on-package components; includes empty space, excludes FAU/Cooling/Zone overlays.
- Package Area: Width × Height; package outline is independent of both above.

Customer scenario limits: width ≤18 mm, height ≤14 mm; nominal editable range 6–20 mm / 6–16 mm. Enlarging past the brief is blocked. Default assembly clearance ≥0.1 mm. Optical/RF same-domain route crossings remain independently connected planning centerlines with a visible Unsupported warning; crossing devices and their physical insertion loss are not modeled.

## Electrical power and thermal kernel

EIC power, once per packet:
`P = shared overhead + connected RF channel count × channelW × (swing/nominal swing)^2`.
Existing 100G/200G channel and overhead assumptions are retained. Every packet's shared overhead is counted once; each connected channel is counted once. Fixed MZM bias-tuning heater setpoints are 0–80 mW per MZM. Total modeled electrical power = EIC Driver + Heater + Bias (Bias is 0 for the high-rate MZM profiles). External Laser electrical power, RX, DSP/FEC and cooling electrical power are excluded. Optical Laser input is an optical power boundary, not a heat source.

For receiver i and source j:
`T_i [°C] = T_ambient [°C] + Σ_j R_ij [K/W] P_j [W]`.

- EIC self resistance: 22 K/W.
- Fixed MZM Heater self resistance: 70 K/W.
- Off-diagonal: `R_ij = 6 / [1 + (distance_ij / 2 mm)^2] K/W`.
- Source position = rectangle center. Non-source receiver uses 22 K/W for its cooling factor.
- Cooling region adds nonnegative conductance `G [W/K]` to receivers/sources whose centers it covers.
- `F_i = 1 / (1 + R_ii ΣG_i)`; `R'_ij = sqrt(F_i F_j) R_ij`.

Heatmap field points interpolate the source self-heating peak with an additional `(selfR−6) exp[−(distance/0.4 mm)^2]` response term; this display interpolation is an Educational Assumption, not a mesh solution. Exact component temperatures use the discrete self/off-diagonal matrix above.

All resistances are finite and nonnegative; off-diagonal terms are symmetric. Zero source power returns Ambient. This kernel is a phenomenological linear temperature-response matrix, not a discretized heat equation. It is not a validated energy-conserving FEM network. Overlapping cooling conductances add; no arbitrary constant temperature subtraction is used. Cooling placement, area and conductance matter. Modeled Cooling area and relative implementation burden are shown separately; this is not a monetary cost estimate.

No auto heater feedback is supported in the new MZM package model. Heater electrical power is a fixed input and the kernel needs one evaluation; convergence is recorded as a single direct calculation. Legacy low-rate MRM auto-lock / bounded iteration is unchanged and not reused here.

Level9 thermal is explicitly inactive and high-rate optical response uses 25 °C nominal. Level10–11 activate this package thermal model. Ambient is 20–60 °C; local response is supported over 20–120 °C. Outside that range a Lane is Unsupported and cannot pass. Maximum-temperature requirement is 65 °C for this educational customer scenario.

## High-rate temperature-dependent response

Fresh assumed coefficients, unrelated to the Level3 MRM thermal resonance coefficients:
- EIC first-order bandwidth pole = nominal driverBW / `[1 + 0.0015 max(T_EIC−25,0)]`.
- RF response recomputes actual three-pole frequency attenuation, loaded swing, residual settling and spectrum using that pole.
- Additional loaded swing gain = `max(0.5, 1−0.002 max(T_EIC−25,0))`.
- MZM bias phase shift = `0.004(T_MZM−25) − 0.002 Heater_mW` rad.
- MZM excess insertion loss = `0.008 max(T_MZM−25,0)` dB.

All four PAM4 optical powers are recalculated. Average / OMA / ER / adjacent level spacing and functional-lane gross throughput are derived again; over-limit EIC/MZM temperatures also invalidate their connected lanes. EIC placement influences temperatures and RF route length; distribution and nominal optical margin influence robustness. Optical power is linear mW when averaged, and dB penalties become multiplicative linear factors.

## FAU optical boundary and error surrogate

Each Output represents a PIC optical exit whose existing `output.params.loss` applies only outside package levels. In Level9–11, **replace** that loss with one FAU interface loss plus one explicit Output-to-FAU route loss. Existing Modulator-to-Output routing loss is retained exactly once. FAU trace includes nominal coupling, sampled alignment and explicit I/O route; these are not added to the legacy coupler loss a second time.

A FAU has 8 / 16 channels, 127–500 µm pitch, right-edge vertical / bottom-edge horizontal orientation, per-channel Output mapping and editable orthogonal route anchors. Mapping is one Output to one Channel; missing/duplicate mappings block throughput. FAU must be contained by an I/O zone near the corresponding package edge. Mapping / geometry changes require Fresh Test.

Because measured interface mode fields are unavailable, both profiles are labeled **Educational Coupling Surrogate**:

| Interface profile | Nominal loss | 1 dB lateral radius t | Angular scale a | Footprint depth | Relative interface burden |
| --- | ---: | ---: | ---: | ---: | ---: |
| Compact edge | 1.2 dB | 2 µm | 2° | 0.5 mm | 1.0 |
| Expanded-mode | 1.8 dB | 8 µm | 0.5° | 1.0 mm | 1.6 |

`alignment loss [dB] = (Δx² + Δy²)/t² + (rotation/a)²`.
A small-angle rigid rotation of the common FAU about its center also produces a channel-position-dependent lateral displacement using the exact sin/cos rotation transform. This is not an evanescent-coupling / gap / axial-mode simulation. Broader lateral tolerance comes with higher nominal loss, footprint and assumed interface burden, and tighter angular scale.

## Assembly / stress sampling

All distributions are zero-mean Normal, with σ values below. Common X/Y / rotation and common thermal offset are drawn once per sample and reused across the same FAU channels; each channel additionally receives separate residual X/Y draws. Rotation induces correlated lateral offsets. Thermal variation changes Ambient and causes the actual thermal and optical solver to rerun. Electronic source power is held at the same design input.

| Strategy | Common X/Y σ (µm) | Residual X/Y σ (µm) | Rotation σ (°) | Ambient σ (°C) | Relative assembly burden |
| --- | ---: | ---: | ---: | ---: | ---: |
| Passive registration | 2.0 | 0.6 | 0.05 | 2.0 | 1.0 |
| Vision-assisted | 0.8 | 0.3 | 0.02 | 1.0 | 1.8 |
| Active optical alignment | 0.25 | 0.15 | 0.008 | 0.5 | 3.0 |
| Zero variation diagnostic | 0 | 0 | 0 | 0 | 0 |

These profile names and distributions are educational scenarios, not equipment capability or manufacturing promises. Sampling uses a deterministic Mulberry32 generator and Box–Muller Normal draws. Seed 0–2³²−1; sample count 16–512; Level11 acceptance requires ≥64 samples and simulated pass fraction ≥90%. Every sample must have `status VALID` and functional gross 1600 Gb/s under the same Nominal screens. Failures are grouped by Geometry/Mapping, Thermal, Optical Margin/Coupling and RF/PAM4; categories may overlap. Worst sample is the minimum gross, then minimum optical margin. Common and residual sample values are inspectable.

95% Wilson binomial intervals show finite-sample uncertainty. They quantify Monte Carlo sampling uncertainty under these assumed distributions, not uncertainty in model calibration. Acceptance is a gameplay target on the point estimate; it does not assert a 90% lower confidence bound.

Eight fixed stress corners combine ±2σ common X/Y, signed ±2σ rotation, alternating ±2σ residuals and ±2σ Ambient. Passing these selected stress scenarios is not lifetime / accelerated-test conversion and not proof that all possible corners pass.

Direct Monte Carlo comparison requires same Brief, actual Package Width/Height/Clearance, Ambient/Wavelength, Laser inputs, assembly strategy, seed and sample count. Coupling profile and component/cooling layouts are design choices and may differ. Freshness uses the actual design and conditions fingerprint plus Solver version; changing those inputs invalidates completion/score. Name, saved snapshots and historical completion lists do not change the underlying design fingerprint. Cancelled results are partial and never count toward completion. UI yields every four samples and displays progress.

## Score

Level1–8 rubric unchanged. Level9–11: Functional Performance 40, Package Geometry 30, Thermal Requirement 15, Assembly Robustness 15.

- Functional = 40 × clamp(functional gross /1600,0,1).
- Geometry = max(0,30−3×package geometry/mapping error count).
- Thermal = 15 at ≤65 °C; above this, lose 1 point per °C, to 0. Level9: 15 with explicit inactive label.
- Assembly = 15 × clamp(fresh pass fraction /0.9,0,1). Before Level11:15 with explicit not-assessed label. Stale / missing complete MC =0.
- Overall rounded score is capped at99 if the full Level goal is incomplete, including failed/untested Stress Corners or too few MC samples.

The score is a gameplay rubric, not optimizer / calibration. No position similarity to the reference is used. HUD and next-level completion require Fresh Test. Layout alternatives that meet the requirements receive the same score; compare their engineering metrics and relative burdens separately.
