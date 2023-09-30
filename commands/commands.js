const { SlashCommandBuilder } = require("discord.js");
const ping = require("./ping");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("A full list of functionality."),
  async execute(interaction) {
    await interaction.reply(
      `Here are all of the commands available to use:
        - ping
        - server
        - user`
    );
  },
};
