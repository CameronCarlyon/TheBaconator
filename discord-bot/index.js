console.log("Initialising...");

require("dotenv").config({ path: "../.env" });
const fs = require("node:fs");
const path = require("node:path");
const keywords = require("./utils/keywords");
const {
  overwatchOnLaunch1,
  overwatchOnLaunch2,
  overwatchOnLaunch3,
  overwatchOnClosure1,
  overwatchOnClosure2,
} = require("./utils/anti-overwatch");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");

// Troubleshooting
// console.log("overwatchOnLaunch1:", overwatchOnLaunch1);

// New Client with Permissions
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

// Logs user activities to the console

client.on("presenceUpdate", (oldPresence, newPresence) => {
  if (!newPresence?.activities) return;
  
  if (newPresence.activities.length > 0) {
    const presenceTime = new Date();
    const user = newPresence.user.tag;
    const gameName = newPresence.activities[0].name;
    console.log(`${user} is now on ${gameName} at ${presenceTime}.`);
  }
  if (oldPresence?.activities?.length > 0) {
    const presenceTime = new Date();
    const user = oldPresence.user.tag;
    const gameName = oldPresence.activities[0].name;
    console.log(`${user} is no longer on ${gameName} at ${presenceTime}.`);
  }
});

// Listens to GuildMessages, converts to lowercase and checks for matches within keywords.js

client.on("messageCreate", (message) => {
  if (!message.author.bot) {
    const receivedMessage = message.content.toLowerCase();
    const keyword = keywords.find(({ keyword }) => receivedMessage.includes(keyword));
    if (keyword) {
      message.reply(keyword.reply);
    }
  }
});

// Stream Alerts
const streamingCooldownDuration = 300000; // 5 minutes
const streamingTimeOfLastMessage = {};

client.on('presenceUpdate', (oldPresence, newPresence) => {
  if (!newPresence || !newPresence.member) return;
  
  const streamingBefore = oldPresence?.activities?.some(activity => activity.type === ActivityType.Streaming) || false;
  const streamingNow = newPresence.activities.some(activity => activity.type === ActivityType.Streaming);
  const currentTime = Date.now();
  const lastStreamMessageTime = streamingTimeOfLastMessage[newPresence.user.id];

  if (!streamingBefore && streamingNow) {
    // Check cooldown
    if (!lastStreamMessageTime || currentTime - lastStreamMessageTime >= streamingCooldownDuration) {
      const channel = newPresence.member.guild.channels.cache.find(ch => ch.name === 'general');
      if (channel) {
        const streamActivity = newPresence.activities.find(activity => activity.type === ActivityType.Streaming);
        const streamUrl = streamActivity?.url || 'Stream URL not available';
        channel.send(`🎥 ${newPresence.user.toString()} is now streaming! Check it out: ${streamUrl}`);
        streamingTimeOfLastMessage[newPresence.user.id] = currentTime;
      }
    }
  }
});

// Anti-Overwatch Message Generator

const overwatchCooldownDuration = 300000; // x1000
const overwatchTimeOfLastMessage = {};

client.on("presenceUpdate", (oldPresence, newPresence) => {
  if (!newPresence?.member?.guild) return;
  
  // Check if the user has launched Overwatch.
  const isPlayingOverwatch = newPresence.activities.some(
    (activity) => activity.name === "Overwatch 2"
  );

  const wasPlayingOverwatch = oldPresence
    ? oldPresence.activities.some((activity) => activity.name === "Overwatch 2")
    : false;
  const currentTime = Date.now();
  const lastMessageTime = overwatchTimeOfLastMessage[newPresence.user.id];
  const userMention = newPresence.user.toString();
  const channelGeneral = newPresence.member.guild.channels.cache.find(
    (channel) => channel.name === "general"
  );

  if (isPlayingOverwatch && !wasPlayingOverwatch) {
    // Checks the amount of time passed since last message
    if (
      !lastMessageTime ||
      currentTime - lastMessageTime >= overwatchCooldownDuration
    ) {
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
      // Sends the generated launch message.
      if (channelGeneral) {
        channelGeneral.send(overwatchLaunchMessage);
        // Update the cooldown timer for launch messages too
        overwatchTimeOfLastMessage[newPresence.user.id] = currentTime;
      }
    } else {
      console.log("Anti-Overwatch launch warning blocked by cooldown.");
    }
  } else if (oldPresence && wasPlayingOverwatch && !isPlayingOverwatch) {
    const userMention = newPresence.user.toString();
    // Checks the amount of time passed since last message
    if (
      !lastMessageTime ||
      currentTime - lastMessageTime >= overwatchCooldownDuration
    ) {
      const overwatchClosureMessage = `${userMention} ${
        overwatchOnClosure1[
          Math.floor(Math.random() * overwatchOnClosure1.length)
        ]
      } ${
        overwatchOnClosure2[
          Math.floor(Math.random() * overwatchOnClosure2.length)
        ]
      }`;
      console.log(overwatchClosureMessage);
      // Sends the generated closure message.
      if (channelGeneral) {
        channelGeneral.send(overwatchClosureMessage);
      }
      // Records the time of the last message to currentTime.
      overwatchTimeOfLastMessage[newPresence.user.id] = currentTime;
    } else {
      console.log("Anti-Overwatch closure warning blocked by cooldown.");
    }
  }
});

// TO-DO:
// - Add more customizable streaming notification settings
// - Add command to toggle anti-overwatch messages per user
// - Add more interactive commands (polls, random generators, etc.)
// - Add admin commands for server management
// - Add database support for persistent user preferences
