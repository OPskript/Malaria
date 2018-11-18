const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    await message.delete();
    
    let voteEmbed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .addField("Vote", "Support the bot by upvoting [here](https://discordbots.org/bot/478781272328503318/vote)");
    
    return message.channel.send(voteEmbed);
}

module.exports.help = {
    name: "vote",
    aliases: []
}