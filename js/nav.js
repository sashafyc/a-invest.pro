(function(){

  var style = `
<style>
/* Hamburger button */
.nav-burger{
  display:none;
  flex-direction:column;
  justify-content:center;
  gap:5px;
  width:36px;height:36px;
  background:none;border:none;cursor:pointer;padding:4px;
  z-index:300;position:relative;flex-shrink:0
}
.nav-burger span{
  display:block;width:22px;height:2px;
  background:var(--gold,#c9a96e);
  transition:transform .3s,opacity .3s,width .3s;
  transform-origin:center
}
.nav-burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.nav-burger.open span:nth-child(2){opacity:0;width:0}
.nav-burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

/* Mobile overlay */
.mob-menu{
  display:none;
  position:fixed;inset:0;
  background:#0a0a0a;
  z-index:250;
  flex-direction:column;
  align-items:center;justify-content:center;
  gap:0;
  opacity:0;
  transition:opacity .25s
}
.mob-menu.open{
  display:flex;
  opacity:1
}
.mob-menu ul{
  list-style:none;padding:0;margin:0;
  display:flex;flex-direction:column;align-items:center;gap:0;
  width:100%
}
.mob-menu ul li{
  width:100%;text-align:center;
  border-bottom:1px solid rgba(201,169,110,.1)
}
.mob-menu ul li:first-child{border-top:1px solid rgba(201,169,110,.1)}
.mob-menu ul li a{
  display:block;padding:22px 40px;
  color:rgba(245,243,238,.8);
  text-decoration:none;
  font-family:'Fira Sans',sans-serif;
  font-size:18px;font-weight:400;
  letter-spacing:.02em;
  transition:color .2s,background .2s
}
.mob-menu ul li a:hover{color:#c9a96e;background:rgba(201,169,110,.04)}
.mob-menu ul li a.nav-cta{
  color:#c9a96e!important;
  font-weight:600!important;
  font-size:14px!important;
  letter-spacing:.1em!important;
  text-transform:uppercase
}
.mob-menu-close{
  position:absolute;top:18px;right:20px;
  background:none;border:none;cursor:pointer;
  color:rgba(245,243,238,.5);
  font-size:28px;line-height:1;padding:4px 8px
}
.mob-menu-close:hover{color:#c9a96e}

@media(max-width:900px){
  .nav-burger{display:flex}
}
</style>`;

  document.head.insertAdjacentHTML('beforeend', style);

  // Add burger button to nav
  var nav = document.querySelector('nav');
  if(!nav) return;

  var burger = document.createElement('button');
  burger.className = 'nav-burger';
  burger.setAttribute('aria-label', 'Открыть меню');
  burger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(burger);

  // Build overlay from existing nav-links (пути уже правильные в HTML каждой страницы)
  var navLinks = document.querySelector('.nav-links');
  if(!navLinks) return;

  var overlay = document.createElement('div');
  overlay.className = 'mob-menu';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  var closeBtn = document.createElement('button');
  closeBtn.className = 'mob-menu-close';
  closeBtn.setAttribute('aria-label', 'Закрыть меню');
  closeBtn.innerHTML = '&times;';

  var ul = navLinks.cloneNode(true);
  ul.removeAttribute('class');

  overlay.appendChild(closeBtn);
  overlay.appendChild(ul);
  document.body.appendChild(overlay);

  // Open / close
  function openMenu(){
    overlay.style.display = 'flex';
    // Force reflow for transition
    overlay.offsetHeight;
    overlay.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-label', 'Закрыть меню');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(){
    overlay.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-label', 'Открыть меню');
    document.body.style.overflow = '';
    setTimeout(function(){ overlay.style.display = ''; }, 260);
  }

  burger.addEventListener('click', function(){
    overlay.classList.contains('open') ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);

  overlay.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });

  // Закрыть по Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
  });

})();
