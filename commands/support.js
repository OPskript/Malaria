const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    await message.delete();

    
    let supportEmbed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .addField("Support", "Join the support server by clicking [here](https://discord.gg/E28Tvjf)")
    .addField("Dicord Bot Page", "Malaria's Discord bot page is [here](https://discordbots.org/bot/478781272328503318)");
    
    return message.channel.send(supportEmbed);
}

module.exports.help = {
    name: "support",
    aliases: []
}