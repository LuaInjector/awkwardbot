const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config()

const client = new Telegraf(process.env.TOKEN)

client.start((ctx) => {
    ctx.reply('Welcome to Rias Bot! 💕 \n\n🌐 Powered by @giravolte')  
})

// --- command handler ---
const fs = require("fs")
const path = require("path")

const _COMMANDSFOLDER = "./commands"
const _PREFIX = "/"

const commandsFolder = fs.readdirSync(_COMMANDSFOLDER).map(k => path.join(process.cwd(), _COMMANDSFOLDER, k)).filter(v => fs.statSync(v).isDirectory())
var commands = []

for(const folder of commandsFolder) {
    const categoryFiles = fs.readdirSync(folder).map(k => path.join(folder, k)).filter(v => fs.statSync(v).isFile() && v.endsWith(".js"))
    
 for(const file of categoryFiles){
     try {
         const script = require(file)
         
         commands.push(script)
     } catch(err){
         console.error(`Unable to import "${file}":`, err.stack)
     }
 }
}

client.on("text", (ctx) => {
    if(!ctx.message.text.startsWith(_PREFIX)) return 
    
    const args = ctx.message.text.slice(_PREFIX.length).split(/ +/g)
    const command = args.shift()

    const commandFinder = commands.filter(cmd => cmd.messageType === "text").find(cmd => cmd.commandName === command)
    
    if(typeof commandFinder !== "undefined" && commandFinder.execute) {
        commandFinder.execute(ctx, args);
    } else {
        return
    }
})
// --- command handler ---

client.launch()