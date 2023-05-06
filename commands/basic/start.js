const { getLocale } = require("../../utils/locale")

module.exports = {
    messageType: "text",
    onlyIn: false,
    commandName: [ "start", "start@rias_gremorybot" ],
    commandDescription: "Starts the bot",

    async execute(client, ctx, args, language) {
        if (ctx.message.chat.type == "private") {
            await ctx.replyWithMarkdown(getLocale(language, "DM.commands.basic.start", [ctx.update.message.from.first_name]), {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: getLocale(language, "DM.commands.basic.start.inline"), url: "t.me/rias_gremorybot?startgroup=true" } ]
                    ]
                }
            })
        } else {
            await ctx.replyWithMarkdown(getLocale(language, "GROUP.commands.basic.start", [ctx.update.message.from.first_name]))
        }
    },
}
