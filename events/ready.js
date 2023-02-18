const { Events } = require('discord.js');


module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setStatus(/*status*/"idle")
		
		client.user.setActivity("activity_des", { type: 2/*activity_type*/ });
		
	
		const msg = `\n\n 	Ready! Logged in as ${client.user.tag}` ;
		console.log(msg);
		
	},
}