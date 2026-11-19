from common import page, lines, fig

OBJECTS = [
    ("Group 51.png", "Chair & side table", "의자와 사이드 테이블"),
    ("Group 52.png", "Dumbbell", "덤벨"),
    ("Group 53.png", "Stool, heeled", "스툴과 구두"),
    ("Group 54.png", "Corgi & carrier", "인형과 캐리어"),
    ("Group 55.png", "Rattan stool", "라탄 스툴"),
    ("Group 56.png", "Standing mirror", "전신 거울"),
    ("Group 57.png", "Blue chair", "파란 의자"),
    ("Group 58.png", "Red table", "빨간 테이블"),
    ("Group 59.png", "Green cushion", "초록 방석"),
]


# 표지 스티커: (파일, 설명, 모양, 너비, 데스크톱 left%, top%, 모바일 left%, top%, 회전, 지연)
STICKERS = [
    ("Group 59.png", "초록 방석", "round", "clamp(96px, 8vw, 128px)", 56, 74, 6, 30, -6, 1.2),
    ("Group 53.png", "구두가 걸린 스툴", "pill", "clamp(80px, 6.4vw, 104px)", 92, 50, 70, 8, 8, 1.35),
    ("Group 52.png", "덤벨", "soft", "clamp(84px, 7vw, 112px)", 48, 34, 40, 40, -10, 1.5),
]


# --------------------------------------------------------------------------
# HOME
# --------------------------------------------------------------------------
def home():
    strip = "\n".join(
        fig(f"./{src}", kr, f"No.{i:02d}", en, ratio="", href="./shop.html")
        for i, (src, en, kr) in enumerate(OBJECTS, 1)
    )
    stickers = "\n".join(
        f'          <div class="sticker {shape}" tabindex="0" role="img" aria-label="{alt}" data-left="{l}" data-top="{t}" data-mleft="{ml}" data-mtop="{mt}" data-r="{r}" '
        f'style="--w:{w};--r:{r}deg;--delay:{d}s"><img src="./{src}" alt="" draggable="false"></div>'
        for src, alt, shape, w, l, t, ml, mt, r, d in STICKERS
    )
    body = f"""
    <!-- 표지 -->
    <section class="cover wrap">
      <div class="cover-meta meta"><span>Issue No.01 — 2026</span><span>Repair · Record · Care · Circulate</span><span>Seoul</span></div>
      <div class="grid cover-body">
        <div class="cover-title">
          <p class="kicker" data-reveal>patina — participatory design platform</p>
          <h1 class="display" data-lines><span class="line"><span>Still</span></span><span class="line"><span>in <em>use.</em></span></span></h1>
          <p class="lede">버려지는 것들이 사라지지 않는 세계를 만듭니다.</p>
        </div>
        {fig("./Mask group.png", "초록색으로 칠해진 오래된 테이블", "Cover — Fig. 01", "Table, signature green", ratio="", lazy=False, cls="cover-figure")}
        <div class="playground" aria-label="끌어서 움직여 볼 수 있는 오브젝트 사진들">
{stickers}
          <div class="badge" style="left:52%;top:6%" aria-hidden="true">
            <svg viewBox="0 0 100 100"><defs><path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs><text textLength="234" lengthAdjust="spacing"><textPath href="#badge-circle" textLength="234" lengthAdjust="spacing">still in use · still in use · </textPath></text></svg>
            <b>✳</b>
          </div>
          <span class="drag-hint" style="left:44%;top:68%" aria-hidden="true">↻ drag</span>
        </div>
      </div>
      <nav class="cover-foot" aria-label="이번 호 주요 기사">
        <a href="./about.html"><span class="no">01</span><span><span class="ttl">About</span><br><span class="kr">시간이 쌓인 사물</span></span></a>
        <a href="./archive.html"><span class="no">02</span><span><span class="ttl">Archive</span><br><span class="kr">Graft 001—004</span></span></a>
        <a href="./request.html"><span class="no">03</span><span><span class="ttl">Request</span><br><span class="kr">세 단계의 개입</span></span></a>
        <a href="./donate.html"><span class="no">04</span><span><span class="ttl">Donate</span><br><span class="kr">Don't throw away</span></span></a>
      </nav>
    </section>

    <!-- 선언문 -->
    <section class="section manifesto">
      <div class="wrap grid">
        <p class="quote-kr" data-reveal>파티나는 세월의 흔적을 결함이 아닌, <span class="hl">사물의 고유한 서사이자 정체성</span>으로 바라봅니다.</p>
        <p class="manifesto-sign meta" data-reveal>From the editor — patina</p>
      </div>
    </section>

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <span>Repair<i>✳</i></span><span>Record<i>✳</i></span><span>Care<i>✳</i></span><span>Circulate<i>✳</i></span><span>Still in use<i>✳</i></span>
        <span>Repair<i>✳</i></span><span>Record<i>✳</i></span><span>Care<i>✳</i></span><span>Circulate<i>✳</i></span><span>Still in use<i>✳</i></span>
      </div>
    </div>

    <!-- 네 가지 동사 -->
    <section class="section">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 01</span><span class="kicker">How patina works</span><span class="meta">p.012</span></div>
        <div class="verbs">
          <article class="verb" data-reveal><span class="no">01</span><h3>Repair</h3><p class="kr">수선하고</p><p>부분적인 손상이나 트렌드의 변화로 버려질 뻔한 사물의 잠재적 가치에 주목합니다.</p></article>
          <article class="verb" data-reveal><span class="no">02</span><h3>Record</h3><p class="kr">기록하며</p><p>제품이 거쳐온 시간과 개입의 과정을 공식적으로 기록해 하나의 이력을 만듭니다.</p></article>
          <article class="verb" data-reveal><span class="no">03</span><h3>Care</h3><p class="kr">관리하고</p><p>세월의 흔적을 지우지 않고, 사물의 고유한 정체성으로 이어 갑니다.</p></article>
          <article class="verb" data-reveal><span class="no">04</span><h3>Circulate</h3><p class="kr">순환시킵니다</p><p>누군가의 역사적 오브제로 남기도 하고, 새로운 제품의 부품과 자재로 순환되기도 합니다.</p></article>
        </div>
      </div>
    </section>

    <!-- 피처: Graft 004 -->
    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 02</span><span class="kicker">Feature — From the archive</span><span class="meta">p.024</span></div>
        <div class="grid feature-grid">
          <div class="feature-media">
            {fig("./graft004.png", "등받이를 재구성한 나무 의자 Graft 004", "Fig. 02 — Graft 004", "This is patina.", ratio="ratio-32", href="./archive.html")}
          </div>
          <div class="feature-text">
            <span class="tag">Graft 004</span>
            <h2 class="h2" data-lines><span class="line"><span>This is</span></span><span class="line"><span><em>patina.</em></span></span></h2>
            <p data-reveal>파티나가 제시하는 가구는 단순한 '수리이력판 물건'이 아닙니다. 그것은 누군가의 일상 속에서 축적된 시간의 기록이자, 유일한 서사 그 자체입니다.</p>
            <p class="soft small" data-reveal>결함에 얽매이지 않고 질감과 흔적을 정체성으로 재정의하는 지속 가능한 디자인 연구 작품.</p>
            <a class="link-arrow" href="./archive.html" data-reveal>Read the archive <span class="arr">→</span></a>
          </div>
        </div>
      </div>
    </section>

    <!-- 오브젝트 스트립 -->
    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 03</span><span class="kicker">Objects — One and only object for me</span><span class="meta">p.036</span></div>
        <div class="strip-head">
          <h2 class="h2" data-lines><span class="line"><span>Nine objects,</span></span><span class="line"><span><em>nine stories.</em></span></span></h2>
          <a class="link-arrow" href="./shop.html">All objects <span class="arr">→</span></a>
        </div>
      </div>
      <div class="strip-wrap">
        <div class="strip" tabindex="0" aria-label="오브젝트 목록, 좌우로 스크롤">
{strip}
        </div>
        <div class="strip-progress" aria-hidden="true"><span></span></div>
      </div>
    </section>

    <!-- 세 단계 -->
    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="sec-head"><span class="no">§ 04</span><span class="kicker">Request — How to use patina</span><span class="meta">p.048</span></div>
        <div class="levels">
          <a class="level" href="./request.html#lv1" data-reveal>
            <div class="fig-media"><img src="./request2.png" alt="낡은 가죽 지갑" loading="lazy"></div>
            <span class="meta">Lv1</span><h3>Standard</h3><p class="kr">본질을 지키는 가장 기본적인 체계</p><p>시간의 흔적들을 지우지 않고, 본연의 가치로 해석합니다.</p>
          </a>
          <a class="level" href="./request.html#lv2" data-reveal>
            <div class="fig-media"><img src="./request3.png" alt="오래 입은 가죽 재킷" loading="lazy"></div>
            <span class="meta">Lv2</span><h3>Advanced</h3><p class="kr">구조적 봉합</p><p>가시적인 스티치와 패치로 구조를 보강해 수선 흔적을 재해석합니다.</p>
          </a>
          <a class="level" href="./request.html#lv3" data-reveal>
            <div class="fig-media"><img src="./request4.png" alt="화분이 된 낡은 부츠" loading="lazy"></div>
            <span class="meta">Lv3</span><h3>Masterpiece</h3><p class="kr">재구성</p><p>물건의 역사는 보존하면서 형태를 변형해 새로운 구조로 재해석합니다.</p>
          </a>
        </div>
      </div>
    </section>

    <!-- 기부 배너 -->
    <section class="banner">
      <div class="fig-media"><img src="./donate1.png" alt="작업대 위에 놓인 오래된 옷과 물건들" loading="lazy"></div>
      <div class="wrap banner-inner">
        <p class="kicker">§ 05 — Donate</p>
        <h2 class="h1" data-lines><span class="line"><span>Don't throw away,</span></span><span class="line"><span><em>just patina!</em></span></span></h2>
        <p class="lede">그냥 버리면 쓰레기가 되지만, patina를 만나면 새로운 이야기가 담긴 오브제로 다시 태어납니다.</p>
        <div><a class="btn btn-light" href="./donate.html">기부하러 가기 <span class="arr">→</span></a></div>
      </div>
    </section>
"""
    return page("patina — Still in use", "시간이 축적된 사물을 수선·기록·순환시키는 참여형 디자인 플랫폼, patina.", body)


# --------------------------------------------------------------------------
# ABOUT
# --------------------------------------------------------------------------
def about():
    body = f"""
    <section class="page-top">
      <div class="wrap grid article-head">
        <p class="kicker"><span>§ 01 — About</span><span>Essay</span></p>
        <h1 class="h1" data-lines><span class="line"><span>Still</span></span><span class="line"><span>in <em>use.</em></span></span></h1>
        <div class="aside"><p class="lede" data-reveal>버려지는 것들이 사라지지 않는 세계를 만듭니다.</p></div>
      </div>
      <div class="wrap">{fig("./G3.png", "재구성한 의자에 앉아 있는 사람", "Fig. 01 — A chair, still in use", "Graft series", ratio="ratio-21", lazy=False)}</div>
    </section>

    <section class="section">
      <div class="wrap grid essay">
        <aside class="essay-side">
          <div class="sticky">
            <img src="./logoG.png" alt="patina" width="160" style="width:160px">
            <p class="meta">파티나(PATINA)<br>참여형 디자인 서비스 플랫폼</p>
            <hr class="rule">
            <p class="meta">Repair<br>Record<br>Care<br>Circulate</p>
          </div>
        </aside>
        <div class="essay-body">
          <p class="lede dropcap" data-reveal>파티나(PATINA)는 시간이 축적된 사물을 수거하여 새로운 '아카이브 오브제'로 전환하는 참여형 디자인 서비스 플랫폼입니다.</p>
          <p data-reveal>수많은 사물들이 완벽한 기능 상실이 아닌, 부분적인 손상이나 트렌드의 변화로 인해 버려집니다. 파티나는 버려지기엔 아쉽고 그대로 방치하기엔 모호한 사물들의 잠재적 가치에 주목했습니다. 이를 수선하고, 기록하며, 관리하고, 순환시키는 시스템을 통해 사물의 생애 주기를 재정립하고자 합니다.</p>
          <div class="pull" data-reveal>
            <p class="quote-kr">단순한 과거로의 회귀나 원상복구가 아닙니다.</p>
          </div>
          <p data-reveal>파티나는 세월의 흔적을 결함이 아닌 사물의 고유한 서사이자 정체성으로 바라봅니다. 제품이 거쳐온 시간과 개입의 과정을 공식적으로 기록하여 하나의 가치 있는 이력을 만들어냅니다.</p>
          <p data-reveal>나아가 파티나는 개별 의류 및 물건의 아카이빙을 넘어, 사물을 다시 소재로 환원하는 지속 가능한 순환 구조를 구축합니다.</p>
          <p data-reveal>사물의 성격에 따라 누군가의 역사적 오브제로 남기도 하고, 해체와 세척을 거쳐 새로운 제품의 부품과 자재로 순환되기도 합니다. 감정적 서사와 물질적 순환을 동시에 아우르는 파티나의 프로세스는,</p>
          <div class="pull" data-reveal>
            <p class="quote-kr">사물의 수명 연장을 넘어 존재 방식을 새롭게 정의하는 시도입니다.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section slogan" style="padding-top:0">
      <div class="wrap">
        <p class="kicker" data-reveal style="margin-bottom:32px">— Our belief</p>
        <h2 class="h1" data-lines><span class="line"><span>We don't just preserve objects —</span></span><span class="line"><span><em>we redefine their existence</em></span></span><span class="line"><span><em>through time.</em></span></span></h2>
        <div style="margin-top:56px" data-reveal><a class="btn" href="./archive.html">아카이브 보기 <span class="arr">→</span></a></div>
      </div>
    </section>
"""
    return page("About — patina", "파티나는 시간이 축적된 사물을 수거하여 새로운 아카이브 오브제로 전환하는 참여형 디자인 서비스 플랫폼입니다.", body)


# --------------------------------------------------------------------------
# SHOP (Objects)
# --------------------------------------------------------------------------
def shop():
    items = OBJECTS + [("Mask group.png", "Signature green table", "시그니처 그린 테이블")]
    figs = "\n".join(
        f'<figure class="fig" data-reveal="img"><div class="fig-media"><img src="./{src}" alt="{kr}" loading="lazy"></div>'
        f'<figcaption><span><b>{en}</b></span><span>No.{i:02d} — {kr}</span></figcaption></figure>'
        for i, (src, en, kr) in enumerate(items, 1)
    )
    body = f"""
    <section class="page-top">
      <div class="wrap grid article-head">
        <p class="kicker"><span>§ 02 — Objects</span><span>Catalogue</span></p>
        <h1 class="h1" data-lines><span class="line"><span>One and only</span></span><span class="line"><span><em>object for me.</em></span></span></h1>
        <div class="aside"><p class="body-lg soft" data-reveal>파티나의 손을 거쳐 다시 쓰이게 된 사물들. 같은 것은 하나도 없습니다.</p></div>
      </div>
    </section>
    <section class="section-tight">
      <div class="wrap">
        <div class="shop-tools"><span class="kicker">10 objects</span><button type="button" class="btn" data-shuffle=".catalog">섞어 보기 <span class="arr">↻</span></button></div>
        <div class="catalog">
{figs}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap" style="display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;border-top:1px solid var(--ink);padding-top:40px">
        <h2 class="h2" data-lines><span class="line"><span>Every object</span></span><span class="line"><span><em>has a record.</em></span></span></h2>
        <a class="btn btn-solid" href="./archive.html" data-reveal>Move to archive <span class="arr">→</span></a>
      </div>
    </section>
"""
    return page("Objects — patina", "One and only object for me. 파티나의 손을 거쳐 다시 쓰이게 된 사물들.", body)
