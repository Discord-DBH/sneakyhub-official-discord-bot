require("dotenv").config()

// Module Loading
const express = require('express')
const app = express()
const Discord = require('discord.js')
const Loader = require("./utils/Loader")

// Global Packages/Variables
const client = new Discord.Client()
client.commands = new Discord.Collection()
client.config = {
    "prefix": "sh!",
    "color": "#FFFFFF",
    "colors": {
        "success": "#09ff00",
        "neutral": "#ffe224",
        "error": "#ff0000"
    }
}
client.guildConfig = new Discord.Collection()
client.createEmbed = () => {
    return new Discord.MessageEmbed().setColor(client.config.color)
}
client.generatePassword = (length = 10) => {
    let n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let password = "";
    while (password.length < length) {
        password += n[Math.floor(Math.random() * n.length)];
    }
    return password;
}

Loader.loadCommands(client, "../commands/")
Loader.loadEvents(client, "../events/")
Loader.fetchGuildData(client, require("./models/Guild"))

// Server Deployment
app.get('/', (req, res) => res.send(`Bot Successfully Deployed!`))
app.listen(process.env.PORT)

// Client Login
client.login(process.env.TOKEN)