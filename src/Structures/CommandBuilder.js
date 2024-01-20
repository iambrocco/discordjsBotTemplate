const { SlashCommandBuilder } = require("@discordjs/builders");

class CommandBuilder extends SlashCommandBuilder {
  constructor() {
    super();
    this.description = "use CommandBuilder().setDescription() to set a description."
    this.aliases = [];
    this.category = "Uncategorized";
    this.commandType = "SLASH";
    this.secret = false;
  }
  /**
   *
   * @param {String} category
   * @returns {CommandBuilder}
   */
  setCategory(category) {
    this.category = category;
    return this;
  }
  /**
   * 
   * @param {String} name 
   * @returns 
   */
  setName(name) {
    this.name = name.toLocaleLowerCase();
    this.aliases.push(this.name);
    return this;
  }
  /**
   *
   * @param {'TEXT' | 'SLASH' | 'BOTH'} commandType
   * @returns {CommandBuilder}
   */
  setType(commandType) {
    this.commandType = commandType;
    return this;
  }
  /**
   *
   * @param {String[]} aliases
   * @returns {CommandBuilder}
   */
  setAliases(...aliases) {
    aliases.forEach(alias => {
        this.aliases.push(alias);
    });
    return this;
}

  /**
   *
   * @param {String} alias
   * @returns {CommandBuilder}
   */
  addAlias(alias) {
    this.aliases.push(alias);
    return this;
  }
  /**
   *
   * @param {String[]} aliases
   * @returns {CommandBuilder}
   */
  addAliases(...aliases) {
    aliases.forEach(alias => {
        this.aliases.push(alias);
    });
    return this;
}

  /**
   *
   * @param {boolean} bool
   * @returns
   */
  isThisCommandSecret(bool) {
    this.secret = bool;
    return this;
  }
}

module.exports = CommandBuilder;
