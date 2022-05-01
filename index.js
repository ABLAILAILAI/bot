const Discord = require('discord.js');
const bot = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

const token = 'OTY5NTUyMDkyNjU2MTczMDc2.YmvDwA.f3jvbe_WH3l7vElgDU2Zvjqp890';

const PREFIX = '!';

bot.on('ready', () =>{
    console.log('This bot is online')
})

bot.on('message', message=>{

    if(msg.content === "HELLO"){
        msg.reply("HELLO FRIEND!");   
    }
    let args = message.content.substring(PREFIX.length).split(" ");

   
    switch(args[0]){
        case 'ping':
            message.channel.sendMessage('pong!')
            break;
        case 'website':
        message.channel.sendMessage('subscribe to me!!!')
            break;
        case 'clear':
            if(!args[1]) return message.reply('Error, please define second arg')
            message.channel.bulkDelete(args[1]);
            break;
    }
})

bot.login(token);