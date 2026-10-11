# Simulation models 0.1.0

| Parameter | Value | Confidence |
|---|---:|---|
| Laser input | 13 dBm | Assumed |
| 1×4 ideal split | 10 log10(4) = 6.0206 dB | Calculated |
| Splitter excess | 0.6 dB | Assumed |
| WG propagation | 0.12 dB/mm | Assumed |
| Orthogonal turn | 0.04 dB/turn | Assumed |
| MZM insertion loss | 3 dB | Assumed |
| MZM equivalent required drive | 2.5 V | Assumed |
| MZM EO bandwidth | 25 GHz | Assumed |
| MZM nominal ER | 8 dB | Reference assumption, no ER solver |
| Edge coupling loss | 1.5 dB | Assumed |
| Driver swing / bandwidth | 3.3 V / 30 GHz | Assumed |
| Driver power | 0.25 W | Reference, not a power solver |
| RF attenuation at 12.5 GHz | 0.8 dB/mm | Assumed |

Optical graph traverses upstream through component input nets. Per lane: Pout[dBm] = Pin − ideal split − excess − sum(route length × propagation + turn losses) − MZM IL − output coupling. Ideal power conservation is tested in linear mW. Waveguide length is actual Manhattan polyline length /100. Zero-length points are removed before bend count. Crossings do not create a graph junction; crossing losses and routing obstruction remain unsupported.

RF length is endpoint Euclidean length /100 mm. Attenuation = 0.8 × length × sqrt(f/12.5) dB with f=12.5 GHz for 25 Gb/s NRZ Nyquist. Vreceived = 3.3 × 10^(−attenuation/20). Margin = Vreceived − 2.5 V. BW requirement = 0.7 × lane rate = 17.5 GHz; margin = min(Driver BW,MZM BW) − 17.5. This uses effective voltage definitions and ignores termination, reflections and distributed electrodes. No quantitative Eye or BER is inferred.

Gross data rate = 25 × number of independent functional lanes. Functional means connected path through one splitter and one MZM, compatible driver, nonnegative optical and drive margins. Geometric violations still block VALID and suppress composite score even when a lane carries signal.

Score terms clamp to [0,100]: F=25 × functional lanes; O=20 × minimum output dBm; R=125 × minimum drive margin V; A=100−8 × summed component area mm². Valid score = round(0.4F+0.25O+0.25R+0.1A). Invalid design score is null. This is a gameplay rubric, not an industry figure of merit.
