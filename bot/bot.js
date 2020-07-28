const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const secret_store = require('./secret_store.json')

const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');


client.on('ready', () => {
    console.log(`[Bowling Ball] Logged in as user ${client.user.tag}`);
    if(client.user.bot == true) {
        console.log('[Bowling Ball] This user is a bot user!');
    } else if(client.user.bot == false) {
        console.log('[Bowling Ball] This user is not a bot user!')
    } else {
        console.log('[Bowling Ball] Error: Cannot find out if user is a bot or not!')
    }
});

client.on('message', msg => {
    if (msg.content === 'bb!ping') {
        msg.channel.send(exampleEmbed);
    }
});

client.login(secret_store.token);