# v0.8.1 Mobile Canvas First / Architecture Tracks

Baseline: v0.8 RC PR #10, Head 7f04e9fdb37322b006bff4fe0167f7299a5fb181. Verify #78 completed SUCCESS. No main merge authorized.

Branch: feature/v0.8.1-mobile-architecture-tracks.

Checkpoint 1: existing solver/receiver/monitoring/persistence reused; stable architecture mission IDs added; six real stages per Fast & Narrow / Slow & Wide / WDM; stage-specific real tested solutions; one toggleable offline HTML; viewport shell and compact goal implemented. Existing missions retained in Advanced Labs. Legacy workspace containers migrated without changing saved mission IDs/revisions/extras. New UI QA is in progress; this checkpoint is not a release PASS claim.

Local browser environment: default Playwright 1.62 browser absent; installed Chromium headless_shell 1161 is available and launches. Full Chromium singleton requires a socket unavailable here; use installed headless_shell instead of downloading/retrying. System fonts only; Hangul glyph coverage must be disclosed if unavailable in screenshots.

Checkpoint 2: 335 Unit PASS/0 FAIL. All 36 Track references validate actual throughput/receiver/monitor conditions. New UI suites passed all 24 Legacy mission predicates and schema7/RC workspace migration/atomic reject/theme PNG checks. Seven mobile viewports measured Canvas65.5–78.6% portrait and55.2–56.9% landscape; no body scroll/overflow and44px bottom targets. The three Tracks have completed all18 stages through real Solution→Test→Next UI actions.

Remaining finalization: complete whole-workspace large-paste/touch suite, freeze exact final hash, publish current evidence and source package, PR and final CI. Large9.75MB one-line textarea layout caused an installed Chromium renderer crash; a native paste handler now retains the complete JSON while showing a bounded12KB preview, and Workspace validation avoids unnecessary duplicate clones. This is under final UI validation; no old-build PASS is substituted.

Final local candidate: exact HTML SHA25677c52eae6ff0df522c1fd3aabfcbfc7dd078af9060cfda23be7dc4d3f680b5be;335 Unit PASS/0 FAIL;242 browser assertions PASS/0 FAIL across4 current-build suites. Entire18-stage progression and large9.75MB Paste Restore passed. Screenshots and raw logs recorded. Existing solver/PD/TIA/monitor coefficients retained. Next: publish release artifacts/Source ZIP and verify final Head CI independently. Main must remain unmerged until review.

## Release finalization recovery (2026-10-15)

Recovered the previous Work local checkout and retained an untouched original at `/workspace/scratch/5b3748aa51d2/Photonics-Architect`; continued from a complete copy. Remote recovery checkpoint was853513801e7cebc9b4c72b3e2a5b47d1fcf97cc6 (Verify38651039587 SUCCESS), while the local checkout still had baseline7f04e9f plus unpublished final changes. Rebased the index onto the remote checkpoint without discarding working files. No new gameplay or layout changes were introduced during recovery.

Rebuilt the recovered latest Source: HTML SHA256 remains77c52eae6ff0df522c1fd3aabfcbfc7dd078af9060cfda23be7dc4d3f680b5be, exactly matching the archived tracks-browser result and full-suite results. Re-ran all335 Unit tests:335 PASS/0 FAIL. Reused the existing same-build242 browser assertions; the tracks log records9751568-byte actual Workspace Paste Restore and163 UI assertions. The3 other suite logs retain32/24/23 checks respectively. Archived evidence is committed, including the original separate score-suite execution disclosure; this is not a claim that the recovered checkpoint's old CI ran the final candidate.

Publish Source + single HTML first, then optional Source ZIP; verify final Head CI independently. The filename remains `photonics-architect-v0.8.0.html` per the established single-executable contract, and its application version is0.8.1. PR should target `feature/v0.8-complete-optical-link`: this is a stacked correction based on unmerged PR#10, with merge-base7f04e9f. Neither PR may be merged without user review.
