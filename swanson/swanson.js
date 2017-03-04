'use strict';

var quotes = require('./quotes');

module.exports = {
	lastIndex: null,
	getRandomQuote: function getRandomQuote() {
		var randomIndex = null;
		do {
			randomIndex = Math.floor(Math.random() * quotes.length);
		} while (randomIndex === this.lastIndex)
		this.lastIndex = randomIndex;
		return quotes[randomIndex];
	},
	getIntroduction: function getIntroduction() {
		return "My name is Ron Swanson, and I'm going to tell you everything you need to know about the miserable, screwed up world of local government.";
	},
	replyOnIntent: function replyOnIntent(data) {
		if (!data.entities.Intent)
			return "";

		var intent = data.entities.Intent[0].value;

		switch (intent) {
			case 'introduction':
				return this.getIntroduction();
				break;
		  case 'greeting':
		    return "Why hello?";
		    break;
		  case 'well-being':
		    return "Doing fine";
		    break;
		  case 'compliment':
		    return "Thanks but no thanks";
		    break;
		  case 'quote':
		    return this.getRandomQuote();
		    break;
		  default:
		    return "I do not comprehend";
		}
	}
};
