# v0.8.1 Mobile Canvas First / Architecture Tracks

Baseline: v0.8 RC PR #10, Head 7f04e9fdb37322b006bff4fe0167f7299a5fb181. Verify #78 completed SUCCESS. No main merge authorized.

Branch: feature/v0.8.1-mobile-architecture-tracks.

Checkpoint 1: existing solver/receiver/monitoring/persistence reused; stable architecture mission IDs added; six real stages per Fast & Narrow / Slow & Wide / WDM; stage-specific real tested solutions; one toggleable offline HTML; viewport shell and compact goal implemented. Existing missions retained in Advanced Labs. Legacy workspace containers migrated without changing saved mission IDs/revisions/extras. New UI QA is in progress; this checkpoint is not a release PASS claim.

Local browser environment: default Playwright 1.62 browser absent; installed Chromium headless_shell 1161 is available and launches. Full Chromium singleton requires a socket unavailable here; use installed headless_shell instead of downloading/retrying. System fonts only; Hangul glyph coverage must be disclosed if unavailable in screenshots.

Checkpoint 2: 335 Unit PASS/0 FAIL. All 36 Track references validate actual throughput/receiver/monitor conditions. New UI suites passed all 24 Legacy mission predicates and schema7/RC workspace migration/atomic reject/theme PNG checks. Seven mobile viewports measured Canvas65.5–78.6% portrait and55.2–56.9% landscape; no body scroll/overflow and44px bottom targets. The three Tracks have completed all18 stages through real Solution→Test→Next UI actions.

Remaining finalization: complete whole-workspace large-paste/touch suite, freeze exact final hash, publish current evidence and source package, PR and final CI. Large9.75MB one-line textarea layout caused an installed Chromium renderer crash; a native paste handler now retains the complete JSON while showing a bounded12KB preview, and Workspace validation avoids unnecessary duplicate clones. This is under final UI validation; no old-build PASS is substituted.
