const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
  if(msg.content === 'what is my avatar'){
      msg.reply(msg.author.avatarURL);
  }
  if(msg.content.startsWith('!github-bot')){
    msg.reply("https://github.com/future-devs/Bot");
  }
  else if(msg.content.startsWith('!github')){
      msg.reply("https://github.com/future-devs");
  }
  if(msg.content.startsWith("!cmds")){
      msg.reply("!github\n!kick(if you have permissions)");
  }
});

client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
    // If the message content starts with "!kick"
    if (message.content.startsWith('!kick')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member.kick('Optional reason that will display in the audit logs').then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          }).catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
        } else {
          // The mentioned user isn't in this guild
          message.reply('That user isn\'t in this guild!');
        }
      // Otherwise, if no user was mentioned
      } else {
        message.reply('You didn\'t mention the user to kick!');
      }
    }
    if(message.content === 'hello'){
      message.channel.send(`Hey there ${message.author}`);
    }
  });

client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === '😊general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to BroGrammers, ${member}\nPlease introduce yourself in the #introduction channel. Happy learning!`);
});

client.login(process.env.AUTH_TOKEN);