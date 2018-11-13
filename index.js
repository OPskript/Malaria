const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3ODc4MTI3MjMyODUwMzMxOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQxNDc5MDE5fQ.Brjzrld7da7B4L5HRWUUuT_9DxKW94tq79PyGx07jb8', bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cooldownSeconds = 5;

fs.readdir("./commands/", (err, files) => {
    
    if(err) console.log(err);
    
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }
    
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name)
        });
    });
});


dbl.on('posted', () => {
    return;
})

dbl.on('error', e => {
    console.log(e);
})


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

//  bot.user.setActivity("YouTube", {type: "WATCHING"});

  bot.user.setActivity(`Currently on ${bot.guilds.size} servers!`);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    

    

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }
    
    
    
    if(!coins[message.author.id]){
        coins[message.author.id] = {
        coins: 0
        };
    }

    let coinAmount = Math.floor(Math.random() * 15) + 1;
    let baseAmount = Math.floor(Math.random() * 15) + 1;
    console.log(`${coinAmount} ; ${baseAmount}`);

    if(coinAmount === baseAmount){
        coins[message.author.id] = {
        coins: coins[message.author.id].coins + coinAmount
    };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
    });
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#0000FF")
    .addField("💸", `${coinAmount} coins added!`);

    message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }
    
    let xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);
    
    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }
    
    let currentXp = xp[message.author.id].xp;
    let currentLevel = xp[message.author.id].level;
    let nextLevel = xp[message.author.id].level * 300;
    xp[message.author.id].xp = currentXp + xpAdd;
    if(nextLevel <= xp[message.author.id].xp){
        xp[message.author.id].level = currentLevel + 1;
        let levelUp = new Discord.RichEmbed()
        .setTitle("Level Up!")
        .setColor(purple)
        .addField("New Level", currentLevel + 1);
        
        message.channel.send(levelUp).then(msg => {msg.delete(500)});
    }
    
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err)
    });
    


    let prefix = prefixes[message.guild.id].prefixes;
    if(!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)){
        message.delete();
        return message.reply("You have to wait 5 seconds between commands.")
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        cooldown.add(message.author.id);
    }

//  let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) commandfile.run(bot,message,args);
    
    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cooldownSeconds * 1000)
    
});

bot.login(tokenfile.token);