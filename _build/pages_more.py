from common import page, fig

AV = ' class="is-available"'
NOTE = ' class="note"'


# --------------------------------------------------------------------------
# ARCHIVE
# --------------------------------------------------------------------------
ENTRIES = [
    ("001", "Graft 001", "Chair", "./G001.png", "나무 의자 Graft 001",
     "사용자의 반려의자는 오랜시간 자리를 지켰습니다. 오랜시간의 가구 그 헤리티지를 유지하고 들이기 위한 대안모델, 참여의자이며 수리를 지속하고 싶다는 사용자 지향 그 문맥이 형태를 완성하였습니다."),
    ("002", "Graft 002", "All-in-one desk", "./G002.png", "책상 판이 더해진 의자 Graft 002",
     "이번 과제는 Graft 001의 연장선으로써 책상과 클라이언트의 동선의 니즈가 되어 주었습니다. 부드러운 형태 스틸을 활용하여 사용자가 작업에 집중할 수 있도록 미니멀하고 실용적으로 디자인한 가구입니다."),
    ("003", "Graft 003", "Apron", None, "",
     "사물의 흔적을 미려한 접합에서 실용적인 가치를 연장선 방향을 과제로 삼았습니다. 시간 형상에나 이음새에서 사용자들의 신뢰를 보강하는 방식으로 가장 살려주었으며, 데님 섬유의 질간 내구성을 배경으로 수선과 마감이 반복될 수 있는 구조를 갖추었습니다."),
    ("004", "Denim 004", "Potina", "./G004.png", "등받이를 재구성한 의자 Denim 004",
     "사용자의 헤리티지를 고스란히 담아 완전히 새로운 형태의 Potina를 제작했습니다. 의자 등받이를 떼어 롤 코드를 들이고, 이례코드 대용 이지가 조합되지 않게끔 만들어 전체 단면 형태에 가치를 연출하였습니다."),
]

LOG = [
    ("2025/11/25", "Graft 001", "RAGKE", "Returned", False, "001", "./G001.png"),
    ("2025/12/30", "Graft 002", "DEADOUD", "Returned", False, "002", "./G002.png"),
    ("2026/05/13", "Graft 003", "KIMDILDI00", "Returned", False, "003", ""),
    ("2026/05/23", "Graft 004", "GEUNHOHO", "Available", True, "004", "./graft004.png"),
]


def archive():
    entries = []
    for no, title, sub, img, alt, text in ENTRIES:
        if img:
            media = fig(img, alt, f"Fig. {no}", sub, ratio="")
        else:
            media = ('<figure class="fig" data-reveal="img"><div class="fig-media"><div class="plate-empty">Image forthcoming</div></div>'
                     f'<figcaption><span>Fig. {no}</span><span>{sub}</span></figcaption></figure>')
        entries.append(f"""        <article class="entry" id="entry-{no}">
          <span class="entry-no" data-reveal>{no}</span>
          {media}
          <div class="entry-text">
            <span class="tag" data-reveal>{sub}</span>
            <h3 class="h2" data-lines><span class="line"><span>{title}</span></span></h3>
            <p data-reveal>{text}</p>
          </div>
        </article>""")
    entries = "\n".join(entries)
    rows = "\n".join(
        f'            <tr{AV if hi else ""} data-peek="{img}"><td>{d}</td><td><a href="#entry-{no}">{p} <span class="arr" aria-hidden="true">↓</span></a></td><td>{u}</td><td><span class="status">{s}</span></td></tr>'
        for d, p, u, s, hi, no, img in LOG
    )
    body = f"""
    <section class="page-top">
      <div class="wrap grid article-head">
        <p class="kicker"><span>§ 03 — Archive</span><span>Graft 001—004</span></p>
        <h1 class="h1" data-lines><span class="line"><span>This is</span></span><span class="line"><span><em>patina.</em></span></span></h1>
        <div class="aside"><p class="body-lg soft" data-reveal>누군가의 일상 속에서 축적된 시간의 기록이자, 유일한 서사 그 자체.</p></div>
      </div>
      <div class="wrap">{fig("./graft004.png", "등받이를 재구성한 나무 의자 Graft 004", "Fig. 00 — Graft 004", "Featured object", ratio="ratio-21", lazy=False)}</div>
    </section>

    <section class="section">
      <div class="wrap grid">
        <p class="lede dropcap" data-reveal style="grid-column:3 / span 8">파티나가 제시하는 가구는 단순한 '수리이력판 물건'이 아닙니다. 그것은 누군가의 일상 속에서 축적된 시간의 기록이자, 유일한 서사 그 자체입니다. 이 개별 프로젝트는 결함에 얽매이지 않고 질감과 흔적을 정체성으로 재정의하며, 창의적인 공간과 미술품이라는 새로운 기능적 의의와 함께 각 유저와의 상호작용으로 재해석된 지속 가능한 디자인 연구 작품으로 파티나의 영역을 넓히고 있습니다.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 03.1</span><span class="kicker">Index of works</span><span class="meta">4 entries</span></div>
{entries}
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 03.2</span><span class="kicker">Details</span><span class="meta">Plates</span></div>
        <div class="gallery">
          {fig("./G1.png", "Graft 시리즈 의자 디테일", "Plate 01", "Detail", ratio="", cls="g1")}
          {fig("./G2.png", "Graft 시리즈 의자 측면", "Plate 02", "Detail", ratio="", cls="g2")}
          {fig("./G3.png", "사용 중인 Graft 의자", "Plate 03", "In use", ratio="ratio-21", cls="g3")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 03.3</span><span class="kicker">Provenance Log</span><span class="meta">A living record</span></div>
        <div class="grid" style="row-gap:40px">
          <div style="grid-column:1 / span 4">
            <h2 class="h2" data-lines><span class="line"><span>Provenance</span></span><span class="line"><span><em>Log</em></span></span></h2>
            <p class="soft" data-reveal style="margin-top:20px">A living record of the object's evolving life.</p>
          </div>
          <div style="grid-column:6 / span 7;overflow-x:auto" data-reveal>
            <table class="ledger">
              <thead><tr><th scope="col">Date</th><th scope="col">Product</th><th scope="col">Username</th><th scope="col">Status</th></tr></thead>
              <tbody>
{rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
"""
    return page("Archive — patina", "Graft 001—004: 파티나의 개입으로 다시 태어난 가구들과 그 이력.", body)


# --------------------------------------------------------------------------
# CONTACT
# --------------------------------------------------------------------------
STEPS = [
    ("제품의뢰서 작성", "가이드라인에 맞춰 간단한 의뢰서 작성"),
    ("의뢰서 검토 및 견적서 전달", "의뢰서 기반 제작자 산정 예상 견적서 전달"),
    ("최종 제안서 작성", "견적서 토대로 고객과 소통 최종 제안서 확정"),
    ("파티나 박스 전달", "제품 수거용 patina 박스 전달 (크기에 따라 상이)"),
    ("최종 작업물 전달", "고객과의 소통으로 완성된 최종 patina 작업물 전달"),
    ("제작 과정 아카이브", "제작과정 실시간 공유, 고객이 직접 확인 가능"),
]


def contact():
    steps = "\n".join(
        f'          <li class="step" data-reveal><span class="no">{i:02d}</span><h4>{t}</h4><p>{d}</p></li>'
        for i, (t, d) in enumerate(STEPS, 1)
    )
    body = f"""
    <section class="page-top">
      <div class="wrap grid article-head">
        <p class="kicker"><span>§ 06 — Contact</span><span>How a request works</span></p>
        <h1 class="h1" data-lines><span class="line"><span>Every object</span></span><span class="line"><span><em>has its use.</em></span></span></h1>
        <div class="aside"><p class="body-lg soft" data-reveal>의뢰 시 가치와 절차를 안내합니다.</p></div>
      </div>
      <div class="wrap">{fig("./request1.png", "작업대에서 옷을 살피는 두 사람의 손", "Fig. 01 — The workshop", "patina studio", ratio="ratio-21", lazy=False)}</div>
    </section>

    <section class="section">
      <div class="wrap grid essay">
        <aside class="essay-side"><div class="sticky"><p class="kicker">의뢰 시 가치</p><p class="meta">Why we take requests</p></div></aside>
        <div class="essay-body">
          <p class="lede dropcap" data-reveal>세상 모든 사물들은 그것의 쓰임이 있습니다. 하지만 시간이 지남에 따라 그 쓰임을 다하여 종말을 맞이하게 됩니다.</p>
          <p data-reveal>patina는 이점에 주목하여 쓰임을 다한 사물들에 새로운 가치를 주고자 합니다.</p>
          <div class="pull" data-reveal><p class="quote-kr">쓰임을 다한 사물들일지라도, 그들은 분명 그 사용자의 추억의 조각들로 가득 차 있을 것입니다.</p></div>
          <p data-reveal>우리는 그러한 조각들을 기반으로 사물들을 재탄생시켜, 다시 돌려 드리고자 합니다.</p>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 06.1</span><span class="kicker">의뢰 절차 — Process</span><span class="meta">6 steps</span></div>
        <ol class="steps">
{steps}
        </ol>
        <p class="notice" data-reveal>* 작업물은 추후 파티나 아카이브에 업로드될 수 있습니다.</p>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:56px" data-reveal>
          <a class="btn btn-solid" href="./request.html">Request <span class="arr">→</span></a>
          <a class="btn" href="./shop.html">Go to objects <span class="arr">→</span></a>
        </div>
      </div>
    </section>
"""
    return page("Contact — patina", "patina 의뢰 시 가치와 6단계 의뢰 절차.", body)


# --------------------------------------------------------------------------
# DONATE
# --------------------------------------------------------------------------
def donate():
    body = f"""
    <section class="page-top">
      <div class="wrap grid article-head">
        <p class="kicker"><span>§ 05 — Donate</span><span>Take part</span></p>
        <h1 class="h1" data-lines><span class="line"><span>Don't throw away,</span></span><span class="line"><span><em>just patina!</em></span></span></h1>
        <div class="aside"><p class="body-lg soft" data-reveal>버리기엔 아깝거나 귀찮고, 그대로 두기엔 자리를 차지하는 애매한 물건이 있나요?</p></div>
      </div>
      <div class="wrap">{fig("./donate1.png", "작업실 테이블 위의 오래된 옷과 물건들", "Fig. 01 — Things left behind", "Donate", ratio="ratio-21", lazy=False)}</div>
    </section>

    <section class="section">
      <div class="wrap grid">
        <div style="grid-column:2 / span 10">
          <p class="quote-kr" data-reveal>유행이 지나서, 혹은 작은 흠집 때문에 쓰지 않는 옷과 물건들.</p>
          <p class="lede soft" data-reveal style="margin-top:32px;max-width:44ch">그냥 버리면 쓰레기가 되지만, patina를 만나면 새로운 이야기가 담긴 오브제로 다시 태어납니다. 당신의 일상을 채웠던 흔적을 patina에 기부해 주세요. 지속 가능한 사물의 순환이 당신의 손에서부터 시작됩니다.</p>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 05.1</span><span class="kicker">What we collect</span><span class="meta">3 categories</span></div>
        <div class="collect">
          {fig("./donate2.png", "개어 둔 니트와 데님", "의류 및 패브릭", "01", ratio="")}
          {fig("./donate3.png", "창가의 나무 선반과 컵", "선반 및 리빙", "02", ratio="")}
          {fig("./donate4.png", "가방과 벨트, 구두", "패션 잡화", "03", ratio="")}
        </div>
        <p class="notice" data-reveal>기부 불가 항목 — 오염이 너무 심해 재작업이 불가능한 의류, 일회용 플라스틱 제품 등</p>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 05.2</span><span class="kicker">Donate process</span><span class="meta">3 steps</span></div>
        <ol class="steps">
          <li class="step" data-reveal><span class="no">01</span><h4>기부 신청서 작성</h4><p>하단 폼에 물품 정보와 스토리, 사진을 등록합니다.</p></li>
          <li class="step" data-reveal><span class="no">02</span><h4>수거 박스 발송</h4><p>선정된 기부자께 물품을 담을 파티나 에코 수거백을 보냅니다.</p></li>
          <li class="step" data-reveal><span class="no">03</span><h4>오브제 업사이클</h4><p>디자이너들의 개입을 통해 새로운 아카이브 가구로 탄생합니다.</p></li>
        </ol>
      </div>
    </section>

    <section class="section" id="donate-form" style="padding-top:0">
      <div class="wrap grid form-shell">
        <aside class="form-side">
          <div class="sticky">
            <p class="kicker">§ 05.3 — Form</p>
            <h2 class="h2" data-lines><span class="line"><span>기부 신청하기</span></span></h2>
            <p class="soft" data-reveal>사물이 품고 있는 소중한 흔적과 이야기를 들려주세요.</p>
          </div>
        </aside>
        <form class="form-main" id="donateForm" data-flow="donate" novalidate>
          <div class="field">
            <div class="field-row">
              <div class="field">
                <label class="label" for="donateName">기부자 성함 <span class="req">필수</span></label>
                <input class="input" type="text" id="donateName" name="name" placeholder="성함을 입력해주세요" autocomplete="name" required>
              </div>
              <div class="field">
                <label class="label" for="donateContact">연락처 <span class="req">필수</span></label>
                <input class="input" type="tel" id="donateContact" name="contact" placeholder="010-0000-0000" autocomplete="tel" required>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="donateCategory">기부 물품 카테고리 <span class="req">필수</span></label>
            <select class="select" id="donateCategory" name="category" required>
              <option value="" disabled selected>선택해 주세요</option>
              <option value="fabric">의류 및 패브릭</option>
              <option value="living">선반 및 리빙 가구</option>
              <option value="etc">패션 잡화 및 기타 오브제</option>
            </select>
          </div>
          <div class="field">
            <label class="label" for="donateStory">사물에 담긴 기억이나 이야기 <span class="req">필수</span></label>
            <textarea class="textarea" id="donateStory" name="story" rows="6" placeholder="이 물건을 언제, 어떻게 주로 사용하셨나요? 버리기 아쉬웠던 특별한 추억이나 흔적에 대해 자유롭게 들려주세요." required></textarea>
          </div>
          <div class="form-actions">
            <p class="form-error" aria-live="polite"></p>
            <button type="submit" class="btn btn-solid">Submit <span class="arr">→</span></button>
          </div>
        </form>
      </div>
    </section>
"""
    return page("Donate — patina", "Don't throw away, just patina! 쓰지 않는 옷과 물건을 patina에 기부해 주세요.", body)


# --------------------------------------------------------------------------
# REQUEST
# --------------------------------------------------------------------------
LEVELS = [
    ("lv1", "Lv1", "Standard", "본질을 지키는 가장 기본적인 체계", "The core system of preserving the essence",
     "./request2.png", "오래 써서 낡은 가죽 지갑",
     [("Best for", "세월의 흔적이 표면에 고스란히 드러난 물건"),
      ("What we do", "시간의 흔적들을 지우지 않고, 본연의 가치로 해석합니다."),
      ("Signature finish", "시그니처 그린으로 오브제에 세월의 흔적과 현대적 밸런스를 조화합니다.")]),
    ("lv2", "Lv2", "Advanced", "구조적 봉합", "Structural stitching and reinforcement",
     "./request3.png", "오래 입어 닳은 가죽 재킷",
     [("Best for", "마모나 찢어짐 등 물리적 손상이 발생한 물건"),
      ("What we do", "가시적인 스티치와 패치를 통해 구조를 보강하여 수선 흔적을 재해석합니다."),
      ("Signature finish", "시그니처 색상으로 드러나는 구리 / 금속 톤으로 보강합니다.")]),
    ("lv3", "Lv3", "Masterpiece", "재구성", "Transformation and structural redesign",
     "./request4.png", "식물을 심은 낡은 부츠",
     [("Best for", "심각한 구조적 손상, 형태 변형, 해체 및 재조립이 필요한 물건"),
      ("What we do", "물건의 역사는 보존하면서 형태를 변형하고 새로운 구조로 사물을 재해석합니다."),
      ("Signature finish", "시그니처 그린으로 오브제에 세월의 흔적과 현대적 밸런스를 조화합니다."),
      ("Important", "원형이 변경될 수 있습니다. 작업 진행 전 1:1 상담이 필수입니다.")]),
]


def request():
    chapters = []
    for key, lv, name, kr, en, img, alt, spec in LEVELS:
        rows = "".join(
            f'<div{NOTE if k == "Important" else ""}><dt>{k}</dt><dd>{v}</dd></div>' for k, v in spec
        )
        chapters.append(f"""        <article class="chapter" id="{key}">
          {fig(img, alt, f"Fig. {lv}", name, ratio="")}
          <div class="chapter-text">
            <span class="tag" data-reveal>Chapter {lv[-1]} — {lv}</span>
            <h2 class="h1" data-lines><span class="line"><span>{name}</span></span></h2>
            <p class="sub" data-reveal>{kr}</p>
            <p class="eng" data-reveal>{en}</p>
            <dl class="spec" data-reveal>{rows}</dl>
          </div>
        </article>""")
    chapters = "\n".join(chapters)
    body = f"""
    <section class="page-top">
      <div class="wrap grid article-head">
        <p class="kicker"><span>§ 04 — Request</span><span>How to use patina</span></p>
        <h1 class="h1" data-lines><span class="line"><span>Three ways</span></span><span class="line"><span>to <em>intervene.</em></span></span></h1>
        <div class="aside"><p class="body-lg soft" data-reveal>PATINA의 개입은 세 가지의 뚜렷한 단계로 구성됩니다. 각 단계는 사용되는 재료, 공정, 소요 시간 및 전반적인 개입 측면에서 차이가 있습니다.</p></div>
      </div>
      <div class="wrap">{fig("./Frame 85.png", "작업대에서 옷을 함께 살피는 손", "Fig. 00 — Consultation", "patina studio", ratio="ratio-21", lazy=False)}</div>
    </section>

    <section class="section-tight">
      <div class="wrap">
{chapters}
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="wrap" style="display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;border-top:1px solid var(--ink);padding-top:40px">
        <h2 class="h2" data-lines><span class="line"><span>Ready to give it</span></span><span class="line"><span><em>another life?</em></span></span></h2>
        <a class="btn btn-solid" href="./request_form.html" data-reveal>Start a Request <span class="arr">→</span></a>
      </div>
    </section>
"""
    return page("Request — patina", "patina의 세 가지 개입 단계: Lv1 Standard, Lv2 Advanced, Lv3 Masterpiece.", body)
