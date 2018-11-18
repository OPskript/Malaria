const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const then = Date.now();
        message.channel.send("pinging...").then(m => {
            m.edit(`Pong! Took ${Date.now() - then}ms!`);
        });
    }

module.exports.help = {
    name: "ping",
    aliases: []
}