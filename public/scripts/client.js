$(document).ready(function() {

  // hides error message
  $("aside").hide();

  // creates tweet element from data
  const createTweetElement = function(tweetData) {

    let time = timeago.format(tweetData.created_at);
    
    let $tweet = $('<article><header class="tweetheader"></header><p></p><footer></footer></article>');

    $tweet.children('p').text(tweetData.content.text);

    $tweet.children('.tweetheader').append(`<div><img src="${tweetData.user.avatars}" alt="avatar"><p>${tweetData.user.name}
      </p></div><p>${tweetData.user.handle}</p>`);

    $tweet.children('footer').append(`<p>${time}</p>
      <div><i class="fa-solid fa-flag flag"></i><i class="fa-solid fa-retweet retweet"></i>
      <i class="fa-solid fa-heart heart"></i></div>`);
    
    return $tweet;
  };

  // takes in array of tweets and renders them
  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      let $el = createTweetElement(tweet);
      $('.tweetlist').prepend($el);
    });
  };

  // loads tweets from database
  const loadTweets = function() {
    $.get('/tweets')
      .then((data) => renderTweets(data))
      .catch((error) => console.log(error));
  };

  // loads tweets on page load
  loadTweets();

  $('.tweetform').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const textLength = $('#tweet-text').val().length;

    if (!textLength) {
      $("aside p").text("Instructions are hard... Try filling it out this time!");
      $("aside").slideDown(200);
      return;
    }
    if (textLength > 140) {
      $("aside p").text("I wish there were more characters too, but there are not.");
      $("aside").slideDown(200);
      return;
    }
    $("aside").hide(200);
    $(this).trigger('reset');
    $(this).find('output').html('140');

    $.post('/tweets', data).then(() => {
      $.get('/tweets').then((data) => {
        let $tweet = createTweetElement(data[data.length - 1]);
        $('.tweetlist').prepend($tweet);
      }).catch((error) => console.log(error));
    });

  });

});
