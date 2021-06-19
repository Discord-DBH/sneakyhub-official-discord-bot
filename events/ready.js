module.exports = {
    name: "ready",
    run: async (client) => {
        console.log(`Successfully logged into ${client.user.tag}!`)
    }
}