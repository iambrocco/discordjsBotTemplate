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
    if (command.data.commandType.toLowerCase() == "slash") {
      let errorEmbed = new EmbedBuilder()
        .setTitle("Error!")
        .setColor("Red")
        .addFields({
          name: "Wrong Command Type!",
          value: "This Command is a slash only command!",
        });
      await message.reply({ embeds: [errorEmbed] });
    } else {
      await command.execute(message, args);
    }
  },
};
