const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    await message.delete();
    
    let category = args[0];
  
    let botIcon = bot.user.displayAvatarURL;
  
    if(!category){
      let generalEmbed = new Discord.RichEmbed()
      .setTitle("Help")
      .setColor("#00ff00")
      .setThumbnail(botIcon)
      .addField("Commands", "Do /help [category]")
      .addBlankField()
      .addField("Categories:", "general, moderator, fun, economy");

      message.channel.send(generalEmbed);
  
    }
  
  
    
    if(category === "general"){
    let gEmbed = new Discord.RichEmbed()
    .setTitle("~General Commands~")
    .setColor("#00ff00")
    .setThumbnail(botIcon)
    .addField("/botinfo", "Displays bot info")
    .addField("/help", "Bot Help")
    .addField("/ping", "Says PONG and tells you your ping with the bot")
    .addField("/support", "Get support by joining the bot's support server")
    .addField("/userinfo", "Displays information about you")
    .addField("/report [member] [reason]", "Reports a member to the moderators")
    .addField("/vote", "Gives you a link to vote for the bot");
    
    return message.channel.send(gEmbed);
    
    
    }else if(category === "moderator"){
      let mEmbed = new Discord.RichEmbed()
      .setTitle("~Moderator Commands~")
      .setColor("#00ff00")
      .setThumbnail(botIcon)
      .addField("/ban [member] [reason]", "Bans a member from the server. Needs a channel called logs")
      .addField("/tempmute [member] [time]", "Temporarly mute a member in the server")
      .addField("/addrole [member] [role]", "Gives a member a role. The bot has to be above the role it is going to give.")
      .addField("/removerole [member] [role]", "Removes a role from a member. The bot has to be above the role it is going to remove.")
      .addField("/serverinfo", "Displays server info")
      .addField("/clear [number]", "Deletes messages in a channel")
      .addField("/kick [member] [reason]", "Kicks a member from the server. Needs a channel called logs")
      .addField("/prefix [desired prefix]", "Changes the bot's prefix on the server")
      .addField("/say [message]", "Will make the bot say something.")
      .addField("/warn [member] [reason]", "warns a member on the server.")
      .addField("/warnlevel [member]", "Displays the level of warns a member has on a server.");

      return message.channel.send(mEmbed);
    
      }else if(category === "fun"){
        let fEmbed = new Discord.RichEmbed()
        .setTitle("~Fun Commands~")
        .setColor("#00ff00")
        .setThumbnail(botIcon)
        .addField("/8ball [question]", "Asks the bot a question. Will give a random answer.")
        .addField("/cat", "Gives you a cat image")
        .addField("/dog", "Gives you a dog image")
        .addField("/fortnite [username] [mode] [platform]", "Fortnite tracker. This displays a Fortnite player's stats.")
        .addField("/rip", "RIP");

        return message.channel.send(fEmbed);
    
      }else if(category === "economy"){  
        let eEmbed = new Discord.RichEmbed()
        .setTitle("~Economy and Levelling Commands~")
        .setColor("#00f000")
        .setThumbnail(botIcon)
        .addField("/coins", "Displays the amount of coins you have on the server. By talking in the chat, you can get coins.")
        .addField("/level", "Displays your level, XP, and XP needed to level up. The more talk in chat, the more XP you will get.")
        .addField("/pay [member] [coins]", "Donates money to a member on the server");

        return message.channel.send(eEmbed);
      }else {
        return message.channel.send("That is not a category!").then(msg => {msg.delete(5000)});
      }
}

module.exports.help = {
    name: "help",
    aliases: []
}