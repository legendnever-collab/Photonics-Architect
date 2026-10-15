# Receiver, Complete Link and Monitoring model — v0.8.0

All new numerical coefficients are **Educational / Assumed**, not measured device specifications, a receiver sensitivity specification, or foundry qualification. Public sources support circuit relationships and distinctions; they do not calibrate the game profiles. Existing Tx, Package and Physical PIC solvers remain their original source of truth. Their model documents still apply.

## Reference planes and units

100 canvas units = 1 mm. `routeInfo.length` is mm; fiber length is separately `lengthKm` in km. Power propagation is in linear mW, display in dBm: `10 log10(PmW)`. Each actual independent Tx lane supplies Average, OMA, optical intensity levels, wavelength, baud, format and validity at its **Output Coupler output**. Its original component, coupling and routing losses are already included. Copying a Physical PIC or Package Tx preserves its solver definition; it does not reinterpret its geometry under another loss coefficient.

The downstream graph applies each net and component once:

`P_rx = P_tx × product(10^(−IL_i/10))`; the same factor scales every intensity level and OMA. `IL_fiber = 0.35 dB/km × lengthKm + insertion dB`. Fiber scope is 0–2 km **loss-only**; this does not establish a real reach. Dispersion, PMD, reflectance, coherent interference, receiver noise, BER, Eye, DSP and FEC are unsupported. Local optical nets reuse the planning router: propagation 0.02 dB/mm plus its existing bend surrogate. They do not gain physical crossing/radius qualification. Physical PIC-derived Tx nets retain the v0.7 physical model, only inside their Tx definition.

## Data PD and TIA profiles

| Profile pair | Gross / format | Baud (GBd) | PD / TIA BW (GHz) | PD C (pF) | Responsivity (A/W) | Dark (µA) | PD / TIA power (W) | TIA gain (Ω) |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| ge25 / tia25 | 25G NRZ | 25 | 25 / 22 | 0.12 | 0.8 | 0.02 | 0.002 / 0.10 | 800 |
| ge100 / tia100 | 100G PAM4 | 50 | 45 / 45 | 0.08 | 0.8 | 0.02 | 0.004 / 0.25 | 500 |
| ge200 / tia200 | 200G PAM4 | 100 | 80 / 80 | 0.05 | 0.7 | 0.03 | 0.008 / 0.55 | 350 |

All PDs require 2 V reverse bias, nominal 25°C, and 1300–1320 nm. The PD capacitance is packet metadata; the game does **not** calculate its full TIA noise/stability/RC response. PD–TIA current nets must be ≤2 mm to stay inside the nominal short-interconnect planning scope; longer nets are explicitly blocked as unsupported. Short nets are still not electrical sign-off. TIA BW and gain can be edited within 1–100 GHz and 100–3000 Ω, without implying a calibrated gain–bandwidth/noise trade-off.

`I_avg[mA] = R[A/W] × P_avg[mW] + I_dark[µA]/1000`.
`I_OMA[mA] = R × OMA[mW]`.
`V_avg[V] = I_avg[mA] × gain[Ω]/1000`.
`I_peak[mA] = R × max(levels[mW])`; `V_peak = I_peak × gain/1000`.

| TIA | Minimum Average (dBm) | Maximum Average (dBm) | Minimum OMA (mW) | Peak current upper (mA) | Average and peak voltage upper (V) |
|---|---:|---:|---:|---:|---:|
| tia25 | −11 | 0 | 0.04 | 1.1 | 1.2 |
| tia100 | −9 | 1 | 0.06 | 1.2 | 1.2 |
| tia200 | −7 | 1 | 0.09 | 1.2 | 1.2 |

The **Educational Receiver Screen** requires all lower/upper tests, matching rate and modulation, PD and TIA BW ≥0.7×baud, correct bias, supported λ/temperature/interconnect, actual Tx validity, and TIA→Measurement connectivity. Complete Link additionally requires a real Channel on every data path, all expected independent Tx data lanes, and no calibrated bench stimulus. Duplicate `(source output, λ)` receives do not create extra throughput. Passing this screen is not sensitivity or BER compliance. The First Receiver alone uses a calibrated 25G stimulus; NRZ levels are derived from Average and ER under equiprobable bits.

## WDM

The existing 1304/1308/1312/1316 nm Mux transfer is reused at Demux ports. Port `oi` accepts a channel within half the declared bandwidth of its grid center plus offset, then applies `muxTransmission` once. That function uses Gaussian passband attenuation and insertion loss. Shared buses carry wavelength sets; one data PD must receive exactly one wavelength. No numerical BER/crosstalk penalty is invented. WDM optical I/O is unique Tx Output count, not number of independent data channels.

## Monitoring and test access

Tap ratio `f` is 0.001–0.5; excess loss `e` is 0–3 dB. Defaults are 2% and 0.05 dB. At the tap reference plane:

`Pthrough = Pin × 10^(−e/10) × (1−f)`;
`Pmonitor = Pin × 10^(−e/10) × f`;
`Pexcess = Pin−Pthrough−Pmonitor`.

Routing to each branch is applied separately after this plane. Main loss is the actual power diversion plus excess; adding taps is not free.

The separate slow Monitor PD defaults to R=0.8 A/W, dark=0.02 µA, bias=1 V, saturation=0.2 mW and electrical power=3 mW. DC Readout defaults to gain=10000 Ω, current range 1–150 µA, voltage upper=2 V and power=15 mW. `I[µA]=1000 R P[mW]+dark`; `V=I×gain/10^6`. A reading requires a connected DC Readout, supported bias, current/voltage and PD optical ranges. AC coupling blocks this DC power signal. Neither ADC quantization nor monitor noise/bandwidth is simulated. All placed PD/TIA/monitor/readout packets count toward power, including unused packets.

Grating Probe Access is an optical path to an **external** probe/detector, default assumed loss 3 dB. It qualifies only at wafer or die/package test stage with an actual optical feed. It is not an on-chip detector or an in-operation monitor. Loopback is an explicit scalar-loss test path requiring external measurement. Process Reference is an independent process-control planning structure, not a product feed, not a measurement of every product component, and cannot satisfy product access. External test detector power is excluded.

MIM Capacitor is a circuit-purpose note (bias decoupling, AC coupling or termination), not a simulated analog device and not a universal PD DRC rule. **PDK-specific — verification required**: no exact PDK, revision or private schematic was provided. Check its topology, reverse bias, DC/AC purpose, placement, and whether the PDK calls it mandatory, recommended or illustrative. A series capacitor removes DC; a bias decoupling capacitor is a different branch. No private PDK material is published.

## Observable fault exercise

Four known common −2 dB educational families: Laser, Channel coupling, Attenuator/Loopback route family, and Tx-output modulator-loss surrogate. The last is **not** a simulated bias/ER change; route family is not exact-net localization. These are common downstream scalar perturbations, not individual-λ failures or arbitrary fault magnitudes. Baseline link/throughput/score remain labeled baseline screens during the exercise.

Installed monitor response depends on which family its actual graph crosses. `I_fault=(I_baseline−dark)×10^(−2×signature/10)+dark`. Out-of-range current has unavailable status and no numeric observed reading. Candidate families are those whose predicted available readings/status match the **actual installed observations**, within 1e−8 µA. Hidden scenario index is not used by the inference and is not returned as a truth field. No uninstalled node is revealed. Multiple candidates → **Ambiguous**, including cases where identical signatures cannot separate Laser and modulator loss. Maximum useful coverage with current downstream positions is 3 distinct signatures/4=75%; 100% is not a completion requirement. Observability is distinct range-aware response vectors /4 (zero without usable baseline monitors), never monitor count.

No noise or measurement precision is claimed. Saved integer seed chooses the exercise with the deterministic LCG `(1664525×seed+1013904223) >>> 0`, scenario modulo 4. JSON necessarily contains reproducible exercise inputs; this is an educational exercise, not tamper-resistant assessment.

## Score and mission gate

Let `clip(x)=max(0,min(1,x))`, `N` expected Rx lanes, `G` valid gross, `T` target, `V` valid receiver count, `P` total electrical W, `A` summed component area mm². This is component footprint sum, not die envelope, package area, or foundry device area. Score terms:

| Term | Points / equation |
|---|---|
| Functional Link | `35×clip(G/T)` |
| Receiver Screen | `10×clip(V/N) + (10/N)×sum_valid clip(min(avg−lower,upper−avg,10log10(OMA/minOMA))/3)` |
| Power / Area | `7.5×clip(1−P/customerPower) + 7.5×clip(1−A/120)` |
| Observability | monitoring missions: `20×coverage`; other Link missions: 20 only for complete baseline graph |
| Test Access / Customer | monitoring: 10 for valid product optical access + usable monitor; customer mission: 10 for customer pass; other Link missions: 10 for complete baseline graph |

Round the sum to nearest integer. An incomplete baseline graph is capped at 99 and status BLOCKED. **The score never unlocks a failed mission**: completion independently requires all graph/receiver/planning constraints, customer constraints if applicable, monitoring coverage≥0.5 + valid monitor + product access if applicable, and an observation-supported fault answer if applicable. Fresh Test is required after edits/Apply/Restore/Resume; Apply uses a real Test. No 100-point requirement. Fast & Narrow is a separate Tx-only mission: actual valid 8×200G scores 100; incomplete gross-based score is capped at99.

Customer fixed target is 1.6T. Requirements `(minimum distance km, maximum physical I/O, maximum electrical W)`: Lab `(0,32,20)`, Reach `(0.5,16,20)`, Density `(0.1,4,16)`, Power `(0.1,16,12)`. All placed Channel lengths must satisfy minimum distance. Total power includes original Tx electronics + all Rx and monitor packets; external laser, DSP/FEC and external detector are excluded. Customer Solution comparisons use identical total CW optical source budget 23 dBm and current environment/customer, then re-solve; unsatisfied alternatives cannot Apply. General My/Reference and saved Plans display their conditions and do not report a score delta as superiority across changed conditions.

## Primary public evidence and provenance

| Source | Relationship used | What is not taken from it |
|---|---|---|
| [TI TIDU535](https://www.ti.com/lit/pdf/tidu535), October2014 | DC photocurrent and transimpedance readout topology | High-speed game packet thresholds/gain/power |
| [TI SBOA324A](https://www.ti.com/lit/pdf/sboa324), January2025 | AC-coupled TIA versus DC response; circuit-position distinctions | Universal GePD/MIM foundry rule |
| [Micro-transfer-printed waveguide-coupled germanium photodiodes](https://backoffice.biblio.ugent.be/download/8578548/8578555), 2018 | Ge waveguide PD device context | A validated Ge25/100/200 specification |
| [Public silicon-photonics primary paper](https://www.photonics.intec.ugent.be/download/pub_2372.pdf) | Grating coupler and wafer optical probing context | Actual probing yield, alignment/tape-out sign-off |

Device-specific source/revision/assumption and topology warnings are also visible in the Inspector Engineering Tips. Public sources were reviewed during development. Model parameters, current implementation and tests are in `src/link-models.js`, `src/link-solver.js`, `src/device-tips.js`, `tests/link.test.js`. These files are authoritative if a later revision changes this document.
