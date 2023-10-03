const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "The help command is here to assist you in case you encounter any issues, bugs or malfunctions."
    ),
  async execute(interaction) {
    await interaction.reply(
      `>>> Should you encounter any issues, bugs or malfunctions with the Baconator, please review the following steps to resolve the issue:

**1. Check the Documentation**
The Baconator's [written documentation](https://github.com/CameronCarlyon/Baconator/wiki) details the full functionality of the bot as well as all currently known issues.

**2. Open an Issue**
If your issue is not present within the documentation, consider opening an issue on the project's [GitHub repository](https://github.com/CameronCarlyon/Baconator).

**3. Contact the Developer**
If your issue persists or you have a unique problem, please feel free to reach out to me through the social channels listed on my [GitHub profile](https://github.com/CameronCarlyon).`
    );
  },
};
