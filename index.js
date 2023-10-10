console.log("Initialising...");

require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const keywords = require("./commands/keywords");
const overwatch = require("./commands/anti-overwatch");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
  EmbedBuilder,
  GuildMember,
  Activity,
} = require("discord.js");

// Permissions
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.login(process.env.DISCORD_TOKEN);

client.once(Events.ClientReady, (c) => {
  console.log(`${c.user.tag} is ready to roll!`);
  // Set the client user's presence
  client.user.setPresence({
    status: "online",
    activities: [
      {
        type: ActivityType.Custom,
        name: "customstatus",
        state: "Your Crispiest Companion!",
      },
    ],
  });
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Checking for "data" and "execute" properties in command files.
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `WARNING: The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// Slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (command) {
      console.log(interaction); // Print user interactions
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    }
  }
});

// Listens to GuildMessages, converts to lowercase and checks for matches within keywords.js

client.on("messageCreate", (message) => {
  if (!message.author.bot) {
    recievedMessage = message.content.toLowerCase();
    keyword = keywords.find(({ keyword }) => recievedMessage.includes(keyword));
    keyword ? message.reply(keyword.reply) : null;
  }
});

// if a particular member is playing X game, print in a specific channel X message.
// if you want multiple games. Make an array of games you want the bot to trigger on,
// then use array.prototype.includes to find out if it exists.

client.on("presenceUpdate", (oldPresence, newPresence) => {
  // Check if the user has launched Overwatch.
  const isPlayingOverwatch = newPresence.activities.some(
    (activity) => activity.name === "Overwatch 2"
  );
  if (isPlayingOverwatch) {
    const userMention = newPresence.user.toString();
    console.log(`${userMention} has started playing Overwatch.`);
    const channel = newPresence.member.guild.channels.cache.find(
      (channel) => channel.name === "general"
    );
    channel.send(userMention);
  }
});
