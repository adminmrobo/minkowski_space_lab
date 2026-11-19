// 민코프스키 시공간 해설 — "숫자로 한 번 해 보기" 검산
// 실행: node code/check_minkowski.js   (c = 1, 공간은 x 한 칸)
let fail = 0;
const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
function check(name, ok, got) {
  console.log(`${ok ? "OK  " : "FAIL"} ${name}${got !== undefined ? "  → " + got : ""}`);
  if (!ok) fail++;
}
const interval = (t, x) => -t * t + x * x;            // 부호 약속 (−, +)
const euclid = (t, x) => t * t + x * x;               // 시간 칸도 더하면
const boost = (t, x, v) => {                          // 관찰자 바꾸기
  const g = 1 / Math.sqrt(1 - v * v);
  return [g * (t - v * x), g * (x - v * t)];
};
const r = (a) => Math.round(a * 100) / 100;

// 2번 방: 마이너스 하나 피타고라스
check("2번 O→A(5,3) 시공간 거리²", interval(5, 3) === -16, interval(5, 3));
check("2번 부호를 +로 하면 34", euclid(5, 3) === 34, euclid(5, 3));
const eu = [0, 0.6, 0.8].map((v) => r(euclid(...boost(5, 3, v))));
check("2번 +부호는 관찰자마다 흔들림 34 → 16 → 21.56", eu[0] === 34 && eu[1] === 16 && eu[2] === 21.56, eu.join(", "));

// 3번 방: 세 구역
check("3번 (5,3) 시간 쪽", interval(5, 3) < 0, interval(5, 3));
check("3번 (3,5) 공간 쪽", interval(3, 5) > 0, interval(3, 5));
check("3번 (4,4) 빛 테두리", interval(4, 4) === 0, interval(4, 4));

// 4번 방: 관찰자를 바꿔도 그대로 (쌍곡선 위)
for (const [t, x, s] of [[5, 3, -16], [3, 5, 16], [4, 4, 0]]) {
  for (const v of [0, 0.6, 0.8, -0.6]) {
    const [tp, xp] = boost(t, x, v);
    check(`4번 (${t},${x}) v=${v} → (${r(tp)}, ${r(xp)})`, near(interval(tp, xp), s), r(interval(tp, xp)));
  }
}
const [t6, x6] = boost(5, 3, 0.6);
check("4번 v=0.6이면 A는 같은 자리에서 4만큼 흐름", near(t6, 4) && near(x6, 0), `(${r(t6)}, ${r(x6)})`);

// 5번 방: 공간 쪽 사건은 순서가 뒤집힌다
const order = [0, 0.6, 0.8].map((v) => r(boost(3, 5, v)[0]));
check("5번 B(3,5)의 시각 3 → 0 → −1.67", order[0] === 3 && order[1] === 0 && order[2] === -1.67, order.join(", "));
const tl = [-0.99, -0.8, -0.6, 0, 0.6, 0.8, 0.99].every((v) => boost(5, 3, v)[0] > 0);
check("5번 시간 쪽 A(5,3)은 어느 관찰자에게도 나중", tl);

// 7번 방: 부호표
const metric = (d, t, x) => d[0] * t * t + d[1] * x * x;
check("7번 diag(1,1) → 34", metric([1, 1], 5, 3) === 34);
check("7번 diag(−1,1) → −16", metric([-1, 1], 5, 3) === -16);

// 대결: 원인 탐정 — 규칙 ① 거리² ≤ 0 ② Δt > 0
const canCause = (dt, dx) => interval(dt, dx) <= 0 && dt > 0;
const cards = [[5, 3, true], [3, 5, false], [4, 4, true], [-5, 3, false], [5, 4.9, true], [4.9, 5, false]];
cards.forEach(([dt, dx, want], i) =>
  check(`대결 카드 ${i + 1} (${dt}, ${dx}) → ${want ? "가능" : "불가"}`, canCause(dt, dx) === want, r(interval(dt, dx))));

// 일상 예시: GPS 위성 시계 (교과 수준 근삿값, 하루 μs)
check("GPS 45 − 7 = 38 μs/일", 45 - 7 === 38);

console.log(fail ? `\n${fail}개 실패` : "\n전 항목 통과");
process.exit(fail ? 1 : 0);
