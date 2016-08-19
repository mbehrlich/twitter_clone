class FollowToggle {
  constructor(el) {
    this.el = $(el);
    this.userId = this.el.attr('data-user-id');
    this.followState = this.el.attr('data-initial-follow-state');
    this.render();
    this.handleClick();
  }
  render() {
    if (this.followState === "followed") {
      this.el.text("unfollow");
    }else if (this.followState === "unfollowed") {
      this.el.text("follow");
    } else if (this.followState === "following" ||
    this.followState === "unfollowing") {
      this.el.text("hold on tight~~111@@!!!");
      this.el.prop("disabled");
    }
  }
  handleClick() {
    let toggle = this;
    this.el.click( function(event) {
      event.preventDefault();
      if (toggle.followState === "unfollowed") {
        toggle.followState = "following";
        toggle.render();
        $.ajax({

          url: `/users/${toggle.userId}/follow`,
          type: "POST",
          dataType: 'json',
          success() {
            toggle.followState = "followed";
            toggle.render();
          }
        });

      } else if (toggle.followState === "followed") {
        toggle.followState = "unfollowing";
        toggle.render();
        $.ajax({
          url:  "/users/" + toggle.userId + "/follow",
          type: "DELETE",
          dataType: 'json',
          success() {
            toggle.followState = "unfollowed";
            toggle.render();
          }
        });

      }


    });
  }
}

module.exports = FollowToggle;
