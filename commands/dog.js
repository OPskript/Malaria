const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {
    
let msg = await message.channel.send("Generating...")
let {body} = await superagent
    .get(`https://dog.ceo/api/breeds/image/random`);

    if(!{body}) return message.channel.send("Please try again.");

    let dogEmbed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setAuthor("Malaria DOGS", `${bot.user.displayAvatarURL}`)
    .setImage(body.message)
    .setTimestamp()
    .setFooter(`Malaria`, bot.user.displayAvatarURL);
    
    message.channel.send(dogEmbed);
    
    msg.delete();

}

module.exports.help = {
    name: "dog",
    aliases: []
}