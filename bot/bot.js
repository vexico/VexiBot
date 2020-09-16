// Bowling Ball
// Written by: Brendan Lane | https://git.imbl.me/brendanlane

//
// Module Manager
//

// Utilities Imports
import { generateEmbed } from "./modules/utils/EmbedGenerator.js";
import { convertUser, convertGroup } from "./modules/utils/SpikeViperConvert.js";

// Setup Imports
import { addKey, findKey } from "./modules/setup/KeyManager.js";

//
// Start of bot code
//

// Define major bot imports and variables
import Discord from 'discord.js';

const client = new Discord.Client();
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

import config from './config.js';
import secret_store from './secret_store.js';

// Initialization Code
client.on('ready', () => {
	// Shows who it is signed in as.
	console.log(`[Bowling Ball] Logged in as user ${client.user.tag}`);
	
	// Checks to see if the user it is signed in as is a bot user or not
    if(client.user.bot == true) {
        console.log('[Bowling Ball] This user is a bot user!');
    } else if(client.user.bot == false) {
        console.log('[Bowling Ball] This user is not a bot user!');
    } else {
        console.log('[Bowling Ball] Error: Cannot find out if user is a bot or not!');
	}

	// Set presence to Streaming with carpel tunnel
	client.user.setPresence({ activity: { name: 'with carpal tunnel', type: "STREAMING", url: "https://www.twitch.tv/smallkidwithgun" }});
});

// Command Parser
client.on('message', msg => {
	// Define command variables

	// Allow easy finding of the message author
	const author = msg.author;

	// Prefix stuff, idk, I found this on https://discordjs.guide/
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(config.prefix)})\\s*`);
	if (!prefixRegex.test(msg.content)) return;

	const [, matchedPrefix] = msg.content.match(prefixRegex);
	// Argument handler
	const args = msg.content.slice(matchedPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	// Ping Command
    if (command === `ping`) {
		// Get current date as number to calculate ping
		var startPing = Date.now();
		// Generate ping embed that does not have ping in it, as ping has not been calculated yet
		var pingMsg1 = generateEmbed("#cc3d32", ":ping_pong: Pong!", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "Getting ms... Please wait...", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));

		// Edit sent message
		msg.channel.send(pingMsg1).then((sentMessage) => {
			// Calculate ping
			var endPing = Date.now();
			var diffPing = endPing - startPing;

			// Generate new ping embed
			var pingMsg2 = generateEmbed("#cc3d32", ":ping_pong: Pong!", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "Your ping was " + diffPing + "ms!", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
			// Edit sent message to have new ping embed
			sentMessage.edit(pingMsg2);
		});
	// Profile Picture Command
    } else if (command === 'pfp') {
		// If noone is mentioned, get the authors profile picture
		if (!msg.mentions.users.size) {
			// Generate base embed
			var pfpMsg = generateEmbed("#0a4f1b", `:bust_in_silhouette: ${author.username}'s avatar`, "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "To get the avatar of others, just ping them", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
			// Set picture to authors profile picture
			pfpMsg.setImage(author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));

			// Send embed
			return msg.channel.send(pfpMsg);
		}
	
		// Gets avatar of tagged user(s)
		var avatarList = msg.mentions.users.map(user => {
			// Generate base embed
			var pfpMsg = generateEmbed("#0a4f1b", `:busts_in_silhouette: ${user.username}'s avatar`, "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "To get the avatar of others, just ping them", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
			// Add profile picture of user tagged
			pfpMsg.setImage(user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }));

			// Return current tagged user, if necessary will repeat
			return pfpMsg;
		});

		// Send embed
		msg.channel.send(avatarList);
	// Help Command
	} else if (command === 'help') {
		// Generate base embed
		var helpMsg = generateEmbed("#1f1e21", ":question: Bowling Ball - Help", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "Here you can find my commands!", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
		// Add fields which contain commands and prefixes
		helpMsg.addFields(
			{
				name: "Prefix",
				value: "My prefix is **bb!**, but you can also mention me if you want to!"
			},
			{
				name: "Fun",
				value: "- bb!ping\n- bb!pfp <mentioned user(s)>",
				inline: true
			},
			{
				name: "Setup",
				value: "- bb!setapikey <api key>",
				inline: true
			},
			{
				name: "System",
				value: "- bb!help\n- bb!about"
			}
		);

		// Send embed
		msg.channel.send(helpMsg);
	// Set API Key Command
	} else if (command === 'setapikey') {
		if (msg.channel.type != 'dm') {
			// Generate and send error
			var errorMsgDM = generateEmbed("#FF0000", ":x: Error", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "You must use this command in a DM for security reasons.", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
			msg.channel.send(errorMsgDM);
		} else {
			if (!args.length) {
				// Generate and send error
				var errorMsgNoKey = generateEmbed("#FF0000", ":x: Error", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "You have not sent a **spookvooper.com** API key!", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
				msg.channel.send(errorMsgNoKey);
			} else if (args.length > 1) {
				// Generate and send error
				var errorMsgTooManyArgs = generateEmbed("#FF0000", ":x: Error", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "There can be only one argument!", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
				msg.channel.send(errorMsgTooManyArgs);
			} else {
				// Add key to array - see api_keys.js and modules/setup/KeyManager.js
				addKey(author.id, args[0]);
				// Generate and send success message
				var successAddKey = generateEmbed("#00FF00", ":white_check_mark: Success!", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", `You have set your **spookvooper.com** api key to ||${args[0]}||`, `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
				msg.channel.send(successAddKey);

				// Generate and send a message with the limitation warning
				var warningKeyReset = generateEmbed("#FFE100", ":warning: Warning", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", `You must set the key every time the bot restarts due to a limitation with how it stores api keys.`, `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
				msg.channel.send(warningKeyReset);
			}
		}
	} else if (command === 'about') {
		// Generate the about embed
		var aboutMsg = generateEmbed("#bc4f70", ":information_source: About Bowling Ball", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "Bowling Ball is a remake of VoopAI.", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
		aboutMsg.addFields(
			{
				name: "What is VoopAI?",
				value: "VoopAI is an api frontend for Discord, mainly used in the SpookVooper discord"
			},
			{
				name: "Why does Bowling Ball exist?",
				value: "Bowling Ball is a way to have the main features of VoopAI for everyone & open source.",
				inline: true
			},
			{
				name: "Where can I find the source code?",
				value: "You can find it at https://git.imbl.me/brendanlane/bowling-ball",
				inline: true
			},
			{
				name: "Credits",
				value: "- Brendan Lane | Main Developer\n- Alex Balak | Developer\n\nYou can find social links on the README."
			},
			{
				name: "Where can I find more info?",
				value: "At the wiki! The link is https://git.imbl.me/brendanlane/bowling-ball/-/wikis/home",
				inline: true
			}
		);
		
		// Send the about embed
		msg.channel.send(aboutMsg);
	// Payment command
	} else if (command === 'pay') {
		// If the amount of args is not 3 or higher
		if (args.length < 3) {
			// Send error message
			var errorMsgPayArgs = generateEmbed("#FF0000", ":x: Error", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "There is an invalid amount of arguments", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
			msg.channel.send(errorMsgPayArgs);
		// Start of payment logic
		} else {
			if (args["0"] === 'user') {
				if (isNaN(args["1"]) === false) {
					var targetUser = convertUser("svid", "username", "lonr");
					console.log(targetUser);
				} else {
					console.log(2);
				}
			} else if (args["0"] === 'group') {
				console.log(2);
			} else {
				var errorMsgUnknownArgs = generateEmbed("#FF0000", ":x: Error", "Bowling Ball", "https://git.imbl.me/brendanlane/bowling-ball", "https://git.imbl.me/uploads/-/system/project/avatar/10/download__25_.jpg", "There is an unknown argument in your command!", `Generated by ${author.username}#${author.discriminator}`, author.displayAvatarURL({ dynamic: true }));
				msg.channel.send(errorMsgUnknownArgs);
			}
		}
	}
});

// Login as the bot
client.login(secret_store.token);