/* Khurak Fit · khurakfit.com */
(function () {
  "use strict";
  var d = document, w = window, root = d.documentElement;
  var reduce = w.matchMedia && w.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, el) { return (el || d).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || d).querySelectorAll(s)); };

  // A home-screen install of the old site opens the app directly.
  if (d.body.hasAttribute("data-home") && ((w.matchMedia && w.matchMedia("(display-mode: standalone)").matches) || w.navigator.standalone)) {
    w.location.replace("app/"); return;
  }

  // header, progress bar, back to top
  var hdr = $(".hdr"), bar = $(".progress"), top = $(".totop");
  var ticking = false;
  function onScroll() {
    var y = w.scrollY || root.scrollTop, h = root.scrollHeight - w.innerHeight;
    if (hdr) hdr.classList.toggle("solid", y > 30);
    if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
    if (top) top.classList.toggle("show", y > 900);
    parallax(y);
    ticking = false;
  }
  w.addEventListener("scroll", function () { if (!ticking) { ticking = true; w.requestAnimationFrame(onScroll); } }, { passive: true });
  if (top) top.addEventListener("click", function () { w.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  // mobile menu
  var burger = $(".burger");
  function closeMenu() { d.body.classList.remove("menu-open"); if (burger) burger.setAttribute("aria-expanded", "false"); }
  if (burger) {
    burger.addEventListener("click", function () {
      var o = d.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", o ? "true" : "false");
    });
    $$(".nav a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  // reveal on scroll + count-up + steps line
  function countUp(el) {
    var end = parseFloat(el.getAttribute("data-count")), dur = 1600, t0 = null;
    if (reduce) { el.textContent = end; return; }
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * e);
      if (p < 1) w.requestAnimationFrame(step);
    }
    w.requestAnimationFrame(step);
  }
  var targets = $$(".rv, [data-count], .steps");
  if ("IntersectionObserver" in w) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add("in");
        if (el.hasAttribute("data-count")) countUp(el);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("in"); if (el.hasAttribute("data-count")) el.textContent = el.getAttribute("data-count"); });
  }

  // hero phones follow the mouse a little, and drift on scroll
  var stage = $(".stage"), devs = stage ? $$(".device", stage) : [];
  var mx = 0, my = 0;
  function parallax(y) {
    if (!stage || reduce) return;
    devs.forEach(function (el, i) {
      var depth = [1, 0.55, 0.55][i] || 0.5, base = el.getAttribute("data-rot") || "0";
      el.style.transform = "translate3d(" + (mx * 18 * depth) + "px," + (my * 14 * depth - y * 0.08 * (i ? 1.4 : 1)) + "px,0) rotate(" + base + "deg)";
    });
  }
  if (stage && !reduce && w.matchMedia("(pointer:fine)").matches) {
    d.addEventListener("mousemove", function (e) {
      mx = e.clientX / w.innerWidth - 0.5; my = e.clientY / w.innerHeight - 0.5;
      if (!ticking) { ticking = true; w.requestAnimationFrame(onScroll); }
    });
  }

  // spotlight on dark tiles
  $$(".tile").forEach(function (t) {
    t.addEventListener("pointermove", function (e) {
      var r = t.getBoundingClientRect();
      t.style.setProperty("--x", (e.clientX - r.left) + "px");
      t.style.setProperty("--y", (e.clientY - r.top) + "px");
    });
  });

  // workout videos: play only while on screen
  var vids = $$(".ex video");
  var vio = "IntersectionObserver" in w ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting && !v.closest("[hidden]")) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        if (!reduce) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      } else v.pause();
    });
  }, { rootMargin: "120px 0px" }) : null;
  vids.forEach(function (v) { if (vio) vio.observe(v); else v.src = v.dataset.src; });

  // workout filters: home / gym, male / female
  var wk = $(".workouts");
  if (wk) {
    var state = { set: "home", g: "female" };
    function apply() {
      $$(".ex", wk).forEach(function (c) {
        c.hidden = c.getAttribute("data-set") !== state.set;
        var v = $("video", c), id = c.getAttribute("data-id");
        var src = "assets/ex/" + id + "-" + state.g + ".mp4";
        if (v.getAttribute("data-src") !== src) {
          v.setAttribute("data-src", src);
          v.poster = "assets/ex/" + id + "-" + state.g + ".webp";
          if (v.src) { v.src = src; if (!c.hidden && !reduce) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
        }
        if (!c.hidden && vio) { vio.unobserve(v); vio.observe(v); }
      });
    }
    $$(".seg button", wk).forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-k"), val = b.getAttribute("data-v");
        state[k] = val;
        $$('.seg button[data-k="' + k + '"]', wk).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        apply();
      });
    });
    apply();
  }

  // promo video
  var vb = $(".vbox");
  if (vb) {
    var pv = $("video", vb), pb = $(".play", vb);
    pb.addEventListener("click", function () { vb.classList.add("on"); pv.controls = true; pv.play(); });
    pv.addEventListener("ended", function () { vb.classList.remove("on"); pv.controls = false; });
  }

  // smooth FAQ
  $$(".faq details").forEach(function (det) {
    var sum = $("summary", det), ans = $(".ans", det);
    if (!ans) return;
    sum.addEventListener("click", function (e) {
      if (reduce) return;
      e.preventDefault();
      if (det.open) {
        ans.animate([{ height: ans.offsetHeight + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 320, easing: "cubic-bezier(.2,.8,.2,1)" }).onfinish = function () { det.open = false; };
      } else {
        det.open = true;
        var h = ans.offsetHeight;
        ans.animate([{ height: "0px", opacity: 0 }, { height: h + "px", opacity: 1 }], { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" });
      }
    });
  });

  // table of contents: highlight the section on screen
  var toc = $$(".toc a");
  if (toc.length && "IntersectionObserver" in w) {
    var map = {};
    toc.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { toc.forEach(function (a) { a.classList.remove("on"); }); var a = map[e.target.id]; if (a) a.classList.add("on"); }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) { var h = d.getElementById(id); if (h) tio.observe(h); });
  }

  // year
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // the old offline helper at the site root is no longer needed
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (rs) {
      rs.forEach(function (r) { if (!/\/app\/$/.test(new URL(r.scope).pathname)) r.unregister(); });
    }).catch(function () {});
  }

  onScroll();
})();
