$(document).ready(function() {

// navigation to scroll 

$(window).scroll(function() {
  var scrollTop = $('.home').height();
  if($(window).scrollTop() >= scrollTop) {
    $('#nav-container').css({
      visibility: 'visible', 
      position: 'fixed', 
      top: '0'
    });
};
});

