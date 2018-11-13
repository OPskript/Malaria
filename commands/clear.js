const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permission to use this command!");
    if(!args[0]) return message.channel.send("Please select a number greater than 1.");
    message.channel.bulkDelete(parseInt(args[0])+ 1).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(1000));
    });
}

module.exports.help = {
    name: "clear",
    aliases: []
}