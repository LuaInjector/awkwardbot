const { getLocale } = require("../../utils/locale")
const db = require("../../utils/db")

module.exports = {
    messageType: "text",
    onlyIn: "group",
    commandName: [ "language" ],
    commandDescription: "Changes the bot\'s language",

    execute(client, ctx, args, language) {
        const availableLanguages = [ "en", "it" ]
        if (!args[0]) {
            ctx.replyWithMarkdown(getLocale(language, "GROUP.errors.noInput"))
        } else {
            if (availableLanguages.indexOf(args[0] === -1)) {
                getLocale(language, "GROUP.errors.basic.language.invalidInput", [availableLanguages.map(k => k = `\`${k}\``).join(" - ")])
            } else {
                db.groups.findOneAndUpdate({ "id": ctx.message.chat.id }, { "language": args[0] })
            }
        }
    },
}
