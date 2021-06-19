const Guild = require("../models/Guild")

module.exports = {
    name: "guildCreate",
    run: async (client, guild) => {
        new Guild({
            guildId: guild.id,
            prefix: "sh!"
        }).save()

        console.log(`[${Date()}] The bot has joined the server: ${guild.name}!`)
    }
}