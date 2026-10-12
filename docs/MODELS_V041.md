# v0.4.1 architecture scaling model

Baseline: main `4dd4a398cf82b4b37d97dfc24dd58bb9e98857dd` (merged PR #4, v0.4 head `2a10080de0c3ccf7a6de082f63a3742349c57db3`). Verified again on 2026-10-12; no newer main commit. No AGENTS.md found. Legacy solver 0.3.0 / component model 0.2.1 is unchanged in numerical behavior. New scaling solver 0.4.1, scaling component model 1.0.0, schema 4. Product version is the user-requested 0.4.1.

## Evidence and boundaries

Primary public sources inform the **structure**, not the numerical calibration of the generic packets:

- [Caltech author record and paper: 100-Gb/s PAM4 SiPh-CMOS MOSCAP transmitter](https://authors.library.caltech.edu/records/40smm-8cd68): 100 Gb/s uses 50 GBd PAM4. Demonstrates segmented MZM / electronic-driver co-design. Its reported optical amplification, equalization, fabrication and power boundary differ from this game; measured device coefficients are not copied here.
- [Nature Electronics: integrated CMOS–silicon photonics transmitter, 112 GBd](https://www.nature.com/articles/s41928-023-01048-1): supports the relevance of bandwidth, swing, equalization, parasitics and explicit energy boundaries. Its efficiency is not a universal high-rate penalty or a calibration of our 1310 nm generic MZM.
- [imec primary publication: system characterization of high-speed travelling-wave MZMs](https://imec-publications.be/entities/publication/1d1272a5-e7be-409c-84ac-0804b4fab96c): reports O/C-band high-speed experimental characterization. Optical amplification and measurement conditions must not be confused with a complete unamplified engine validation.

Every numerical coefficient below is **Assumed / Educational**, with calculated results. No PDK, private measurements, commercial validation or real device identity is implied. MRM/EAM legacy profiles remain 25-GBd NRZ; they are not silently promoted to 100/200G.

## Frozen scenario coefficients (defined before comparison)

| Profile | Rate / Baud | MZM Vπ / IL / pole BW | Four-channel EIC BW / nominal swing | Channel / shared power | Planning modulator / EIC footprint |
|---|---|---|---|---|---|
| hs100 | 100 Gb/s / 50 GBd PAM4 | 2.4 V / 3 dB / 45 GHz | 50 GHz / 1.8 Vppd | 0.22 W / 0.12 W | 1×0.38 / 1.9×0.45 mm |
| hs200 | 200 Gb/s / 100 GBd PAM4 | 2.2 V / 3.3 dB / 75 GHz | 85 GHz / 2.0 Vppd | 0.48 W / 0.30 W | 1.25×0.42 / 2.4×0.55 mm |

EIC RF0–RF3 are four separate differential logical channels. Vppd is differential peak-to-peak; electrical symbol levels are −S/2, −S/6, S/6, S/2. Bias is an optical phase offset in radians (−0.4…0.4), not an invented CMOS bias voltage. Loaded MZM static transmission = 10^(−IL/10) × [1+sin(πV/Vπ+bias)]/2. Four powers, adjacent transmission gaps, minimum-gap/span, and gap nonlinearity are shown. They are **not a measured eye, BER or TDECQ**.

RF attenuation at frequency f GHz: α(f) = 0.35√(f/25)+0.05(f/25) dB/mm. Route pole =130/(1+length/2) GHz. Three assumed first-order amplitude poles: driver, modulator, route. Calculate amplitude at ¼, ½, ¾ baud; use ½-baud amplitude for the static loaded swing. The separately labelled minimum-pole/half-baud ratio is only a screen. A conservative tail proxy sums exp(−πBW/baud) for the three poles at half a symbol, capped at 1. This is an educational planning screen, **not a full transient or pattern-dependent eye calculation**.

Functional lane screens: compatible profile/channel, complete graph, route ≤5 mm, tail proxy ≤0.65, effective swing ≥0.65 Vppd, monotonic four levels, adjacent gap/span ≥0.22, average ≥−4 dBm, ER ≥3 dB, supported nominal 25 °C / 1310 nm, no route-geometry errors. Goal additionally requires homogeneous 4×100G, 16×100G or 8×200G, exact lane count, and no placement/geometry errors. These constraints were verified against playable seed/array designs and both reference architectures; they are game rules, not standards compliance.

## Optical graph and power boundary

External CW starts at 1310 nm / 23 dBm, adjustable 0–27 dBm. It is not a laser efficiency model. Optical tracing subtracts every graph edge's centerline propagation 0.12 dB/mm and bend 0.04 dB, every splitter stage's 10log10(N) ideal division plus excess, and the output coupling loss (1.5 dB default). 1×4 excess 0.6 dB, 1×8 0.9 dB, 1×16 1.2 dB. A two-stage 1×4 cascade therefore has 12.041 dB ideal division and 1.2 dB excess. No signal is duplicated without splitter division; unused branches consume/divert power and do not become throughput. Per-lane powers are calculated from the actual graph. No hidden optical amplifier.

Engine electrical power includes connected driver channels (nominal channel power scaled by squared swing ratio) and shared overhead of every placed high-speed EIC. Excludes external laser electrical power, receiver, DSP/FEC and cooling. Heater/bias electrical power is 0 **because no such high-speed model is supported**, not a claim of complete device power. pJ/bit = W×1000 / functional gross Gb/s; invalid lanes are excluded from the denominator. Ethernet line profiles, FEC/net rates, thermal coupling at high speed, BER/eye, WDM, 400G lanes, full-wave, DRC and GDS are unsupported.

Component area sums physical planning rectangles /10000. Placement envelope is the rotated bounding rectangle around all placed components, including external-laser input and distribution. Neither is manufactured die area.

## Same-condition scenario result

All use 25 °C / 1310 nm / CW23 dBm, pitch100, vertical arrays, same solver and optical route coefficients.

| Architecture | Gross | EIC packets / channels | EIC W | pJ per functional gross bit | Component area |
|---|---:|---:|---:|---:|---:|
| 4×100G | 400 | 1 / 4 | 1.00 | 2.50 | 5.275 mm² |
| 16×100G | 1600 | 4 / 16 | 4.00 | 2.50 | 19.134 mm² |
| 8×200G | 1600 | 2 / 8 | 4.44 | 2.775 | 11.962 mm² |

Fast & Narrow has fewer physical optical outputs and less summed component area, but greater frequency-dependent RF attenuation, tail proxy and channel power in this frozen scenario. Wide has more power division and worse average optical output. These are scenario outcomes, not universal product rankings. Level8 customer alternatives (power ≤4.2 W/area≤30/I/O≤16; or I/O≤8/power≤5 W/area≤20) each admit a different validated reference; neither architecture is the unique answer.
