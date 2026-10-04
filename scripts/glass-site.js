(function(){
  // Hide the header when scrolling down, show it again on scroll up or near the top.
  // Mirrors the behavior the homepage React nav had, now applied to the unified static nav.
  const navBar = document.querySelector('.site-nav');
  if (navBar) {
    let lastY = window.scrollY || 0;
    let ticking = false;
    const onScroll = ()=>{
      const y = window.scrollY || 0;
      if (y < 100) {
        navBar.classList.remove('nav-hidden');
      } else if (y > lastY + 4) {
        navBar.classList.add('nav-hidden');
      } else if (y < lastY - 4) {
        navBar.classList.remove('nav-hidden');
      }
      lastY = y;
      ticking = false;
    };
    window.addEventListener('scroll', ()=>{
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    }, {passive:true});
  }

  // Homepage only: the frozen React bundle renders its own nav. Tag it so CSS can
  // suppress it without touching anything else the app mounts (hero, sections, footer).
  if (document.body.classList.contains('home-page')) {
    const reactNav = document.querySelector('#root nav.fixed');
    if (reactNav) reactNav.setAttribute('data-react-nav','');
  }

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
      closeDrawer(document.querySelector('.site-nav-drawer'), true);
    }
  });

  // Mobile slide-in drawer nav (hamburger trigger; markup lives in each page)
  let drawerTrigger = null;

  function markActive(rows){
    const path = (location.pathname || '/').replace(/\/+$/,'') || '/';
    const norm = (href)=>{
      if(!href || !href.startsWith('/')) return null;
      return href.replace(/\/+$/,'') || '/';
    };
    rows.forEach((row)=>{
      if(!row.classList.contains('site-nav-drawer-row')) return;
      const href = row.getAttribute('href') || '';
      const target = norm(href);
      if(target && target === path){
        row.classList.add('active');
        if(!row.hasAttribute('aria-current')) row.setAttribute('aria-current','page');
      }
    });
  }

  function openDrawer(drawer){
    if(!drawer) return;
    drawerTrigger = document.activeElement && document.activeElement.closest('.site-nav-menu')
      ? document.activeElement : (drawerTrigger || document.querySelector('.site-nav-menu-btn'));
    drawer.classList.add('open');
    const scrim = document.querySelector('.site-nav-drawer-scrim');
    if(scrim) scrim.classList.add('open');
    document.documentElement.classList.add('site-nav-drawer-lock');
    document.body.classList.add('site-nav-drawer-lock');
    if(drawerTrigger) drawerTrigger.setAttribute('aria-expanded','true');
    const closeBtn = drawer.querySelector('.site-nav-drawer-close');
    if(closeBtn) closeBtn.focus();
  }

  function closeDrawer(drawer, focusTrigger){
    if(!drawer || !drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    const scrim = document.querySelector('.site-nav-drawer-scrim');
    if(scrim) scrim.classList.remove('open');
    document.documentElement.classList.remove('site-nav-drawer-lock');
    document.body.classList.remove('site-nav-drawer-lock');
    if(drawerTrigger) drawerTrigger.setAttribute('aria-expanded','false');
    if(focusTrigger && drawerTrigger && typeof drawerTrigger.focus === 'function'){
      try{ drawerTrigger.focus(); }catch(e){}
    }
  }

  const drawer = document.querySelector('.site-nav-drawer');
  if(drawer){
    const scrim = document.querySelector('.site-nav-drawer-scrim');
    const subBtn = drawer.querySelector('.site-nav-drawer-sub-btn');
    const sub = drawer.querySelector('.site-nav-drawer-sub');
    const closeBtn = drawer.querySelector('.site-nav-drawer-close');
    const triggerBtn = document.querySelector('.site-nav-menu-btn');

    markActive(drawer.querySelectorAll('a'));

    if(triggerBtn){
      triggerBtn.setAttribute('aria-expanded','false');
      if(!triggerBtn.dataset.drawerBound){
        triggerBtn.dataset.drawerBound = '1';
        triggerBtn.addEventListener('click',(event)=>{
          event.stopPropagation();
          if(drawer.classList.contains('open')) closeDrawer(drawer, true);
          else openDrawer(drawer);
        });
      }
    }
    if(closeBtn && !closeBtn.dataset.drawerBound){
      closeBtn.dataset.drawerBound = '1';
      closeBtn.addEventListener('click',()=> closeDrawer(drawer, true));
    }
    if(scrim && !scrim.dataset.drawerBound){
      scrim.dataset.drawerBound = '1';
      scrim.addEventListener('click',()=> closeDrawer(drawer, true));
    }
    if(subBtn && sub && !subBtn.dataset.drawerBound){
      subBtn.dataset.drawerBound = '1';
      subBtn.setAttribute('aria-expanded','false');
      subBtn.addEventListener('click',()=>{
        const open = sub.classList.toggle('open');
        subBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  }

  // Desktop hover dropdowns (Services / FAQ / Contact)
  const dropItems = document.querySelectorAll('.site-nav-item');
  dropItems.forEach((item)=>{
    const trigger = item.querySelector('.site-nav-drop-trigger');
    const panel = item.querySelector('.site-nav-drop');
    if(!trigger || !panel) return;

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    const setOpen = (open)=>{
      item.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    // Keep aria-expanded honest while the user hovers or tabs through.
    item.addEventListener('mouseenter', ()=> setOpen(true));
    item.addEventListener('mouseleave', ()=> setOpen(false));

    item.addEventListener('focusout', (event)=>{
      if(!item.contains(event.relatedTarget)) setOpen(false);
    });

    // Escape closes and returns focus to the trigger.
    item.addEventListener('keydown', (event)=>{
      if(event.key === 'Escape') {
        setOpen(false);
        trigger.focus();
      }
    });
  });

  document.addEventListener('click', (event)=>{
    dropItems.forEach((item)=>{
      if(!item.contains(event.target)) {
        item.classList.remove('open');
        const t = item.querySelector('.site-nav-drop-trigger');
        if(t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown',(event)=>{
    if(event.key === 'Escape') {
      dropItems.forEach((item)=>{
        item.classList.remove('open');
        const t = item.querySelector('.site-nav-drop-trigger');
        if(t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.querySelectorAll('[data-compare]').forEach((root)=>{
    const legacyAfter = root.querySelector('.compare-after-bg');
    const imgWrap = root.querySelector('.compare-after-wrap');
    const handle = root.querySelector('.compare-handle');
    if(!(legacyAfter || imgWrap) || !handle) return;
    // imgWrap mode: clip the after-image layer (real <img> tags)
    // legacyAfter mode: clip the background-image layer
    const clipTarget = imgWrap || legacyAfter;
    let dragging = false;

    const setPosition = (clientX)=>{
      const rect = root.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(rect.width, x));
      const percent = (x / rect.width) * 100;
      clipTarget.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
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
