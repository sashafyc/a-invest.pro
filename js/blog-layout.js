(function(){
  var layout = document.querySelector('.art-layout');
  var sidebar = document.querySelector('.art-sidebar');
  var sticky = document.querySelector('.sdb-sticky');
  if(!layout || !sidebar || !sticky) return;

  var stickyEnd = 0;
  var expanded = false;
  var transitioning = false;

  function measure(){
    // Measure only when sidebar is visible (original layout)
    if(!expanded){
      var rect = sticky.getBoundingClientRect();
      stickyEnd = window.scrollY + rect.top + rect.height;
    }
  }

  setTimeout(measure, 100);

  function check(){
    if(transitioning) return;
    var scrollY = window.scrollY + window.innerHeight;

    if(!expanded && stickyEnd > 0 && window.scrollY > stickyEnd + 100){
      // User scrolled past the sidebar content
      expanded = true;
      transitioning = true;
      sidebar.style.transition = 'opacity .3s';
      sidebar.style.opacity = '0';
      setTimeout(function(){
        sidebar.style.display = 'none';
        layout.style.gridTemplateColumns = '1fr';
        transitioning = false;
      }, 300);
    } else if(expanded && window.scrollY <= stickyEnd - 100){
      // User scrolled back up to where sidebar should be
      expanded = false;
      transitioning = true;
      layout.style.gridTemplateColumns = '';
      sidebar.style.display = '';
      sidebar.style.opacity = '0';
      sidebar.offsetHeight;
      sidebar.style.transition = 'opacity .3s';
      sidebar.style.opacity = '';
      setTimeout(function(){
        transitioning = false;
        measure(); // Re-measure after layout restored
      }, 300);
    }
  }

  window.addEventListener('scroll', check, {passive:true});
  check();
})();
