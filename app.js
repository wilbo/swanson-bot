// https://docs.botframework.com/en-us/node/builder/guides/core-concepts/

var restify = require('restify');
var builder = require('botbuilder');
var path = require('path');
var favicon = require('serve-favicon');
var swanson = require('./swanson/swanson');
var Wit = require('node-wit').Wit;

// Setup Restify Server
var server = restify.createServer();
server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url);
});

// index page / static files
server.get(/.*/, restify.serveStatic({
    directory: './static',
    default: 'index.html'
}));

// Create chat bot
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// create bot
var bot = new builder.UniversalBot(connector);

// listen from here
server.post('/api/messages', connector.listen());

// ai api
var myWit = new Wit({accessToken: process.env.WIT_KEY});

// reply to user input
bot.dialog('/', [
  function (session, results) {
    session.sendTyping();
    myWit.message(session.message.text, {}).then((data) => {
      if (data.entities.Intent) {
    		var intent = data.entities.Intent[0].value;

    		switch (intent) {
    			case 'introduction':
    				session.send(swanson.getIntroduction());
            setTimeout(() => {
              session.send("I got more quotes for you if you want them..");
            }, 1000)
    				break;
    			case 'greeting':
    				session.send(swanson.getGreeting());
            setTimeout(() => {
              session.send("I got more quotes for you if you want them..");
            }, 1000)
    				break;
    			case 'well-being':
    				session.send(swanson.getWellBeing());
    				break;
    			case 'compliment':
    				session.send(swanson.getThanks());
    				break;
    			case 'quote':
    				session.send(swanson.getRandomQuote());
    				break;
    		}
      } else {
        session.send(swanson.getDontKnow());
        setTimeout(() => {
          session.send("I got more quotes for you if you want them..");
        }, 1000)
      }
    }).catch(console.error);
  }
]);
