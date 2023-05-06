const { getLocale } = require("../../utils/locale")
const db = require("../../utils/db")

module.exports = {
    messageType: "text",
    onlyIn: "group",
    commandName: [ "language" ],
    commandDescription: "Changes the bot\'s language",

    async execute(client, ctx, args, language) {
        const availableLanguages = [ "en", "it" ]
        if (!args[0]) {
            await ctx.replyWithMarkdown(getLocale(language, "GROUP.errors.noInput"))
        } else {
            if (!availableLanguages.includes(args[0])) {
                await ctx.replyWithMarkdown(getLocale(language, "GROUP.errors.basic.language.invalidInput", [availableLanguages.map(k => k = `\`${k}\``).join(" - ")]))
            } else {
                await db.groups.findOneAndUpdate({ "id": ctx.message.chat.id }, { $set: { "language": args[0] } })
                await ctx.replyWithMarkdown(getLocale(args[0], "GROUP.basic.language.languageChange", [args[0]]))
            }
        }
    },
}
