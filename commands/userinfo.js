const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let uicon = message.author.iconURL;
    let userembed = new Discord.RichEmbed()
    .setDescription("User Information")
    .setColor("#15f153")
    .setImage(message.author.displayAvatarURL)
    .addField("Name", message.author.username, true)
    .addField("Created On", message.author.createdAt, true)
    .addField("You Joined", message.member.joinedAt, true)
    .addField("Status", `${message.author.prescence.status}`, true);

    return message.channel.send(userembed);
  }

module.exports.help = {
    name: "userinfo",
    aliases: ["user-info"]
}