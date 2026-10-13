# WDM model / primary sources / assumptions

This is an output-side educational planning model. No Receiver, BER, FEC, complete communication-link, production yield or lifetime claim. No new400G-per-channel,224G/448G, coherent or MDM profile. Existing1310nm models are unchanged.

## Primary evidence inspected

1. Fernández-Hinestrosa et al., *Nanophotonic Bragg grating assisted Mach–Zehnder interferometers for O-band add-drop filters*, Scientific Reports14,18492 (2024), DOI10.1038/s41598-024-69042-x: https://www.nature.com/articles/s41598-024-69042-x . The paper establishes finite O-band filtering / insertion loss / crosstalk, using measured flat-top gratings. Our Gaussian curve and coefficients are not fitted to this device or copied from its measured response. Its architecture differs from this generic4×1 Mux.
2. OIF, *Co-Packaging3.2T Module Implementation Agreement*, OIF-Co-Packaging-3.2T-Module-01.0, supplied primary PDF, Ethernet definitions section. It distinguishes spatial DR4 and wavelength FR4 and states106.25Gb/s /53.13GBd for400GBASE-FR4. Our100G /50GBd gross educational channel is intentionally not a standards-conformance implementation. Official document: https://www.oiforum.com/wp-content/uploads/OIF-Co-Packaging-3.2T-Module-01.0.pdf .
3. Existing educational high-speed / RF model and FAU coupling surrogate are documented in MODELS_V041.md and MODELS_V050.md. They retain their original evidence grades and unsupported boundaries.

All new numerical parameters below are **explicit educational assumptions**, not foundry parameters or manufacturing specifications.

## Grid and sources

`edu-ob4`:1304,1308,1312,1316nm,4nm spacing, supported1302–1318nm. It is not CWDM or LAN-WDM. Generic hs100 normalized MZM response is assumed wavelength-flat over this narrow planning range at nominal25°C; no new measured bandwidth/loss/bias calibration is implied. Other ambient temperatures are explicitly Unsupported for these WDM levels. Legacy1310nm support is untouched. Source wavelengths belong to source ports, not one global1310 setting. The legacy global wavelength control is disabled in WDM Levels; explicit Source setpoints remain editable.

4λ Source Bank has four separately addressable monochromatic CW outputs. `power` is **dBm per wavelength**; Total mW is sum of4×10^(power/10). Default18dBm/λ gives252.383mW Total. Selectable individual CW sources have explicit wavelength and power. Setpoints are adjustable; linewidth, RIN, drift distributions and dynamic stabilization are not modeled. Source grade:Educational / Assumed. Duplicate same-wavelength sources/ports and optical loops are Unsupported. A source can feed four independent Modulators through an actual1×4 splitter, with ideal10log10(4) division and the existing excess and route losses separately applied to each λ. The Mux does not divide by4.

## Mux intensity transfer

For input port j: center c_j=grid[j]+offset, detuning Δλ=λ−c_j, g=exp(−4 ln2 (Δλ/FWHM)^2), floor f=10^(−isolation/10), T_j(λ)=10^(−IL/10)[f+(1−f)g]. Default IL2dB, intensity FWHM2nm, floor30dB. Parameters can be edited within declared bounds. Transmission is0…1 and detuning loss cannot create gain. IL and passband loss are separate Waterfall stages.

Port mapping requires expected λ within±1.5nm, one independently modulated hs100 channel and one unique RF data channel. Correct nominal mapping can still fail from filter offset/bandwidth, optical margin, RF/PAM4 response or separation. Port-specific transfer at each wavelength is recorded. For a desired wavelength, reported isolation is10log10(T_desired /T_other-port); the minimum pairwise isolation must be≥18dB. This is a **spectral separation screen**, not simulated receiver crosstalk/BER penalty. It is not added again as optical attenuation. Desired signals from independently modulated channels are combined as linear powers. There is no phase/coherence summation. No temperature shift coefficient is introduced; temperature-dependent filter shift is Unsupported rather than claimed athermal.

## Signals and performance

Each carried channel records λ, Source/port, Modulator, RF channel, actual4 PAM4 optical levels, average mW/dBm, ERdB, outer OMAmW, route stages, Mux transfer and separation. Average is equiprobable mean of four per-channel levels. Physical output average is Σ per-channel average mW, converted once to dBm; dBm are never summed. The combined output is not assigned one4-level PAM4 waveform. Every valid100G wavelength channel contributes100G, and a failed channel is excluded independently. No Net/FEC throughput is inferred.

## Power and architecture comparison

Four independent WDM Paths use16 hs100 MZMs and four4-channel EIC packets. Per connected EIC channel power and shared packet overhead are computed once, using existing assumptions; Source, Mux and λ multiplexing cannot share electrical data. Source electrical power, Cooling, RX/DSP/FEC are excluded. pJ/bit denominator is functional gross Gb/s; zero is unavailable. Default WDM16-channel power is4W, the same as16×100G Spatial under these packet assumptions. Fast8×200G is4.44W with existing coefficients.

Level14 uses a comparison wrapper that preserves the original scaling model for Spatial/Fast and records its engineSolverVersion separately. All three designs share25°C, customer settings and252.383mW **Total launched Source optical budget**; per-λ powers differ. Actual source totals, rates, EIC counts, output counts, component area, engine placement envelope and RF routes are displayed. Customer caps: Efficiency4.2W /20mm² /16I/O; Density5W /26mm² /4I/O; Compact5W /16mm² /8I/O. Different designs win different briefs in the shipped examples. These are game constraints, not measured product ranking.

WDM levels use the20×16mm engine planning canvas. Engine placement envelope is a component bounding box; it is not a tested package. Existing Levels9–11 continue to enforce their own package constraints. WDM package thermal, filter thermal drift, package-zone qualification and thermal variation are Unsupported; the UI explicitly reports this scope rather than borrowing low-speed MRM coefficients.

## Optional FAU boundary / stress scenario

Physical outputs map one-to-one to1/4/8/16 FAU channels. WDM4 outputs carry16 wavelengths; they do not require16 fibers. Enabling FAU **replaces** the output Edge Coupler loss with the existing nominal + route + alignment surrogate once. All wavelengths in one physical channel share its common and residual offsets and rotation lever arm. Existing compact/expanded surrogate is additionally assumed flat across1302–1318nm; actual mode size / wavelength dependence is unknown. No fabrication tolerance claim.

Manual common X/Y and imported channel residual / rotation scenarios recalculate per-channel optical powers and functional gross. UI labels these as Stress Scenarios, not Monte Carlo yield or lifetime. Existing v0.5 seeded assembly tests remain available and unchanged in Levels9–11; they are not presented as a WDM lifetime/yield solver.

## Visualization and score

Wavelength labels accompany colors. Plots are Discrete Channel / Filter Planning Plots, not measured spectra. Each λ Waterfall is projected from the actual trace stages and final Solver power. Margins are per-channel Average minus−4dBm, not total output margin. Graph/lane selections do not modify physics or freshness.

New score:Functional40×gross/target, Independent Mapping20×mapped-rate/target, Optical Budget20×budget-valid-rate/target, Geometry max(0,10−2×planning errors), Level/customer10 when predicate complete. Terms clamp to their maxima. Mapped rate requires independent RF+Modulator and valid λ/port mapping; low optical power does not pretend to unmap a channel. Level14 additionally requires three actual tested same-condition snapshots and explicit customer choice. No layout similarity score. Preview/STALE never unlock Next.
