const { MongoClient } = require("mongodb")

const path = require("path")
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const MONGO_ACCESS_URI = process.env.MONGO_ACCESS_URI

const dbClient = new MongoClient(MONGO_ACCESS_URI)

function connect() {
    dbClient.connect(err => {
        if (err) console.log(err)
    })
}

const groups = dbClient.db("bot").collection("groups")

function addGroup(id) {
    const group = {
        "id": id
    }
    groups.insertOne(group)
}

function removeGroup(id) {
    const query = { "id": id }
    groups.deleteOne(query)
}

module.exports = {
    dbClient,
    connect,
    groups,
    addGroup,
    removeGroup
}