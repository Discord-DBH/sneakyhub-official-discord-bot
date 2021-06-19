const Mongoose = require("mongoose")

const GuildSchema = new Mongoose.Schema({
    guildId: {
        required: true,
        type: String
    },
    prefix: {
        required: false,
        type: String,
        default: "sh!"
    },
    apiKey: {
        required: false,
        type: String
    },
    panelURL: {
        required: false,
        type: String
    }
})