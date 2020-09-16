// Bowling Ball - modules/utils/EmbedGenerator.js
// Written by: Brendan Lane | https://git.imbl.me/brendanlane

// Import Necessary Libraries
import Discord from 'discord.js';

// Start of module

// Generate embed
function generateEmbed(color, title, authorName, authorLink, authorImg, description, footerText, footerImg) {
	// Create embed using parameters
    var generatedEmbed = new Discord.MessageEmbed()
	    .setColor(color)
	    .setTitle(title)
	    .setAuthor(authorName, authorImg, authorLink)
	    .setDescription(description)
	    .setTimestamp()
		.setFooter(footerText, footerImg);
		
	// Return generated embed
    return generatedEmbed;
}

// Export necessary functions
export {
    generateEmbed
};