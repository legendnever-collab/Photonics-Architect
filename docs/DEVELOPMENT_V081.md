# v0.8.1 Mobile Canvas First / Architecture Tracks

Baseline: v0.8 RC PR #10, Head 7f04e9fdb37322b006bff4fe0167f7299a5fb181. Verify #78 completed SUCCESS. No main merge authorized.

Branch: feature/v0.8.1-mobile-architecture-tracks.

Checkpoint 1: existing solver/receiver/monitoring/persistence reused; stable architecture mission IDs added; six real stages per Fast & Narrow / Slow & Wide / WDM; stage-specific real tested solutions; one toggleable offline HTML; viewport shell and compact goal implemented. Existing missions retained in Advanced Labs. Legacy workspace containers migrated without changing saved mission IDs/revisions/extras. New UI QA is in progress; this checkpoint is not a release PASS claim.

Local browser environment: default Playwright 1.62 browser absent; installed Chromium headless_shell 1161 is available and launches. Full Chromium singleton requires a socket unavailable here; use installed headless_shell instead of downloading/retrying. System fonts only; Hangul glyph coverage must be disclosed if unavailable in screenshots.
