/* ==========================================================================
   Mickey Ever After — sparkle particles + reduced-motion guard
   Pure transform/opacity animation; ≤30 elements; pauses on tab hidden.
   ========================================================================== */
(function () {
  'use strict';

  // Respect user motion preference — bail entirely if reduced motion is on.
  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return;

  var container = document.getElementById('particles');
  if (!container) return;

  var MAX_SPARKLES = 30;
  var MAX_DURATION_MS = 12000; // upper bound of 8–12s loop per plan

  // Pre-defined slots with random positions + animation delay/duration so
  // sparkles appear scattered and never all peak at the same frame.
  function rand(min, max) { return Math.random() * (max - min) + min; }

  var html = '';
  for (var i = 0; i < MAX_SPARKLES; i++) {
    var left = rand(2, 98).toFixed(2);
    var top = rand(8, 92).toFixed(2);
    var duration = rand(8000, MAX_DURATION_MS).toFixed(0);
    var delay = rand(0, 9000).toFixed(0);
    var size = rand(3, 6).toFixed(1);
    // Mix accent red and white sparkles for visual interest
    var isAccent = i % 3 === 0;
    var color = isAccent ? '#c0282a' : '#ffffff';
    var shadow = isAccent
      ? '0 0 10px rgba(192,40,42,0.8)'
      : '0 0 10px rgba(255,255,255,0.9)';

    html +=
      '<span class="sparkle" style="' +
        'left:' + left + '%;' +
        'top:' + top + '%;' +
        'width:' + size + 'px;' +
        'height:' + size + 'px;' +
        'background:' + color + ';' +
        'box-shadow:' + shadow + ';' +
        'animation-duration:' + duration + 'ms;' +
        'animation-delay:-' + delay + 'ms;' +
      '"></span>';
  }
  container.innerHTML = html;

  // Pause all sparkles when tab is hidden — saves battery, respects CPU budget.
  function pause() {
    var nodes = container.children;
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.animationPlayState = 'paused';
    }
  }
  function resume() {
    var nodes = container.children;
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.animationPlayState = 'running';
    }
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pause(); else resume();
  });

  // Defensive: if user toggles reduced-motion at runtime, remove particles.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    var onChange = function (e) {
      if (e.matches) {
        container.innerHTML = '';
        mq.removeEventListener && mq.removeEventListener('change', onChange);
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange); // Safari < 14 fallback
  }
})();
