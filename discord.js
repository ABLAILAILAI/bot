const {
    Client,
    attachment
} = reqire('discord.js');

const bot = new Client();

const  ytdl = require("ytdl-core");


const token = 'OTY5NTUyMDkyNjU2MTczMDc2.YmvDwA.f3jvbe_WH3l7vElgDU2Zvjqp890';

const PREFIX = '!';

var version = '1.2';

var servers  = {};


bot.on('ready', () => {
    console.log('This bot is online! ' + version);

})




bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'play':

        function play(connection,message){
            var server = servers[message.guild.id];

             server.dispatcher = connection.playStream(ytdl(server.queue[0], {filger: "audioonly"}));

             server.queue.shift();

             server.dispatcher.on("finish", function(){
                 if(server.queue[0]){
                     play(connection, message);
                 }else {
                     connection.disconnect();
                 }
             })


        }


        if(!args[1]){
            message.channel.send("you need to provide a link");
            return;
        }

        if(!message.member.voiceChannel){
            message.channel.send("You must be in a channel to play a bot!!!");
            return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }

        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
            play(connection, message);
        })





        break;

        case 'skip':
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            message.channel.send("Skipping the song!")
        break;

        case 'stop':
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection){
                for(var i = server.queue.length -1; i >=0; i--){
                    server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                message.channel.send("Ending the queue, Leaving the voice channel!")
                console.log('stopped the queue')
            }

            if(message.guild.connection) message.guild.voiceConnection.disconnect();
    }


});

bot.login(token);