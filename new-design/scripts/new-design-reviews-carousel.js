/* New Design reviews carousel.
   Vanilla JS only. No dependencies, no network calls, no autoplay.
   Touch swipe is left to native CSS scroll-snap: touch events are not hijacked.

   Behaviour:
   - The track ships as a wrapping CSS grid so every review is visible with
     JavaScript disabled. This script adds the ready class, which turns the
     track into a horizontal scroll-snap track and reveals the arrow buttons.
   - The prev/next buttons disable at the first and last slide and re-enable
     as the track scrolls.
   - Arrow keys work when the track has focus.
   - prefers-reduced-motion is respected: scrolling is instant, not smooth.
*/
(function () {
  'use strict';

  var root = document.querySelector('[data-review-carousel]');
  if (!root) return;

  var track = root.querySelector('[data-review-track]');
  var prev = root.querySelector('[data-review-prev]');
  var next = root.querySelector('[data-review-next]');
  if (!track || !prev || !next) return;

  var cards = Array.prototype.slice.call(track.querySelectorAll('.nd-hm-review-card'));
  if (!cards.length) return;

  function reduceMotion() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  function scrollBy(dir) {
    var behavior = reduceMotion() ? 'auto' : 'smooth';
    try {
      track.scrollBy({ left: dir * step(), behavior: behavior });
    } catch (err) {
      track.scrollLeft += dir * step();
    }
    /* Update right away so the buttons respond before the scroll settles. */
    window.setTimeout(updateButtons, 60);
  }

  prev.addEventListener('click', function () {
    if (prev.disabled) return;
    scrollBy(-1);
  });

  next.addEventListener('click', function () {
    if (next.disabled) return;
    scrollBy(1);
  });

  track.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollBy(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollBy(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      var behavior = reduceMotion() ? 'auto' : 'smooth';
      track.scrollTo({ left: 0, behavior: behavior });
      window.setTimeout(updateButtons, 60);
    } else if (event.key === 'End') {
      event.preventDefault();
      var endBehavior = reduceMotion() ? 'auto' : 'smooth';
      track.scrollTo({ left: maxScroll(), behavior: endBehavior });
      window.setTimeout(updateButtons, 60);
    }
  });

  track.addEventListener('scroll', function () {
    window.requestAnimationFrame(updateButtons);
  });

  window.addEventListener('resize', updateButtons);

  /* Convert the no-JS grid into the carousel. */
  root.classList.add('nd-hm-review-carousel-ready');
  updateButtons();
  /* Late pass in case fonts or images change the card widths. */
  window.addEventListener('load', updateButtons);
})();
