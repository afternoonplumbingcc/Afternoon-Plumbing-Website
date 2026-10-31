/* New Design reviews carousel.
   Vanilla JS only. No dependencies, no network calls.

   Behaviour:
   - The track ships as a wrapping CSS grid so every review is visible with
     JavaScript disabled. This script adds the ready class, which turns the
     track into a horizontal scroll-snap track and reveals the arrow buttons.
   - The prev/next buttons are faded out by CSS until the carousel is hovered
     or focus enters it. They are never display:none, so they stay in the tab
     order for keyboard users.
   - The track advances one review every 3 seconds. That motion stops for
     good the first time the reader interacts with the carousel (clicking an
     arrow, touching or swiping the track, tabbing into it, or pressing an
     arrow key). A visible Pause/Play button lets a reader stop or restart the
     rotation before that happens.
   - The rotation also pauses while the pointer or the keyboard focus sits
     inside the carousel, while the tab is hidden, and while the carousel is
     scrolled out of view. Those pauses are temporary: the rotation picks up
     again when the reader moves away, unless the reader already interacted.
   - prefers-reduced-motion is respected: no automatic rotation at all, and
     scrolling is instant, not smooth.
*/
(function () {
  'use strict';

  var root = document.querySelector('[data-review-carousel]');
  if (!root) return;

  var track = root.querySelector('[data-review-track]');
  var prev = root.querySelector('[data-review-prev]');
  var next = root.querySelector('[data-review-next]');
  var toggle = root.querySelector('[data-review-toggle]');
  var toggleText = root.querySelector('[data-review-toggle-text]');
  if (!track || !prev || !next) return;

  var cards = Array.prototype.slice.call(track.querySelectorAll('.nd-hm-review-card'));
  if (!cards.length) return;

  var INTERVAL = 3000;
  var SETTLE = 420;

  /* State.
     interacted  the reader touched the carousel, so the rotation never
                 comes back on its own. This is a permanent stop.
     userPaused  the reader pressed the Pause button. Reversible.
     pointerIn   the pointer is over the carousel region.
     focusIn     the keyboard focus is inside the carousel region.
     hidden      the tab is in the background.
     inView      the carousel is on screen.
     advancing   a scroll is still settling, so a new advance is skipped. */
  var state = {
    interacted: false,
    userPaused: false,
    userWantsPlay: false,
    pointerIn: false,
    focusIn: false,
    hidden: false,
    inView: true,
    advancing: false
  };

  var timer = null;

  function reduceMotion() {
    return !!(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* Distance to the next slide: one card plus the track gap. */
  function step() {
    var card = cards[0];
    if (!card) return 320;
    var styles = window.getComputedStyle(track);
    var gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function maxScroll() {
    return Math.max(0, track.scrollWidth - track.clientWidth);
  }

  function atStart() {
    return track.scrollLeft <= 1;
  }

  function atEnd() {
    return track.scrollLeft >= maxScroll() - 1;
  }

  function updateButtons() {
    var start = atStart();
    var end = atEnd();
    prev.disabled = start;
    next.disabled = end;
    prev.setAttribute('aria-disabled', start ? 'true' : 'false');
    next.setAttribute('aria-disabled', end ? 'true' : 'false');
  }

  function scrollTo(left, instant) {
    var wantInstant = instant || reduceMotion();
    var behavior = wantInstant ? 'auto' : 'smooth';
    var previous = track.style.scrollBehavior;
    if (wantInstant) track.style.scrollBehavior = 'auto';
    try {
      track.scrollTo({ left: left, behavior: behavior });
    } catch (err) {
      track.scrollLeft = left;
    }
    if (wantInstant) {
      /* Restore the stylesheet value so later smooth steps still animate. */
      window.setTimeout(function () {
        track.style.scrollBehavior = previous;
      }, 0);
    }
    state.advancing = true;
    window.setTimeout(function () {
      state.advancing = false;
    }, SETTLE);
    window.setTimeout(updateButtons, 60);
  }

  function scrollBy(dir) {
    var target = track.scrollLeft + dir * step();
    var limit = maxScroll();
    if (target > limit) target = limit;
    if (target < 0) target = 0;
    scrollTo(target, false);
  }

  /* One automatic step. On the last slide it wraps back to the first one
     and keeps going. */
  function advance() {
    /* Re-read the pointer and focus state on every tick. The page can
       scroll under a still pointer, or the reader can drag focus away
       without a matching event, so the flags are checked against the live
       DOM before the rotation is allowed to run. */
    if (!state.userWantsPlay) {
      state.pointerIn = root.matches(':hover');
      state.focusIn = root.contains(document.activeElement);
    }
    if (!shouldPlay()) {
      sync();
      return;
    }
    if (state.advancing) return;
    if (atEnd()) {
      scrollTo(0, false);
    } else {
      scrollBy(1);
    }
  }

  /* The rotation only runs when every condition is met. */
  function shouldPlay() {
    if (reduceMotion()) return false;
    if (state.interacted) return false;
    if (state.userPaused) return false;
    if (state.hidden) return false;
    if (!state.inView) return false;
    /* A reader who pressed Play asked for the motion on purpose, so the
       pointer and focus pauses do not fight that choice. */
    if (!state.userWantsPlay) {
      if (state.pointerIn) return false;
      if (state.focusIn) return false;
    }
    return true;
  }
  function sync() {
    if (shouldPlay()) {
      if (timer === null) {
        timer = window.setInterval(advance, INTERVAL);
      }
    } else if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
    updateToggle();
  }

  function updateToggle() {
    if (!toggle) return;
    var reduced = reduceMotion();
    if (reduced) {
      toggle.setAttribute('aria-disabled', 'true');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('aria-label', 'Automatic review rotation is off');
      if (toggleText) toggleText.textContent = 'Auto off';
      return;
    }
    if (state.interacted) {
      toggle.setAttribute('aria-disabled', 'true');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('aria-label', 'Automatic review rotation stopped after your interaction');
      if (toggleText) toggleText.textContent = 'Stopped';
      return;
    }
    toggle.removeAttribute('aria-disabled');
    var on = !state.userPaused;
    toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) {
      toggle.setAttribute('aria-label', 'Pause automatic review rotation');
      if (toggleText) toggleText.textContent = 'Pause';
    } else {
      toggle.setAttribute('aria-label', 'Start automatic review rotation');
      if (toggleText) toggleText.textContent = 'Play';
    }
  }

  /* A reader interaction stops the rotation for good. */
  function stopForInteraction() {
    if (state.interacted) return;
    state.interacted = true;
    sync();
  }

  prev.addEventListener('click', function () {
    stopForInteraction();
    if (prev.disabled) return;
    scrollBy(-1);
  });

  next.addEventListener('click', function () {
    stopForInteraction();
    if (next.disabled) return;
    scrollBy(1);
  });

  /* The pause button is not an interaction with the track, so pressing it
     does not count as the permanent stop. */
  if (toggle) {
    toggle.addEventListener('click', function () {
      if (reduceMotion()) return;
      if (state.interacted) return;
      state.userPaused = !state.userPaused;
      state.userWantsPlay = state.userPaused ? false : true;
      sync();
    });
  }

  track.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      stopForInteraction();
      scrollBy(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stopForInteraction();
      scrollBy(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      stopForInteraction();
      scrollTo(0, false);
    } else if (event.key === 'End') {
      event.preventDefault();
      stopForInteraction();
      scrollTo(maxScroll(), false);
    }
  });

  /* Pointer and touch on the track count as interaction. */
  track.addEventListener('pointerdown', stopForInteraction);
  track.addEventListener('touchstart', stopForInteraction, { passive: true });
  track.addEventListener('wheel', stopForInteraction, { passive: true });

  /* Temporary pause while the pointer rests over the carousel region. */
  root.addEventListener('pointerenter', function () {
    state.pointerIn = true;
    sync();
  });
  root.addEventListener('pointerleave', function () {
    /* A scroll can move the carousel out from under a still pointer and fire
       a leave event. Confirm on the next tick before giving up the pause. */
    window.setTimeout(function () {
      if (root.matches(':hover')) return;
      state.pointerIn = false;
      sync();
    }, 0);
  });

  /* Temporary pause while the keyboard focus sits inside the carousel.
     Tabbing into the track itself is also a permanent stop, because the
     reader has taken control of the carousel. */
  root.addEventListener('focusin', function (event) {
    state.focusIn = true;
    var onToggle = event.target && event.target.closest &&
      event.target.closest('[data-review-toggle]');
    if (!onToggle && event.target !== toggle) {
      stopForInteraction();
    }
    sync();
  });
  root.addEventListener('focusout', function (event) {
    if (!root.contains(event.relatedTarget)) {
      state.focusIn = false;
      sync();
    }
  });

  track.addEventListener('scroll', function () {
    window.requestAnimationFrame(updateButtons);
  });

  window.addEventListener('resize', function () {
    updateButtons();
    sync();
  });

  /* Pause while the tab is in the background. */
  document.addEventListener('visibilitychange', function () {
    state.hidden = document.hidden;
    sync();
  });

  /* Pause while the carousel is scrolled out of view. */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        state.inView = entry.isIntersecting;
      });
      sync();
    }, { threshold: 0.15 });
    observer.observe(root);
  }

  /* Convert the no-JS grid into the carousel. */
  root.classList.add('nd-hm-review-carousel-ready');
  updateButtons();
  sync();
  /* Late pass in case fonts or images change the card widths. */
  window.addEventListener('load', function () {
    updateButtons();
    sync();
  });
})();
