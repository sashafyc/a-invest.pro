(function(){
  var layout = document.querySelector('.art-layout');
  var sidebar = document.querySelector('.art-sidebar');
  var sticky = document.querySelector('.sdb-sticky');
  if(!layout || !sidebar || !sticky) return;

  var hideAt = 0;
  var showAt = 0;
  var expanded = false;

  function calcThreshold(){
    var rect = sticky.getBoundingClientRect();
    hideAt = window.scrollY + rect.top + rect.height + 200;
    showAt = hideAt - 400; // Show earlier to prevent flicker
  }

  setTimeout(calcThreshold, 100);

  function check(){
    var scrollY = window.scrollY + 100;
    if(!expanded && scrollY > hideAt && hideAt > 0){
      expanded = true;
      sidebar.style.transition = 'opacity .3s';
      sidebar.style.opacity = '0';
      setTimeout(function(){
        sidebar.style.display = 'none';
        layout.style.gridTemplateColumns = '1fr';
      }, 300);
    } else if(expanded && scrollY <= showAt){
      expanded = false;
      layout.style.gridTemplateColumns = '';
      sidebar.style.display = '';
      sidebar.offsetHeight;
      sidebar.style.transition = 'opacity .3s';
      sidebar.style.opacity = '1';
      setTimeout(function(){ sidebar.style.opacity = ''; }, 300);
    }
  }

  window.addEventListener('scroll', check, {passive:true});
  check();
})();
