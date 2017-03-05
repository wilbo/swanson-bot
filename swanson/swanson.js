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
	getGreeting: function getGreeting() {
		return "I know more than you.";
	},
	getWellBeing: function getWellBeing() {
		return "Doing fine";
	},
	getThanks: function getThanks() {
		return "Thanks but no thanks";
	},
	getDontKnow: function getDontKnow() {
		return "I do not comprehend";
	}
};
