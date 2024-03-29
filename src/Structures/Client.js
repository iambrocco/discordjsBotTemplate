const discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
class Client extends discord.Client {
  /**
   *
   * @param {import("discord.js").ClientOptions} options
   */
  constructor(options) {
    super(options);
    this.Commands = new Map();
    this.commandAliases = new Map();
    this.textCommandsPrefix = "!";
  }
  loadFunctionFiles(type) {
    let types = {
      cmd: {
        folderPath: "./Commands",
        executeFN: (commandFile) => {
          this.Commands.set(commandFile.data.name, commandFile);
        },
      },
      ev: {
        folderPath: "./Events",
        executeFN: (commandFile) => {
          if (commandFile.once) {
            this.once(commandFile.name, (...args) =>
              commandFile.execute(...args)
            );
          } else {
            this.on(commandFile.name, (...args) =>
              commandFile.execute(...args)
            );
          }
        },
      },
    };
    let loadSubFiles = (subFolderPath) => {
      const isDirectory = fs.lstatSync(subFolderPath).isDirectory();
      if (isDirectory) {
        const children = fs.readdirSync(subFolderPath);
        for (const child of children) {
          const subPath = path.join(subFolderPath, child);
          loadSubFiles(subPath);
        }
      } else {
        const commandFile = require(subFolderPath);
        types[type].executeFN(commandFile);
      }
    };

    const CommandsFolderPath = path.join(
      __dirname,
      `../${types[type].folderPath}`
    );
    const CommandSubFolders = fs.readdirSync(CommandsFolderPath);

    for (const dir of CommandSubFolders) {
      const filePath = path.join(CommandsFolderPath, dir);

      loadSubFiles(filePath);
    }
    return this;
  }
  refreshCommands(token) {
    const commands = [];
    this.Commands.forEach((command) => {
      commands.push(command.data.toJSON());
    });
    const rest = new discord.REST().setToken(token);

    (async () => {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );
      await rest
        .put(discord.Routes.applicationCommands(process.env.clientId), {
          body: commands,
        })
        .then((e) => {
          console.log(
            `Successfully reloaded ${e.length} application (/) commands.`
          );
        })
        .catch(async (err) => {
          console.log(`An Error Occured: ${err}`);
        });
    })();
  }
  start(token) {
    console.clear();
    this.loadFunctionFiles("ev");
    this.loadFunctionFiles("cmd");
    this.refreshCommands(token);
    this.login(token);
  }
}
module.exports = Client;
