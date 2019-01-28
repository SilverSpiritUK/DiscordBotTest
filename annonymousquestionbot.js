//https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/
//https://github.com/babel/babel-loader/issues/84

var Discord = require('discord.io');
//var auth = require('./auth.json');
//var botinfo = require('./bot.json');
var question = undefined;
var silver = undefined;

// Initialize Discord Bot
var bot = new Discord.Client(
	{
		token: process.env.TOKEN,
		autorun: true
	}
);

bot.on('ready', function (evt)
{
	console.log('Connected');
	console.log('Logged in as: ' + bot.username + ' - (' + bot.id + ')');
	
	for(let [key, value] of Object.entries(bot.channels))
	{
		if(value.name == "botsilver")
		{
			silver = value.id;
			break;
		}
	}

	bot.sendMessage({
		to: silver, //botinfo.channelID, //"537699151480094740",
		message: 'Online'
	}, function(error, response){
		if(error != null) console.log(error);
	});

	bot.setPresence({
		game : {
			name: 'Ask me a question'
		}
	});

	for(let [key, value] of Object.entries(bot.channels))
	{
		if(value.name == "questions")
		{
			question = value.id;
			break;
		}
	}

	//console.log(question);
	//console.log(bot);
});

bot.on('message', function (user, userID, channelID, message, evt)
{
	console.log('Message from: ' + user + ' ' + userID + ' ' + channelID + ' ' + message);
	//console.log(bot.channels[channelID]);

	if(bot.directMessages[channelID] != undefined)
	{
		bot.sendMessage({
                    to: question, //'538358290606981151',
                    message: message
                }, function(error, response){
			if(error != null) console.log(error);
		});	
	}

	//console.log(bot);	
});

bot.on('disconnect', function(errMsg, code)
{
	console.log('disconnected');
	console.log('message: ' + errMsg + ' - code: ' + code);
});
