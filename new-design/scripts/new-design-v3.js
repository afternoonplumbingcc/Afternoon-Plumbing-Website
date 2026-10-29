/* New Design v3: reviews carousel controls. Vanilla, no dependencies, no network calls. */
(function(){
  var track = document.querySelector('[data-v3-carousel-track]');
  if(!track) return;
  var prev = document.querySelector('[data-v3-carousel-prev]');
  var next = document.querySelector('[data-v3-carousel-next]');
  if(!prev || !next) return;

  function step(){
    var card = track.querySelector('.v3-review-card');
    if(!card) return 320;
    var gap = 16;
    var styles = window.getComputedStyle(track);
    var gapPx = parseFloat(styles.columnGap || styles.gap || gap) || gap;
    return card.getBoundingClientRect().width + gapPx;
  }

  function scrollBy(dir){
    track.scrollBy({left: dir * step(), behavior: 'smooth'});
  }

  prev.addEventListener('click', function(){ scrollBy(-1); });
  next.addEventListener('click', function(){ scrollBy(1); });

  track.addEventListener('keydown', function(event){
    if(event.key === 'ArrowRight'){ scrollBy(1); }
    if(event.key === 'ArrowLeft'){ scrollBy(-1); }
  });
})();
