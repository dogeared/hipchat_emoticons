$(function() {
  var buildRows = function(emoticons) {
    var rows = [];
    var html = '';
    _.each(emoticons, function(emoticon, index) {
      if (index != 0 && index%6 === 0) {
        rows.push(html);
        html = ''; 
      }
      html += _.template($('#emoticon_template').html(), { emoticon: emoticon });
    });
    if (html !== '') {
      rows.push(html);
    }
    return rows;
  }

  buildEmoticonContent = function(emoticons) {
    var rows = buildRows(emoticons);
    return _.template($('#emoticon_row_template').html(), { rows: rows });
  }

  $.get('/emoticons', function(allEmoticons) {
    var hipchatContent = buildEmoticonContent(allEmoticons.hipchat)
    var customContent = buildEmoticonContent(allEmoticons.custom)
    $('#hipchat_emoticons').html(hipchatContent);
    $('#custom_emoticons').html(customContent);

    $('.clickable').click(function(evt) {
      prompt("Copy this:", $(evt.currentTarget).data('shortcut'));
    })
  })
});
