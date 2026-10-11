# Physics models and assumptions — v0.2.0

## Evidence policy

All game coefficients, footprints, packet capabilities and operating limits are **Assumed**, **Educational**, model version **0.2.0**. Outputs are **Calculated from Assumed inputs**, never Measured or Validated. Primary Sources establish mechanisms and trade-offs, not the numerical fidelity of this game. Reference means a publicly documented concept/observation; Validated would require independent measurements over the declared domain, which this release does not have. No company data, confidential PDK or uploaded internal reports are incorporated.

## Checked Primary Sources

1. Hiraki et al., *Heterogeneously integrated III–V/Si MOS capacitor Mach–Zehnder modulator*, Nature Photonics (2017), https://www.nature.com/articles/nphoton.2017.120 . Public abstract confirms voltage–length, insertion-loss and bandwidth trade-offs. This game uses a generic interferometric transfer function; it does not reproduce the published heterogeneous device or its parameters.
2. Yuan et al., *A 5 × 200 Gbps microring modulator silicon chip empowered by two-segment Z-shape junctions*, Nature Communications (2024), https://www.nature.com/articles/s41467-024-45301-3 . Open experimental article describes voltage-shifted through-port spectra and heater-induced resonance shift. Its high-rate/PAM4 implementation is outside this game's scope. No reported efficiencies are relabeled as game parameters.
3. Padmaraju and Bergman, *Resolving the thermal challenges for silicon microring resonator devices*, https://www.ee.columbia.edu/~kishore/publications/NP_2013.pdf . Author-hosted publication explains thermal sensitivity and tuning approaches; it supports the need for environmental and tuning-limit checks rather than a binary heater bonus.
4. Abadía et al., *Low-Power consumption Franz-Keldysh effect plasmonic modulator*, original Optics Express (2014), author archive https://arxiv.org/abs/2207.10084 (2022 deposit). Abstract demonstrates field-dependent Ge absorption modulation. The game's 1550-nm GeSi educational surrogate is **not** that plasmonic device, a measured fit, or an actual Franz–Keldysh material solver.

Sources inspected 2026-10-11. No verbatim passages or commercial/vendor data are included.

## Reference scenario and optical definitions

4 lanes × 25 Gb/s NRZ = 25 GBd/lane = 100 Gb/s gross. FEC/protocol overhead and Net Throughput are Unsupported. Each independent path must traverse a CW input, one 1×4 Splitter, one Modulator and an Edge Coupler. Disconnects produce null levels, not normal output.

Laser: 13 dBm default (0–20 dBm editable). Ideal 1/N split: 10 log10(N) dB, N=4. Excess loss: 0.6 dB default, separate from division. Manhattan optical route length /100 = mm; propagation 0.12 dB/mm and 0.04 dB per nondegenerate orthogonal turn. Edge coupling: 1.5 dB default. These are assumptions. Turns have no physical bend radius; crossings do not create connectivity or crossing loss; obstruction avoidance is Unsupported.

At each lane, Pbase[mW] = 10^(Pinput-minus-nonmodulator-path-loss[dBm]/10). Modulator transmission factors T1 and T0 determine levels. High=max(T1,T0)×Pbase; Low=min(T1,T0)×Pbase. Average=(High+Low)/2 assumes equiprobable NRZ bits. ER=10log10(High/Low) in dB. OMA=High−Low in **mW**, not dBm or a dB margin. High/Low labels rank power levels; bit polarity is not inferred. Floor-limited log calculation prevents numerical infinity. RF-filtered spectral-equivalent swing gives educational level estimates, not time-domain settled levels or a calibrated eye.

v0.1 reported an IL-only optical budget without NRZ High/Low distinction. v0.2 deliberately defines the customer target as Average≥−4 dBm and ER≥4 dB; the old 0-dBm IL-only check is not mislabeled as the new average threshold. Existing representative v0.1 layout still passes after migration.

## Technology-specific models

### MZM — interferometric phase

Length L ∈ [0.8,2.5] mm, VπL=3.75 V·mm (0.375 V·cm), Vπ=3.75/L V. Insertion loss=1.5+L dB. EO bandwidth=min(40,37.5/L) GHz. Required delivered effective loaded differential swing at pads is Vπ [Vppd] under this conservative game rule. Bias b ∈ [0,1] is optical phase in π fractions; nominal b=0.5. Separate DC common-mode bias voltage is checked against packet capability and is not confused with optical phase.

T±=10^(−IL/10)×[1+cos(πb±πVeff/(2Vπ))]/2.

The cosine law follows coherent addition of two MZI arms. L simultaneously changes geometry, Vπ, insertion loss and bandwidth. No distributed electrode, carrier-dispersion nonlinearity, imbalance or full electro-optical bandwidth calibration. Platform label Si; optical model range 1530–1570 nm.

### MRM — resonant through port

Single-resonance Lorentzian notch approximation, not a complete FSR/coupled-mode ring solver:

T(δ)=10^(−1 dB/10)×[1−0.95/(1+(δ/0.09 nm)²)].

HWHM Γ=0.09 nm, FWHM=0.18 nm. Cavity bandwidth=(c/λ²)×FWHM at λ=1550 nm ≈22.46 GHz. EO stage bandwidth=min(28-GHz junction assumption,22.46-GHz cavity limit). This explicitly avoids an arbitrary bandwidth larger than the chosen linewidth-derived cavity limit.

Resonance λr=λcold+0.08 nm/V×(junctionBias+1 V)+0.08 nm/K×(Tlocal−25 °C)+0.01 nm/mW×Pheater. NRZ voltage modulation shifts detuning by ±0.08 nm/V×Veff/2. T± use those two **same through-port** operating points. λcold default1549.925 nm, editable1548–1551 nm. Bias −2…0 V. Platform Si; optical model range1548–1552 nm.

Manual Heater:0–80 mW. Auto Lock computes required power for mean detuning δtarget=+0.04 nm and clamps to [0,80] mW. Negative required heat would require cooling and is a tuning-limit failure. Power above80 mW is also a failure; enabling Auto Lock alone never passes. Manual Tune freezes the current point and turns Auto Lock off. Heater cannot improve RF stage bandwidth or insufficient delivered swing. Multi-ring thermal coupling uses deterministic iteration (≤80 iterations, Δheater<1e−8 mW); nonconvergence is BLOCKED.

No drop-port model, optical self-heating, nonlinear bistability, carrier absorption change, fabrication statistics or resonance peaking. Fixed detuning can lose ER at thermal/wavelength corners even when off-resonance average power is high.

### EAM — voltage-dependent absorption

Two voltage states V±=Bias±Veff/2. Bias −3…−0.1 V; GeSi platform; wavelength range1540–1560 nm. Assumed effective attenuation A(V,λ)=1+1.8|V|^1.5×[1+0.02(λ−1550)] dB. T±=10^(−A/10). This is a phenomenological Beer–Lambert-form surrogate; coefficients and operating wavelength are assumptions, not a fit to the source paper. Bias/Swing change both levels and their ER. More reverse bias improves extinction at the cost of absorption; voltage endpoints must remain within the bias-capable packet's domain.

EO stage bandwidth30 GHz, required delivered swing1.2 Vpp. No actual bandstructure, Franz–Keldysh/QCSE spectral solver, temperature-dependent band edge, chirp, saturation or device leakage measurement. Bias power uses a separate assumed5 mA load × |Bias|.

## EIC / RF integration

All packets are Generic/Educational, one channel each. Logical differential RF port represents P/N together; single-ended ports represent S. Loaded swing conventions are explicit (Vppd or Vpp). Packet geometry is package planning footprint, not monolithic PIC geometry. Compatibility checks device capability, configured25-GBd NRZ, supported rate, convention, configuration, bias/endpoints, output impedance, channel availability and platform. Port occupancy and solver duplicate-channel detection prevent fan-out reuse.

| Packet | Loaded swing default/range | Configuration | Bias V | Impedance | BW | RF α @12.5GHz | Nominal power |
|---|---|---|---|---|---|---|---|
| MZM Differential |3.3 /0.5–4 Vppd|Differential|−2…2|100Ω differential|30GHz|0.8dB/mm|0.25W|
| MRM Low-swing |1.1 /0.3–1.4 Vpp|Single-ended|−2…0|50Ω|35GHz|0.6dB/mm|0.08W|
| EAM Bias-capable |2 /0.5–2.5 Vpp|Single-ended with bias|−3…−0.1|50Ω|32GHz|0.5dB/mm|0.16W|

Supported maximum32 GBd, NRZ only; configured rate must be25 GBd for this mission. A driver having the right name is insufficient if other capabilities conflict. Packet version0.2.0, RF pad map/package geometry/power model/thermal model/source/assumptions are recorded in `src/models.js`.

RF route = rotated endpoint Euclidean distance /100 mm, valid0–10 mm. Loss=α×length at12.5-GHz NRZ Nyquist. Delivered pad swing=Vout×10^(−Loss/20). Route BW=50/(1+length/3) GHz. Driver, route and modulator are separate one-pole stages: Htotal(fN)=product[1/sqrt(1+(fN/BWstage)²)]. Veff=Delivered×Htotal is used for the approximate optical response.

BW ratio=min(stageBW)/17.5 GHz; this is a **minimum stage bandwidth check**, not the actual cascade3-dB bandwidth, Eye Margin or BER. Delivered-swing margin uses volts separately. Voltage and bandwidth margins are not added. Reflection, transmission-line impedance discontinuities and full package parasitics are Unsupported; impedance is a compatibility requirement only.

## Thermal and power boundary

Tlocal=Ambient+sum(6 K/W×DriverW×Kdistance)+sum(other Heater:40 K/W×HeaterW×Kdistance). Kdistance=1/[1+(distanceMm/0.5)²], using planning anchor coordinates. Self Heater is handled by resonance efficiency rather than double-counted in local temperature. This is an Educational Approximation, not a thermal resistance network/FEM or measured crosstalk. Ambient range20–60 °C; out-of-range sampled corners are Unsupported, not VALID. EAM bias load heat, laser heat and MZM thermal phase drift are not modeled.

DriverW=packet nominalW×(configuredSwing/nominalSwing)². HeaterW uses actual clamped tuning power. EAM BiasW=0.005 A×|Bias|. Total electrical power is Driver+Heater+Bias. **External Laser electrical power excluded**. pJ/bit=nominal electricalW×1000/nominal functional grossGb/s; undefined for zero nominal functional throughput. Stable HUD Gross is the minimum functional throughput at nominal and four specified corners; comparison explicitly distinguishes nominal power/energy from tested corner power and worst sampled Gross.

## Requirements / score

First:total reference footprint≤65 mm²; Compact:sum(PIC+EIC planning component footprints)≤6.4 mm²; Stable:same area cap as First and all temperature±3°C / wavelength±0.03nm corners plus nominal must satisfy. Footprint is summed component area, not package envelope or fabrication die utilization. Compact permits independent MRM and EAM solutions; Stable permits MZM, EAM, and a properly cold-designed+tuned MRM. Four corners are sampled evidence, not a continuum stability guarantee.

Every lane must be connected, compatible, within RF range, meet delivered swing and stage BW, Average≥−4 dBm, ER≥4 dB and tuning range. Geometry/connectivity/capability violations BLOCKED; performance or area failures WARNING; all constraints VALID. VALID is not foundry/manufacturing sign-off. Score=max(0,round(100−20×nominalW−2×footprintMm²)) only for VALID; the multi-metric comparison takes priority over this gameplay rubric.
