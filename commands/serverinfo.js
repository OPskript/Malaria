const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL)
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name, true)
    .addField("Created On", message.guild.createdAt, true)
    .addField("You Joined", message.member.joinedAt, true)
    .addField("Total Humans", message.guild.members.filter(f => f.user.bot === false).size, true)
    .addField("Total Bots", message.guild.members.filter(f => f.user.bot === true).size, true)
    .addField("Roles", message.guild.roles.size, true);

    return message.channel.send(serverEmbed);
  }

module.exports.help = {
    name: "serverinfo",
    aliases: ["server-info", "si"]
}