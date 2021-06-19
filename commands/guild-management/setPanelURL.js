const Guild = require("../../models/Guild")
const Discord = require("discord.js")

module.exports = {
    name: "set-panel-url",
    aliases: ["setpanelurl"],
    description: "Sets the server Pterodactyl panel URL.",
    category: "Server-Settings",
    run: async (client, message, args) => {
        const fetchGuild = await Guild.findOne({ guildId: message.guild.id }) // Fetches the current server data from the database

        let currentURL = fetchGuild.panelURL
        let newURL = args[0]

        if (!newURL) {
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle("Error!")
                .setColor(client.config.colors.error)
                .setThumbnail(message.guild.iconURL())
                .setDescription("Please provide a new Pterodactyl panel URL!")

            return message.channel.send(errorEmbed)
        }

        Guild.findOneAndUpdate({ guildId: message.guild.id }, { // Saves the new Pterodactyl panel URL to the database
            panelURL: newURL
        })

        const successEmbed = new Discord.MessageEmbed()
            .setTitle("Success!")
            .setColor(client.config.colors.success)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`${message.guild.name}'s Pterodactyl panel URL has now been changed to \`${newURL}\`, originally \`${currentURL}\`.`)

        message.channel.send(successEmbed)
    }
}