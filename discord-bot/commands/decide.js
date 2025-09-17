const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("decide")
    .setDescription("Generates a yes or no response."),
  async execute(interaction) {
    // Generate a random response: yes or no
    const responses = ["Yes", "No"];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    // Reply with the random response
    await interaction.reply(randomResponse);
  },
};
