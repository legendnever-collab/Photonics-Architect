# Roadmap

v0.2 권장: 첫 플레이 사용자 평가 후 placement ghost와 compatible-port 강조, editable routing waypoint, obstacle-aware routing, richer success milestone를 먼저 개선한다. 이어서 Driver Packet capability schema와 MZM size/voltage/bandwidth 선택을 도입해 같은 100G 목표에 여러 설계 해법을 만든다.

MRM/EAM은 별도 transfer function·bias·thermal·driver requirement 모델과 정확한 학습 목표를 정의한 후 추가한다. 26G/52G/112G/224G/448G-class는 symbol rate, bit rate, modulation format을 분리하고 검증된 evidence와 함께 도입한다. WDM·1.6T·3.2T·TIA/Control·thermal·GDS-oriented export는 후속 단계다.

Core separation: data definitions → instance graph/geometry → deterministic optical/electrical solver → validation/scoring → UI. A future packet adds definitions and resolver logic, not canvas-specific physics. v0.1 uses ES modules; introduce TypeScript and split library/schema modules before external packets grow.
