module.exports = {
    messageType: "text",
    commandName: [ "start", "start@rias_gremorybot" ],
    commandDescription: "Starts the bot",

    execute(ctx, args) {
        if (ctx.message.chat.type == "private") {
            ctx.reply("Welcome to Rias Bot! 💕\n\n🌐 Powered by @giravolte", {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: "Add me", url: "t.me/rias_gremorybot?startgroup=true" } ]
                    ]
                }
            })
        } else {
            ctx.reply("todo")
        }
    },
}
