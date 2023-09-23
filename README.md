# Hello and Welcome to IamBrocco's DiscordJS Bot Template!

## Features Of this template:

- Support of Both Text and Slash Commands
- Individual Command and Event Files
- Up To Date with the Discord.JS NPM Module
  > To Change The Bot's Prefix:
- Go To `src/Structures/Client.js`
- On Line 12 (`this.textCommandsPrefix = "!";`) replace `!` with your desired prefix

## To Start Using This template, Simply run

>

- `git clone https://github.com/iambrocco/discordjsBotTemplate.git`
- `npm install`
- create a file called .env and insert the following

```env
clientId=YOURCLIENTID
token=YOURBOTTOKEN
```

## To Create a Command:

- Head over to `src/Commands`
- Create a file `test.js`
- Use this code template

```js
const CommandBuilder = require("../Structures/CommandBuilder");
module.exports = {
  data: new CommandBuilder()
    .setName("test") // Make sure this is lowercase otherwise the bot will crash
    .setDescription("Test Command") // The Capitalization can be whatever here
    .setCategory("Testing") // Can be whatever
    .setType("BOTH"), // Can be "TEXT" or "SLASH" or "BOTH"
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   * @param {Array} args
   */
  async execute(interaction, args) {
    await interaction.reply(`This command just works!`);
  },
};
```
