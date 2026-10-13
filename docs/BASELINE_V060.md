# v0.6 authoritative baseline

Verified2026-10-13 KST. PR6 was OPEN at Head3ea3a628464351468c801df8639f5f4d95fd5bd6; Verify run38318110746 SUCCESS. Its39-file diff was inspected, then merged to main as5380f23ddbc0862b02fb34dffce8e49e7705f272. PR7 was OPEN at Headf5ff60af05d5ed2742c47361f5e03776b3bf989a; Verify run38323223417 SUCCESS (prior release173 tests). Its52-file incremental diff was inspected and retargeted from the package branch to main. The retargeted merge tree matched the approved Head tree55111fa7b1f865f4e067d8e2231d1cb656af9ca8 exactly. PR7 was then merged as9108f1e38d352c3ee0104820801c024359a054ad. Neither preceding merge bypassed a failed Head CI.

New branch:feature/v0.6-wdm-architecture, created at merged main9108f1e38d352c3ee0104820801c024359a054ad. Main's push Verify run38325915244 completed SUCCESS. The local baseline tree matched the remote tree. No AGENTS.md was present in the repository tree. Source, physics, campaign registry, result views and persistence were read before implementation.

Legacy Solver0.3.0 / scaling0.4.1 / package0.5.0 and their coefficients are preserved. WDM Solver0.6.0 is a new explicit Level12–14 scope. Existing Levels1–11 retain their predicates and scores; Level11 now has Next12, and final completion moves to14. Old HTML artifacts are preserved; older filenames used by browser fixtures are temporary test aliases only.
