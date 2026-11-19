# Shared page chrome for the patina editorial edition.
# Pages are written as plain static HTML; this file only keeps header/footer identical.
import html as _html

V = "2"  # asset version (cache busting)

NAV = [
    ("About", "./about.html", "Still in use", "./Group 55.png"),
    ("Objects", "./shop.html", "오브젝트", "./Group 53.png"),
    ("Archive", "./archive.html", "아카이브", "./graft004.png"),
    ("Request", "./request.html", "수선 의뢰", "./Frame 85.png"),
    ("Donate", "./donate.html", "기부", "./donate1.png"),
    ("Contact", "./contact.html", "의뢰 절차", "./request1.png"),
]


def esc(s):
    return _html.escape(s, quote=True)


def lines(text_lines, tag="h1", cls="h1", extra=""):
    """Title split into masked lines that slide up one by one."""
    inner = "".join(f'<span class="line"><span>{l}</span></span>' for l in text_lines)
    return f'<{tag} class="{cls}" data-lines{extra}>{inner}</{tag}>'


def head(title, desc):
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <meta name="theme-color" content="#f2eee5">
  <link rel="icon" href="./logoG.png">
  <script>try{{if(sessionStorage.getItem('pt-arrive')){{document.documentElement.classList.add('arriving');sessionStorage.removeItem('pt-arrive')}}}}catch(e){{}}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Noto+Serif+KR:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
  <link rel="stylesheet" href="./site.css?v={V}">
</head>
"""


def masthead():
    nav = "\n".join(f'        <a href="{h}">{t}</a>' for t, h, _, _ in NAV)
    return f"""  <a class="sr-skip" href="#main">본문 바로가기</a>
  <header class="masthead">
    <div class="wrap masthead-inner">
      <a class="brand" href="./index.html" aria-label="patina 홈"><img src="./logoG.png" alt="patina" width="104" height="35"></a>
      <div class="mast-meta meta"><span>Issue No.01</span><span>Still in use</span></div>
      <nav class="nav" aria-label="주요 메뉴">
{nav}
      </nav>
      <button type="button" class="contents-btn" aria-haspopup="dialog" aria-expanded="false" aria-controls="contents">Contents <i aria-hidden="true"></i></button>
    </div>
  </header>
"""


def contents_overlay():
    items = []
    for i, (t, h, kr, img) in enumerate(NAV, 1):
        items.append(
            f'        <li><a href="{h}" data-peek="{img}"><span class="no">{i:02d}</span>'
            f'<span class="ttl">{t}<em>{kr}</em></span><span class="pg">p.{i*12:03d}</span></a></li>'
        )
    items = "\n".join(items)
    return f"""  <div class="contents" id="contents" role="dialog" aria-modal="true" aria-label="목차" aria-hidden="true">
    <div class="wrap contents-head">
      <span class="kicker">Contents — Issue No.01</span>
      <button type="button" class="contents-close kicker">Close <span aria-hidden="true"></span></button>
    </div>
    <div class="wrap">
      <ol class="contents-list">
{items}
      </ol>
    </div>
    <div class="wrap contents-foot meta"><span>patina — Still in use</span><span>Seoul, 2026</span></div>
  </div>
"""


def colophon():
    col1 = "".join(f'<li><a href="{h}">{t}</a></li>' for t, h, _, _ in NAV[:3])
    col2 = "".join(f'<li><a href="{h}">{t}</a></li>' for t, h, _, _ in NAV[3:])
    return f"""  <footer class="colophon">
    <div class="wrap">
      <div class="grid colophon-top">
        <p class="colophon-statement">We don't just preserve objects — <em>we redefine their existence through time.</em></p>
        <div class="colophon-col">
          <h4>Read</h4>
          <ul>{col1}</ul>
        </div>
        <div class="colophon-col">
          <h4>Take part</h4>
          <ul>{col2}</ul>
        </div>
        <div class="colophon-col">
          <h4>Start</h4>
          <ul><li><a href="./request_form.html">Start a Request</a></li><li><a href="./donate.html#donate-form">Donate an object</a></li></ul>
        </div>
      </div>
      <div class="colophon-mark"><img src="./logoW.png" alt="" loading="lazy" width="2068" height="691"></div>
      <div class="colophon-base meta"><span>© 2026 patina. 버려지는 것들이 사라지지 않는 세계를 만듭니다.</span><span>Issue No.01 — Still in use</span></div>
    </div>
  </footer>
"""


def page(title, desc, body, footer=True):
    return (
        head(title, desc)
        + "<body>\n"
        + masthead()
        + contents_overlay()
        + '  <main id="main">\n'
        + body
        + "\n  </main>\n"
        + (colophon() if footer else "")
        + f'  <script src="./site.js?v={V}"></script>\n</body>\n</html>\n'
    )


def fig(src, alt, cap_l="", cap_r="", ratio="ratio-34", reveal=True, lazy=True, cls="", href=None):
    load = ' loading="lazy"' if lazy else ""
    rv = ' data-reveal="img"' if reveal else ""
    cap = ""
    if cap_l or cap_r:
        cap = f"<figcaption><span>{cap_l}</span><span>{cap_r}</span></figcaption>"
    media = f'<div class="fig-media {ratio}"><img src="{src}" alt="{esc(alt)}"{load}></div>'
    if href:
        media = f'<a href="{href}">{media}</a>'
    return f'<figure class="fig {cls}"{rv}>{media}{cap}</figure>'
