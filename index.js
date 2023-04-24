const { Telegraf } = require('telegraf')
const db = require("./utils/db")
const fs = require("fs")
const path = require("path")
const { getLocale } = require("./utils/locale")
require('dotenv').config()

const client = new Telegraf(process.env.TOKEN)

// --- command handler ---
const _COMMANDSFOLDER = "./commands"
const _PREFIX = "/"

const commandsFolder = fs.readdirSync(_COMMANDSFOLDER).map(k => path.join(process.cwd(), _COMMANDSFOLDER, k)).filter(v => fs.statSync(v).isDirectory())
var commands = []

for (const folder of commandsFolder) {
    const categoryFiles = fs.readdirSync(folder).map(k => path.join(folder, k)).filter(v => fs.statSync(v).isFile() && v.endsWith(".js"))
    
 for (const file of categoryFiles){
     try {
         const script = require(file)
         
         commands.push(script)
     } catch (err) {
         console.error(`Unable to import "${file}":`, err.stack)
     }
 }
}

client.on("text", async (ctx) => {
    let language = await db.fetchGroupLanguage(db, ctx.message.chat.id, ctx)

    if(!ctx.message.text.startsWith(_PREFIX)) return 
    
    const args = ctx.message.text.slice(_PREFIX.length).split(/ +/g)
    const command = args.shift()

    const commandFinder = commands.filter(cmd => cmd.messageType === "text").find(cmd => Array.isArray(cmd.commandName) ? (cmd.commandName.includes(command)) : (cmd.commandName === command))
    if (typeof commandFinder !== "undefined" && commandFinder.execute) {
        if (commandFinder.onlyIn === "group" && ["group", "supergroup"].every(k => k !== ctx.message.chat.type)) return ctx.replyWithMarkdown(getLocale(language, "DM.errors.onlyGroups"))
        if (commandFinder.onlyIn === "dm" && (ctx.message.chat.type !== "private")) return ctx.replyWithMarkdown(getLocale(language, "GROUP.errors.OnlyDM"))
        commandFinder.execute(client, ctx, args, language)
    }
})
// --- command handler ---

let statuses = []

// --- db ---
try {
    db.connect()
    statuses.push({ service: "MongoDB", status: "✅" })
} catch(err) {
    statuses.push({ service: "MongoDB", status: "❌" })
    console.log(`MongoDB Error: ${err}`)
}
// --- db ---

try {
    client.launch()
    statuses.push({ service: "Telegram", status: "✅" })
} catch(err) {
    statuses.push({ service: "Telegram", status: "❌" })
    console.log(`Telegram Error: ${err}`)
}

client.on("my_chat_member", (ctx) => {
    let chatType = ctx.myChatMember.chat.type
    let groupId = ctx.myChatMember.chat.id
    let chatMemberStatus = ctx.myChatMember.new_chat_member.status
    if (chatType === "group" || chatType === "supergroup") {
        if (chatMemberStatus === "left") {
            db.removeGroup(groupId)
        } else {
            ctx.replyWithMarkdown("📌 Thank you for adding me to the group\\!\n👉🏻 Use the `/help` command to get started\\!")
            db.addGroup(groupId)
        }
    } else {
        return
    }
})

console.table(statuses)