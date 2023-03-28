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
            // TODO: to avoid this message to repeat, just create some tricks with the database to check whether the bot has been just added or not, like an unix timestamp or something (and check everytime doing the /start command)
            ctx.replyWithMarkdown("📌 Thank you for adding me to the group!\n👉🏻 Use the `/help` command to get started!")
        }
    },
}
