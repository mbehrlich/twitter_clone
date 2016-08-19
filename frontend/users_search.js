var FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor() {
    this.el = $('.users-search');
    this.searchbox = $('.users-search input');
    this.list = $('ul.users');
    this.handleInput();
  }
  handleInput() {
    let search = this;
    this.searchbox.on("input", function() {
      $.ajax({
        url: "/users/search",
        type: 'GET',
        data: {
          query: search.searchbox.val()
        },
        dataType: 'json',
        success(users) {
          search.renderResults(users);
        }
      });
    });
  }
  renderResults(users) {
    this.list.empty();
    users.forEach( user => {
      let element = $(`<li><a href='/users/${user.id}'>${user.username}</a>
      <button class="follow-toggle" data-user-id="${user.id}"
      data-initial-follow-state="${user.followed ? "followed" : "unfollowed"}"></button></li>`);

      this.list.append(element);
    });
    $('button.follow-toggle').each( function(idx, el) {
      let button = new FollowToggle(el);
    });
  }
}

module.exports = UsersSearch;
