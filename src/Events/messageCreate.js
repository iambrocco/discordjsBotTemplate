const { Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    if (
      !message.content.startsWith(message.client.textCommandsPrefix) ||
      message.author.bot
    )
      return;
    let args = message.content
      .toLowerCase()
      .slice(message.client.textCommandsPrefix.length)
      .split(/ +/);
    let command = message.client.Commands.get(args[0]);
    let errorEmbed = new EmbedBuilder().setTitle("Error!").setColor("Red");
    if (command && command.data.commandType.toLowerCase() == "slash") {
      errorEmbed.addFields({
        name: "Wrong Command Type!",
        value: "This Command is a slash only command!",
      });
      await message.reply({ embeds: [errorEmbed] });
    } else if (command) {
      try {
        await command.execute(message, args);
      } catch (error) {
        errorEmbed.addFields({ name: "An Error Occured!", value: `${error}` });

        await message.reply({ embeds: [errorEmbed] });
      }
    }
  },
};
