// Bowling Ball - modules/utils/EmbedGenerator.js
// Written by: Brendan Lane | https://git.imbl.me/brendanlane

// Import Necessary Libraries
import Discord from 'discord.js';

// Generate Embed
function generateEmbed(color, title, authorName, authorLink, authorImg, description, footerText, footerImg) {
    var generatedEmbed = new Discord.MessageEmbed()
	    .setColor(color)
	    .setTitle(title)
	    .setAuthor(authorName, authorImg, authorLink)
	    .setDescription(description)
	    .setTimestamp()
        .setFooter(footerText, footerImg);
    return generatedEmbed;
}

export {
    generateEmbed
};