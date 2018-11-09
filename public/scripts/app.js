/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

// Button functionality and error messages
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
    };
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
};

loadTweets();
// 
function createTweetElement(tweetData) {
	var now = new Date();
  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }
    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }
    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
      }
  }
  let $tweet = $("<article>").addClass("tweet");
	let html = `
	<header>
    <img src=${tweetData.user.avatars.regular} alt="user-avatar" />
	 <h1 class="name">${tweetData.user.name}</h1>
    <span>${tweetData.user.handle}</span>
     </header>
      <div class="tweet-text">
      <p>${tweetData.content.text}</p>
      </div>
        <footer class="age">${timeDifference(now, tweetData.created_at)}
        <span>
        <i class="fa fa-heart" aria-hidden="true"></i>
        <i class="glyphicon glyphicon-envelope" aria-hidden="true"></i>
        <i class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></i>
        </span>
        </footer>
	`;
	return $tweet.append(html);
};

function renderTweets(data) {
  // let $html = $('<div></div>');
  data.forEach((tweet)=> {
    $(".tweets-container").prepend(createTweetElement(tweet));
  });
  // This is another way to execute the above
  // for (var el of data){
  //   var html = createTweetElement(el);
  //   console.log(html)
  //   $(".tweets-container").append(html);
  // }
  };
});

