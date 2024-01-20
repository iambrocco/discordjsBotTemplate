const { Message, MessageEmbed } = require("discord.js");
const ErrorEmbed = require("../Structures/ErrorEmbed");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    let errorEmbed = new ErrorEmbed();
    if (
      message.author.bot ||
      !message.content
        .toLowerCase()
        .startsWith(message.client.prefix.toLowerCase())
    )
      return;

    let client = message.client;

    let args = message.content
      .toLowerCase()
      .slice(message.client.prefix.length)
      .split(/ +/);

    let command = null;

    // Check if the command or alias is in commandAliases
    for (const [commandName, aliases] of client.commandAliases.entries()) {
      if (aliases.includes(args[0].toLowerCase())) {
        // Set the command to the parent command
        command = client.Commands.get(commandName.toLowerCase());
        break; // Stop the loop if an alias is found
      }
    }

    // If no alias is found, try to get the command directly
    if (!command) {
      command = client.Commands.get(args[0].toLowerCase());
    }

    if (command && command.data.commandType.toLowerCase() == "slash") {
      errorEmbed.setError({
        name: "Wrong Command Type!",
        value: "This Command is a slash only command!",
      });
      await message.reply({ embeds: [errorEmbed] });
    } else if (command) {
      try {
        await command.execute(interaction);
      } catch (error) {
        errorEmbed.setError({
          name: "Failed To Execute Command!",
          value: `Error: ${error}`,
        });
        interaction.reply({ embeds: [errorEmbed] });
      }
    }
  },
};
