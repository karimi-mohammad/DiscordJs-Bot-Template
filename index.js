const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('node:fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const path = require('node:path');
const { request } = require('node:http');
const { ClientId, GuildId, token } = require('./config.json')

//slash commands

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			//If you want it to be added to only one server, use GuildId, otherwise, remove it
			Routes.applicationGuildCommands(ClientId, GuildId),
			
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();



client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
//end slash commands



//events
const eventsPath = './events';
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {

	const filePath = path.join(eventsPath, file);
	console.log(filePath)

	const event = require("./" + filePath);

	if (event.once) {


		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//end events



client.login(token);
