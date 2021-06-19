const Guild = require("../../models/Guild")
const Discord = require("discord.js")

module.exports = {
    name: "set-prefix",
    aliases: ["setprefix"],
    description: "Sets the bot prefix for the server.",
    category: "Server-Settings",
    run: async (client, message, args) => {
        const fetchGuild = await Guild.findOne({ guildId: message.guild.id }) // Fetches the current server data from the database

        let currentPrefix = fetchGuild.prefix
        let newPrefix = args[0]

        if (!newPrefix) {
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle("Error!")
                .setColor(client.config.colors.error)
                .setThumbnail(message.guild.iconURL())
                .setDescription("Please provide a new prefix!")

            return message.channel.send(errorEmbed)
        }

        Guild.findOneAndUpdate({ guildId: message.guild.id }, { // Saves the new server prefix to the database
            prefix: newPrefix
        })

        const successEmbed = new Discord.MessageEmbed()
            .setTitle("Success!")
            .setColor(client.config.colors.success)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`${message.guild.name}'s prefix has now been changed to \`${newPrefix}\`, originally \`${currentPrefix}\`.`)

        message.channel.send(successEmbed)
    }
}