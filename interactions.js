// ==========================================================================
// patina interactions layer
// 스크롤 등장, 전체 화면 메뉴, 페이지 전환, 커서, 히어로 패럴랙스, 진행 바
// (기존 script.js의 폼/선택 로직과는 독립적으로 동작합니다)
// ==========================================================================
(function () {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  // 도착 커튼 안전장치: 애니메이션이 어떤 이유로 멈춰도 1.1초 뒤엔 반드시 걷힙니다
  if (root.classList.contains('curtain-in')) {
    setTimeout(() => root.classList.remove('curtain-in'), 1100);
  }

  document.addEventListener('DOMContentLoaded', function () {
    markCurrentNav();
    setupIntroMemory();
    setupReveal();
    setupMenu();
    setupScrollEffects();
    setupPageTransitions();
    setupCursor();
  });

  // ------------------------------------------------------------------------
  // 현재 페이지 메뉴에 밑줄 고정
  // ------------------------------------------------------------------------
  function markCurrentNav() {
    const here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(a => {
      if ((a.getAttribute('href') || '').replace('./', '') === here) a.classList.add('is-current');
    });
  }

  // ------------------------------------------------------------------------
  // 인트로는 세션당 한 번만
  // ------------------------------------------------------------------------
  function setupIntroMemory() {
    const intro = document.querySelector('.intro');
    if (!intro) return;
    store.set('pt-intro', '1');
    // 인트로가 끝나면 DOM에서 치워 클릭을 막지 않게 합니다
    setTimeout(() => intro.remove(), root.classList.contains('intro-seen') ? 0 : 3400);
  }

  // ------------------------------------------------------------------------
  // 스크롤 등장
  // ------------------------------------------------------------------------
  function setupReveal() {
    const skip = '.header, .intro, .site-menu, .hero-section, .fade-in-up, .page-master-covers, .cursor-dot';

    const titleSel = [
      '.shop-header-text h2', '.contact-header-text h2', '.request-header-text h2',
      '.donate-header-text h2', '.archive-hero-text h2', '.provenance-title',
      '.form-title-text h2', '.form-main-title-lv1', '.contact-process-section h3',
      '.donate-process-section h3', '.service-level-section h3', '.form-title-box h3'
    ].join(',');

    const imgSel = [
      '.contact-hero-banner', '.request-hero-banner', '.donate-hero-banner',
      '.archive-hero-img-box', '.item-img-box', '.level-img-box', '.collect-img-box'
    ].join(',');

    const blockSel = [
      'main p', 'main h3', 'main h4', '.process-card', '.flow-step', '.flow-arrow',
      '.collect-card', '.archive-list-item', '.log-table', '.selectable-card',
      '.collection-method-card', '.detail-item', '.input-group', '.input-group-lv1',
      '.highlight-summary', '.content-brand-logo', '.content-footer-slogan',
      '.item-btn-zone', '.contact-action-zone', '.request-action-zone',
      '.form-submit-zone', '.form-action-zone', '.gallery-row-1 img', '.gallery-row-2 img',
      '.philosophy-text-box p', '.archive-intro-text p', '.intro-bold', '.intro-desc',
      '.process-notice', '.collect-notice', '.level-info-box', '.provenance-subtitle'
    ].join(',');

    const marked = new Set();
    const ok = el => !el.closest(skip) && ![...marked].some(m => m !== el && m.contains(el));

    document.querySelectorAll(titleSel).forEach(el => {
      if (!ok(el) || el.querySelector('.rt-inner')) return;
      const inner = document.createElement('span');
      inner.className = 'rt-inner';
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      el.classList.add('reveal-title');
      marked.add(el);
    });
    document.querySelectorAll(imgSel).forEach(el => {
      // 자체 초록 커버가 있는 이미지 박스는 커버 연출을 그대로 사용
      if (!ok(el) || el.querySelector(':scope > .cover')) return;
      el.classList.add('reveal-img');
      marked.add(el);
    });
    document.querySelectorAll(blockSel).forEach(el => {
      if (!ok(el)) return;
      el.classList.add('reveal');
      marked.add(el);
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
      marked.forEach(el => el.classList.add('is-visible'));
      return;
    }

    // 이미지 마스크: 페이지 배경색과 같은 덮개가 위로 걷히도록 배경색을 읽어 둡니다
    const bgOf = el => {
      for (let n = el.parentElement; n; n = n.parentElement) {
        const c = getComputedStyle(n).backgroundColor;
        if (c && c !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(c)) return c;
      }
      return '#ffffff';
    };
    marked.forEach(el => {
      if (!el.classList.contains('reveal-img')) return;
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.style.setProperty('--reveal-bg', bgOf(el));
    });

    const io = new IntersectionObserver(entries => {
      const shown = entries.filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top ||
                        a.boundingClientRect.left - b.boundingClientRect.left);
      shown.forEach((entry, i) => {
        const el = entry.target;
        el.style.setProperty('--reveal-delay', Math.min(i * 0.08, 0.48) + 's');
        el.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    marked.forEach(el => io.observe(el));

    // 안전장치: 교차 감지가 늦거나 멈춰도 스크롤 위치로 직접 확인해 반드시 보여줍니다
    let pending = [...marked];
    const sweep = () => {
      const vh = window.innerHeight;
      let i = 0;
      pending = pending.filter(el => {
        if (el.classList.contains('is-visible')) return false;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) {
          el.style.setProperty('--reveal-delay', Math.min(i++ * 0.08, 0.48) + 's');
          el.classList.add('is-visible');
          io.unobserve(el);
          return false;
        }
        return true;
      });
      if (!pending.length) {
        window.removeEventListener('scroll', onSweep);
        clearInterval(timer);
      }
    };
    let sweepQueued = false;
    const onSweep = () => {
      if (sweepQueued) return;
      sweepQueued = true;
      setTimeout(() => { sweepQueued = false; sweep(); }, 120);
    };
    window.addEventListener('scroll', onSweep, { passive: true });
    const timer = setInterval(sweep, 700);
  }

  // ------------------------------------------------------------------------
  // 햄버거 → 전체 화면 메뉴 (기존 에셋 이미지를 미리보기로 사용)
  // ------------------------------------------------------------------------
  function setupMenu() {
    const burger = document.querySelector('.hamburger');
    if (!burger) return;

    const items = [
      ['ABOUT', './about.html', './Group 55.png'],
      ['SHOP', './shop.html', './Group 53.png'],
      ['ARCHIVE', './archive.html', './graft004.png'],
      ['REQUEST', './request.html', './Frame 85.png'],
      ['CONTACT', './contact.html', './request1.png'],
      ['DONATE', './donate.html', './donate1.png']
    ];

    const menu = document.createElement('div');
    menu.className = 'site-menu';
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.setAttribute('aria-label', '사이트 메뉴');
    menu.innerHTML =
      '<button type="button" class="site-menu-close" aria-label="메뉴 닫기">CLOSE<span></span></button>' +
      '<ul class="site-menu-list">' +
      items.map((it, i) =>
        `<li><a href="${it[1]}" data-i="${i}"><small>0${i + 1}</small>${it[0].charAt(0) + it[0].slice(1).toLowerCase()}</a></li>`
      ).join('') +
      '</ul>' +
      '<div class="site-menu-preview">' +
      items.map((it, i) => `<img src="${it[2]}" alt="" data-i="${i}" loading="lazy">`).join('') +
      '</div>' +
      '<p class="site-menu-foot">Still in use — patina</p>';
    document.body.appendChild(menu);

    const previews = menu.querySelectorAll('.site-menu-preview img');
    const show = i => previews.forEach(p => p.classList.toggle('is-active', p.dataset.i === String(i)));
    show(0);

    menu.querySelectorAll('.site-menu-list a').forEach(a => {
      a.addEventListener('mouseenter', () => show(a.dataset.i));
      a.addEventListener('focus', () => show(a.dataset.i));
    });

    burger.setAttribute('role', 'button');
    burger.setAttribute('tabindex', '0');
    burger.setAttribute('aria-label', '메뉴 열기');
    burger.setAttribute('aria-expanded', 'false');

    const open = viaKeyboard => {
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
      if (viaKeyboard === true) {
        setTimeout(() => menu.querySelector('.site-menu-list a').focus({ preventScroll: true }), 500);
      }
    };
    const close = () => {
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    };

    burger.addEventListener('click', () => open(false));
    burger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(true); }
    });
    menu.querySelector('.site-menu-close').addEventListener('click', () => { close(); burger.focus(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { close(); burger.focus(); }
    });
  }

  // ------------------------------------------------------------------------
  // 스크롤 연동: 진행 바 + 첫 페이지 히어로 패럴랙스
  // ------------------------------------------------------------------------
  function setupScrollEffects() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    const heroMedia = document.querySelector('.hero-media');
    const heroLogo = document.querySelector('.hero-logo');
    const heroExtras = document.querySelectorAll('.hero-tagline, .scroll-cue');

    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;

      if (heroMedia && !reduceMotion) {
        const h = window.innerHeight;
        if (y < h * 1.2) {
          heroMedia.style.translate = `0 ${y * 0.28}px`;
          heroLogo.style.translate = `0 ${y * 0.5}px`;
          heroLogo.style.opacity = String(Math.max(0, 1 - y / (h * 0.55)));
          heroExtras.forEach(el => { el.style.visibility = y > h * 0.25 ? 'hidden' : ''; });
        }
      }
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  // ------------------------------------------------------------------------
  // 페이지 전환: 딥그린 커튼이 올라왔다가 다음 페이지에서 걷힘
  // ------------------------------------------------------------------------
  function setupPageTransitions() {
    if (reduceMotion) return;
    const curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    document.body.appendChild(curtain);

    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.target && a.target !== '_self') return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !/\.html?$|\/$/.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.hash) return;

      e.preventDefault();
      store.set('pt-curtain', '1');
      curtain.classList.add('is-leaving');
      setTimeout(() => { location.href = url.href; }, 620);
    });

    // 뒤로가기(bfcache)로 돌아왔을 때 커튼이 덮인 채 남지 않도록
    window.addEventListener('pageshow', ev => {
      if (ev.persisted) {
        curtain.classList.remove('is-leaving');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 커서 팔로워 (마우스 환경에서만)
  // ------------------------------------------------------------------------
  function setupCursor() {
    if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    let x = -100, y = -100, cx = -100, cy = -100;
    window.addEventListener('mousemove', e => {
      x = e.clientX; y = e.clientY;
      dot.classList.add('is-on');
    }, { passive: true });
    document.addEventListener('mouseleave', () => dot.classList.remove('is-on'));

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();

    const viewSel = 'a .card, a.card';
    const hoverSel = 'a, button, .hamburger, label, .selectable-card, .collection-method-card, input[type="submit"]';
    document.addEventListener('mouseover', e => {
      const t = e.target;
      const view = t.closest(viewSel);
      dot.classList.toggle('is-view', !!view);
      dot.textContent = view ? 'VIEW' : '';
      dot.classList.toggle('is-hover', !view && !!t.closest(hoverSel));
    });
  }
})();
