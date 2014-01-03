var twitter = require('twitter');
var config_tw = require('../config/twitter.json');

Tweet = function() {
	this.tw = new twitter(config_tw);
}

Tweet.prototype.tweet = function(str) {
	this.tw
		.verifyCredentials(function(data) {
			console.log("twitter/verify");
		})
		.updateStatus(str, function(data) {
			console.log("tweet/update");
		});
}

module.exports = Tweet;
Tweet.__proto__ = new Tweet;