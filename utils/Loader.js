const path = require("path")
const fs = require("fs")
const Loader = require("./Loader")

module.exports.loadCommands = async (client, dir = "") => {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdirSync(filePath);
    for (const file of files) {
        const stat = await fs.lstatSync(path.join(filePath, file));
        if (stat.isDirectory()) Loader.loadCommands(client, path.join(dir, file));
        if (file.endsWith('.js')) {
            const cmd = require(path.join(filePath, file));
            if (cmd.disabled == true) {
                continue;
            }
            client.commands.set(cmd.name, cmd);

            if (!cmd.aliases) continue;
            cmd.aliases.forEach((alias) => {
                client.commands.set(alias, cmd);
            });
        }
    }
}

module.exports.loadEvents = async (client, dir = "") => {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdirSync(filePath);
    for (const file of files) {
        const stat = await fs.lstatSync(path.join(filePath, file));
        if (stat.isDirectory()) Loader.loadEvents(client, path.join(dir, file));
        if (file.endsWith('.js')) {
            const event = require(path.join(filePath, file));
            if (event.disabled == true) {
                continue;
            }
            client.on(event.name, event.run.bind(event, client))
        }
    }
}

module.exports.fetchGuildData = async (client, Guild) => {
    let guildConfig = client.guildConfig
    let guilds = client.guilds
    let totalGuilds = 0

    guilds.cache.forEach(guild => {
        let guildData = await Guild.findOne({ guildId: guild.id })
        guildConfig.set(guild.id, guildData)
        totalGuilds = totalGuilds + 1
    })

    console.log(`[${Date()}] ${totalGuilds.toLocaleString()} server data has been fetched.`)
}