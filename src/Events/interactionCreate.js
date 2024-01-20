const ErrorEmbed = require("../Structures/ErrorEmbed.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    let command = interaction.client.Commands.get(interaction.commandName);
    let errorEmbed = new ErrorEmbed();
    if (command.data.commandType.toLowerCase() == "text") {
      errorEmbed.setError({
        name: "Wrong Command Type!",
        value: "This Command is a text only command!",
      });
      await interaction.reply({ embeds: [errorEmbed] });
    } else {
      try {
        await command.execute(interaction);
      } catch (error) {
        errorEmbed.setError({name: "Failed To Execute Command!", value: `Error: ${error}`})
        interaction.reply({embeds: [errorEmbed]})
      }
    }
  },
};
