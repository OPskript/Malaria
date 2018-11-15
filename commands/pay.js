const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
    
    if(!coins[message.author.id]){
        return message.reply("You don't have any coins!")
    }
    
    let payUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    
    if(!coins[payUser.id]){
        coins[payUser.id] = {
            coins: 0
        }
    }
    
    let payCoins = coins[payUser.id].coins;
    let senderCoins = coins[message.author.id].coins;
    
    if(senderCoins < args[0]) return message.reply("Not enough coins there!");
    
    coins[message.author.id] = {
        coins: senderCoins - parseInt(args[1])
    };
    
    coins[payUser.id] = {
        coins: payCoins + parseInt(args[1])
    };
    
    message.channel.send(`${message.author} has given ${payUser} ${args[1]} coins.`);
    
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "pay",
    aliases: []
}