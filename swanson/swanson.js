'use strict';

var quotes = require('./quotes');

module.exports = {
	getRandomQuote: function getRandom() {
		return quotes[Math.floor(Math.random() * quotes.length)];
	}
};
