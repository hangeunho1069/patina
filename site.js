// ==========================================================================
// patina — Editorial edition
// 1) 페이지 전환  2) 마스트헤드  3) Contents 메뉴  4) 스크롤 등장
// 5) 가로 스트립   6) 폼(선택·업로드·제출)  7) 안내 다이얼로그
// ==========================================================================
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { sessionStorage.removeItem(k); } catch (e) {} }
  };

  // ------------------------------------------------------------------------
  // 1. 페이지 전환: 딥그린 커튼
  // ------------------------------------------------------------------------
  var curtain = document.createElement('div');
  curtain.className = 'curtain';
  curtain.setAttribute('aria-hidden', 'true');

  function arrive() {
    if (!root.classList.contains('arriving')) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { root.classList.add('arrived'); });
    });
    // 안전장치: 어떤 경우에도 1.2초 뒤엔 커튼을 치움
    setTimeout(function () { root.classList.remove('arriving', 'arrived'); }, 1200);
  }

  function go(url) {
    if (reduce) { location.href = url; return; }
    store.set('pt-arrive', '1');
    curtain.classList.add('is-leaving');
    setTimeout(function () { location.href = url; }, 650);
  }

  function setupTransitions() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^(mailto|tel):/.test(href)) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      go(url.href);
    });
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) {
        curtain.classList.remove('is-leaving');
        closeContents();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. 마스트헤드: 스크롤 내리면 숨고, 올리면 나타남 + 진행 바
  // ------------------------------------------------------------------------
  function setupMasthead() {
    var head = document.querySelector('.masthead');
    var bar = document.createElement('div');
    bar.className = 'progress';
    document.body.appendChild(bar);

    var lastY = window.scrollY;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
      if (head) {
        head.classList.toggle('is-scrolled', y > 8);
        var down = y > lastY && y > 240;
        if (Math.abs(y - lastY) > 6) head.classList.toggle('is-hidden', down);
      }
      lastY = y;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();

    // 현재 페이지 표시
    var here = location.pathname.split('/').pop() || 'index.html';
    var group = {
      'request_form.html': 'request.html',
      'request_form_lv1.html': 'request.html',
      'request_form_lv2.html': 'request.html',
      'request_form_lv3.html': 'request.html',
      'request_form_collection.html': 'request.html'
    };
    var key = group[here] || here;
    document.querySelectorAll('.nav a').forEach(function (a) {
      if (a.getAttribute('href').replace('./', '') === key) a.setAttribute('aria-current', 'page');
    });
  }

  // ------------------------------------------------------------------------
  // 3. Contents (목차) 메뉴
  // ------------------------------------------------------------------------
  var contents, opener;
  function openContents() {
    if (!contents) return;
    contents.classList.add('is-open');
    contents.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (opener) opener.setAttribute('aria-expanded', 'true');
    setTimeout(function () {
      var first = contents.querySelector('.contents-close');
      if (first) first.focus({ preventScroll: true });
    }, 400);
  }
  function closeContents() {
    if (!contents || !contents.classList.contains('is-open')) return;
    contents.classList.remove('is-open');
    contents.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (opener) { opener.setAttribute('aria-expanded', 'false'); opener.focus({ preventScroll: true }); }
  }
  function setupContents() {
    contents = document.querySelector('.contents');
    opener = document.querySelector('.contents-btn');
    if (!contents || !opener) return;

    opener.addEventListener('click', openContents);
    contents.querySelector('.contents-close').addEventListener('click', closeContents);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeContents();
    });

    // 항목 위에서 미리보기 사진이 커서를 따라옴
    var peek = document.createElement('div');
    peek.className = 'contents-peek';
    peek.setAttribute('aria-hidden', 'true');
    var img = document.createElement('img');
    img.alt = '';
    peek.appendChild(img);
    contents.appendChild(peek);

    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    function follow() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      peek.style.left = cx + 'px';
      peek.style.top = cy + 'px';
      if (peek.classList.contains('is-on')) requestAnimationFrame(follow);
      else running = false;
    }
    contents.querySelectorAll('.contents-list a').forEach(function (a) {
      a.addEventListener('mouseenter', function (e) {
        if (!a.dataset.peek) return;
        img.src = a.dataset.peek;
        tx = cx = e.clientX + 160;
        ty = cy = e.clientY;
        peek.classList.add('is-on');
        if (!running) { running = true; requestAnimationFrame(follow); }
      });
      a.addEventListener('mousemove', function (e) { tx = e.clientX + 160; ty = e.clientY; });
      a.addEventListener('mouseleave', function () { peek.classList.remove('is-on'); });
    });
  }

  // ------------------------------------------------------------------------
  // 4. 스크롤 등장
  // ------------------------------------------------------------------------
  function setupReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal], [data-lines]'));
    if (!els.length) return;

    // 사진 덮개 색은 가장 가까운 배경색을 따름
    els.forEach(function (el) {
      if (el.getAttribute('data-reveal') !== 'img') return;
      for (var n = el.parentElement; n; n = n.parentElement) {
        var c = getComputedStyle(n).backgroundColor;
        if (c && c !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(c)) { el.style.setProperty('--cover', c); break; }
      }
    });
    // 줄 단위 제목: 각 줄에 순서 번호
    document.querySelectorAll('[data-lines]').forEach(function (el) {
      el.querySelectorAll('.line > span').forEach(function (s, i) { s.style.setProperty('--i', i); });
    });

    if (reduce) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }

    var pending = els.slice();
    function show(list) {
      list.sort(function (a, b) {
        var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return (ra.top - rb.top) || (ra.left - rb.left);
      });
      list.forEach(function (el, i) {
        if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', Math.min(i * 0.08, 0.4) + 's');
        el.classList.add('is-in');
      });
      pending = pending.filter(function (el) { return !el.classList.contains('is-in'); });
    }

    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
      var hit = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { io.unobserve(e.target); return e.target; });
      if (hit.length) show(hit);
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;
    if (io) els.forEach(function (el) { io.observe(el); });

    // 안전장치: 교차 감지가 멈춰도 화면 안의 요소는 반드시 보이게
    function sweep() {
      var vh = window.innerHeight;
      var hit = pending.filter(function (el) {
        var r = el.getBoundingClientRect();
        return r.top < vh * 0.94 && r.bottom > 0;
      });
      if (hit.length) { if (io) hit.forEach(function (el) { io.unobserve(el); }); show(hit); }
      if (!pending.length) { clearInterval(timer); window.removeEventListener('scroll', onScroll); }
    }
    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      setTimeout(function () { queued = false; sweep(); }, 140);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    var timer = setInterval(sweep, 800);
  }

  // ------------------------------------------------------------------------
  // 5. 가로 스트립: 드래그 스크롤 + 진행 표시
  // ------------------------------------------------------------------------
  function setupStrips() {
    document.querySelectorAll('.strip').forEach(function (strip) {
      var bar = strip.parentElement.querySelector('.strip-progress span');
      function sync() {
        if (!bar) return;
        var max = strip.scrollWidth - strip.clientWidth;
        var ratio = strip.clientWidth / strip.scrollWidth;
        bar.style.width = (ratio * 100) + '%';
        bar.style.transform = 'translateX(' + (max > 0 ? (strip.scrollLeft / max) * ((1 - ratio) / ratio) * 100 : 0) + '%)';
      }
      strip.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();

      var down = false, moved = false, startX = 0, startLeft = 0;
      strip.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse') return;
        down = true; moved = false; startX = e.clientX; startLeft = strip.scrollLeft;
      });
      window.addEventListener('pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 4) { moved = true; strip.classList.add('is-dragging'); }
        strip.scrollLeft = startLeft - dx;
      });
      window.addEventListener('pointerup', function () {
        if (!down) return;
        down = false;
        setTimeout(function () { strip.classList.remove('is-dragging'); }, 0);
      });
      strip.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    });
  }

  // ------------------------------------------------------------------------
  // 7. 안내 다이얼로그 (alert 대체)
  // ------------------------------------------------------------------------
  var dialog;
  function notice(title, message, buttonText, onClose) {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'dialog';
      dialog.innerHTML = '<div class="dialog-inner"><p class="kicker">patina</p><h2 class="h3"></h2><p class="dialog-msg"></p><button type="button" class="btn btn-solid"><span class="dialog-btn"></span><span class="arr">→</span></button></div>';
      document.body.appendChild(dialog);
    }
    dialog.querySelector('.h3').textContent = title;
    dialog.querySelector('.dialog-msg').textContent = message;
    dialog.querySelector('.dialog-btn').textContent = buttonText || '확인';
    var btn = dialog.querySelector('button');
    var done = function () {
      btn.removeEventListener('click', done);
      dialog.removeEventListener('cancel', done);
      if (dialog.open) dialog.close();
      if (onClose) onClose();
    };
    btn.addEventListener('click', done);
    dialog.addEventListener('cancel', done);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else { alert(title + '\n' + message); done(); }
    btn.focus();
  }

  // ------------------------------------------------------------------------
  // 6. 폼
  // ------------------------------------------------------------------------
  function setupForms() {
    // (a) "Other" 선택 시에만 입력칸 활성화
    document.querySelectorAll('[data-other-for]').forEach(function (input) {
      var name = input.getAttribute('data-other-for');
      var radios = document.querySelectorAll('input[name="' + name + '"]');
      radios.forEach(function (r) {
        r.addEventListener('change', function () {
          var on = r.value === 'Other' && r.checked;
          input.disabled = !on;
          input.required = on;
          if (on) input.focus(); else input.value = '';
        });
      });
    });

    // (b) 사진 업로드: 클릭·드래그 앤 드롭, 장수 제한
    document.querySelectorAll('.upload').forEach(function (zone) {
      var input = zone.querySelector('input[type="file"]');
      var list = zone.parentElement.querySelector('.file-list');
      var max = parseInt(input.getAttribute('data-max') || '5', 10);
      function render(files) {
        list.innerHTML = '';
        Array.prototype.forEach.call(files, function (f) {
          var li = document.createElement('li');
          var name = document.createElement('span');
          name.textContent = '✓ ' + f.name;
          var size = document.createElement('span');
          size.textContent = (f.size / 1024).toFixed(1) + ' KB';
          li.appendChild(name); li.appendChild(size);
          list.appendChild(li);
        });
      }
      function accept(files) {
        if (files.length > max) {
          notice('사진이 너무 많아요', '사진은 최대 ' + max + '장까지 올릴 수 있어요.');
          input.value = '';
          list.innerHTML = '';
          return;
        }
        render(files);
      }
      zone.addEventListener('click', function (e) { if (e.target !== input) input.click(); });
      zone.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
      input.addEventListener('change', function () { accept(input.files); });
      ['dragenter', 'dragover'].forEach(function (t) {
        zone.addEventListener(t, function (e) { e.preventDefault(); zone.classList.add('is-over'); });
      });
      ['dragleave', 'drop'].forEach(function (t) {
        zone.addEventListener(t, function (e) { e.preventDefault(); zone.classList.remove('is-over'); });
      });
      zone.addEventListener('drop', function (e) {
        var files = e.dataTransfer.files;
        try { input.files = files; } catch (err) {}
        accept(files);
      });
    });

    // (c) 큰 선택 카드(레벨/수거 방식) 필수 확인
    function pickRequired(form) {
      var group = form.querySelector('[data-pick-required]');
      if (!group) return true;
      var name = group.getAttribute('data-pick-required');
      var ok = !!form.querySelector('input[name="' + name + '"]:checked');
      var err = form.querySelector('.form-error');
      if (err) err.textContent = ok ? '' : group.getAttribute('data-pick-message');
      if (!ok) group.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      return ok;
    }
    document.querySelectorAll('[data-pick-required] input').forEach(function (r) {
      r.addEventListener('change', function () {
        var err = r.form && r.form.querySelector('.form-error');
        if (err) err.textContent = '';
      });
    });

    // (d) 제출: data-flow 값에 따라 다음 동작
    document.querySelectorAll('form[data-flow]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!pickRequired(form)) return;
        if (!form.reportValidity()) return;

        var flow = form.getAttribute('data-flow');
        var val = function (id) { var el = form.querySelector('#' + id); return el ? el.value.trim() : ''; };

        if (flow === 'level') {
          var lv = form.querySelector('input[name="level"]:checked').value;
          go('./request_form_' + lv + '.html');
          return;
        }
        if (flow === 'diagnosis') {
          notice('사전 진단서 작성 완료', '[' + val('objName') + '] 사전 진단서 작성이 완료되었습니다.\n이제 수거 방식을 선택해 주세요.', '수거 방식 선택', function () {
            go('./request_form_collection.html');
          });
          return;
        }
        if (flow === 'collection') {
          var m = form.querySelector('input[name="method"]:checked').value;
          var mName = m === 'box' ? 'Send patina Box' : 'Self Drop-off';
          notice('의뢰가 접수되었습니다', '[' + mName + '] 수거 방식이 반영되었습니다.\n모든 의뢰 절차가 접수되었고, 곧 담당 디자이너가 연락드릴 예정입니다.', '처음으로', function () {
            go('./index.html');
          });
          return;
        }
        if (flow === 'donate') {
          notice('감사합니다, ' + val('donateName') + '님', '3일 이내로 입력하신 연락처(' + val('donateContact') + ')로 안내를 드리겠습니다.', '확인', function () {
            form.reset();
          });
          return;
        }
        // request: Lv1 / Lv2 접수
        var label = form.getAttribute('data-label') || '';
        notice('의뢰서가 접수되었습니다', '[' + label + '] 의뢰서 접수가 완료되었습니다.\n검토 후 예상 견적서를 보내드릴게요.', '처음으로', function () {
          form.reset();
          go('./index.html');
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 시작
  // ------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(curtain);
    arrive();
    setupTransitions();
    setupMasthead();
    setupContents();
    setupReveal();
    setupStrips();
    setupForms();
    requestAnimationFrame(function () {
      setTimeout(function () { root.classList.add('is-loaded'); }, 60);
    });
  });
})();
