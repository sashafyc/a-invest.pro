(function(){
  var layout = document.querySelector('.art-layout');
  var sidebar = document.querySelector('.art-sidebar');
  var sticky = document.querySelector('.sdb-sticky');
  if(!layout || !sidebar || !sticky) return;

  var threshold = 0;
  var expanded = false;

  function calcThreshold(){
    // Absolute position where sidebar content ends
    var rect = sticky.getBoundingClientRect();
    threshold = window.scrollY + rect.top + rect.height + 200;
  }

  // Calculate once after layout settles
  setTimeout(calcThreshold, 100);

  function check(){
    var scrollY = window.scrollY + 100;
    if(scrollY > threshold && !expanded && threshold > 0){
      expanded = true;
      sidebar.style.transition = 'opacity .3s';
      sidebar.style.opacity = '0';
      setTimeout(function(){
        sidebar.style.display = 'none';
        layout.style.gridTemplateColumns = '1fr';
      }, 300);
    } else if(scrollY <= threshold && expanded){
      expanded = false;
      layout.style.gridTemplateColumns = '';
      sidebar.style.display = '';
      // Force reflow before opacity transition
      sidebar.offsetHeight;
      sidebar.style.opacity = '';
    }
  }

  window.addEventListener('scroll', check, {passive:true});
  check();
})();
