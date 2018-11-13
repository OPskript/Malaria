const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.react('🤔');
}

module.exports.help = {
    name: "react",
    aliases: []
}