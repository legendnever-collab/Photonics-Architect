# v0.8 development checkpoints

Baseline main:5da597a1096c0be2d848f034805b99a9320ea0ca, PR #9 merged by explicit user approval. Main Verify run38572932246 SUCCESS. Local baseline261 tests PASS/0 FAIL. No repository AGENTS.md was found. Work is isolated from the historical ZIP modification in the prior checkout.

P0 checkpoint: disjoint Chapter Registry (24 stable mission IDs), empty chapter starts, explicit Copy, independent Resume/revisions, Legacy Workspace preservation, chapter-specific original/snapshot/archive/view payloads and captured autosave ownership. Receiver graph/model scaffolding is introduced separately so the new chapter IDs are executable rather than fake goal labels. Underlying legacy Tx/PIC/Package solvers retain their equations. Build output remains executable throughout development.

This checkpoint is not a completed v0.8 release. Theme, onboarding, receiver interaction, monitoring visualization, evidence docs and full browser regression are still being developed. Intermediate CI may still use historical build fixtures; release CI will switch all fixtures to current0.8 only after UI regression is exercised. No automatic merge.

P1 checkpoint: Light/Dark token-based UI and SVG contrast, persistent presentation-only Theme toggle, theme-correct PNG, skippable Onboarding, explicit legacy Resume and separately preserved interactive Receiver tutorial. Mouse placement of four actual blocks and three actual Port connections + real Test passed. Tutorial completion restores the prior Workspace and does not award production Chapter progress. Header/control/canvas overlap was checked and corrected; screenshots inspected, Korean QA font installed only for test rendering. Existing physical heatmap scale/model stays unchanged.
