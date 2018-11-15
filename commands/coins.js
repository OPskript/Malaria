const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
    
    await message.delete();
    
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }
    
    let userCoins = coins[message.author.id].coins;
    
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#00ff00")
    .addField("💸", `Coins: ${userCoins}`);
    
    message.channel.send(coinEmbed).then(msg => {msg.delete(5000)}); 
}

module.exports.help = {
    name: "coins",
    aliases: []
}