const db = require("../../utils/db")

module.exports = {
    messageType: "text",
    onlyIn: false,
    commandName: [ "start", "start@rias_gremorybot" ],
    commandDescription: "Starts the bot",

    execute(ctx, args) {
        if (ctx.message.chat.type == "private") {
            ctx.replyWithMarkdown(`👋🏻 Hey *${ctx.update.message.from.first_name}*!\n*Rias* is a *multipurpose* and *useful* bot to manage your *groups* easily!\n\n👉🏻 *Add me in a group* as an *admin* to get started!`, {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: "Add me", url: "t.me/rias_gremorybot?startgroup=true" } ]
                    ]
                }
            })
        } else {
            let groupId = ctx.message.chat.id
            const query = { "id": groupId }

            db.groups.findOne(query).then((group) => {
                if (group) {
                    ctx.replyWithMarkdown(`👋🏻 Hey *${ctx.update.message.from.first_name}*!\n🔧 To set me up you can either use the \`/settings\` command or the buttons down below`)
                } else {
                    ctx.replyWithMarkdown("📌 Thank you for adding me to the group!\n👉🏻 Use the `/help` command to get started!")
                    db.addGroup(groupId)
                }
            })
        }
    },
}
