require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const commands = require('./commands')

console.log("initializing...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.DISCORD_TOKEN);

client.once("ready", () => {
  console.log(`The bot is ready to roll!`);
});

client.on("messageCreate", (message) => {
  recievedMessage = message.content.toLowerCase();
  command = commands.find(({ key }) => recievedMessage.includes(key))
  command ? message.reply(command.value) : null
});
