// https://docs.botframework.com/en-us/node/builder/guides/core-concepts/

var restify = require('restify');
var builder = require('botbuilder');
var path = require('path');
var favicon = require('serve-favicon');
var swanson = require('./swanson/swanson');

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
  appPassword: process.env.MICROSOFT_APP_PASSWORD });
var bot = new builder.UniversalBot(connector);

// retrieve messages here
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    // function (session, args, next) {
    //     if (!session.userData.name) {
    //         session.beginDialog('/profile');
    //     } else {
    //         next();
    //     }
    // },
    function (session, results) {
        session.send(swanson.getRandomQuote());
    }
]);

// bot.dialog('/profile', [
//     function (session) {
//         builder.Prompts.text(session, 'Hi! What is your name?');
//     },
//     function (session, results) {
//         session.userData.name = results.response;
//         session.endDialog();
//     }
// ]);
