# Hello and Welcome to IamBrocco's Discord.JS Bot Template!

## Features Of this template:

- Support of Both Text and Slash Commands
- Individual Command and Event Files
- Up To Date with the Discord.JS NPM Module
- Advanced and Ready help command
  > To Change The Bot's Prefix:
- Go To `src/Structures/Client.js`
- On Line 12 (`this.textCommandsPrefix = "!";`) replace `!` with your desired prefix

## To Start Using This template, Simply run

>

- `git clone https://github.com/iambrocco/discordjsBotTemplate.git`
- `npm install`
- create a file in the project's root called .env and insert the following

```env
clientId=YOUR_BOT_CLIENTID
token=YOUR_BOT_TOKEN
```
- After you've done that, you can now run `npm run test` to run and debug your code
- And `npm run start` to start and host your code
- If you're using the default `intents` variable in `src/index.js`, make sure to enable these at
https://discord.com/developers/applications/YOUR_CLIENT_ID/bot
![intents](https://github.com/iambrocco/discordjsBotTemplate/blob/main/Assets/intents.png?raw=true)

## To Create a Command:

- Head over to `src/Commands`
- Create a file `ping.js`
- Use this code template

```js
const CommandBuilder = require("../Structures/CommandBuilder");
module.exports = {
  // Sub-Functions with a default value can be ommited.
  data: new CommandBuilder()
    .setName("ping") // The Command's Name, will be automatically turned to lowercase.
    .setDescription("Test Command") // The Command's Description, case-insensitive.
    .setCategory("Testing") // DEFAULT VALUE: "Uncategorized"; The Command's Category, Used for sorting in the built-in help command
    .addAliases("test", "botstat") // DEFAULT VALUE: ["commandName"]; Other execution names for the command, ONLY WORKS WITH TEXT COMMANDS
    .isThisCommandSecret(true) // DEFAULT VALUE: false; "Is this command hidden from the built-in help command?". To make the command really hidden, I advise you to make it a "TEXT" type command
    .setType("BOTH"), // DEFAULT VALUE: "SLASH"; Can be "TEXT" or "SLASH" or "BOTH"
  /**
   *
   * @param {import("discord.js").Interaction | import("discord.js").Message} interaction
   * @param {Array} args
   */
  async execute(interaction, args) {
    // Consider interaction as the Message or Interaction class, to make commands of type "BOTH" work you can do:

    interaction.content
      ? /* Do Something if the command is run by text*/ 
      console.log("Command was run by text!")
      : /* Do something if the command was run by slash */ 
      console.log("Command was run by slash!");

    await interaction.reply(`Pong!`);
  },
};
```

## To Create an Event:

- Head over to `src/Events`
- Create a file `ready.js`
- Use this code template

```js
const Client = require("../Structures/Client");

module.exports = {
  name: "ready",
  once: true,

  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    console.log(`${client.user.tag} is now ready!`);
  },
};
```
