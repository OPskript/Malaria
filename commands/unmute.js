const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
    await message.delete();
    
    if(!message.author.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permission to unmute them!")
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("You did not specify a user.");
    let muterole = message.guild.roles.find(r => r.name === "muted");
    

    if(!muterole || !tomute.roles.has(muterole.id)) return message.channel.send("This user is not muted!");
    
    await(tomute.removeRole(muterole.id));
    message.channel.send(`<@${tomute.id}> has been unmuted!`).then(msg => {msg.delete(5000)});
  
}

module.exports.help = {
  name: "unmute",
  aliases: []
}