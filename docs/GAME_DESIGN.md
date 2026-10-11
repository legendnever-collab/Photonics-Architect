# Modulator & EIC Co-design

Specify→Select→Place→Connect→Test→Diagnose→Compare→Improve. v0.1 Canvas, logical netlist, port clicks, drag movement, zoom/pan, numeric/keyboard controls, lane duplication, rotation, undo/redo, animation and persistent HUD remain. No prepared layout automatically completes the game.

Choose First/Compact/Stable in the left panel; set Ambient and Laser wavelength. Component cards include footprint, ports/rate,drive/bias,platform,thermal role and Educational evidence. Select Modulator to change Technology and relevant parameters; select Driver to change Packet/Swing/rate. Compatible port IDs preserve all nets. MZM geometry changes with Length. Lane duplication uses selected Technology and current connected Driver parameters, creates no implicit nets. Whole Design duplicate preserves the original as a Snapshot.

MZM trades phase-shifter length against drive/loss/bandwidth/area. MRM trades small footprint/power against detuning and tuning reserve. EAM trades bias/swing/extinction against absorption and integration requirements. They are alternative strategies, not upgrades in a single hierarchy.

First Brief:4×25Gb/s NRZ. Compact:reference summed footprint≤6.4mm²; validated MRM and EAM solutions exist. Stable:nominal plus±3°C/±0.03nm corners. Manual MRM detuning can fail; cold resonance and bounded Heater Lock can restore the optical operating point while consuming power. Driver/RF failures remain independent.

Failure reports point to Component, then cause, affected metric and possible modification. Layout issues retain BLOCKED status; performance issues use WARNING; all constraints give VALID. Click diagnosis to select location. A high average power off resonance does not substitute for modulation extinction.

After Test, Snapshot preserves design data. Change layout/Technology and Test again. Compare at least two snapshots/current with satisfaction,Gross,per-lane High/Low/Average/ER/OMA,RF length/delivered voltage/minimum stageBW,Driver/Heater/Bias power,footprint,detuning and corner sensitivity. It explicitly warns when environment/Brief/solver differ. The Score is secondary.

All explanatory text is Korean, engineering terms English. Panels scroll internally; Canvas/HUD remain visible. Comparison dialog scrolls internally for all metric rows. Animation indicates active net topology, not calibrated optical power. High/Low estimates are not Eye/BER plots. Game enjoyment is a human playtest question; passing automation is not proof of fun.
