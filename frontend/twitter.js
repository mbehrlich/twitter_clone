const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');
const InfiniteTweets = require('./infinite_tweets');


$(function(){
  $('button.follow-toggle').each( function(idx,element) {
    let button = new FollowToggle(element);
  });
  $('.users-search').each(function(idx, element) {
    let newSearch = new UsersSearch();
  });
  $('.tweet-compose').each(function(idx, element){
    let newTweet = new TweetCompose(element);
  });
  new InfiniteTweets();
});
