const Mongoose = require("mongoose")

const ProfileSchema = new Mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    guildId: {
        required: true,
        type: String
    },
    shards: {
        required: false,
        type: Number
    }
})

module.exports = Mongoose.model("profile", ProfileSchema)