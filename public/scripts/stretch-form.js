$(document).ready(function() {

  const navbtn = $(".tweetlink");
  const scrollbtn = $('#scrollbtn');
  const newTwt =   $('.new-tweet');
  scrollbtn.hide();
  newTwt.hide();

  navbtn.hover(function() {
    $(this).find('i').addClass("hovered");
  },
  
  function() {
    $(this).find('i').removeClass("hovered");
  });
  
  navbtn.on("click", function() {
    $('html, body').animate({
      scrollTop: $('.tweetform').offset().top - 400
    }, 0);
    newTwt.slideToggle();
    $('#tweet-text').trigger("focus");
  });
  scrollbtn.on("click", function() {

    $('html, body').animate({
      scrollTop: $('.tweetform').offset().top - 400
    }, 0);

    newTwt.slideDown();
    $('#tweet-text').trigger("focus");
  });

  $(window).scroll(function() {
    let scroll = $(window).scrollTop();
    if (scroll >= 330) {
      $('.logo').addClass("nav-el-bg");
      navbtn.fadeOut(200);
      scrollbtn.fadeIn(100);
    }
    if (scroll < 330) {
      $('.logo').removeClass("nav-el-bg");
      navbtn.fadeIn(200);
      scrollbtn.fadeOut(200);
    }
  });
});
