/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 $(document).ready(function() {


$(function() {
  var $button = $('.new-tweet input');
  $button.on('click', function () {
    event.preventDefault();
    if ( $(this).siblings(".counter").text() == 140) {
      $(".error").text("please enter text");
      $(".error").slideDown()
    } else if ($(this).siblings(".counter").text() < 0){
      $(".error").text("too much text")
      $(".error").slideDown();
    } else {
      console.log('Button clicked, performing ajax call...');
      $.ajax({ type: "POST", 
        url: '/tweets', 
        data: $('#tweet-submit').serialize(), 
        complete: loadTweets 
      });
    
    }

  });
});
$("button").click(function(){
      $(".new-tweet").toggle();
      $("textarea").focus();
    });

function loadTweets() {
  $.get('/tweets', function (data) {
    renderTweets(data);
  });
}
loadTweets();

function createTweetElement(tweetData) {
	let $tweet = $("<article>").addClass("tweet");
	let html = `
	<header>
  <img src=${tweetData.user.avatars.regular} alt="user-avatar" />
	<h1 class="name">${tweetData.user.name}</h1>
    <span>${tweetData.user.handle}</span>
    </header>
    <div class="tweet-text">
            <p>
              ${tweetData.content.text}
            </p>
          </div>
          <footer class="age">
 			${tweetData.created_at}          
 			</footer>
	`;
	return $tweet.append(html);
}

function renderTweets(data) {
  // let $html = $('<div></div>');
  data.forEach((tweet)=> {
    $(".tweets-container").prepend(createTweetElement(tweet));
  });
  // for (var el of data){
  //   var html = createTweetElement(el);
  //   console.log(html)
  //   $(".tweets-container").append(html);
  // }
   
}

});

