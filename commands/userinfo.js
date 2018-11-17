const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    let uicon = message.author.iconURL;
    let userembed = new Discord.RichEmbed()
    .setDescription("User Information")
    .setColor("#15f153")
    .setImage(message.author.displayAvatarURL)
    .addField("Name", message.author.username, true)
    .addField("Created On", moment(message.author.createdAt).format("LL"), true)
    .addField("User Joined", moment(message.member.joinedAt).format("LL"), true)
    .addField("Status", `${message.author.prescence.status}`, true);

    return message.channel.send(userembed);
  }

module.exports.help = {
    name: "userinfo",
    aliases: ["user-info"]
}