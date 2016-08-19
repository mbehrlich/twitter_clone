class TweetCompose {
  constructor(el) {
    this.el = $(el);
    this.submit();
    this.charsLeft();
    this.userMention();
  }
  submit() {
    let tweetObject = this;
    this.el.on("submit", event => {
      event.preventDefault();
      var formData = $(event.currentTarget).serialize();
      $(':input').each( (idx,el) => {
        $(el).prop('disabled');
      });
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: formData,
        dataType: 'json',
        success(tweet) {
          tweetObject.handleSuccess(tweet);
        }
      });
    });
  }
  clearInput() {
    $(':input').each((idx,el) => {
      if($(el).attr("type") !== "submit") {
        $(el).val("");
      }
      $(el).prop('disabled',false);
      $('.mentioned-users').empty();
      $('.chars-left').empty();
    });
  }
  handleSuccess(tweet) {
    this.clearInput();
    // ('#feed').append()
    let div = this.el.attr('data-tweets-ul');
    let tweetList = `<li>${JSON.stringify(tweet)}</li>`;
    // console.log(div);
    // console.log(tweetList);
    $(div).prepend(tweetList);
  }
  charsLeft(){
    $('textarea').on('input', function() {
      let remainingChars = 140 - $(this).val().length;
      $('.chars-left').text(String(remainingChars));
    });
  }
  userMention() {
    $('a.add-mentioned-user').click(() => {
      this.addMentionedUser();
    });
  }
  addMentionedUser() {
    $('.mentioned-users').append($('.script').html());
    this.removeMention();
  }
  removeMention() {
    $('a.remove-mentioned-user').click(() => {
      // console.log($(event.currentTarget).parent());
      $(event.currentTarget).parent().remove();
    });
  }
}



module.exports = TweetCompose;
