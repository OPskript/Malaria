const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const rip = new Discord.Attachment('https://i.imgur.com/w3duR07.png');
    message.channel.send(rip);
}

module.exports.help = {
    name: "rip",
    aliases: []
}