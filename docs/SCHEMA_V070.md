# v0.7 persistence / migration

Existing IndexedDB database `photonics-architect`, version1, object store `designs` are retained. Autosave, current/backup, original input archive, named saves, campaign archive, JSON paste restore, v0.4 reference backup and v0.6 protected WDM originals keep their keys. The validator accepts original schemas1–6 with original engine coefficients/results; entering a Physical Level adds schema7 without changing existing component/net IDs or earlier completion flags. No file upload is needed for JSON paste restore.

Schema7 adds `design.physical`:

- `version:1`, `enabled:true`, architecture (`wdm/spatial/fast`), target1600.
- Die width/height in canvas units with explicit100units/mm.
- Physical constraints (bend, parallel spacing, envelope clearance, max total loss, crossing budget).
- Filter thermal enabled/ambient, explicit model constants owned by physical-models.js.
- Keep-out rectangle list and visual Routing Corridor list.
- Current customer weights selection.
- Up to6 saved Design Versions: name, component geometry/params/rotations, route endpoints/Waypoints/radius, die/constraints/thermal definition, environment, engine WDM/scaling state and next ID. Version geometry is recursively validated before import; nested Versions are forbidden.

Component and Port Geometry continue to use existing `components` and `definition()/endpoint()`. Optical Net `route.radiusMm` is optional, defaults0.08mm for Physical evaluation, and validates0.005–0.5mm. Existing route model version/orthogonal control Waypoints remain accepted. Export's derived route points/length/loss/status are overwritten by geometry evaluation, never trusted. DRC-lite results and score are deterministic derived result fields (`solve(d).routing` and `solve(d).physical`); Summary JSON exports them alongside solver version. Saved Versions store **inputs**, not approval from cached results.

`physicalOriginals` is an independent JSON-envelope list for Levels15–18, with the first original per Level before Reference Apply. IndexedDB key:`physical-originals-v070`. Import validates every original before changing design. Repeated Reference Apply and history edits never replace this protected list. User can restore the exact original inputs and must re-Test. Campaign archive maximum grows14→18. All historical complete flags are informational and cannot unlock a stale/invalid current design.

14→15 preserves exact source components and nets, adds the Physical constraints, disables previous package evaluation/FAU for this new scope, and independently archives the completed engine. 15→16→17→18 preserves physical geometry;17 activates required Filter Proximity for a WDM engine. Switching to another architecture explicitly starts a separate PIC while archiving the previous engine. No automatic wavelength/rate/PAM4 upgrade is claimed.

Recovery: the original validator-before-save and rolling backup logic remain. Malformed physical coordinates, units, radius, constraints, Versions or originals are rejected without replacing the current design. Unsupported/broken old Route records retain the existing explicit recovery notice. Current browser file path/profile controls IndexedDB origin; moving the standalone filename may require JSON paste migration. Physical phones/browser eviction durability have not been measured; backup export is retained.
