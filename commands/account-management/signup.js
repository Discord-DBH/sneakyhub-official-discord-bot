// Account Signup

exports.run = async(client, message, args) => {
	const request = require('request')
	const args = message.content.slice(client.config.prefix.length + 6).trim().split(/ +/)
	
	let key = ""
	let panel = ""
	
	message.reply("Check your DM's")
	let msg
	try {
		let embed = client.createEmbed().setColor(client.config.colors.neutral).setTitle("Step 1 - What is your email?")
		msg = message.author.send()
	} catch (e) {
		message.channel.send(client.createEmbed().setColor(client.config.colors.error).setTitle("Please turn on your DM's and try again!"))
	}

	const filter = m => m.author.id === message.author.id;
	msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time']})
		.then(collected => {
			let msg = collected.first()
			let EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (!EMAIL_REGEX.test(msg.content)) return message.channel.send(client.createEmbed().setColor(client.config.colors.error).setTitle("Invalid Email, please start over and try again!"))
			var email = msg.content
			
			msg1 = msg.channel.send(client.createEmbed().setTitle("What would you like your username to be?"))
			msg1.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(collected => {
					if (collected.content.length > 20) return msg.channel.send(client.createEmbed().setColor(client.config.colors.error).setTitle("Username is over 20 characters, Please start over and try again"))
					var username = msg1.content
		
					let password = client.generatePassword(16)
					const data = {
						username: username,
						email: email,
						password: password,
						"discord-id": message.author.id,
						"guild-id": message.guild.id
					}
				
					request.post(`${panel}/api/application/users`, {
						auth: {
							bearer: key
						},
						json: data
					}, async function(err, response, body) {
						let errors = response.body.errors;
					
						if (err) return msg1.channel.send(client.createEmbed().setColor(client.config.colors.error).setTitle("An error has occured")
							msg1.channel.send(client.createEmbed().setColor(client.config.colors.success).setTitle("Account Created!").addFields({
							{name: "**Username**", value: `\`${username}\``},
							{name: "**Email**", value: `\`${email}\``},
							{name: "**Password** (Be Sure to keep up with this!)", value: `\`${password}\``}
						}))
				
						message.channel.send(client.createEmbed().setColor(client.config.colors.success).setTitle(`Welcome ${username} to SneakyHub, Woo! Account Created!`))
		
				}
					
				})
			}).catch((e) => msg1.channel.send(client.createEmbed().setColor(client.config.colors.error).setTitle("You have not responded in time. Please start over!"))}
					 
		}).catch((e) => msg.channel.send(client.createEmbed().setColor(client.config.colors.error).setTitle("You have not responded in time. Please start over!"))
}
