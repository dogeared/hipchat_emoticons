$(function() {
  $.get('/emoticons', function(emoticons) {
    var global_template = _.template($('#emoticon_template').html(), { emoticons: emoticons.hipchat });
    var wm_template = _.template($('#emoticon_template').html(), { emoticons: emoticons.wm });
    $('#hipchat_emoticons').html(global_template);
    $('#wm_emoticons').html(wm_template);
    $('.clickable').click(function(evt) {
      prompt("Copy this:", $(evt.currentTarget).data('shortcut'));
    })
  })
});
