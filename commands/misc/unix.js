module.exports = {
    messageType: "text",
    commandName: "unix",
    commandDescription: "Sends the bot\'s latency",
    
    execute(ctx) {
        const message = ctx.message.text
        const input = message.split(" ")

        if (!input[1]) {
            ctx.replyWithMarkdown("❌ *Error*\nYou must provide an input to use this command")
        } else {
            if (/^[0-9]+$/.test(input[1])) {
                const timestamp = new Date(input[1]*1000)

                ctx.replyWithMarkdown(`*Date*: ${timestamp.getUTCMonth() + 1}/${timestamp.getUTCDate()}/${timestamp.getUTCFullYear()}\n*Time*: ${timestamp.toLocaleTimeString()}`)
            } else {
                ctx.replyWithMarkdown("❌ *Error*\nUNIX timestamps must be numbers")
            }
        }
    },
}