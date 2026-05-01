/* iSquared modern remodel — theme toggle + scroll reveal + nav-shadow */
(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  var STORAGE_KEY = 'theme';

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1020' : '#ffffff');
  }

  function initThemeToggle() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
    });

    /* React to system theme changes when user has no explicit choice */
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var listener = function (e) {
        if (!getStoredTheme()) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      };
      if (mq.addEventListener) mq.addEventListener('change', listener);
      else if (mq.addListener) mq.addListener(listener);
    }
  }

  /* ---------- Scroll reveal for cards / hero / sections ---------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;

    var selectors = [
      '.feature__item',
      '.grid__item',
      '.list__item',
      '.layout--splash #main > h1',
      '.layout--splash #main > p',
      '#mc_embed_signup'
    ];
    var nodes = document.querySelectorAll(selectors.join(','));
    if (!nodes.length) return;

    nodes.forEach(function (n) {
      n.classList.add('reveal');
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Add a subtle shadow to the nav once the user scrolls ---------- */
  function initNavShadow() {
    var nav = document.querySelector('.masthead');
    if (!nav) return;
    var update = function () {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- Copy button + language label on code blocks ---------- */
  var COPY_ICON_SVG =
    '<svg class="icon-copy" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<rect x="9" y="9" width="11" height="11" rx="2"></rect>' +
      '<path d="M5 15V6a2 2 0 0 1 2-2h9"></path>' +
    '</svg>';
  var CHECK_ICON_SVG =
    '<svg class="icon-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<polyline points="20 6 9 17 4 12"></polyline>' +
    '</svg>';

  /* Pretty-print common language slugs; fall back to capitalized slug. */
  var LANG_LABELS = {
    js: 'JavaScript',
    javascript: 'JavaScript',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    py: 'Python',
    python: 'Python',
    rb: 'Ruby',
    ruby: 'Ruby',
    sh: 'Shell',
    bash: 'Bash',
    zsh: 'Zsh',
    shell: 'Shell',
    yml: 'YAML',
    yaml: 'YAML',
    json: 'JSON',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    sass: 'Sass',
    md: 'Markdown',
    markdown: 'Markdown',
    cpp: 'C++',
    'c++': 'C++',
    c: 'C',
    cs: 'C#',
    csharp: 'C#',
    go: 'Go',
    rust: 'Rust',
    rs: 'Rust',
    java: 'Java',
    kotlin: 'Kotlin',
    swift: 'Swift',
    php: 'PHP',
    sql: 'SQL',
    r: 'R',
    plaintext: 'Text',
    text: 'Text'
  };

  function detectLanguage(wrapper) {
    if (!wrapper || !wrapper.classList) return '';
    var classes = wrapper.className.split(/\s+/);
    for (var i = 0; i < classes.length; i++) {
      var cls = classes[i];
      if (cls.indexOf('language-') === 0) {
        return cls.slice('language-'.length).toLowerCase();
      }
    }
    return '';
  }

  function prettyLangLabel(slug) {
    if (!slug) return 'Code';
    if (LANG_LABELS[slug]) return LANG_LABELS[slug];
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    document.body.appendChild(ta);
    var prevSelection = document.getSelection();
    var prevRange =
      prevSelection && prevSelection.rangeCount > 0
        ? prevSelection.getRangeAt(0)
        : null;
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    if (prevRange && prevSelection) {
      prevSelection.removeAllRanges();
      prevSelection.addRange(prevRange);
    }
    return ok ? Promise.resolve() : Promise.reject(new Error('copy failed'));
  }

  function copyText(text) {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function' &&
      window.isSecureContext !== false
    ) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopy(text);
      });
    }
    return fallbackCopy(text);
  }

  function flashState(btn, stateClass, duration) {
    btn.classList.remove('is-copied', 'is-error');
    btn.classList.add(stateClass);
    if (btn._copyTimer) {
      clearTimeout(btn._copyTimer);
    }
    btn._copyTimer = setTimeout(function () {
      btn.classList.remove(stateClass);
      btn._copyTimer = null;
    }, duration);
  }

  /* Extract clean code text from a Rouge wrapper, excluding any line-number
     gutter. Rouge's `line_table` mode renders:
       <table class="rouge-table">
         <tr>
           <td class="gutter gl"><pre class="lineno">1\n2\n…</pre></td>
           <td class="code"><pre>actual code…</pre></td>
         </tr>
       </table>
     Older / alternative configs may use `.rouge-gutter` and `.rouge-code`
     instead, so we accept both. The plain (no-linenos) variant has no table
     at all and we just read the inner <code>. */
  function extractCodeText(wrapper, codeEl) {
    var codeCell = wrapper.querySelector(
      '.rouge-table td.rouge-code, .rouge-table td.code, .rouge-code'
    );
    var source = codeCell || codeEl;
    if (!source) return '';

    var inner = source.querySelector('pre') || source;
    var clone = inner.cloneNode(true);

    var stripSelector =
      '.rouge-gutter, .gutter, .gl, .lineno, td.rouge-gutter, td.gutter';
    var junk = clone.querySelectorAll(stripSelector);
    Array.prototype.forEach.call(junk, function (node) {
      if (node.parentNode) node.parentNode.removeChild(node);
    });

    var text = clone.innerText || clone.textContent || '';
    return text.replace(/\n$/, '');
  }

  function initCodeCopy() {
    var wrappers = document.querySelectorAll(
      '.highlighter-rouge, figure.highlight'
    );
    if (!wrappers.length) return;

    Array.prototype.forEach.call(wrappers, function (wrapper) {
      if (wrapper.getAttribute('data-copy-init') === '1') return;

      var codeEl = wrapper.querySelector('pre code, code');
      if (!codeEl) return;

      var lang = detectLanguage(wrapper);
      var label = prettyLangLabel(lang);

      var header = document.createElement('div');
      header.className = 'code-block-header';

      var langSpan = document.createElement('span');
      langSpan.className = 'code-block-lang';
      langSpan.textContent = label;

      var btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Copy code');
      btn.setAttribute('title', 'Copy code');
      btn.innerHTML =
        COPY_ICON_SVG + CHECK_ICON_SVG + '<span class="sr-only">Copy code</span>';

      btn.addEventListener('click', function () {
        var text = extractCodeText(wrapper, codeEl);
        copyText(text).then(
          function () {
            flashState(btn, 'is-copied', 1400);
          },
          function () {
            flashState(btn, 'is-error', 1400);
          }
        );
      });

      header.appendChild(langSpan);
      header.appendChild(btn);

      wrapper.classList.add('has-copy-btn');
      wrapper.insertBefore(header, wrapper.firstChild);
      wrapper.setAttribute('data-copy-init', '1');
    });
  }

  /* ---------- Heading anchor icon ----------
     Minimal Mistakes' bundled `main.min.js` injects a `.header-link` anchor
     into every `.page__content` heading whose innerHTML is
       `<span class="sr-only">Permalink</span><i class="fa fa-link"></i>`.
     The site's stylesheet does not define `.sr-only` globally, so the
     literal word "Permalink" leaks through and is visible next to every
     heading. We rewrite each `.header-link` to use an inline SVG chain
     icon (no Font Awesome dependency) and keep an `sr-only` label for
     assistive tech. A short-lived MutationObserver covers the case where
     `main.min.js` (loaded `async`) inserts the anchors after this script
     runs. */
  var LINK_ICON_SVG =
    '<svg class="icon-link" viewBox="0 0 24 24" aria-hidden="true" focusable="false" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>' +
      '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' +
    '</svg>';

  function rewriteHeaderLink(anchor) {
    if (!anchor || anchor.getAttribute('data-icon-rewritten') === '1') return;
    anchor.innerHTML = LINK_ICON_SVG + '<span class="sr-only">Permalink</span>';
    anchor.setAttribute('aria-label', 'Permalink');
    anchor.setAttribute('title', 'Permalink');
    anchor.setAttribute('data-icon-rewritten', '1');
  }

  function rewriteAllHeaderLinks(scope) {
    var root = scope || document;
    var anchors = root.querySelectorAll('.page__content .header-link');
    Array.prototype.forEach.call(anchors, rewriteHeaderLink);
  }

  function initHeaderLinkIcon() {
    rewriteAllHeaderLinks();

    var content = document.querySelector('.page__content');
    if (!content || typeof MutationObserver === 'undefined') return;

    var observer = new MutationObserver(function (mutations) {
      var rescan = false;
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (!node || node.nodeType !== 1) continue;
          if (node.classList && node.classList.contains('header-link')) {
            rewriteHeaderLink(node);
          } else if (node.querySelector && node.querySelector('.header-link')) {
            rescan = true;
          }
        }
      }
      if (rescan) rewriteAllHeaderLinks(content);
    });

    observer.observe(content, { childList: true, subtree: true });

    /* The async `main.min.js` finishes well before this. Disconnect after a
       short window so the observer doesn't keep watching the post forever. */
    setTimeout(function () {
      rewriteAllHeaderLinks(content);
      observer.disconnect();
    }, 3000);
  }

  /* ---------- Floating back-to-top button ----------
     The markup (`<button class="back-to-top" hidden>`) lives in
     `_includes/scripts.html`. We strip the `hidden` attribute on boot, then
     toggle an `is-visible` class once the user has scrolled past ~600px.
     The scroll handler is throttled with `requestAnimationFrame` so it
     never runs more than once per frame. Click smooth-scrolls to the top
     (or jumps instantly when the user prefers reduced motion). */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn || btn.getAttribute('data-btt-init') === '1') return;
    btn.setAttribute('data-btt-init', '1');

    btn.removeAttribute('hidden');

    var THRESHOLD = 600;
    var ticking = false;

    function update() {
      ticking = false;
      if (window.scrollY > THRESHOLD) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', function () {
      var reduceMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initThemeToggle();
    initReveal();
    initNavShadow();
    initCodeCopy();
    initHeaderLinkIcon();
    initBackToTop();
  });
})();
