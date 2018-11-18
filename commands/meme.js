const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    
let msg = await message.channel.send("Generating...")
let {body} = await superagent
    .get(`https://api-to.get-a.life/meme`);

    if(!{body}) return message.channel.send("Please try again.");

    let memeEmbed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setAuthor("Malaria MEMES", `${bot.user.displayAvatarURL}`)
    .setImage(body.url)
    .setTimestamp()
    .setFooter(`Malaria`, bot.user.displayAvatarURL);
    
    message.channel.send(memeEmbed);
    
    msg.delete();
}

module.exports.help = {
    name: "meme",
    aliases: ["memes"]
}