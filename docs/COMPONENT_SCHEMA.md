# Component and design schema v1

Library (`src/core.js` LIB): keyed by type, reusable name, w/h geometry, color, ports (id, kind, dir, x/y local coordinate), params, model ID. Definition evidence grade: Educational Assumption; model version: solver 0.1.0. Unsupported DC/thermal interfaces are reserved for later schema versions, not exposed as working ports.

Instance: `{id,type,x,y,rotation}`. Position does not mutate library geometry or models. Rotations are 0/90/180/270; ports rotate about component center.

Net: `{id,kind,a:{component,port},b:{component,port}}`; normalized Output→Input. Unique ID shares a counter with Component IDs. Coordinates derive from actual endpoints at every render and simulation. No detached cached wires.

Design: `{schema:1,name,components,nets,next}`. Import validates types, finite geometry, rotation, unique IDs, graph endpoints, port compatibility and occupancy, resource caps (200 components/600 nets). Validation occurs before replacing current state. Future component packets should introduce capability fields and model version migration rather than accepting arbitrary executable vendor code.
