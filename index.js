require('dotenv').config()
const {MongoClient} = require ('mongodb'); // 

const username = process.env.DB_USER
const password = process.env.DB_PASS
const dbName = process.env.DB_NAME
console.log(username, password, dbName)
const URL = `mongodb+srv://${username}:${password}@cluster0.tdvwr.mongodb.net/${dbName}?retryWrites=true&w=majority`
const client = new MongoClient(URL) // url connect app with DB

const start = async () => {
    try {
        await client.connect()
        console.log('Connection established')
        await client.db().createCollection('users')
        const users = client.db().collection('users')
        await users.insertMany ([                                       // dont forget this async func add await
            {name: "Sara Johnes", age: 27, company: "Sunrise Ltd"},
            {name: "Mikka Testaja", age: 34, company: "Dawn Ltd"},
            {name: "Anni Dogherty", age: 27, company: "SomeCompany  Ltd"},
            {name: "Steve Fry", age: 47, company: "JeevesWooster Ltd"},
            {name: "Night Goodman", age: 21, company: "Sunrise Ltd"},
            {name: "Anni Goodman", age: 34, company: "Dawn Ltd"}
        
        ])

        const user = await users.findOne({name: 'Sara Johnes'})
        console.log(user)
    } catch (error) {
        console.log(error)
    }
} 

start()