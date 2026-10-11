# Mission 001 — First Optical Engine

처음에는 빈 Canvas에서 시작한다. Palette에서 Laser와 Splitter를 배치하고 MZM·Driver·Output을 추가한다. Cyan Optical, Orange RF Port를 직접 연결한다. 흰색 Pulse Port가 다음 연결 위치를 안내한다. 하나의 Lane이 활성화되면 MZM Inspector에서 Lane 부품 복제를 제공한다. 복제는 Net을 자동 생성하지 않는다.

4-Lane Engine의 목표는 100 Gb/s gross, Lane당 출력 ≥0 dBm, RF 도달 전압 ≥2.5 V, bandwidth ≥17.5 GHz, 모든 Port 연결, Die Boundary·Overlap 위반 없음이다. 열린 Port와 부품 충돌은 BLOCKED, 부족한 Optical/RF Margin은 WARNING, 모든 제약 충족은 VALID다. VALID는 Foundry qualification이 아니다.

진단 버튼은 관련 Component를 선택한다. 끊어진 Optical path, 긴 RF, Overlap/Boundary는 모두 사용자가 수정 가능하다. Run 이후 활성 Net에 photon/RF flow를 표현한다. 움직임은 topology animation이며 calibrated optical power plot이 아니다. 숫자는 Lane diagnostics에서 읽는다.

Score는 Hard Constraints 충족 설계에만 제공한다. Functional 40%, Optical 25%, RF 25%, summed component area efficiency 10%. 세부 식은 SIMULATION_MODELS.md에 있다. 면적 점수는 공간 bounding box compactness가 아닌 총 footprint efficiency다. 이번 버전에서 모든 Packet 크기가 고정이므로 면적 점수의 다양성은 제한적이다.
