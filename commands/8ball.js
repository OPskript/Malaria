const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!args[1]) return message.reply("Please ask a full question!");
    let replies = ["Yes.", "No", "I don't know.", "Ask again later."];
    
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");
    
    let ballEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#d8820a")
    .addField("Question", question)
    .addField("Answer", replies[result]);
    
    message.channel.send(ballEmbed);
}

module.exports.help = {
    name: "8ball",
    aliases: []
}