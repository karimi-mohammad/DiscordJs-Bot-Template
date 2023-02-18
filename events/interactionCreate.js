const { Events, Client } = require('discord.js');
const fs = require('fs');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            if (!interaction.isChatInputCommand()) return;
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                await command.execute(interaction);
                const msg = "User : " + interaction.user.username + "  Runned : " + interaction.commandName + " " ;
                await console.log(msg);
               
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }

        }
     
    },
};

