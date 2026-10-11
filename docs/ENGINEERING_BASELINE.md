# Engineering baseline

4 × 25 Gb/s NRZ, 100 Gb/s gross; External CW Laser; single 1×4 Splitter; four independent MZM channels and RF Drivers; four Edge Couplers. Die reference area: 10 × 6.5 mm. 100 SVG coordinates = 1 mm. Component geometry is educational and not a vendor physical drawing. EIC footprints are displayed on the same planning floorplan as PIC components; this is schematic co-design placement, not fabrication-ready monolithic PIC integration.

All numerical device values are Generic Educational Assumptions, not claims derived from uploaded company reports. Model version 0.1.0. Identical serializable design and model version yield deterministic results. Disconnected paths have null optical power and do not count as functional lanes. Single input/output port occupancy prevents unintended fan-out. Only a graph path containing a Laser, one Splitter and one MZM qualifies as a lane.

No PDK, DRC/LVS, BER, Eye, packaging parasitics, thermal solver or GDS. Optical routes can cross objects and each other without geometric connectivity; bends are Manhattan approximations with no minimum radius validation. RF route is straight line. Overlap checks use rotated rectangle bounds. Use for trade-off exploration, not tape-out.
