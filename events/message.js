module.exports = (client, message) => {
    if (message.author.bot) return // Checks if the user attempting to run the command is a bot, if it is a bot then it ignores the user
    if (message.guild === null) return // Checks if the command is run in a Discord server, if is wasnt then it ignores it
    if (!message.content.startsWith(client.guildConfig.get(message.guild.id).prefix)) return // Checks if the command starts with the server prefix, if it doesnt then it ignores it

    const args = message.content.slice(client.guildConfig.get(message.guild.id).prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    const Discord = require("discord.js")
    const request = require("request")

    if (!cmd) return
    cmd.run(client, message, args, Discord, request) // Runs the command
};