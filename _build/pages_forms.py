from common import page

UPLOAD_ICON = ('<svg viewBox="0 0 24 24" fill="none" stroke-width="1.2" aria-hidden="true">'
               '<rect x="3" y="4" width="18" height="16" rx="1"/><circle cx="9" cy="10" r="2"/>'
               '<path d="M21 17l-5-5-9 8"/></svg>')

FLOW = ["서비스 레벨 선택", "의뢰서 작성", "수거 방식 선택"]


def progress(current, lv3=False):
    steps = FLOW if lv3 else FLOW[:2]
    out = []
    for i, s in enumerate(steps, 1):
        cls = "is-done" if i < current else ("is-current" if i == current else "")
        out.append(f'<li class="{cls}" data-n="{i}">{s}</li>')
    return '<ol class="progress-steps">' + "".join(out) + "</ol>"


def side(kicker, title_lines, text, current, lv3=False, back="./request.html", back_label="Request"):
    t = "".join(f'<span class="line"><span>{l}</span></span>' for l in title_lines)
    return f"""        <aside class="form-side">
          <div class="sticky">
            <a class="link-arrow" href="{back}"><span class="arr">←</span> {back_label}</a>
            <p class="kicker">{kicker}</p>
            <h1 class="h2" data-lines>{t}</h1>
            <p class="soft">{text}</p>
            {progress(current, lv3)}
          </div>
        </aside>"""


def wrap(side_html, form_html):
    return f"""
    <section class="page-top section" style="padding-top:calc(var(--head-h) + clamp(40px, 6vw, 88px))">
      <div class="wrap grid form-shell">
{side_html}
{form_html}
      </div>
    </section>
"""


# ---- 공통 필드 -------------------------------------------------------------
def f_name(placeholder=""):
    ph = f' placeholder="{placeholder}"' if placeholder else ""
    return f"""          <div class="field">
            <label class="label" for="objName">Object name <span class="req">필수</span></label>
            <input class="input" type="text" id="objName" name="objName"{ph} required>
          </div>"""


def f_type():
    opts = "".join(
        f'<label class="option"><input type="radio" name="objType" value="{v}"{" required" if i == 0 else ""}><b>{v}</b></label>'
        for i, v in enumerate(["Clothing", "Bag", "Furniture", "Other"])
    )
    return f"""          <fieldset class="field">
            <legend class="label">Object type <span class="req">필수</span></legend>
            <div class="options inline">{opts}
              <div class="option-other"><span class="meta">Other :</span><input class="input" type="text" id="objTypeOtherText" name="objTypeOther" data-other-for="objType" aria-label="기타 종류 직접 입력" disabled></div>
            </div>
          </fieldset>"""


def f_options(legend, name, items, hint="", kind="radio", required=True):
    rows = []
    for i, (val, title, desc) in enumerate(items):
        req = " required" if (required and kind == "radio" and i == 0) else ""
        rows.append(f'<label class="option"><input type="{kind}" name="{name}" value="{val}"{req}><span><b>{title}</b><span>{desc}</span></span></label>')
    h = f'<p class="hint">{hint}</p>' if hint else ""
    req_label = '<span class="req">필수</span>' if required and kind == "radio" else '<span class="req">선택</span>'
    return f"""          <fieldset class="field">
            <legend class="label">{legend} {req_label}</legend>
            {h}
            <div class="options">{"".join(rows)}</div>
          </fieldset>"""


def f_upload(hint, max_files):
    return f"""          <div class="field">
            <p class="label">Upload photos <span class="req">최대 {max_files}장</span></p>
            <p class="hint">{hint}</p>
            <div class="upload" tabindex="0" role="button" aria-label="사진 업로드">
              <input type="file" id="objPhotos" name="photos" multiple accept="image/*" data-max="{max_files}">
              {UPLOAD_ICON}
              <strong>클릭하거나 사진을 끌어다 놓으세요</strong>
              <span class="meta">JPG · PNG · HEIC</span>
            </div>
            <ul class="file-list" aria-live="polite"></ul>
          </div>"""


def f_text(label, id_, hint="", placeholder="", rows=7):
    h = f'<p class="hint">{hint}</p>' if hint else ""
    ph = f' placeholder="{placeholder}"' if placeholder else ""
    return f"""          <div class="field">
            <label class="label" for="{id_}">{label} <span class="req">필수</span></label>
            {h}
            <textarea class="textarea" id="{id_}" name="{id_}" rows="{rows}"{ph} required></textarea>
          </div>"""


def actions(label="Submit"):
    return f"""          <div class="form-actions">
            <p class="form-error" aria-live="polite"></p>
            <button type="submit" class="btn btn-solid">{label} <span class="arr">→</span></button>
          </div>"""


SIZES_LONG = [
    ("Small", "Small", "한 손에 들어오는 소형 소품 및 패션 잡화 (지갑, 파우치, 장갑, 벨트 등)"),
    ("Medium", "Medium", "일반적인 수거 박스에 담기는 크기의 의류 및 소형 가구 (재킷, 토트백, 1인용 스툴/의자 등)"),
    ("Large", "Large", "부피가 큰 아우터 및 개별 배송이 필요한 대형 가구 (롱코트, 벤치, 다이닝 테이블, 선반 등)"),
]
SIZES = [
    ("Small", "Small", "소형 소품 및 패션 잡화 (지갑, 파우치, 벨트 등)"),
    ("Medium", "Medium", "의류 및 소형 가구 (재킷, 토트백, 1인용 스툴/의자 등)"),
    ("Large", "Large", "부피가 큰 아우터 및 대형 가구 (롱코트, 벤치, 테이블 등)"),
]


# --------------------------------------------------------------------------
# 서비스 레벨 선택
# --------------------------------------------------------------------------
def request_form():
    cards = [
        ("lv1", "./request2.png", "낡은 가죽 지갑", "Lv1. Standard", "표면 처리",
         "구조를 바꾸지 않고 표면을 처리 및 보존하며, 소재 본연의 자연스러운 경년 변화를 유지하며 돋보이게 합니다.", ""),
        ("lv2", "./request3.png", "닳은 가죽 재킷", "Lv2. Advanced", "구조적 봉합",
         "가시적인 스티치나 패치를 통해 구조를 보강하여, 수선 흔적 자체를 물건의 정체성으로 만듭니다.", ""),
        ("lv3", "./request4.png", "식물을 심은 부츠", "Lv3. Masterpiece", "재구성",
         "물건들이 가지고 있는 역사는 보존하면서 형태를 변형하고 새로운 오브제를 만들어 사물을 재해석합니다.",
         "*원형이 변경될 수 있습니다. 작업 진행 전 1:1 상담이 필수입니다."),
    ]
    picks = "\n".join(
        f"""            <label class="pick" data-reveal>
              <input type="radio" name="level" value="{v}">
              <span class="pick-check" aria-hidden="true"></span>
              <span class="fig-media"><img src="{img}" alt="{alt}" loading="lazy"></span>
              <span class="pick-body"><span class="pick-title">{t}</span><span class="kr">{kr}</span><p>{d}</p>{f'<span class="note">{n}</span>' if n else ''}</span>
            </label>"""
        for v, img, alt, t, kr, d, n in cards
    )
    side_html = side("§ 04.1 — Start a Request", ["Start a", "<em>Request</em>"],
                     "진행하실 서비스 레벨을 하나 선택해 주세요. 레벨에 따라 의뢰서 항목이 달라집니다.", 1)
    form = f"""        <form class="form-main" data-flow="level" novalidate>
          <div class="field" style="border-top:1px solid var(--ink)">
            <p class="label">Service level <span class="req">필수</span></p>
            <div class="pick-grid" data-pick-required="level" data-pick-message="진행하실 서비스 레벨(Lv1 ~ Lv3)을 하나 선택해 주세요.">
{picks}
            </div>
          </div>
{actions("Next")}
        </form>"""
    return page("Start a Request — patina", "patina 서비스 레벨 선택", wrap(side_html, form))


# --------------------------------------------------------------------------
# Lv1 / Lv2 / Lv3
# --------------------------------------------------------------------------
def lv1():
    side_html = side("§ 04.2 — Lv1", ["Request:", "<em>Standard</em>"],
                     "표면 처리 — 구조를 바꾸지 않고 소재 본연의 경년 변화를 지켜요.", 2,
                     back="./request_form.html", back_label="레벨 다시 선택")
    form = f"""        <form class="form-main" id="lv1RequestForm" data-flow="request" data-label="Lv1. Standard" novalidate>
{f_name()}
{f_type()}
{f_options("Size", "objSize", SIZES_LONG)}
{f_upload("현재 제품의 상태가 잘 드러나는 이미지 1~5장", 5)}
{f_text("Additional notes", "objNotes", "요청사항과 제품에 담긴 추억에 대해 자유롭게 서술해주세요!")}
{actions()}
        </form>"""
    return page("Request: Standard — patina", "Lv1 Standard 의뢰서", wrap(side_html, form))


def lv2():
    side_html = side("§ 04.2 — Lv2", ["Request:", "<em>Advanced</em>"],
                     "구조적 봉합 — 가시적인 스티치와 패치로 수선 흔적을 정체성으로 만들어요.", 2,
                     back="./request_form.html", back_label="레벨 다시 선택")
    stitch = [
        ("Cross", "Cross-Stitch (X)", "직관적이고 단단한 결합력을 보여주는 전통적인 십자형 구조 봉합"),
        ("Running", "Running-Stitch (---)", "절제미가 돋보이며 사물의 실루엣을 따라 흐르는 미니멀한 일직선 홈질"),
        ("Blanket", "Blanket-Stitch (⊓)", "헤진 단면과 모서리를 완벽하게 감싸 안아 추가 마모를 방지하는 외부 마감"),
    ]
    patch = [
        ("Denim", "Heavy Denim", "세월의 워싱 흔적이 남아있어 튼튼하고 빈티지한 무드를 자아내는 데님 패치"),
        ("Leather", "Vegetable Leather", "시간이 흐를수록 은은하게 에이징되며 깊은 경년변화를 선사하는 천연 가죽"),
        ("Canvas", "Rough Canvas", "밀도 높은 짜임새로 가구 표면이나 가방 바닥면 보강에 탁월한 캔버스 천"),
    ]
    form = f"""        <form class="form-main" id="lv2RequestForm" data-flow="request" data-label="Lv2. Advanced" novalidate>
{f_name()}
{f_type()}
{f_options("Size", "objSize", SIZES)}
{f_options("Stitch pattern", "stitchPattern", stitch, "구조 보강에 사용될 가시적인 자수 스티치 기법을 고릅니다.")}
{f_options("Reinforcement patch", "patchMaterial", patch, "물리적 손상 부위를 덧댈 파티나 아카이브 원단 베이스 (중복 선택 가능)", kind="checkbox", required=False)}
{f_upload("손상 부위 이미지 5~10장 (찢어지거나 마모된 부위 상세 컷 필수)", 10)}
{f_text("Additional notes", "objNotes", "Free description of your request")}
{actions()}
        </form>"""
    return page("Request: Advanced — patina", "Lv2 Advanced 의뢰서", wrap(side_html, form))


def lv3():
    side_html = side("§ 04.2 — Lv3 · Pre-diagnosis", ["Request:", "<em>Masterpiece</em>"],
                     "재구성 — 원형이 변경될 수 있어요. 사전 진단서를 바탕으로 1:1 상담 후 작업을 진행합니다.", 2, lv3=True,
                     back="./request_form.html", back_label="레벨 다시 선택")
    form = f"""        <form class="form-main" id="lv3RequestForm" data-flow="diagnosis" novalidate>
{f_name("사물의 고유한 명칭을 입력해 주세요")}
{f_type()}
{f_options("Size", "objSize", SIZES)}
{f_upload("현재 상태 이미지 1~5장 (전체 및 파손 부위 필수)", 5)}
          <fieldset class="field">
            <legend class="label">공개 범위 <span class="req">필수</span></legend>
            <p class="hint">완성된 작업물을 파티나 아카이브에 어디까지 공개할지 선택해 주세요.</p>
            <div class="segment">
              <label><input type="radio" name="publicity" value="Public" required><span>공개</span></label>
              <label><input type="radio" name="publicity" value="Partial"><span>부분 공개</span></label>
              <label><input type="radio" name="publicity" value="Private"><span>비공개</span></label>
            </div>
          </fieldset>
{f_text("Request details & additional materials", "objDetails", "Please describe your request and specify any additional materials needed.", "재구성하고 싶은 사물의 새로운 용도나, 추가하고 싶은 소재(가죽, 금속 등)에 대해 상세히 적어주세요.")}
{f_text("1:1 Consultation", "objConsult", "Please specify your constraints and budget. Work will proceed after the consultation.", "예산 범위나 희망 작업 기간, 그 외 디자이너와 상의하고 싶은 제약 사항을 입력해 주세요.")}
{actions("Next")}
        </form>"""
    return page("Request: Masterpiece — patina", "Lv3 Masterpiece 사전 진단서", wrap(side_html, form))


# --------------------------------------------------------------------------
# 수거 방식
# --------------------------------------------------------------------------
def collection():
    side_html = side("§ 04.3 — Collection", ["Choose your", "<em>collection method</em>"],
                     "의뢰를 마무리하기 위해 사물을 전달할 방법을 골라 주세요.", 3, lv3=True,
                     back="./request_form_lv3.html", back_label="진단서로 돌아가기")
    form = """        <form class="form-main" data-flow="collection" novalidate>
          <div class="field" style="border-top:1px solid var(--ink)">
            <p class="label">Collection method <span class="req">필수</span></p>
            <div class="pick-grid two" data-pick-required="method" data-pick-message="의뢰를 마무리하려면 수거 방식을 하나 골라 주세요.">
              <label class="pick" data-reveal>
                <input type="radio" name="method" value="box">
                <span class="pick-check" aria-hidden="true"></span>
                <span class="fig-media"><img src="./donate4.png" alt="가방과 소품을 담은 수거 키트" loading="lazy"></span>
                <span class="pick-body"><span class="pick-title">Send patina Box</span><span class="kr">수거 키트 발송</span><p>patina 전용 오브젝트 전송 키트를 발송해 드립니다. 수거 대상 사물을 해당 안심 박스에 안전하게 패킹하여 동봉된 반송 라벨과 함께 집 앞에 두시면 자동 수거가 진행됩니다.</p></span>
              </label>
              <label class="pick" data-reveal>
                <input type="radio" name="method" value="dropoff">
                <span class="pick-check" aria-hidden="true"></span>
                <span class="fig-media"><img src="./Frame 85.png" alt="스튜디오 작업대에서 상담하는 모습" loading="lazy"></span>
                <span class="pick-body"><span class="pick-title">Self Drop-off</span><span class="kr">스튜디오 방문</span><p>수거 대상 물품을 소지하시고 연세대학교 인근에 위치한 patina 아카이브 창작 스튜디오룸에 직접 방문하여 전달해 주세요. 디자이너와 사물의 상태를 보며 직접 심도 깊은 컨설팅을 나눌 수 있습니다.</p></span>
              </label>
            </div>
          </div>
""" + actions() + """
        </form>"""
    return page("Choose Collection Method — patina", "patina 수거 방식 선택", wrap(side_html, form))
