'use strict';

var quotes = require('./quotes');

module.exports = {
	getRandomQuote: function getRandomQuote() {
		return quotes[Math.floor(Math.random() * quotes.length)];
	},
	getIntroduction: function getIntroduction() {
		return "My name is Ron Swanson, and I'm going to tell you everything you need to know about the miserable, screwed up world of local government.";
	}
};
