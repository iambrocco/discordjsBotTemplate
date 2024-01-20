require("dotenv").config();
const { GatewayIntentBits } = require("discord.js");
const Client = require("./Structures/Client");

let intents = [
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.MessageContent,
];

const client = new Client({ intents: intents });

client.start(process.env.token);
