# 지식 그래프·참고문헌·페이지 서지 정의 → kg_{n}.json / refs_{n}.json / meta_{n}.json
# python3 build/kg_defs.py  (hilbert_space_lab/build/kg_defs.py와 같은 짜임)
import json, os
B = os.path.dirname(os.path.abspath(__file__))
SITE = 'https://adminmrobo.github.io/minkowski_space_lab/'
HSL = 'https://adminmrobo.github.io/hilbert_space_lab/'
DATE = '2026-11-19'
SERIES = '공간 시리즈 · 민코프스키 시공간'

def N(id, type, ko, en, page, anchor, level=1, df=None, fam='representation'):
    n = {"id": id, "type": type, "label": {"ko": ko, "en": en}, "page": page, "anchor": anchor, "level": level,
         "status": "known", "confidence": "high", "coverage": "explained", "family": fam, "domain": ["ai"], "match": []}
    if df: n["definition"] = {"ko": df}
    return n
def E(s, p, o, anchor='#bridge'):
    return {"s": s, "p": "lab:" + p, "o": o, "anchor": anchor, "confidence": "high"}

AWV = {"id": "awv_minkowski", "type": "graphic", "title": "Minkowski Space", "author": [{"literal": "askwhyvalley"}],
       "accessed": {"date-parts": [[2026, 11, 19]]},
       "lab": {"work": "lab:work/awv_minkowski", "role": "background", "supports": [], "locs": [],
               "verified": {"title": True, "author": True, "year": False, "url": False},
               "checkedBy": "사용자 제공 이미지에서 옮김. 원 게시물 주소·게시일은 받지 못함",
               "note": "구성과 식만 따르고 그림은 새로 그림"}}
CURR = {"id": "moe_curriculum", "type": "report", "title": "고등학교 수학·기하·물리학 교육과정", "author": [{"literal": "교육부"}],
        "lab": {"work": "lab:work/moe_curriculum", "role": "background", "supports": [], "locs": [],
                "verified": {"title": True, "author": True, "year": False, "url": False}, "checkedBy": "교과 단원 이름 대조"}}
PREV = {"id": "ahn_hilbert_lab", "type": "webpage", "title": "유클리드 공간 · 힐베르트 공간", "author": [{"family": "안", "given": "상선"}],
        "issued": {"date-parts": [[2026]]}, "URL": HSL,
        "lab": {"work": "lab:work/ahn_hilbert_lab", "role": "background", "supports": [], "locs": [],
                "verified": {"title": True, "author": True, "year": True, "url": True}, "checkedBy": DATE}}

def meta(title, num, url, about, based):
    return {"title": title, "series": SERIES, "number": num,
            "creator": [{"name": "안상선", "role": "author", "affiliation": "(주)M-Robo"}],
            "contributor": [{"name": "AI 보조 제작", "role": "assistant"}], "date": DATE, "version": "1.0", "language": ["ko"],
            "license": "", "url": SITE + url, "about": about, "basedOn": based, "educationalLevel": "입문",
            "learningResourceType": "interactive explainer", "registry": "KG_00_registry 0.2",
            "suggestedCitation": "안상선 (2026). " + title + ". " + SERIES + " " + num + ", v1.0."}

def write(n, kg, refs, mt):
    for name, obj in (('kg_', kg), ('refs_', refs), ('meta_', mt)):
        with open(os.path.join(B, name + n + '.json'), 'w', encoding='utf-8') as f:
            json.dump(obj, f, ensure_ascii=False, indent=1)
    print(n, len(kg['nodes']), 'nodes', len(kg['edges']), 'edges')

# ── m0 오리엔테이션 ──
P = 'm0_orientation'
m0n = [
 N('lab:concept/rotation-invariance', 'Concept', '돌려도 길이는 그대로', 'Rotation preserves length', P, '#bag1', df='화살표를 원점 둘레로 돌려도 x² + y²는 변하지 않아 끝점은 같은 원 위에 있다.', fam='math'),
 N('lab:concept/positive-norm', 'Concept', '길이²는 언제나 0 이상', 'Positive-definite norm', P, '#bag2', df='칸마다 제곱해서 더하므로 길이²는 0 이상이고, 0은 원점뿐이다.', fam='math'),
 N('lab:concept/hyperbola', 'Concept', '쌍곡선', 'Hyperbola', P, '#bag3', df='x² − y² = 일정인 점들. 일정한 값이 0이면 두 대각선이 된다.', fam='math'),
 N('lab:sim/m0-bag', 'Simulation', '가방 점검 실험 세 개', 'Bag-check experiments', P, '#bag', df='돌리기, 제곱 막대, 원과 쌍곡선 겹쳐 그리기.'),
 N('lab:concept/minkowski-space', 'Concept', '민코프스키 시공간', 'Minkowski space', 'm1_clock_corridor', 'm1_clock_corridor.html#r2', df='시간 1칸과 공간 3칸을 묶고, 시간 칸만 빼서 거리²를 재는 시공간.'),
 N('lab:concept/euclidean-space', 'Concept', '유클리드 공간', 'Euclidean space', 'e1_ruler_rooms', HSL + 'e1_ruler_rooms.html#r1', df='자와 각도기가 있는 n칸짜리 방.'),
 N('lab:concept/hilbert-space', 'Concept', '힐베르트 공간', 'Hilbert space', 'h1_arrow_rooms', HSL + 'h1_arrow_rooms.html#r1', df='길이·각도·그림자가 모두 되는 끝없는 방.'),
 N('lab:question/m0-ready', 'Question', '시계가 걸린 복도에 들어갈 준비가 됐나?', 'Ready for the clock corridor?', P, '#check'),
]
m0e = [
 E('lab:concept/rotation-invariance', 'partOf', 'lab:concept/euclidean-space'),
 E('lab:concept/positive-norm', 'partOf', 'lab:concept/hilbert-space'),
 E('lab:concept/hyperbola', 'prerequisiteOf', 'lab:concept/minkowski-space'),
 E('lab:concept/positive-norm', 'relatedTo', 'lab:concept/minkowski-space'),
 E('lab:concept/rotation-invariance', 'prerequisiteOf', 'lab:concept/minkowski-space'),
 E('lab:concept/hyperbola', 'demonstratedBy', 'lab:sim/m0-bag', '#bag'),
]
write('m0', {"version": "1.3", "page": P, "nodes": m0n, "edges": m0e}, [CURR, PREV, AWV],
      meta('민코프스키 시공간 0편 가방 점검 — 자·끝없는 방·쌍곡선', '0', 'm0_orientation.html',
           ['lab:concept/hyperbola', 'lab:concept/positive-norm'], ['moe_curriculum', 'ahn_hilbert_lab']))
