const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

let msg = await message.channel.send("Generating...")
let {body} = await superagent
    .get(`https://aws.random.cat/meow`);

    if(!{body}) return message.channel.send("Please try again.");

    let catEmbed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setAuthor("Malaria CATS", `${bot.user.displayAvatarURL}`)
    .setImage(body.file)
    .setTimestamp()
    .setFooter(`Malaria`, bot.user.displayAvatarURL);
    
    message.channel.send(catEmbed);
    
    msg.delete();

}

module.exports.help = {
    name: "cat",
    aliases: []
}
