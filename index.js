require("dotenv").config();

const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, () => {
  console.log("The Baconator is ready to roll!");
});

client.login(process.env.DISCORD_TOKEN);
