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
      alert("please enter text")
    } else if ($(this).siblings(".counter").text() < 0){
      alert("too much text")
    } else {
      console.log('Button clicked, performing ajax call...');
      $.ajax({ type: "POST", 
        url: '/tweets', 
        data: $('#tweet-submit').serialize(), 
        complete: loadTweets 
      })
    
    }
    // .then(function () {
    //   $(".tweets-container").append(loadTweets());
    // //   console.log('Success: ');
    // //   // $button.replaceWith(morePostsHtml);
    // });
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
	// $tweet = $tweet.append(html);
	return $tweet.append(html)
}

function renderTweets(data) {
  // let $html = $('<div></div>');
  data.forEach((tweet)=> {
    $(".tweets-container").append(createTweetElement(tweet));
  })
  // for (var el of data){
  //   var html = createTweetElement(el);
  //   console.log(html)
  //   $(".tweets-container").append(html);
  // }
   
}


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

// renderTweets(data);

// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

// var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

})

