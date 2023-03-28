module.exports = {
    messageType: "text",
    commandName: "unix",
    commandDescription: "Converts UNIX timestamp to date",
    
    execute(ctx, args) {
        if (!args[0]) {
            ctx.replyWithMarkdown("❌ *Error*\nYou must provide an input to use this command")
        } else {
            if (/^[0-9]+$/.test(args[0])) {
                const timestamp = new Date(args[0]*1000)

                ctx.replyWithMarkdown(`*Date*: ${timestamp.getUTCMonth() + 1}/${timestamp.getUTCDate()}/${timestamp.getUTCFullYear()}\n*Time*: ${timestamp.toLocaleTimeString()}`)
            } else {
                ctx.replyWithMarkdown("❌ *Error*\nUNIX timestamps must be numbers")
            }
        }
    },
}