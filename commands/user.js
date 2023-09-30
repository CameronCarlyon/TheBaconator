const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.user.username} joined ${interaction.guild.name} on ${interaction.member.joinedAt}.`
      // add guild name to string at a later date
    );
  },
};
