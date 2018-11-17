const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("~Bot Information~")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username, true)
    .addField("Created On", moment(bot.user.createdAt).format("LL"), true)
    .addField("Bot Joined", moment(message.guild.member(bot.user).joinedAt).format("LL"), true)
    .addField(`Number of servers ${bot.user.username} is on`, bot.guilds.size, true);

    return message.channel.send(botembed);
  }

module.exports.help = {
    name: "botinfo",
    aliases: ["bot-info"]
}