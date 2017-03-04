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
var myWit = new Wit({accessToken: 'KDDCTELDLIF3U3B6GTS4ZNF2I5Y2ENBJ'});

// reply to user input
bot.dialog('/', [
  function (session, results) {
    myWit.message(session.message.text, {}).then((data) => {
      session.send(swanson.replyOnIntent(data))
    }).catch(console.error);
  }
]);
