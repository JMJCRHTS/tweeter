$(document).ready(function() {

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

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      let $el = createTweetElement(tweet);
      $('.tweetlist').prepend($el);
    });
  };

  const loadTweets = function() {
    $.get('/tweets').then((data) => renderTweets(data));
  };

  loadTweets();

  $('.tweetform').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const textLength = $('#tweet-text').val().length;

    if (!textLength) {
      alert("Please write something in order to make a tweet!");
      return;
    }

    if (textLength > 140) {
      alert("Your text exceeds 140 characters.");
      return;
    }

    $(this).trigger('reset');

    $.post('/tweets', data).then(() => {
      $.get('/tweets').then((data) => {
        let $tweet = createTweetElement(data[data.length - 1]);
        $('.tweetlist').prepend($tweet);
      }).catch((error) => console.log(error));
    });

  });

});
