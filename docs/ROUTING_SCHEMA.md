# Routing Schema / Migration — v0.3.0

Design Schema 3; Solver 0.3.0; Route Model 0.3.0; Device / Packet Model 0.2.1. `nets[]` continue to represent logical Connection. Each net has an independent `route` record:

```json
{
  "id": "r-n8", "version": "0.3.0", "domain": "rf",
  "source": {"component": "c5", "port": "rf"},
  "destination": {"component": "c4", "port": "rf"},
  "mode": "manual", "waypoints": [{"x": 480, "y": 90}],
  "geometry": {"kind": "polyline", "units": "canvas", "unitsPerMm": 100},
  "validationStatus": "recompute"
}
```

Optical kind is `orthogonal`. `auto` creates the exact legacy default (RF straight endpoint distance; Optical midpoint-x Manhattan). `manual` adds absolute Canvas anchors; Optical inserts x-first orthogonal elbows between successive anchors, RF joins anchors directly. Coincident and forward-collinear points are simplified. Reversals remain. Endpoints are recalculated from current Component dimensions and rotation. Manual anchors are preserved on Component move / rotation / Technology change. Reset explicitly restores auto routing; Undo restores edits.

JSON Export enriches `geometry` with calculated points, `lengthMm`, bends and optical loss and writes current Validation Status. Those fields are derived caches: **Import and Solver always recompute**, never trust them. In-memory records may say `recompute`. Component / Packet versions, Solver / Model / Route identifiers, Level progress, Snapshots and RF Baseline are included.

## Migration and errors

Schema 1 / 2 raw Design and Schema 2 / 3 export envelopes are accepted. Schema 1 gets safe device defaults and Level 1. Schema 2 O-band preserves parameters, all connections, old Level records and selected Level, generating legacy geometry. Regression compares the actual v0.2 reference solver for all three technologies; outputs, RF, power and footprint match. Old C-band Schema 2 / model 0.2.0 retains the explicit −240 nm Laser / MRM cold-resonance migration and original `legacy-cband` Archive.

Route ID/version/domain/endpoints/kind/units, mode, array size and finite coordinate values are checked. Maximum 32 manual anchors, |Canvas coordinate|≤10000. Invalid serialized Route metadata resets that Route to default geometry with a visible recovery notice; raw imported JSON is archived first. Finite out-of-floorplan anchors are retained so the user can repair the geometry. Unsupported Component, malformed logical Net, model / parameter / Keep-out data reject the Import without replacing current Engine. No NaN success is produced.

IndexedDB database and store names are unchanged. Raw pre-migration / repaired records are stored under `original-schema-<schema>-<solverVersion>`; different subsequent originals receive timestamp keys rather than overwrite. C-band original and v0.1 keys remain. Invalid current saves are archived before attempting backup recovery. Quota/storage failures are surfaced and JSON Export remains available.

Level 4 record stores target Net, cloned Baseline Design and original Test result. Baseline has no nested challenge or snapshots. Snapshot Design has no nested snapshots; original result is preserved, but comparison recalculates using current Solver and flags original Solver mismatch. Original snapshot result is a historical record, not trusted for current completion. Restored/imported results are always stale until Test; records do not unlock Next by themselves.

Snapshot history is bounded to six; creating a seventh removes the oldest entry with existing policy. Export JSON for longer archival history. Component+Route edits share the existing 100-step Undo/Redo history. File-origin IndexedDB portability depends on browser; JSON is the portable route.
