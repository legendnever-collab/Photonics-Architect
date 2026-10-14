# Photonics Architect v0.7.1 — Solution & Score Stability

v0.7 PR #9 was still OPEN / unmerged at Head `737aff3751672a204c96fb51414587052504a245`; Verify #60 was separately confirmed SUCCESS. Development was isolated in a new local worktree so the existing workspace's unrelated modified historical ZIP was left untouched. This patch updates the same unmerged PR for review; it does not merge main.

## Reported problem and reproduced behavior

The user reported Campaign Solution leaving Next disabled from Level14 onward, while the header Solution appeared to progress. On the current v0.7 standalone, **both physical entry points could leave the design LIVE PREVIEW/STALE after Apply**, requiring a separate Run Engine. The exact button-dependent discrepancy was not reproduced on that baseline. The source did have separate legacy and physical application paths and multiple render-time button assignments: legacy Apply included actual Test; Physical Apply did not. Level14's extra three-architecture snapshots/customer choice were not completed by a single reference application.

The patch addresses the observed failure and prevents entry-point divergence:

- Header and Campaign Solution now use one current-level dispatcher, rebound after render.
- Both legacy and Physical application use one Apply → actual Run Engine → persist contract. Physical references remain protected before application. Actual goal predicates own Next, never a completion flag or forced button state.
- Solution preview/selection remains read-only. Undo, Redo, original Restore, numeric edits, imported/resumed state and Version restore still require a new Test; auto-Test occurs only for explicit Solution Apply.
- Level14 opens on a current-customer-compatible reference and exposes a checked **Full Worked Solution** option. It solves Spatial / Fast / WDM examples independently under one selected environment, total optical source power, FAU scenario and customer; saves their actual solver snapshots; sets the selected compatible architecture; then performs the current-design Test. It does not fabricate a PASS or relax the existing comparison gate.
- Incompatible selected examples are visibly blocked in full mode. Unchecking Full Worked Solution restores individual-example behavior: users must create three snapshots and customer choice themselves. The original design/snapshots are independently restorable.

## What to do to increase Score

The footer Score is now an accessible explanation control. The inspector includes a Score Improvement Guide with actual per-item current/max/missing points. Levels14–18 also have a fixed next-action strip with a target-selection button.

Physical recommendations prioritize Hard Constraints (feasibility FAIL → Score0), then rank weighted deficits. The explanation names the worst-output route, actual propagation/bend/crossing losses, small effective bend, outer component or hot filter as appropriate. Routes that already follow a near-shortest path are explicitly identified; moving only one of several outermost components may leave envelope/compactness unchanged. The guide explains integer rounding and completion requirements: **Score100 is not required**; Level18 requires feasible Score≥60, while15–17 require feasibility/Fresh Test.

**Preview-only experiments** recompute the real solver on clones: requested radius≥0.12mm for currently bending routes, and one Output Coupler X−0.10mm move. Source/Environment/Customer/Constraints and original geometry are untouched. The display includes Score before/after, integer delta, weighted subscore delta, worst loss delta, envelope delta and feasibility; an infeasible example is labelled not recommended. Users select an actual target and edit it themselves. This is finite explanatory what-if, not a global optimizer or promise of100 points.

Example: default Level18 Compact, Balanced weights, same source/conditions: increasing requested radius on the bending optical routes produces actual recomputed Score68→75 and worst total loss reduction≈0.422dB. A tiny one-coupler move can improve a subscore while rounded Score stays68; this is shown honestly.

## Compatibility and scope

Schema7, IndexedDB keys, physical protected-original key, campaign archive, original WDM first-user backups, JSON paste, snapshots, saved Versions, PNG and model coefficients remain. Existing0.3/0.4.1/0.5/0.6/0.7 solver/model versions are unchanged; **0.7.1 is the release/application version**, not a new calibrated physics revision. Historical published HTML/data files remain unchanged after temporary regression aliases are restored.

New modules: `solution-flow.js`, `score-coach.js`, `score-coach-ui.js`. Build stays `npm run build`; deliverable is `dist/photonics-architect-v0.7.1.html`. No external runtime assets. The same DRC-lite/sampled geometry, nominal high-speed electrical and educational filter model limits apply. Physical phones, native keyboard and player fun/learning are not newly validated.
