const { SlashCommandBuilder } = require("discord.js");
const ping = require("./ping");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("A full list of functionality."),
  async execute(interaction) {
    await interaction.reply(
      ` Here is a full list for all of the available commands:  
            * ping
                * Ping Pong 🏓
            * server
                * Provides information for the current server in use.
            * user
                * Provides information on the user.`
    );
  },
};
