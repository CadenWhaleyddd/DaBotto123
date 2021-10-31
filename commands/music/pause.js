module.exports = {
    config: {
        name: 'pause',
        noalias: 'No Aliases',
        category: "music",
        description: 'Pause command.',
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        const serverQueue = ops.queue.get(message.guild.id);
        const { channel } = message.member.voice;
      try {
        if (!channel) return message.channel.send('<a:deny:892076004183506954> I\'m sorry but you need to be in a voice channel to pause music!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**<a:deny:892076004183506954> I\'m So Sorry But You Have To Be In The Same Channel With The Bot!!**");
        };
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true);
            return message.channel.send('**Music Is Now Paused** ⏸');
        }
        return message.channel.send(':cross-mark: There Is Nothing Playing Right Now!**');
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
      }
    }
};