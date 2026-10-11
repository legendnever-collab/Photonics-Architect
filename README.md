# Photonics Architect v0.3.0

Build → Identify Bottleneck → Edit Layout → Reroute → Test → Compare.

기존 1310 nm O-band 100G Engine을 보존하면서 직접 Placement와 Optical / RF Route를 개선하는 게임입니다. Dependency-free JavaScript / SVG; 단일 HTML은 서버·CDN·외부 Network 없이 실행합니다.

## Play offline

Download [photonics-architect-v0.3.0.html](dist/photonics-architect-v0.3.0.html) and open in a desktop browser. [Release ZIP](dist/photonics-architect-v0.3.0-release.zip) · [Source ZIP](dist/photonics-architect-v0.3.0-source.zip).

| Level | Goal | Completion Check |
|---|---|---|
| 1 · First 100G Engine | Laser → Splitter → 4 Modulator / EIC → 4 Output | Fresh VALID / 100G |
| 2 · Compact Engine | 같은 기능에서 Footprint 합 ≤6.4 mm² | Fresh VALID / 100G / area |
| 3 · Stable Engine | 온도 ±3 °C / 파장 ±0.03 nm 네 Corner | Fresh VALID / 각 Corner 100G |
| 4 · Shorten the RF Path | 시작 시 약한 RF Route의 길이와 손실 감소 | 100G 유지 / 목표 길이 / 오류 0 / 같은 환경 / Fresh Test |
| 5 · Route the Optical Engine | 고정 Keep-out을 우회하고 4 Optical Output 완성 | Average ≥−4 dBm / ER ≥4 dB / Floorplan·Route 오류 0 / Fresh Test |

Goal / NEXT ACTION / Canvas / HUD는 함께 보입니다. Fresh Test 후 Next Level을 선택하면 Engine과 Snapshot을 유지합니다. Level 선택으로 Replay / Free Exploration; 완료 기록을 복원해도 Test가 다시 필요합니다.

Route 클릭 → Inspector의 Edit Route → 흰 Waypoint를 마우스로 이동하거나 X/Y mm 입력. Waypoint 추가는 버튼 뒤 Canvas 클릭, 삭제는 Inspector에서 합니다. Grid Snap, Undo/Redo, Reset, Reroute / Simplify를 제공합니다. **Manual Waypoint는 고정되고 이동·회전한 부품의 Endpoint만 따라갑니다.** Reroute는 같은 Centerline의 불필요한 Point만 정리합니다. Keep-out 우회는 직접 편집하세요. Optical은 직각 Centerline, RF는 Straight 또는 Polyline입니다.

Level 4는 Baseline RF보다 25% 짧은 길이(최소 목표 0.35 mm)를 요구합니다. 이미 ≤0.35 mm인 유효한 Engine은 Fresh Test로 인정합니다. 별도 Practice는 사용자 Engine을 Original Engine Snapshot에 보존합니다. Level 5는 새로운 Keep-out 문제이며 Route가 짧아져야만 성공하는 목표가 아닙니다. Before / After에서 우회 손실 증가와 오류 감소를 함께 확인합니다.

MZM / MRM / EAM, Generic Educational EIC, Inspector, Lane Duplicate, Undo/Redo, numeric positions, rotation, zoom/pan, signal animation, Autosave/Resume, JSON paste import/export, PNG 및 Engineering Summary를 유지합니다. 파일 경로나 browser profile을 바꾸기 전 JSON Export를 권장합니다. IndexedDB는 동일 origin에서 유지되며 원본 Schema / C-band 데이터를 Archive합니다.

## Engineering scope

4 ×25 Gb/s NRZ =25 GBd/lane =100 Gb/s **Gross**. Net Throughput / FEC / protocol overhead는 모델링하지 않습니다. VALID는 Educational Requirement 충족이며 BER, Eye, 제조 가능성 검증이 아닙니다. 전력 경계는 Driver + Heater + EAM Bias이며 External Laser 전기전력은 제외합니다.

기존 O-band Device / Packet 모델은 0.2.1을 유지합니다. Solver / Route 모델은 0.3.0, Persistence Schema는 3입니다. 화면과 Solver가 동일한 Centerline을 사용합니다. Planning Rule Check는 Foundry DRC / LVS가 아닙니다. Optical×RF 교차는 별도 Domain이며 Short / 임의 손실을 주지 않습니다. 같은 Domain의 물리 Crossing은 Unsupported Warning입니다. 기존 Level 1–3 Auto Route의 부품 통과는 비차단 Warning으로 보존하고, Manual Route 및 Level 4–5에서는 수정해야 할 Error로 다룹니다.

[Routing Schema / Migration](docs/ROUTING_SCHEMA.md) · [Routing model / assumptions](docs/MODELS_V03.md) · [Preserved device models / Primary Sources](docs/MODELS_V02.md) · [Actual tests](docs/TEST_REPORT.md) · [Baseline](docs/BASELINE_V03.md) · [Handoff](docs/HANDOFF_v0.3.0.md).

## Develop / verify

Node 20+; no application runtime dependencies.

```sh
npm test
npm run build
node tests/browser.cjs
node tests/codesign-browser.cjs
node tests/levels-browser.cjs
node tests/routing-browser.cjs
python scripts/package.py
```

Browser suites require Playwright 1.62.1 and installed Chromium. `CODEX_PRIMARY_RUNTIME_NODE_MODULES` may point to shared modules; `BROWSER_EXECUTABLE` is optional. CI runs all four browser suites. Source can be served over localhost; the built HTML runs as a local file.

v0.2 baseline: `221e868758dc4a2c5368fcfd32476952b5b252c2`, PR #2 open/unmerged at verification. Development: `feature/v0.3-layout-routing-challenge`; stacked PR targets `feature/v0.2-modulator-eic-codesign`. No automatic merge, tag or formal GitHub Release.

![RF challenge](docs/v03-level4-before.png)
![RF Before / After](docs/v03-before-after.png)
![Optical Keep-out completed](docs/v03-level5-after.png)
