# Solution viewer and Goal Score — v0.4.1 UI update

Every Level1–8 offers an optional Solution action before advancement. Header Solution remains accessible in compact mobile landscape. The existing validated Reference Design viewer now includes layout zoom, parameters, optical/RF connections, why it works, trade-offs and a Level-specific workflow. Opening and switching solutions never modifies the current design, progress, snapshots or protected backup. Applying remains an explicit deep-copy action with Undo/Restore behavior.

My Design vs Solution is recalculated using the actual solver. Default reference conditions remain25°C/1310nm. If conditions differ, the score delta is hidden. Selecting “my Environment / Laser” reconstructs the references in the current environment and, when both designs have one external CW source, uses the current input power for the comparison and selected reference. Multiple-laser conditions are shown and mismatches remain explicitly noncomparable. No silent alteration to My Design.

The gameplay **Goal Score**, shown in the HUD after Test and broken down in the viewer, is:

| Criterion | Points | Rule |
|---|---:|---|
| Functional Gross |40| functional gross / required gross, capped; failed lanes excluded |
| Driver/RF |20| fraction of required lanes with supported packet, compatible configuration and existing RF screens |
| Optical |20| fraction with optical path, average/ER and applicable four-level/Heater screens |
| Placement/Routing |10|10 minus2 per geometry/placement error, lower bound0 |
| Level Goal |10| actual complete Level conditions, including RF baseline, Stable corners or Level8 snapshots/customer choice |

Subtotals round to0.1, total to an integer. A noncomplete goal can never display100. No component-coordinate similarity, architecture copying, reference usage penalty, or universal power/area ranking is used. Distinct passing designs can both score100. Power, area, envelope, RF, optical I/O and energy denominator remain separate trade-off metrics. This is a transparent educational completion index; it does not certify physics, BER, standards or manufacturing and does not change solver/model/schema versions.

Untested/modified design score is labelled Preview. “Test My Design” explicitly executes the real test and confirms the HUD score/valid level records. Merely viewing a score cannot award completion. Scores are recalculated rather than trusted from save data. Existing physics `score` is retained in solver output; the HUD now presents the separately computed Goal Score. This UI result is not a stored design field and Resume still requires a fresh Test.

Level8 engine references score90 until the two-architecture snapshot and customer-choice task is completed; opening/applying a single reference does not fabricate that history. The viewer explicitly explains the required workflow.

Actual local verification:110/110 unit tests (previous96 +14 scoring assertions), existing mobile13-group suite, guided-level9-group suite, and new7-group Solution browser suite passed. New tests cover all eight real touch Solution actions, read-only viewing/switching/comparison, fresh Test/HUD, partial-lane score and diagnosis, mismatched conditions and same-input normalization, Level8 noncompletion, landscape header, desktop mouse and offline/no-page-error execution. CI adds the Solution suite after the existing seven suites; final CI is checked on the published head. No physical device/native OS keyboard testing is claimed.

Level8 comparison also requires the same Customer constraint. The viewer uses the current selected Customer, and applying a reference preserves that condition while requiring a new explicit architecture choice and Test.
