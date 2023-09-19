console.log("initialising...");
require("dotenv").config();

const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`The ${c.user.tag} is ready to roll!`);
});

client.on("messageCreate", (message) => {
  console.log(message);
  if (message.content === "Hello there!") {
    message.reply("General Kenobi!");
  }
});

client.login(process.env.DISCORD_TOKEN);
