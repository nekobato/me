Zogon = function() {
	var strs = require('../config/barizogon.json');
	this.str = strs[ Math.floor( Math.random() * strs.length ) ];
}

Zogon.prototype.say = function() {
	var tweet = require('./tweet.js');
  console.log(this.str);
	tweet.tweet(this.str);
}

module.exports = Zogon;
Zogon.__proto__ = new Zogon;