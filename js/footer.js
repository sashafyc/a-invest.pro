(function(){
  var footer = `
<footer id="site-footer">
  <div class="foot-inner">
    <div class="foot-left">
      <a href="index.html" class="foot-logo">
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" fill="#c9a96e" opacity="0.12" rx="2"/>
          <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#c9a96e" font-family="'Fira Sans',sans-serif" font-size="18" font-weight="700" letter-spacing="-1">A</text>
        </svg>
        <span class="foot-logo-txt">А-Инвест</span>
      </a>
      <p class="foot-copy">© 2026 Все права защищены · <a href="privacy.html" class="foot-prv">Политика конфиденциальности</a></p>
    </div>
    <div class="foot-mid">
      <p>ИНН 781902503653</p>
      <p>ОГРНИП 318784700316030</p>
      <p>ИП Неделюк Александр Игоревич</p>
    </div>
    <div class="foot-right">
      <a href="https://t.me/sashafyc" target="_blank" rel="noopener" class="foot-contact" onclick="if(typeof ym!=='undefined')ym(85646347,'reachGoal','tg_click')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>
        Связаться с владельцем сайта
      </a>
    </div>
  </div>
</footer>`;

  // Cookie consent banner
  var cookieBanner = `
<div id="cookie-banner" style="display:none">
  <div class="ck-inner">
    <p>Мы используем cookie-файлы и Яндекс Метрику для анализа посещаемости. Продолжая использовать сайт, вы соглашаетесь с <a href="privacy.html" class="ck-link">политикой обработки данных</a>.</p>
    <button id="ck-accept" class="ck-btn">Принять</button>
    <button id="ck-decline" class="ck-btn ck-btn-sec">Отклонить</button>
  </div>
</div>`;

  var style = `
<style>
#site-footer{background:#0d0d0d;border-top:1px solid rgba(201,169,110,.2);padding:36px 60px}
.foot-inner{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:1fr auto 1fr;gap:40px;align-items:center}
.foot-left{display:flex;flex-direction:column;gap:10px}
.foot-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.foot-logo-txt{font-family:'Fira Sans',sans-serif;font-size:15px;font-weight:600;color:#f5f3ee;letter-spacing:.04em}
.foot-copy{font-size:11px;color:rgba(245,243,238,.45);font-weight:300}
.foot-prv{color:rgba(201,169,110,.5);text-decoration:none;transition:color .2s}
.foot-prv:hover{color:#c9a96e}
.foot-mid{text-align:center}
.foot-mid p{font-size:12px;color:rgba(245,243,238,.4);font-weight:300;line-height:1.8}
.foot-right{display:flex;justify-content:flex-end}
.foot-contact{display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(201,169,110,.35);
  color:rgba(201,169,110,.8);font-family:'Fira Sans',sans-serif;font-size:12px;font-weight:600;
  letter-spacing:.06em;padding:12px 20px;text-decoration:none;transition:all .22s;white-space:nowrap}
.foot-contact:hover{border-color:#c9a96e;color:#c9a96e;background:rgba(201,169,110,.06)}
.foot-contact svg{flex-shrink:0;opacity:.7}
.foot-contact:hover svg{opacity:1}
#cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(17,17,17,.97);border-top:1px solid rgba(201,169,110,.2);backdrop-filter:blur(12px);padding:16px 24px}
.ck-inner{max-width:1120px;margin:0 auto;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.ck-inner p{flex:1;min-width:240px;font-family:'Fira Sans',sans-serif;font-size:13px;font-weight:300;color:rgba(245,243,238,.7);line-height:1.6;margin:0}
.ck-link{color:rgba(201,169,110,.7);text-decoration:underline;text-underline-offset:2px}
.ck-link:hover{color:#c9a96e}
.ck-btn{font-family:'Fira Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:.06em;padding:10px 20px;border:none;cursor:pointer;transition:all .2s;white-space:nowrap}
.ck-btn{background:#c9a96e;color:#0a0a0a}
.ck-btn:hover{background:#dfc08a}
.ck-btn-sec{background:transparent;color:rgba(245,243,238,.5);border:1px solid rgba(245,243,238,.15)}
.ck-btn-sec:hover{color:rgba(245,243,238,.8);border-color:rgba(245,243,238,.3)}
@media(max-width:900px){
  #site-footer{padding:28px 20px}
  .foot-inner{grid-template-columns:1fr;gap:24px;text-align:center}
  .foot-logo{justify-content:center}
  .foot-right{justify-content:center}
  .ck-inner{flex-direction:column;text-align:center}
  .ck-inner p{min-width:auto}
}
</style>`;

  // Inject styles into head
  document.head.insertAdjacentHTML('beforeend', style);
  // Inject footer before </body>
  document.body.insertAdjacentHTML('beforeend', footer);
  // Inject cookie banner
  document.body.insertAdjacentHTML('beforeend', cookieBanner);

  // Cookie consent logic
  var consent = localStorage.getItem('cookie_consent');
  if(!consent){
    document.getElementById('cookie-banner').style.display='block';
  }
  var acceptBtn = document.getElementById('ck-accept');
  var declineBtn = document.getElementById('ck-decline');
  if(acceptBtn){
    acceptBtn.addEventListener('click',function(){
      localStorage.setItem('cookie_consent','accepted');
      document.getElementById('cookie-banner').style.display='none';
    });
  }
  if(declineBtn){
    declineBtn.addEventListener('click',function(){
      localStorage.setItem('cookie_consent','declined');
      document.getElementById('cookie-banner').style.display='none';
      // Disable Yandex Metrika if declined
      if(window.ym){window.ym=function(){};}
    });
  }
})();
