const { REST, Routes } = require("discord.js");
const { DISCORD_BOT_TOKEN, DISCORD_SERVER_GUILD_ID, DISCORD_SERVER_APPLICATION_ID } = require("./config.js");

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
    async execute(interaction) {
      await interaction.reply("Pong!");
    }
  },
  {
    name: "verify",
    description:
      "Verify your wallet with CrossValue Chain Balance (XCR) to access exclusive server channels",
  }
];
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(DISCORD_BOT_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(DISCORD_SERVER_APPLICATION_ID, DISCORD_SERVER_GUILD_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error("Error while refreshing application (/) commands:", error);
  }
})();