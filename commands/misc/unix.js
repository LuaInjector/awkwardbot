const { getLocale } = require("../../utils/locale")

module.exports = {
    messageType: "text",
    onlyIn: false,
    commandName: "unix",
    commandDescription: "Converts UNIX timestamp to date",
    
    execute(client, ctx, args, language) {
        if (!args[0]) {
            ctx.replyWithMarkdown(getLocale(language, "GROUP.errors.noInput"))
        } else {
            if (/^[0-9]+$/.test(args[0])) {
                const timestamp = new Date(args[0]*1000)

                ctx.replyWithMarkdown(`*Date*: ${timestamp.getUTCMonth() + 1}/${timestamp.getUTCDate()}/${timestamp.getUTCFullYear()}\n*Time*: ${timestamp.toLocaleTimeString()}`)
            } else {
                ctx.replyWithMarkdown(getLocale(language, "GROUP.errors.misc.unix.wrongArgType"))
            }
        }
    },
}