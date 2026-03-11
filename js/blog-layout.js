(function(){
  var layout = document.querySelector('.art-layout');
  var sidebar = document.querySelector('.art-sidebar');
  var sticky = document.querySelector('.sdb-sticky');
  if(!layout || !sidebar || !sticky) return;

  var threshold = sticky.offsetHeight + 200;
  var expanded = false;

  function check(){
    var top = layout.getBoundingClientRect().top;
    var scrolled = -top + 100;
    if(scrolled > threshold && !expanded){
      expanded = true;
      sidebar.style.transition = 'opacity .3s';
      sidebar.style.opacity = '0';
      setTimeout(function(){
        sidebar.style.display = 'none';
        layout.style.gridTemplateColumns = '1fr';
      }, 300);
    } else if(scrolled <= threshold && expanded){
      expanded = false;
      sidebar.style.display = '';
      layout.style.gridTemplateColumns = '';
      sidebar.style.opacity = '';
    }
  }

  window.addEventListener('scroll', check, {passive:true});
  check();
})();
