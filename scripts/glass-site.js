(function(){
  const menuButtons = document.querySelectorAll('.site-nav-menu-btn');
  menuButtons.forEach((btn)=>{
    btn.addEventListener('click',(event)=>{
      event.stopPropagation();
      const menu = btn.closest('.site-nav-menu');
      if(!menu) return;
      document.querySelectorAll('.site-nav-menu').forEach((item)=>{
        if(item !== menu) item.classList.remove('open');
      });
      menu.classList.toggle('open');
    });
  });
  document.addEventListener('click',(event)=>{
    document.querySelectorAll('.site-nav-menu').forEach((menu)=>{
      if(!menu.contains(event.target)) menu.classList.remove('open');
    });
  });

  document.querySelectorAll('[data-compare]').forEach((root)=>{
    const afterWrap = root.querySelector('.compare-after-wrap');
    const handle = root.querySelector('.compare-handle');
    if(!afterWrap || !handle) return;
    let dragging = false;

    const setPosition = (clientX)=>{
      const rect = root.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(rect.width, x));
      const percent = (x / rect.width) * 100;
      afterWrap.style.width = percent + '%';
      handle.style.left = percent + '%';
      root.setAttribute('aria-valuenow', Math.round(percent));
    };

    const getX = (event)=>{
      if(event.touches && event.touches[0]) return event.touches[0].clientX;
      return event.clientX;
    };

    const start = (event)=>{
      dragging = true;
      setPosition(getX(event));
      if(event.cancelable) event.preventDefault();
    };
    const move = (event)=>{
      if(!dragging) return;
      setPosition(getX(event));
      if(event.cancelable) event.preventDefault();
    };
    const end = ()=>{ dragging = false; };

    root.addEventListener('mousedown', start);
    root.addEventListener('touchstart', start, {passive:false});
    window.addEventListener('mousemove', move, {passive:false});
    window.addEventListener('touchmove', move, {passive:false});
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);
    root.addEventListener('click',(event)=>setPosition(getX(event)));

    root.addEventListener('keydown',(event)=>{
      const current = Number(root.getAttribute('aria-valuenow') || 50);
      let next = current;
      if(event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = Math.max(0, current - 5);
      else if(event.key === 'ArrowRight' || event.key === 'ArrowUp') next = Math.min(100, current + 5);
      else if(event.key === 'Home') next = 0;
      else if(event.key === 'End') next = 100;
      else return;
      const rect = root.getBoundingClientRect();
      setPosition(rect.left + (rect.width * next / 100));
      event.preventDefault();
    });

    root.setAttribute('tabindex','0');
    root.setAttribute('role','slider');
    root.setAttribute('aria-valuemin','0');
    root.setAttribute('aria-valuemax','100');
    root.setAttribute('aria-valuenow','50');
    setPosition(root.getBoundingClientRect().left + (root.getBoundingClientRect().width / 2));
  });

  if(!window.__afternoonTrackingLoaded){
    window.__afternoonTrackingLoaded = true;

    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-NY5V19HE72';
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-NY5V19HE72');

    !(function(f,b,e,v,n,t,s){
      if(f.fbq) return;
      n = f.fbq = function(){ n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments); };
      if(!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', '4424110844582646');
    window.fbq('track', 'PageView');
  }
})();
