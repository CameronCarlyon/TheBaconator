console.log("Initialising...");

require("dotenv").config();
const keywords = require("./commands/keywords");
const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.DISCORD_TOKEN);

client.once(Events.ClientReady, (c) => {
  console.log(`The ${c.user.tag} is ready to roll!`);
});

client.on("messageCreate", (message) => {
  recievedMessage = message.content.toLowerCase();
  keyword = keywords.find(({ keyword }) => recievedMessage.includes(keyword));
  keyword ? message.reply(keyword.reply) : null;
});
