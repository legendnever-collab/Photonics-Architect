# End-to-End Architecture Tracks / v0.8.1

Single executable: `dist/photonics-architect-v0.8.0.html` (app version 0.8.1, filename retained by user request). Light default; user choice stored under `pa-theme-v08`. Design/Solver/Progress are shared between Themes. The older twin HTML files are removed from this release; Git history retains them.

## Track registry

| Track | Stable mission IDs | Gross architecture | Receiver |
|---|---|---|---|
| Fast & Narrow | fast-track-1 … fast-track-6 | 8×200G PAM4 /100GBd | 8 Ge200 + TIA200 |
| Slow & Wide | slow-track-1 … slow-track-6 | 16×100G PAM4 /50GBd | 16 Ge100 + TIA100 |
| WDM | wdm-track-1 … wdm-track-6 | 4 Spatial×4λ×100G PAM4 /50GBd | 4 Demuxes, 16 Ge100 + TIA100 |

All display Level numbers are local to the selected Track, starting at 1. Source: `src/track-models.js`. Generated registry: `data/chapter-registry-v0.8.0.json`. Mission IDs are stable; old 24 IDs remain unchanged in optional Advanced Labs / Legacy.

Each Track has six phases: first Tx Channel/Path →1.6T expansion → actual Manual Optical Route/Output Interface screen → all Channel/Rx connections → DC Monitor/Optical Probe → observed Fault answer and whole-Link Summary. The third phase requires a real Manual Optical Route with the unchanged geometry/loss checks. Advanced Physical PIC/Package/Thermal/Assembly Labs remain optional.

Stage 1 uses 200G/100G for one Fast/Slow Lane or 400G for one 4λ Path. The previous aggregate 1.6T goal is replaced only for this educational stage; existing per-lane RF, optical response, wavelength, bias, route and power checks are retained. No new physics coefficients or actual product qualification are introduced.

The prior public Educational models remain authoritative: O-band 1304/1308/1312/1316nm WDM grid; nominal 25°C Data-PD/TIA profiles; Average+OMA+Peak+BW+Bias are separate requirements. Main-path Tap power conservation and Monitor/DC Readout range are retained. Fault coverage can be 50–75%, with Ambiguous required where observations cannot separate causes. Tx→Rx budget is nominal; the fault exercise changes installed Monitor readings through the documented signatures, not a full receiver degradation/BER model. Thermal Summary explicitly reports unsupported high-rate junction/Receiver behavior. External laser/DSP/FEC power and Net throughput remain unmodeled.

## Independent workspace / migration

The IndexedDB primary key remains `chapter-workspaces-v08`; JSON exports include every Workspace. Each record independently owns Current Design, bounded retained revisions, view, Snapshot and protected original/backup extras. New Track entry is empty. Copy is explicit and validates Architecture compatibility; receiver graphs cannot be silently converted to Tx-only stages. Same-Track Next preserves exact components/nets. Resume and Start New are different actions. A new revision preserves previous revisions, with an explicit eight-revision cap instead of deleting originals.

RC containers `fast-narrow`, `slow-wide`, `wdm` holding old mission IDs migrate to `advanced-fast`, `advanced-slow`, `advanced-wdm`. Stable IDs, completed progress, saved designs, all revisions, views, legacy archive and backup extras are preserved. New Track records are independent. Migration is cloned and validated before activation. Existing v0.7 schema7/current/named saves remain recoverable; unsupported or malformed JSON is rejected atomically. Fresh Test is required after Resume/Import/Undo/Restore/Next.

Tutorial is independent and displays Step 1–3: four placements → three Port connections → actual 25G NRZ Receiver Test. Skip returns to the prior Workspace; Replay creates a retained Tutorial revision. Tutorial progress never marks a Track mission complete.

## Solutions and score

Current Level Solution Apply →actual Solver Test →goal predicate →Next. First-level solutions contain only the first Lane/Path, never a completed 1.6T Receiver/Monitor graph. Full Track Solution has a separate explicit read-only preview; it does not overwrite the current step. The original is protected per Workspace/mission, and Undo/Restore is retained. Reference/Score can be viewed in More; guide actions target actual editable components/routes. Score cannot compensate an invalid mission and 100 is not required for link completion.

Generated verification records for all 36 current-stage references are in `data/track-solutions-v0.8.1.json`; exact construction is in `src/link-engine.js`. Final Summary recomputes actual tested Throughput, receiver/channel counts, nominal optical budget, modeled power, observable faults/access, limitations and the architecture trade-off. Its next-Track action starts an empty Design; previously visited Tracks show explicit Resume/Start New choices.

## Mobile shell

Fixed viewport: Compact Track Header →88px Goal (60px landscape) →remaining Canvas →44px-target bottom actions. Goal details, reasons and results are overlays with internal scrolling. Add/Inspect panels are closed initially; More owns Theme, Help, Export, Solution/Compare/Snapshot/Score. Canvas Tools are a small expandable floating control. `visualViewport` height and safe-area insets determine layout; body scrolling/overflow are suppressed. The default mobile Solution view focuses a real component at a readable scale; Fit All remains explicit. Port hit selection keeps the original 44px neighborhood and ambiguity chooser.

Executed results and exact tested build hash: TEST_REPORT_V081.md and artifacts/v081-qa/. Physical devices/Safari and native keyboard are not claimed tested.

Large paste (>250KB) keeps the complete clipboard text in memory and displays only a12KB Preview with the original size and explicit Import action. Clear/Paste New resets the buffer; imported content is the complete JSON, never the truncated Preview. This avoids an extremely long unwrapped textarea line overwhelming browser text layout. Paste is still required; no file upload path is introduced.
