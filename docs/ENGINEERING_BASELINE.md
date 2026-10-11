# Authoritative baseline and release record

main verified2026-10-11:fa0383207a191b6c9a7b3ae749bf210f2137a467 (README-only). v0.1 PR#1 open,not merged; headc0a54d30c670d9dd1024d7cf7702df6b066bb90f. Both v0.1 GitHub workflows successful. Tree inspected:README/docs/source/tests/artifacts present; no AGENTS.md or other repository instruction file. Original local baseline rerun:12 unit tests and17 browser scenario groups pass.

v0.2 branch`feature/v0.2-modulator-eic-codesign` created directly from that v0.1 implementation commit. Neither PR is authorized for merge. Source upgrade preserves original interaction and persistence origin. v0.1 standalone and ZIPs remain available; v0.2 has new versioned artifacts, schema and solver.

Engineering scenario:4×25Gb/s NRZ=25GBd per lane,100Gb/s gross. No FEC/net rate calculation. Models and new requirements are documented in MODELS_V02.md. Planning Canvas mixes PIC and packaged EIC footprints; not a single foundry die or fabrication-ready design. Generic coefficients only; company attachments are not embedded in public repository.


v0.3 authoritative baseline and actual rerun results: [BASELINE_V03.md](BASELINE_V03.md). v0.3 uses actual v0.2 head 221e868758dc4a2c5368fcfd32476952b5b252c2, never README-only main. Routing assumptions supersede the legacy length description only for edited routes; see MODELS_V03.md.
