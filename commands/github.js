const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const githubEmbed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("The Baconator")
  .setURL("https://github.com/CameronCarlyon/Baconator")
  .setAuthor({
    name: "Some name",
    iconURL: "https://i.imgur.com/AfFp7pu.png",
    url: "https://discord.js.org",
  })
  .setDescription(
    "Greetings, I am the Baconator! I am a work-in-progress bot designed for Discord."
  )
  .setThumbnail("https://i.imgur.com/AfFp7pu.png")
  .addFields(
    { name: "Regular field title", value: "Some value here" },
    { name: "\u200B", value: "\u200B" },
    { name: "Inline field title", value: "Some value here", inline: true },
    { name: "Inline field title", value: "Some value here", inline: true }
  )
  .addFields({
    name: "Inline field title",
    value: "Some value here",
    inline: true,
  })
  .setImage("https://i.imgur.com/AfFp7pu.png")
  .setTimestamp()
  .setFooter({
    text: "Some footer text here",
    iconURL: "https://i.imgur.com/AfFp7pu.png",
  });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("The GitHub repository for the Baconator."),
  async execute(interaction) {
    await interaction.reply(githubEmbed);
  },
};

channel.send({ embeds: githubEmbed });
