class InfiniteTweets {
  constructor() {
    this.maxCreatedAt = null;
    this.fetchTweets();
    this.insertTweet();
  }
  fetchTweets(){
    let tweetConstructor = this;
    $('.fetch-more').click( () => {
      let data = {};
      if(this.maxCreatedAt !== null) {
         data = {max_created_at: this.maxCreatedAt};
      }else {
         data = {};
      }
      $.ajax({
        url: '/feed',
        type: 'GET',
        dataType: 'json',
        data: data,
        success(tweets) {
          tweetConstructor.insertTweets(tweets);
          // console.log(tweets);
          tweetConstructor.maxCreatedAt = tweets[tweets.length - 1].created_at;
          if (tweets.length < 20) {
            $('.fetch-more').remove();
            $('.infinite-tweets').prepend('<p>No more tweets</p>');
          }
        }
      });
    });
  }
  insertTweets(tweets) {
    $('#feed').empty();
    tweets.forEach( function(tweet) {
      let tweetString = `<li>${JSON.stringify(tweet)}</li>`;
      $("#feed").append(tweetString);
    });
  }
  insertTweet() {
    let that = this;
    $('#feed').on('insertTweet', function(event, tweet) {
      let tweetList = `<li>${JSON.stringify(tweet)}</li>`;
      $('#feed').prepend(tweetList);
      that.maxCreatedAt = tweet.created_at;
    });
  }
}
module.exports = InfiniteTweets;
