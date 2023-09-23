const {EmbedBuilder} = require("discord.js")
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    let command = interaction.client.Commands.get(interaction.commandName);
    if (command.data.commandType.toLowerCase() == "text") {
      let errorEmbed = new EmbedBuilder()
        .setTitle("Error!")
        .setColor("Red")
        .addFields({
          name: "Wrong Command Type!",
          value: "This Command is a text only command!",
        });
      await interaction.reply({ embeds: [errorEmbed] });
    } else {
      await command.execute(interaction);
    }
  },
};
