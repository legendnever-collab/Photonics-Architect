# Chapter Registry and preservation — v0.8.0

The existing 18 stable mission IDs and their completion predicates remain. The registry now contains 24 missions; chapter ownership is disjoint. Numbering is display metadata; stable IDs are persisted.

| Chapter | Stable IDs / global numbers | New blank start |
|---|---|---|
| Foundations | first, compact, stable, rf, optical /1–5 | empty first |
| Slow & Wide | scale400, scale1600 /6–7 | empty scale400 |
| Architecture Decisions | architecture /8 | empty architecture |
| Fast & Narrow | fastbuild /19 | empty fastbuild |
| WDM | wdmpath, wdmengine, wdmarchitecture /12–14 | empty wdmpath |
| Package Engineering | package, thermal, assembly /9–11 | empty package |
| Physical PIC | picfloor, picroute, picwdm, picoptimize /15–18 | empty picfloor |
| Complete Optical Link | rxfirst, linkcomplete, linkcustomer /20–22 | empty rxfirst |
| Monitoring & Testability | tapmonitor, faultdiagnosis /23–24 | empty tapmonitor |

Chapter Hub is a learning index, not an unlock prerequisite. Related chapters are guidance. Level8 remains actual architecture comparison, rather than being relabeled as a Fast build task. Chapter final action is **Chapter Complete → Choose Next Chapter**. It opens the Hub and never transfers a design into another chapter. Legacy Workspace keeps free mission exploration; historical Level18 still ends in Free Design.

## Storage

The existing IndexedDB database `photonics-architect` / object store `designs` is retained; no database delete or destructive schema upgrade. Original `current`, `backup`, named designs, legacy band archives and original-schema archives remain. The new key `chapter-workspaces-v08` stores workspace format1:

```
version, active, progress, legacyArchive,
records: [{id, current, revisions: [{design, view, extras}]}]
```

`view` is the four-element finite SVG viewport; each revision independently contains design inputs (including progress and snapshots), selected mission, and validated extras: reference backup, campaign archive, WDM originals, Physical originals and Link originals. Each mission belongs to one chapter; workspace `progress` is a unique global completion set for Hub display. It is not duplicated as separate contradictory chapter completion records. Tutorial completion is excluded from production progress.

On first v0.8 load, the validated existing current design, its extras and view become the Legacy revision. `legacyArchive` preserves the raw stored current input too; original-schema persistence archives remain. No existing layout is auto copied into newly selected chapters. Resume restores the selected revision, resets Undo/Redo history to that workspace, and invalidates old Test freshness. Switching stashes the source first. Autosave captures chapter/revision ownership when scheduled, so a pending old save cannot write into the new active chapter.

Start New creates a separate blank revision; Copy uses the explicitly chosen saved workspace/current as source; Clone creates a separate revision. Up to8 revisions per chapter are preserved. At the limit the action is rejected with export guidance; old revisions are never silently evicted. Existing snapshots remain inside their own design. Design creation clears old graph-dependent Tile/Array/FAU metadata, keeping no hidden replicated graph.

Copy Tx into Complete Link selects `linkcomplete` when an Output exists. It keeps the actual graph and parameters, exposes an explicit downstream Output port, infers real architecture and retains copied Physical/Package Tx definitions. Source revisions and protected originals remain independent. Copy is not an architecture conversion; changing an architecture selector does not rebuild an existing graph.

## JSON, validation and restore

Standalone JSON export includes the active design, legacy extras and entire `chapterWorkspaces` state. Validate all designs/views/extras before replacing state; a whole-workspace envelope must agree with its active design payload. Workspace imports preserve the pre-import workspace in `chapter-workspaces-v08-before-import` and a timestamped archive. Hub provides **최근 Workspace Import 이전 원본 복원**. The restore also archives the displaced current state. Imports into managed chapters from design-only/named/recovery create an appropriate chapter revision; they do not overwrite the previous revision. Import failure leaves current design intact. Legacy free exploration keeps its familiar import behavior and archives originals.

Original schemas1–7 remain accepted by existing migration logic. New Link graphs use schema8, `link.version=0.8.0`; older-only designs keep their established model/schema conventions. New schema stores architecture, original Tx brief/optional physical/package definition, customer, fault inputs/seed, and up to4 input-only monitoring plans. Plans hold graph/environment/link inputs, never trusted solver results. Old `completedLevels` now accepts up to24 known IDs; completed1–18 IDs remain unchanged. Results are always recomputed; a stored score cannot unlock a mission.

Link Solution originals use `link-originals-v08`, independently included in each revision's extras. The first pre-Apply design for each Link mission is protected; subsequent Applies do not replace it. Restore returns that input and requires a new Test. Both Campaign and header Solution buttons dispatch to the same Apply + actual Test path. Existing WDM, Physical, Snapshot, reference and archive systems remain; chapter switching loads their corresponding revision's originals.

Tutorial uses a separate `tutorial` record and records its return workspace. Real placements, ports and Test are required; Help/Skip/Finish return to the previous workspace. It never replaces a production revision or awards a production completion.

## Presentation and offline behavior

`pa-theme-v08` persists presentation-only Light/Dark choice; `pa-onboarding-v08` persists onboarding completion. Both self-contained HTML variants have the same application/solver/schema, differing only in initial theme. A saved preference overrides each file's initial theme. File-origin IndexedDB/localStorage sharing is browser policy: use JSON to transfer if a browser or moved file does not share storage. Chromium same-context cross-file sharing is covered by automated tests; it is not a guarantee for all browsers.

No fonts, CDN scripts, styles or runtime APIs are required. System fonts are used. Source links in Tips open only on explicit clicks. Offline tests block HTTP and execute the new HTML via `file:///`. Desktop Chromium and emulated Touch are distinct from physical-phone/native keyboard/Safari validation; see the executed QA report for actual coverage.

Build with Node≥20: `npm test`, `npm run build`. `npm run test:browser` requires externally installed Playwright/browser (CI installs them). The QA runner aliases historical fixture filenames to the **current v0.8 Light bytes**, records their SHA256, then restores historical published HTML/images. Final QA therefore exercises new v0.8 code while preserving historical deliverables.
