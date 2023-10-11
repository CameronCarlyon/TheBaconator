console.log("Initialising...");

require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const keywords = require("./commands/keywords");
const {
  overwatchOnLaunch1,
  overwatchOnLaunch2,
  overwatchOnLaunch3,
  overwatchOnClosure1,
  overwatchOnClosure2,
} = require("./commands/anti-overwatch");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
  EmbedBuilder,
  GuildMember,
  Activity,
  userMention,
  Presence,
} = require("discord.js");

// Troubleshooting
// console.log("overwatchOnLaunch1:", overwatchOnLaunch1);

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

// Anti-Overwatch Message Generator

const cooldownDuration = 60000; // x1000
const timeOfLastMessage = {};

client.on("presenceUpdate", (oldPresence, newPresence) => {
  // Check if the user has launched Overwatch.
  const isPlayingOverwatch = newPresence.activities.some(
    (activity) => activity.name === "Overwatch 2"
  );

  // const wasPlayingOverwatch = oldPresence.activities.some(
  //   (activity) => activity.name === "Overwatch 2"
  // );

  if (isPlayingOverwatch) {
    const userMention = newPresence.user.toString();
    const channelGeneral = newPresence.member.guild.channels.cache.find(
      (channel) => channel.name === "general"
    );
    const currentTime = Date.now(); // move cooldown functionality to count from onClosure event instead of onLaunch
    const lastMessageTime = timeOfLastMessage[newPresence.user.id];
    if (!lastMessageTime || currentTime - lastMessageTime >= cooldownDuration) {
      const overwatchLaunchMessage = `${userMention} ${
        overwatchOnLaunch1[
          Math.floor(Math.random() * overwatchOnLaunch1.length)
        ]
      } ${
        overwatchOnLaunch2[
          Math.floor(Math.random() * overwatchOnLaunch2.length)
        ]
      } ${
        overwatchOnLaunch3[
          Math.floor(Math.random() * overwatchOnLaunch3.length)
        ]
      }`;
      console.log(overwatchLaunchMessage);
      // channelGeneral.send(overwatchLaunchMessage);
      timeOfLastMessage[newPresence.user.id] = currentTime;
    } else console.log("Anti-Overwatch warning blocked by cooldown.");
  }
  // if (wasPlayingOverwatch && !isPlayingOverwatch) {
  //   const overwatchClosureMessage = `${userMention} ${
  //     overwatchOnClosure1[
  //       Math.floor(Math.random() * overwatchOnClosure1.length)
  //     ]
  //   } ${
  //     overwatchOnClosure2[
  //       Math.floor(Math.random() * overwatchOnClosure2.length)
  //     ]
  //   }`;
  //   console.log(overwatchClosureMessage);
  // }
});
