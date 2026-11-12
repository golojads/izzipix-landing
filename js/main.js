(function () {
  var overlay = document.getElementById('modal');
  var lastTrigger = null;

  function openModal(key, trigger) {
    var body = overlay.querySelector('.mbody[data-key="' + key + '"]');
    if (!body) return;
    overlay.querySelectorAll('.mbody').forEach(function (el) { el.hidden = true; });
    body.hidden = false;
    if (overlay.hidden) lastTrigger = trigger || null;
    overlay.hidden = false;
    overlay.scrollTop = 0;
    document.body.classList.add('noscroll');
    var closeBtn = overlay.querySelector('.x');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    overlay.hidden = true;
    document.body.classList.remove('noscroll');
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-modal]');
    if (t) { e.preventDefault(); openModal(t.getAttribute('data-modal'), t); return; }
    if (e.target.closest('[data-close]')) { closeModal(); }
  });

  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });

  // mobile menu
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mmenu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.hidden = !open;
  }
  burger.addEventListener('click', function () { setMenu(menu.hidden); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  window.addEventListener('resize', function () { if (window.innerWidth > 720) setMenu(false); });
})();

// Results calculator: range of turnover per session based on 3 real events (15.6-21.5 EUR per child)
(function () {
  var r = document.getElementById('kids');
  if (!r) return;
  var outK = document.getElementById('kidsOut'), outC = document.getElementById('calcOut');
  var fmt = function (n) { return String(Math.round(n / 50) * 50).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };
  function upd() {
    var k = +r.value;
    outK.textContent = k;
    outC.textContent = fmt(k * 15.6) + ' - ' + fmt(k * 21.5) + ' €';
    r.style.setProperty('--p', ((k - r.min) / (r.max - r.min) * 100) + '%');
  }
  r.addEventListener('input', upd); upd();
})();
