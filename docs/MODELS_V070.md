# v0.7 Physical PIC Model — Educational / Assumed

This is a game-first floorplan and waveguide planning model, not foundry-qualified DRC/LVS, device validation, EM/FDTD, thermal FEM, BER, or real GDSII/tape-out. Material, cross-section, polarization, fabrication process and crossing cell calibration are unavailable. Unsupported effects remain labelled. The previous NRZ, scaling, package, assembly and WDM models continue to own their original levels.

## Geometry / coordinate ownership

Component, port and net IDs are unchanged. Geometry uses **100 canvas units =1 mm**, including all lengths and areas. Die is a configurable rectangular planning boundary, normally 19×21 mm for the balanced 1.6T WDM plan. These deliberately enlarged educational footprints improve interaction; they are not commercial PIC dimensions. Components retain legacy definitions, explicit rotation in 90° increments, and rotated port positions and axis-aligned footprint envelopes.

| Physical representation | Education footprint | Meaning |
|---|---:|---|
| 4λ input interface | 0.90×1.60 mm | Input Coupler reservation at an **external** four-wavelength CW boundary; no monolithic laser claim |
| 1×4 splitter | 0.85×1.20 mm | Four separate wavelength fanout graphs; ideal division and excess remain distinct |
| 100G PAM4 MZM | 1.00×0.38 mm | Existing generic hs100 transfer; four instances form a bank |
| 200G PAM4 MZM | 1.25×0.42 mm | Existing generic hs200 profile; spatial Fast & Narrow option |
| Mux | 0.80×1.60 mm | Existing four-port intensity transfer and λ mapping |
| Output Coupler | 0.80×0.45 mm | One 1.5dB educational output boundary |
| RF Interface / EIC off-PIC | 1.90×0.45 or2.40×0.55 mm | Interface reservation connected to an external EIC packet, not CMOS fabricated on the PIC |

Area usage sums these non-overlapping component/interface reservations divided by Die area. Placement envelope includes the same reservations. Routing Corridor is a visual planning aid; it does not waive DRC-lite obstacles or guarantee a route. Keep-out geometry is editable and independently persisted. Source/EIC electrical accounting keeps its existing boundary (EIC channels + shared overhead; external CW electrical power, cooling, receiver, DSP/FEC excluded).

## Circular waveguide bends

Manual Waypoints define the existing orthogonal control polygon. Physical optical routes render circular 90° fillets as SVG `A` arcs, **not sharp polylines with a radius label**. At each corner:

`R_effective = min(R_requested, incoming straight segment length/2, outgoing straight segment length/2)`.

Requested radius defaults to0.08mm. Reference examples use0.045/0.08/0.12mm. The actual effective radius owns loss and DRC-lite. Orthogonal length is corrected by replacing2R with πR/2 at each corner, so rounded optical length is exact analytically. Crossing and obstacle checks use12 samples per90° arc. Their positions and counts are finite-resolution geometry estimates; exact curve/curve intersection and mask-edge clearance are not implemented. RF retains its existing polyline geometry and response.

`IL_route =0.12 dB/mm × rounded_length_mm + Σ 0.01 exp(0.10 mm/R_effective_mm) dB + 0.03 dB × route_crossing_traversals`.

All fresh bend and crossing coefficients are scenario assumptions. They are not extracted/calibrated to the attached paper. Tight bends increase loss; radius<0.04mm separately fails feasibility. The exponential curve also supplies a visible penalty rather than treating an unsupported tight bend as zero loss.

## Crossings / spacing / obstacle rules

Crossings come from actual sampled centerline intersections, including intersections at intermediate polyline vertices. Terminal port contacts are excluded. Intersections are deduplicated within0.001mm. Each intersection is counted once globally and charges0.03dB once to each traversing route. Both wavelengths and shared output buses traverse the geometry: λ does not create a new physical route or crossing count. The single-layer crossing loss surrogate does not model a qualified crossing cell, crosstalk, wavelength dependency, multilayer transitions or fabrication. Collinear overlap is a spacing violation, never a free crossing.

DRC-lite checks:

- Component footprint boundary, overlap and0.04mm envelope clearance.
- Optical routes against Die, unrelated component envelopes expanded by clearance, and expanded Keep-outs.
- Optical input/output directions after rotation, missing/invalid ports and route continuity.
- Minimum effective bend radius0.04mm.
- Parallel straight corridor spacing0.02mm, including overlaps. Curved-neighbor mask-edge spacing and self-intersection sign-off are unsupported.
- Existing RF connection/rate/drive screens still apply; RF is an external interface planning path, not a fabricated optical waveguide.

A deterministic local visibility-grid **Guided Route Suggestion** avoids expanded obstacles for the selected route. It does not evaluate neighboring routes, crossings, global score or thermal placement. It may leave tight bends and spacing violations requiring direct Waypoint edits. It never changes another route or auto-completes a mission.

## Optical accounting and reused engine

`IL_total = actual component average-response + ideal distribution + splitter excess + propagation + bend + crossing + Mux insertion/passband + coupling`.

A clone of the same design is evaluated by the established v0.6 WDM or v0.4.1 scaling graph. Their routing-summary input is replaced with Physical metrics **before** optical trace. No legacy fixed bend/propagation loss is added a second time. The WDM per-channel waterfall now has an explicit Crossing step per route and totals the actual source-to-output average loss. PAM4 levels attenuate consistently. Output powers are summed in linear mW for shared WDM outputs. Spacing/placement failures may leave optical throughput numerically nonzero, but hard feasibility is still FAIL.

Default WDM mission:4 spatial paths ×4 independent wavelengths ×100G =1600G,16 electrical data channels,4 output buses. Educational grid1304/1308/1312/1316nm is preserved. Physical entry also preserves an inherited16×100G or8×200G engine. Level17 requires WDM; a player can archive the original engine and start a separate WDM PIC. Level18 can explore all three architectures; comparisons label mismatched source/architecture conditions and suppress superiority deltas.

## WDM thermal proximity

A new, explicit educational **Filter Proximity** model is separate from previous Level3 MRM and Level10 package kernels. It does not simulate high-speed junction response.

`T_mux = Ambient + Σ EIC_packet_power × 8 K/W / [1+(distance_between_centers/1mm)^2]`.

Reference25°C, supported ambient20–40°C. Packet power uses the nominal hs100/hs200 connected-channel and shared-overhead values. It assumes nominal swing for thermal screening; varying swing affects the existing electrical solver but is not a calibrated junction/thermal law here.

`filter_shift_nm =0.08 nm/K × (T_mux−25°C)`.

The shift is added to the Mux center offset on a **solver-only clone**. Its actual Gaussian intensity transfer is recomputed once, changing each channel's powers and port-specific spectral separation. Source wavelengths, user offsets and electrical four-level response are not mutated. WDM Physical Level17/18 require thermal screening enabled, Filter temperature≤45°C and |shift|≤0.9nm. This is a spectral/planning screen; no receiver/BER margin is claimed. Level15/16 disable it explicitly. Thermal and Optical result tabs are reused; layout metrics and channel tables are added.

## Structural primary reference / attached material handling

Yikai Su et al., *Silicon Photonic Platform for Passive Waveguide Devices: Materials, Fabrication, and Applications*, Advanced Materials Technologies5,1901153 (2020), https://doi.org/10.1002/admt.201901153. The locally attached PDF was inspected for qualitative material/radius/spacing trade-offs. It supports that physical waveguide dimensions and layouts matter; the game's dimensions/coefficients are fresh educational choices. Existing OIF and prior source references remain in the v0.6 documentation. Uploaded company reports, slide content, financial material and publisher PDF bytes are not redistributed to this public repository. The Chrostowski/Hochberg book attachment was unavailable and was not read or used.
