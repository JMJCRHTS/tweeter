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
      $('.tweetlist').append($el);
    });
  };

  const loadTweets = function() {
    $.get('/tweets').then((data) => renderTweets(data));
  };

  loadTweets();

  $('.tweetform').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    $.post('/tweets', data);

  });

});
