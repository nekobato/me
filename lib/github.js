var fs = require('fs');
var request = require('request');
var tweet = require('./tweet.js');

Github = function() {
  this.logFile = '../config/github.json';
  this.log = require(this.logFile);
}

Github.prototype.check = function() {
  var log = this.log;
  var logFile = this.logFile;
  var options = {
    url: 'https://api.github.com/users/nekobato/events',
    headers: {
        'User-Agent': 'node request'
    }
  };
  
  request(options, function(error, response, body) {
    var res, str;
    if (error && response.statusCode != 200) { throw "failed to get api."; }
    
    res = JSON.parse(body);

    for (var i = 0; i < res.length; i++ ) {
      if ( res[i].id <= log.last_id ) {
        saveId( res[0].id );
        console.log("check complete.");
        return;
      }

      if ( str = type2Str(res[i]) ) {
        console.log(str);
        tweet.tweet(str);
      }
    }
  });

  function type2Str(data) {

    var str
    if (data.type === "PushEvent") {
      str = "Push to repository: " + data.repo.name + " - " + data.payload.commits[0].message;
      return str;
    }
    if (data.type === "CreateEvent") {
      str = "Create a new repository: " + data.repo.name;
      return str;
    }

    return false;
  }

  function saveId(id) {

    log.last_id = id;

    fs.writeFile(logFile, JSON.stringify(log, null, 4), function(err) {
      if (err) { throw "failed to write file."; }
      console.log("update id: " + id);
    });
  }
}

module.exports = Github;
Github.__proto__ = new Github;