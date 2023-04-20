const { Telegraf } = require('telegraf')
const db = require("./utils/db")
require('dotenv').config()

const client = new Telegraf(process.env.TOKEN)

// --- command handler ---
const fs = require("fs")
const path = require("path")

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

client.on("text", (ctx) => {
    if(!ctx.message.text.startsWith(_PREFIX)) return 
    
    const args = ctx.message.text.slice(_PREFIX.length).split(/ +/g)
    const command = args.shift()

    const commandFinder = commands.filter(cmd => cmd.messageType === "text").find(cmd => Array.isArray(cmd.commandName) ? (cmd.commandName.includes(command)) : (cmd.commandName === command))
    
    if (typeof commandFinder !== "undefined" && commandFinder.execute) {
        if (commandFinder.onlyIn === "group" && ["group", "supergroup"].every(k => k !== ctx.message.chat.type)) return ctx.replyWithMarkdown("❌ *Error*\nThis command can only be used in Groups!")
        if (commandFinder.onlyIn === "dm" && (ctx.message.chat.type !== "private")) return ctx.replyWithMarkdown("❌ *Error*\nThis command can only be used in DM!")
    
        commandFinder.execute(ctx, args);
    }
})
// --- command handler ---

// --- db ---
try { db.connect(); console.log("MongoDB: ✅") } catch(err) { console.log(`MongoDB: ❌\nError: ${err}`) }
// --- db ---

try { client.launch(); console.log("Telegram: ✅") } catch(err) { console.log(`Telegram: ❌\nError: ${err}`) }