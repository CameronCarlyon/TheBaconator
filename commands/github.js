const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const githubEmbed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("The Baconator Github Repo")
  .setURL("https://github.com/CameronCarlyon/Baconator")
  .setAuthor({
    name: "Cameron Carlyon",
    iconURL:
      "https://avatars.githubusercontent.com/u/81519722?s=400&u=f2719b95754795449a33a132f382ec51f0a68768&v=4",
    url: "https://github.com/CameronCarlyon",
  })
  .setDescription(
    "Greetings, I am the Baconator! I am a work-in-progress bot designed for Discord."
  )
  .setThumbnail("https://i.imgur.com/AfFp7pu.png")
  .addFields({ name: "Regular field title", value: "Some value here" });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("The GitHub repository for the Baconator."),
  async execute(interaction) {
    await interaction.reply(githubEmbed);
  },
};

channel.send({ embeds: githubEmbed });
