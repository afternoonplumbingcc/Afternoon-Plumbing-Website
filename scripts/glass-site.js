(function(){
  const menus = document.querySelectorAll('.site-nav-menu');

  const closeMenu = (menu)=>{
    if(!menu) return;
    menu.classList.remove('open');
    const btn = menu.querySelector('.site-nav-menu-btn');
    if(btn) btn.setAttribute('aria-expanded','false');
  };

  const openMenu = (menu)=>{
    if(!menu) return;
    menu.classList.add('open');
    const btn = menu.querySelector('.site-nav-menu-btn');
    if(btn) btn.setAttribute('aria-expanded','true');
  };

  menus.forEach((menu, index)=>{
    const btn = menu.querySelector('.site-nav-menu-btn');
    const list = menu.querySelector('.site-nav-menu-list');
    if(!btn || !list) return;
    const listId = list.id || `site-nav-menu-list-${index + 1}`;
    list.id = listId;
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-controls', listId);
    btn.setAttribute('aria-haspopup','true');

    btn.addEventListener('click',(event)=>{
      event.stopPropagation();
      const isOpen = menu.classList.contains('open');
      menus.forEach((item)=>{ if(item !== menu) closeMenu(item); });
      if(isOpen) closeMenu(menu);
      else openMenu(menu);
    });
  });

  document.addEventListener('click',(event)=>{
    menus.forEach((menu)=>{
      if(!menu.contains(event.target)) closeMenu(menu);
    });
  });

  document.addEventListener('keydown',(event)=>{
    if(event.key === 'Escape') {
      menus.forEach((menu)=> closeMenu(menu));
    }
  });

  document.querySelectorAll('[data-compare]').forEach((root)=>{
    const afterBg = root.querySelector('.compare-after-bg');
    const handle = root.querySelector('.compare-handle');
    if(!afterBg || !handle) return;
    let dragging = false;

    const setPosition = (clientX)=>{
      const rect = root.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(rect.width, x));
      const percent = (x / rect.width) * 100;
      afterBg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
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
