const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let uicon = message.author.avatarURL;
    let uembed = new Discord.RichEmbed()
    .setImage(message.author.avatarURL)
    return message.channel.send(uembed);
  }

module.exports.help = {
    name: "myavatar",
    aliases: []
}