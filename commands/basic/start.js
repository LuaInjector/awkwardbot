const db = require("../../utils/db")

module.exports = {
    messageType: "text",
    onlyIn: false,
    commandName: [ "start", "start@rias_gremorybot" ],
    commandDescription: "Starts the bot",

    execute(client, ctx, args) {
        if (ctx.message.chat.type == "private") {
            ctx.replyWithMarkdown(`👋🏻 Hey *${ctx.update.message.from.first_name}*!\n*Rias* is a *multipurpose* and *useful* bot to manage your *groups* easily!\n\n👉🏻 *Add me in a group* as an *admin* to get started!`, {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: "Add me", url: "t.me/rias_gremorybot?startgroup=true" } ]
                    ]
                }
            })
        } else {
            ctx.replyWithMarkdown(`👋🏻 Hey *${ctx.update.message.from.first_name}*!\n🔧 To set me up you can either use the \`/settings\` command or the buttons down below`)
        }
    },
}
