var _ = require('underscore');
var async = require('async');
var request = require('request');

exports.index = function(req, res) {
  res.render('index');
};

var token = process.env.TOKEN;
var baseURL = 'https://api.hipchat.com/v2/emoticon';

var getEmoticons = function(url, emoticons, callback) {
  request(url + '&auth_token=' + token, function(error, response, body) {
    var data = JSON.parse(body);
    emoticons = emoticons.concat(data.items);
    if (data.items.length == 100) {
      getEmoticons(data.links.next, emoticons, callback);
    } else {
      callback(null, emoticons);
    }
  })
}

var sortByShortcut = function(emoticons) {
  return _.sortBy(emoticons, function(emoticon) { return emoticon.shortcut; });
}

var doSort = function(emoticons) {
  return {
    hipchat: sortByShortcut(emoticons.hipchat),
    wm: sortByShortcut(emoticons.wm)
  };
}

exports.emoticons = function(req, res) {
  async.parallel({
    hipchat: function(callback) {
      getEmoticons(baseURL + '?type=global', [], callback);
    },
    wm: function(callback) {
      getEmoticons(baseURL + '?type=group', [], callback);
    } 
  }, function(err, results) {
    res.send(doSort(results));
  });
};
