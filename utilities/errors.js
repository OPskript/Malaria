const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.noPerms = (message, perm) =>{
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("NO PERMS")
    .setColor(config.red)
    .addField("Insufficient permission", perm);
    
    message.channel.send(embed).then(m => m.delete(5000));
}
