$(document).ready(function(){
  
  var feed = new Instafeed({
  get: 'location',
  sortBy: 'most-liked',
  locationId: 760550,
  accessToken: '658445562.97f1825.d265e772c4d1452ea0e208c671ecb2f8',
  limit: '500',
  resolution: 'low_resolution',
  template: '<a class="post" href="{{link}}"><img src="{{image}}" />{{likes}} &hearts;</a>', // instafeed templating otions
  filter: function(image) {
    var blockedUsernames = [
      'kairoodt'
    ];

    // check for blocked users
    for (var i = 0; i < blockedUsernames.length; i++) {
      if (image.user.username === blockedUsernames[i]) {
        return false;
      }
    }

    return true;
  },
  after: function() {
    var images = $('#instafeed').find('post');
  }
});

feed.run();
// loads more posts when scrolled down
  $(window).scroll(function() {
    if ($(window).scrollTop() +     $(window).height() > $(document).height() - 100) {
      feed.next();
      }
    });
}());