const { SlashCommandBuilder } = require("discord.js");

class CommandBuilder extends SlashCommandBuilder{
  constructor() {
    super()
    this.commandType = "TEXT" | "SLASH" | "BOTH";
    this.category = "Uncategorized";
  }
  /**
   *
   * @param {"TEXT" | "SLASH" | "BOTH"} type
   */
  setType(type) {
    this.commandType = type;
    return this;
  }
  /**
   *
   * @param {String} category
   */
  setCategory(category) {
    this.category = category;
    return this;
  }
}
module.exports = CommandBuilder;