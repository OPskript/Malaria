const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You do not have permission!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("You didn't specify someone."); 
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot do that to Moderators!");
    let reason = args.join(" ").slice(22);
    
    if(!warns[wUser]) warns[wUser] = {
        warns: 0
    };
    warns[wUser].warns++;
    
    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });
    
    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Warned User", `<@${wUser}>`)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser].warns)
    .addField("Reason", reason);
    
    let warnchannel = message.guild.channels.find(c => c.name === "logs")
    if(!warnchannel) return message.reply("Couldn't find channel");
    
    warnchannel.send(warnEmbed);
    
    if(warns[wUser].warns == 2){
        let muterole = message.guild.roles.find(r => r.name === "muted");
        if(!muterole) return message.reply("That role does not exist.");
        
        let mutetime = "12h";
        await(wUser.addRole(muterole.id));
        message.channel.send(`${wUser} has been temporarily muted`);
        
        setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.reply(`${wUser} has been unmuted.`)
        }, ms(mutetime))
    }
    if(warns[wUser].warns == 3){
        message.guild.member(wUser).kick(reason);
        message.reply(`${wUser} has been kicked.`)
    }
}

module.exports.help = {
    name: "warn",
    aliases: []
}