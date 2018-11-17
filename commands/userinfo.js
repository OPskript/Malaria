const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    
    await message.delete();
    
    let member = message.mentions.members.first() || message.member;
    let uicon = member.user.displayAvatarURL;

        let userembed = new Discord.RichEmbed()
        .setTitle("User Information")
        .setColor("#15f153")
        .setImage(uicon)
        .addField("Name", member.user.username, true)
        .addField("Created On", moment(member.user.createdAt).format("LL"), true)
        .addField("User Joined", moment(member.joinedAt).format("LL"), true)
        .addField("Status", `${member.user.presence.status}`, true);

        return message.channel.send(userembed);

  }

module.exports.help = {
    name: "userinfo",
    aliases: ["user-info"]
}