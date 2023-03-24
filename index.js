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

const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

for (file of commandsFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("execute" in command) {
        client.on(message(command.messageType), (ctx) => {
            if (ctx.message.text == `/${command.commandName}`) {
                command.execute(ctx)
            }
        })
    }
}
// --- command handler ---

client.launch()