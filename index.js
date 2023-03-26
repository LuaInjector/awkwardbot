const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config()

const client = new Telegraf(process.env.TOKEN)

client.start((ctx) => {
    ctx.reply('Welcome to Rias Bot! 💕 \n\n🌐 Powered by @giravolte')  
})

// --- command handler ---
const fs = require("fs")

const commandFolders = fs.readdirSync('./commands')

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'))

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`)
    if ("execute" in command) {
        if (command.messageType == "text") {
            client.on(message(command.messageType), (ctx) => {
                if (ctx.message.text.startsWith(`/${command.commandName}`)) {
                    command.execute(ctx)
                }
            })
        } else {
            client.on(message(command.messageType), (ctx) => {
                command.execute(ctx)
            })
        }
    } else {
        console.log(`[WARNING] The command \`${file}\` is missing the required \`execute\` property`);
    }
  }
}
// --- command handler ---

client.launch()