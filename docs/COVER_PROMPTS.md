# 그림 지시문 — 민코프스키 시공간 (16비트 RPG 픽셀아트)

> 연구실 해설 그림 지침: **모든 표지·대체 표지·장면 그림은 16비트 RPG 픽셀아트**로 받는다. 애니메이션 일러스트체로 받지 않는다.
> 캐릭터는 fruitfly-lab-expressions 기준 그림(박사·조수 하루·초파리 연구원·주판봇·시아·모아)을 참고 그림으로 함께 올리고, "같은 인물을 픽셀아트로" 다시 그리게 한다.
> 받는 순서: ① cover_index를 먼저 받아 그림체를 확인 → ② 그 그림을 참고 그림으로 함께 올려 나머지를 3~5장씩 같은 비율끼리 요청.
> 크기: 표지 16:9 → 1600×900 WebP, 장면 3:2 → 1200×800 WebP(한 편 합계 600KB 이하). 목차 썸네일·og:image는 표지에서 잘라 별도 폴더에.

## 공통 문구
> 실제로 붙이는 문구(캐릭터 생김새를 기본 그림에 맞춰 고친 판)는 **docs/genspark_pixel/** 꾸러미의 요청문 4개에 들어 있다. 박사는 흰 줄이 하나 있는 검은 머리와 청록 안경, 하루는 파란 줄이 섞인 분홍 머리 두 갈래 묶음, 초파리 연구원은 붉은 겹눈 헬멧, 주판봇은 베이지 모니터 머리와 주판 몸통, 시아는 검은 긴 머리·검은 메이드풍 연구복, 모아는 밝은 갈색 머리·겨자색 메이드풍 연구복이다.

## 표지 3장 (16:9)

### cover_index — 목차
> A long white pixel-art lab corridor seen from the side like an RPG dungeon hallway, seven doors in a row, a round pixel wall clock above each door showing different times. On the floor in front of door 1, a translucent pixel light cone: a green upper cone and a blue lower cone meeting at one glowing point, with thin red rim lines at 45 degrees. A dashed orange curve (hyperbola) floats beside the cone. Sia points at the glowing point, Moa holds a notebook and a stopwatch, the professor stands by door 1 with a key. + 공통 문구

### cover_m0 — 0편 가방 점검
> White pixel-art lab entrance like an RPG item shop counter. The professor holds a checklist; Sia opens a backpack and three items pop out with RPG item sparkles: a ruler with a purple circle, an infinity-shaped glowing scroll, and an orange hyperbola-shaped boomerang. Moa sips tea, the abacus robot waves "no need" with confidence. + 공통 문구

### cover_m1 — ① 시계가 걸린 복도
> White pixel-art lab room with a large grid floor. A big green-and-blue light cone sits in the middle; a golden event marker glows inside the upper cone and a purple marker sits outside to the side. A dashed orange hyperbola curve passes through the golden marker. Sia and Moa stand on either side like an RPG party, the pink-haired assistant raises a small referee flag, the abacus robot holds a tiny broken time-machine loop toy. + 공통 문구

## 방 장면 7장 (3:2)
| 파일 | 장면 |
|---|---|
| scene_m1_r1 | Sia drags a glowing golden dot on a pixel grid board with a vertical time axis (up arrow) and horizontal place axis; a parcel-tracking style ticket floats beside it. |
| scene_m1_r2 | A pixel balance scale: left pan has a blue "time" block with a minus sign glow, right pan has red/yellow/green "space" blocks; Moa checks it, the abacus robot tries to put all blocks on one pan. |
| scene_m1_r3 | A big pixel light cone on the floor: green top, blue bottom, red rim. Sia stands at the rim edge, a purple dot glows outside the cone; a pixel lightning bolt and a delayed thunder cloud in the distance. |
| scene_m1_r4 | Two panels side by side: a purple pixel circle with a dot orbiting it, and an orange hyperbola with a dot sliding along it; a pixel train passes by with Moa inside and the professor on the platform. |
| scene_m1_r5 | Two pixel lamps lit far apart (left and right), each with its own small light cone; a tilted blue dashed "now" line crosses the scene; the abacus robot looks confused, Moa holds two pocket watches. |
| scene_m1_r6 | A dashed loop path that tries to go back down in time breaks into red pixel shards at the bottom; the fruit-fly researcher inspects the break with a magnifier, the abacus robot looks embarrassed. |
| scene_m1_r7 | A 4×4 pixel tile board on the floor; the four diagonal tiles glow, the first one red with a minus sign shape, the others teal; the professor taps the red tile with a pointer, Moa nods. |

## 대결·아웃트로 (3:2)
| 파일 | 장면 |
|---|---|
| scene_m1_duel | RPG battle screen layout: Sia on the left looking at a big cone picture, Moa on the right with a calculator and a notepad, six pixel cards floating between them, the pink-haired assistant as referee with a flag in the center. |
| scene_m1_outro | Moa jumps with a sparkle (winner pose), Sia smiles a little sheepishly with a thumbs-up, the professor opens a door at the end of the corridor revealing a curved, saddle-like glowing floor with tree branches of dots spreading on it; the abacus robot scratches its head. (표정은 대결 결과 — 모아 승 — 와 맞춘다) |

## 저장 이름 체크리스트
- [ ] cover_index.webp · cover_m0.webp · cover_m1.webp (1600×900)
- [ ] scene_m1_r1~r7.webp · scene_m1_duel.webp · scene_m1_outro.webp (1200×800)
- [ ] thumbs/index.webp · thumbs/m0.webp · thumbs/m1.webp (표지에서 960폭으로 자름)
- [ ] og/ 폴더 — 페이지마다 og:image
