const ownerid = ["725260858028195892"];
const ownerid2 = ["725260858028195892"];

module.exports = {
    config: {
        name: "getinvite",
        aliases: ['getinv', 'gi'],
        category: "owner",
        description: "Generates an invitation to the server in question.",
        usage: "[ID]",
        accessableby: "Owner"
    },
    run: async(bot, message, args) => {
        if (message.author.id == ownerid || ownerid2) {
        let guild = null;

        if (!args[0]) return message.channel.send("<a:deny:892076004183506954> Enter An Name")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("<a:deny:892076004183506954> Invalid Name!");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("<a:deny:892076004183506954> An Error Has Occured Try Again!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} has occured!`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - Bot is Not in this server`);
        }
    } else {
        return;
    }
    }

}
