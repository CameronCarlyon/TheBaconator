const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("A full list of functionality."),
  async execute(interaction) {
    await interaction.reply(
      ` >>> Here is a full list for all of the available commands:  
            * **ping**
                
            *Ping Pong!*
            * **server**
                
            *Provides information for the current server in use.*
            * **user**
                 
            *Provides information about the user.*
            * **github**
                
            *Shows the GitHub repository for the Baconator.*
            * **help**
                
            *Provides help and troubleshooting information.*
            * **decide**
                
            *Generates a yes or no response to help with decisions.*`
    );
  },
};
