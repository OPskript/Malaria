const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
    await message.delete();
    
    if(!message.author.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permission to mute them!")
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Couldn't find user.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!").then(msg => {msg.delete(5000)});
    
    if(tomute.id === message.author.id) return message.channel.send("You cannot mute yourself!");
    if(tomute.highestRole.position >= message.member.highestrole.position) return message.channel.send("You cannot mute a member who is higher or has the same role as you.");
    
    let muterole = message.guild.roles.find(r => r.name === "muted");
    // start of create role
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#cc2424",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            })
        }catch(e){
            console.log(e.stack);
        }
    }
    // end of create role

    if(tomute.roles.has(muterole.id)) return message.channel.send("This user is already muted!");
    
    await(tomute.addRole(muterole.id));
    message.channel.send(`<@${tomute.id}> has been muted!`).then(msg => {msg.delete(5000)});
  
}

module.exports.help = {
  name: "mute",
  aliases: []
}