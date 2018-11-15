const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("~Bot Information~")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Bot Joined", message.guild.member(bot.user).joinedAt)
    .addField(`Number of servers ${bot.user.username} is in`, bot.guilds.size);

    return message.channel.send(botembed);
  }

module.exports.help = {
    name: "botinfo",
    aliases: ["bot-info"]
}