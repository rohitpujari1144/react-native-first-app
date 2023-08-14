const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const dbName = 'Test_App'
const dbUrl = `mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/${dbName}`
const client = new MongoClient(dbUrl)
const db = client.db(dbName)
const collection = db.collection('All_Users')

module.exports = { client, collection }