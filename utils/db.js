const { MongoClient } = require("mongodb")

const path = require("path")
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const MONGO_ACCESS_URI = process.env.MONGO_ACCESS_URI

const dbClient = new MongoClient(MONGO_ACCESS_URI)

async function connect() {
    await dbClient.connect().catch((err) => { console.log(err) })
}

const groups = dbClient.db("bot").collection("groups")

async function addGroup(id) {
    const group = { 
        "id": id,
        "language": "en"
    }
    await groups.insertOne(group)
}

async function removeGroup(id) {
    const query = { "id": id }
    await groups.deleteOne(query)
}

async function fetchGroupLanguage(db, groupId, ctx) {
    if (["group", "supergroup"].some(k => k === ctx.message.chat.type)) {
        const group = await db.groups.findOne({ "id": groupId })
        return group.language
    } else {
        // commands in dms are always in english
        return "en"
    }
}

module.exports = {
    dbClient,
    connect,
    groups,
    addGroup,
    removeGroup,
    fetchGroupLanguage
}