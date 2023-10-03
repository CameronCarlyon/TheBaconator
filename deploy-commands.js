require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "commands",
    description: "A full list of functionality.",
  },
  {
    name: "help",
    description:
      "The help command is here to assist you in case you encounter any issues, bugs or malfunctions.",
  },
  {
    name: "ping",
    description: "Pong!",
  },
  {
    name: "server",
    description: "Displays server information.",
  },
  {
    name: "user",
    description: "Displays user information.",
  },
];

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("Commands were registered successfully.");
  } catch (error) {
    console.log(`An error occured: ${error}`);
  }
})();
