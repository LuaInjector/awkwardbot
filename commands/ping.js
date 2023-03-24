module.exports = {
    messageType: "text",
    commandName: "ping",
    commandDescription: "Sends the bot\'s latency",
    
    execute(ctx) {
        ctx.reply(`🏓Latency is ${Date.now() - ctx.message.date*1000}ms`) // TODO: wrong ping. fixing it soon
    },
}