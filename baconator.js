require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("The Baconator is ready to roll!");
});
client.on("message", (msg) => {
  if (msg.content === "Hello there") {
    msg.reply("General Kenobi!");
  }
});

client.login(process.env.BOT_TOKEN);
