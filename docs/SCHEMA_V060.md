# Schema6 and migration

Schema3/4/5 remain valid and retain the1310nm environment, actual original components/routes, old tests, snapshots and backups. A normal legacy/scaling/package restoration does not enable WDM. `validateImport` clones rather than editing the supplied original; IndexedDB archival policy remains. Stored completion history cannot replace a Fresh Test.

Only explicit WDM Level entry creates schema6 and `wdm`: version1, grid`edu-ob4`, architecture`wdm|spatial|fast`, customer, choice, tiles, arrays and optional physical FAU interface. Source components persist their per-λ setpoints/power; Mux components persist IL, offset, intensity bandwidth and isolation floor. Mux mapping is the actual optical Net endpoint graph, not an unrelated accepted boolean. RF mapping is actual independent Net endpoints. Derived spectral signals are recomputed, and actual snapshots also retain originalResult for tested provenance.

WDM Tile contains four Modulator IDs, EIC, Mux and Output. Array records all cloned components. Expansion clones device parameters and internal manual routes, remaps source/destination IDs and preserves the Source Bank setpoints. New per-λ distribution feeds are explicit. Deleting a component removes its dependent Tile/Array and FAU references; Undo/Redo restores the complete Design.

FAU records enabled state, physical channels, pitch, placement/orientation, coupling profile, output-to-channel mapping, actual route waypoints and common/residual/rotation stress inputs. Existing coupling uses one physical channel offset for all its λ. Finite/range/profile/ID validation rejects malformed metadata before replacing current state. Mapping duplicate/missing physics errors remain diagnosable, rather than being silently repaired.

Campaign Registry now has14 entries. Level11→12 preserves the completed Package in the archive/Snapshot and retains the current components, while explicitly disabling old Package conditions and enabling WDM requirements. Player can modify the retained engine or start a separate WDM Design.12→13 preserves a400G Path;13→14 preserves1.6T. Archive capacity grows11→14 with the same key/version, so prior records remain readable. No original save/protected backup is deleted.

Existing protected Solution Restore and Undo remain. Additionally, the first WDM user design before any Solution Apply is retained per WDM Level in `wdm-original-<brief>` and can be restored through a dedicated button. Later architecture applications do not overwrite that protected original. Restore/import/Resume requires Fresh Test. View selectors retain the separate engineering-ui store and are not physics input.

Outer JSON `wdmOriginals` exports up to three protected original designs. All entries are validated before installation. Import archives a different existing original before replacing its active key; backups are not deleted. Older exports without this optional field remain valid.
