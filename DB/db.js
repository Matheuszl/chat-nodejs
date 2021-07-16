const { MongoClient } = require('mongodb')


// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://dbMatheus:dbMatheus@cluster0.k2pm3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url)

// Database Name
const dbName = 'myProject'

async function main() {
    // Use connect method to connect to the server
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('test')

    // Insert
    // const insertResult = await collection.insertMany([{ 
    //     Nome: "Gabriel",
    //     Sobrenome: "Bellagamba",
    //     Idade: "21",
    //     Sexo: "Gosto",
    //     Estado: "Sono"
    //  }])
    // console.log('Inserted documents =>', insertResult)

    const findResult = await collection.find({}).toArray()
    console.log('Found documents =>', findResult)


    // Update
    // const updateResult = await collection.updateOne({ Nome: "Gabriel" }, { $set: { Nome: "GERVASIO" } })
    // console.log('Updated documents =>', updateResult)
   
    // Update
    // const updateResult = await collection.updateOne({ Nome: "Gabriel" }, { $set: { Sobrenome: "GIOVANNA" } })
    // console.log('Updated documents =>', updateResult)

    // Search byParam
    // const filteredDocs = await collection.find({ Nome: "Gabriel"}).toArray()
    // console.log('Found documents filtered by =>', filteredDocs)

    // Delete
    // const deleteResult = await collection.deleteMany({ a: 1 })
    // console.log('Deleted documents =>', deleteResult)



}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        client.close()
    })

