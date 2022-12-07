$(document).ready(function() {

  const form = $('#tweet-text');

  form.on('input', function() {
    let twtLength = $(this).val().length;
    let counter = $(this).parent().find(".counter");
    console.log(counter);

    if (twtLength <= 140) {
      $(counter).removeClass("red").html(140 - twtLength);
    }
    if (twtLength > 140) {
      $(counter).addClass("red").html(140 - twtLength);
    }

  });
});
